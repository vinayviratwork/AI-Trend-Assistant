import { X, TrendingUp, Users, Zap, Shield, BarChart2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { statusColor, riskColor, formatBillion } from "../utils/formatters";
import "./TrendDetailModal.css";

export default function TrendDetailModal({ trend, onClose }) {
  if (!trend) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>{trend.name}</h2>
            <div className="modal-badges">
              <span
                className="badge"
                style={{
                  background: statusColor(trend.status) + "22",
                  color: statusColor(trend.status)
                }}
              >
                {trend.status}
              </span>
              <span className="badge badge-category">{trend.category}</span>
              <span className="badge badge-sector">{trend.sector}</span>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Stats Row */}
          <div className="modal-stats">
            <div className="modal-stat">
              <span className="stat-label">Trend Score</span>
              <span className="stat-big" style={{ color: "#10B981" }}>
                {trend.trendScore}/100
              </span>
            </div>
            <div className="modal-stat">
              <span className="stat-label">Market Size (2024)</span>
              <span className="stat-big">{formatBillion(trend.marketSize)}</span>
            </div>
            <div className="modal-stat">
              <span className="stat-label">Projected (2030)</span>
              <span className="stat-big" style={{ color: "#10B981" }}>
                {formatBillion(trend.projectedSize)}
              </span>
            </div>
            <div className="modal-stat">
              <span className="stat-label">CAGR</span>
              <span className="stat-big" style={{ color: "#3B82F6" }}>
                {trend.cagr}%
              </span>
            </div>
            <div className="modal-stat">
              <span className="stat-label">Growth Rate</span>
              <span className="stat-big" style={{ color: "#8B5CF6" }}>
                {trend.growthRate}%
              </span>
            </div>
            <div className="modal-stat">
              <span className="stat-label">Risk Level</span>
              <span className="stat-big" style={{ color: riskColor(trend.riskLevel) }}>
                {trend.riskLevel}
              </span>
            </div>
          </div>

          <div className="modal-grid">
            {/* Trend Chart */}
            <div className="modal-section chart-section">
              <h4>
                <BarChart2 size={16} /> Trend Score Over 2024
              </h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={trend.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 10, fill: "#94A3B8" }}
                    interval={2}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 10, fill: "#94A3B8" }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#1E293B",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      color: "#F8FAFC"
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: "#3B82F6" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Description */}
            <div className="modal-section">
              <h4>
                <TrendingUp size={16} /> About This Trend
              </h4>
              <p className="trend-description">{trend.description}</p>
              <div className="adoption-row">
                <span className="detail-label">Adoption Stage:</span>
                <span className="adoption-badge">{trend.adoptionStage}</span>
              </div>
            </div>

            {/* Key Players */}
            <div className="modal-section">
              <h4>
                <Users size={16} /> Key Players
              </h4>
              <div className="player-list">
                {trend.keyPlayers.map((player) => (
                  <span key={player} className="player-chip">
                    {player}
                  </span>
                ))}
              </div>
            </div>

            {/* Use Cases */}
            <div className="modal-section">
              <h4>
                <Zap size={16} /> Top Use Cases
              </h4>
              <div className="usecase-list">
                {trend.useCases.map((uc, i) => (
                  <div key={i} className="usecase-item">
                    <span className="usecase-num">{i + 1}</span>
                    {uc}
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="modal-section tags-section">
              <h4>
                <Shield size={16} /> Tags
              </h4>
              <div className="tags-flex">
                {trend.tags.map((tag) => (
                  <span key={tag} className="tag-pill">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
