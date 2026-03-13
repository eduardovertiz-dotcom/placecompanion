'use client'

import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { useLang } from "@/lib/i18n/LanguageContext";

export default function AboutPage() {
  const { t } = useLang();

  return (
    <div style={{ background: "#141413" }}>
      <SiteNav />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="min-h-screen flex items-center justify-center text-center px-4 md:px-8" style={{ background: "#141413" }}>
        <div>
          <h1 className="heading-page font-serif font-light text-[#FAF9F5] max-w-4xl mx-auto">
            Hotels are the most human business in the world.
          </h1>
          <p className="font-sans text-[#9C9A93] mt-16" style={{ fontSize: "clamp(1.1rem, 3vw, 1.375rem)" }}>
            We built the most human AI for them.
          </p>
        </div>
      </section>

      {/* ── WHY HOTELS ───────────────────────────────────── */}
      <section className="py-20 md:py-32" style={{ background: "#141413" }}>
        <div className="max-w-2xl mx-auto px-4 md:px-8">
          <div className="text-center">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mx-auto mb-6">
              <rect x="10" y="20" width="36" height="28" rx="1" stroke="#FAF9F5" strokeWidth="1.5" />
              <path d="M18 20V15a10 10 0 0120 0v5" stroke="#FAF9F5" strokeWidth="1.5" strokeLinecap="round" />
              <rect x="23" y="28" width="10" height="8" rx="1" stroke="#FAF9F5" strokeWidth="1.5" />
            </svg>
            <h2 className="heading-section font-serif font-normal text-[#FAF9F5]">
              Why hotels.
            </h2>
          </div>
          <div className="space-y-6 mt-8">
            <p className="font-sans text-[#9C9A93]" style={{ fontSize: "18px", lineHeight: 1.8 }}>
              A hotel is not a product. It&apos;s a promise — that someone will be cared for, that the experience will feel seamless, that every question will have a thoughtful answer. But the tools hotels use were built for operations, not conversation. PMS systems manage rooms. Booking engines capture reservations. Nothing was ever designed to simply talk to guests.
            </p>
            <p className="font-sans text-[#9C9A93]" style={{ fontSize: "18px", lineHeight: 1.8 }}>
              That gap — between the guest&apos;s question and the answer they need — costs hotels more than they realize. In revenue missed. In trust eroded. In staff energy spent on questions that deserved a better system.
            </p>
          </div>
        </div>
      </section>

      {/* ── GENERIC AI ───────────────────────────────────── */}
      <section className="py-20 md:py-32 text-center px-4 md:px-8" style={{ background: "#0F0E0D" }}>
        <div className="max-w-7xl mx-auto">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mx-auto mb-6">
            <path d="M10 13h36a2 2 0 012 2v22a2 2 0 01-2 2H18l-10 8V15a2 2 0 012-2z" stroke="#FAF9F5" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>

          <h2 className="heading-section font-serif font-normal text-[#FAF9F5] max-w-3xl mx-auto">
            Generic AI knows everything about everywhere.
          </h2>
          <p className="font-serif italic text-[#9C9A93] mt-4" style={{ fontSize: "clamp(1.2rem, 3vw, 1.75rem)" }}>
            Which means it knows nothing about your hotel.
          </p>
          <p className="font-sans text-[#9C9A93] max-w-xl mx-auto mt-8" style={{ fontSize: "18px", lineHeight: 1.75 }}>
            Ask any general-purpose AI about your spa hours. It will guess, hallucinate, or tell the guest to check your website. The guest was already on your website. They needed a conversation, not a redirect.
          </p>
        </div>
      </section>

      {/* ── DESTINATION ANGLE ────────────────────────────── */}
      <section className="py-20 md:py-32" style={{ background: "#141413" }}>
        <div className="max-w-2xl mx-auto px-4 md:px-8 text-center">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mx-auto mb-6">
            <circle cx="28" cy="22" r="10" stroke="#FAF9F5" strokeWidth="1.5" />
            <path d="M28 32c0 0-16 12-16 20h32c0-8-16-20-16-20z" stroke="#FAF9F5" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>

          <h2 className="heading-section font-serif font-normal text-[#FAF9F5]">
            Your guests don&apos;t just ask about your hotel.
          </h2>
          <p className="font-sans text-[#9C9A93] mt-8" style={{ fontSize: "18px", lineHeight: 1.75 }}>
            They ask where to watch the sunset. Which beach has no seaweed this week. Where the locals actually eat. Whether the pharmacy is open on Sunday. These questions don&apos;t live in any PMS. They live in local knowledge — and until now, that knowledge lived only in your best staff member&apos;s head.
          </p>
        </div>
      </section>

      {/* ── WHAT WE ARE NOT ──────────────────────────────── */}
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

          <h2 className="heading-section font-serif font-normal text-[#FAF9F5]">
            What Place Companion is not.
          </h2>

          <div className="space-y-8 mt-12 max-w-2xl mx-auto text-left">
            {[
              "Not a PMS. Your PMS manages your operations.",
              "Not a chatbot. Chatbots follow scripts. We understand context.",
              "Not a WhatsApp tool. We don't push — we answer.",
              "Not an integration. There's nothing to connect.",
            ].map((s) => (
              <p key={s} className="font-serif font-light text-[#FAF9F5]" style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)", lineHeight: 1.3 }}>
                {s}
              </p>
            ))}
          </div>

          <p className="font-sans text-[#9C9A93] mt-12 text-center" style={{ fontSize: "18px" }}>
            We&apos;re the conversation layer your stack was never designed to have.
          </p>
        </div>
      </section>

      {/* ── THE VISION ───────────────────────────────────── */}
      <section className="py-20 md:py-32" style={{ background: "#141413" }}>
        <div className="max-w-2xl mx-auto px-4 md:px-8 text-center">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mx-auto mb-6">
            <path d="M28 6l5.5 11 12 1.75-8.75 8.5 2 12L28 34l-10.75 5.25 2-12L10.5 18.75l12-1.75L28 6z" stroke="#FAF9F5" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>

          <h2 className="heading-section font-serif font-normal text-[#FAF9F5]">
            The vision.
          </h2>
          <p className="font-sans text-[#9C9A93] mt-8" style={{ fontSize: "18px", lineHeight: 1.8 }}>
            Every independent hotel deserves a guest experience that feels personal and complete — not because of their budget, but because of their knowledge. Place Companion exists to give every boutique property, every family-run hotel, every carefully curated collection of rooms — the same intelligence that the largest hospitality brands in the world are only beginning to build.
          </p>
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
            className="font-sans font-medium text-[#FAF9F5] bg-[#E8823A] hover:bg-[#D4733A] h-12 px-8 rounded-md inline-flex items-center transition-colors duration-200 mt-10"
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
