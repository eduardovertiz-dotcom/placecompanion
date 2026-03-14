'use client'

import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { useLang } from "@/lib/i18n/LanguageContext";

export default function FeaturesPage() {
  const { t } = useLang();

  return (
    <div style={{ background: "#141413" }}>
      <SiteNav />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-center justify-center pt-24 md:pt-32 pb-24 md:pb-32 text-center px-4 md:px-8" style={{ background: "#141413" }}>
        <h1 className="heading-hero font-serif font-normal text-[#FAF9F5] max-w-5xl mx-auto">
          {t.features.heroHeadline}
        </h1>
        <p className="font-sans text-[#9C9A93] mt-6 max-w-2xl mx-auto" style={{ fontSize: "20px", lineHeight: 1.75 }}>
          {t.features.heroSubhead}
        </p>
      </section>

      {/* ── INTELLIGENCE ─────────────────────────────────── */}
      <section className="py-20 md:py-32 text-center px-4 md:px-8" style={{ background: "#141413" }}>
        <div className="max-w-7xl mx-auto">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mx-auto mb-6">
            <rect x="10" y="20" width="36" height="28" rx="1" stroke="#FAF9F5" strokeWidth="1.5" />
            <path d="M18 20V15a10 10 0 0120 0v5" stroke="#FAF9F5" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="23" y="28" width="10" height="8" rx="1" stroke="#FAF9F5" strokeWidth="1.5" />
          </svg>

          <h2 className="heading-section font-serif font-normal text-[#FAF9F5]">
            {t.intelligence.headline}
          </h2>
          <p className="font-sans text-[#9C9A93] max-w-2xl mx-auto mt-6" style={{ fontSize: "18px", lineHeight: 1.75 }}>
            {t.features.intelligenceDesc}
          </p>

          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-0 max-w-3xl mx-auto mt-12 md:mt-16 text-left">
            <div>
              <p className="font-sans uppercase tracking-widest mb-5" style={{ fontSize: "11px", color: "#FAF9F5" }}>
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
              <p className="font-sans uppercase tracking-widest mb-5" style={{ fontSize: "11px", color: "#FAF9F5" }}>
                {t.intelligence.destinationLabel}
              </p>
              <div className="space-y-3">
                {t.intelligence.destinationItems.map((item) => (
                  <p key={item} className="font-sans font-light text-[#9C9A93]" style={{ fontSize: "16px" }}>{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GUEST JOURNEY ────────────────────────────────── */}
      <section className="py-20 md:py-32" style={{ background: "#0F0E0D" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mx-auto mb-6">
              <path d="M10 13h36a2 2 0 012 2v22a2 2 0 01-2 2H18l-10 8V15a2 2 0 012-2z" stroke="#FAF9F5" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            <h2 className="heading-section font-serif font-normal text-[#FAF9F5]">
              {t.features.guestJourneyHeadline}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
            {t.features.guestJourney.map((s) => (
              <div key={s.stage}>
                <p className="font-sans uppercase tracking-widest text-[#9C9A93]" style={{ fontSize: "11px" }}>{s.stage}</p>
                <p className="font-sans font-normal text-[#FAF9F5] mt-3" style={{ fontSize: "20px" }}>{s.title}</p>
                <p className="font-sans font-light text-[#9C9A93] mt-2" style={{ fontSize: "16px", lineHeight: 1.75 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERSONALITY ──────────────────────────────────── */}
      <section className="py-20 md:py-32 text-center px-4 md:px-8" style={{ background: "#141413" }}>
        <div className="max-w-7xl mx-auto">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className="mx-auto mb-6">
            <path d="M6 8h32a2 2 0 012 2v18a2 2 0 01-2 2H14l-8 6V10a2 2 0 012-2z" stroke="#E8E3DC" strokeWidth="1.25" strokeLinejoin="round" />
            <path d="M22 18l1.5 3h3l-2.5 2 1 3-3-2-3 2 1-3-2.5-2h3z" stroke="#E8E3DC" strokeWidth="1.25" strokeLinejoin="round" />
          </svg>

          <p className="font-sans uppercase tracking-widest" style={{ fontSize: "11px", color: "#6B6560" }}>
            {t.features.personality.label}
          </p>
          <h2 className="heading-section font-serif font-normal text-[#E8E3DC] mt-4">
            {t.features.personality.headline}
          </h2>
          <p className="font-sans font-light text-[#A8A099] max-w-2xl mx-auto mt-4" style={{ fontSize: "18px", lineHeight: 1.75 }}>
            {t.features.personality.body}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto mt-12">
            {t.features.personality.styles.map((style, i) => {
              const icons = [
                <svg key="warm" width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="12" cy="16" r="7" stroke="#E8E3DC" strokeWidth="1.25"/><circle cx="20" cy="16" r="7" stroke="#E8E3DC" strokeWidth="1.25"/></svg>,
                <svg key="refined" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 6 C10 6 8 11 8 16 H24 C24 11 22 6 16 6Z" stroke="#E8E3DC" strokeWidth="1.25"/><line x1="12" y1="24" x2="20" y2="24" stroke="#E8E3DC" strokeWidth="1.25"/><line x1="8" y1="20" x2="24" y2="20" stroke="#E8E3DC" strokeWidth="1.25"/></svg>,
                <svg key="barefoot" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M4 16 C7 12 10 20 13 16 C16 12 19 20 22 16 C25 12 28 20 28 16" stroke="#E8E3DC" strokeWidth="1.25" strokeLinecap="round"/></svg>,
                <svg key="playful" width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="10" stroke="#E8E3DC" strokeWidth="1.25"/><polygon points="16,8 19,16 16,14 13,16" stroke="#E8E3DC" strokeWidth="1.25"/><polygon points="16,24 13,16 16,18 19,16" stroke="#E8E3DC" strokeWidth="1.25"/></svg>,
                <svg key="zen" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M8 20 C8 12 24 12 24 20" stroke="#E8E3DC" strokeWidth="1.25" strokeLinecap="round"/><circle cx="16" cy="22" r="1.5" stroke="#E8E3DC" strokeWidth="1.25"/></svg>,
              ]
              return (
                <div
                  key={style.name}
                  className={`flex flex-col items-center rounded-xl p-6 text-center${i === 4 ? ' col-span-2 md:col-span-1' : ''}`}
                  style={{ background: "#2A2725", border: "1px solid rgba(232,227,220,0.06)" }}
                >
                  {icons[i]}
                  <p className="font-sans text-[#E8E3DC] mt-3" style={{ fontSize: "16px", fontWeight: 500 }}>{style.name}</p>
                  <p className="font-sans font-light text-[#6B6560] mt-1" style={{ fontSize: "14px", lineHeight: 1.5 }}>{style.tagline}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── ALWAYS ON DUTY ───────────────────────────────── */}
      <section className="py-20 md:py-32 text-center px-4 md:px-8" style={{ background: "#0F0E0D" }}>
        <div className="max-w-7xl mx-auto">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className="mx-auto mb-6">
            <rect x="6" y="10" width="32" height="24" rx="2" stroke="#E8E3DC" strokeWidth="1.25" />
            <path d="M6 15l16 11 16-11" stroke="#E8E3DC" strokeWidth="1.25" strokeLinejoin="round" />
            <path d="M30 28l4-4" stroke="#C96A3A" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="34" cy="24" r="3" stroke="#C96A3A" strokeWidth="1.25" />
          </svg>

          <p className="font-sans uppercase tracking-widest" style={{ fontSize: "11px", color: "#6B6560" }}>
            {t.features.alwaysOn.label}
          </p>
          <h2 className="heading-section font-serif font-normal text-[#E8E3DC] mt-4">
            {t.features.alwaysOn.headline}
          </h2>
          <p className="font-sans font-light text-[#A8A099] max-w-2xl mx-auto mt-4" style={{ fontSize: "18px", lineHeight: 1.75 }}>
            {t.features.alwaysOn.body}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-12 text-left">
            {t.features.alwaysOn.items.map((item) => (
              <div key={item.title} className="flex gap-4 items-start rounded-xl p-6" style={{ background: "#2A2725", border: "1px solid rgba(232,227,220,0.06)" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-0.5">
                  <circle cx="10" cy="10" r="9" stroke="#C96A3A" strokeWidth="1.25" />
                  <path d="M6 10l3 3 5-5" stroke="#C96A3A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="font-sans text-[#E8E3DC]" style={{ fontSize: "17px", fontWeight: 500 }}>{item.title}</p>
                  <p className="font-sans font-light text-[#6B6560] mt-1" style={{ fontSize: "15px", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEPLOYMENT ───────────────────────────────────── */}
      <section className="py-20 md:py-32 text-center" style={{ background: "#141413" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mx-auto mb-6">
            <circle cx="28" cy="12" r="5" stroke="#FAF9F5" strokeWidth="1.5" />
            <circle cx="12" cy="44" r="5" stroke="#FAF9F5" strokeWidth="1.5" />
            <circle cx="44" cy="44" r="5" stroke="#FAF9F5" strokeWidth="1.5" />
            <line x1="24" y1="16" x2="16" y2="40" stroke="#FAF9F5" strokeWidth="1.5" />
            <line x1="32" y1="16" x2="40" y2="40" stroke="#FAF9F5" strokeWidth="1.5" />
            <line x1="17" y1="44" x2="39" y2="44" stroke="#FAF9F5" strokeWidth="1.5" />
          </svg>

          <h2 className="heading-section font-serif font-normal text-[#FAF9F5]">
            {t.features.deploymentHeadline}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto mt-12 md:mt-16 text-left">
            {t.features.deployment.map((item) => (
              <div key={item.title}>
                <p className="font-sans font-normal text-[#FAF9F5]" style={{ fontSize: "18px" }}>{item.title}</p>
                <p className="font-sans font-light text-[#9C9A93] mt-2" style={{ fontSize: "16px", lineHeight: 1.75 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHERE IT FITS ────────────────────────────────── */}
      <section className="py-20 md:py-32 text-center px-4 md:px-8" style={{ background: "#0F0E0D" }}>
        <div className="max-w-7xl mx-auto">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mx-auto mb-6">
            <circle cx="28" cy="28" r="20" stroke="#FAF9F5" strokeWidth="1.5" />
            <circle cx="28" cy="28" r="5" stroke="#FAF9F5" strokeWidth="1.5" />
            <line x1="28" y1="8" x2="28" y2="18" stroke="#FAF9F5" strokeWidth="1.5" />
            <line x1="28" y1="38" x2="28" y2="48" stroke="#FAF9F5" strokeWidth="1.5" />
            <line x1="8" y1="28" x2="18" y2="28" stroke="#FAF9F5" strokeWidth="1.5" />
            <line x1="38" y1="28" x2="48" y2="28" stroke="#FAF9F5" strokeWidth="1.5" />
          </svg>

          <h2 className="heading-section font-serif font-normal text-[#FAF9F5] max-w-3xl mx-auto">
            {t.features.whereFitsHeadline}
          </h2>

          <p className="font-serif italic text-[#FAF9F5] max-w-2xl mx-auto mt-10" style={{ fontSize: "clamp(1.1rem, 3vw, 1.75rem)", lineHeight: 1.4 }}>
            &ldquo;{t.features.whereFitsQuote}&rdquo;
          </p>

          <div className="space-y-4 mt-10">
            {t.features.whereFitsItems.map((s) => (
              <p key={s} className="font-sans text-[#9C9A93] text-center" style={{ fontSize: "17px" }}>{s}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section className="py-20 md:py-32 text-center" style={{ background: "#2A2725" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mx-auto mb-6">
            <path d="M10 28a18 18 0 0136 0" stroke="#FAF9F5" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="28" cy="28" r="6" stroke="#FAF9F5" strokeWidth="1.5" />
            <path d="M28 34v10M24 40l4 4 4-4" stroke="#FAF9F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h2 className="heading-section font-serif font-normal text-[#FAF9F5]">
            {t.finalCta.headline}
          </h2>
          <p className="font-sans text-[#9C9A93] max-w-xl mx-auto mt-5" style={{ fontSize: "18px", lineHeight: 1.75 }}>
            {t.finalCta.body}
          </p>
          <Link
            href="/onboarding"
            className="font-sans font-medium text-[#141413] bg-[#FAF9F5] hover:bg-white/90 h-12 px-8 rounded-md inline-flex items-center transition-colors duration-200 mt-10"
            style={{ fontSize: "15px" }}
          >
            {t.finalCta.button}
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
