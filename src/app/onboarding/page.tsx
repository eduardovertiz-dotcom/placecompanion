import { OnboardingForm } from "@/components/onboarding-form";
import Link from "next/link";
import { ArrowLeft, BotMessageSquare } from "lucide-react";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <div className="flex items-center gap-2">
            <BotMessageSquare className="w-5 h-5 text-emerald-600" />
            <span className="font-semibold text-sm">Place Companion</span>
          </div>
          <div className="w-24" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            Configure your AI companion
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Tell us about your space. In a few minutes you&apos;ll have a fully
            configured AI assistant ready to serve your visitors.
          </p>
        </div>
        <OnboardingForm />
      </div>
    </div>
  );
}
