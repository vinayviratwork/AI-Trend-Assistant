import { useState, useEffect } from "react";
import { api } from "../utils/api";
import {
  FileText,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Loader,
  Download,
  Eye
} from "lucide-react";
import "./ProposalGenerator.css";

export default function ProposalGenerator() {
  const [step, setStep] = useState(1);
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trendsError, setTrendsError] = useState(null);
  const [proposal, setProposal] = useState(null);
  const [viewingSlide, setViewingSlide] = useState(null);

  const [formData, setFormData] = useState({
    clientName: "",
    problemStatement: "",
    selectedTrends: [],
    proposalType: "ai-transformation",
    budgetRange: "",
    timeline: ""
  });

  useEffect(() => {
    loadTrends();
  }, []);

  const loadTrends = async () => {
    setTrendsError(null);
    try {
      const res = await api.getTrends({ sort: "score_desc" });
      setTrends(res.data);
    } catch (err) {
      console.error("Failed to load trends:", err);
      setTrendsError("Could not load trends from the server. Please ensure the backend is running and refresh the page.");
    }
  };

  const updateForm = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleTrend = (trendId) => {
    setFormData((prev) => {
      const selected = prev.selectedTrends.includes(trendId)
        ? prev.selectedTrends.filter((id) => id !== trendId)
        : [...prev.selectedTrends, trendId];
      return { ...prev, selectedTrends: selected };
    });
  };

  const canProceed = () => {
    if (step === 1) return formData.clientName.trim().length > 0;
    if (step === 2) return formData.selectedTrends.length > 0;
    return true;
  };

  const generateProposal = async () => {
    setLoading(true);
    try {
      const res = await api.generateProposal(formData);
      setProposal(res.data);
      setStep(4);
    } catch (err) {
      alert("Failed to generate proposal: " + err.message);
    }
    setLoading(false);
  };

  const exportProposal = () => {
    if (!proposal) return;
    const json = JSON.stringify(proposal, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${proposal.clientName.replace(/\s+/g, "_")}_AI_Proposal.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="proposal-page">
      <div className="proposal-header">
        <FileText size={24} />
        <div>
          <h2>AI Proposal Generator</h2>
          <p>Create executive-ready AI transformation proposals in minutes</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="stepper">
        {[
          { num: 1, name: "Client Info" },
          { num: 2, name: "Select Trends" },
          { num: 3, name: "Configuration" },
          { num: 4, name: "Generated Proposal" }
        ].map(({ num, name }) => (
          <div
            key={num}
            className={`stepper-item ${step >= num ? "active" : ""} ${
              step > num ? "completed" : ""
            }`}
          >
            <div className="stepper-circle">
              {step > num ? <CheckCircle2 size={16} /> : num}
            </div>
            <span>{name}</span>
          </div>
        ))}
      </div>

      {/* Step 1: Client Info */}
      {step === 1 && (
        <div className="form-section">
          <h3>Step 1: Client Information</h3>
          <div className="form-group">
            <label>Client Name *</label>
            <input
              type="text"
              placeholder="e.g., Acme Corporation"
              value={formData.clientName}
              onChange={(e) => updateForm("clientName", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Problem Statement (Optional)</label>
            <textarea
              rows={4}
              placeholder="Describe the business challenge or opportunity this proposal addresses..."
              value={formData.problemStatement}
              onChange={(e) => updateForm("problemStatement", e.target.value)}
            />
          </div>

          <button
            className="next-btn"
            onClick={() => setStep(2)}
            disabled={!canProceed()}
          >
            Continue <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Step 2: Select Trends */}
      {step === 2 && (
        <div className="form-section">
          <h3>Step 2: Select AI Trends</h3>
          <p className="step-desc">
            Choose one or more trends to include in the proposal. Selected trends will shape the market
            opportunity, solution architecture, and ROI projections.
          </p>

          <div className="trends-select-grid">
            {trendsError ? (
              <div className="error-state">
                <p>⚠️ {trendsError}</p>
                <button className="back-btn" onClick={loadTrends}>Retry</button>
              </div>
            ) : (
              trends.map((trend) => (
                <div
                  key={trend.id}
                  className={`trend-select-card ${
                    formData.selectedTrends.includes(trend.id) ? "selected" : ""
                  }`}
                  onClick={() => toggleTrend(trend.id)}
                >
                  <div className="select-indicator">
                    {formData.selectedTrends.includes(trend.id) ? (
                      <CheckCircle2 size={18} />
                    ) : (
                      <div className="empty-circle" />
                    )}
                  </div>
                  <div className="trend-select-info">
                    <h4>{trend.name}</h4>
                    <div className="trend-select-meta">
                      <span className="score-badge">Score: {trend.trendScore}/100</span>
                      <span>CAGR: {trend.cagr}%</span>
                      <span>Market: ${trend.marketSize}B</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {formData.selectedTrends.length > 0 && (
            <div className="selection-summary">
              <AlertCircle size={16} />
              {formData.selectedTrends.length} trend(s) selected
            </div>
          )}

          <div className="step-actions">
            <button className="back-btn" onClick={() => setStep(1)}>
              Back
            </button>
            <button
              className="next-btn"
              onClick={() => setStep(3)}
              disabled={!canProceed()}
            >
              Continue <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Configuration */}
      {step === 3 && (
        <div className="form-section">
          <h3>Step 3: Proposal Configuration</h3>

          <div className="form-group">
            <label>Proposal Type</label>
            <select
              value={formData.proposalType}
              onChange={(e) => updateForm("proposalType", e.target.value)}
            >
              <option value="ai-transformation">AI Transformation Initiative</option>
              <option value="trend-briefing">Trend Intelligence Briefing</option>
            </select>
          </div>

          <div className="form-group">
            <label>Budget Range (Optional)</label>
            <select
              value={formData.budgetRange}
              onChange={(e) => updateForm("budgetRange", e.target.value)}
            >
              <option value="">Select budget...</option>
              <option value="$100K–$500K">$100K – $500K</option>
              <option value="$500K–$2M">$500K – $2M</option>
              <option value="$2M–$5M">$2M – $5M</option>
              <option value="$5M+">$5M+</option>
            </select>
          </div>

          <div className="form-group">
            <label>Implementation Timeline (Optional)</label>
            <select
              value={formData.timeline}
              onChange={(e) => updateForm("timeline", e.target.value)}
            >
              <option value="">Select timeline...</option>
              <option value="3 months">3 months (Fast-Track)</option>
              <option value="6 months">6 months (Standard)</option>
              <option value="9–12 months">9–12 months (Comprehensive)</option>
              <option value="12+ months">12+ months (Enterprise-Scale)</option>
            </select>
          </div>

          <div className="step-actions">
            <button className="back-btn" onClick={() => setStep(2)}>
              Back
            </button>
            <button className="generate-btn" onClick={generateProposal} disabled={loading}>
              {loading ? (
                <>
                  <Loader size={18} className="spin-icon" />
                  Generating...
                </>
              ) : (
                <>
                  Generate Proposal <ChevronRight size={18} />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Generated Proposal */}
      {step === 4 && proposal && (
        <div className="proposal-result">
          <div className="result-header">
            <div>
              <h3>Proposal Generated Successfully!</h3>
              <p>
                {proposal.totalSlides}-slide executive proposal for {proposal.clientName}
              </p>
            </div>
            <div className="result-actions">
              <button className="export-btn" onClick={exportProposal}>
                <Download size={16} />
                Export JSON
              </button>
              <button className="restart-btn" onClick={() => { setStep(1); setProposal(null); }}>
                New Proposal
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="proposal-summary">
            <div className="summary-item">
              <span className="summary-label">Market Opportunity</span>
              <span className="summary-value">{proposal.summary.totalMarketOpportunity}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Primary Trend</span>
              <span className="summary-value">{proposal.summary.primaryTrend}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Estimated Budget</span>
              <span className="summary-value">{proposal.summary.estimatedBudget}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Expected ROI</span>
              <span className="summary-value green">{proposal.summary.expectedROI}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Timeline</span>
              <span className="summary-value">{proposal.summary.timeline}</span>
            </div>
          </div>

          {/* Slides */}
          <div className="slides-grid">
            {proposal.slides.map((slide) => (
              <div key={slide.slideNumber} className="slide-card">
                <div className="slide-number">Slide {slide.slideNumber}</div>
                <h4>{slide.title}</h4>
                {slide.subtitle && <p className="slide-subtitle">{slide.subtitle}</p>}
                <span className="slide-type-badge">{slide.type}</span>
                <button
                  className="view-slide-btn"
                  onClick={() => setViewingSlide(slide)}
                >
                  <Eye size={14} />
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Slide Detail Modal */}
      {viewingSlide && (
        <div className="slide-modal-overlay" onClick={() => setViewingSlide(null)}>
          <div className="slide-modal" onClick={(e) => e.stopPropagation()}>
            <div className="slide-modal-header">
              <div>
                <span className="slide-modal-num">Slide {viewingSlide.slideNumber}</span>
                <h3>{viewingSlide.title}</h3>
                {viewingSlide.subtitle && <p>{viewingSlide.subtitle}</p>}
              </div>
              <button onClick={() => setViewingSlide(null)}>✕</button>
            </div>
            <div className="slide-modal-body">
              <div className="content-section">
                <h5>Slide Content</h5>
                <pre>{JSON.stringify(viewingSlide.content, null, 2)}</pre>
              </div>
              <div className="notes-section">
                <h5>Speaker Notes</h5>
                <p>{viewingSlide.speakerNotes}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
