import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Assistant from "./pages/Assistant";
import ProposalGenerator from "./pages/ProposalGenerator";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app">
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => { setActiveTab(tab); setMenuOpen(false); }}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((prev) => !prev)}
      />
      <main className="app-main">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "assistant" && <Assistant />}
        {activeTab === "proposal" && <ProposalGenerator />}
      </main>
    </div>
  );
}
