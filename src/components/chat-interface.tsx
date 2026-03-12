"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import { BotMessageSquare, Send, User, Loader2 } from "lucide-react";
import type { PropertyConfig } from "@/types/property";

function renderMarkdown(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code class=\"bg-slate-100 px-1 rounded text-xs font-mono\">$1</code>");
}

interface ChatInterfaceProps {
  config: PropertyConfig;
}

const greetingId = "greeting-msg";

export function ChatInterface({ config }: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const primaryColor = config.branding?.primaryColor ?? "#059669";

  const { messages, sendMessage, status } = useChat({
    transport: new TextStreamChatTransport({
      api: "/api/chat",
      body: { propertyConfig: config },
    }),
    messages: [
      {
        id: greetingId,
        role: "assistant",
        parts: [{ type: "text", text: config.companion.greeting }],
      },
    ],
  });

  const isLoading = status === "submitted" || status === "streaming";
  const showSuggestions =
    messages.length === 1 && !isLoading && !!config.suggestions?.length;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    sendMessage({ text });
  }

  function handleChip(text: string) {
    if (isLoading) return;
    sendMessage({ text });
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div
        className="px-4 py-3 flex items-center gap-3 rounded-t-xl"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
          <BotMessageSquare className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="font-semibold text-white text-sm">{config.companion.name}</div>
          <div className="text-xs text-white/70">AI Companion · Responds in any language</div>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
          <span className="text-xs text-white/80">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-slate-50">
        {messages.map((m, idx) => {
          const textContent = m.parts
            .filter((p) => p.type === "text")
            .map((p) => (p as { type: "text"; text: string }).text)
            .join("");

          if (!textContent) return null;

          const isAssistant = (m.role as string) === "assistant";
          const isGreeting = m.id === greetingId;

          return (
            <div key={m.id}>
              <div
                className={`flex items-end gap-2 ${!isAssistant ? "flex-row-reverse" : ""}`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isAssistant ? "bg-emerald-100" : "bg-slate-200"
                  }`}
                >
                  {isAssistant ? (
                    <BotMessageSquare className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <User className="w-4 h-4 text-slate-500" />
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    isAssistant
                      ? "bg-white border border-slate-100 text-slate-800 rounded-bl-sm"
                      : "text-white rounded-br-sm"
                  }`}
                  style={!isAssistant ? { backgroundColor: primaryColor } : undefined}
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(textContent) }}
                />
              </div>

              {/* Suggestion chips — shown only after greeting, before first user message */}
              {isGreeting && showSuggestions && (
                <div className="flex flex-wrap gap-2 mt-3 pl-9">
                  {config.suggestions!.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleChip(s)}
                      className="text-xs text-slate-600 bg-white border border-slate-200 rounded-full px-3 py-1.5 hover:border-emerald-400 hover:text-emerald-700 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-end gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
              <BotMessageSquare className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="bg-white border border-slate-100 px-3.5 py-2.5 rounded-2xl rounded-bl-sm">
              <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="px-4 py-3 bg-white border-t border-slate-100 rounded-b-xl flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-white transition-opacity disabled:opacity-40"
          style={{ backgroundColor: primaryColor }}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
