const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { TRENDS, MARKET_OVERVIEW, PROPOSAL_TEMPLATES } = require("../data/marketData");

const generatedProposals = new Map();

function buildProposalContent(options) {
  const {
    clientName,
    problemStatement,
    selectedTrends,
    proposalType,
    budgetRange,
    timeline
  } = options;

  const trendDetails = TRENDS.filter((t) => selectedTrends.includes(t.id));
  const primaryTrend = trendDetails[0] || TRENDS[0];

  const totalMarketOpportunity = trendDetails.reduce(
    (sum, t) => sum + t.projectedSize, 0
  ).toFixed(1);

  const avgCAGR = trendDetails.length
    ? (trendDetails.reduce((s, t) => s + t.cagr, 0) / trendDetails.length).toFixed(1)
    : primaryTrend.cagr;

  const template = PROPOSAL_TEMPLATES[proposalType] || PROPOSAL_TEMPLATES["ai-transformation"];

  const slides = [
    {
      slideNumber: 1,
      title: `AI Transformation Proposal`,
      subtitle: `Prepared for: ${clientName}`,
      type: "title",
      content: {
        headline: `Unlocking ${clientName}'s AI Advantage`,
        subheadline: `A Strategic Initiative to Capture the $${totalMarketOpportunity}B AI Market Opportunity`,
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        preparedBy: "AI Market Trend Assistant"
      },
      speakerNotes: `This is the opening title slide. Set the executive tone immediately by anchoring to market opportunity size ($${totalMarketOpportunity}B). The goal is to frame the conversation as strategic, not tactical.`
    },
    {
      slideNumber: 2,
      title: "The Business Problem",
      type: "problem",
      content: {
        headline: "The Cost of Standing Still",
        problemStatement: problemStatement || `Organizations that delay AI adoption risk losing competitive advantage as ${primaryTrend.name} reshapes the industry at a ${primaryTrend.cagr}% annual growth rate.`,
        statistics: [
          { label: "Enterprise AI Adoption", value: `${MARKET_OVERVIEW.enterpriseAIAdoption}%`, context: "of Fortune 500 already have active AI programs" },
          { label: "AI Job Growth", value: `${MARKET_OVERVIEW.aiJobGrowth}% YoY`, context: "AI talent demand outpacing supply globally" },
          { label: "Market CAGR", value: `${avgCAGR}%`, context: "projected compound annual growth rate through 2030" }
        ],
        painPoints: [
          "Manual processes creating bottlenecks at scale",
          "Inability to process and act on large volumes of unstructured data",
          "Competitive pressure from AI-native players",
          "Rising operational costs with flat productivity gains"
        ]
      },
      speakerNotes: `Lead with the burning platform. Executives need to feel urgency — not just opportunity. The ${MARKET_OVERVIEW.enterpriseAIAdoption}% Fortune 500 adoption stat creates FOMO. Pain points should resonate with their current challenges.`
    },
    {
      slideNumber: 3,
      title: "Market Opportunity",
      type: "market",
      content: {
        headline: `A $${totalMarketOpportunity}B Opportunity You Cannot Ignore`,
        globalMarket: {
          current: `$${MARKET_OVERVIEW.globalAIMarketSize2024}B`,
          projected: `$${MARKET_OVERVIEW.globalAIMarketSize2030}B`,
          cagr: `${MARKET_OVERVIEW.overallCAGR}%`
        },
        focusAreas: trendDetails.map((t) => ({
          name: t.name,
          marketSize: `$${t.marketSize}B`,
          projectedSize: `$${t.projectedSize}B`,
          cagr: `${t.cagr}% CAGR`,
          status: t.status,
          sector: t.sector
        })),
        keyInsight: `Early movers in ${primaryTrend.name} are capturing disproportionate market share — the window for first-mover advantage is narrowing.`
      },
      speakerNotes: `Use the market size numbers to establish credibility. Show the delta between current and projected — this is the opportunity cost of inaction. Focus on the sectors most relevant to the client.`
    },
    {
      slideNumber: 4,
      title: "Our Proposed Solution",
      type: "solution",
      content: {
        headline: `The ${primaryTrend.name} Solution Architecture`,
        description: primaryTrend.description,
        solutionPillars: [
          {
            title: "Intelligent Data Layer",
            description: "Unified data pipeline with real-time ingestion, vector embeddings, and semantic search capabilities",
            icon: "database"
          },
          {
            title: "AI Inference Engine",
            description: `${primaryTrend.name} core with fine-tuning and RAG for domain-specific accuracy`,
            icon: "cpu"
          },
          {
            title: "Enterprise Integration",
            description: "REST/GraphQL APIs connecting AI layer to existing ERP, CRM, and workflow systems",
            icon: "link"
          },
          {
            title: "Governance & Observability",
            description: "Model monitoring, explainability dashboards, and compliance audit trails",
            icon: "shield"
          }
        ],
        useCases: trendDetails.flatMap((t) => t.useCases).slice(0, 6),
        keyPlayers: primaryTrend.keyPlayers
      },
      speakerNotes: `The four-pillar architecture makes a complex technical solution digestible for a C-suite audience. Emphasize that this is a proven architecture — not experimental. Reference the key players to establish ecosystem credibility.`
    },
    {
      slideNumber: 5,
      title: "Business Value & ROI",
      type: "roi",
      content: {
        headline: "Measurable Returns from Day One",
        roiMetrics: [
          { metric: "Operational Cost Reduction", value: "25–40%", timeframe: "Year 1", driver: "Process automation and intelligent routing" },
          { metric: "Productivity Gain", value: "30–50%", timeframe: "Year 1–2", driver: "AI-assisted workflows and decision support" },
          { metric: "Revenue Uplift", value: "15–25%", timeframe: "Year 2–3", driver: "Personalization, faster time-to-market, new AI-driven products" },
          { metric: "Risk Reduction", value: "60%", timeframe: "Year 1", driver: "Automated compliance, fraud detection, anomaly monitoring" }
        ],
        paybackPeriod: timeline === "6 months" ? "8–12 months" : "12–18 months",
        estimatedBudget: budgetRange || "$500K–$2M",
        expectedROI: "3–5x over 3 years",
        caseStudyNote: `Organizations implementing ${primaryTrend.name} report average productivity improvements of 35% within the first year of deployment.`
      },
      speakerNotes: `ROI is the most important slide for CFOs and CEOs. Lead with the strongest metric (cost reduction or revenue uplift based on audience). The 3–5x ROI estimate should be conservative — it builds credibility. Always show both cost savings and revenue growth to cover both CFO and CMO interests.`
    },
    {
      slideNumber: 6,
      title: "Implementation Roadmap",
      type: "roadmap",
      content: {
        headline: "A Phased, Low-Risk Path to Value",
        phases: [
          {
            phase: "Phase 1",
            name: "Discovery & Foundation",
            duration: "Weeks 1–6",
            activities: [
              "Current state AI readiness assessment",
              "Data audit and pipeline design",
              "Use case prioritization workshop",
              "Governance framework setup"
            ],
            milestone: "AI Readiness Scorecard delivered",
            color: "#3B82F6"
          },
          {
            phase: "Phase 2",
            name: "Proof of Concept",
            duration: "Weeks 7–14",
            activities: [
              "Build and deploy 2 priority use cases",
              "Model training and fine-tuning",
              "Integration with core systems",
              "User acceptance testing"
            ],
            milestone: "Live PoC with measurable KPIs",
            color: "#8B5CF6"
          },
          {
            phase: "Phase 3",
            name: "Scaled Deployment",
            duration: "Months 4–9",
            activities: [
              "Full production rollout",
              "Team training and change management",
              "Performance optimization",
              "Compliance and audit review"
            ],
            milestone: "Enterprise-wide AI platform live",
            color: "#10B981"
          },
          {
            phase: "Phase 4",
            name: "Optimize & Expand",
            duration: "Month 10+",
            activities: [
              "Continuous model improvement",
              "Expand to new use cases",
              "ROI measurement and reporting",
              "Strategic AI roadmap review"
            ],
            milestone: "Ongoing AI-driven value creation",
            color: "#F59E0B"
          }
        ]
      },
      speakerNotes: `The phased approach reduces perceived risk significantly. Phase 1 PoC delivers quick wins within 90 days — critical for maintaining executive buy-in. Emphasize that each phase has measurable milestones before proceeding to the next.`
    },
    {
      slideNumber: 7,
      title: "Why Act Now",
      type: "urgency",
      content: {
        headline: "The Window for Competitive Advantage Is Closing",
        points: [
          { title: "First-Mover Advantage", body: `${primaryTrend.adoptionStage} stage means early leaders will establish data moats competitors cannot easily replicate` },
          { title: "Talent Availability", body: `AI talent growing at ${MARKET_OVERVIEW.aiJobGrowth}% YoY but demand outpaces supply — building capabilities now secures access` },
          { title: "Regulatory Window", body: "Current regulatory environment is favorable — proactive governance establishes competitive moat before mandates arrive" },
          { title: "Technology Readiness", body: `${primaryTrend.name} is mature enough for enterprise deployment — not experimental, but not yet commoditized` }
        ],
        urgencyMetric: `Every quarter of delay costs an estimated 8–12% in compounded competitive disadvantage as competitors advance their AI maturity.`
      },
      speakerNotes: `This slide answers "why now?" — the most common executive objection. The adoption stage point (Early Majority) is particularly powerful: it signals that this is proven technology, not a risky bet, but the window for differentiation is still open.`
    },
    {
      slideNumber: 8,
      title: "Investment & Next Steps",
      type: "cta",
      content: {
        headline: "Invest in Your AI Future Today",
        investmentSummary: {
          range: budgetRange || "$500K–$2M",
          breakdown: [
            { item: "Phase 1 Discovery & Architecture", percentage: 15 },
            { item: "Phase 2 PoC Development", percentage: 30 },
            { item: "Phase 3 Scaled Deployment", percentage: 40 },
            { item: "Phase 4 Optimization & Support", percentage: 15 }
          ]
        },
        nextSteps: [
          { step: 1, action: "Executive Alignment Meeting", timeline: "This Week", owner: "Executive Sponsor" },
          { step: 2, action: "Technical Discovery Workshop", timeline: "Week 2–3", owner: "CTO / IT Leadership" },
          { step: 3, action: "Formal Proposal & SOW", timeline: "Week 4", owner: "Project Team" },
          { step: 4, action: "Phase 1 Kickoff", timeline: "Week 5", owner: "Joint Team" }
        ],
        closingStatement: `${clientName} has a strategic opportunity to lead in AI adoption. The technology is proven, the market is moving, and the ROI is clear. The question is not whether to act — it's how fast.`
      },
      speakerNotes: `Close with clarity and confidence. Give executives a specific action to take in the next 7 days. The investment breakdown makes the budget feel structured and accountable. The closing statement should be memorized and delivered without notes for maximum impact.`
    }
  ];

  return {
    id: uuidv4(),
    clientName,
    proposalType,
    template: template.title,
    generatedAt: new Date().toISOString(),
    selectedTrends: trendDetails.map((t) => ({ id: t.id, name: t.name })),
    totalSlides: slides.length,
    slides,
    summary: {
      totalMarketOpportunity: `$${totalMarketOpportunity}B`,
      primaryTrend: primaryTrend.name,
      estimatedBudget: budgetRange || "$500K–$2M",
      expectedROI: "3–5x over 3 years",
      timeline: timeline || "9–12 months"
    }
  };
}

router.post("/generate", (req, res) => {
  const {
    clientName,
    problemStatement,
    selectedTrends,
    proposalType,
    budgetRange,
    timeline
  } = req.body;

  if (!clientName || typeof clientName !== "string" || clientName.trim().length === 0) {
    return res.status(400).json({ success: false, message: "clientName is required" });
  }

  if (!selectedTrends || !Array.isArray(selectedTrends) || selectedTrends.length === 0) {
    return res.status(400).json({ success: false, message: "At least one trend must be selected" });
  }

  try {
    const proposal = buildProposalContent({
      clientName: clientName.trim(),
      problemStatement: problemStatement?.trim(),
      selectedTrends,
      proposalType: proposalType || "ai-transformation",
      budgetRange,
      timeline
    });

    generatedProposals.set(proposal.id, proposal);

    res.json({ success: true, data: proposal });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to generate proposal", error: err.message });
  }
});

router.get("/templates/list", (req, res) => {
  res.json({
    success: true,
    data: Object.entries(PROPOSAL_TEMPLATES).map(([key, val]) => ({
      key,
      title: val.title,
      slideCount: val.slides.length
    }))
  });
});

router.get("/:id", (req, res) => {
  const proposal = generatedProposals.get(req.params.id);
  if (!proposal) {
    return res.status(404).json({ success: false, message: "Proposal not found" });
  }
  res.json({ success: true, data: proposal });
});

module.exports = router;
