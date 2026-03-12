import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="py-32 text-center bg-[#1C1917]">
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
          <circle cx="17" cy="17" r="9" />
          <line x1="24" y1="24" x2="39" y2="39" />
          <line x1="33" y1="35" x2="39" y2="29" />
        </svg>
        <h2 className="font-serif text-[64px] font-normal leading-[1.05] text-[#E8E3DC]">
          Create your hotel assistant.
        </h2>
        <p className="font-sans text-lg font-light text-[#A8A099] max-w-xl mx-auto mt-5 leading-[1.75]">
          See how guests experience your property when every question has an instant answer.
        </p>
        <Link
          href="/onboarding"
          className="inline-flex items-center bg-[#2D9E6B] text-[#E8E3DC] h-12 px-6 rounded-md font-sans font-medium text-sm hover:bg-[#3DC47F] transition-colors mt-10"
        >
          Create Your Hotel Assistant
        </Link>
      </div>
    </section>
  );
}
