const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const { makeWASocket, useMultiFileAuthState, makeCacheableSignalKeyStore, fetchLatestBaileysVersion, Browsers } = require(path.join(ROOT, 'node_modules', '@whiskeysockets', 'baileys'));
const pino = require(path.join(ROOT, 'node_modules', 'pino'));

const PAIRING_DIR = path.join(ROOT, 'richstore', 'pairing');
const app = express();
const PORT = process.env.PORT || 5000;
const MAX_PAIRS = 300;

app.use(cors({ origin: '*' }));
app.use(express.json());

const sseClients = new Set();
const pairingSockets = new Map();

function getPairedCount() {
  if (!fs.existsSync(PAIRING_DIR)) return 0;
  return fs.readdirSync(PAIRING_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory() && d.name.endsWith('@s.whatsapp.net')).length;
}

function broadcastStats() {
  const payload = { totalPaired: getPairedCount(), maxPairs: MAX_PAIRS };
  for (const send of sseClients) send(payload);
}

app.get('/stats', (_req, res) => {
  res.json({ totalPaired: getPairedCount(), maxPairs: MAX_PAIRS });
});

app.get('/stats/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();
  const send = (d) => res.write(`data: ${JSON.stringify(d)}\n\n`);
  send({ totalPaired: getPairedCount(), maxPairs: MAX_PAIRS });
  sseClients.add(send);
  req.on('close', () => sseClients.delete(send));
});

app.post('/pair', async (req, res) => {
  let { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'Phone number is required' });
  phone = phone.replace(/\D/g, '');
  if (phone.length < 7) return res.status(400).json({ error: 'Invalid phone number' });
  if (getPairedCount() >= MAX_PAIRS) return res.status(429).json({ error: 'Server is full' });

  // Kill any existing pairing socket for this number
  if (pairingSockets.has(phone)) {
    try { pairingSockets.get(phone).end(); } catch (_) {}
    pairingSockets.delete(phone);
  }

  const sessionPath = path.join(PAIRING_DIR, phone + '@s.whatsapp.net');
  if (fs.existsSync(sessionPath)) fs.rmSync(sessionPath, { recursive: true, force: true });
  fs.mkdirSync(sessionPath, { recursive: true });

  try {
    const { version } = await fetchLatestBaileysVersion();
    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);

    const sock = makeWASocket({
      version,
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' })),
      },
      printQRInTerminal: false,
      logger: pino({ level: 'silent' }),
      browser: Browsers.ubuntu('Chrome'),
      connectTimeoutMs: 60000,
      defaultQueryTimeoutMs: 60000,
      keepAliveIntervalMs: 15000,
      markOnlineOnConnect: false,
    });

    pairingSockets.set(phone, sock);
    sock.ev.on('creds.update', saveCreds);

    // When user enters the code and WhatsApp confirms — hand off to full bot
    sock.ev.on('connection.update', async ({ connection, lastDisconnect }) => {
      if (connection === 'open') {
        console.log(`✅ ${phone} linked — handing off to bot`);
        pairingSockets.delete(phone);
        broadcastStats();
        try {
          // End this socket cleanly before pair.js opens a new one
          sock.end();
          await new Promise(r => setTimeout(r, 1000));
          const startpairing = require(path.join(ROOT, 'pair.js'));
          await startpairing(phone + '@s.whatsapp.net');
        } catch (e) {
          console.error('Bot handoff error:', e.message);
        }
      }
      if (connection === 'close') {
        const reason = lastDisconnect?.error?.output?.statusCode;
        console.log(`🔌 ${phone} pairing socket closed: ${reason}`);
        pairingSockets.delete(phone);
        // Only clean up on actual logout/bad session — NOT on restart (515) or timeout
        const shouldClean = reason === 401 || reason === 411 || reason === 405;
        if (shouldClean && fs.existsSync(sessionPath)) {
          try {
            const creds = JSON.parse(fs.readFileSync(path.join(sessionPath, 'creds.json'), 'utf8'));
            if (!creds?.me?.id) fs.rmSync(sessionPath, { recursive: true, force: true });
          } catch (_) {
            fs.rmSync(sessionPath, { recursive: true, force: true });
          }
        }
      }
    });

    // Request pairing code
    const code = await new Promise((resolve, reject) => {
      const t = setTimeout(() => reject(new Error('Timeout getting pairing code')), 20000);
      setTimeout(async () => {
        try {
          const raw = await sock.requestPairingCode(phone);
          clearTimeout(t);
          resolve(raw?.match(/.{1,4}/g)?.join('-') || raw);
        } catch (e) {
          clearTimeout(t);
          reject(e);
        }
      }, 3000);
    });

    res.json({ code });

  } catch (err) {
    console.error('Pairing error:', err.message);
    if (fs.existsSync(sessionPath)) fs.rmSync(sessionPath, { recursive: true, force: true });
    if (!res.headersSent) res.status(500).json({ error: err.message });
  }
});

app.get('/', (_req, res) => res.json({ status: 'ITACHI MD API running' }));

app.listen(PORT, () => console.log(`ITACHI MD Web Pair server running on port ${PORT}`));
