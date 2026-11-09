# AI Market Trend Assistant

A full-stack executive intelligence platform for exploring AI market trends, querying an AI assistant for market insights, and generating 8-slide executive proposal decks.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 6, Recharts, Lucide React |
| Backend | Node.js, Express 4 |
| Styling | Pure CSS with custom properties (dark theme) |

---

## Features

- **Dashboard** — Browse 10 AI market trends with live search, filtering by category/sector/status, and sorting by score, CAGR, or market size. Click any trend to see a detail modal with a 12-month chart.
- **AI Assistant** — Conversational interface for market intelligence queries. Ask about top trends, market sizes, investment opportunities, and sector comparisons.
- **Proposal Generator** — 4-step wizard that generates an 8-slide executive AI transformation proposal with speaker notes, ROI metrics, and implementation roadmap. Export as JSON.

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+

### Installation

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd ai-trend-assistant

# 2. Install all dependencies (server + client)
npm run install:all

# 3. Configure client environment
cp client/.env.example client/.env
```

### Running

Open two terminals:

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

## Environment Variables

### `client/.env`

| Variable | Default | Description |
|---|---|---|
| `VITE_API_URL` | `http://localhost:5000/api` | Backend API base URL |

---

## API Reference

All endpoints available at `http://localhost:5000`

### Trends

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/trends` | List all trends (supports `?search`, `?category`, `?sector`, `?status`, `?sort`) |
| GET | `/api/trends/overview` | Global AI market stats |
| GET | `/api/trends/filters` | Available filter values |
| GET | `/api/trends/:id` | Single trend by ID (`t001`–`t010`) |

### AI Assistant

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/assistant/chat` | Send a message, get a structured response |
| GET | `/api/assistant/suggestions` | 8 starter questions |

### Proposal Generator

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/proposal/generate` | Generate an 8-slide proposal |
| GET | `/api/proposal/:id` | Retrieve a generated proposal |
| GET | `/api/proposal/templates/list` | Available proposal templates |

### Health

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Server status and endpoint list |

---

## Trend IDs Reference

| ID | Trend | Score | CAGR |
|---|---|---|---|
| t001 | Generative AI | 98 | 79.8% |
| t002 | AI Agents & Agentic Workflows | 94 | 44.8% |
| t003 | AI in Healthcare | 91 | 76.4% |
| t004 | Edge AI & TinyML | 82 | 29.5% |
| t005 | AI-Powered Cybersecurity | 88 | 32.4% |
| t006 | Multimodal AI | 92 | 71.5% |
| t007 | AI in Retail & E-Commerce | 85 | 37.1% |
| t008 | Responsible AI & Governance | 80 | 41.0% |
| t009 | AI in Financial Services | 87 | 30.6% |
| t010 | Vector Databases & RAG | 89 | 58.7% |

---

## Project Structure

```
ai-trend-assistant/
├── server/
│   ├── index.js              # Express server (port 5000)
│   ├── data/
│   │   └── marketData.js     # All trend data + AI knowledge base
│   └── routes/
│       ├── trends.js         # Trend listing, filtering, detail
│       ├── assistant.js      # Chat AI engine
│       └── proposal.js       # Proposal generation engine
└── client/
    ├── src/
    │   ├── App.jsx            # Root component + tab routing
    │   ├── utils/api.js       # All API calls
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── TrendCard.jsx
    │   │   └── TrendDetailModal.jsx
    │   └── pages/
    │       ├── Dashboard.jsx
    │       ├── Assistant.jsx
    │       └── ProposalGenerator.jsx
    └── .env.example
```

---

## License

MIT
