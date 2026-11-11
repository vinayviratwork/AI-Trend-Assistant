# 📈 AI Market Trend Assistant

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat&logo=express&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat)

A full-stack **executive intelligence platform** for exploring AI market trends, querying a conversational AI assistant, and generating 8-slide executive proposal decks — all in one app.

---

## ✨ Features

- **📊 Dashboard** — Browse 10 real AI market trends with live search, filters (category / sector / status), sort by score/CAGR/market size, and interactive 12-month trend charts
- **🤖 AI Assistant** — Conversational interface for market intelligence. Ask about top trends, market sizes, investment opportunities, sector comparisons, and strategic recommendations
- **📄 Proposal Generator** — 4-step wizard that builds an 8-slide executive AI transformation proposal with speaker notes, ROI projections, and implementation roadmap. Export as JSON
- **📱 Responsive UI** — Dark navy theme, works on desktop and mobile with a collapsible hamburger menu
- **🔒 CORS Restricted** — Backend only accepts requests from whitelisted localhost origins

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8, Recharts 3, Lucide React |
| Backend | Node.js 18+, Express 4 |
| Styling | Pure CSS with custom properties (dark theme) |
| Charts | Recharts LineChart |
| Icons | Lucide React |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm v9+

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/vinayviratwork/AI-Trend-Assistant.git
cd ai-trend-assistant

# 2. Install all dependencies (server + client)
npm run install:all

# 3. Configure client environment
cp client/.env.example client/.env
```

### Running (2 terminals)

```bash
# Terminal 1 — Backend (port 5000)
cd server
node index.js

# Terminal 2 — Frontend (port 3000)
cd client
npm run dev
```

Open browser → `http://localhost:3000`

---

## ⚙️ Environment Variables

### `client/.env`

| Variable | Default | Description |
|---|---|---|
| `VITE_API_URL` | `http://localhost:5000/api` | Backend API base URL |

---

## 📡 API Reference

Base URL: `http://localhost:5000`

### Trends

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/trends` | List all trends (`?search`, `?category`, `?sector`, `?status`, `?sort`) |
| GET | `/api/trends/overview` | Global AI market stats |
| GET | `/api/trends/filters` | Available filter values |
| GET | `/api/trends/:id` | Single trend by ID (`t001`–`t010`) |

### AI Assistant

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/assistant/chat` | Send message, get structured market response |
| GET | `/api/assistant/suggestions` | 8 starter questions |

### Proposal Generator

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/proposal/generate` | Generate 8-slide executive proposal |
| GET | `/api/proposal/:id` | Retrieve generated proposal by UUID |
| GET | `/api/proposal/templates/list` | Available proposal templates |

### Health

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Server status + all endpoint list |

---

## 📊 Trend Data Reference

| ID | Trend | Score | CAGR |
|---|---|---|---|
| t001 | Generative AI | 98/100 | 79.8% |
| t002 | AI Agents & Agentic Workflows | 94/100 | 44.8% |
| t003 | AI in Healthcare | 91/100 | 76.4% |
| t004 | Edge AI & TinyML | 82/100 | 29.5% |
| t005 | AI-Powered Cybersecurity | 88/100 | 32.4% |
| t006 | Multimodal AI | 92/100 | 71.5% |
| t007 | AI in Retail & E-Commerce | 85/100 | 37.1% |
| t008 | Responsible AI & Governance | 80/100 | 41.0% |
| t009 | AI in Financial Services | 87/100 | 30.6% |
| t010 | Vector Databases & RAG | 89/100 | 58.7% |

---

## 📁 Project Structure

```
ai-trend-assistant/
├── server/
│   ├── index.js                  # Express server (port 5000)
│   ├── data/
│   │   └── marketData.js         # All trend data + AI knowledge base
│   └── routes/
│       ├── trends.js             # Trend listing, filtering, detail
│       ├── assistant.js          # AI chat engine (keyword matching)
│       └── proposal.js           # 8-slide proposal generator
└── client/
    ├── .env.example
    ├── vite.config.js
    └── src/
        ├── App.jsx               # Root component + tab routing + mobile menu
        ├── index.css             # Global CSS variables + dark theme
        ├── utils/
        │   ├── api.js            # Centralised API calls (env-based URL)
        │   └── formatters.js     # Number/color formatting helpers
        ├── hooks/
        │   └── useApi.js         # Generic async data fetching hook
        ├── components/
        │   ├── Navbar.jsx        # Responsive nav with hamburger menu
        │   ├── TrendCard.jsx     # Dashboard trend card
        │   └── TrendDetailModal.jsx  # Detail modal with Recharts chart
        └── pages/
            ├── Dashboard.jsx     # Trend explorer with filters + error state
            ├── Assistant.jsx     # AI chat interface
            └── ProposalGenerator.jsx  # 4-step proposal wizard
```

---

## 📄 License

MIT © [Vinay](https://github.com/vinayviratwork)
