import Link from "next/link";
import { ChatInterface } from "@/components/chat-interface";
import { marazulChatConfig } from "@/lib/marazul-config";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-[#1C1917] text-[#E8E3DC]">
      {/* Minimal top bar */}
      <div className="sticky top-0 z-50 bg-[rgba(28,25,23,0.92)] backdrop-blur-xl border-b border-[rgba(232,227,220,0.06)]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-serif text-[#E8E3DC] text-lg">
            Place Companion
          </Link>
          <Link
            href="/onboarding"
            className="font-sans text-sm bg-[#2D9E6B] text-[#E8E3DC] h-10 px-5 rounded-md flex items-center hover:bg-[#3DC47F] transition-colors"
          >
            Create Your Hotel Assistant
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div className="font-sans text-[11px] text-[#2D9E6B] tracking-widest uppercase mb-6">
              LIVE DEMO
            </div>
            <h1
              className="font-serif font-normal text-[#E8E3DC] leading-[1.1]"
              style={{ fontSize: "56px" }}
            >
              Meet <span className="text-[#2D9E6B]">Marina</span>, the AI Companion of
              MarAzul Riviera Maya.
            </h1>
            <p className="font-sans text-[18px] font-light text-[#A8A099] mt-6 leading-[1.75]">
              A live Place Companion assistant configured for a boutique coastal hotel. Ask
              anything a guest might want to know — in any language.
            </p>
            <p className="font-sans text-[15px] font-light text-[#6B6560] mt-4 leading-[1.75]">
              The same experience can be deployed for your hotel in minutes, no code
              required.
            </p>
            <Link
              href="/onboarding"
              className="inline-flex items-center bg-[#2D9E6B] text-[#E8E3DC] h-12 px-6 rounded-md font-sans font-medium text-sm hover:bg-[#3DC47F] transition-colors mt-10"
            >
              Create Your Hotel Assistant
            </Link>
          </div>

          {/* Right — chat window */}
          <div
            className="bg-[#0F0D0B] rounded-2xl border border-white/[0.08] overflow-hidden flex flex-col"
            style={{ height: "600px" }}
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/[0.08] flex-shrink-0">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[18px] font-medium text-[#E8E3DC]">
                  MarAzul Riviera Maya
                </span>
                <span className="w-2 h-2 rounded-full bg-[#2D9E6B] animate-pulse" />
              </div>
              <div className="font-sans text-[13px] font-light text-[#2D9E6B] mt-1">
                Part of the MarAzul Collection
              </div>
              <div className="font-sans text-[12px] font-light text-[#6B6560] mt-0.5">
                Your 24/7 AI Guest Companion
              </div>
            </div>

            {/* Chat */}
            <div className="flex-1 overflow-hidden">
              <ChatInterface config={marazulChatConfig} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
