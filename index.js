const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { autoLoadPairs } = require('./autoload');

async function main() {
  console.log(chalk.red('\n🌑 ITACHI MD — Starting...\n'));
  console.log(chalk.cyan('🌐 Starting web pairing server...\n'));

  require('./server/index.js');

  await new Promise(r => setTimeout(r, 2000));

  console.log(chalk.yellow('🔄 Loading existing sessions...\n'));
  await autoLoadPairs({ batchSize: 10 });

  console.log(chalk.green('✅ Ready\n'));

  // Suppress noisy errors
  const ignored = [
    'Socket connection timeout', 'EKEYTYPE', 'item-not-found',
    'rate-overlimit', 'Connection Closed', 'Timed Out', 'Value not found', 'ENOENT',
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
