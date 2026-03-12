import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { FinalCTA } from "@/components/final-cta";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#1C1917] text-[#E8E3DC]">
      <SiteNav />

      {/* ── HERO ── */}
      <section className="min-h-screen flex items-center justify-center text-center px-6">
        <div className="max-w-4xl">
          <h1
            className="font-serif font-light text-[#E8E3DC] leading-[1.0]"
            style={{ fontSize: "96px" }}
          >
            Hotels are the most human business in the world.
          </h1>
          <p className="font-sans text-[22px] font-light text-[#A8A099] mt-16">
            We built the most human AI for them.
          </p>
        </div>
      </section>

      {/* ── WHY HOTELS ── */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6 text-center">
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
            style={{ fontSize: "56px" }}
          >
            Why hotels.
          </h2>
          <div className="font-sans text-[18px] font-light text-[#A8A099] max-w-2xl mx-auto mt-8 space-y-6 leading-[1.8] text-left">
            <p>
              A hotel is not a product. It&apos;s a promise — that someone will be cared
              for, that the experience will feel seamless, that every question will have a
              thoughtful answer. But the tools hotels use were built for operations, not
              conversation. PMS systems manage rooms. Booking engines capture reservations.
              Nothing was ever designed to simply talk to guests.
            </p>
            <p>
              That gap — between the guest&apos;s question and the answer they need — costs
              hotels more than they realize. In revenue missed. In trust eroded. In staff
              energy spent on questions that deserved a better system.
            </p>
          </div>
        </div>
      </section>

      {/* ── GENERIC AI ── */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            stroke="#E8E3DC"
            strokeWidth="1.25"
            className="mx-auto mb-6"
          >
            <path d="M8 8 h28 a4 4 0 0 1 4 4 v16 a4 4 0 0 1 -4 4 H20 l-8 6 v-6 H8 a4 4 0 0 1 -4 -4 V12 a4 4 0 0 1 4 -4 z" />
          </svg>
          <h2
            className="font-serif font-normal text-[#E8E3DC] leading-[1.1]"
            style={{ fontSize: "56px" }}
          >
            Generic AI knows everything about everywhere.
          </h2>
          <p
            className="font-serif italic text-[#A8A099] text-center mt-4"
            style={{ fontSize: "28px" }}
          >
            Which means it knows nothing about your hotel.
          </p>
          <p className="font-sans text-[18px] font-light text-[#A8A099] max-w-xl mx-auto text-center mt-8 leading-[1.75]">
            Ask any general-purpose AI about your spa hours. It will guess, hallucinate, or
            tell the guest to check your website. The guest was already on your website.
            They needed a conversation, not a redirect.
          </p>
        </div>
      </section>

      {/* ── DESTINATION ANGLE ── */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            stroke="#E8E3DC"
            strokeWidth="1.25"
            className="mx-auto mb-6"
          >
            <path d="M22 4 C14 4 8 10 8 18 C8 28 22 40 22 40 C22 40 36 28 36 18 C36 10 30 4 22 4 Z" />
            <circle cx="22" cy="18" r="5" />
          </svg>
          <h2
            className="font-serif font-normal text-[#E8E3DC] leading-[1.1]"
            style={{ fontSize: "56px" }}
          >
            Your guests don&apos;t just ask about your hotel.
          </h2>
          <p className="font-sans text-[18px] font-light text-[#A8A099] max-w-xl mx-auto text-center mt-8 leading-[1.75]">
            They ask where to watch the sunset. Which beach has no seaweed this week. Where
            the locals actually eat. Whether the pharmacy is open on Sunday. These questions
            don&apos;t live in any PMS. They live in local knowledge — and until now, that
            knowledge lived only in your best staff member&apos;s head.
          </p>
        </div>
      </section>

      {/* ── HOW WE DIFFER ── */}
      <section className="py-32 text-center">
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
            <circle cx="22" cy="22" r="16" />
            <polygon points="22,12 25,22 22,28 19,22" fill="none" />
            <line x1="22" y1="6" x2="22" y2="12" />
            <line x1="22" y1="32" x2="22" y2="38" />
            <line x1="6" y1="22" x2="12" y2="22" />
            <line x1="32" y1="22" x2="38" y2="22" />
          </svg>
          <h2
            className="font-serif font-normal text-[#E8E3DC] leading-[1.1]"
            style={{ fontSize: "56px" }}
          >
            What Place Companion is not.
          </h2>
          <div className="space-y-8 mt-12">
            {[
              "Not a PMS. Your PMS manages your operations.",
              "Not a chatbot. Chatbots follow scripts. We understand context.",
              "Not a WhatsApp tool. We don't push — we answer.",
              "Not an integration. There's nothing to connect.",
            ].map((s) => (
              <p
                key={s}
                className="font-serif font-light text-[#E8E3DC]"
                style={{ fontSize: "32px" }}
              >
                {s}
              </p>
            ))}
          </div>
          <p className="font-sans text-[18px] text-[#2D9E6B] mt-12">
            We&apos;re the conversation layer your stack was never designed to have.
          </p>
        </div>
      </section>

      {/* ── THE VISION ── */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6 text-center">
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
            style={{ fontSize: "56px" }}
          >
            The vision.
          </h2>
          <p className="font-sans text-[18px] font-light text-[#A8A099] max-w-2xl mx-auto text-center mt-8 leading-[1.8]">
            Every independent hotel deserves a guest experience that feels personal and
            complete — not because of their budget, but because of their knowledge. Place
            Companion exists to give every boutique property, every family-run hotel, every
            carefully curated collection of rooms — the same intelligence that the largest
            hospitality brands in the world are only beginning to build.
          </p>
        </div>
      </section>

      <FinalCTA />
      <SiteFooter />
    </div>
  );
}
