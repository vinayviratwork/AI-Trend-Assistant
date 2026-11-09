const express = require("express");
const cors = require("cors");
const path = require("path");

const trendsRouter = require("./routes/trends");
const assistantRouter = require("./routes/assistant");
const proposalRouter = require("./routes/proposal");

const app = express();
const PORT = process.env.PORT || 5000;

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:3000"
];

app.use(cors({
  origin: (incomingOrigin, callback) => {
    if (!incomingOrigin || ALLOWED_ORIGINS.includes(incomingOrigin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin '${incomingOrigin}' is not allowed`));
    }
  }
}));
app.use(express.json());

app.use("/api/trends", trendsRouter);
app.use("/api/assistant", assistantRouter);
app.use("/api/proposal", proposalRouter);

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "AI Market Product Trend Assistant API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    endpoints: [
      "GET  /api/health",
      "GET  /api/trends",
      "GET  /api/trends/overview",
      "GET  /api/trends/filters",
      "GET  /api/trends/:id",
      "POST /api/assistant/chat",
      "GET  /api/assistant/suggestions",
      "POST /api/proposal/generate",
      "GET  /api/proposal/:id",
      "GET  /api/proposal/templates/list"
    ]
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found` });
});

app.use((err, req, res, _next) => {
  console.error("[Error]", err.message);
  res.status(500).json({ success: false, message: "Internal server error", error: err.message });
});

app.listen(PORT, () => {
  console.log("╔══════════════════════════════════════════════════════╗");
  console.log("║   AI Market Product Trend Assistant — Backend API    ║");
  console.log(`║   Server running at: http://localhost:${PORT}           ║`);
  console.log("║   Health check:  GET /api/health                     ║");
  console.log("╚══════════════════════════════════════════════════════╝");
});
