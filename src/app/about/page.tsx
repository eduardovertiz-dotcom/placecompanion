'use client'

import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { useLang } from "@/lib/i18n/LanguageContext";

export default function AboutPage() {
  const { t } = useLang();

  return (
    <div style={{ background: "#0F0D0B" }}>
      <SiteNav />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="flex items-center justify-center text-center px-4 md:px-8"
        style={{ background: "#0F0D0B", paddingTop: "clamp(120px, 18vw, 200px)", paddingBottom: "clamp(80px, 12vw, 140px)" }}
      >
        <div className="max-w-3xl">
          <h1 className="font-serif font-light text-[#FAF9F5]" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1.05 }}>
            {t.about.heroHeadline}
          </h1>
          <p className="font-sans text-[#9C9A93] mt-8" style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)", lineHeight: 1.75 }}>
            {t.about.heroSubhead}
          </p>
        </div>
      </section>

      {/* ── WHY HOTELS ───────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: "#141210" }}>
        <div className="max-w-2xl mx-auto px-4 md:px-8">
          <p className="font-sans uppercase tracking-widest mb-4" style={{ fontSize: "11px", color: "#2D9E6B" }}>
            THE PROBLEM
          </p>
          <h2 className="font-serif font-normal text-[#FAF9F5]" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.1 }}>
            {t.about.whyHeadline}
          </h2>
          <div className="space-y-6 mt-8">
            <p className="font-sans text-[#9C9A93]" style={{ fontSize: "18px", lineHeight: 1.8 }}>
              {t.about.whyP1}
            </p>
            <p className="font-sans text-[#9C9A93]" style={{ fontSize: "18px", lineHeight: 1.8 }}>
              {t.about.whyP2}
            </p>
          </div>
        </div>
      </section>

      {/* ── GENERIC AI ───────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 md:px-8" style={{ background: "#0F0D0B" }}>
        <div className="max-w-2xl mx-auto">
          <p className="font-sans uppercase tracking-widest mb-4" style={{ fontSize: "11px", color: "#C96A3A" }}>
            THE DIFFERENCE
          </p>
          <h2 className="font-serif font-normal text-[#FAF9F5]" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.1 }}>
            {t.about.genericHeadline}
          </h2>
          <p className="font-sans text-[#9C9A93] mt-8" style={{ fontSize: "18px", lineHeight: 1.75 }}>
            {t.about.genericBody}
          </p>
        </div>
      </section>

      {/* ── DESTINATION ANGLE ────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: "#141210" }}>
        <div className="max-w-2xl mx-auto px-4 md:px-8">
          <p className="font-sans uppercase tracking-widest mb-4" style={{ fontSize: "11px", color: "#A8A099" }}>
            BEYOND THE HOTEL
          </p>
          <h2 className="font-serif font-normal text-[#FAF9F5]" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.1 }}>
            {t.about.destinationHeadline}
          </h2>
          <p className="font-sans text-[#9C9A93] mt-8" style={{ fontSize: "18px", lineHeight: 1.75 }}>
            {t.about.destinationBody}
          </p>
        </div>
      </section>

      {/* ── WHAT WE ARE NOT ──────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 md:px-8" style={{ background: "#0F0D0B" }}>
        <div className="max-w-2xl mx-auto">
          <p className="font-sans uppercase tracking-widest mb-4" style={{ fontSize: "11px", color: "#A8A099" }}>
            WHAT WE ARE NOT
          </p>
          <h2 className="font-serif font-normal text-[#FAF9F5] mb-12" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.1 }}>
            {t.about.notHeadline}
          </h2>
          <div className="space-y-6">
            {t.about.notItems.map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div
                  className="flex-shrink-0 mt-1"
                  style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#C96A3A", marginTop: "10px" }}
                />
                <p className="font-serif font-light text-[#FAF9F5]" style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", lineHeight: 1.4 }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE VISION ───────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: "#141210" }}>
        <div className="max-w-2xl mx-auto px-4 md:px-8">
          <p className="font-sans uppercase tracking-widest mb-4" style={{ fontSize: "11px", color: "#2D9E6B" }}>
            THE VISION
          </p>
          <h2 className="font-serif font-normal text-[#FAF9F5]" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.1 }}>
            {t.about.visionHeadline}
          </h2>
          <p className="font-sans text-[#9C9A93] mt-8" style={{ fontSize: "18px", lineHeight: 1.8 }}>
            {t.about.visionBody}
          </p>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section className="py-20 md:py-28 text-center" style={{ background: "#1A1715" }}>
        <div className="max-w-xl mx-auto px-4 md:px-8">
          <h2 className="font-serif font-normal text-[#FAF9F5]" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.1 }}>
            {t.finalCta.headline}
          </h2>
          <p className="font-sans text-[#9C9A93] mt-5" style={{ fontSize: "18px", lineHeight: 1.75 }}>
            {t.finalCta.body}
          </p>
          <Link
            href="/onboarding"
            className="font-sans font-medium text-[#FAF9F5] bg-[#C96A3A] hover:bg-[#D4784A] h-12 px-8 rounded-md inline-flex items-center transition-colors duration-200 mt-10"
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
