const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "API error");
  return data;
}

export const api = {
  getTrends: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/trends${qs ? "?" + qs : ""}`);
  },
  getTrendById: (id) => apiFetch(`/trends/${id}`),
  getMarketOverview: () => apiFetch("/trends/overview"),
  getFilters: () => apiFetch("/trends/filters"),

  chat: (message, sessionId) =>
    apiFetch("/assistant/chat", {
      method: "POST",
      body: JSON.stringify({ message, sessionId })
    }),
  getSuggestions: () => apiFetch("/assistant/suggestions"),

  generateProposal: (payload) =>
    apiFetch("/proposal/generate", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  getProposal: (id) => apiFetch(`/proposal/${id}`),
  getProposalTemplates: () => apiFetch("/proposal/templates/list"),

  health: () => apiFetch("/health")
};
