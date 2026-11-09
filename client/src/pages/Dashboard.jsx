import { useState, useEffect } from "react";
import { api } from "../utils/api";
import { useApi } from "../hooks/useApi";
import TrendCard from "../components/TrendCard";
import TrendDetailModal from "../components/TrendDetailModal";
import {
  BarChart2,
  TrendingUp,
  DollarSign,
  Percent,
  Search,
  SlidersHorizontal,
  Loader
} from "lucide-react";
import { formatBillion } from "../utils/formatters";
import "./Dashboard.css";

export default function Dashboard() {
  const { data: overview } = useApi(() => api.getMarketOverview(), []);
  const { data: filters } = useApi(() => api.getFilters(), []);

  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [selectedTrend, setSelectedTrend] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    category: "",
    sector: "",
    status: "",
    sort: "score_desc"
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchTrends();
  }, [activeFilters, searchTerm]);

  const fetchTrends = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const params = { ...activeFilters };
      if (searchTerm.trim()) params.search = searchTerm.trim();
      const res = await api.getTrends(params);
      setTrends(res.data);
    } catch (err) {
      console.error("Failed to load trends:", err);
      setFetchError("Unable to load trends. Please make sure the backend server is running.");
    }
    setLoading(false);
  };

  const updateFilter = (key, value) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setActiveFilters({ category: "", sector: "", status: "", sort: "score_desc" });
    setSearchTerm("");
  };

  return (
    <div className="dashboard-page">
      {/* Market Overview */}
      {overview && (
        <div className="overview-cards">
          <div className="overview-card">
            <div className="overview-icon" style={{ background: "#3B82F622" }}>
              <DollarSign size={20} color="#3B82F6" />
            </div>
            <div>
              <p className="overview-label">Global AI Market 2024</p>
              <p className="overview-value">{formatBillion(overview.globalAIMarketSize2024)}</p>
            </div>
          </div>
          <div className="overview-card">
            <div className="overview-icon" style={{ background: "#10B98122" }}>
              <TrendingUp size={20} color="#10B981" />
            </div>
            <div>
              <p className="overview-label">Projected 2030</p>
              <p className="overview-value">{formatBillion(overview.globalAIMarketSize2030)}</p>
            </div>
          </div>
          <div className="overview-card">
            <div className="overview-icon" style={{ background: "#8B5CF622" }}>
              <Percent size={20} color="#8B5CF6" />
            </div>
            <div>
              <p className="overview-label">Overall CAGR</p>
              <p className="overview-value">{overview.overallCAGR}%</p>
            </div>
          </div>
          <div className="overview-card">
            <div className="overview-icon" style={{ background: "#F59E0B22" }}>
              <BarChart2 size={20} color="#F59E0B" />
            </div>
            <div>
              <p className="overview-label">Trends Tracked</p>
              <p className="overview-value">{overview.totalTrends}</p>
            </div>
          </div>
        </div>
      )}

      {/* Search & Filters */}
      <div className="filter-section">
        <div className="search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search trends, sectors, tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          className="filter-toggle-btn"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal size={18} />
          Filters
        </button>

        <select
          className="sort-select"
          value={activeFilters.sort}
          onChange={(e) => updateFilter("sort", e.target.value)}
        >
          <option value="score_desc">Trend Score ↓</option>
          <option value="score_asc">Trend Score ↑</option>
          <option value="growth_desc">Growth Rate ↓</option>
          <option value="market_desc">Market Size ↓</option>
          <option value="cagr_desc">CAGR ↓</option>
        </select>
      </div>

      {showFilters && filters && (
        <div className="filter-panel">
          <div className="filter-group">
            <label>Category</label>
            <select
              value={activeFilters.category}
              onChange={(e) => updateFilter("category", e.target.value)}
            >
              <option value="">All Categories</option>
              {filters.CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Sector</label>
            <select
              value={activeFilters.sector}
              onChange={(e) => updateFilter("sector", e.target.value)}
            >
              <option value="">All Sectors</option>
              {filters.SECTORS.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Status</label>
            <select
              value={activeFilters.status}
              onChange={(e) => updateFilter("status", e.target.value)}
            >
              <option value="">All Statuses</option>
              {filters.statuses.map((stat) => (
                <option key={stat} value={stat}>
                  {stat}
                </option>
              ))}
            </select>
          </div>

          <button className="reset-btn" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      )}

      {/* Results Count */}
      <div className="results-header">
        <p>
          Showing <strong>{trends.length}</strong> trend{trends.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Trends Grid */}
      {loading ? (
        <div className="loading-state">
          <Loader className="spinner" size={40} />
          <p>Loading trends...</p>
        </div>
      ) : fetchError ? (
        <div className="error-state">
          <p>⚠️ {fetchError}</p>
          <button className="reset-btn" onClick={fetchTrends}>Retry</button>
        </div>
      ) : trends.length === 0 ? (
        <div className="empty-state">
          <p>No trends found matching your criteria.</p>
        </div>
      ) : (
        <div className="trends-grid">
          {trends.map((trend) => (
            <TrendCard key={trend.id} trend={trend} onClick={setSelectedTrend} />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedTrend && (
        <TrendDetailModal trend={selectedTrend} onClose={() => setSelectedTrend(null)} />
      )}
    </div>
  );
}
