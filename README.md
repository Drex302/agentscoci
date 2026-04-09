# Agent SCOCI
**Self-Care of Chronic Illness** — Occupation-centered AI companion built by an OT

---

## Project structure

```
agentscoci/
├── public/
│   ├── index.html          ← Landing page (agentscoci.site)
│   ├── manifest.json       ← PWA manifest
│   ├── sw.js               ← Service worker (offline support)
│   ├── icons/
│   │   ├── icon-192.png    ← PWA icon (you need to add this)
│   │   └── icon-512.png    ← PWA icon (you need to add this)
│   └── app/
│       └── index.html      ← Full app (agentscoci.site/app)
├── vercel.json             ← Vercel routing + security headers
└── README.md
```

---

## Deploy to Vercel (step by step)

### 1. Add PWA icons
You need two PNG icons before deploying:
- `public/icons/icon-192.png` — 192×192px
- `public/icons/icon-512.png` — 512×512px

Create them at https://favicon.io or use any image editor.
Use the teal color `#1D9E75` with the Agent SCOCI waveform logo.

### 2. Create a GitHub repo
```bash
cd agentscoci
git init
git add .
git commit -m "Initial Agent SCOCI deploy"
```
Then create a new repo at github.com and push:
```bash
git remote add origin https://github.com/YOUR_USERNAME/agentscoci.git
git push -u origin main
```

### 3. Deploy to Vercel
1. Go to vercel.com → sign up free
2. Click "Add New Project"
3. Import your GitHub repo
4. Set **Root Directory** to `public`
5. Leave all other settings as default
6. Click Deploy

Your site will be live at a `.vercel.app` URL immediately.

### 4. Connect your domain (agentscoci.site)
1. In Vercel → your project → Settings → Domains
2. Add `agentscoci.site`
3. Vercel gives you DNS records (usually an A record or CNAME)
4. Log into your domain registrar (Porkbun/Namecheap)
5. Add the DNS records Vercel provides
6. Wait 5–30 minutes for DNS to propagate
7. Vercel auto-provisions your SSL certificate (HTTPS) — free

---

## AI modes

### On-device AI (WebLLM) — default, fully private
- Uses Phi-3.5-mini running in the browser via WebGPU
- Requires Chrome/Edge on desktop or Android
- First load downloads ~2GB model (cached forever after)
- Zero data leaves the device — HIPAA-friendly

### Cloud AI (Claude via Anthropic API)
- User provides their own Anthropic API key
- Key stored in IndexedDB on device only, never sent to your server
- Uses claude-haiku for speed and cost efficiency
- Higher quality responses than local model

---

## Data & privacy

All user data is stored in **IndexedDB** on the user's device:
- `profile` — the 7-step intake responses
- `chatHistory` — conversation history
- `api-key` — Anthropic API key (cloud mode only)

Nothing is transmitted to any server in local/PWA mode.
No analytics, no tracking, no ads.

---

## Future additions (roadmap)

- [ ] Daily check-in prompts (push notifications via Web Push API)
- [ ] Symptom trend charts (Chart.js)
- [ ] PDF report generator (jsPDF)
- [ ] Stripe payment integration for Plus plan
- [ ] OT Practice dashboard (multi-patient view)
- [ ] Apple Health / Google Fit integration

---

## Legal

Agent SCOCI is not a medical device and does not provide medical advice, diagnosis, or treatment.
Always consult a qualified occupational therapist, physician, or health provider.

© 2026 Agent SCOCI · agentscoci.site
