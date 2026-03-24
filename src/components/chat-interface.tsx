"use client";

import { useState, useRef, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export interface ChatConfig {
  hotelName: string;
  assistantName: string;
  collection: string;
  systemPrompt: string;
  suggestionChips?: string[];
  placeholder?: string;
  mobileChipsLimit?: number;
  greeting?: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

const GREETING_ID = "greeting-msg";

function renderMarkdown(text: string): string {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const paragraphs = escaped.split(/\n\n+/);

  return paragraphs
    .map((para) => {
      const lines = para.split("\n").map((line) => {
        const bullet = line.match(/^(\s*)[-*]\s+(.+)$/);
        if (bullet) {
          const content = applyInline(bullet[2]);
          return `<span style="display:flex;gap:8px;align-items:baseline;margin-bottom:4px"><span style="flex-shrink:0;color:#FAF9F5">•</span><span>${content}</span></span>`;
        }
        return applyInline(line);
      });
      return lines.join("<br>");
    })
    .join('<div style="height:10px"></div>');
}

function applyInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(
      /`(.+?)`/g,
      `<code style="background:rgba(250,249,245,0.08);padding:1px 4px;border-radius:4px;font-size:13px;font-family:monospace">$1</code>`
    );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

function ContrastIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a10 10 0 0 1 0 20V2z" fill="currentColor" stroke="none"/>
    </svg>
  )
}

export function ChatInterface({ config }: { config: ChatConfig }) {
  const greeting = config.greeting ?? `Welcome to ${config.hotelName}. I'm ${config.assistantName}, your AI Guest Companion. How can I help you today?`;

  const [messages, setMessages] = useState<Message[]>([
    { id: GREETING_ID, role: "assistant", text: greeting },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const { skin, cycle } = useTheme();

  useEffect(() => {
    const el = messagesRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, isLoading]);

  const showSuggestions =
    messages.length === 1 && !isLoading && !!config.suggestionChips?.length;

  async function sendMessage(text: string) {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", text };
    const assistantId = `a-${Date.now() + 1}`;

    setMessages((prev) => [
      ...prev,
      userMsg,
      { id: assistantId, role: "assistant", text: "" },
    ]);
    setIsLoading(true);

    try {
      const apiMessages = [...messages, userMsg]
        .filter((m) => m.id !== GREETING_ID)
        .map((m) => ({
          id: m.id,
          role: m.role,
          parts: [{ type: "text", text: m.text }],
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          propertyConfig: config,
        }),
      });

      if (res.status === 429) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, text: "__rate_limited__" } : m
          )
        );
        setIsLoading(false);
        return;
      }

      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, text: accumulated } : m
          )
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, text: "I'm sorry, something went wrong. Please try again." }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    sendMessage(text);
  }

  const lastMsg = messages[messages.length - 1];
  const showTypingIndicator =
    isLoading && lastMsg?.role === "assistant" && lastMsg?.text === "";

  return (
    <div className="flex flex-col flex-1 min-h-0" style={{ background: "var(--pc-bg-secondary)", position: 'relative' }}>
      <div
        ref={messagesRef}
        className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 px-5 py-5 flex flex-col gap-3"
        style={{ overscrollBehavior: "contain" }}
      >
        {messages.map((m) => (
          <div key={m.id}>
            <div className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.text === "__rate_limited__" ? (
                <div
                  className="font-sans"
                  style={{
                    maxWidth: "80%",
                    padding: "12px 16px",
                    fontSize: "15px",
                    lineHeight: 1.6,
                    color: "#E8E3DC",
                    background: "var(--pc-bg-elevated)",
                    borderRadius: "16px",
                    marginRight: "auto",
                  }}
                >
                  <p>You&apos;ve experienced Place Companion. Ready to create your own?</p>
                  <a
                    href="/onboarding"
                    className="font-sans text-[13px] font-medium text-[#FAF9F5] bg-[#C96A3A] hover:bg-[#D4784A] h-9 px-4 rounded-md transition-colors mt-3 inline-block"
                  >
                    Create Your Hotel Assistant
                  </a>
                </div>
              ) : m.text ? (
                <div
                  className="font-sans"
                  style={{
                    maxWidth: "80%",
                    padding: "12px 16px",
                    fontSize: "15px",
                    lineHeight: 1.6,
                    color: m.role === "user" ? "#FFFFFF" : "#E8E3DC",
                    background: m.role === "user" ? "var(--pc-bg-input)" : "var(--pc-bg-elevated)",
                    borderRadius: "16px",
                    marginLeft: m.role === "user" ? "auto" : undefined,
                    marginRight: m.role === "assistant" ? "auto" : undefined,
                  }}
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(m.text) }}
                />
              ) : null}
            </div>
          </div>
        ))}

        {showTypingIndicator && (
          <div className="flex justify-start">
            <div
              style={{
                padding: "12px 16px",
                background: "var(--pc-bg-elevated)",
                borderRadius: "16px",
              }}
            >
              <Loader2 className="w-4 h-4 animate-spin" style={{ color: "#9C9A93" }} />
            </div>
          </div>
        )}
      </div>

      {/* Suggestion chips — below scroll area, above input */}
      {showSuggestions && (
        <div className="flex-shrink-0 px-5 pt-4 pb-1 flex flex-wrap gap-2">
          {config.suggestionChips!.map((s, chipIdx) => (
            <button
              key={s}
              type="button"
              onClick={() => sendMessage(s)}
              className={`font-sans transition-all duration-200${config.mobileChipsLimit !== undefined && chipIdx >= config.mobileChipsLimit ? ' hidden sm:inline-flex' : ''}`}
              style={{
                background: "var(--pc-bg-input)",
                border: "1px solid rgba(232,227,220,0.08)",
                borderRadius: "9999px",
                padding: "8px 16px",
                fontSize: "13px",
                color: "#A8A099",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.color = "#FAF9F5";
                el.style.borderColor = "rgba(232,227,220,0.2)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.color = "#A8A099";
                el.style.borderColor = "rgba(232,227,220,0.08)";
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Breathing room spacer between chips and input */}
      <div className="flex-1" style={{ maxHeight: '32px' }} />

      <form
        onSubmit={handleSubmit}
        className="flex-shrink-0 flex items-center gap-2 px-4 py-3"
        style={{
          background: "#141210",
          borderTop: "1px solid rgba(232,227,220,0.08)",
        }}
      >
        <button
          type="button"
          onClick={cycle}
          aria-label={`Switch theme. Current: ${skin}`}
          style={{
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: skin === 'dark' ? '#6B6560' : '#9A9490',
            borderRadius: '50%',
            padding: '0',
            flexShrink: 0,
            opacity: 0.5,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.5')}
        >
          {skin === 'dark' ? <MoonIcon /> : skin === 'light' ? <SunIcon /> : <ContrastIcon />}
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={config.placeholder ?? "Ask anything about the hotel…"}
          disabled={isLoading}
          className="flex-1 min-w-0 font-sans outline-none placeholder-[#6B6560]"
          style={{
            background: "var(--pc-bg-primary)",
            border: "1px solid rgba(232,227,220,0.15)",
            borderRadius: "12px",
            padding: "12px 16px",
            fontSize: "15px",
            color: "#FFFFFF",
          }}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          style={{
            width: "40px",
            height: "40px",
            background: isLoading || !input.trim() ? "rgba(201,106,58,0.35)" : "#C96A3A",
            borderRadius: "999px",
            border: "none",
            cursor: isLoading || !input.trim() ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.2s",
            outline: !isLoading && !input.trim() ? "2px solid #C96A3A" : "2px solid transparent",
            outlineOffset: "3px",
            animation: !isLoading && !input.trim() ? "pc-btn-blink 1.2s ease-in-out infinite" : "none",
          }}
          onMouseEnter={e => { if (!isLoading && input.trim()) (e.currentTarget as HTMLButtonElement).style.background = '#D4784A' }}
          onMouseLeave={e => { if (!isLoading && input.trim()) (e.currentTarget as HTMLButtonElement).style.background = '#C96A3A' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M14 2L7 9M14 2L10 14L7 9M14 2L2 6L7 9"
              stroke="#FAF9F5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
