require('./setting/config');
const fs = require('fs');
const { Telegraf, Markup } = require('telegraf');
const { message, editedMessage, channelPost, editedChannelPost, callbackQuery } = require("telegraf/filters");
const path = require('path');
const os = require('os');
const yts = require('yt-search');
const { ytdl } = require('./allfunc/scrape-ytdl');
const startpairing = require('./pair');
const { BOT_TOKEN } = require('./token');

const { 
  default: baileys, 
  proto, 
  jidNormalizedUser, 
  generateWAMessage, 
  generateWAMessageFromContent, 
  getContentType, 
  prepareWAMessageMedia 
} = require("@whiskeysockets/baileys");

const { makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");

// ═══════════════════════════════════════════════════════════
// 📁 FILE PATHS & CONSTANTS
// ═══════════════════════════════════════════════════════════

const adminFilePath = './database/admintele.json';
const bannedPath = './richstore/pairing/banned.json';
const userStore = './richstore/pairing/users.json';
const premium_file = './premium.json';
const prefixStore = './richstore/pairing/prefixes.json';

const ITEMS_PER_PAGE = 10;
const botStartTime = Date.now();

const pagedListPairs = {};
const userStates = {};
let premiumUsers = [];
let adminIDs = [];

// Available prefixes
const AVAILABLE_PREFIXES = [
  { symbol: '.', name: 'Dot', emoji: '⚫' },
  { symbol: '!', name: 'Exclamation', emoji: '❗' },
  { symbol: '/', name: 'Slash', emoji: '➗' },
  { symbol: '#', name: 'Hash', emoji: '#️⃣' },
  { symbol: '$', name: 'Dollar', emoji: '💲' },
  { symbol: '&', name: 'Ampersand', emoji: '🔗' },
  { symbol: '*', name: 'Asterisk', emoji: '⭐' },
  { symbol: '+', name: 'Plus', emoji: '➕' },
  { symbol: '>', name: 'Greater Than', emoji: '▶️' },
  { symbol: '~', name: 'Tilde', emoji: '〰️' }
];

// ═══════════════════════════════════════════════════════════
// 🌙 INITIALIZATION & FILE SETUP
// ═══════════════════════════════════════════════════════════

if (!fs.existsSync(adminFilePath)) {
  const defaultAdmin = [String(process.env.OWNER_ID || '7921095103')];
  fs.writeFileSync(adminFilePath, JSON.stringify(defaultAdmin, null, 2));
}

if (!fs.existsSync(userStore)) {
  fs.writeFileSync(userStore, JSON.stringify([], null, 2));
}

if (!fs.existsSync(prefixStore)) {
  fs.writeFileSync(prefixStore, JSON.stringify({}, null, 2));
}

try {
  adminIDs = JSON.parse(fs.readFileSync(adminFilePath, 'utf8'));
} catch (error) {
  console.error('Failed to load admin IDs:', error);
  adminIDs = [];
}

try {
  if (fs.existsSync(premium_file)) {
    premiumUsers = JSON.parse(fs.readFileSync(premium_file, 'utf-8'));
  } else {
    fs.writeFileSync(premium_file, JSON.stringify([]));
  }
} catch (error) {
  console.error('Failed to load premium users:', error);
}

// ═══════════════════════════════════════════════════════════
// 🎨 HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getPushName(ctx) {
  return ctx.from.first_name || ctx.from.username || "User";
}

function trackUser(id) {
  const users = JSON.parse(fs.readFileSync(userStore));
  if (!users.includes(id)) {
    users.push(id);
    fs.writeFileSync(userStore, JSON.stringify(users, null, 2));
  }
}

function formatRuntime(seconds) {
  const pad = (s) => (s < 10 ? '0' + s : s);
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${pad(hrs)}h ${pad(mins)}m ${pad(secs)}s`;
}

function savePrefix(userId, phoneNumber, prefix) {
  const prefixes = JSON.parse(fs.readFileSync(prefixStore));
  const key = `${phoneNumber}@s.whatsapp.net`;
  prefixes[key] = {
    prefix: prefix,
    setBy: userId,
    setAt: Date.now(),
    phoneNumber: phoneNumber
  };
  fs.writeFileSync(prefixStore, JSON.stringify(prefixes, null, 2));
}

function getPrefix(phoneNumber) {
  const prefixes = JSON.parse(fs.readFileSync(prefixStore));
  const key = `${phoneNumber}@s.whatsapp.net`;
  return prefixes[key] ? prefixes[key].prefix : '.';
}

function getUserPrefix(userId) {
  return userStates[userId]?.selectedPrefix || null;
}

// ═══════════════════════════════════════════════════════════
// 📄 PAGINATION HANDLERS
// ═══════════════════════════════════════════════════════════

function sendListPairPage(ctx, userID, pageIndex) {
  const pairedDevices = pagedListPairs[userID] || [];
  const totalPages = Math.max(1, Math.ceil(pairedDevices.length / ITEMS_PER_PAGE));

  pageIndex = Math.min(Math.max(pageIndex, 0), totalPages - 1);

  const start = pageIndex * ITEMS_PER_PAGE;
  const currentPage = pairedDevices.slice(start, start + ITEMS_PER_PAGE);

  // Load prefixes
  const prefixes = JSON.parse(fs.readFileSync(prefixStore));
  
  const pageText = currentPage.length
    ? currentPage.map((id, i) => {
        const prefixData = prefixes[id];
        const prefix = prefixData ? prefixData.prefix : '.';
        const phoneNum = id.replace('@s.whatsapp.net', '');
        return `${start + i + 1}. \`${phoneNum}\` → Prefix: \`${prefix}\``;
      }).join('\n')
    : "⚠️ _No paired devices found._";

  const navButtons = [];
  if (pageIndex > 0) navButtons.push({ text: '⬅️', callback_data: `listpair_page_${pageIndex - 1}` });
  navButtons.push({ text: `${pageIndex + 1}/${totalPages}`, callback_data: 'ignore' });
  if (pageIndex < totalPages - 1) navButtons.push({ text: '➡️', callback_data: `listpair_page_${pageIndex + 1}` });

  const text = `\`\`\`
╔═══════════════════╗
║  📱 PAIRED DEVICES 📱       
╚═══════════════════╝
\`\`\`

${pageText}

\`\`\`
━━━━━━━━━━━━━━━━━━━━━━━━
       👁️ SHARINGAN 👁️
━━━━━━━━━━━━━━━━━━━━━━━━
\`\`\``;

  const keyboard = [navButtons, [{ text: '🔙 Back to Menu', callback_data: 'main_menu' }]];

  ctx.editMessageText(text, {
    parse_mode: 'Markdown',
    reply_markup: { inline_keyboard: keyboard }
  }).catch(() => {
    ctx.reply(text, {
      parse_mode: 'Markdown',
      reply_markup: { inline_keyboard: keyboard }
    });
  });
}

function sendDelPairPage(ctx, userID, pageIndex) {
  const pairedDevices = pagedListPairs[userID] || [];
  const totalPages = Math.max(1, Math.ceil(pairedDevices.length / ITEMS_PER_PAGE));

  pageIndex = Math.min(Math.max(pageIndex, 0), totalPages - 1);

  const start = pageIndex * ITEMS_PER_PAGE;
  const currentPage = pairedDevices.slice(start, start + ITEMS_PER_PAGE);

  const keyboard = currentPage.map(id => [
    { text: `🗑️ ${id}`, callback_data: `delpair_${id}` }
  ]);

  const navButtons = [];
  if (pageIndex > 0) navButtons.push({ text: '⬅️', callback_data: `delpair_page_${pageIndex - 1}` });
  navButtons.push({ text: `${pageIndex + 1}/${totalPages}`, callback_data: 'ignore' });
  if (pageIndex < totalPages - 1) navButtons.push({ text: '➡️', callback_data: `delpair_page_${pageIndex + 1}` });

  if (navButtons.length) keyboard.push(navButtons);
  keyboard.push([{ text: '🔙 Back to Menu', callback_data: 'main_menu' }]);

  const text = pairedDevices.length
    ? `\`\`\`
╔══════════════════════╗
║      🗑️ DELETE DEVICE 🗑️      
╚══════════════════════╝
\`\`\`

⚠️ Tap a device to delete

\`\`\`
━━━━━━━━━━━━━━━━━━━━━━━━━
         👁️ SHARINGAN 👁️
━━━━━━━━━━━━━━━━━━━━━━━━━
\`\`\``
    : "⚠️ _No paired devices found._";

  ctx.deleteMessage().catch(() => {});
  ctx.reply(text, {
    parse_mode: 'Markdown',
    reply_markup: { inline_keyboard: keyboard }
  });
}

// ═══════════════════════════════════════════════════════════
// 🤖 BOT INITIALIZATION
// ═══════════════════════════════════════════════════════════

const bot = new Telegraf(BOT_TOKEN);

// ═══════════════════════════════════════════════════════════
// 🌑 ANIMATED START SEQUENCE
// ═══════════════════════════════════════════════════════════

bot.start(async (ctx) => {
  const userId = ctx.from.id;
  trackUser(userId);
  const pushname = getPushName(ctx);
  
  // Dark intro message
  const darkIntro = `\`\`\`
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

       👁️ SHARINGAN 👁️

▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
\`\`\`

*"In this world, wherever there is light...*
*There are also shadows..."*

━━━━━━━━━━━━━━━━━━━━━━

> 𝘛𝘩𝘦 𝘥𝘢𝘳𝘬𝘯𝘦𝘴𝘴 𝘢𝘸𝘢𝘬𝘦𝘯𝘴...
> 𝘛𝘩𝘦 𝘱𝘰𝘸𝘦𝘳 𝘴𝘵𝘪𝘳𝘴 𝘸𝘪𝘵𝘩𝘪𝘯 ${pushname}...

\`\`\`
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    𝘐𝘵𝘢𝘤𝘩𝘪 𝘔𝘋 • 𝘗𝘢𝘪𝘳𝘪𝘯𝘨
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
\`\`\``;

  try {
    const introMsg = await ctx.replyWithPhoto(
      { url: 'https://files.catbox.moe/vmlpqv.jpg' },
      {
        caption: darkIntro,
        parse_mode: 'Markdown'
      }
    );

    // Wait 3 seconds then delete
    await sleep(3000);
    await ctx.telegram.deleteMessage(ctx.chat.id, introMsg.message_id).catch(() => {});

    // Show main menu
    await showMainMenu(ctx, pushname);

  } catch (error) {
    const introMsg = await ctx.reply(darkIntro, { parse_mode: 'Markdown' });
    await sleep(3000);
    await ctx.telegram.deleteMessage(ctx.chat.id, introMsg.message_id).catch(() => {});
    await showMainMenu(ctx, pushname);
  }
});

// ═══════════════════════════════════════════════════════════
// 📋 MAIN MENU FUNCTION
// ═══════════════════════════════════════════════════════════

async function showMainMenu(ctx, pushname = null) {
  if (!pushname) {
    pushname = getPushName(ctx);
  }

  const pairingFolder = './richstore/pairing';
  let pairedCount = 0;
  if (fs.existsSync(pairingFolder)) {
    pairedCount = fs.readdirSync(pairingFolder)
      .filter(file => file.endsWith('@s.whatsapp.net')).length;
  }

  const menuText = `\`\`\`
╔══════════════════════╗
║    🌑 ITACHI MD PAIRING 🌑    
╚══════════════════════╝
\`\`\`

*Welcome back, ${pushname}!*

_"Those who forgive themselves,_
_and accept their true nature..._
_They are the strong ones."_

\`\`\`
━━━━━━━━━━━━━━━━━━━━━━━

📊 SYSTEM STATUS

◆ Bot Status    : 🟢 ONLINE
◆ Paired Devices: ${pairedCount}/70
◆ Version       : v1.4.1
◆ Developer     : Dev Kingsley

━━━━━━━━━━━━━━━━━━━━━━━
\`\`\`

Select an option below:`;

  const keyboard = [
    [
      { text: '🔗 Pair Device', callback_data: 'pair_menu' },
      { text: '📋 View Pairs', callback_data: 'view_pairs' }
    ],
    [
      { text: '🗑️ Delete Pair', callback_data: 'delete_pair' },
      { text: '⏱️ Bot Status', callback_data: 'bot_status' }
    ],
    [
      { text: 'ℹ️ Help', callback_data: 'help_menu' },
      { text: '📢 Channels', callback_data: 'channels' }
    ]
  ];

  const message = {
    text: menuText,
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: keyboard
    }
  };

  // Try to edit if it's a callback, otherwise send new
  if (ctx.callbackQuery) {
    await ctx.editMessageText(menuText, {
      parse_mode: 'Markdown',
      reply_markup: { inline_keyboard: keyboard }
    }).catch(() => {
      ctx.reply(menuText, {
        parse_mode: 'Markdown',
        reply_markup: { inline_keyboard: keyboard }
      });
    });
  } else {
    await ctx.reply(menuText, {
      parse_mode: 'Markdown',
      reply_markup: { inline_keyboard: keyboard }
    });
  }
}

// ═══════════════════════════════════════════════════════════
// 🎯 NAVIGATION CALLBACKS
// ═══════════════════════════════════════════════════════════

bot.action('main_menu', async (ctx) => {
  await ctx.answerCbQuery();
  // Clear user state when returning to main menu
  delete userStates[ctx.from.id];
  await showMainMenu(ctx);
});

bot.action('pair_menu', async (ctx) => {
  await ctx.answerCbQuery();
  
  // Show prefix selection
  await showPrefixSelection(ctx);
});

// ═══════════════════════════════════════════════════════════
// ⚙️ PREFIX SELECTION SYSTEM
// ═══════════════════════════════════════════════════════════

async function showPrefixSelection(ctx) {
  const prefixText = `\`\`\`
╔════════════════════╗
║    ⚙️ SELECT PREFIX ⚙️       
╚════════════════════╝
\`\`\`

*Choose your bot prefix:*

This will be used for all commands
on your WhatsApp bot.

*Example:*
• Prefix \`.\` → \`.menu\`
• Prefix \`!\` → \`!menu\`
• Prefix \`/\` → \`/menu\`

\`\`\`
━━━━━━━━━━━━━━━━━━━━━━
       👁️ SHARINGAN 👁️
━━━━━━━━━━━━━━━━━━━━━━
\`\`\`

*Select a prefix below:*`;

  // Create buttons for prefixes (2 per row)
  const prefixButtons = [];
  for (let i = 0; i < AVAILABLE_PREFIXES.length; i += 2) {
    const row = [];
    row.push({
      text: `${AVAILABLE_PREFIXES[i].emoji} ${AVAILABLE_PREFIXES[i].symbol}`,
      callback_data: `prefix_${AVAILABLE_PREFIXES[i].symbol}`
    });
    if (i + 1 < AVAILABLE_PREFIXES.length) {
      row.push({
        text: `${AVAILABLE_PREFIXES[i + 1].emoji} ${AVAILABLE_PREFIXES[i + 1].symbol}`,
        callback_data: `prefix_${AVAILABLE_PREFIXES[i + 1].symbol}`
      });
    }
    prefixButtons.push(row);
  }

  prefixButtons.push([{ text: '🔙 Back to Menu', callback_data: 'main_menu' }]);

  await ctx.editMessageText(prefixText, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: prefixButtons
    }
  });
}

// Handle prefix selection
bot.action(/^prefix_(.+)$/, async (ctx) => {
  const selectedPrefix = ctx.match[1];
  const userId = ctx.from.id;
  
  // Store selected prefix in user state
  userStates[userId] = {
    selectedPrefix: selectedPrefix,
    step: 'prefix_selected'
  };

  await ctx.answerCbQuery(`✅ Prefix "${selectedPrefix}" selected!`);

  // Show next step - enter phone number
  const confirmText = `\`\`\`
╔═══════════════════╗
║ ✅ PREFIX CONFIRMED ✅      
╚═══════════════════╝
\`\`\`

*Selected Prefix:* \`${selectedPrefix}\`

*Your commands will look like:*
• \`${selectedPrefix}menu\`
• \`${selectedPrefix}help\`
• \`${selectedPrefix}owner\`

\`\`\`
━━━━━━━━━━━━━━━━━━━━━━━
      📱 NEXT STEP 📱
━━━━━━━━━━━━━━━━━━━━━━━
\`\`\`

*Now send your phone number:*

*Format:*
\`/connect <number>\`

*Example:*
\`/connect 2348012345678\`

*Requirements:*
• Numbers only (7-15 digits)
• Include country code
• No symbols (+ - space)
• Don't start with 0

\`\`\`
━━━━━━━━━━━━━━━━━━━━━━━
         👁️ SHARINGAN 👁️
━━━━━━━━━━━━━━━━━━━━━━━
\`\`\``;

  await ctx.editMessageText(confirmText, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: '🔄 Change Prefix', callback_data: 'pair_menu' }],
        [{ text: '🔙 Back to Menu', callback_data: 'main_menu' }]
      ]
    }
  });
});

bot.action('view_pairs', async (ctx) => {
  await ctx.answerCbQuery();
  
  const userID = ctx.from.id.toString();

  if (!adminIDs.includes(userID)) {
    return ctx.answerCbQuery('⚠️ Admin only!', { show_alert: true });
  }

  const pairingPath = './richstore/pairing';
  if (!fs.existsSync(pairingPath)) {
    return ctx.editMessageText('⚠️ No paired devices found.', {
      reply_markup: {
        inline_keyboard: [[{ text: '🔙 Back', callback_data: 'main_menu' }]]
      }
    });
  }

  const entries = fs.readdirSync(pairingPath, { withFileTypes: true });
  const pairedDevices = entries.filter(entry => entry.isDirectory()).map(entry => entry.name);

  if (pairedDevices.length === 0) {
    return ctx.editMessageText('⚠️ No paired devices found.', {
      reply_markup: {
        inline_keyboard: [[{ text: '🔙 Back', callback_data: 'main_menu' }]]
      }
    });
  }

  pagedListPairs[userID] = pairedDevices;
  sendListPairPage(ctx, userID, 0);
});

bot.action('delete_pair', async (ctx) => {
  await ctx.answerCbQuery();
  
  const userID = ctx.from.id.toString();

  if (!adminIDs.includes(userID)) {
    return ctx.answerCbQuery('⚠️ Admin only!', { show_alert: true });
  }

  const pairingPath = './richstore/pairing';
  if (!fs.existsSync(pairingPath)) {
    return ctx.editMessageText('⚠️ No paired devices found.', {
      reply_markup: {
        inline_keyboard: [[{ text: '🔙 Back', callback_data: 'main_menu' }]]
      }
    });
  }

  const entries = fs.readdirSync(pairingPath, { withFileTypes: true });
  const pairedDevices = entries.filter(entry => entry.isDirectory()).map(entry => entry.name);

  if (pairedDevices.length === 0) {
    return ctx.editMessageText('⚠️ No paired devices found.', {
      reply_markup: {
        inline_keyboard: [[{ text: '🔙 Back', callback_data: 'main_menu' }]]
      }
    });
  }

  pagedListPairs[userID] = pairedDevices;
  sendDelPairPage(ctx, userID, 0);
});

bot.action('bot_status', async (ctx) => {
  await ctx.answerCbQuery();
  
  const uptime = Math.floor((Date.now() - botStartTime) / 1000);
  const pairingFolder = './richstore/pairing';
  let pairedCount = 0;
  if (fs.existsSync(pairingFolder)) {
    pairedCount = fs.readdirSync(pairingFolder)
      .filter(file => file.endsWith('@s.whatsapp.net')).length;
  }

  const statusText = `\`\`\`
╔════════════════════╗
║     ⚡ BOT STATUS ⚡         
╚════════════════════╝
\`\`\`

\`\`\`
━━━━━━━━━━━━━━━━━━━━━━

📊 SYSTEM INFORMATION

◆ Status        : 🟢 ONLINE
◆ Uptime        : ${formatRuntime(uptime)}
◆ Paired Devices: ${pairedCount}/70
◆ Platform      : Telegram
◆ Version       : v1.4.1

━━━━━━━━━━━━━━━━━━━━━━

🔥 PERFORMANCE

◆ Response Time : ⚡ Instant
◆ Security      : 🔐 Military Grade
◆ Reliability   : 💯 99.9% Uptime
◆ Support       : 🌙 24/7 Active

━━━━━━━━━━━━━━━━━━━━━━━
        👁️ SHARINGAN 👁️
━━━━━━━━━━━━━━━━━━━━━━━
\`\`\`

_"Power is not will, it is the_
_phenomenon of physically making_
_things happen."_ — 𝐈𝐭𝐚𝐜𝐡𝐢 🍃`;

  await ctx.editMessageText(statusText, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: '🔙 Back to Menu', callback_data: 'main_menu' }]
      ]
    }
  });
});

bot.action('help_menu', async (ctx) => {
  await ctx.answerCbQuery();
  
  const helpText = `\`\`\`
╔══════════════════════╗
║       ℹ️ HELP MENU ℹ️        
╚══════════════════════╝
\`\`\`

*Available Commands:*

\`\`\`
━━━━━━━━━━━━━━━━━━━━━━━

🔗 /connect <number>
   └─ Pair WhatsApp device
   └─ You must select a prefix first!
   └─ Example: /connect 2348012345678

🗑️ /delpair <number>
   └─ Delete paired device
   └─ Example: /delpair 2348012345678

⏱️ /runtime
   └─ Check bot uptime

📋 /listpair
   └─ View all paired devices
   └─ Admin only

📢 /broadcast <message>
   └─ Send message to all users
   └─ Admin only

━━━━━━━━━━━━━━━━━━━━━━━
\`\`\`

*Prefix System:*

✅ Choose your prefix before pairing
✅ Available: . ! / # $ & * + > ~
✅ Can't be changed after pairing

*Format Requirements:*

✅ Numbers only (no letters)
✅ 7-15 digits
✅ Include country code
✅ No symbols (+ - space)

❌ Don't start with 0

\`\`\`
━━━━━━━━━━━━━━━━━━━━━━━
        👁️ SHARINGAN 👁️
━━━━━━━━━━━━━━━━━━━━━━━
\`\`\``;

  await ctx.editMessageText(helpText, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: '🔙 Back to Menu', callback_data: 'main_menu' }]
      ]
    }
  });
});

bot.action('channels', async (ctx) => {
  await ctx.answerCbQuery();
  
  const channelText = `\`\`\`
╔════════════════════╗
║      📢 CHANNELS 📢          
╚════════════════════╝
\`\`\`

*Join Our Official Channels:*

\`\`\`
━━━━━━━━━━━━━━━━━━━━━━━

🌙 LUMORA TECH
   └─ Main Channel
   └─ Updates & News

🔴 ITACHI HUB
   └─ Bot Updates
   └─ New Features

💬 LUMORA CHAT
   └─ Support Group
   └─ Community Help

━━━━━━━━━━━━━━━━━━━━━━━
       👁️ SHARINGAN 👁️
━━━━━━━━━━━━━━━━━━━━━━━
\`\`\``;

  await ctx.editMessageText(channelText, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: '🌙 Lumora Tech', url: 'https://t.me/lumoratech' }],
        [{ text: '🔴 Itachi Hub', url: 'https://t.me/lumorabots' }],
        [{ text: '💬 Lumora Chat', url: 'https://t.me/lumoratech_chat' }],
        [{ text: '👨‍💻 Developer', url: 'https://t.me/dev_kingsley' }],
        [{ text: '🔙 Back to Menu', callback_data: 'main_menu' }]
      ]
    }
  });
});

bot.action('ignore', (ctx) => ctx.answerCbQuery());

// ═══════════════════════════════════════════════════════════
// ⏱️ /RUNTIME COMMAND
// ═══════════════════════════════════════════════════════════

bot.command('runtime', async (ctx) => {
  const uptime = Math.floor((Date.now() - botStartTime) / 1000);
  
  await ctx.reply(
    `\`\`\`
╔═══════════════════╗
║  ⚡ RUNTIME STATUS ⚡      
╚═══════════════════╝

━━━━━━━━━━━━━━━━━━━━━

◆ Uptime: ${formatRuntime(uptime)}
◆ Status: 🟢 ONLINE & ACTIVE

━━━━━━━━━━━━━━━━━━━━━━
       👁️ SHARINGAN 👁️
━━━━━━━━━━━━━━━━━━━━━━
\`\`\``,
    { 
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: '📋 Main Menu', callback_data: 'main_menu' }]
        ]
      }
    }
  );
});

// ═══════════════════════════════════════════════════════════
// 🔗 /CONNECT COMMAND (WITH PREFIX CHECK)
// ═══════════════════════════════════════════════════════════

bot.command('connect', async (ctx) => {
  try {
    const userId = ctx.from.id;
    
    // Check if user has selected a prefix
    const selectedPrefix = getUserPrefix(userId);
    
    if (!selectedPrefix) {
      return ctx.reply(
        `\`\`\`
╔═════════════════════╗
║ ⚠️ PREFIX NOT SELECTED ⚠️   
╚═════════════════════╝
\`\`\`

*You must select a prefix first!*

\`\`\`
━━━━━━━━━━━━━━━━━━━━━━

Please select your bot prefix
before pairing your device.

━━━━━━━━━━━━━━━━━━━━━━
         👁️ SHARINGAN 👁️
━━━━━━━━━━━━━━━━━━━━━━
\`\`\``,
        {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: '⚙️ Select Prefix', callback_data: 'pair_menu' }],
              [{ text: '📋 Main Menu', callback_data: 'main_menu' }]
            ]
          }
        }
      );
    }

    const channelUsernames = ['@lumoratech', '@k0mraid_host', '@lumorachat', '@lumorabots_chat'];
    
    let joinedAllChannels = true;
    for (const channel of channelUsernames) {
      try {
        const member = await ctx.telegram.getChatMember(channel, userId);
        if (['left', 'kicked'].includes(member.status)) {
          joinedAllChannels = false;
          break;
        }
      } catch (e) {
        joinedAllChannels = false;
        break;
      }
    }

    if (!joinedAllChannels) {
      return ctx.reply(
        `\`\`\`
╔════════════════════╗
║    ⚠️ ACCESS DENIED ⚠️       
╚════════════════════╝
\`\`\`

You must join all channels first

\`\`\`
━━━━━━━━━━━━━━━━━━━━━━━
    🗡️ REQUIREMENTS 🗡️
━━━━━━━━━━━━━━━━━━━━━━━

⚔️ Join all channels below
⚔️ Tap 'Verify' when done
⚔️ Access will be granted

━━━━━━━━━━━━━━━━━━━━━━━
         👁️ SHARINGAN 👁️
━━━━━━━━━━━━━━━━━━━━━━━
\`\`\``,
        {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: '📢 Channel 1', url: 'https://t.me/lumoratech' }],
              [{ text: '📢 Channel 2', url: 'https://t.me/k0mraid_host' }],
              [{ text: '💬 Group 1', url: 'https://t.me/lumorachat' }],
              [{ text: '💬 Group 2', url: 'https://t.me/lumorabots_chat' }],
              [{ text: '✅ Verify Join', callback_data: 'check_join' }]
            ]
          }
        }
      );
    }

    const text = ctx.message.text.split(' ')[1];
    
    if (!text) {
      return ctx.reply(
        `\`\`\`
╔══════════════════════╗
║    ⚠️ INVALID FORMAT ⚠️     
╚══════════════════════╝
\`\`\`

*Usage:*
\`/connect <number>\`

*Example:*
\`/connect 2348012345678\`

*Your selected prefix:* \`${selectedPrefix}\`

\`\`\`
━━━━━━━━━━━━━━━━━━━━━━━
         👁️ SHARINGAN 👁️
━━━━━━━━━━━━━━━━━━━━━━━
\`\`\``,
        { parse_mode: 'Markdown' }
      );
    }

    if (/[a-z]/i.test(text)) {
      return ctx.reply('❌ Invalid! Numbers only, no letters.');
    }

    if (!/^\d{7,15}(\|\d{1,10})?$/.test(text)) {
      return ctx.reply('❌ Invalid format! Use: `/connect 234xxxxxxxxxx`', { parse_mode: 'Markdown' });
    }

    if (text.startsWith('0')) {
      return ctx.reply('❌ Don\'t start with 0! Include country code.');
    }

    const target = text.split("|")[0];
    const Xreturn = target.replace(/[^0-9]/g, '') + "@s.whatsapp.net";

    const countryCode = text.slice(0, 3);
    if (["252", "201"].includes(countryCode)) {
      return ctx.reply("⚠️ Country code not supported.");
    }

    const pairingFolder = './richstore/pairing';
    if (!fs.existsSync(pairingFolder)) {
      fs.mkdirSync(pairingFolder, { recursive: true });
    }
    
    const pairedUsersFromJson = fs.readdirSync(pairingFolder)
      .filter(file => file.endsWith('@s.whatsapp.net')).length;
    
    if (pairedUsersFromJson >= 70) {
      return ctx.reply('⚠️ **Pairing limit reached (70/70)**\n\nContact owner to expand capacity.', { parse_mode: 'Markdown' });
    }

    // Save the prefix for this device
    savePrefix(userId, target, selectedPrefix);

    await startpairing(Xreturn);
    await sleep(4000);

    const cu = fs.readFileSync('./richstore/pairing/pairing.json', 'utf-8');
    const cuObj = JSON.parse(cu);

    await ctx.reply(
      `\`\`\`
╔═══════════════════╗
║    ✅ PAIRING CODE ✅       
╚═══════════════════╝

━━━━━━━━━━━━━━━━━━━━━━

◆ Number: ${target}
◆ Code: ${cuObj.code}
◆ Prefix: ${selectedPrefix}
◆ Expires: ⏱️ 2 minutes

━━━━━━━━━━━━━━━━━━━━━━
\`\`\`

*How to Link:*

1️⃣ Open WhatsApp
2️⃣ Settings → Linked Devices
3️⃣ Link a Device
4️⃣ Enter code above

*Your commands will use:* \`${selectedPrefix}\`
*Example:* \`${selectedPrefix}menu\`

\`\`\`
━━━━━━━━━━━━━━━━━━━━━━━
         👁️ SHARINGAN 👁️
━━━━━━━━━━━━━━━━━━━━━━━
\`\`\``,
      {
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
        reply_markup: {
          inline_keyboard: [
            [
              { text: '📢 Channel', url: 'https://t.me/lumoratech' },
              { text: '👨‍💻 Dev', url: 'https://t.me/dev_kingsley' }
            ],
            [{ text: '📋 Main Menu', callback_data: 'main_menu' }]
          ]
        }
      }
    );
    // Clear user state after successful pairing
    delete userStates[userId];

  } catch (error) {
    console.error('Error in connect command:', error);
    ctx.reply('❌ An error occurred. Please try again.');
  }
});

// ═══════════════════════════════════════════════════════════
// ✅ CHECK JOIN CALLBACK
// ═══════════════════════════════════════════════════════════

bot.action('check_join', async (ctx) => {
  const channelUsernames = ['@lumoratech', '@lumorabots', '@lumoratech_chat', '@lumorabots_chat'];
  const userId = ctx.from.id;
  let joinedAllChannels = true;

  for (const channel of channelUsernames) {
    try {
      const member = await ctx.telegram.getChatMember(channel, userId);
      if (['left', 'kicked'].includes(member.status)) {
        joinedAllChannels = false;
        break;
      }
    } catch (e) {
      joinedAllChannels = false;
      break;
    }
  }

  if (joinedAllChannels) {
    await ctx.answerCbQuery('✅ Verified! Access granted.');
    await ctx.deleteMessage().catch(() => {});
    await showMainMenu(ctx);
  } else {
    await ctx.answerCbQuery('❌ Please join all channels first!', { show_alert: true });
  }
});

// ═══════════════════════════════════════════════════════════
// 🗑️ /DELPAIR COMMAND
// ═══════════════════════════════════════════════════════════

bot.command('delpair', async (ctx) => {
  const text = ctx.message.text.trim();
  const args = text.split(' ').slice(1);

  if (args.length === 0) {
    return ctx.reply(
      '*Usage:* `/delpair 234xxxxxxxx`',
      { parse_mode: 'Markdown' }
    );
  }

  const inputNumber = args[0].replace(/\D/g, '');
  const jidSuffix = `${inputNumber}@s.whatsapp.net`;

  const pairingPath = './richstore/pairing';
  if (!fs.existsSync(pairingPath)) {
    return ctx.reply('⚠️ No paired devices found.');
  }

  const entries = fs.readdirSync(pairingPath, { withFileTypes: true });
  const matched = entries.find(entry => entry.isDirectory() && entry.name.endsWith(jidSuffix));

  if (!matched) {
    return ctx.reply(`❌ No paired device found for: ${inputNumber}`);
  }

  const targetPath = `${pairingPath}/${matched.name}`;
  fs.rmSync(targetPath, { recursive: true, force: true });

  // Also remove from prefix store
  const prefixes = JSON.parse(fs.readFileSync(prefixStore));
  delete prefixes[matched.name];
  fs.writeFileSync(prefixStore, JSON.stringify(prefixes, null, 2));

  ctx.reply(
    `\`\`\`
╔═══════════════════╗
║ ✅ DELETION SUCCESS ✅     
╚═══════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━

◆ Number: ${inputNumber}
◆ Device: ${matched.name}
◆ Status: 🗑️ DELETED

━━━━━━━━━━━━━━━━━━━━━━━━━
         👁️ SHARINGAN 👁️
━━━━━━━━━━━━━━━━━━━━━━━━━
\`\`\``,
    { parse_mode: 'Markdown' }
  );
});

// ═══════════════════════════════════════════════════════════
// 📢 /BROADCAST COMMAND (ADMIN ONLY)
// ═══════════════════════════════════════════════════════════

bot.command('broadcast', async (ctx) => {
  const senderId = ctx.from.id;
  const message = ctx.message.text.split(' ').slice(1).join(' ');

  if (!adminIDs.includes(senderId.toString())) {
    return ctx.reply('⚠️ Admin only!');
  }

  if (!message) {
    return ctx.reply('*Usage:* `/broadcast <message>`', { parse_mode: 'Markdown' });
  }

  const users = JSON.parse(fs.readFileSync(userStore));
  let success = 0;
  let failed = 0;

  for (const userId of users) {
    try {
      await ctx.telegram.sendMessage(userId, `📢 **Broadcast:**\n\n${message}`, {
        parse_mode: 'Markdown'
      });
      success++;
    } catch {
      failed++;
    }
  }

  ctx.reply(`✅ Broadcast complete!\n\n📊 Success: ${success}\n❌ Failed: ${failed}`);
});

// ═══════════════════════════════════════════════════════════
// 🔄 PAGINATION CALLBACKS
// ═══════════════════════════════════════════════════════════

bot.action(/^listpair_page_(\d+)$/, async (ctx) => {
  const pageIndex = parseInt(ctx.match[1], 10);
  const userID = ctx.from.id.toString();
  sendListPairPage(ctx, userID, pageIndex);
  ctx.answerCbQuery();
});

bot.action(/^delpair_page_(\d+)$/, async (ctx) => {
  const pageIndex = parseInt(ctx.match[1], 10);
  const userID = ctx.from.id.toString();
  sendDelPairPage(ctx, userID, pageIndex);
  ctx.answerCbQuery();
});

bot.action(/^delpair_(.+)$/, async (ctx) => {
  const deviceId = ctx.match[1];
  const pairingPath = './richstore/pairing';
  const targetPath = `${pairingPath}/${deviceId}`;

  if (fs.existsSync(targetPath)) {
    fs.rmSync(targetPath, { recursive: true, force: true });
    
    // Also remove from prefix store
    const prefixes = JSON.parse(fs.readFileSync(prefixStore));
    delete prefixes[deviceId];
    fs.writeFileSync(prefixStore, JSON.stringify(prefixes, null, 2));
    
    ctx.answerCbQuery('✅ Device deleted!', { show_alert: true });
    
    const userID = ctx.from.id.toString();
    const entries = fs.readdirSync(pairingPath, { withFileTypes: true });
    pagedListPairs[userID] = entries.filter(entry => entry.isDirectory()).map(entry => entry.name);
    sendDelPairPage(ctx, userID, 0);
  } else {
    ctx.answerCbQuery('❌ Device not found!', { show_alert: true });
  }
});

// ═══════════════════════════════════════════════════════════
// 🚀 BOT LAUNCH
// ═══════════════════════════════════════════════════════════

bot.launch()
  .then(() => {
    console.log('╔═══════════════════════╗');
    console.log('║     🌑 ITACHI MD 🌑          ║');
    console.log('╚═════════════════════╝');
    console.log('');
    console.log('✅ Bot running successfully');
    console.log('👁️ Sharingan Activated');
    console.log('⚡ Powered by Lumora Tech');
    console.log('📝 Prefix System: Enabled');
    console.log('');
  })
  .catch(err => {
    console.error('❌ Launch error:', err);
  });

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

module.exports = bot;