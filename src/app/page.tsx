import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { FinalCTA } from "@/components/final-cta";
import { ChatInterface } from "@/components/chat-interface";
import { marazulConfig } from "@/lib/marazul-config";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#1C1917] text-[#E8E3DC]">
      <SiteNav />

      {/* ── HERO ── */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-8 lg:gap-16 py-16 lg:py-24">
          {/* Left */}
          <div className="flex flex-col justify-center">
            <h1
              className="font-serif font-normal text-[#E8E3DC] leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: "clamp(38px, 7vw, 88px)" }}
            >
              The AI that knows your hotel. And your destination.
            </h1>
            <p className="font-sans text-[20px] font-light text-[#A8A099] mt-6 leading-[1.75]">
              An intelligent assistant for every guest, at every hour.
            </p>
            <p className="font-sans text-[17px] text-[#2D9E6B] mt-5">
              Your hotel becomes searchable by conversation.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-10">
              <Link
                href="/onboarding"
                className="inline-flex items-center bg-[#2D9E6B] text-[#E8E3DC] h-12 px-6 rounded-md font-sans font-medium text-sm hover:bg-[#3DC47F] transition-colors"
              >
                Create Your Hotel Assistant
              </Link>
              <a
                href="#hero-demo"
                className="inline-flex items-center border border-white/25 text-[#E8E3DC] h-12 px-6 rounded-md font-sans text-sm hover:bg-white/5 transition-colors"
              >
                Try the Demo
              </a>
            </div>
            <p className="font-sans text-[12px] text-[#6B6560] mt-4">
              No credit card required · Live in minutes · Multilingual by default
            </p>
          </div>

          {/* Right — demo window */}
          <div
            id="hero-demo"
            className="bg-[#0F0D0B] rounded-2xl border border-white/[0.08] overflow-hidden flex flex-col h-[380px] sm:h-[480px] lg:h-[580px]"
          >
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
            <div className="flex-1 overflow-hidden">
              <ChatInterface config={marazulConfig} />
            </div>
          </div>
        </div>
      </section>

      {/* ── PAIN ── */}
      <section className="py-16 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-3">
          {[
            "Where is breakfast served?",
            "Do you have airport transportation?",
            "Where can I get dinner after 10 PM?",
          ].map((q) => (
            <div
              key={q}
              className="border border-white/[0.18] rounded-full px-5 py-2.5 text-base lg:px-8 lg:py-3.5 lg:text-lg font-sans font-light text-[#A8A099] hover:border-white/35 hover:text-[#E8E3DC] transition-all cursor-default"
            >
              {q}
            </div>
          ))}
        </div>
      </section>

      {/* ── REVENUE ── */}
      <section className="py-16 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[42%_58%] gap-10 lg:gap-20 items-center">
          {/* Left */}
          <div>
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              stroke="#E8E3DC"
              strokeWidth="1.25"
              className="mb-6"
            >
              <circle cx="22" cy="22" r="16" />
              <polyline points="16,22 22,14 28,22" />
              <line x1="22" y1="14" x2="22" y2="30" />
            </svg>
            <h2
              className="font-serif font-normal text-[#E8E3DC] leading-[1.1]"
              style={{ fontSize: "clamp(30px, 5vw, 56px)" }}
            >
              Turn guest questions into revenue.
            </h2>
            <p className="font-sans text-[18px] font-light text-[#A8A099] mt-5 leading-[1.75]">
              Every question is an intent signal. Place Companion captures the ones your
              team never had time to act on.
            </p>
          </div>

          {/* Right */}
          <div className="bg-[#0F0D0B] rounded-2xl p-5 sm:p-9 border border-white/[0.06]">
            <div className="font-sans text-[11px] text-[#6B6560] mb-3">10:14 PM</div>
            <div className="bg-[#242019] rounded-[12px_12px_12px_3px] px-4 py-3 font-sans text-[15px] text-[#E8E3DC] max-w-[85%]">
              Do you have any spa treatments available tomorrow morning?
            </div>
            <div className="mt-4">
              <div className="font-sans text-[11px] text-[#2D9E6B] text-right">
                Marina · Place Companion
              </div>
              <div className="bg-[#1E3328] rounded-[12px_12px_3px_12px] px-4 py-3 border border-[#2D9E6B]/20 font-sans text-[15px] text-[#E8E3DC] max-w-[85%] ml-auto mt-2">
                Good evening. Spa Ixchel opens at 9 AM. Deep tissue 60min · $85. Mayan
                stone therapy · $120. Shall I note a reservation?
              </div>
            </div>
            <div className="mt-5 text-center font-sans text-[13px] text-[#2D9E6B] font-medium tracking-[0.06em]">
              One booking. $85. Monthly investment: covered.
            </div>
          </div>
        </div>
      </section>

      {/* ── INTELLIGENCE ── */}
      <section className="py-16 lg:py-32 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            stroke="#E8E3DC"
            strokeWidth="1.25"
            className="mx-auto mb-6"
          >
            <rect x="8" y="8" width="28" height="28" rx="2" />
            <rect x="14" y="16" width="5" height="5" />
            <rect x="25" y="16" width="5" height="5" />
            <rect x="14" y="25" width="5" height="5" />
            <rect x="25" y="25" width="5" height="5" />
          </svg>
          <h2
            className="font-serif font-normal text-[#E8E3DC] leading-[1.1]"
            style={{ fontSize: "clamp(30px, 5vw, 56px)" }}
          >
            It knows your hotel. And your destination.
          </h2>
          <div className="grid md:grid-cols-[1fr_auto_1fr] max-w-3xl mx-auto mt-10 lg:mt-16 gap-8 lg:gap-16 text-left">
            <div>
              <div className="font-sans text-[11px] text-[#2D9E6B] tracking-widest uppercase mb-5">
                YOUR HOTEL
              </div>
              <ul className="space-y-3">
                {[
                  "Restaurant hours and menus",
                  "Spa treatments and availability",
                  "Room types and amenities",
                  "Pool and beach club rules",
                  "Check-in and checkout policies",
                  "Transportation and transfers",
                ].map((item) => (
                  <li key={item} className="font-sans text-[16px] font-light text-[#A8A099]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden md:block w-px bg-white/[0.08] self-stretch" />
            <div>
              <div className="font-sans text-[11px] text-[#2D9E6B] tracking-widest uppercase mb-5">
                YOUR DESTINATION
              </div>
              <ul className="space-y-3">
                {[
                  "Best local restaurants",
                  "Beaches and natural attractions",
                  "Activities and surf schools",
                  "Pharmacies and essentials",
                  "Markets and shopping",
                  "Hidden local favorites",
                ].map((item) => (
                  <li key={item} className="font-sans text-[16px] font-light text-[#A8A099]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="font-sans text-[15px] text-[#6B6560] mt-12">
            One assistant. Complete knowledge.
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-16 lg:py-32 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            stroke="#E8E3DC"
            strokeWidth="1.25"
            className="mx-auto mb-6"
          >
            <circle cx="10" cy="22" r="5" />
            <line x1="15" y1="22" x2="17" y2="22" />
            <circle cx="22" cy="22" r="5" />
            <line x1="27" y1="22" x2="29" y2="22" />
            <circle cx="34" cy="22" r="5" />
          </svg>
          <h2
            className="font-serif font-normal text-[#E8E3DC] leading-[1.1]"
            style={{ fontSize: "clamp(30px, 5vw, 56px)" }}
          >
            Live in minutes.
          </h2>
          <div className="grid md:grid-cols-3 gap-12 mt-16 text-left">
            {[
              {
                step: "01",
                title: "Share your hotel",
                desc: "Paste your website or guest guide. The AI reads it automatically.",
              },
              {
                step: "02",
                title: "Your assistant is built",
                desc: "Every service, amenity, and local experience — structured and ready.",
              },
              {
                step: "03",
                title: "Guests start asking",
                desc: "QR codes, your website, or a shareable link. No app required.",
              },
            ].map((s) => (
              <div key={s.step}>
                <div className="font-sans text-[11px] text-[#2D9E6B] tracking-widest">
                  {s.step}
                </div>
                <div className="font-sans text-[18px] font-normal text-[#E8E3DC] mt-3">
                  {s.title}
                </div>
                <div className="font-sans text-[16px] font-light text-[#A8A099] mt-2 leading-[1.75]">
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDING PARTNERS ── */}
      <section id="founding-partners" className="py-16 lg:py-32 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            stroke="#E8E3DC"
            strokeWidth="1.25"
            className="mx-auto mb-6"
          >
            <polygon points="22,6 26,17 38,17 28,24 32,36 22,29 12,36 16,24 6,17 18,17" />
          </svg>
          <h2
            className="font-serif font-normal text-[#E8E3DC] leading-[1.1]"
            style={{ fontSize: "clamp(30px, 5vw, 56px)" }}
          >
            Founding partners.
          </h2>
          <p className="font-sans text-[18px] text-[#A8A099] mt-5">
            We&apos;re selecting 10 hotels to build this with.
          </p>
          <a
            href="mailto:hola@placecompanion.com"
            className="inline-flex items-center bg-[#2D9E6B] text-[#E8E3DC] h-12 px-6 rounded-md font-sans font-medium text-sm hover:bg-[#3DC47F] transition-colors mt-10"
          >
            Apply for Founding Partner Access
          </a>
          <p className="font-sans text-[13px] text-[#6B6560] mt-4">
            4 of 10 spots remaining
          </p>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-16 lg:py-32 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="font-sans text-[11px] text-[#2D9E6B] tracking-widest uppercase">
            PRICING
          </div>
          <h2
            className="font-serif font-normal text-[#E8E3DC] leading-[1.1] max-w-2xl mx-auto mt-4"
            style={{ fontSize: "clamp(26px, 4.5vw, 52px)" }}
          >
            Less than the cost of one missed booking per day.
          </h2>
          <p className="font-sans text-[18px] font-light text-[#A8A099] mt-4">
            Simple, transparent pricing. No contracts. Cancel anytime.
          </p>

          <div className="grid md:grid-cols-2 max-w-3xl mx-auto mt-12 gap-6">
            {/* Card 1 — Single Property */}
            <div className="bg-[#242019] rounded-2xl p-6 lg:p-12 border border-white/[0.06] flex flex-col text-left">
              <div className="font-sans text-[11px] text-[#6B6560] tracking-widest">
                SINGLE PROPERTY
              </div>
              <div className="mt-4 flex items-end gap-1">
                <span
                  className="font-serif font-light text-[#E8E3DC] leading-none"
                  style={{ fontSize: "72px" }}
                >
                  $249
                </span>
                <span className="font-sans text-[24px] text-[#6B6560] mb-2">/mo</span>
              </div>
              <div className="font-sans text-[13px] text-[#6B6560] mt-1">
                billed annually — or $299/mo monthly
              </div>
              <div className="border-t border-white/[0.08] my-6" />
              <ul className="flex-1 space-y-3">
                {[
                  "AI assistant for your property",
                  "Full destination intelligence",
                  "Multilingual by default",
                  "Website widget + QR codes",
                  "Guest conversation analytics",
                  "Email support",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 font-sans text-[15px] text-[#E8E3DC]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D9E6B] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/onboarding"
                className="w-full flex items-center justify-center bg-[#2D9E6B] text-[#E8E3DC] h-12 rounded-md font-sans font-medium text-sm hover:bg-[#3DC47F] transition-colors mt-8"
              >
                Start Free Trial
              </Link>
              <p className="font-sans text-[12px] text-[#6B6560] text-center mt-3">
                14-day free trial · No credit card required
              </p>
            </div>

            {/* Card 2 — Small Group */}
            <div className="bg-[#242019] rounded-2xl p-6 lg:p-12 border border-white/[0.06] border-t-2 border-t-[#2D9E6B] flex flex-col text-left">
              <div className="inline-flex items-center self-start bg-[#2D9E6B] text-[#E8E3DC] text-[10px] font-sans px-2.5 py-1 rounded-full mb-3">
                RECOMMENDED
              </div>
              <div className="font-sans text-[11px] text-[#6B6560] tracking-widest">
                SMALL GROUP · 2–5 PROPERTIES
              </div>
              <div className="mt-4 flex items-end gap-1">
                <span
                  className="font-serif font-light text-[#E8E3DC] leading-none"
                  style={{ fontSize: "72px" }}
                >
                  $449
                </span>
                <span className="font-sans text-[24px] text-[#6B6560] mb-2">/mo</span>
              </div>
              <div className="font-sans text-[13px] text-[#6B6560] mt-1">
                billed annually — or $549/mo monthly
              </div>
              <div className="border-t border-white/[0.08] my-6" />
              <ul className="flex-1 space-y-3">
                {[
                  "Everything in Single Property",
                  "All properties on one dashboard",
                  "Advanced guest intent analytics",
                  "Revenue opportunity signals",
                  "Staff notification routing",
                  "Priority support",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 font-sans text-[15px] text-[#E8E3DC]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D9E6B] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/onboarding"
                className="w-full flex items-center justify-center bg-[#2D9E6B] text-[#E8E3DC] h-12 rounded-md font-sans font-medium text-sm hover:bg-[#3DC47F] transition-colors mt-8"
              >
                Start Free Trial
              </Link>
              <p className="font-sans text-[12px] text-[#6B6560] mt-3">
                14-day free trial · No credit card required
              </p>
            </div>
          </div>

          <p className="font-sans text-[14px] text-[#6B6560] mt-10">
            Founding Partners lock in lifetime rates at 40% off.{" "}
            <a
              href="mailto:hola@placecompanion.com"
              className="text-[#2D9E6B] hover:underline"
            >
              Apply →
            </a>
          </p>
        </div>
      </section>

      <FinalCTA />
      <SiteFooter />
    </div>
  );
}
