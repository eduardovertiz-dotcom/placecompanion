"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import { Send, Loader2 } from "lucide-react";
import type { PropertyConfig } from "@/types/property";

function renderMarkdown(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(
      /`(.+?)`/g,
      '<code class="bg-white/10 px-1 rounded text-xs font-mono">$1</code>',
    );
}

interface ChatInterfaceProps {
  config: PropertyConfig;
}

const greetingId = "greeting-msg";

export function ChatInterface({ config }: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

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
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 bg-[#0F0D0B]">
        {messages.map((m) => {
          const textContent = m.parts
            .filter((p) => p.type === "text")
            .map((p) => (p as { type: "text"; text: string }).text)
            .join("");

          if (!textContent) return null;

          const isAssistant = (m.role as string) === "assistant";
          const isGreeting = m.id === greetingId;

          return (
            <div key={m.id}>
              <div className={`flex ${!isAssistant ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-4 py-3 font-sans text-[15px] text-[#E8E3DC] leading-relaxed whitespace-pre-line ${
                    isAssistant
                      ? "bg-[#1E3328] rounded-[12px_12px_3px_12px] border border-[#2D9E6B]/20"
                      : "bg-[#242019] rounded-[12px_12px_12px_3px]"
                  }`}
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(textContent) }}
                />
              </div>

              {isGreeting && showSuggestions && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {config.suggestions!.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleChip(s)}
                      className="text-xs font-sans text-[#A8A099] bg-[#1C1917] border border-white/[0.12] rounded-full px-3 py-1.5 hover:border-white/25 hover:text-[#E8E3DC] transition-colors"
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
          <div className="flex justify-start">
            <div className="bg-[#1E3328] border border-[#2D9E6B]/20 px-4 py-3 rounded-[12px_12px_3px_12px]">
              <Loader2 className="w-4 h-4 text-[#2D9E6B] animate-spin" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="px-4 py-3 bg-[#0F0D0B] border-t border-[rgba(232,227,220,0.08)] flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about the hotel..."
          className="flex-1 text-sm font-sans bg-[#242019] text-[#E8E3DC] placeholder-[#6B6560] border border-[rgba(232,227,220,0.08)] rounded-lg px-3 py-2 outline-none focus:border-[#2D9E6B]/50 transition-all"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#2D9E6B] text-[#E8E3DC] transition-opacity disabled:opacity-40 hover:bg-[#3DC47F]"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
