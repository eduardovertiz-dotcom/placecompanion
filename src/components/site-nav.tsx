import Link from "next/link";

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 bg-[rgba(28,25,23,0.92)] backdrop-blur-xl border-b border-[rgba(232,227,220,0.06)]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-[#E8E3DC] text-lg">
          Place Companion
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/features"
            className="font-sans text-sm text-[#A8A099] hover:text-[#E8E3DC] transition-colors"
          >
            Features
          </Link>
          <Link
            href="/#how-it-works"
            className="font-sans text-sm text-[#A8A099] hover:text-[#E8E3DC] transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="/#pricing"
            className="font-sans text-sm text-[#A8A099] hover:text-[#E8E3DC] transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/demo"
            className="font-sans text-sm text-[#A8A099] hover:text-[#E8E3DC] transition-colors"
          >
            Demo
          </Link>
          <Link
            href="/about"
            className="font-sans text-sm text-[#A8A099] hover:text-[#E8E3DC] transition-colors"
          >
            About
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/demo"
            className="font-sans text-sm text-[#E8E3DC] border border-white/25 h-10 px-5 rounded-md flex items-center hover:bg-white/5 transition-colors"
          >
            See Live Demo
          </Link>
          <Link
            href="/onboarding"
            className="font-sans text-sm bg-[#2D9E6B] text-[#E8E3DC] h-10 px-5 rounded-md flex items-center hover:bg-[#3DC47F] transition-colors"
          >
            Create Your Hotel Assistant
          </Link>
        </div>
      </div>
    </nav>
  );
}
