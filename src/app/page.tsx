import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ChatInterface } from "@/components/chat-interface";
import { FaqSection } from "@/components/faq-section";
import { marazulConfig } from "@/lib/marazul-config";

const HOTEL_KNOWLEDGE = [
  "Restaurant hours and menus",
  "Spa treatments and availability",
  "Room types and amenities",
  "Pool and beach club rules",
  "Check-in and checkout policies",
  "Transportation and transfers",
];

const DESTINATION_KNOWLEDGE = [
  "Best local restaurants",
  "Beaches and natural attractions",
  "Activities and surf schools",
  "Pharmacies and essentials",
  "Markets and shopping",
  "Hidden local favorites",
];

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: "#141413" }}>
      <SiteNav />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="py-24 pt-28 flex items-center"
        style={{ background: "#141413" }}
      >
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — headline, subhead, one button */}
            <div>
              <h1
                className="font-serif font-normal text-[#FAF9F5]"
                style={{ fontSize: "96px", lineHeight: 1.0, letterSpacing: "-0.02em" }}
              >
                The AI that knows your hotel. And your destination.
              </h1>

              <p
                className="font-sans font-light mt-8"
                style={{ fontSize: "20px", lineHeight: 1.7, color: "#9C9A93" }}
              >
                An intelligent assistant for every guest, at every hour.
              </p>

              <div className="mt-12">
                <Link
                  href="/onboarding"
                  className="font-sans text-[14px] font-medium text-[#FAF9F5] bg-[#C96A3A] hover:bg-[#D4784A] h-11 px-6 rounded-md transition-colors mt-4 inline-flex items-center w-auto self-start"
                >
                  Create Your Hotel Assistant
                </Link>
              </div>
            </div>

            {/* Right — demo window */}
            <div style={{ background: '#3A3835', borderRadius: '17px', padding: '1px' }}>
            <div
              className="flex flex-col"
              style={{ borderRadius: '16px', overflow: 'hidden', background: '#0F0E0D', height: '580px' }}
            >
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
                  Part of the MarAzul Collection
                </p>
                <p className="font-sans text-[15px] font-light text-[#9C9A93] mt-1">
                  Your 24/7 AI Guest Companion
                </p>
              </div>
              <ChatInterface config={marazulConfig} />
            </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── PAIN PILLS ───────────────────────────────────── */}
      <section className="py-32" style={{ background: "#141413" }}>
        <div className="flex justify-center gap-4 flex-wrap px-8">
          {[
            "Where is breakfast served?",
            "Do you have airport transportation?",
            "Where can I get dinner after 10 PM?",
          ].map((q) => (
            <span
              key={q}
              className="font-sans font-light text-[#9C9A93] hover:text-[#FAF9F5] hover:border-white/35 transition-all cursor-default rounded-full border border-white/[0.18]"
              style={{ padding: "14px 32px", fontSize: "18px" }}
            >
              {q}
            </span>
          ))}
        </div>
      </section>

      {/* ── REVENUE ──────────────────────────────────────── */}
      <section className="py-32" style={{ background: "#0F0E0D" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-[42%_58%] gap-20 items-center">

            {/* Left */}
            <div>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-8">
                <circle cx="24" cy="24" r="23" stroke="#FAF9F5" strokeWidth="1.5"/>
                <path d="M24 13v22M29 17.5C29 14.9 26.8 13.5 24 13.5s-5 1.4-5 4c0 5.5 10 4.5 10 10 0 3-2.2 5-5 5s-5-2-5-5" stroke="#FAF9F5" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <h2
                className="font-serif font-normal text-[#FAF9F5]"
                style={{ fontSize: "68px", lineHeight: 1.05 }}
              >
                Turn guest questions into revenue.
              </h2>
              <p
                className="font-sans font-light text-[#9C9A93] mt-5"
                style={{ fontSize: "18px", lineHeight: 1.75 }}
              >
                Every question is an intent signal. Place Companion captures
                the ones your team never had time to act on.
              </p>
            </div>

            {/* Right — conversation */}
            <div
              className="rounded-2xl p-8"
              style={{
                background: "#1F1E1D",
                border: "1px solid rgba(250,249,245,0.06)",
              }}
            >
              <p
                className="font-sans text-[#4F4D4A] mb-3"
                style={{ fontSize: "11px" }}
              >
                10:14 PM
              </p>
              <div
                className="font-sans text-[#FAF9F5] inline-block"
                style={{
                  background: "#141413",
                  border: "1px solid rgba(250,249,245,0.06)",
                  borderRadius: "12px 12px 12px 3px",
                  padding: "12px 16px",
                  fontSize: "15px",
                  maxWidth: "85%",
                }}
              >
                Do you have any spa treatments available tomorrow morning?
              </div>
              <p
                className="font-sans text-right mt-4"
                style={{ fontSize: "11px", color: "#9C9A93" }}
              >
                Marina · Place Companion
              </p>
              <div
                className="font-sans text-[#FAF9F5] ml-auto mt-2"
                style={{
                  background: "#141413",
                  border: "1px solid rgba(250,249,245,0.06)",
                  borderRadius: "12px 12px 3px 12px",
                  padding: "12px 16px",
                  fontSize: "15px",
                  maxWidth: "85%",
                }}
              >
                Good evening. Spa Ixchel opens at 9 AM. Deep tissue 60min ·
                $85. Mayan stone therapy · $120. Shall I note a reservation?
              </div>
              <p
                className="font-sans font-medium text-center mt-5"
                style={{ fontSize: "13px", letterSpacing: "0.06em", color: "#9C9A93" }}
              >
                One booking. $85. Monthly investment: covered.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── INTELLIGENCE ─────────────────────────────────── */}
      <section className="py-32 text-center" style={{ background: "#141413" }}>
        <div className="max-w-7xl mx-auto px-8">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mx-auto mb-6">
            <rect x="10" y="20" width="36" height="28" rx="1" stroke="#FAF9F5" strokeWidth="1.5" />
            <path
              d="M18 20V15a10 10 0 0120 0v5"
              stroke="#FAF9F5"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <rect x="23" y="28" width="10" height="8" rx="1" stroke="#FAF9F5" strokeWidth="1.5" />
          </svg>

          <h2
            className="font-serif font-normal text-[#FAF9F5]"
            style={{ fontSize: "68px", lineHeight: 1.05 }}
          >
            It knows your hotel. And your destination.
          </h2>

          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-0 max-w-3xl mx-auto mt-16 text-left">
            <div>
              <p className="font-sans text-[13px] font-semibold text-[#FAF9F5] tracking-[0.18em] uppercase mb-5">
                YOUR HOTEL
              </p>
              <div className="space-y-3">
                {HOTEL_KNOWLEDGE.map((item) => (
                  <p key={item} className="font-sans font-light text-[#9C9A93]" style={{ fontSize: "16px" }}>
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div
              className="self-stretch mx-8"
              style={{ width: "1px", background: "rgba(250,249,245,0.08)" }}
            />

            <div>
              <p className="font-sans text-[13px] font-semibold text-[#FAF9F5] tracking-[0.18em] uppercase mb-5">
                YOUR DESTINATION
              </p>
              <div className="space-y-3">
                {DESTINATION_KNOWLEDGE.map((item) => (
                  <p key={item} className="font-sans font-light text-[#9C9A93]" style={{ fontSize: "16px" }}>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <p className="font-sans text-[16px] text-[#9C9A93] mt-12 text-center">
            One assistant. Complete knowledge.
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section id="how-it-works" className="py-32 text-center" style={{ background: "#141413" }}>
        <div className="max-w-7xl mx-auto px-8">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mx-auto mb-6">
            <circle cx="12" cy="28" r="6" stroke="#FAF9F5" strokeWidth="1.5" />
            <circle cx="44" cy="28" r="6" stroke="#FAF9F5" strokeWidth="1.5" />
            <circle cx="28" cy="28" r="6" stroke="#FAF9F5" strokeWidth="1.5" />
            <line x1="18" y1="28" x2="22" y2="28" stroke="#FAF9F5" strokeWidth="1.5" />
            <line x1="34" y1="28" x2="38" y2="28" stroke="#FAF9F5" strokeWidth="1.5" />
          </svg>

          <h2
            className="font-serif font-normal text-[#FAF9F5]"
            style={{ fontSize: "68px", lineHeight: 1.05 }}
          >
            Live in minutes.
          </h2>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto mt-16 text-left">
            {[
              {
                num: "01",
                title: "Share your hotel",
                desc: "Paste your website or guest guide. The AI reads it automatically.",
              },
              {
                num: "02",
                title: "Your assistant is built",
                desc: "Every service, amenity, and local experience — structured and ready.",
              },
              {
                num: "03",
                title: "Guests start asking",
                desc: "QR codes, your website, or a shareable link. No app required.",
              },
            ].map((step) => (
              <div key={step.num}>
                <p className="font-sans tracking-widest" style={{ fontSize: "11px", color: "#2D9E6B" }}>
                  {step.num}
                </p>
                <p className="font-sans font-normal text-[#FAF9F5] mt-3" style={{ fontSize: "18px" }}>
                  {step.title}
                </p>
                <p className="font-sans font-light text-[#9C9A93] mt-2" style={{ fontSize: "16px" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDING PARTNERS ────────────────────────────── */}
      <section id="founding-partners" className="py-32 text-center" style={{ background: "#141413" }}>
        <div className="max-w-7xl mx-auto px-8">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mx-auto mb-6">
            <path
              d="M28 6l5.5 11 12 1.75-8.75 8.5 2 12L28 34l-10.75 5.25 2-12L10.5 18.75l12-1.75L28 6z"
              stroke="#FAF9F5"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>

          <h2
            className="font-serif font-normal text-[#FAF9F5]"
            style={{ fontSize: "68px", lineHeight: 1.05 }}
          >
            Founding partners.
          </h2>
          <p className="font-sans text-[#9C9A93] mt-5" style={{ fontSize: "18px" }}>
            We&apos;re selecting 10 hotels to build this with.
          </p>

          <a
            href="mailto:hola@placecompanion.com?subject=Founding Partner Application"
            className="font-sans text-[14px] font-medium text-[#141413] bg-[#FAF9F5] hover:bg-white h-11 px-8 rounded-md transition-colors mt-8 inline-flex items-center"
          >
            Apply for Founding Partner Access
          </a>

          <p className="font-sans text-[14px] text-[#FAF9F5]/60 mt-4">
            4 of 10 spots remaining
          </p>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────── */}
      <section id="pricing" className="py-32 text-center" style={{ background: "#0F0E0D" }}>
        <div className="max-w-7xl mx-auto px-8">
          <p
            className="font-sans uppercase tracking-widest"
            style={{ fontSize: "11px", color: "#9C9A93" }}
          >
            PRICING
          </p>
          <h2
            className="font-serif font-normal text-[#FAF9F5] max-w-2xl mx-auto mt-4"
            style={{ fontSize: "56px", lineHeight: 1.05 }}
          >
            Less than the cost of one missed booking per day.
          </h2>
          <p className="font-sans font-light text-[#9C9A93] mt-4" style={{ fontSize: "18px" }}>
            Simple, transparent pricing. No contracts. Cancel anytime.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-12">

            {/* Card 1 — Single Property */}
            <div
              className="rounded-2xl p-10 flex flex-col text-left"
              style={{ background: "#1F1E1D", border: "1px solid rgba(250,249,245,0.08)" }}
            >
              <p className="font-sans text-[13px] font-medium tracking-widest text-[#FAF9F5]/70 uppercase">
                SINGLE PROPERTY
              </p>
              <div className="flex items-baseline gap-1 mt-4">
                <span className="font-serif font-light text-[#FAF9F5]" style={{ fontSize: "72px", lineHeight: 1 }}>
                  $249
                </span>
                <span className="font-sans text-[#9C9A93]" style={{ fontSize: "24px" }}>/mo</span>
              </div>
              <p className="font-sans text-[#9C9A93] mt-1" style={{ fontSize: "13px" }}>
                billed annually — or $299/mo monthly
              </p>
              <div className="my-6" style={{ borderTop: "1px solid rgba(250,249,245,0.08)" }} />
              <ul className="flex-1 space-y-3">
                {[
                  "AI assistant for your property",
                  "Full destination intelligence",
                  "Multilingual by default",
                  "Website widget + QR codes",
                  "Guest conversation analytics",
                  "Email support",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 font-sans text-[#FAF9F5]" style={{ fontSize: "15px" }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-white/40" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/onboarding"
                className="font-sans text-[15px] font-semibold h-11 rounded-lg w-full transition-colors mt-6 flex items-center justify-center"
                style={{ backgroundColor: '#FAF9F5', color: '#141413' }}
              >
                Start Free Trial
              </Link>
              <p className="font-sans text-[#53525D] text-center mt-3" style={{ fontSize: "12px" }}>
                14-day free trial · No credit card required
              </p>
            </div>

            {/* Card 2 — Small Group */}
            <div
              className="rounded-2xl p-10 flex flex-col text-left"
              style={{
                background: "#1F1E1D",
                borderTop: "2px solid rgba(250,249,245,0.4)",
                borderLeft: "1px solid rgba(250,249,245,0.08)",
                borderRight: "1px solid rgba(250,249,245,0.08)",
                borderBottom: "1px solid rgba(250,249,245,0.08)",
              }}
            >
              <span
                className="font-sans font-medium inline-block mb-4"
                style={{
                  background: "#FAF9F5",
                  color: "#141413",
                  fontSize: "10px",
                  padding: "4px 10px",
                  borderRadius: "9999px",
                  width: "fit-content",
                }}
              >
                RECOMMENDED
              </span>
              <p className="font-sans text-[13px] font-medium tracking-widest text-[#FAF9F5]/70 uppercase">
                SMALL GROUP · 2–5 PROPERTIES
              </p>
              <div className="flex items-baseline gap-1 mt-4">
                <span className="font-serif font-light text-[#FAF9F5]" style={{ fontSize: "72px", lineHeight: 1 }}>
                  $449
                </span>
                <span className="font-sans text-[#9C9A93]" style={{ fontSize: "24px" }}>/mo</span>
              </div>
              <p className="font-sans text-[#9C9A93] mt-1" style={{ fontSize: "13px" }}>
                billed annually — or $549/mo monthly
              </p>
              <div className="my-6" style={{ borderTop: "1px solid rgba(250,249,245,0.08)" }} />
              <ul className="flex-1 space-y-3">
                {[
                  "Everything in Single Property",
                  "All properties on one dashboard",
                  "Advanced guest intent analytics",
                  "Revenue opportunity signals",
                  "Staff notification routing",
                  "Priority support",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 font-sans text-[#FAF9F5]" style={{ fontSize: "15px" }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-white/40" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/onboarding"
                className="font-sans text-[15px] font-semibold h-11 rounded-lg w-full transition-colors mt-6 flex items-center justify-center"
                style={{ backgroundColor: '#FAF9F5', color: '#141413' }}
              >
                Start Free Trial
              </Link>
              <p className="font-sans text-[#53525D] text-center mt-3" style={{ fontSize: "12px" }}>
                14-day free trial · No credit card required
              </p>
            </div>

          </div>

          <p className="font-sans text-[15px] mt-10">
            <span className="text-[#53525D]">Founding Partners lock in lifetime rates at 40% off. </span>
            <a
              href="mailto:hola@placecompanion.com?subject=Founding Partner Application"
              className="text-[#FAF9F5] hover:text-white transition-colors duration-200"
            >
              Apply →
            </a>
          </p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section id="faq" className="py-32 text-center" style={{ background: "#141413" }}>
        <div className="max-w-7xl mx-auto px-8">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mx-auto mb-6">
            <circle cx="28" cy="28" r="20" stroke="#FAF9F5" strokeWidth="1.5" />
            <path
              d="M22 22c0-3.3 2.7-6 6-6s6 2.7 6 6c0 3-2.2 5.2-5.2 6.7V30"
              stroke="#FAF9F5"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="28" cy="37" r="1.25" fill="#FAF9F5" />
          </svg>

          <h2
            className="font-serif font-normal text-[#FAF9F5]"
            style={{ fontSize: "68px", lineHeight: 1.05 }}
          >
            Common questions.
          </h2>

          <FaqSection />
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section className="py-32 text-center" style={{ background: "#141413" }}>
        <div className="max-w-7xl mx-auto px-8">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mx-auto mb-6">
            <path
              d="M10 28a18 18 0 0136 0"
              stroke="#FAF9F5"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="28" cy="28" r="6" stroke="#FAF9F5" strokeWidth="1.5" />
            <path
              d="M28 34v10M24 40l4 4 4-4"
              stroke="#FAF9F5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <h2
            className="font-serif font-normal text-[#FAF9F5]"
            style={{ fontSize: "68px", lineHeight: 1.05 }}
          >
            Create your hotel assistant.
          </h2>
          <p
            className="font-sans text-[#9C9A93] max-w-xl mx-auto mt-5"
            style={{ fontSize: "18px", lineHeight: 1.75 }}
          >
            See how guests experience your property when every question has an
            instant answer.
          </p>
          <Link
            href="/onboarding"
            className="font-sans text-[15px] font-medium text-[#141413] bg-[#FAF9F5] hover:bg-white h-12 px-10 rounded-md transition-colors mt-8 inline-flex items-center"
          >
            Create Your Hotel Assistant
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
