'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ChatInterface } from "@/components/chat-interface";
import { FaqSection } from "@/components/faq-section";
import { marazulChatConfig } from "@/lib/marazul-config";
import { useLang } from "@/lib/i18n/LanguageContext";
import CalendlyModal from "@/components/CalendlyModal";

export default function HomePage() {
  const { t, lang } = useLang();
  const [showBar, setShowBar] = useState(false)
  const [showCalendly, setShowCalendly] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowBar(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const heroChatConfig = {
    ...marazulChatConfig,
    suggestionChips: [
      marazulChatConfig.suggestionChips![0],
      marazulChatConfig.suggestionChips![1],
      marazulChatConfig.suggestionChips![4],
    ],
  };

  const howItWorksSteps = [
    { num: "01", title: t.howItWorks.step1Title, desc: t.howItWorks.step1Desc },
    { num: "02", title: t.howItWorks.step2Title, desc: t.howItWorks.step2Desc },
    { num: "03", title: t.howItWorks.step3Title, desc: t.howItWorks.step3Desc },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden pb-20 md:pb-0" style={{ background: "#080706" }}>
      <SiteNav />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="py-12 md:py-20 flex items-center" style={{ background: "#080706" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left */}
            <div>
              <h1 className="heading-hero font-serif font-normal text-[#FFFFFF] text-balance">
                {t.hero.headline}
              </h1>
              <p className="font-sans font-light mt-6 md:mt-8" style={{ fontSize: "18px", lineHeight: 1.7, color: "#9C9A93" }}>
                {t.hero.subhead}
              </p>
              <div className="mt-8 md:mt-12">
                <Link
                  href="/onboarding"
                  className="font-sans text-[14px] font-medium text-[#FAF9F5] bg-[#C96A3A] hover:bg-[#D4784A] h-11 px-6 rounded-md transition-colors inline-flex items-center"
                >
                  {t.hero.primaryCta}
                </Link>
                <p className="font-sans mt-3" style={{ fontSize: '14px', color: '#A8A099' }}>
                  {t.hero.trust}
                </p>
                <p className="font-sans mt-1" style={{ fontSize: '14px', color: '#A8A099' }}>
                  {t.hero.socialProof}
                </p>
              </div>
            </div>

            {/* Right — demo window */}
            <div className="hidden md:block" style={{
              background: 'linear-gradient(135deg, rgba(232,227,220,0.25) 0%, rgba(232,227,220,0.08) 50%, rgba(232,227,220,0.20) 100%)',
              borderRadius: '20px',
              padding: '1.5px',
              boxShadow: '0 0 0 1px rgba(232,227,220,0.10), 0 24px 80px rgba(0,0,0,0.6), 0 0 60px rgba(201,106,58,0.04)',
            }}>
              <div
                className="flex flex-col h-[420px] md:h-[580px]"
                style={{ borderRadius: '18.5px', overflow: 'hidden', background: '#0F0D0B', boxShadow: 'inset 0 1px 0 rgba(232,227,220,0.08)' }}
              >
                <div className="flex-shrink-0 px-6 py-5" style={{ borderBottom: "1px solid rgba(250,249,245,0.08)" }}>
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-[18px] md:text-[20px] font-semibold text-[#FAF9F5]">
                      MarAzul Riviera Maya
                    </span>
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#FAF9F5" }} />
                  </div>
                  <p className="font-sans text-[13px] font-normal text-[#9C9A93] mt-1">Part of the MarAzul Collection</p>
                  <p className="font-sans text-[15px] font-light text-[#9C9A93] mt-1">Your 24/7 AI Guest Companion</p>
                </div>
                <ChatInterface config={heroChatConfig} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── REAL QUESTIONS STRIP ─────────────────────────── */}
      <section className="py-20 overflow-hidden" style={{ background: '#1A1715' }}>
        <div className="text-center mb-10">
          <p className="font-sans uppercase tracking-widest" style={{ fontSize: '16px', color: '#A8A099', lineHeight: 1.4 }}>
            {lang === 'es' ? 'Los huéspedes preguntan.' : 'Guests are asking.'}
          </p>
          <p className="font-sans uppercase tracking-widest" style={{ fontSize: '16px', lineHeight: 1.4 }}>
            <span style={{ color: '#C96A3A' }}>{lang === 'es' ? 'Ahora mismo.' : 'Right now.'}</span>
          </p>
        </div>

        {/* Row 1 — scrolls left */}
        <div
          className="overflow-hidden mb-4"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
        >
          <div className="flex gap-4 animate-scroll-left" style={{ width: 'max-content' }}>
            {[...t.realQuestions.row1, ...t.realQuestions.row1].map((q, i) => (
              <span
                key={i}
                className="font-sans flex-shrink-0 rounded-full"
                style={{
                  background: '#242019',
                  border: '1px solid rgba(232,227,220,0.10)',
                  padding: '12px 28px',
                  fontSize: '20px',
                  fontWeight: 400,
                  color: '#C4BDB6',
                  whiteSpace: 'nowrap',
                }}
              >
                {q}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div
          className="overflow-hidden pb-8"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
        >
          <div className="flex gap-4 animate-scroll-right" style={{ width: 'max-content' }}>
            {[...t.realQuestions.row2, ...t.realQuestions.row2].map((q, i) => (
              <span
                key={i}
                className="font-sans flex-shrink-0 rounded-full"
                style={{
                  background: '#242019',
                  border: '1px solid rgba(232,227,220,0.10)',
                  padding: '12px 28px',
                  fontSize: '20px',
                  fontWeight: 400,
                  color: '#C4BDB6',
                  whiteSpace: 'nowrap',
                }}
              >
                {q}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP 3 ────────────────────────────────── */}
      <section style={{ background: '#141210', borderTop: '1px solid rgba(232,227,220,0.04)', borderBottom: '1px solid rgba(232,227,220,0.04)' }}>
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-24 text-center">
          <p className="font-serif font-light" style={{ fontSize: 'clamp(3.5rem, 12vw, 8rem)', color: '#FFFFFF', lineHeight: 1 }}>
            $47B
          </p>
          <p className="font-sans mt-6" style={{ fontSize: '18px', color: '#A8A099', lineHeight: 1.6 }}>
            {lang === 'es'
              ? 'perdidos anualmente por hoteles en fricción evitable con huéspedes.'
              : 'lost annually by hotels to avoidable guest friction.'}
          </p>
          <p className="font-sans mt-4" style={{ fontSize: '11px', color: '#3A3530', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Medallia, 2024
          </p>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────── */}
      <section style={{ background: '#141210', borderTop: '1px solid rgba(232,227,220,0.04)', borderBottom: '1px solid rgba(232,227,220,0.04)' }}>
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            <div>
              <p className="font-serif font-light" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#FFFFFF', lineHeight: 1 }}>80%</p>
              <p className="font-sans mt-3" style={{ fontSize: '15px', color: '#A8A099', lineHeight: 1.6 }}>
                {lang === 'es' ? 'de las preguntas rutinarias de huéspedes respondidas automáticamente' : 'of routine guest inquiries answered automatically'}
              </p>
              <p className="font-sans mt-2" style={{ fontSize: '11px', color: '#4A4540', letterSpacing: '0.05em' }}>— Statista, 2024</p>
            </div>
            <div>
              <p className="font-serif font-light" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#FFFFFF', lineHeight: 1 }}>25%</p>
              <p className="font-sans mt-3" style={{ fontSize: '15px', color: '#A8A099', lineHeight: 1.6 }}>
                {lang === 'es' ? 'reducción en costos operativos de recepción con IA' : 'reduction in front-desk operational costs with AI'}
              </p>
              <p className="font-sans mt-2" style={{ fontSize: '11px', color: '#4A4540', letterSpacing: '0.05em' }}>— McKinsey & Company, 2024</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── REVENUE ──────────────────────────────────────── */}
      <section className="py-20 md:py-32" style={{ background: "#141210" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-12 lg:gap-20 items-center">

            {/* Left */}
            <div>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-8">
                <circle cx="24" cy="24" r="23" stroke="#FAF9F5" strokeWidth="1.5"/>
                <path d="M24 13v22M29 17.5C29 14.9 26.8 13.5 24 13.5s-5 1.4-5 4c0 5.5 10 4.5 10 10 0 3-2.2 5-5 5s-5-2-5-5" stroke="#FAF9F5" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <h2 className="heading-section font-serif font-normal text-[#FFFFFF]">
                {t.revenue.headline}
              </h2>
              <p className="font-sans font-light text-[#9C9A93] mt-5" style={{ fontSize: "18px", lineHeight: 1.75 }}>
                {t.revenue.body}
              </p>
            </div>

            {/* Right — conversation */}
            <div className="rounded-2xl p-6 md:p-8" style={{ background: "#1F1E1D", border: "1px solid rgba(250,249,245,0.06)" }}>
              <p className="font-sans mb-4" style={{ fontSize: "12px", color: "#8A8480" }}>{t.revenue.timestamp}</p>
              <div className="flex flex-col gap-3">
                {t.revenue.conversation.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'guest' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className="font-sans rounded-2xl"
                      style={{
                        background: msg.role === 'guest' ? "#0F0D0B" : "#3A3835",
                        color: "#E8E3DC",
                        padding: "12px 16px",
                        fontSize: "16px",
                        lineHeight: 1.6,
                        maxWidth: "80%",
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <p className="font-sans text-center" style={{ fontSize: '18px', color: '#A8A099', marginTop: '32px' }}>
                {lang === 'es'
                  ? <>Un upgrade.<br />Inversión: <span style={{ color: '#FFFFFF', fontWeight: 600 }}>cubierta.</span></>
                  : <>One upgrade.<br />Investment: <span style={{ color: '#FFFFFF', fontWeight: 600 }}>covered.</span></>
                }
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── INTELLIGENCE ─────────────────────────────────── */}
      <section className="py-20 md:py-32 text-center overflow-hidden" style={{ background: "#1A1715" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mx-auto mb-6">
            <rect x="10" y="20" width="36" height="28" rx="1" stroke="#FAF9F5" strokeWidth="1.5" />
            <path d="M18 20V15a10 10 0 0120 0v5" stroke="#FAF9F5" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="23" y="28" width="10" height="8" rx="1" stroke="#FAF9F5" strokeWidth="1.5" />
          </svg>

          <h2 className="heading-section font-serif font-normal text-[#FFFFFF]">
            {t.intelligence.headline}
          </h2>

          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-0 max-w-3xl mx-auto mt-12 md:mt-16 text-left">
            <div>
              <p className="font-sans text-[13px] font-semibold text-[#FAF9F5] tracking-[0.18em] uppercase mb-5">
                {t.intelligence.hotelLabel}
              </p>
              <div className="space-y-3">
                {t.intelligence.hotelItems.map((item) => (
                  <p key={item} className="font-sans font-light text-[#9C9A93]" style={{ fontSize: "16px" }}>{item}</p>
                ))}
              </div>
            </div>

            <div className="hidden md:block self-stretch mx-8" style={{ width: "1px", background: "rgba(250,249,245,0.08)" }} />

            <div className="mt-8 md:mt-0">
              <p className="font-sans text-[13px] font-semibold text-[#FAF9F5] tracking-[0.18em] uppercase mb-5">
                {t.intelligence.destinationLabel}
              </p>
              <div className="space-y-3">
                {t.intelligence.destinationItems.map((item) => (
                  <p key={item} className="font-sans font-light text-[#9C9A93]" style={{ fontSize: "16px" }}>{item}</p>
                ))}
              </div>
            </div>
          </div>

          <p className="font-sans text-[16px] text-[#9C9A93] mt-12 text-center">{t.intelligence.closing}</p>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section id="how-it-works" className="py-20 md:py-32 text-center overflow-hidden" style={{ background: "#1F1C19" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mx-auto mb-6">
            <circle cx="12" cy="28" r="6" stroke="#FAF9F5" strokeWidth="1.5" />
            <circle cx="44" cy="28" r="6" stroke="#FAF9F5" strokeWidth="1.5" />
            <circle cx="28" cy="28" r="6" stroke="#FAF9F5" strokeWidth="1.5" />
            <line x1="18" y1="28" x2="22" y2="28" stroke="#FAF9F5" strokeWidth="1.5" />
            <line x1="34" y1="28" x2="38" y2="28" stroke="#FAF9F5" strokeWidth="1.5" />
          </svg>

          <h2 className="heading-section font-serif font-normal text-[#FFFFFF]">
            {t.howItWorks.headline}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto mt-12 md:mt-16 text-left">
            {howItWorksSteps.map((step) => (
              <div key={step.num}>
                <p className="font-sans tracking-widest" style={{ fontSize: "11px", color: "#2D9E6B" }}>{step.num}</p>
                <p className="font-sans font-normal text-[#FAF9F5] mt-3" style={{ fontSize: "18px" }}>{step.title}</p>
                <p className="font-sans font-light text-[#9C9A93] mt-2" style={{ fontSize: "16px" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDING PARTNERS ────────────────────────────── */}
      <section id="founding-partners" className="py-20 md:py-32 text-center" style={{ background: "#16131F" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mx-auto mb-6">
            <path d="M28 6l5.5 11 12 1.75-8.75 8.5 2 12L28 34l-10.75 5.25 2-12L10.5 18.75l12-1.75L28 6z" stroke="#FAF9F5" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>

          <h2 className="heading-section font-serif font-normal text-[#FFFFFF]">
            {t.founding.headline}
          </h2>
          <p className="font-sans text-[#9C9A93] mt-5" style={{ fontSize: "18px" }}>{t.founding.body}</p>

          <button
            onClick={() => setShowCalendly(true)}
            className="font-sans text-[14px] font-medium text-[#141413] bg-[#FAF9F5] hover:bg-white h-11 px-8 rounded-md transition-colors mt-8 inline-flex items-center"
            style={{ border: 'none', cursor: 'pointer' }}
          >
            {t.founding.cta}
          </button>

          <p className="font-sans text-[14px] text-[#FAF9F5]/60 mt-4">{t.founding.spots}</p>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────── */}
      <section id="pricing" className="py-20 md:py-32 text-center" style={{ background: "#1C1917" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="font-sans uppercase tracking-widest" style={{ fontSize: "11px", color: "#9C9A93" }}>
            {t.pricing.label}
          </p>
          <h2 className="heading-section font-serif font-normal text-[#FFFFFF] max-w-2xl mx-auto mt-4">
            {t.pricing.headline}
          </h2>
          <p className="font-sans font-light text-[#9C9A93] mt-4" style={{ fontSize: "18px" }}>
            {t.pricing.subhead}
          </p>

          {/* 3-card row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">

            {/* Boutique */}
            <div className="rounded-2xl p-8 flex flex-col text-left" style={{ background: "#0F0D0B", border: "1px solid rgba(232,227,220,0.08)" }}>
              <p className="font-sans text-[11px] font-semibold tracking-widest text-[#9C9A93] uppercase">{t.pricing.boutique}</p>
              <p className="font-sans text-[#9C9A93] mt-1" style={{ fontSize: '13px' }}>
                {lang === 'es' ? 'Para hoteles independientes de hasta 40 habitaciones.' : 'For independent hotels up to 40 rooms.'}
              </p>
              <div className="flex items-baseline gap-1 mt-4">
                <span className="font-serif font-light text-[#FAF9F5]" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1 }}>$299</span>
                <span className="font-sans text-[#9C9A93]" style={{ fontSize: "20px" }}>{t.pricing.perMonth}</span>
              </div>
              <p className="font-sans text-[#6B6560] mt-1" style={{ fontSize: '12px' }}>
                {lang === 'es' ? 'o $239/mes con compromiso anual' : 'or $239/mo with annual commitment'}
              </p>
              <div className="my-5" style={{ borderTop: "1px solid rgba(250,249,245,0.08)" }} />
              <ul className="flex-1 space-y-3">
                {t.pricing.features.boutique.map((f) => (
                  <li key={f} className="flex items-start gap-3 font-sans text-[#9C9A93]" style={{ fontSize: "14px" }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 bg-white/30" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/onboarding" className="font-sans text-[14px] font-semibold h-11 rounded-lg w-full transition-colors mt-6 flex items-center justify-center" style={{ backgroundColor: '#C96A3A', color: 'white' }}>
                {t.pricing.startTrial}
              </Link>
              <p className="font-sans text-[#53525D] text-center mt-2" style={{ fontSize: "12px" }}>{t.pricing.trial}</p>
            </div>

            {/* Independent — highlighted */}
            <div className="rounded-2xl p-8 flex flex-col text-left relative" style={{ background: "#0F0D0B", border: "1px solid rgba(232,227,220,0.20)", borderTop: "2px solid rgba(232,227,220,0.35)" }}>
              <p className="font-sans text-[11px] font-semibold tracking-widest text-[#FAF9F5]/70 uppercase">{t.pricing.independent}</p>
              <p className="font-sans text-[#9C9A93] mt-1" style={{ fontSize: '13px' }}>
                {lang === 'es' ? 'Para hoteles de 41 a 200 habitaciones.' : 'For hotels from 41 to 200 rooms.'}
              </p>
              <div className="flex items-baseline gap-1 mt-4">
                <span className="font-serif font-light text-[#FAF9F5]" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1 }}>$499</span>
                <span className="font-sans text-[#9C9A93]" style={{ fontSize: "20px" }}>{t.pricing.perMonth}</span>
              </div>
              <p className="font-sans text-[#6B6560] mt-1" style={{ fontSize: '12px' }}>
                {lang === 'es' ? 'o $399/mes con compromiso anual' : 'or $399/mo with annual commitment'}
              </p>
              <div className="my-5" style={{ borderTop: "1px solid rgba(250,249,245,0.08)" }} />
              <ul className="flex-1 space-y-3">
                {t.pricing.features.independent.map((f) => (
                  <li key={f} className="flex items-start gap-3 font-sans text-[#FAF9F5]" style={{ fontSize: "14px" }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 bg-[#C96A3A]" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/onboarding" className="font-sans text-[14px] font-semibold h-11 rounded-lg w-full transition-colors mt-6 flex items-center justify-center" style={{ backgroundColor: '#C96A3A', color: 'white' }}>
                {t.pricing.startTrial}
              </Link>
              <p className="font-sans text-[#53525D] text-center mt-2" style={{ fontSize: "12px" }}>{t.pricing.trial}</p>
            </div>

            {/* Portfolio */}
            <div className="rounded-2xl p-8 flex flex-col text-left" style={{ background: "#141210", border: "1px solid rgba(232,227,220,0.12)" }}>
              <p className="font-sans text-[11px] font-semibold tracking-widest text-[#9C9A93] uppercase">{t.pricing.portfolio}</p>
              <p className="font-sans text-[#9C9A93] mt-1" style={{ fontSize: '13px' }}>
                {lang === 'es' ? 'Para grupos hoteleros.' : 'For portfolio groups.'}
              </p>
              <div className="flex items-baseline gap-1 mt-4">
                <span className="font-serif font-light text-[#FAF9F5]" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1 }}>{t.pricing.portfolioPrice}</span>
              </div>
              <p className="font-sans text-[#6B6560] mt-1" style={{ fontSize: '12px' }}>
                {lang === 'es' ? '2+ propiedades. Precio para tu grupo.' : '2+ properties. Priced for your portfolio.'}
              </p>
              <div className="my-5" style={{ borderTop: "1px solid rgba(250,249,245,0.08)" }} />
              <ul className="flex-1 space-y-3">
                {t.pricing.features.portfolio.map((f) => (
                  <li key={f} className="flex items-start gap-3 font-sans text-[#9C9A93]" style={{ fontSize: "14px" }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 bg-white/30" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowCalendly(true)}
                className="font-sans text-[14px] font-semibold h-11 rounded-lg w-full transition-colors mt-6 flex items-center justify-center"
                style={{ backgroundColor: 'transparent', color: '#FFFFFF', border: '1px solid rgba(232,227,220,0.25)', cursor: 'pointer' }}
              >
                {lang === 'es' ? 'Agenda una Llamada →' : 'Book a Call →'}
              </button>
              <p className="font-sans text-[#6B6560] text-center mt-2" style={{ fontSize: "12px" }}>
                {lang === 'es' ? 'Respuesta en menos de 24 horas.' : 'Response within 24 hours.'}
              </p>
            </div>

          </div>

          {/* Enterprise bar */}
          <div style={{
            marginTop: '32px', padding: '24px 32px',
            background: '#141210', border: '1px solid rgba(232,227,220,0.06)',
            borderRadius: '12px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px',
            maxWidth: '64rem', margin: '32px auto 0'
          }}>
            <div style={{ textAlign: 'left' }}>
              <p className="font-sans" style={{ fontSize: '15px', fontWeight: 500, color: '#FFFFFF', marginBottom: '4px' }}>
                {lang === 'es' ? 'Grupos hoteleros y grandes operadores' : 'Hotel groups and large-scale operators'}
              </p>
              <p className="font-sans" style={{ fontSize: '13px', color: '#6B6560' }}>
                {lang === 'es'
                  ? '4+ propiedades o 200+ habitaciones. Construimos alrededor de tu escala, tu estructura y tu marca.'
                  : '4+ properties or 200+ rooms. We build around your scale, your structure, and your brand.'}
              </p>
            </div>
            <button onClick={() => setShowCalendly(true)} className="font-sans text-sm"
              style={{ border: '1px solid rgba(232,227,220,0.25)', color: '#E8E3DC', padding: '10px 20px', borderRadius: '6px', background: 'transparent', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {lang === 'es' ? 'Hablemos →' : 'Talk to Eduardo →'}
            </button>
          </div>

          {/* Destination / resort communities bar */}
          <div style={{
            marginTop: '16px', padding: '24px 32px',
            background: '#0D1218', border: '1px solid rgba(232,227,220,0.10)',
            borderRadius: '12px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px',
            maxWidth: '64rem', margin: '16px auto 0'
          }}>
            <div style={{ textAlign: 'left' }}>
              <p className="font-sans" style={{ fontSize: '15px', fontWeight: 500, color: '#FFFFFF', marginBottom: '4px' }}>
                {lang === 'es' ? 'Comunidades turísticas y desarrolladores' : 'Resort communities and master developers'}
              </p>
              <p className="font-sans" style={{ fontSize: '13px', color: '#6B6560' }}>
                {lang === 'es'
                  ? 'Una inteligencia compartida del destino. Overlays por propiedad. Experiencia consistente en toda tu comunidad.'
                  : 'One shared destination brain. Individual property overlays. Consistent guest experience across your entire community.'}
              </p>
            </div>
            <button onClick={() => setShowCalendly(true)} className="font-sans text-sm"
              style={{ border: '1px solid rgba(45,158,107,0.4)', color: '#2D9E6B', padding: '10px 20px', borderRadius: '6px', background: 'transparent', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {lang === 'es' ? 'Construyamos juntos →' : "Let's build together →"}
            </button>
          </div>

          <p className="font-sans text-[15px] mt-8">
            <span className="text-[#53525D]">{t.pricing.foundingNote} </span>
            <button onClick={() => setShowCalendly(true)} className="text-[#FAF9F5] hover:text-white transition-colors duration-200" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px' }}>
              {t.pricing.foundingApply}
            </button>
          </p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section id="faq" className="py-20 md:py-32 text-center" style={{ background: "#141413" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mx-auto mb-6">
            <circle cx="28" cy="28" r="20" stroke="#FAF9F5" strokeWidth="1.5" />
            <path d="M22 22c0-3.3 2.7-6 6-6s6 2.7 6 6c0 3-2.2 5.2-5.2 6.7V30" stroke="#FAF9F5" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="28" cy="37" r="1.25" fill="#FAF9F5" />
          </svg>

          <h2 className="heading-section font-serif font-normal text-[#FFFFFF]">
            {t.faq.headline}
          </h2>

          <FaqSection />
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section className="py-20 md:py-32 text-center" style={{ background: "#2A2725" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mx-auto mb-6">
            <path d="M10 28a18 18 0 0136 0" stroke="#E8E3DC" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="28" cy="28" r="6" stroke="#E8E3DC" strokeWidth="1.5" />
            <path d="M28 34v10M24 40l4 4 4-4" stroke="#E8E3DC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <h2 className="heading-section font-serif font-normal text-[#FFFFFF]">
            {t.finalCta.headline}
          </h2>
          <p className="font-sans text-[#A8A099] max-w-xl mx-auto mt-5 break-words" style={{ fontSize: "18px", lineHeight: 1.75 }}>
            {t.finalCta.body}
          </p>
          <Link
            href="/onboarding"
            className="font-sans text-[15px] font-medium text-[#FAF9F5] bg-[#C96A3A] hover:bg-[#D4784A] h-12 px-10 rounded-md transition-colors mt-8 inline-flex items-center"
          >
            {t.finalCta.button}
          </Link>
        </div>
      </section>

      <SiteFooter />

      {showBar && (
        <div
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
          style={{
            background: '#0F0D0B',
            borderTop: '1px solid rgba(232,227,220,0.08)',
            padding: '12px 16px',
            paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
          }}
        >
          <div className="flex gap-3">
            <Link
              href="/demo"
              className="flex-1 flex items-center justify-center rounded-md h-11 font-sans text-sm"
              style={{ border: '1px solid rgba(232,227,220,0.25)', color: '#E8E3DC' }}
            >
              {lang === 'es' ? 'Ver Demo' : 'View Live Demo'}
            </Link>
            <Link
              href="/onboarding"
              className="flex-1 flex items-center justify-center rounded-md h-11 font-sans text-sm font-medium"
              style={{ background: '#C96A3A', color: '#FAF9F5' }}
            >
              {lang === 'es' ? 'Crear Asistente' : 'Create Assistant'}
            </Link>
          </div>
        </div>
      )}

      {showCalendly && <CalendlyModal onClose={() => setShowCalendly(false)} />}
    </div>
  );
}
