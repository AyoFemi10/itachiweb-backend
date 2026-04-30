const fs = require('fs')

global.owner = ["2349161768712"]
global.ownernumber = "2349161768712"
global.creator = "2349161768712@s.whatsapp.net"
global.DEVELOPER = ["2349161768712"]
global.OWNER_NAME = "@dev_kingsley"
global.creatorName = "dev_kingsley"
global.ownername = "dev_kingsley"
global.bankowner = "Lumora Tech"
global.author = "\n\n\n\n\nCreated by dev_kingsley\nTelegram: @dev_kingsley"

global.BOT_NAME = "Itachi MD"
global.botName = "Itachi MD"
global.botname = "Itachi MD"
global.version = "2.0.0-beta"

global.footer = "⚫ 𝐈𝐓𝐀𝐂𝐇𝐈 × 𝐌𝐃 | ʟᴜᴍᴏʀᴀ ᴛᴇᴄʜ"
global.packname = "Sticker By Itachi MD"
global.themeemoji = '🔴'
global.location = "Hidden Leaf Village"

global.link = "https://whatsapp.com/channel/0029Vb68jnQ2phHR71id7X3m"
global.wagc = "https://chat.whatsapp.com/FroeLbmEOhd3vWHuTusf3b?mode=ems_copy_t"
global.thumbnail = "https://i.postimg.cc/h4xyXsKC/38e7ffd336110b098fded3523f74ac6a.jpg"
global.gambar = "https://i.postimg.cc/h4xyXsKC/38e7ffd336110b098fded3523f74ac6a.jpg"
global.richpp = ' '

global.xprefix = '.'
global.prefa = ['', '!', '.', '#', '&']
global.status = "public"

global.onlyowner = `🚫 *Access Denied*\n_This command is for the Owner only._\n\n_"Those who abandon their mission are trash."_ — Itachi`
global.database = `⚠️ *Not in Database*\n_Contact @dev_kingsley to get access._`

global.mess = {
  wait: "```⏳ Processing... Itachi MD```",
  success: "✅ *Done.* — Itachi MD",
  on: "🔴 Feature activated.",
  off: "⚫ Feature deactivated.",
  prem: "💎 *Premium only.*\nContact @dev_kingsley to upgrade.",
  query: {
    text: "❌ Provide a text input.",
    link: "❌ Provide a valid link.",
  },
  error: {
    fitur: "⚠️ This feature encountered an error. Contact @dev_kingsley to get it fixed.",
  },
  only: {
    group: "❌ This feature can only be used in Groups.",
    private: "❌ This feature can only be used in Private Chats.",
    owner: "❌ This feature is restricted to the Owner.",
    admin: "❌ This feature can only be used by Admins.",
    badmin: "❌ The bot needs to be a Group Admin to use this feature.",
    premium: "💎 This feature is for Premium users only.",
  }
}

global.hituet = 0
global.autoviewstatus = false
global.autoread = false
global.autobio = true
global.anti92 = true
global.autoswview = true

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m' + __filename + ' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})