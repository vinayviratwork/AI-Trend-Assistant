const express = require("express");
const router = express.Router();
const { TRENDS, SECTORS, CATEGORIES, MARKET_OVERVIEW } = require("../data/marketData");

router.get("/", (req, res) => {
  const { category, sector, minScore, maxScore, status, search, sort } = req.query;

  let results = [...TRENDS];

  if (category) {
    results = results.filter(
      (t) => t.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (sector) {
    results = results.filter(
      (t) => t.sector.toLowerCase() === sector.toLowerCase()
    );
  }

  if (status) {
    results = results.filter(
      (t) => t.status.toLowerCase() === status.toLowerCase()
    );
  }

  if (minScore) {
    results = results.filter((t) => t.trendScore >= parseInt(minScore, 10));
  }

  if (maxScore) {
    results = results.filter((t) => t.trendScore <= parseInt(maxScore, 10));
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        t.sector.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }

  if (sort === "score_desc") results.sort((a, b) => b.trendScore - a.trendScore);
  else if (sort === "score_asc") results.sort((a, b) => a.trendScore - b.trendScore);
  else if (sort === "growth_desc") results.sort((a, b) => b.growthRate - a.growthRate);
  else if (sort === "market_desc") results.sort((a, b) => b.marketSize - a.marketSize);
  else if (sort === "cagr_desc") results.sort((a, b) => b.cagr - a.cagr);
  else results.sort((a, b) => b.trendScore - a.trendScore);

  res.json({
    success: true,
    total: results.length,
    data: results.map((t) => ({
      id: t.id,
      name: t.name,
      category: t.category,
      sector: t.sector,
      trendScore: t.trendScore,
      growthRate: t.growthRate,
      marketSize: t.marketSize,
      projectedSize: t.projectedSize,
      cagr: t.cagr,
      status: t.status,
      riskLevel: t.riskLevel,
      adoptionStage: t.adoptionStage,
      tags: t.tags,
      description: t.description
    }))
  });
});

router.get("/overview", (req, res) => {
  res.json({ success: true, data: MARKET_OVERVIEW });
});

router.get("/filters", (req, res) => {
  const statuses = [...new Set(TRENDS.map((t) => t.status))];
  const riskLevels = [...new Set(TRENDS.map((t) => t.riskLevel))];
  const adoptionStages = [...new Set(TRENDS.map((t) => t.adoptionStage))];
  res.json({ success: true, data: { SECTORS, CATEGORIES, statuses, riskLevels, adoptionStages } });
});

router.get("/:id", (req, res) => {
  const trend = TRENDS.find((t) => t.id === req.params.id);
  if (!trend) {
    return res.status(404).json({ success: false, message: "Trend not found" });
  }
  res.json({ success: true, data: trend });
});

module.exports = router;
