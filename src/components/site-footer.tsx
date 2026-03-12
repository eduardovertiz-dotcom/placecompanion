import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Demo", href: "/demo" },
  { label: "About", href: "/about" },
  { label: "Founding Partners", href: "/#founding-partners" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#161310] border-t border-[rgba(232,227,220,0.06)]">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
          <div>
            <div className="font-serif text-[#E8E3DC] text-xl mb-2">Place Companion</div>
            <p className="font-sans text-sm text-[#A8A099]">The AI that knows your hotel.</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 max-w-lg">
            {FOOTER_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="font-sans text-sm text-[#6B6560] hover:text-[#E8E3DC] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button className="font-sans text-sm text-[#6B6560] hover:text-[#E8E3DC] transition-colors">
              EN
            </button>
            <span className="text-[#6B6560]">·</span>
            <button className="font-sans text-sm text-[#6B6560] hover:text-[#E8E3DC] transition-colors">
              ES
            </button>
          </div>
        </div>
        <div className="border-t border-[rgba(232,227,220,0.06)] pt-8">
          <p className="font-sans text-sm text-[#6B6560]">
            © 2026 Place Companion. Built for hotels.
          </p>
        </div>
      </div>
    </footer>
  );
}
