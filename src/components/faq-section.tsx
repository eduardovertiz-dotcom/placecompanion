"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n/LanguageContext";

export function FaqSection() {
  const { t } = useLang();
  const itemCount = t.faq.items.length;
  const [openSet, setOpenSet] = useState<Set<number>>(new Set(Array.from({ length: itemCount }, (_, i) => i)));

  return (
    <div className="max-w-2xl mx-auto mt-12 text-left">
      {t.faq.items.map((faq, i) => (
        <div
          key={i}
          style={{ borderBottom: "1px solid rgba(250,249,245,0.08)" }}
        >
          <button
            className="w-full flex items-center justify-between py-5 text-left"
            onClick={() => {
            setOpenSet(prev => {
              const next = new Set(prev);
              if (next.has(i)) next.delete(i); else next.add(i);
              return next;
            });
          }}
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
                transform: openSet.has(i) ? "rotate(45deg)" : "rotate(0deg)",
              }}
            >
              +
            </span>
          </button>
          {openSet.has(i) && (
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
