import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { FinalCTA } from "@/components/final-cta";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#1C1917] text-[#E8E3DC]">
      <SiteNav />

      {/* ── HERO ── */}
      <section className="py-40 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <h1
            className="font-serif font-normal text-[#E8E3DC] leading-[1.05] max-w-4xl mx-auto"
            style={{ fontSize: "88px" }}
          >
            Everything your guests will ever ask.
          </h1>
          <p className="font-sans text-[20px] font-light text-[#A8A099] mt-6">
            Place Companion knows your hotel and your destination — completely.
          </p>
        </div>
      </section>

      {/* ── INTELLIGENCE ── */}
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
            It knows your hotel. And your destination.
          </h2>
          <p className="font-sans text-[18px] font-light text-[#A8A099] max-w-2xl mx-auto mt-6 leading-[1.75]">
            Your guests don&apos;t just ask about your services. They ask about beach
            conditions, where to eat after midnight, which pharmacy is open Sunday.
          </p>
          <div className="grid md:grid-cols-[1fr_auto_1fr] max-w-3xl mx-auto mt-16 gap-16 text-left">
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
                  <li
                    key={item}
                    className="font-sans text-[16px] font-light text-[#A8A099]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-px bg-white/[0.08] self-stretch" />
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
                  <li
                    key={item}
                    className="font-sans text-[16px] font-light text-[#A8A099]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── GUEST JOURNEY ── */}
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
            With your guests from arrival to review.
          </h2>
          <div className="grid md:grid-cols-3 gap-12 mt-16 text-left">
            {[
              {
                stage: "PRE-ARRIVAL",
                title: "Before they pack their bags",
                desc: "The assistant link arrives in their booking confirmation. Guests explore the property, plan meals, book treatments — before they pack their bags.",
              },
              {
                stage: "DURING STAY",
                title: "At every touch point",
                desc: "QR codes in rooms, lobby, pool, spa, restaurant. Every question answered instantly, in any language, at any hour.",
              },
              {
                stage: "AFTER STAY",
                title: "Turn satisfaction into advocacy",
                desc: "A warm follow-up with a direct link to leave a review. Happy guests become public advocates.",
              },
            ].map((s) => (
              <div key={s.stage}>
                <div className="font-sans text-[11px] text-[#2D9E6B] tracking-widest uppercase">
                  {s.stage}
                </div>
                <div className="font-sans text-[20px] font-normal text-[#E8E3DC] mt-3">
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

      {/* ── DEPLOYMENT ── */}
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
            <circle cx="10" cy="22" r="5" />
            <line x1="15" y1="22" x2="17" y2="22" />
            <circle cx="22" cy="22" r="5" />
            <line x1="27" y1="22" x2="29" y2="22" />
            <circle cx="34" cy="22" r="5" />
          </svg>
          <h2
            className="font-serif font-normal text-[#E8E3DC] leading-[1.1]"
            style={{ fontSize: "56px" }}
          >
            Three ways guests reach your assistant.
          </h2>
          <div className="grid md:grid-cols-3 gap-12 mt-16 text-left">
            {[
              {
                title: "QR Codes",
                desc: "Print and place in rooms, lobby, pool, restaurant. Guests scan and ask instantly.",
              },
              {
                title: "Hotel Website",
                desc: "Embedded widget on your site. Guests ask before they even arrive.",
              },
              {
                title: "Shareable Link",
                desc: "Send in your booking confirmation. Guests arrive already informed.",
              },
            ].map((d) => (
              <div key={d.title}>
                <div className="font-sans text-[18px] font-normal text-[#E8E3DC]">
                  {d.title}
                </div>
                <div className="font-sans text-[16px] font-light text-[#A8A099] mt-2 leading-[1.75]">
                  {d.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHERE IT FITS ── */}
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
            It works alongside everything you already have.
          </h2>
          <p
            className="font-serif italic text-[#E8E3DC] max-w-2xl mx-auto text-center mt-10 leading-[1.4]"
            style={{ fontSize: "30px" }}
          >
            &ldquo;Your PMS manages your operations. Place Companion talks to your guests.
            Two different jobs. Zero conflict. Nothing to integrate.&rdquo;
          </p>
          <div className="space-y-4 mt-10">
            {[
              "Not a PMS — doesn't touch reservations or payments.",
              "Not a chatbot — understands context, not just keywords.",
              "Not an app — guests scan a QR, no download required.",
              "Not an integration — connect nothing, configure nothing.",
            ].map((s) => (
              <p key={s} className="font-sans text-[17px] text-[#A8A099]">
                {s}
              </p>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
      <SiteFooter />
    </div>
  );
}
