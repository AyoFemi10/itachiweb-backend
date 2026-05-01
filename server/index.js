const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { existsSync, readdirSync } = require('fs');
const {
  makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  makeCacheableSignalKeyStore,
} = require('@whiskeysockets/baileys');
const pino = require('pino');

const ROOT = path.resolve(__dirname, '..');
const PAIRING_DIR = path.join(ROOT, 'richstore', 'pairing');

const app = express();
const PORT = process.env.PORT || 5000;
const MAX_PAIRS = 300;

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://itachiweb.ayohost.site',
    process.env.FRONTEND_URL || '*'
  ],
  credentials: true
}));
app.use(express.json());

// ── SSE clients ───────────────────────────────────────────
const sseClients = new Set();

function getPairedCount() {
  if (!existsSync(PAIRING_DIR)) return 0;
  return readdirSync(PAIRING_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory() && d.name.endsWith('@s.whatsapp.net'))
    .length;
}

function broadcastStats() {
  const payload = { totalPaired: getPairedCount(), maxPairs: MAX_PAIRS };
  for (const send of sseClients) send(payload);
}

// ── Stats endpoints ───────────────────────────────────────
app.get('/stats', (_req, res) => {
  res.json({ totalPaired: getPairedCount(), maxPairs: MAX_PAIRS });
});

app.get('/stats/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const send = (data) => res.write(`data: ${JSON.stringify(data)}\n\n`);
  send({ totalPaired: getPairedCount(), maxPairs: MAX_PAIRS });
  sseClients.add(send);
  req.on('close', () => sseClients.delete(send));
});

// ── Pair endpoint — own clean Baileys socket, no pair.js ─
app.post('/pair', async (req, res) => {
  let { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'Phone number is required' });

  phone = phone.replace(/\D/g, '');
  if (phone.length < 7) return res.status(400).json({ error: 'Invalid phone number' });

  if (getPairedCount() >= MAX_PAIRS)
    return res.status(429).json({ error: `Server is full (${MAX_PAIRS} pairs reached). Try again later.` });

  const sessionPath = path.join(PAIRING_DIR, phone + '@s.whatsapp.net');

  // Clean any stale session for this number
  if (existsSync(sessionPath))
    fs.rmSync(sessionPath, { recursive: true, force: true });

  try {
    if (!existsSync(PAIRING_DIR)) fs.mkdirSync(PAIRING_DIR, { recursive: true });

    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);

    const sock = makeWASocket({
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' })),
      },
      printQRInTerminal: false,
      logger: pino({ level: 'silent' }),
      browser: ['ITACHI MD', 'Chrome', '1.0.0'],
    });

    sock.ev.on('creds.update', saveCreds);

    const code = await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        sock.end();
        reject(new Error('Timed out waiting for pairing code'));
      }, 20000);

      // Request pairing code after socket initialises
      setTimeout(async () => {
        try {
          if (!sock.authState.creds.registered) {
            const raw = await sock.requestPairingCode(phone);
            const formatted = raw?.match(/.{1,4}/g)?.join('-') || raw;
            clearTimeout(timeout);
            resolve(formatted);
          }
        } catch (err) {
          clearTimeout(timeout);
          reject(err);
        }
      }, 3000);

      sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
        if (connection === 'open') {
          clearTimeout(timeout);
          resolve(null); // already registered
        }
        if (connection === 'close') {
          const reason = lastDisconnect?.error?.output?.statusCode;
          // 401 after code is sent = user hasn't linked yet, that's fine
          if (reason !== DisconnectReason.loggedOut) {
            // don't reject — code was already sent
          }
        }
      });
    });

    broadcastStats();
    // code can be null if already registered — shouldn't happen on fresh session
    res.json({ code: code || 'Already registered' });

  } catch (err) {
    console.error('Pairing error:', err.message);
    if (existsSync(sessionPath))
      fs.rmSync(sessionPath, { recursive: true, force: true });
    if (!res.headersSent)
      res.status(500).json({ error: err.message || 'Failed to generate pairing code' });
  }
});

// ── Health check ──────────────────────────────────────────
app.get('/', (_req, res) => res.json({ status: 'ITACHI MD API running' }));

app.listen(PORT, () => {
  console.log(`ITACHI MD Web Pair server running on port ${PORT}`);
});
