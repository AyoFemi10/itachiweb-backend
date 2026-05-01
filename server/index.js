/**
 * ITACHI MD — Web Pair Launcher
 * Starts the web pairing server and auto-loads all saved sessions.
 * No Telegram. No password. Just pair via site and bot runs.
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { autoLoadPairs } = require('./autoload');
const startpairing = require('./pair');

const PAIRING_DIR = path.join(__dirname, 'richstore', 'pairing');
const delay = (ms) => new Promise(r => setTimeout(r, ms));

// ── Banner ────────────────────────────────────────────────
function displayBanner() {
  console.clear();
  console.log(chalk.red(`
═══════════════════════════════════
     🌑 𝐈𝐓𝐀𝐂𝐇𝐈 × 𝐌𝐃 🌑
     ⎯⎯⎯ 写輪眼 ⎯⎯⎯
═══════════════════════════════════
  `));
  console.log(chalk.yellow('  ⚡ ᴠᴇʀsɪᴏɴ: 1.0.0'));
  console.log(chalk.yellow('  👨‍💻 ᴅᴇᴠ: Dev Kingsley'));
  console.log(chalk.yellow('  🌙 ᴘᴏᴡᴇʀᴇᴅ ʙʏ: ʟᴜᴍᴏʀᴀ ᴛᴇᴄʜ\n'));
  console.log(chalk.magenta('━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
}

// ── Watch for new sessions from web pairing ───────────────
function watchForNewSessions() {
  if (!fs.existsSync(PAIRING_DIR)) fs.mkdirSync(PAIRING_DIR, { recursive: true });

  // Seed known sessions so we don't re-connect existing ones
  const known = new Set(
    fs.readdirSync(PAIRING_DIR, { withFileTypes: true })
      .filter(d => d.isDirectory() && d.name.endsWith('@s.whatsapp.net'))
      .map(d => d.name)
  );

  fs.watch(PAIRING_DIR, { persistent: true }, async (_event, filename) => {
    if (!filename || !filename.endsWith('@s.whatsapp.net')) return;
    if (known.has(filename)) return;

    const sessionFolder = path.join(PAIRING_DIR, filename);
    const credsPath = path.join(sessionFolder, 'creds.json');

    // Mark known immediately to prevent duplicate triggers
    known.add(filename);

    console.log(chalk.blue(`\n👁️  Waiting for ${filename} to complete pairing...`));

    // Poll until creds.json has me.id — means user entered the code successfully
    const registered = await new Promise((resolve) => {
      const interval = setInterval(() => {
        if (!fs.existsSync(credsPath)) return;
        try {
          const creds = JSON.parse(fs.readFileSync(credsPath, 'utf8'));
          if (creds?.me?.id) {
            clearInterval(interval);
            resolve(true);
          }
        } catch (_) {}
      }, 2000);

      // Give up after 3 minutes
      setTimeout(() => { clearInterval(interval); resolve(false); }, 180000);
    });

    if (!registered) {
      console.log(chalk.yellow(`⏰ ${filename} — user didn't enter code in time`));
      known.delete(filename);
      return;
    }

    if (!fs.existsSync(credsPath)) {
      known.delete(filename);
      return;
    }

    console.log(chalk.blue(`\n🔗 New session detected: ${filename}`));
    console.log(chalk.blue('⏳ Connecting to WhatsApp...\n'));

    try {
      await startpairing(filename);
      console.log(chalk.green(`✅ ${filename} is now live on the bot`));
    } catch (e) {
      console.log(chalk.red(`❌ Failed to connect ${filename}: ${e.message}`));
    }
  });

  console.log(chalk.cyan('👁️  Watching for new web pairs...\n'));
}

// ── Main ──────────────────────────────────────────────────
async function main() {
  displayBanner();

  // Start the web pairing server
  console.log(chalk.cyan('🌐 Starting web pairing server...\n'));
  require('./server/index.js');

  // Small delay so server is up before we flood connections
  await delay(2000);

  // Reconnect all existing sessions
  console.log(chalk.yellow('🔄 Loading existing sessions...\n'));
  await autoLoadPairs({ batchSize: 10 });

  // Watch for new sessions added via the website
  watchForNewSessions();

  // Suppress noisy baileys errors
  const ignored = [
    'Socket connection timeout', 'EKEYTYPE', 'item-not-found',
    'rate-overlimit', 'Connection Closed', 'Timed Out', 'Value not found',
  ];

  process.on('unhandledRejection', (reason) => {
    if (ignored.some(e => String(reason).includes(e))) return;
    console.log(chalk.red('⚠️ Unhandled rejection:'), reason);
  });

  const _origErr = console.error.bind(console);
  console.error = (msg, ...rest) => {
    if (typeof msg === 'string' && ignored.some(e => msg.includes(e))) return;
    _origErr(msg, ...rest);
  };
}

main().catch(err => {
  console.log(chalk.red('❌ Fatal error:'), err);
  process.exit(1);
});
