import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#141413" }}>
      <SiteNav />
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <p className="font-sans text-[11px] font-medium tracking-[0.20em] uppercase text-[#9C9A93] mb-4">
            404
          </p>
          <h1 className="font-serif text-[64px] max-md:text-[44px] leading-[1.05] font-semibold text-[#FAF9F5] mb-6">
            This page doesn&apos;t exist.
          </h1>
          <p className="font-sans text-[#9C9A93] text-[17px] leading-[1.7] font-light mb-10">
            But your hotel&apos;s AI assistant can.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-[#FAF9F5] hover:bg-white/90 text-[#141413] px-7 h-12 rounded-lg font-sans text-[15px] font-medium transition-colors duration-200"
            >
              Back to Home
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 bg-[#FAF9F5] hover:bg-white/90 text-[#141413] px-7 h-12 rounded-lg font-sans text-[15px] font-medium transition-colors duration-200"
            >
              See Live Demo
            </Link>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
