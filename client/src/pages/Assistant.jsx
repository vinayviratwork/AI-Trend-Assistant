import { useState, useRef, useEffect } from "react";
import { api } from "../utils/api";
import { Send, Bot, User, Sparkles, BarChart2, TrendingUp, Lightbulb, Loader } from "lucide-react";
import "./Assistant.css";

const WELCOME_MESSAGE = {
  id: "welcome",
  type: "assistant",
  content: {
    type: "greeting",
    message:
      "Hello! I'm your **AI Market Trend Assistant**. I can help you analyze AI market trends, compare technologies, assess investment opportunities, and generate strategic insights.\n\nWhat would you like to explore today?",
    suggestions: [
      "What are the top AI trends right now?",
      "Show me the global AI market overview",
      "Tell me about Generative AI",
      "What are the best low-risk AI investments?"
    ]
  },
  timestamp: new Date().toISOString()
};

function MessageBubble({ msg, onSuggestion }) {
  const isUser = msg.type === "user";

  if (isUser) {
    return (
      <div className="msg-row msg-row-user">
        <div className="msg-bubble msg-user">
          <p>{msg.content}</p>
        </div>
        <div className="msg-avatar user-avatar">
          <User size={16} />
        </div>
      </div>
    );
  }

  const { content } = msg;

  const renderContent = () => {
    if (!content) return null;

    return (
      <div className="msg-content">
        {/* Main message text */}
        {content.message && (
          <p
            className="msg-text"
            dangerouslySetInnerHTML={{
              __html: content.message
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/\n/g, "<br/>")
            }}
          />
        )}

        {/* Market Overview */}
        {content.type === "overview" && content.data && (
          <div className="response-grid">
            <div className="stat-card">
              <span className="stat-label">Market 2024</span>
              <span className="stat-val">${content.data.globalAIMarketSize2024}B</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Projected 2030</span>
              <span className="stat-val green">${content.data.globalAIMarketSize2030}B</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">CAGR</span>
              <span className="stat-val blue">{content.data.overallCAGR}%</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Enterprise Adoption</span>
              <span className="stat-val purple">{content.data.enterpriseAIAdoption}%</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">VC Investment</span>
              <span className="stat-val">${content.data.totalInvestment2024}B</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Top Trend</span>
              <span className="stat-val" style={{ fontSize: "0.8rem" }}>{content.data.topTrend}</span>
            </div>
          </div>
        )}

        {/* Items list (trends, comparison, etc.) */}
        {content.items && content.items.length > 0 && (
          <div className="items-list">
            {content.items.map((item, i) => (
              <div key={i} className="item-row">
                <div className="item-rank">{i + 1}</div>
                <div className="item-details">
                  <strong>{item.name}</strong>
                  <div className="item-meta">
                    {item.score !== undefined && <span>Score: {item.score}/100</span>}
                    {item.cagr && <span>CAGR: {item.cagr}</span>}
                    {item.marketSize && <span>Market: {item.marketSize}</span>}
                    {item.growthRate && <span>Growth: {item.growthRate}</span>}
                    {item.status && (
                      <span className="status-tag">{item.status}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Trend Detail */}
        {content.type === "trend_detail" && content.trend && (
          <div className="trend-detail-box">
            <div className="trend-detail-header">
              <span className="detail-name">{content.trend.name}</span>
              <span className="detail-score">Score: {content.trend.trendScore}/100</span>
            </div>
            <p className="detail-desc">{content.trend.description}</p>
            <div className="detail-stats">
              <div className="dstat">
                <span>Market (2024)</span>
                <strong>${content.trend.marketSize}B</strong>
              </div>
              <div className="dstat">
                <span>Projected (2030)</span>
                <strong style={{ color: "#10B981" }}>${content.trend.projectedSize}B</strong>
              </div>
              <div className="dstat">
                <span>CAGR</span>
                <strong style={{ color: "#3B82F6" }}>{content.trend.cagr}%</strong>
              </div>
              <div className="dstat">
                <span>Risk</span>
                <strong>{content.trend.riskLevel}</strong>
              </div>
            </div>
            <div className="detail-section">
              <strong>Key Players:</strong>
              <div className="chips">
                {content.trend.keyPlayers.map((p) => (
                  <span key={p} className="chip purple">{p}</span>
                ))}
              </div>
            </div>
            <div className="detail-section">
              <strong>Top Use Cases:</strong>
              <div className="chips">
                {content.trend.useCases.slice(0, 4).map((uc) => (
                  <span key={uc} className="chip blue">{uc}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Knowledge base response */}
        {content.keyPoints && (
          <ul className="key-points">
            {content.keyPoints.map((pt, i) => (
              <li key={i}>{pt}</li>
            ))}
          </ul>
        )}

        {content.recommendation && content.type !== "trend_detail" && (
          <div className="recommendation-box">
            <div className="rec-header">
              <Lightbulb size={14} />
              <strong>Strategic Recommendation</strong>
            </div>
            <p>{content.recommendation}</p>
          </div>
        )}

        {/* Steps */}
        {content.steps && (
          <div className="steps-list">
            {content.steps.map((step, i) => (
              <div key={i} className="step-item">
                {step}
              </div>
            ))}
          </div>
        )}

        {/* Urgency */}
        {content.urgencyMetric && (
          <div className="urgency-box">
            <span>⚡</span>
            <p>{content.urgencyMetric}</p>
          </div>
        )}

        {/* Suggestions */}
        {content.suggestions && content.suggestions.length > 0 && (
          <div className="suggestion-chips">
            {content.suggestions.map((sug, i) => (
              <button key={i} className="sug-chip" onClick={() => onSuggestion(sug)}>
                {sug}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="msg-row msg-row-bot">
      <div className="msg-avatar bot-avatar">
        <Bot size={16} />
      </div>
      <div className="msg-bubble msg-bot">{renderContent()}</div>
    </div>
  );
}

export default function Assistant() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const msg = (text || input).trim();
    if (!msg || isLoading) return;

    setInput("");
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: "user", content: msg, timestamp: new Date().toISOString() }
    ]);
    setIsLoading(true);

    try {
      const res = await api.chat(msg, "session-1");
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "assistant",
          content: res.response,
          timestamp: res.timestamp
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "assistant",
          content: {
            type: "error",
            message: "Sorry, I encountered an error. Please try again.",
            suggestions: ["What are the top AI trends?", "Show me market overview"]
          },
          timestamp: new Date().toISOString()
        }
      ]);
    }

    setIsLoading(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="assistant-page">
      {/* Sidebar */}
      <div className="assistant-sidebar">
        <div className="sidebar-header">
          <Sparkles size={18} />
          <h3>Suggested Queries</h3>
        </div>
        <div className="sidebar-items">
          {[
            { icon: <TrendingUp size={14} />, text: "Top AI trends this year" },
            { icon: <BarChart2 size={14} />, text: "Global AI market overview" },
            { icon: <TrendingUp size={14} />, text: "Fastest growing AI sectors" },
            { icon: <Lightbulb size={14} />, text: "Best AI investment opportunities" },
            { icon: <BarChart2 size={14} />, text: "Tell me about Generative AI" },
            { icon: <TrendingUp size={14} />, text: "AI in Healthcare trends" },
            { icon: <BarChart2 size={14} />, text: "Vector databases and RAG" },
            { icon: <Lightbulb size={14} />, text: "Low-risk AI investment areas" },
            { icon: <TrendingUp size={14} />, text: "AI cybersecurity market" },
            { icon: <Lightbulb size={14} />, text: "Generate a proposal recommendation" }
          ].map(({ icon, text }, i) => (
            <button key={i} className="sidebar-item" onClick={() => sendMessage(text)}>
              <span className="sidebar-icon">{icon}</span>
              {text}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="chat-window">
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="bot-status-dot" />
            <div>
              <h3>AI Market Intelligence Assistant</h3>
              <span>Powered by market data · {messages.length - 1} messages</span>
            </div>
          </div>
          <button
            className="clear-btn"
            onClick={() => setMessages([WELCOME_MESSAGE])}
          >
            Clear Chat
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} onSuggestion={sendMessage} />
          ))}

          {isLoading && (
            <div className="msg-row msg-row-bot">
              <div className="msg-avatar bot-avatar">
                <Bot size={16} />
              </div>
              <div className="msg-bubble msg-bot thinking">
                <Loader size={16} className="spin-icon" />
                <span>Analyzing market data...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="chat-input-area">
          <textarea
            ref={inputRef}
            className="chat-input"
            placeholder="Ask about AI trends, market opportunities, or investment insights..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button
            className="send-btn"
            onClick={() => sendMessage()}
            disabled={!input.trim() || isLoading}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
