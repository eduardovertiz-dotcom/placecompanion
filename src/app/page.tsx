'use client'

import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ChatInterface } from "@/components/chat-interface";
import { FaqSection } from "@/components/faq-section";
import { marazulChatConfig } from "@/lib/marazul-config";
import { useLang } from "@/lib/i18n/LanguageContext";

export default function HomePage() {
  const { t, lang } = useLang();

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
    <div className="min-h-screen overflow-x-hidden" style={{ background: "#080706" }}>
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
              </div>
            </div>

            {/* Right — demo window */}
            <div style={{ background: '#3A3835', borderRadius: '17px', padding: '1px' }}>
              <div
                className="flex flex-col h-[420px] md:h-[580px]"
                style={{ borderRadius: '16px', overflow: 'hidden', background: '#0F0D0B' }}
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

      {/* ── PAIN PILLS ───────────────────────────────────── */}
      <section className="py-20 md:py-32" style={{ background: "#0F0D0B" }}>
        <div className="flex justify-center gap-3 flex-wrap px-4 md:px-8">
          {[t.pain.pill1, t.pain.pill2, t.pain.pill3].map((q) => (
            <span
              key={q}
              className="font-sans font-light text-[#9C9A93] hover:text-[#FAF9F5] hover:border-white/35 transition-all cursor-default rounded-full border border-white/[0.18]"
              style={{ padding: "12px 24px", fontSize: "clamp(14px, 2.5vw, 18px)" }}
            >
              {q}
            </span>
          ))}
        </div>
      </section>

      {/* ── REAL QUESTIONS STRIP ─────────────────────────── */}
      <section className="py-12 overflow-hidden" style={{ background: '#111009' }}>
        <p className="font-sans uppercase tracking-widest text-center mb-8" style={{ fontSize: '16px', color: '#6B6560' }}>
          {lang === 'es'
            ? <>Los huéspedes preguntan. <span style={{ color: '#C96A3A' }}>Ahora mismo.</span></>
            : <>Guests are asking. <span style={{ color: '#C96A3A' }}>Right now.</span></>
          }
        </p>

        {/* Row 1 — scrolls left */}
        <div
          className="overflow-hidden mb-3"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
        >
          <div className="flex gap-3 animate-scroll-left" style={{ width: 'max-content' }}>
            {[...t.realQuestions.row1, ...t.realQuestions.row1].map((q, i) => (
              <span
                key={i}
                className="font-sans flex-shrink-0 rounded-full"
                style={{
                  background: '#1A1715',
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
          className="overflow-hidden"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
        >
          <div className="flex gap-3 animate-scroll-right" style={{ width: 'max-content' }}>
            {[...t.realQuestions.row2, ...t.realQuestions.row2].map((q, i) => (
              <span
                key={i}
                className="font-sans flex-shrink-0 rounded-full"
                style={{
                  background: '#1A1715',
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
              <p className="font-sans text-center mt-6" style={{ fontSize: '18px', color: '#A8A099' }}>
                {lang === 'es'
                  ? <>Un upgrade.<br />Inversión = <span style={{ color: '#C96A3A', fontWeight: 600 }}>cubierta.</span></>
                  : <>One upgrade.<br />Investment = <span style={{ color: '#C96A3A', fontWeight: 600 }}>covered.</span></>
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

          <a
            href="mailto:hola@placecompanion.com?subject=Founding Partner Application"
            className="font-sans text-[14px] font-medium text-[#141413] bg-[#FAF9F5] hover:bg-white h-11 px-8 rounded-md transition-colors mt-8 inline-flex items-center"
          >
            {t.founding.cta}
          </a>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 max-w-3xl mx-auto mt-12">

            {/* Card 1 — Single Property */}
            <div className="rounded-2xl p-8 md:p-10 flex flex-col text-left" style={{ background: "#080706", border: "1px solid rgba(250,249,245,0.08)" }}>
              <p className="font-sans text-[13px] font-medium tracking-widest text-[#FAF9F5]/70 uppercase">{t.pricing.single}</p>
              <div className="flex items-baseline gap-1 mt-4">
                <span className="font-serif font-light text-[#FAF9F5]" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1 }}>$249</span>
                <span className="font-sans text-[#9C9A93]" style={{ fontSize: "24px" }}>{t.pricing.perMonth}</span>
              </div>
              <div className="my-6" style={{ borderTop: "1px solid rgba(250,249,245,0.08)" }} />
              <ul className="flex-1 space-y-3">
                {t.pricing.features.single.map((f) => (
                  <li key={f} className="flex items-center gap-3 font-sans text-[#FAF9F5]" style={{ fontSize: "15px" }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-white/40" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/onboarding" className="font-sans text-[15px] font-semibold h-11 rounded-lg w-full transition-colors mt-6 flex items-center justify-center" style={{ backgroundColor: '#FAF9F5', color: '#141413' }}>
                {t.pricing.startTrial}
              </Link>
              <p className="font-sans text-[#53525D] text-center mt-3" style={{ fontSize: "12px" }}>{t.pricing.trial}</p>
            </div>

            {/* Card 2 — Small Group */}
            <div className="rounded-2xl p-8 md:p-10 flex flex-col text-left" style={{ background: "#080706", border: "1px solid rgba(250,249,245,0.08)" }}>
              <p className="font-sans text-[13px] font-medium tracking-widest text-[#FAF9F5]/70 uppercase">{t.pricing.group}</p>
              <div className="flex items-baseline gap-1 mt-4">
                <span className="font-serif font-light text-[#FAF9F5]" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1 }}>$449</span>
                <span className="font-sans text-[#9C9A93]" style={{ fontSize: "24px" }}>{t.pricing.perMonth}</span>
              </div>
              <div className="my-6" style={{ borderTop: "1px solid rgba(250,249,245,0.08)" }} />
              <ul className="flex-1 space-y-3">
                {t.pricing.features.group.map((f) => (
                  <li key={f} className="flex items-center gap-3 font-sans text-[#FAF9F5]" style={{ fontSize: "15px" }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-white/40" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/onboarding" className="font-sans text-[15px] font-semibold h-11 rounded-lg w-full transition-colors mt-6 flex items-center justify-center" style={{ backgroundColor: '#FAF9F5', color: '#141413' }}>
                {t.pricing.startTrial}
              </Link>
              <p className="font-sans text-[#53525D] text-center mt-3" style={{ fontSize: "12px" }}>{t.pricing.trial}</p>
            </div>

          </div>

          <p className="font-sans text-[15px] mt-10">
            <span className="text-[#53525D]">{t.pricing.foundingNote} </span>
            <a href="mailto:hola@placecompanion.com?subject=Founding Partner Application" className="text-[#FAF9F5] hover:text-white transition-colors duration-200">
              {t.pricing.foundingApply}
            </a>
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
    </div>
  );
}
