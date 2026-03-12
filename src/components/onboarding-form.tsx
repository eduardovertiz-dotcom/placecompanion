"use client";

import { useState, useEffect } from "react";
import { Check, ChevronRight, Loader2, BotMessageSquare } from "lucide-react";
import { InlineDemo } from "@/components/inline-demo";

type Step = 1 | 2 | 3 | 4;

const CATEGORIES = [
  "Restaurant & Dining",
  "Spa & Wellness",
  "Amenities & Facilities",
  "Location & Navigation",
  "Policies & Hours",
  "Nearby Experiences",
];

const TONES = ["Professional", "Friendly", "Concierge", "Relaxed"];

const HIGHLIGHTS = ["Dining", "Spa", "Activities", "Local Area", "All of the above"];

const PREVIEW_CHIPS = [
  "What time is breakfast?",
  "Do you have a spa?",
  "Where is the pool?",
  "Can I get late checkout?",
];

function buildPreviewPrompt(hotelName: string, tone: string, highlights: string[]): string {
  const toneMap: Record<string, string> = {
    Professional: "professional and polished",
    Friendly: "warm, friendly, and approachable",
    Concierge: "attentive and knowledgeable, like a luxury concierge",
    Relaxed: "relaxed, easy-going, and casual",
  };
  const toneDesc = toneMap[tone] ?? "helpful and professional";
  const focus = highlights.length ? highlights.join(", ") : "all hotel services";
  const name = hotelName || "your hotel";
  return `You are the AI Guest Companion for ${name}. Be ${toneDesc}. Focus especially on: ${focus}. Keep responses concise but complete. Respond in whatever language the guest uses — English or Spanish only.`;
}

export function OnboardingForm() {
  const [step, setStep] = useState<Step>(1);
  const [hotelInput, setHotelInput] = useState("");
  const [hotelUrl, setHotelUrl] = useState("");
  const [detectedCount, setDetectedCount] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [hotelName, setHotelName] = useState("");
  const [tone, setTone] = useState("Friendly");
  const [highlights, setHighlights] = useState<string[]>(["All of the above"]);

  useEffect(() => {
    if (step !== 2) return;
    setDetectedCount(0);
    setAnalysisComplete(false);
    const timers: ReturnType<typeof setTimeout>[] = [];
    CATEGORIES.forEach((_, i) => {
      const t = setTimeout(() => {
        setDetectedCount(i + 1);
        if (i === CATEGORIES.length - 1) setAnalysisComplete(true);
      }, 500 + i * 550);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, [step]);

  function toggleHighlight(label: string) {
    if (label === "All of the above") {
      setHighlights(["All of the above"]);
      return;
    }
    setHighlights((prev) => {
      const without = prev.filter((h) => h !== "All of the above");
      if (without.includes(label)) {
        const next = without.filter((h) => h !== label);
        return next.length ? next : ["All of the above"];
      }
      return [...without, label];
    });
  }

  const previewPrompt = buildPreviewPrompt(hotelName, tone, highlights);

  const inputCls =
    "w-full bg-white border rounded-xl px-4 py-3 text-[15px] text-[#0A0806] placeholder-[#5C5650]/50 outline-none focus:border-[#141413]/40 transition-colors duration-200 font-sans";
  const inputStyle = { borderColor: "rgba(10,8,6,0.15)" };
  const labelCls = "block font-sans text-[13px] font-medium text-[#3A3A38] uppercase tracking-[0.12em] mb-2";

  if (step === 1) {
    return (
      <div>
        <h1 className="font-serif text-[52px] max-md:text-[38px] leading-[1.05] font-semibold text-[#141413] mb-4">
          Let&apos;s build your hotel assistant.
        </h1>
        <p className="font-sans text-[#3A3A38] text-[17px] leading-[1.7] font-light mb-10">
          Paste your hotel&apos;s guest guide, services menu, or website URL. Our AI will read it
          and configure your assistant automatically.
        </p>

        <div className="space-y-5">
          <div>
            <label className={labelCls}>Hotel Guide / Services</label>
            <textarea
              value={hotelInput}
              onChange={(e) => setHotelInput(e.target.value)}
              placeholder="Paste your hotel guide, services document, room information, restaurant hours, spa menu... anything that describes your property."
              className="w-full bg-white border border-[#141413]/15 text-[#141413] placeholder-[#141413]/40 rounded-xl p-4 text-[15px] font-sans resize-none focus:outline-none focus:border-[#141413]/40 h-40"
            />
          </div>

          <div>
            <label className={labelCls}>Or paste a URL</label>
            <input
              type="url"
              value={hotelUrl}
              onChange={(e) => setHotelUrl(e.target.value)}
              placeholder="https://yourhotel.com/guest-guide"
              className="w-full bg-white border border-[#141413]/15 text-[#141413] placeholder-[#141413]/40 rounded-xl px-4 py-3 text-[15px] font-sans focus:outline-none focus:border-[#141413]/40"
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => setStep(2)}
            disabled={!hotelInput.trim() && !hotelUrl.trim()}
            className="font-sans text-[14px] font-medium text-[#FAF9F5] bg-[#C96A3A] hover:bg-[#D4784A] h-11 px-6 rounded-md transition-colors flex items-center gap-2 disabled:opacity-40"
          >
            Analyze My Hotel
            <ChevronRight className="w-4 h-4" />
          </button>
          <p className="font-sans text-[13px] text-[#3A3A38] mt-3 font-light">
            Takes about 30 seconds
          </p>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div>
        <h1 className="font-serif text-[52px] max-md:text-[38px] leading-[1.05] font-semibold text-[#0A0806] mb-4">
          Your assistant is learning your hotel.
        </h1>
        <p className="font-sans text-[#5C5650] text-[17px] leading-[1.7] font-light mb-10">
          {analysisComplete
            ? "Analysis complete. We found the following in your hotel information."
            : "Reading your property information and detecting categories..."}
        </p>

        <div className="bg-white rounded-2xl p-6 mb-6" style={{ border: "1px solid rgba(10,8,6,0.10)" }}>
          <ul className="space-y-3">
            {CATEGORIES.map((cat, i) => {
              const detected = i < detectedCount;
              return (
                <li
                  key={cat}
                  className={`flex items-center justify-between transition-opacity duration-500 ${
                    detected ? "opacity-100" : "opacity-30"
                  }`}
                >
                  <span className="font-sans text-[15px] text-[#0A0806] font-light">{cat}</span>
                  {detected ? (
                    <span className="flex items-center gap-1.5 font-sans text-[13px] text-[#141413] font-medium">
                      <Check className="w-3.5 h-3.5" />
                      Detected
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 font-sans text-[13px] text-[#5C5650]/60">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Scanning...
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {analysisComplete && (
          <div className="mb-8">
            <p className="font-sans text-[15px] text-[#5C5650] font-light">
              <span className="text-[#141413] font-medium">
                {detectedCount * 2} services detected
              </span>{" "}
              across {detectedCount} categories
            </p>
          </div>
        )}

        <button
          onClick={() => setStep(3)}
          disabled={!analysisComplete}
          className="inline-flex items-center gap-2 bg-[#141413] hover:bg-[#2A2A2A] text-[#FAF9F5] px-8 h-12 rounded-lg font-sans text-[15px] font-medium transition-colors duration-200 disabled:opacity-40"
        >
          {analysisComplete ? (
            <>Preview Your Assistant <ChevronRight className="w-4 h-4" /></>
          ) : (
            <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</>
          )}
        </button>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div>
        <h1 className="font-serif text-[52px] max-md:text-[38px] leading-[1.05] font-semibold text-[#0A0806] mb-4">
          Almost ready.
        </h1>
        <p className="font-sans text-[#5C5650] text-[17px] leading-[1.7] font-light mb-10">
          Three quick questions and your assistant is ready to preview.
        </p>

        <div className="space-y-8">
          <div>
            <label className={labelCls}>What&apos;s your hotel called?</label>
            <input
              type="text"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
              placeholder="e.g. MarAzul Riviera Maya"
              className={inputCls}
              style={inputStyle}
            />
          </div>

          <div>
            <label className={labelCls}>How should your assistant sound?</label>
            <div className="grid grid-cols-2 gap-3">
              {TONES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`text-left px-4 py-3 rounded-xl border font-sans text-[15px] font-medium transition-all duration-200 ${
                    tone === t
                      ? "border-[#141413]/40 bg-[#141413]/10 text-[#141413]"
                      : "bg-white text-[#5C5650]"
                  }`}
                  style={tone === t ? {} : { borderColor: "rgba(10,8,6,0.15)" }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>What&apos;s most important to highlight?</label>
            <div className="flex flex-wrap gap-2">
              {HIGHLIGHTS.map((h) => {
                const active = highlights.includes(h);
                return (
                  <button
                    key={h}
                    onClick={() => toggleHighlight(h)}
                    className={`px-4 py-2 rounded-full font-sans text-[14px] font-medium border transition-all duration-200 ${
                      active
                        ? "border-[#141413]/40 bg-[#141413]/10 text-[#141413]"
                        : "bg-white text-[#5C5650]"
                    }`}
                    style={active ? {} : { borderColor: "rgba(10,8,6,0.15)" }}
                  >
                    {active && <Check className="inline w-3 h-3 mr-1.5 -mt-0.5" />}
                    {h}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-4">
          <button
            onClick={() => setStep(4)}
            disabled={!hotelName.trim()}
            className="inline-flex items-center gap-2 bg-[#141413] hover:bg-[#2A2A2A] text-[#FAF9F5] px-8 h-12 rounded-lg font-sans text-[15px] font-medium transition-colors duration-200 disabled:opacity-40"
          >
            See Your Assistant Live
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setStep(2)}
            className="font-sans text-[15px] text-[#5C5650] hover:text-[#0A0806] transition-colors duration-200"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-serif text-[52px] max-md:text-[38px] leading-[1.05] font-semibold text-[#0A0806] mb-4">
        Your assistant is ready.
      </h1>
      <p className="font-sans text-[#5C5650] text-[17px] leading-[1.7] font-light mb-8">
        {hotelName
          ? `This is ${hotelName}'s AI Guest Companion. Ask it anything.`
          : "Try your AI Guest Companion below. Ask it anything."}
      </p>

      <InlineDemo
        chips={PREVIEW_CHIPS}
        systemPrompt={previewPrompt}
        headerName={hotelName || "Your Hotel"}
        className="h-[480px] max-md:h-[420px] mb-8"
      />

      <div className="bg-white rounded-2xl p-6 mb-6" style={{ border: "1px solid rgba(10,8,6,0.10)" }}>
        <p className="font-sans text-[15px] text-[#5C5650] font-light mb-4">
          Save your assistant to keep it →
        </p>
        <a
          href="mailto:hola@placecompanion.com?subject=Place Companion — Create Account"
          className="inline-flex items-center gap-2 bg-[#141413] hover:bg-[#2A2A2A] text-[#FAF9F5] px-8 h-12 rounded-lg font-sans text-[15px] font-medium transition-colors duration-200 w-full justify-center"
        >
          <BotMessageSquare className="w-4 h-4" />
          Create Your Account
        </a>
        <p className="font-sans text-[13px] text-[#5C5650]/80 text-center mt-3 font-light">
          No credit card required · Live in minutes
        </p>
      </div>

      <button
        onClick={() => setStep(3)}
        className="font-sans text-[15px] text-[#5C5650] hover:text-[#0A0806] transition-colors duration-200"
      >
        ← Back to configuration
      </button>
    </div>
  );
}
