const express = require("express");
const router = express.Router();
const { AI_KNOWLEDGE_BASE, TRENDS, MARKET_OVERVIEW } = require("../data/marketData");

const KEYWORD_MAP = {
  "generative ai": "generative ai",
  genai: "generative ai",
  "gpt": "generative ai",
  "llm": "generative ai",
  "large language": "generative ai",
  "foundation model": "generative ai",
  "agent": "agentic",
  "agentic": "agentic",
  "autonomous": "agentic",
  "workflow": "agentic",
  "healthcare": "healthcare",
  "medical": "healthcare",
  "drug": "healthcare",
  "clinical": "healthcare",
  "health": "healthcare",
  "invest": "investment",
  "funding": "investment",
  "venture": "investment",
  "vc": "investment",
  "market size": "market size",
  "market cap": "market size",
  "valuation": "market size",
  "billion": "market size",
  "cyber": "cybersecurity",
  "security": "cybersecurity",
  "threat": "cybersecurity",
  "hacking": "cybersecurity",
  "vector": "vector database",
  "embedding": "vector database",
  "rag": "vector database",
  "retrieval": "vector database",
  "pinecone": "vector database"
};

function detectTopic(message) {
  const lower = message.toLowerCase();
  for (const [keyword, topic] of Object.entries(KEYWORD_MAP)) {
    if (lower.includes(keyword)) return topic;
  }
  return null;
}

function detectTrendQuery(message) {
  const lower = message.toLowerCase();
  return TRENDS.find(
    (t) =>
      lower.includes(t.name.toLowerCase()) ||
      t.tags.some((tag) => lower.includes(tag.toLowerCase()))
  );
}

function buildResponse(userMessage) {
  const lower = userMessage.toLowerCase();

  if (lower.match(/^(hi|hello|hey|good morning|good afternoon|good evening|howdy)/)) {
    return {
      type: "greeting",
      message: AI_KNOWLEDGE_BASE.greetings[Math.floor(Math.random() * AI_KNOWLEDGE_BASE.greetings.length)],
      suggestions: [
        "What is the top trending AI technology right now?",
        "Show me the AI market size and projections",
        "What are the best AI investment opportunities?",
        "Which sectors have the highest AI growth?"
      ]
    };
  }

  if (lower.includes("top") && (lower.includes("trend") || lower.includes("hot"))) {
    const top5 = [...TRENDS].sort((a, b) => b.trendScore - a.trendScore).slice(0, 5);
    return {
      type: "trends",
      message: `Here are the **Top 5 AI Trends** by trend score right now:`,
      items: top5.map((t) => ({
        name: t.name,
        score: t.trendScore,
        status: t.status,
        cagr: t.cagr,
        marketSize: t.marketSize
      })),
      suggestions: [
        "Tell me more about Generative AI",
        "Which trends are in explosive growth?",
        "What are the AI trends in healthcare?"
      ]
    };
  }

  if (lower.includes("fastest") || lower.includes("highest growth") || lower.includes("most growth")) {
    const sorted = [...TRENDS].sort((a, b) => b.growthRate - a.growthRate).slice(0, 3);
    return {
      type: "trends",
      message: `These are the **Fastest Growing AI Trends** by annual growth rate:`,
      items: sorted.map((t) => ({
        name: t.name,
        growthRate: `${t.growthRate}% YoY`,
        cagr: `${t.cagr}% CAGR`,
        marketSize: `$${t.marketSize}B → $${t.projectedSize}B`
      })),
      suggestions: ["What sectors lead in AI growth?", "Tell me about Vector Databases"]
    };
  }

  if (
    lower.includes("overview") ||
    lower.includes("market size") ||
    lower.includes("total market") ||
    lower.includes("global market")
  ) {
    return {
      type: "overview",
      message: `**Global AI Market Overview (2024)**`,
      data: MARKET_OVERVIEW,
      suggestions: [
        "What is the best sector to invest in AI?",
        "Tell me about AI investment trends",
        "Which companies are leading AI adoption?"
      ]
    };
  }

  const matchedTrend = detectTrendQuery(userMessage);
  if (matchedTrend) {
    return {
      type: "trend_detail",
      message: `Here's what I know about **${matchedTrend.name}**:`,
      trend: {
        name: matchedTrend.name,
        trendScore: matchedTrend.trendScore,
        marketSize: matchedTrend.marketSize,
        projectedSize: matchedTrend.projectedSize,
        cagr: matchedTrend.cagr,
        status: matchedTrend.status,
        description: matchedTrend.description,
        keyPlayers: matchedTrend.keyPlayers,
        useCases: matchedTrend.useCases,
        riskLevel: matchedTrend.riskLevel,
        adoptionStage: matchedTrend.adoptionStage
      },
      suggestions: [
        `What are the use cases for ${matchedTrend.name}?`,
        "Compare with another trend",
        "Generate a proposal for this trend"
      ]
    };
  }

  const topic = detectTopic(userMessage);
  if (topic && AI_KNOWLEDGE_BASE.topicResponses[topic]) {
    const resp = AI_KNOWLEDGE_BASE.topicResponses[topic];
    return {
      type: "knowledge",
      message: `**${resp.title}**\n\n${resp.summary}`,
      keyPoints: resp.keyPoints,
      recommendation: resp.recommendation,
      suggestions: [
        "What is the market size for this?",
        "Who are the key players?",
        "Generate an executive proposal for this"
      ]
    };
  }

  if (lower.includes("risk")) {
    const lowRisk = TRENDS.filter((t) => t.riskLevel === "Low");
    return {
      type: "risk",
      message: `For low-risk AI investments, these trends are rated **Low Risk** with strong fundamentals:`,
      items: lowRisk.map((t) => ({
        name: t.name,
        riskLevel: t.riskLevel,
        cagr: `${t.cagr}% CAGR`,
        status: t.status
      })),
      suggestions: ["Which trends have highest ROI?", "Tell me about AI governance risks"]
    };
  }

  if (lower.includes("compar")) {
    return {
      type: "comparison",
      message: `Here's a quick comparison of the **Top 3 AI Technology Trends**:`,
      items: [...TRENDS]
        .filter((t) => t.category === "AI Technology")
        .sort((a, b) => b.trendScore - a.trendScore)
        .slice(0, 3)
        .map((t) => ({
          name: t.name,
          trendScore: t.trendScore,
          cagr: `${t.cagr}%`,
          marketSize: `$${t.marketSize}B`,
          status: t.status
        })),
      suggestions: ["Compare industry applications", "Tell me about multimodal AI"]
    };
  }

  if (lower.includes("proposal") || lower.includes("recommend") || lower.includes("suggest")) {
    const topTrend = TRENDS.reduce((a, b) => (a.trendScore > b.trendScore ? a : b));
    return {
      type: "recommendation",
      message: `**Strategic AI Investment Recommendation**`,
      recommendation: `Based on current trend scores and market dynamics, I recommend prioritizing **${topTrend.name}** as your primary AI initiative. With a ${topTrend.cagr}% CAGR and market growing from $${topTrend.marketSize}B to $${topTrend.projectedSize}B, the ROI opportunity is substantial. Use the Proposal Generator to create a full executive deck.`,
      steps: [
        "1. Assess your current data infrastructure readiness",
        "2. Identify 2-3 high-value use cases from the trend report",
        "3. Run a 90-day proof-of-concept with measurable KPIs",
        "4. Scale successful pilots with a phased 18-month roadmap",
        "5. Establish AI governance framework before full deployment"
      ],
      suggestions: [
        "Open the Proposal Generator",
        "What ROI can I expect from GenAI?",
        "What is the implementation timeline?"
      ]
    };
  }

  return {
    type: "fallback",
    message: `I can help you with AI market insights. Here are some things you can ask me:`,
    suggestions: [
      "What are the top AI trends right now?",
      "Show me the global AI market overview",
      "Which AI sector has the highest growth?",
      "What are the best AI investment opportunities?",
      "Tell me about Generative AI",
      "What is the market size for AI in Healthcare?",
      "Compare AI technology trends",
      "What are the low-risk AI trends?"
    ]
  };
}

router.post("/chat", (req, res) => {
  const { message, sessionId } = req.body;

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return res.status(400).json({ success: false, message: "Message is required" });
  }

  if (message.trim().length > 500) {
    return res.status(400).json({ success: false, message: "Message too long (max 500 chars)" });
  }

  try {
    const response = buildResponse(message.trim());
    res.json({
      success: true,
      sessionId: sessionId || "default",
      userMessage: message.trim(),
      response,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Assistant error", error: err.message });
  }
});

router.get("/suggestions", (req, res) => {
  res.json({
    success: true,
    data: [
      "What are the top AI trends right now?",
      "Show me the global AI market overview",
      "Tell me about Generative AI market size",
      "Which AI sector has the highest growth rate?",
      "What are the best low-risk AI investments?",
      "Compare AI technology trends",
      "What is Retrieval-Augmented Generation (RAG)?",
      "What ROI can I expect from AI in Healthcare?"
    ]
  });
});

module.exports = router;
