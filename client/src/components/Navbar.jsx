import { TrendingUp, Menu, X } from "lucide-react";
import "./Navbar.css";

export default function Navbar({ onMenuToggle, menuOpen, activeTab, setActiveTab }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <button className="menu-btn" onClick={onMenuToggle} aria-label="Toggle menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <TrendingUp size={28} className="brand-icon" />
          <div>
            <h1 className="brand-title">AI Market Trend Assistant</h1>
            <p className="brand-subtitle">Executive Intelligence Platform</p>
          </div>
        </div>

        <div className={`navbar-tabs ${menuOpen ? "mobile-open" : ""}`}>
          <button
            className={`nav-tab ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`nav-tab ${activeTab === "assistant" ? "active" : ""}`}
            onClick={() => setActiveTab("assistant")}
          >
            AI Assistant
          </button>
          <button
            className={`nav-tab ${activeTab === "proposal" ? "active" : ""}`}
            onClick={() => setActiveTab("proposal")}
          >
            Proposal Generator
          </button>
        </div>
      </div>
    </nav>
  );
}
