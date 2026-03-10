import Link from "next/link";
import { BotMessageSquare, ArrowLeft, Info } from "lucide-react";
import { ChatInterface } from "@/components/chat-interface";
import { demoConfig } from "@/lib/demo-config";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-100 px-6 h-14 flex items-center justify-between max-w-6xl mx-auto w-full">
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
        <Link
          href="/onboarding"
          className="text-sm bg-emerald-600 text-white px-4 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Configure your space
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-6 py-10 grid lg:grid-cols-2 gap-10 items-start">
        {/* Left: info */}
        <div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium px-2.5 py-1 rounded-full mb-4">
            <Info className="w-3.5 h-3.5" />
            Live demo
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Meet <span className="text-emerald-600">Palma</span>, the AI Companion of Hotel La Palma
          </h1>
          <p className="text-slate-500 leading-relaxed mb-4">
            This is a live Place Companion assistant configured for a hotel property.
            Ask anything a guest might want to know — in any language. Tap a suggestion
            to get started, or type your own question.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            The same experience can be deployed for hotels, hospitals, airports, shopping
            malls, residential buildings, and university campuses — in minutes, no code required.
          </p>
        </div>

        {/* Right: chat */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden h-[600px] flex flex-col">
          <ChatInterface config={demoConfig} />
        </div>
      </div>
    </div>
  );
}
