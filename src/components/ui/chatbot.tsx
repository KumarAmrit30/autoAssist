import { useEffect, useMemo, useRef, useState } from "react";
import { carsData, searchCars } from "@/data/cars";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChatMessage = { id: string; role: "user" | "bot"; text: string; ts: number };
type Conversation = { id: string; createdAt: number; title: string; messages: ChatMessage[] };

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function rankRecommendation(query: string) {
  const hits = searchCars(query);
  if (hits.length === 0) return undefined;
  // simple heuristic: prefer higher rating, then mileage numeric parse if present
  return [...hits].sort((a, b) => {
    const r = b.rating - a.rating;
    if (r !== 0) return r;
    const parseKm = (m: string) => parseFloat((m || "").replace(/[^0-9.]/g, "")) || 0;
    return parseKm(b.mileage) - parseKm(a.mileage);
  })[0];
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState<boolean>(() => localStorage.getItem("chatbot:isOpen") === "1");
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    try {
      const s = localStorage.getItem("chatbot:conversations");
      if (s) return JSON.parse(s) as Conversation[];
    } catch {}
    const first: Conversation = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      title: "New chat",
      messages: [
        { id: crypto.randomUUID(), role: "bot", text: `${getGreeting()}! How may I assist you today?`, ts: Date.now() },
      ],
    };
    return [first];
  });
  const [activeId, setActiveId] = useState<string>(() => localStorage.getItem("chatbot:activeId") || "");
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<"light" | "dark">(() => (localStorage.getItem("chatbot:theme") as any) || "light");

  // Ensure we always have an active conversation
  useEffect(() => {
    if (!activeId && conversations.length > 0) setActiveId(conversations[0].id);
  }, [conversations, activeId]);

  const active = useMemo(() => conversations.find((c) => c.id === activeId), [conversations, activeId]);

  useEffect(() => {
    localStorage.setItem("chatbot:conversations", JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem("chatbot:activeId", activeId);
  }, [activeId]);

  useEffect(() => {
    localStorage.setItem("chatbot:isOpen", isOpen ? "1" : "0");
  }, [isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [active, isOpen]);

  useEffect(() => {
    localStorage.setItem("chatbot:theme", theme);
  }, [theme]);

  const startNewChat = () => {
    const conv: Conversation = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      title: "New chat",
      messages: [
        { id: crypto.randomUUID(), role: "bot", text: `${getGreeting()}! How may I assist you today?`, ts: Date.now() },
      ],
    };
    setConversations((prev) => [conv, ...prev]);
    setActiveId(conv.id);
  };

  const closeConversation = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeId === id) {
      const remaining = conversations.filter((c) => c.id !== id);
      setActiveId(remaining[0]?.id || "");
    }
  };

  const handleSend = () => {
    const q = input.trim();
    if (!q) return;
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", text: q, ts: Date.now() };
    setConversations((prev) => prev.map((c) => (c.id === activeId ? { ...c, messages: [...c.messages, userMsg], title: c.title === "New chat" ? q.slice(0, 30) || c.title : c.title } : c)));

    // compute response
    const rec = rankRecommendation(q);
    const replyText = rec
      ? `Based on your query, I recommend ${rec.brand} ${rec.name} (₹${rec.price}). It offers ${rec.fuelType} fuel, ${rec.transmission} transmission, seats ${rec.seating}, mileage ${rec.mileage}, and a rating of ${rec.rating}.`
      : `I couldn't match that to a car. Try mentioning a brand (e.g., Hyundai), fuel type (Petrol/Diesel), or features.`;
    const botMsg: ChatMessage = { id: crypto.randomUUID(), role: "bot", text: replyText, ts: Date.now() };
    setConversations((prev) => prev.map((c) => (c.id === activeId ? { ...c, messages: [...c.messages, botMsg] } : c)));
    setInput("");
  };

  const containerStyle = "fixed bottom-4 right-4 z-50";
  const isLight = theme === "light";
  const panelStyle =
    `w-[360px] sm:w-[420px] rounded-lg border shadow-xl flex flex-col animate-none ${isLight ? "bg-white text-slate-900 border-slate-200" : "bg-slate-900 text-slate-100 border-slate-700"}`;
  const headerStyle = `px-4 py-3 border-b flex items-center justify-between flex-wrap gap-2 ${isLight ? "border-slate-200" : "border-slate-700"}`;
  const historyStyle = `px-3 py-2 border-b flex gap-2 overflow-x-auto ${isLight ? "border-slate-200" : "border-slate-700"}`;
  const bodyStyle = `px-4 py-3 space-y-3 overflow-y-auto max-h-[80vh] ${isLight ? "bg-slate-50" : "bg-transparent"}`;
  const footerStyle = `p-3 border-t flex items-center gap-2 ${isLight ? "border-slate-200" : "border-slate-700"}`;

  return (
    <div className={containerStyle}>
      {isOpen ? (
        <div className={panelStyle}>
          <div className={headerStyle}>
            <div className="font-semibold">AutoAssist Chat</div>
            <div className="flex items-center gap-2">
              <span className={`${isLight ? "bg-green-100 text-green-700" : "bg-green-900/30 text-green-300"} text-xs px-2 py-1 rounded shrink-0`}>Active</span>
              <Button
                size="sm"
                className={`${isLight ? "bg-slate-100 text-slate-900 border border-slate-300 hover:bg-slate-200" : "bg-slate-800 text-slate-100 border border-slate-700 hover:bg-slate-700"}`}
                onClick={() => setTheme(isLight ? "dark" : "light")}
              >
                {isLight ? "Dark" : "Light"} Theme
              </Button>
              <Button
                size="sm"
                className={`${isLight ? "bg-slate-100 text-slate-900 border border-slate-300 hover:bg-slate-200" : "bg-slate-800 text-slate-100 border border-slate-700 hover:bg-slate-700"}`}
                onClick={startNewChat}
              >
                New Chat
              </Button>
              <Button size="sm" className={`${isLight ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-500 text-white hover:bg-blue-600"}`} onClick={() => setIsOpen(false)}>Close</Button>
            </div>
          </div>
          <div className={historyStyle}>
            {conversations.map((c) => (
              <div
                key={c.id}
                className={`flex items-center gap-2 px-2 py-1 rounded border transition ${
                  isLight
                    ? `border-slate-200 ${c.id === activeId ? "bg-slate-100" : "bg-white hover:bg-slate-100"}`
                    : `border-slate-700 ${c.id === activeId ? "bg-slate-800" : "bg-slate-900 hover:bg-slate-800"}`
                }`}
              >
                <button className="text-sm" onClick={() => setActiveId(c.id)} title={new Date(c.createdAt).toLocaleString()}>
                  {c.title || "Chat"}
                </button>
                <button className={`text-xs ${isLight ? "text-slate-500 hover:text-red-600" : "text-slate-400 hover:text-red-400"}`} onClick={() => closeConversation(c.id)}>×</button>
              </div>
            ))}
          </div>
          <div ref={scrollRef} className={bodyStyle}>
            {active?.messages.map((m) => (
              <div key={m.id} className={m.role === "user" ? "text-right" : "text-left"}>
                <div
                  className={
                    "inline-block rounded-lg px-3 py-2 border " +
                    (m.role === "user"
                      ? isLight ? "bg-white border-slate-300" : "bg-slate-700 border-slate-600"
                      : isLight ? "bg-slate-50 border-slate-200" : "bg-slate-800 border-slate-700")
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className={footerStyle}>
            <Input
              placeholder="Ask for cars, features, budget..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              className={`${isLight ? "bg-white text-slate-900 border-slate-300" : "bg-slate-800 text-slate-100 border-slate-600"}`}
            />
            <Button onClick={handleSend}>Send</Button>
          </div>
        </div>
      ) : (
        <Button className="rounded-full shadow-lg bg-white text-slate-900 hover:bg-slate-100 animate-none transition-none" onClick={() => setIsOpen(true)}>
          New Chat
        </Button>
      )}
    </div>
  );
}


