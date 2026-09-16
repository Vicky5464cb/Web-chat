# WebChat

A simple real-time web chat app built with Node.js, Express, and Socket.IO.

## Features
- Real-time messaging between multiple users
- Username-based join screen
- Online user list
- "User is typing..." indicator
- Join/leave system messages

## Run locally

```bash
npm install
npm start
```

Then open http://localhost:3000 in your browser. Open it in a couple of tabs to chat with "yourself".

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: WebChat app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

(Create the empty repo on GitHub first, then paste the URL above.)

## Deploy for free (so others can use it online)

GitHub Pages only serves static files — it can't run this Node.js server. Use one of these instead (all have free tiers and deploy directly from your GitHub repo):

### Render (recommended, easiest)
1. Go to https://render.com and sign in with GitHub
2. New → Web Service → select your repo
3. Build command: `npm install`
4. Start command: `npm start`
5. Deploy — you'll get a public URL like `https://your-app.onrender.com`

### Railway
1. https://railway.app → New Project → Deploy from GitHub repo
2. It auto-detects Node.js and deploys

### Fly.io / Glitch
Also work well for small Node apps like this one.

## Project structure

```
webchat/
├── server.js          # Express + Socket.IO server
├── package.json
├── public/
│   ├── index.html      # Chat UI
│   ├── style.css
│   └── client.js        # Client-side socket logic
└── README.md
```

## Next steps you could add
- Persist chat history (MongoDB, Firebase, or Supabase)
- Private/direct messages
- Chat rooms/channels
- User authentication
