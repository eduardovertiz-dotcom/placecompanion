'use client'

import { useState } from "react"
import Link from "next/link"
import { ChatInterface } from "@/components/chat-interface"
import { marazulChatConfig } from "@/lib/marazul-config"
import { useLang } from "@/lib/i18n/LanguageContext"
import type { ChatConfig } from "@/components/chat-interface"

export default function DemoPage() {
  const { t, lang } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)

  const demoChatConfig: ChatConfig = {
    ...marazulChatConfig,
    placeholder: lang === 'es' ? 'Pregunta algo...' : 'Ask anything...',
    greeting: lang === 'es'
      ? '¡Hola! Soy Marina, la IA de MarAzul. ¿En qué puedo ayudarte?'
      : "Hi! I'm Marina, MarAzul's AI companion. What can I help you with?",
    suggestionChips: [
      t.demo.suggestionChips[0],
      t.demo.suggestionChips[1],
      t.demo.suggestionChips[4],
    ],
  }

  return (
    <>
      {/* ── MOBILE: fixed full-screen layout ─────────────── */}
      <div className="md:hidden fixed inset-0 flex flex-col bg-[#0F0D0B] px-4 max-w-full overflow-hidden">

        {/* Nav */}
        <div
          className="flex-shrink-0 w-full px-4 py-4 flex justify-between items-center relative"
          style={{ borderBottom: "1px solid rgba(250,249,245,0.06)" }}
        >
          <Link href="/" className="font-serif text-xl text-[#FAF9F5]">
            Place Companion
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center w-9 h-9"
            aria-label="Menu"
            style={{ color: '#E8E3DC' }}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>

          {/* Mobile dropdown */}
          {menuOpen && (
            <div
              className="absolute top-full left-0 right-0 z-50 flex flex-col"
              style={{ background: '#141210', borderBottom: '1px solid rgba(232,227,220,0.08)' }}
            >
              <Link href="/features" onClick={() => setMenuOpen(false)} className="font-sans px-4 py-3 text-sm" style={{ color: '#A8A099', borderBottom: '1px solid rgba(232,227,220,0.06)' }}>
                Features
              </Link>
              <Link href="/#pricing" onClick={() => setMenuOpen(false)} className="font-sans px-4 py-3 text-sm" style={{ color: '#A8A099', borderBottom: '1px solid rgba(232,227,220,0.06)' }}>
                Pricing
              </Link>
              <Link href="/onboarding" onClick={() => setMenuOpen(false)} className="font-sans px-4 py-3 text-sm font-medium" style={{ color: '#C96A3A', borderBottom: '1px solid rgba(232,227,220,0.06)' }}>
                Create Your Hotel Assistant
              </Link>
              <Link href="/auth/login" onClick={() => setMenuOpen(false)} className="font-sans px-4 py-3 text-sm" style={{ color: '#A8A099' }}>
                Sign In
              </Link>
            </div>
          )}
        </div>

        {/* Chat — fills remaining space between nav and CTA */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Chat header */}
          <div
            className="flex-shrink-0 px-4 py-3"
            style={{ borderBottom: '1px solid rgba(250,249,245,0.08)', background: '#141210' }}
          >
            <div className="flex justify-between items-center">
              <span className="font-sans text-[16px] font-semibold text-[#FAF9F5]">
                MarAzul Riviera Maya
              </span>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#FAF9F5' }} />
            </div>
            <p className="font-sans text-[12px] text-[#9C9A93] mt-0.5">
              {t.demo.collectionLabel}
            </p>
          </div>
          <ChatInterface config={demoChatConfig} />
        </div>

        {/* CTA below chat */}
        <Link
          href="/onboarding"
          className="flex-shrink-0 flex items-center justify-center w-full h-14 font-sans font-medium text-[#FAF9F5]"
          style={{ background: '#C96A3A' }}
        >
          {lang === 'es' ? 'Crea tu Asistente' : 'Create Your Hotel Assistant'}
        </Link>
      </div>

      {/* ── DESKTOP: scrollable two-column layout ────────── */}
      <div className="hidden md:flex flex-col min-h-screen bg-[#0F0D0B] items-center px-4 pt-4 pb-0">

        {/* Nav */}
        <div
          className="w-full px-4 md:px-8 py-3 flex justify-between items-center"
          style={{ borderBottom: "1px solid rgba(250,249,245,0.06)" }}
        >
          <Link href="/" className="font-serif text-xl text-[#FAF9F5]">
            Place Companion
          </Link>
          <Link
            href="/onboarding"
            className="inline-flex items-center font-sans text-[13px] font-medium h-9 px-4 rounded-md transition-colors"
            style={{ background: 'transparent', border: '1px solid rgba(232,227,220,0.25)', color: '#E8E3DC' }}
          >
            {t.demo.createCta}
          </Link>
        </div>

        {/* Two-column layout */}
        <div className="w-full max-w-7xl px-4 md:px-8 py-8 md:py-10 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-6 items-center">

            {/* Left */}
            <div className="pb-4">
              <p className="font-sans uppercase tracking-widest text-[#9C9A93] mb-3" style={{ fontSize: "11px" }}>
                {t.demo.label}
              </p>
              <h1 className="font-serif font-normal text-[#FAF9F5]" style={{ fontSize: "44px", lineHeight: 1.05 }}>
                {t.demo.headline}
              </h1>
              <p className="font-sans font-light text-[#9C9A93] mt-3" style={{ fontSize: "16px", lineHeight: 1.65 }}>
                {t.demo.description}
              </p>
            </div>

            {/* Frame wrapper — cross-browser border technique */}
            <div
              className="w-full max-w-[480px] mx-auto"
              style={{
                position: 'relative',
                borderRadius: '20px',
                padding: '1.5px',
                background: 'linear-gradient(135deg, rgba(232,227,220,0.30) 0%, rgba(232,227,220,0.06) 50%, rgba(232,227,220,0.25) 100%)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
                transform: 'translateZ(0)',
                WebkitTransform: 'translateZ(0)',
                isolation: 'isolate',
              }}
            >
              {/* Inner content */}
              <div
                className="flex flex-col"
                style={{
                  borderRadius: '18.5px',
                  overflow: 'hidden',
                  background: '#0F0D0B',
                  transform: 'translateZ(0)',
                  WebkitTransform: 'translateZ(0)',
                  minHeight: "420px",
                  height: "calc(100vh - 280px)",
                  maxHeight: "560px",
                }}
              >
              <div
                className="flex-shrink-0 px-6 py-5"
                style={{ borderBottom: "1px solid rgba(250,249,245,0.08)" }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-sans text-[20px] font-semibold text-[#FAF9F5]">
                    MarAzul Riviera Maya
                  </span>
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#FAF9F5" }} />
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

            {/* CTA below chat */}
            <div className="lg:col-span-2 flex flex-col items-center pt-6">
              <Link
                href="/onboarding"
                className="font-sans text-[14px] font-medium text-[#FAF9F5] bg-[#C96A3A] hover:bg-[#D4784A] h-11 px-8 rounded-md transition-colors inline-flex items-center"
              >
                {t.demo.createCta}
              </Link>
              <p className="font-sans mt-3" style={{ fontSize: "14px", color: "#A8A099" }}>
                {t.demo.trialNote}
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
