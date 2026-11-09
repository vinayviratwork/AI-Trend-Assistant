import { ArrowUpRight, TrendingUp, Activity } from "lucide-react";
import { statusColor, riskColor, formatBillion, truncate } from "../utils/formatters";
import "./TrendCard.css";

export default function TrendCard({ trend, onClick }) {
  return (
    <div className="trend-card" onClick={() => onClick(trend)}>
      <div className="trend-card-header">
        <div className="trend-score" style={{ background: getScoreBg(trend.trendScore) }}>
          <Activity size={14} />
          <span>{trend.trendScore}</span>
        </div>
        <span
          className="trend-status-badge"
          style={{ background: statusColor(trend.status) + "22", color: statusColor(trend.status) }}
        >
          {trend.status}
        </span>
      </div>

      <h3 className="trend-card-name">{trend.name}</h3>
      <p className="trend-card-desc">{truncate(trend.description, 110)}</p>

      <div className="trend-card-meta">
        <div className="meta-item">
          <span className="meta-label">Market Size</span>
          <span className="meta-value">{formatBillion(trend.marketSize)}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Projected</span>
          <span className="meta-value projected">{formatBillion(trend.projectedSize)}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">CAGR</span>
          <span className="meta-value cagr">{trend.cagr}%</span>
        </div>
      </div>

      <div className="trend-card-footer">
        <div className="trend-tags">
          {trend.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="risk-badge" style={{ color: riskColor(trend.riskLevel) }}>
          <span className="risk-dot" style={{ background: riskColor(trend.riskLevel) }} />
          {trend.riskLevel} Risk
        </div>
      </div>

      <div className="trend-card-category">{trend.category} · {trend.sector}</div>

      <div className="view-detail">
        View Details <ArrowUpRight size={14} />
      </div>
    </div>
  );
}

function getScoreBg(score) {
  if (score >= 90) return "linear-gradient(135deg, #10B981, #059669)";
  if (score >= 80) return "linear-gradient(135deg, #3B82F6, #2563EB)";
  if (score >= 70) return "linear-gradient(135deg, #8B5CF6, #7C3AED)";
  return "linear-gradient(135deg, #F59E0B, #D97706)";
}
