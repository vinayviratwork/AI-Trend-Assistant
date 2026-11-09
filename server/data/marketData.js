// ============================================================
//  AI Market Product Trend Assistant — Seed Data
//  All numbers are illustrative / research-grade estimates.
// ============================================================

const TRENDS = [
  {
    id: "t001",
    name: "Generative AI",
    category: "AI Technology",
    sector: "Cross-Industry",
    trendScore: 98,
    growthRate: 42.6,
    marketSize: 66.6,       // USD Billion (2024)
    projectedSize: 1811.8,  // USD Billion (2030)
    cagr: 79.8,
    status: "Explosive Growth",
    riskLevel: "Medium",
    adoptionStage: "Early Majority",
    description:
      "Generative AI encompasses models capable of producing text, images, audio, and code. Driven by LLMs like GPT-4 and Gemini, enterprises are integrating GenAI into every workflow.",
    keyPlayers: ["OpenAI", "Google DeepMind", "Anthropic", "Mistral AI", "Meta AI"],
    useCases: ["Content Generation", "Code Assistance", "Customer Support", "Product Design", "Drug Discovery"],
    monthlyData: [
      { month: "Jan 2024", value: 42 },
      { month: "Feb 2024", value: 48 },
      { month: "Mar 2024", value: 55 },
      { month: "Apr 2024", value: 61 },
      { month: "May 2024", value: 69 },
      { month: "Jun 2024", value: 76 },
      { month: "Jul 2024", value: 83 },
      { month: "Aug 2024", value: 89 },
      { month: "Sep 2024", value: 94 },
      { month: "Oct 2024", value: 97 },
      { month: "Nov 2024", value: 98 },
      { month: "Dec 2024", value: 99 }
    ],
    tags: ["LLM", "GenAI", "Foundation Models", "Multimodal"]
  },
  {
    id: "t002",
    name: "AI Agents & Agentic Workflows",
    category: "AI Technology",
    sector: "Enterprise Software",
    trendScore: 94,
    growthRate: 38.2,
    marketSize: 5.1,
    projectedSize: 47.1,
    cagr: 44.8,
    status: "High Growth",
    riskLevel: "Medium-High",
    adoptionStage: "Early Adopters",
    description:
      "Autonomous AI agents that plan, use tools, and execute multi-step tasks without human intervention. Includes frameworks like LangChain, AutoGen, and CrewAI.",
    keyPlayers: ["Salesforce", "ServiceNow", "Microsoft", "LangChain", "Cohere"],
    useCases: ["IT Automation", "Sales Orchestration", "Research Agents", "DevOps Pipelines", "Financial Analysis"],
    monthlyData: [
      { month: "Jan 2024", value: 30 },
      { month: "Feb 2024", value: 36 },
      { month: "Mar 2024", value: 44 },
      { month: "Apr 2024", value: 52 },
      { month: "May 2024", value: 60 },
      { month: "Jun 2024", value: 67 },
      { month: "Jul 2024", value: 74 },
      { month: "Aug 2024", value: 80 },
      { month: "Sep 2024", value: 86 },
      { month: "Oct 2024", value: 91 },
      { month: "Nov 2024", value: 93 },
      { month: "Dec 2024", value: 94 }
    ],
    tags: ["Agents", "Automation", "LangChain", "Orchestration"]
  },
  {
    id: "t003",
    name: "AI in Healthcare & Drug Discovery",
    category: "Industry Application",
    sector: "Healthcare & Life Sciences",
    trendScore: 91,
    growthRate: 47.4,
    marketSize: 19.27,
    projectedSize: 613.8,
    cagr: 76.4,
    status: "High Growth",
    riskLevel: "Low",
    adoptionStage: "Early Majority",
    description:
      "AI accelerates clinical trial design, protein folding (AlphaFold), drug-target identification, diagnostic imaging, and personalized treatment recommendations.",
    keyPlayers: ["Tempus AI", "Recursion", "Insilico Medicine", "IBM Watson Health", "Butterfly Network"],
    useCases: ["Drug Discovery", "Medical Imaging", "Clinical Decision Support", "Genomics", "Remote Diagnostics"],
    monthlyData: [
      { month: "Jan 2024", value: 60 },
      { month: "Feb 2024", value: 63 },
      { month: "Mar 2024", value: 66 },
      { month: "Apr 2024", value: 70 },
      { month: "May 2024", value: 73 },
      { month: "Jun 2024", value: 77 },
      { month: "Jul 2024", value: 80 },
      { month: "Aug 2024", value: 83 },
      { month: "Sep 2024", value: 86 },
      { month: "Oct 2024", value: 88 },
      { month: "Nov 2024", value: 90 },
      { month: "Dec 2024", value: 91 }
    ],
    tags: ["HealthAI", "Drug Discovery", "Medical Imaging", "AlphaFold"]
  },
  {
    id: "t004",
    name: "Edge AI & TinyML",
    category: "AI Infrastructure",
    sector: "IoT & Embedded Systems",
    trendScore: 82,
    growthRate: 29.7,
    marketSize: 22.1,
    projectedSize: 107.4,
    cagr: 29.5,
    status: "Rising",
    riskLevel: "Low",
    adoptionStage: "Early Majority",
    description:
      "Running AI inference directly on edge devices (phones, sensors, cameras) without cloud dependency. Enables real-time processing, privacy, and low-latency applications.",
    keyPlayers: ["NVIDIA Jetson", "Qualcomm AI", "Apple Neural Engine", "Arduino", "Edge Impulse"],
    useCases: ["Predictive Maintenance", "Smart Cameras", "Wearables", "Autonomous Vehicles", "Industrial IoT"],
    monthlyData: [
      { month: "Jan 2024", value: 50 },
      { month: "Feb 2024", value: 53 },
      { month: "Mar 2024", value: 57 },
      { month: "Apr 2024", value: 60 },
      { month: "May 2024", value: 64 },
      { month: "Jun 2024", value: 67 },
      { month: "Jul 2024", value: 70 },
      { month: "Aug 2024", value: 73 },
      { month: "Sep 2024", value: 76 },
      { month: "Oct 2024", value: 79 },
      { month: "Nov 2024", value: 81 },
      { month: "Dec 2024", value: 82 }
    ],
    tags: ["EdgeAI", "TinyML", "IoT", "Inference"]
  },
  {
    id: "t005",
    name: "AI-Powered Cybersecurity",
    category: "Industry Application",
    sector: "Cybersecurity",
    trendScore: 88,
    growthRate: 23.6,
    marketSize: 24.8,
    projectedSize: 133.8,
    cagr: 32.4,
    status: "High Growth",
    riskLevel: "Low",
    adoptionStage: "Early Majority",
    description:
      "AI-driven threat detection, anomaly detection, and automated incident response. Counters AI-generated phishing, deepfakes, and zero-day exploits in real time.",
    keyPlayers: ["CrowdStrike", "Darktrace", "SentinelOne", "Palo Alto Networks", "Microsoft Defender"],
    useCases: ["Threat Detection", "SIEM Automation", "Fraud Prevention", "Zero-Trust", "Phishing Defense"],
    monthlyData: [
      { month: "Jan 2024", value: 62 },
      { month: "Feb 2024", value: 65 },
      { month: "Mar 2024", value: 68 },
      { month: "Apr 2024", value: 71 },
      { month: "May 2024", value: 74 },
      { month: "Jun 2024", value: 77 },
      { month: "Aug 2024", value: 82 },
      { month: "Jul 2024", value: 80 },
      { month: "Sep 2024", value: 84 },
      { month: "Oct 2024", value: 86 },
      { month: "Nov 2024", value: 87 },
      { month: "Dec 2024", value: 88 }
    ],
    tags: ["CyberAI", "ThreatDetection", "Zero-Day", "SOC"]
  },
  {
    id: "t006",
    name: "Multimodal AI",
    category: "AI Technology",
    sector: "Cross-Industry",
    trendScore: 92,
    growthRate: 55.1,
    marketSize: 3.8,
    projectedSize: 98.7,
    cagr: 71.5,
    status: "Explosive Growth",
    riskLevel: "Medium",
    adoptionStage: "Early Adopters",
    description:
      "AI systems that understand and generate across text, images, video, audio, and code simultaneously. GPT-4o, Gemini 1.5, and Claude 3 exemplify multimodal capabilities.",
    keyPlayers: ["OpenAI", "Google", "Anthropic", "Stability AI", "Runway ML"],
    useCases: ["Video Understanding", "Image-to-Code", "Audio Transcription", "AR/VR Interfaces", "Document AI"],
    monthlyData: [
      { month: "Jan 2024", value: 35 },
      { month: "Feb 2024", value: 42 },
      { month: "Mar 2024", value: 51 },
      { month: "Apr 2024", value: 60 },
      { month: "May 2024", value: 68 },
      { month: "Jun 2024", value: 75 },
      { month: "Jul 2024", value: 81 },
      { month: "Aug 2024", value: 86 },
      { month: "Sep 2024", value: 89 },
      { month: "Oct 2024", value: 91 },
      { month: "Nov 2024", value: 91 },
      { month: "Dec 2024", value: 92 }
    ],
    tags: ["Multimodal", "Vision", "Audio", "GPT-4o"]
  },
  {
    id: "t007",
    name: "AI in Retail & E-Commerce",
    category: "Industry Application",
    sector: "Retail & Consumer",
    trendScore: 85,
    growthRate: 33.8,
    marketSize: 9.36,
    projectedSize: 85.07,
    cagr: 37.1,
    status: "High Growth",
    riskLevel: "Low",
    adoptionStage: "Early Majority",
    description:
      "AI powers hyper-personalization, demand forecasting, visual search, dynamic pricing, and autonomous checkout in retail. Reduces cart abandonment and lifts conversion.",
    keyPlayers: ["Amazon", "Shopify", "Salesforce Commerce", "Adobe Sensei", "Dynamic Yield"],
    useCases: ["Recommendation Engines", "Visual Search", "Dynamic Pricing", "Inventory Forecasting", "Virtual Try-On"],
    monthlyData: [
      { month: "Jan 2024", value: 55 },
      { month: "Feb 2024", value: 58 },
      { month: "Mar 2024", value: 62 },
      { month: "Apr 2024", value: 65 },
      { month: "May 2024", value: 69 },
      { month: "Jun 2024", value: 73 },
      { month: "Jul 2024", value: 76 },
      { month: "Aug 2024", value: 79 },
      { month: "Sep 2024", value: 81 },
      { month: "Oct 2024", value: 83 },
      { month: "Nov 2024", value: 84 },
      { month: "Dec 2024", value: 85 }
    ],
    tags: ["RetailAI", "Personalization", "E-Commerce", "Recommendation"]
  },
  {
    id: "t008",
    name: "Responsible AI & AI Governance",
    category: "AI Strategy",
    sector: "Regulatory & Compliance",
    trendScore: 80,
    growthRate: 26.4,
    marketSize: 3.1,
    projectedSize: 24.7,
    cagr: 41.0,
    status: "Rising",
    riskLevel: "Low",
    adoptionStage: "Early Majority",
    description:
      "Frameworks, tools, and regulations ensuring AI is fair, explainable, and auditable. EU AI Act, NIST AI RMF, and internal model cards are shaping enterprise AI governance.",
    keyPlayers: ["IBM OpenScale", "Microsoft Responsible AI", "Google Model Cards", "Credo AI", "Fiddler AI"],
    useCases: ["Bias Detection", "Model Explainability", "Regulatory Compliance", "Audit Trails", "Risk Scoring"],
    monthlyData: [
      { month: "Jan 2024", value: 48 },
      { month: "Feb 2024", value: 51 },
      { month: "Mar 2024", value: 55 },
      { month: "Apr 2024", value: 58 },
      { month: "May 2024", value: 62 },
      { month: "Jun 2024", value: 65 },
      { month: "Jul 2024", value: 68 },
      { month: "Aug 2024", value: 71 },
      { month: "Sep 2024", value: 74 },
      { month: "Oct 2024", value: 77 },
      { month: "Nov 2024", value: 79 },
      { month: "Dec 2024", value: 80 }
    ],
    tags: ["ResponsibleAI", "Governance", "EU AI Act", "Explainability"]
  },
  {
    id: "t009",
    name: "AI in Financial Services",
    category: "Industry Application",
    sector: "Banking & Finance",
    trendScore: 87,
    growthRate: 28.9,
    marketSize: 38.36,
    projectedSize: 190.33,
    cagr: 30.6,
    status: "High Growth",
    riskLevel: "Low",
    adoptionStage: "Early Majority",
    description:
      "AI transforms credit scoring, fraud detection, algorithmic trading, robo-advising, and KYC/AML compliance in financial institutions globally.",
    keyPlayers: ["JPMorgan Chase AI", "Bloomberg GPT", "Kensho", "Palantir", "Feedzai"],
    useCases: ["Fraud Detection", "Credit Scoring", "Algo Trading", "Robo-Advisory", "AML Compliance"],
    monthlyData: [
      { month: "Jan 2024", value: 58 },
      { month: "Feb 2024", value: 61 },
      { month: "Mar 2024", value: 65 },
      { month: "Apr 2024", value: 68 },
      { month: "May 2024", value: 71 },
      { month: "Jun 2024", value: 74 },
      { month: "Jul 2024", value: 77 },
      { month: "Aug 2024", value: 79 },
      { month: "Sep 2024", value: 82 },
      { month: "Oct 2024", value: 84 },
      { month: "Nov 2024", value: 86 },
      { month: "Dec 2024", value: 87 }
    ],
    tags: ["FinAI", "Fraud Detection", "AlgoTrading", "RegTech"]
  },
  {
    id: "t010",
    name: "Vector Databases & RAG",
    category: "AI Infrastructure",
    sector: "Data & Developer Tools",
    trendScore: 89,
    growthRate: 61.4,
    marketSize: 1.5,
    projectedSize: 25.8,
    cagr: 58.7,
    status: "Explosive Growth",
    riskLevel: "Low",
    adoptionStage: "Early Adopters",
    description:
      "Vector databases (Pinecone, Weaviate, Chroma) store high-dimensional embeddings enabling semantic search and Retrieval-Augmented Generation (RAG) for grounded LLM responses.",
    keyPlayers: ["Pinecone", "Weaviate", "Chroma", "Qdrant", "MongoDB Atlas"],
    useCases: ["Semantic Search", "RAG Pipelines", "Recommendation", "Knowledge Bases", "Document Q&A"],
    monthlyData: [
      { month: "Jan 2024", value: 38 },
      { month: "Feb 2024", value: 46 },
      { month: "Mar 2024", value: 55 },
      { month: "Apr 2024", value: 63 },
      { month: "May 2024", value: 70 },
      { month: "Jun 2024", value: 76 },
      { month: "Jul 2024", value: 81 },
      { month: "Aug 2024", value: 84 },
      { month: "Sep 2024", value: 86 },
      { month: "Oct 2024", value: 87 },
      { month: "Nov 2024", value: 88 },
      { month: "Dec 2024", value: 89 }
    ],
    tags: ["VectorDB", "RAG", "Embeddings", "Semantic Search"]
  }
];

const SECTORS = [
  "Cross-Industry",
  "Enterprise Software",
  "Healthcare & Life Sciences",
  "IoT & Embedded Systems",
  "Cybersecurity",
  "Retail & Consumer",
  "Regulatory & Compliance",
  "Banking & Finance",
  "Data & Developer Tools"
];

const CATEGORIES = [
  "AI Technology",
  "Industry Application",
  "AI Infrastructure",
  "AI Strategy"
];

const MARKET_OVERVIEW = {
  globalAIMarketSize2024: 279.22,   // USD Billion
  globalAIMarketSize2030: 1811.8,   // USD Billion
  overallCAGR: 36.6,
  enterpriseAIAdoption: 72,          // % of Fortune 500
  aiJobGrowth: 37,                   // % YoY
  totalInvestment2024: 91.9,         // USD Billion VC/PE
  topInvestmentRegion: "North America",
  totalTrends: TRENDS.length,
  averageTrendScore: Math.round(TRENDS.reduce((s, t) => s + t.trendScore, 0) / TRENDS.length),
  topTrend: TRENDS.reduce((a, b) => (a.trendScore > b.trendScore ? a : b)).name
};

// AI Assistant knowledge base for contextual responses
const AI_KNOWLEDGE_BASE = {
  greetings: [
    "Hello! I'm your AI Market Trend Assistant. Ask me about any AI technology trend, market size, key players, or investment opportunities.",
    "Hi there! Ready to explore the AI market landscape? I can help you analyze trends, identify opportunities, and generate executive proposals."
  ],
  topicResponses: {
    "generative ai": {
      title: "Generative AI Market Overview",
      summary:
        "Generative AI is the fastest-growing segment of the AI market. The market is valued at $66.6B in 2024 and projected to reach $1,811.8B by 2030 — a staggering 79.8% CAGR.",
      keyPoints: [
        "OpenAI, Google DeepMind, Anthropic, and Meta are the dominant players",
        "Enterprise adoption has tripled in 18 months — 72% of Fortune 500 companies have active GenAI projects",
        "Key risk: hallucination, IP concerns, and regulatory ambiguity",
        "ROI hotspots: customer support automation (40% cost reduction), code generation (30% productivity gain)"
      ],
      recommendation:
        "Invest in RAG infrastructure and fine-tuning pipelines before competitors. First-mover advantage in vertical-specific GenAI apps (legal, healthcare, finance) is still achievable."
    },
    "agentic": {
      title: "AI Agents & Agentic Workflows",
      summary:
        "AI agents that autonomously plan and execute tasks represent the next major wave. Market growing at 44.8% CAGR, expected to hit $47.1B by 2030.",
      keyPoints: [
        "Salesforce Agentforce and Microsoft Copilot Studio are racing for enterprise dominance",
        "Multi-agent frameworks (CrewAI, AutoGen) enable complex, multi-step automation",
        "Key risk: unreliable task completion, security vulnerabilities in tool-use",
        "Best ROI: IT helpdesk automation, sales pipeline orchestration, financial report generation"
      ],
      recommendation:
        "Start with narrow, well-defined agentic use cases. Build human-in-the-loop checkpoints before deploying fully autonomous agents."
    },
    "healthcare": {
      title: "AI in Healthcare & Life Sciences",
      summary:
        "Healthcare AI is on a 76.4% CAGR trajectory, with AI-driven drug discovery slashing development timelines from 10+ years to under 4 years.",
      keyPoints: [
        "AlphaFold solved the protein-folding problem — 200M+ protein structures now mapped",
        "FDA cleared over 692 AI-enabled medical devices as of 2024",
        "Tempus AI and Recursion lead in clinical AI applications",
        "Regulatory pathway is clearer than other sectors — FDA AI Action Plan published 2024"
      ],
      recommendation:
        "Partner with established clinical data holders. Focus on diagnostic imaging AI — highest near-term ROI with strong regulatory precedent."
    },
    "investment": {
      title: "AI Investment Landscape 2024",
      summary:
        "Global AI VC/PE investment reached $91.9B in 2024. North America leads at 60%, followed by Asia-Pacific at 25%.",
      keyPoints: [
        "Infrastructure layer (GPUs, cloud AI) attracted 35% of total investment",
        "Application layer (vertical SaaS) grew 58% YoY — highest absolute growth",
        "Generative AI startups raised $33.9B, representing 37% of all AI funding",
        "M&A activity accelerated — 280+ AI acquisitions in 2024"
      ],
      recommendation:
        "Focus investment on AI application layer rather than infrastructure — lower capital requirements, faster payback period, defensible via proprietary data moats."
    },
    "market size": {
      title: "Global AI Market Sizing",
      summary:
        "The global AI market stands at $279.22B in 2024, growing at 36.6% CAGR to reach $1.81T by 2030.",
      keyPoints: [
        "North America: 38% market share, driven by hyperscalers and enterprise adoption",
        "Asia-Pacific: fastest growing region at 42.1% CAGR",
        "Enterprise AI segment: $119.78B — largest sub-segment",
        "AI-as-a-Service (AIaaS) growing at 48.2% CAGR"
      ],
      recommendation:
        "Enterprise AI applications remain the most accessible entry point. Cloud-native AI deployments offer the fastest time-to-value."
    },
    "cybersecurity": {
      title: "AI in Cybersecurity",
      summary:
        "AI cybersecurity market reaching $133.8B by 2030 at 32.4% CAGR. AI is now the primary weapon on both offensive and defensive sides.",
      keyPoints: [
        "CrowdStrike and Darktrace lead with behavioral AI threat detection",
        "AI-generated phishing attacks up 400% — manual detection no longer viable",
        "Zero-trust architecture + AI behavioral analytics is the dominant framework",
        "Regulatory mandates (NIS2, DORA in EU) accelerating enterprise spend"
      ],
      recommendation:
        "Prioritize AI-driven SIEM and SOAR investments. Behavioral analytics delivers 8x faster incident response versus rule-based systems."
    },
    "vector database": {
      title: "Vector Databases & RAG Infrastructure",
      summary:
        "Vector DB market exploding at 58.7% CAGR as RAG becomes the standard architecture for enterprise LLM deployments.",
      keyPoints: [
        "Pinecone, Weaviate, and Chroma lead the standalone vector DB market",
        "MongoDB Atlas Vector Search and PostgreSQL pgvector eroding standalone DB share",
        "RAG reduces LLM hallucinations by 65% in enterprise document workflows",
        "Embedding model quality (OpenAI text-embedding-3, Cohere Embed) is the critical differentiator"
      ],
      recommendation:
        "Invest in RAG pipelines as a core AI infrastructure layer. Evaluate managed vector DB services before building in-house to accelerate deployment."
    }
  }
};

// Proposal templates for the deck generator
const PROPOSAL_TEMPLATES = {
  "ai-transformation": {
    title: "AI Transformation Initiative",
    slides: [
      { id: 1, title: "Executive Summary", type: "title" },
      { id: 2, title: "Market Opportunity", type: "market" },
      { id: 3, title: "The Problem We're Solving", type: "problem" },
      { id: 4, title: "Our AI Solution", type: "solution" },
      { id: 5, title: "Business Value & ROI", type: "roi" },
      { id: 6, title: "Implementation Roadmap", type: "roadmap" },
      { id: 7, title: "Investment & Next Steps", type: "cta" }
    ]
  },
  "trend-briefing": {
    title: "AI Trend Intelligence Briefing",
    slides: [
      { id: 1, title: "Market Landscape Overview", type: "overview" },
      { id: 2, title: "Top 5 Emerging Trends", type: "trends" },
      { id: 3, title: "Competitive Intelligence", type: "competitive" },
      { id: 4, title: "Risk Assessment", type: "risk" },
      { id: 5, title: "Strategic Recommendations", type: "recommendations" }
    ]
  }
};

module.exports = { TRENDS, SECTORS, CATEGORIES, MARKET_OVERVIEW, AI_KNOWLEDGE_BASE, PROPOSAL_TEMPLATES };
