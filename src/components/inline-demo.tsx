"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import { BotMessageSquare, Send, Loader2 } from "lucide-react";

const SYSTEM_PROMPT = `You are the AI Guest Companion for MarAzul Riviera Maya, part of the MarAzul Collection — a group of boutique coastal hotels across Mexico.

MarAzul Riviera Maya has 118 rooms.

PROPERTY KNOWLEDGE:
- Casa Marina Restaurant: beachfront terrace, breakfast 7-11am, dinner 6-10pm, fresh seafood and Yucatecan cuisine
- Spa Ixchel: second floor, open daily 9am-7pm. Deep tissue massage 60min $85. Mayan stone therapy 90min $120. Jade facial 45min $65.
- Beach club: cenote access, paddle boards, kayaks, beach chairs. Open sunrise to sunset.
- Rooftop bar: open 5pm-midnight, mezcal cocktails, jungle and ocean views
- Pool: main pool open 7am-10pm
- Gym: open 24 hours, second floor

NEARBY:
- Mercado de Artesanías: 5 min walk, local crafts and souvenirs
- Café Selvática: 4 min walk, open 7am-3pm, great breakfast
- Snorkel rentals at the beach: 3 min walk, from $20/day
- Cenote Azul: 15 min by taxi, best snorkeling in the area

RULES:
- Always recommend internal hotel services first before external options
- Be warm, professional, concierge-like in tone
- Respond in whatever language the guest uses — English or Spanish only
- Keep responses concise but complete
- Use structured format with clear sections when listing options`;

const GREETING_ID = "marazul-greeting";
const GREETING_TEXT =
  "Welcome to MarAzul Riviera Maya! I'm your AI Guest Companion. Ask me anything about the property — dining, spa, beach activities, and more.\n\nTambién hablo español — pregúntame lo que necesites.";

function renderMarkdown(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code class=\"bg-white/10 px-1 rounded text-xs font-mono\">$1</code>");
}

interface InlineDemoProps {
  chips: string[];
  className?: string;
  systemPrompt?: string;
  headerName?: string;
  wrapperStyle?: React.CSSProperties;
  chipVariant?: "default" | "hero";
}

export function InlineDemo({ chips, className = "", systemPrompt, headerName, wrapperStyle, chipVariant = "default" }: InlineDemoProps) {
  const [input, setInput] = useState("");
  const messagesRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const effectivePrompt = systemPrompt ?? SYSTEM_PROMPT;

  const { messages, sendMessage, status } = useChat({
    transport: new TextStreamChatTransport({
      api: "/api/chat",
      body: { rawSystemPrompt: effectivePrompt },
    }),
    messages: [
      {
        id: GREETING_ID,
        role: "assistant",
        parts: [{ type: "text", text: GREETING_TEXT }],
      },
    ],
  });

  const isLoading = status === "submitted" || status === "streaming";
  const showChips = messages.length === 1 && !isLoading;

  // Scroll only the internal messages container — never the page
  useEffect(() => {
    const container = messagesRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [messages, status]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    sendMessage({ text });
  }

  function handleChip(e: React.MouseEvent, text: string) {
    e.preventDefault();
    if (isLoading) return;
    sendMessage({ text });
  }

  return (
    <div
      className={`bg-[#080B07] rounded-2xl border border-[#F0EDE6]/[0.10] overflow-hidden flex flex-col ${className}`}
      style={{ contain: "strict", ...wrapperStyle }}
    >
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3 bg-[#080B07] border-b border-[#F0EDE6]/[0.10] flex-shrink-0">
        <div className="w-8 h-8 bg-[#2D9E6B]/20 rounded-full flex items-center justify-center flex-shrink-0">
          <BotMessageSquare className="w-4 h-4 text-[#2D9E6B]" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-[#F0EDE6] text-[18px] leading-tight truncate">
            {headerName ?? "MarAzul Riviera Maya"} · AI Guest Companion
          </div>
          <div className="text-xs text-[#9A9590] leading-tight mt-0.5">
            {headerName ? "Powered by Place Companion" : "Part of the MarAzul Collection"}
          </div>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="w-2 h-2 bg-[#2D9E6B] rounded-full animate-pulse" />
          <span className="text-xs text-[#9A9590]">Online</span>
        </div>
      </div>

      {/* Messages — scrollable, fills remaining height */}
      <div
        ref={messagesRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0"
        style={{ overscrollBehavior: "contain" }}
      >
        {messages.map((m) => {
          const text = m.parts
            .filter((p) => p.type === "text")
            .map((p) => (p as { type: "text"; text: string }).text)
            .join("");

          if (!text) return null;

          const isAssistant = m.role === "assistant";
          const isGreeting = m.id === GREETING_ID;

          return (
            <div key={m.id}>
              <div className={`flex items-end gap-2 ${!isAssistant ? "flex-row-reverse" : ""}`}>
                {isAssistant && (
                  <div className="w-6 h-6 rounded-full bg-[#2D9E6B]/20 flex items-center justify-center flex-shrink-0 mb-0.5">
                    <BotMessageSquare className="w-3.5 h-3.5 text-[#2D9E6B]" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    isAssistant
                      ? "bg-[#141810] text-[#F0EDE6] rounded-bl-sm border border-[#F0EDE6]/[0.10]"
                      : "bg-[#2D9E6B] text-white rounded-br-sm"
                  }`}
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(text) }}
                />
              </div>

              {isGreeting && showChips && (
                <div className="flex flex-wrap gap-2 mt-3 pl-8">
                  {chips.map((chip) =>
                    chipVariant === "hero" ? (
                      <button
                        key={chip}
                        onClick={(e) => handleChip(e, chip)}
                        className="text-xs font-sans transition-all duration-200"
                        style={{
                          background: "transparent",
                          border: "1px solid rgba(45,158,107,0.40)",
                          borderRadius: "20px",
                          padding: "8px 16px",
                          color: "#3DC47F",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget;
                          el.style.background = "rgba(45,158,107,0.08)";
                          el.style.borderColor = "rgba(45,158,107,0.70)";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget;
                          el.style.background = "transparent";
                          el.style.borderColor = "rgba(45,158,107,0.40)";
                        }}
                      >
                        {chip}
                      </button>
                    ) : (
                      <button
                        key={chip}
                        onClick={(e) => handleChip(e, chip)}
                        className="text-xs text-[#F0EDE6] bg-[#141810] border border-[#2D9E6B]/40 rounded-full px-3 py-1.5 hover:bg-[#2D9E6B]/10 transition-colors duration-200"
                      >
                        {chip}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-end gap-2">
            <div className="w-6 h-6 rounded-full bg-[#2D9E6B]/20 flex items-center justify-center">
              <BotMessageSquare className="w-3.5 h-3.5 text-[#2D9E6B]" />
            </div>
            <div className="bg-[#141810] border border-[#F0EDE6]/[0.10] px-3.5 py-2.5 rounded-2xl rounded-bl-sm">
              <Loader2 className="w-4 h-4 text-[#2D9E6B]/50 animate-spin" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input — flex-shrink-0 keeps it anchored at the bottom */}
      <form
        onSubmit={handleSubmit}
        className="px-4 py-3 border-t border-[#F0EDE6]/[0.10] flex items-center gap-2 bg-[#080B07] flex-shrink-0"
      >
        <input
          type="text"
          inputMode="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={(e) => e.preventDefault()}
          placeholder="Ask anything about the hotel…"
          className="flex-1 text-sm bg-[#141810] border border-[#F0EDE6]/[0.10] rounded-lg px-3 py-2 text-[#F0EDE6] placeholder-[#9A9590]/60 outline-none focus:border-[#2D9E6B]/60 transition-colors duration-200"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#2D9E6B] hover:bg-[#3DC47F] text-white transition-colors duration-200 disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
