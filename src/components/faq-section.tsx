"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "How long does setup take?",
    a: "Most hotels are live in under 30 minutes. Paste your website or guest guide and the AI builds your assistant automatically.",
  },
  {
    q: "What languages does it support?",
    a: "Place Companion responds in the guest's language automatically. No configuration needed — it detects and matches the conversation language.",
  },
  {
    q: "How do guests access the assistant?",
    a: "Via QR code, a link on your website, or embedded as a chat widget. No app download required.",
  },
  {
    q: "Can I customize what the assistant knows?",
    a: "Yes. You control all property information — menus, policies, amenities, local recommendations. Update it anytime from your dashboard.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes. 14 days free, no credit card required. You'll have a fully working assistant for your property within minutes of signing up.",
  },
  {
    q: "What if I have multiple properties?",
    a: "The Small Group plan covers 2–5 properties under one dashboard. For larger portfolios, contact us for enterprise pricing.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="max-w-2xl mx-auto mt-12 text-left">
      {FAQS.map((faq, i) => (
        <div
          key={i}
          style={{ borderBottom: "1px solid rgba(250,249,245,0.08)" }}
        >
          <button
            className="w-full flex items-center justify-between py-5 text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span
              className="font-sans font-normal text-[#FAF9F5]"
              style={{ fontSize: "17px" }}
            >
              {faq.q}
            </span>
            <span
              className="flex-shrink-0 ml-4 text-[#9C9A93] transition-transform duration-200"
              style={{
                fontSize: "20px",
                transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
              }}
            >
              +
            </span>
          </button>
          {open === i && (
            <p
              className="font-sans font-light text-[#9C9A93] pb-5"
              style={{ fontSize: "16px", lineHeight: 1.75 }}
            >
              {faq.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
