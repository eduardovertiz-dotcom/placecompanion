"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";

export function SiteFooter() {
  const { t } = useLang();

  const footerLinks = [
    { label: t.footer.links.features, href: "/features" },
    { label: t.footer.links.howItWorks, href: "/#how-it-works" },
    { label: t.footer.links.pricing, href: "/#pricing" },
    { label: t.footer.links.demo, href: "/demo" },
    { label: t.footer.links.about, href: "/about" },
    { label: t.footer.links.foundingPartners, href: "/#founding-partners" },
    { label: t.footer.links.privacy, href: "/privacy" },
    { label: t.footer.links.terms, href: "/terms" },
  ];

  return (
    <footer className="bg-[#161310] border-t border-[rgba(232,227,220,0.06)]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-14">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
          <div>
            <div className="font-serif text-[#E8E3DC] text-xl mb-2">Place Companion</div>
            <p className="font-sans text-sm text-[#A8A099]">{t.footer.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 max-w-lg">
            {footerLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-sans text-sm text-[#6B6560] hover:text-[#E8E3DC] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center">
            <LanguageToggle />
          </div>
        </div>
        <div className="border-t border-[rgba(232,227,220,0.06)] pt-8">
          <p className="font-sans text-sm text-[#6B6560]">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
