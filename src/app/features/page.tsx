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
      <section className="py-32 md:py-40 text-center px-4 md:px-8" style={{ background: "#141413" }}>
        <h1 className="heading-hero font-serif font-normal text-[#FAF9F5] max-w-5xl mx-auto">
          Everything your guests will ever ask.
        </h1>
        <p className="font-sans text-[#9C9A93] mt-6 max-w-2xl mx-auto" style={{ fontSize: "20px", lineHeight: 1.75 }}>
          Place Companion knows your hotel and your destination — completely.
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
            Your guests don&apos;t just ask about your services. They ask about beach conditions, where to eat after midnight, which pharmacy is open Sunday.
          </p>

          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-0 max-w-3xl mx-auto mt-12 md:mt-16 text-left">
            <div>
              <p className="font-sans uppercase tracking-widest mb-5" style={{ fontSize: "11px", color: "#9C9A93" }}>
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
              <p className="font-sans uppercase tracking-widest mb-5" style={{ fontSize: "11px", color: "#9C9A93" }}>
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
              With your guests from arrival to review.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
            {[
              { stage: "PRE-ARRIVAL", title: "Before they arrive", desc: "The assistant link arrives in their booking confirmation. Guests explore the property, plan meals, book treatments — before they pack their bags." },
              { stage: "DURING STAY", title: "While they're there", desc: "QR codes in rooms, lobby, pool, spa, restaurant. Every question answered instantly, in any language, at any hour." },
              { stage: "AFTER STAY", title: "After they leave", desc: "A warm follow-up with a direct link to leave a review. Happy guests become public advocates." },
            ].map((s) => (
              <div key={s.stage}>
                <p className="font-sans uppercase tracking-widest text-[#9C9A93]" style={{ fontSize: "11px" }}>{s.stage}</p>
                <p className="font-sans font-normal text-[#FAF9F5] mt-3" style={{ fontSize: "20px" }}>{s.title}</p>
                <p className="font-sans font-light text-[#9C9A93] mt-2" style={{ fontSize: "16px", lineHeight: 1.75 }}>{s.desc}</p>
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
            Three ways guests reach your assistant.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto mt-12 md:mt-16 text-left">
            {[
              { title: "QR Codes", desc: "Print and place anywhere — rooms, lobby, pool deck, restaurant menus, key card sleeves. Guests scan and the assistant opens instantly." },
              { title: "Hotel Website", desc: "Embed the assistant widget on your site. Guests get answers before they've even booked." },
              { title: "Shareable Link", desc: "Send a link in booking confirmations, pre-arrival emails, or WhatsApp. One tap and the conversation begins." },
            ].map((item) => (
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
            It works alongside everything you already have.
          </h2>

          <p className="font-serif italic text-[#FAF9F5] max-w-2xl mx-auto mt-10" style={{ fontSize: "clamp(1.1rem, 3vw, 1.75rem)", lineHeight: 1.4 }}>
            &ldquo;Your PMS manages your operations. Place Companion talks to your guests. Two different jobs. Zero conflict. Nothing to integrate.&rdquo;
          </p>

          <div className="space-y-4 mt-10">
            {[
              "Not a PMS — doesn't touch reservations or payments.",
              "Not a chatbot — understands context, not just keywords.",
              "Not an app — guests scan a QR, no download required.",
              "Not an integration — connect nothing, configure nothing.",
            ].map((s) => (
              <p key={s} className="font-sans text-[#9C9A93] text-center" style={{ fontSize: "17px" }}>{s}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section className="py-20 md:py-32 text-center" style={{ background: "#141413" }}>
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
