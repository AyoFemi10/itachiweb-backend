const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { existsSync, readdirSync } = require('fs');

const ROOT = path.resolve(__dirname, '..');

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
// No static files — frontend is hosted on Vercel

// ── SSE clients ──────────────────────────────────────────
const sseClients = new Set();

function getPairedCount() {
  const dir = path.join(ROOT, 'richstore', 'pairing');
  if (!existsSync(dir)) return 0;
  return readdirSync(dir, { withFileTypes: true })
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

// ── Pair endpoint ─────────────────────────────────────────
app.post('/pair', async (req, res) => {
  let { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'Phone number is required' });

  phone = phone.replace(/\D/g, '');
  if (phone.length < 7) return res.status(400).json({ error: 'Invalid phone number' });

  if (getPairedCount() >= MAX_PAIRS)
    return res.status(429).json({ error: `Server is full (${MAX_PAIRS} pairs reached). Try again later.` });

  try {
    // Clear require cache so each pair gets a fresh socket connection
    const pairPath = path.join(ROOT, 'pair.js');
    delete require.cache[pairPath];
    const startpairing = require(pairPath);

    const jid = phone + '@s.whatsapp.net';

    // startpairing connects and writes pairing.json with the code
    await startpairing(jid);

    // Wait for pairing.json to be written (pair.js does this after 3s)
    await new Promise((resolve, reject) => {
      const pairingFile = path.join(ROOT, 'richstore', 'pairing', 'pairing.json');
      const start = Date.now();
      const poll = setInterval(() => {
        if (existsSync(pairingFile)) {
          try {
            const data = JSON.parse(fs.readFileSync(pairingFile, 'utf8'));
            if (data.number === jid || data.number === phone) {
              clearInterval(poll);
              resolve(data.code);
            }
          } catch (_) {}
        }
        if (Date.now() - start > 20000) {
          clearInterval(poll);
          reject(new Error('Timed out waiting for pairing code'));
        }
      }, 500);
    }).then((code) => {
      broadcastStats();
      res.json({ code });
    });

  } catch (err) {
    console.error('Pairing error:', err.message);
    if (!res.headersSent)
      res.status(500).json({ error: err.message || 'Failed to generate pairing code' });
  }
});

// ── Health check ─────────────────────────────────────────
app.get('/', (_req, res) => res.json({ status: 'ITACHI MD API running' }));

app.listen(PORT, () => {
  console.log(`ITACHI MD Web Pair server running on port ${PORT}`);
});
