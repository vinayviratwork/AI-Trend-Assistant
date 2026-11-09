export const formatBillion = (val) => {
  if (!val && val !== 0) return "N/A";
  return `$${Number(val).toFixed(1)}B`;
};

export const formatPercent = (val) => {
  if (!val && val !== 0) return "N/A";
  return `${Number(val).toFixed(1)}%`;
};

export const statusColor = (status) => {
  const map = {
    "Explosive Growth": "#10B981",
    "High Growth": "#3B82F6",
    Rising: "#8B5CF6",
    Stable: "#F59E0B",
    Declining: "#EF4444"
  };
  return map[status] || "#94A3B8";
};

export const riskColor = (risk) => {
  const map = {
    Low: "#10B981",
    "Medium": "#F59E0B",
    "Medium-High": "#F97316",
    High: "#EF4444"
  };
  return map[risk] || "#94A3B8";
};

export const scoreBg = (score) => {
  if (score >= 90) return "linear-gradient(135deg, #10B981, #059669)";
  if (score >= 80) return "linear-gradient(135deg, #3B82F6, #2563EB)";
  if (score >= 70) return "linear-gradient(135deg, #8B5CF6, #7C3AED)";
  return "linear-gradient(135deg, #F59E0B, #D97706)";
};

export const truncate = (str, max = 120) => {
  if (!str) return "";
  return str.length > max ? str.slice(0, max) + "…" : str;
};
