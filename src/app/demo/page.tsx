'use client'

import Link from "next/link";
import { ChatInterface } from "@/components/chat-interface";
import { marazulChatConfig } from "@/lib/marazul-config";
import { useLang } from "@/lib/i18n/LanguageContext";
import type { ChatConfig } from "@/components/chat-interface";

export default function DemoPage() {
  const { t } = useLang();

  const demoChatConfig: ChatConfig = {
    ...marazulChatConfig,
    placeholder: t.demo.chatPlaceholder,
    suggestionChips: t.demo.suggestionChips,
  };

  return (
    <div className="min-h-screen" style={{ background: "#141413" }}>
      {/* Minimal nav */}
      <div
        className="px-8 py-5 flex justify-between items-center"
        style={{ borderBottom: "1px solid rgba(250,249,245,0.06)" }}
      >
        <Link href="/" className="font-serif text-xl text-[#FAF9F5]">
          Place Companion
        </Link>
        <Link
          href="/onboarding"
          className="inline-flex items-center font-sans text-[13px] font-medium text-[#FAF9F5] bg-[#C96A3A] hover:bg-[#D4784A] h-9 px-4 rounded-md transition-colors"
        >
          {t.demo.createCta}
        </Link>
      </div>

      {/* Two-column layout */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p
              className="font-sans uppercase tracking-widest text-[#9C9A93] mb-6"
              style={{ fontSize: "11px" }}
            >
              {t.demo.label}
            </p>
            <h1
              className="font-serif font-normal text-[#FAF9F5]"
              style={{ fontSize: "56px", lineHeight: 1.05 }}
            >
              {t.demo.headline}
            </h1>
            <p
              className="font-sans font-light text-[#9C9A93] mt-5"
              style={{ fontSize: "18px", lineHeight: 1.75 }}
            >
              {t.demo.description}
            </p>
            <p
              className="font-sans text-[#9C9A93] mt-4"
              style={{ fontSize: "16px" }}
            >
              {t.demo.langNote}
            </p>
            <Link
              href="/onboarding"
              className="font-sans text-[14px] font-medium text-[#FAF9F5] bg-[#C96A3A] hover:bg-[#D4784A] h-11 px-6 rounded-md transition-colors mt-6 inline-flex items-center"
            >
              {t.demo.createCta}
            </Link>
            <p
              className="font-sans text-[#53525D] mt-3"
              style={{ fontSize: "12px" }}
            >
              {t.demo.trialNote}
            </p>
          </div>

          {/* Right — demo window */}
          <div style={{ background: '#3A3835', borderRadius: '17px', padding: '1px' }}>
          <div
            className="flex flex-col"
            style={{ borderRadius: '16px', overflow: 'hidden', background: '#0F0E0D', height: '600px' }}
          >
            {/* Header */}
            <div
              className="flex-shrink-0 px-6 py-5"
              style={{ borderBottom: "1px solid rgba(250,249,245,0.08)" }}
            >
              <div className="flex justify-between items-center">
                <span className="font-sans text-[20px] font-semibold text-[#FAF9F5]">
                  MarAzul Riviera Maya
                </span>
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: "#FAF9F5" }}
                />
              </div>
              <p className="font-sans text-[13px] font-normal text-[#9C9A93] mt-1">
                {t.demo.collectionLabel}
              </p>
              <p className="font-sans text-[15px] font-light text-[#9C9A93] mt-1">
                {t.demo.aiCompanion}
              </p>
            </div>
            <ChatInterface config={demoChatConfig} />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
