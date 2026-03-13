"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { t } = useLang();

  return (
    <nav className="sticky top-0 z-50 bg-[rgba(28,25,23,0.92)] backdrop-blur-xl border-b border-[rgba(232,227,220,0.06)]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-[#E8E3DC] text-lg">
          Place Companion
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/features" className="font-sans text-sm text-[#A8A099] hover:text-[#E8E3DC] transition-colors">{t.nav.features}</Link>
          <Link href="/#how-it-works" className="font-sans text-sm text-[#A8A099] hover:text-[#E8E3DC] transition-colors">{t.nav.howItWorks}</Link>
          <Link href="/#pricing" className="font-sans text-sm text-[#A8A099] hover:text-[#E8E3DC] transition-colors">{t.nav.pricing}</Link>
          <Link href="/demo" className="font-sans text-sm text-[#A8A099] hover:text-[#E8E3DC] transition-colors">{t.nav.demo}</Link>
          <Link href="/about" className="font-sans text-sm text-[#A8A099] hover:text-[#E8E3DC] transition-colors">{t.nav.about}</Link>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/demo" className="font-sans text-sm text-[#E8E3DC] border border-white/25 h-10 px-5 rounded-md flex items-center hover:bg-white/5 transition-colors">
            {t.nav.seeDemo}
          </Link>
          <Link href="/auth/login" className="font-sans text-sm text-[#E8E3DC] border border-white/25 h-10 px-5 rounded-md flex items-center hover:bg-white/5 transition-colors">
            {t.nav.signIn}
          </Link>
          <LanguageToggle />
          <Link href="/onboarding" className="font-sans text-sm bg-[#C96A3A] text-[#FAF9F5] h-10 px-5 rounded-md flex items-center hover:bg-[#D4784A] transition-colors">
            {t.nav.createAssistant}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#E8E3DC] p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-[rgba(232,227,220,0.06)] bg-[rgba(28,25,23,0.98)] px-6 py-4 flex flex-col gap-1">
          {[
            [t.nav.features, "/features"],
            [t.nav.howItWorks, "/#how-it-works"],
            [t.nav.pricing, "/#pricing"],
            [t.nav.demo, "/demo"],
            [t.nav.about, "/about"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="font-sans text-base text-[#A8A099] py-3 border-b border-[rgba(232,227,220,0.06)]"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-4">
            <Link href="/demo" onClick={() => setOpen(false)} className="font-sans text-sm text-[#E8E3DC] border border-white/25 h-12 px-5 rounded-md flex items-center justify-center hover:bg-white/5 transition-colors">
              {t.nav.seeDemo}
            </Link>
            <Link href="/auth/login" onClick={() => setOpen(false)} className="font-sans text-sm text-[#E8E3DC] border border-white/25 h-12 px-5 rounded-md flex items-center justify-center hover:bg-white/5 transition-colors">
              {t.nav.signIn}
            </Link>
            <div className="flex justify-center">
              <LanguageToggle />
            </div>
            <Link href="/onboarding" onClick={() => setOpen(false)} className="font-sans text-sm bg-[#C96A3A] text-[#FAF9F5] h-12 px-5 rounded-md flex items-center justify-center hover:bg-[#D4784A] transition-colors">
              {t.nav.createAssistant}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
