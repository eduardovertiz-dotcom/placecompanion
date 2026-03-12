import { OnboardingForm } from "@/components/onboarding-form";
import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen" style={{ background: "#F7F4EE", color: "#1C1917" }}>
      {/* Minimal top bar */}
      <div className="bg-white border-b border-black/[0.06]">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-serif text-[#1C1917] text-lg">
            Place Companion
          </Link>
          <Link
            href="/"
            className="font-sans text-sm text-[#6B6560] hover:text-[#1C1917] transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10 text-center">
          <h1
            className="font-serif font-normal text-[#1C1917] leading-[1.1]"
            style={{ fontSize: "48px" }}
          >
            Configure your AI companion
          </h1>
          <p className="font-sans text-[18px] font-light text-[#6B6560] max-w-xl mx-auto mt-4 leading-[1.75]">
            Tell us about your hotel. In a few minutes you&apos;ll have a fully configured
            AI assistant ready to serve your guests.
          </p>
        </div>
        <OnboardingForm />
      </div>
    </div>
  );
}
