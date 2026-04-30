# ITACHI MD — Web Pair Backend

WhatsApp bot backend with web pairing. Users pair their number via the site, session is saved on the VPS, and the full ITACHI MD bot runs on their WhatsApp.

## Stack
- Node.js 20
- Express (web pairing server)
- Baileys (WhatsApp connection)
- pm2 (process manager)

## Setup on VPS

```bash
# Install deps
npm install
cd server && npm install && cd ..
cd client && npm install && npm run build && cd ..

# Start
pm2 start ecosystem.config.cjs
pm2 save && pm2 startup
```

## Environment
Set in `ecosystem.config.cjs`:
```
PORT=5000
FRONTEND_URL=https://your-vercel-app.vercel.app
NODE_ENV=production
```

## Developer
Built by Dev Kingsley — Lumora Tech
