"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  Check,
  Copy,
  ExternalLink,
  BedDouble,
  HeartPulse,
  Plane,
  Home,
  ShoppingBag,
  GraduationCap,
} from "lucide-react";
import type { PropertyConfig, SpaceVertical } from "@/types/property";
import { VERTICAL_FORM_CONFIGS } from "@/lib/vertical-configs";

type Step = 1 | 2 | 3 | 4 | 5;

const VERTICAL_OPTIONS: Array<{
  value: SpaceVertical;
  icon: React.ElementType;
}> = [
  { value: "hotel_resort", icon: BedDouble },
  { value: "hospital_clinic", icon: HeartPulse },
  { value: "airport_transport", icon: Plane },
  { value: "residential", icon: Home },
  { value: "shopping_retail", icon: ShoppingBag },
  { value: "university_campus", icon: GraduationCap },
];

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round(((current - 1) / (total - 1)) * 100);
  return (
    <div className="w-full h-0.5 bg-black/[0.08] rounded-full mb-8 overflow-hidden">
      <div
        className="h-full bg-[#2D9E6B] rounded-full transition-all duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

interface FormData {
  type: SpaceVertical | "";
  name: string;
  city: string;
  country: string;
  address: string;
  primaryLanguage: string;
  companion_name: string;
  companion_personality: string;
  companion_greeting: string;
  services: string[];
  faqs: Array<{ question: string; answer: string }>;
  phone: string;
  whatsapp: string;
  email: string;
}

const defaultForm: FormData = {
  type: "",
  name: "",
  city: "",
  country: "",
  address: "",
  primaryLanguage: "en",
  companion_name: "",
  companion_personality: "",
  companion_greeting: "",
  services: [""],
  faqs: [{ question: "", answer: "" }],
  phone: "",
  whatsapp: "",
  email: "",
};

export function OnboardingForm() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [generatedConfig, setGeneratedConfig] = useState<PropertyConfig | null>(null);
  const [copied, setCopied] = useState(false);

  function updateField(field: keyof FormData, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function selectVertical(value: SpaceVertical) {
    const cfg = VERTICAL_FORM_CONFIGS[value];
    setForm((prev) => ({
      ...prev,
      type: value,
      companion_personality: cfg.defaultPersonality,
      companion_greeting: cfg.defaultGreeting,
    }));
  }

  function updateService(index: number, value: string) {
    const updated = [...form.services];
    updated[index] = value;
    setForm((prev) => ({ ...prev, services: updated }));
  }

  function addService() {
    setForm((prev) => ({ ...prev, services: [...prev.services, ""] }));
  }

  function removeService(index: number) {
    setForm((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  }

  function updateFaq(index: number, field: "question" | "answer", value: string) {
    const updated = [...form.faqs];
    updated[index] = { ...updated[index], [field]: value };
    setForm((prev) => ({ ...prev, faqs: updated }));
  }

  function addFaq() {
    setForm((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  }

  function removeFaq(index: number) {
    setForm((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  }

  function handleSubmit() {
    if (!form.type) return;
    const config: PropertyConfig = {
      id: `${form.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
      name: form.name,
      type: form.type,
      location: {
        city: form.city,
        country: form.country,
        address: form.address || undefined,
      },
      language: {
        primary: form.primaryLanguage as PropertyConfig["language"]["primary"],
        supported: [form.primaryLanguage as PropertyConfig["language"]["primary"]],
      },
      companion: {
        name: form.companion_name,
        personality: form.companion_personality,
        greeting: form.companion_greeting.replace("{name}", form.companion_name),
      },
      services: form.services.filter(Boolean),
      faqs: form.faqs.filter((f) => f.question && f.answer),
      contact: {
        phone: form.phone || undefined,
        whatsapp: form.whatsapp || undefined,
        email: form.email || undefined,
      },
    };
    setGeneratedConfig(config);
    setSubmitted(true);
  }

  async function copyConfig() {
    if (!generatedConfig) return;
    await navigator.clipboard.writeText(JSON.stringify(generatedConfig, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const verticalCfg = form.type ? VERTICAL_FORM_CONFIGS[form.type] : null;

  if (submitted && generatedConfig) {
    return (
      <div className="bg-white rounded-xl border border-black/[0.06] p-8 text-center max-w-2xl mx-auto">
        <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-7 h-7 text-[#2D9E6B]" />
        </div>
        <h2 className="font-serif text-[32px] font-normal text-[#1C1917] mb-2">
          Your assistant is ready
        </h2>
        <p className="font-sans text-sm text-[#6B6560] mb-6">
          <strong className="text-[#1C1917]">{generatedConfig.companion.name}</strong> is
          configured for{" "}
          <strong className="text-[#1C1917]">{generatedConfig.name}</strong>. Here&apos;s
          your JSON configuration:
        </p>
        <div className="relative bg-[#1C1917] rounded-xl p-4 text-left mb-6">
          <button
            onClick={copyConfig}
            className="absolute top-3 right-3 flex items-center gap-1.5 text-xs text-[#A8A099] hover:text-[#E8E3DC] transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#2D9E6B]" />
                <span className="text-[#2D9E6B]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </button>
          <pre className="text-xs text-[#A8A099] overflow-auto max-h-64 font-mono">
            {JSON.stringify(generatedConfig, null, 2)}
          </pre>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/demo"
            className="inline-flex items-center gap-2 bg-[#2D9E6B] text-white px-5 py-2.5 rounded-lg text-sm font-sans font-medium hover:bg-[#3DC47F] transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            See demo with this config
          </a>
          <button
            onClick={() => {
              setSubmitted(false);
              setStep(1);
              setForm(defaultForm);
            }}
            className="inline-flex items-center gap-2 border border-black/[0.12] text-[#6B6560] px-5 py-2.5 rounded-lg text-sm font-sans font-medium hover:bg-black/5 transition-colors"
          >
            Configure another hotel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-black/[0.06] p-8 max-w-2xl mx-auto">
      <ProgressBar current={step} total={5} />

      {/* Step 1: Choose vertical */}
      {step === 1 && (
        <div>
          <h2 className="font-sans text-xl font-medium text-[#1C1917] mb-1">
            What type of property are you?
          </h2>
          <p className="font-sans text-sm text-[#6B6560] mb-6">
            Select your property type. The AI profile will be pre-configured for your
            industry.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {VERTICAL_OPTIONS.map(({ value, icon: Icon }) => {
              const cfg = VERTICAL_FORM_CONFIGS[value];
              const selected = form.type === value;
              return (
                <button
                  key={value}
                  onClick={() => selectVertical(value)}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${
                    selected
                      ? "border-[#2D9E6B] bg-emerald-50"
                      : "border-black/[0.08] hover:border-black/20 bg-white"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
                      selected ? "bg-emerald-100" : "bg-black/[0.04]"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        selected ? "text-[#2D9E6B]" : "text-[#6B6560]"
                      }`}
                    />
                  </div>
                  <div
                    className={`text-sm font-medium font-sans ${
                      selected ? "text-[#2D9E6B]" : "text-[#1C1917]"
                    }`}
                  >
                    {cfg.label}
                  </div>
                  <div className="text-xs text-[#A8A099] mt-0.5 leading-snug font-sans">
                    {cfg.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 2: Basic info */}
      {step === 2 && (
        <div>
          <h2 className="font-sans text-xl font-medium text-[#1C1917] mb-1">
            About your property
          </h2>
          <p className="font-sans text-sm text-[#6B6560] mb-6">
            Basic information about your {verticalCfg?.label.toLowerCase() ?? "property"}.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium font-sans text-[#1C1917] mb-1">
                Property name *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="e.g. Hotel La Palma"
                className="w-full border border-black/[0.12] rounded-lg px-3 py-2 text-sm font-sans outline-none focus:ring-2 focus:ring-[#2D9E6B]/20 focus:border-[#2D9E6B] text-[#1C1917] placeholder-[#A8A099]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium font-sans text-[#1C1917] mb-1">
                  City *
                </label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  placeholder="e.g. Paris"
                  className="w-full border border-black/[0.12] rounded-lg px-3 py-2 text-sm font-sans outline-none focus:ring-2 focus:ring-[#2D9E6B]/20 focus:border-[#2D9E6B] text-[#1C1917] placeholder-[#A8A099]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium font-sans text-[#1C1917] mb-1">
                  Country *
                </label>
                <input
                  type="text"
                  value={form.country}
                  onChange={(e) => updateField("country", e.target.value)}
                  placeholder="e.g. France"
                  className="w-full border border-black/[0.12] rounded-lg px-3 py-2 text-sm font-sans outline-none focus:ring-2 focus:ring-[#2D9E6B]/20 focus:border-[#2D9E6B] text-[#1C1917] placeholder-[#A8A099]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium font-sans text-[#1C1917] mb-1">
                Address (optional)
              </label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
                placeholder="e.g. 15 Rue du Marais"
                className="w-full border border-black/[0.12] rounded-lg px-3 py-2 text-sm font-sans outline-none focus:ring-2 focus:ring-[#2D9E6B]/20 focus:border-[#2D9E6B] text-[#1C1917] placeholder-[#A8A099]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: AI companion */}
      {step === 3 && (
        <div>
          <h2 className="font-sans text-xl font-medium text-[#1C1917] mb-1">
            Your AI companion
          </h2>
          <p className="font-sans text-sm text-[#6B6560] mb-6">
            Customize the identity and communication style of your assistant.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium font-sans text-[#1C1917] mb-1">
                Assistant name *
              </label>
              <input
                type="text"
                value={form.companion_name}
                onChange={(e) => updateField("companion_name", e.target.value)}
                placeholder="e.g. Luna, Max, Aria..."
                className="w-full border border-black/[0.12] rounded-lg px-3 py-2 text-sm font-sans outline-none focus:ring-2 focus:ring-[#2D9E6B]/20 focus:border-[#2D9E6B] text-[#1C1917] placeholder-[#A8A099]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium font-sans text-[#1C1917] mb-1">
                Personality & instructions *
              </label>
              <textarea
                rows={4}
                value={form.companion_personality}
                onChange={(e) => updateField("companion_personality", e.target.value)}
                className="w-full border border-black/[0.12] rounded-lg px-3 py-2 text-sm font-sans outline-none focus:ring-2 focus:ring-[#2D9E6B]/20 focus:border-[#2D9E6B] resize-none text-[#1C1917]"
              />
              <p className="text-xs text-[#A8A099] font-sans mt-1">
                Pre-filled based on your property type. Customize as needed.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium font-sans text-[#1C1917] mb-1">
                Opening greeting *
              </label>
              <textarea
                rows={2}
                value={form.companion_greeting}
                onChange={(e) => updateField("companion_greeting", e.target.value)}
                className="w-full border border-black/[0.12] rounded-lg px-3 py-2 text-sm font-sans outline-none focus:ring-2 focus:ring-[#2D9E6B]/20 focus:border-[#2D9E6B] resize-none text-[#1C1917]"
              />
              <p className="text-xs text-[#A8A099] font-sans mt-1">
                Use <code className="font-mono">{"{name}"}</code> to insert the
                assistant&apos;s name.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium font-sans text-[#1C1917] mb-1">
                Primary language
              </label>
              <select
                value={form.primaryLanguage}
                onChange={(e) => updateField("primaryLanguage", e.target.value)}
                className="w-full border border-black/[0.12] rounded-lg px-3 py-2 text-sm font-sans outline-none focus:ring-2 focus:ring-[#2D9E6B]/20 focus:border-[#2D9E6B] text-[#1C1917]"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="pt">Português</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="zh">中文 (Mandarin)</option>
              </select>
              <p className="text-xs text-[#A8A099] font-sans mt-1">
                The assistant will always respond in the guest&apos;s language regardless
                of this setting.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Services & FAQs */}
      {step === 4 && (
        <div>
          <h2 className="font-sans text-xl font-medium text-[#1C1917] mb-1">
            Services & FAQs
          </h2>
          <p className="font-sans text-sm text-[#6B6560] mb-6">
            This information is what your assistant will use to answer guest questions.
          </p>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium font-sans text-[#1C1917] mb-2">
                Available services
              </label>
              <div className="space-y-2">
                {form.services.map((s, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      value={s}
                      onChange={(e) => updateService(i, e.target.value)}
                      placeholder={
                        verticalCfg?.servicePlaceholder ?? "e.g. Wi-Fi available in all areas"
                      }
                      className="flex-1 border border-black/[0.12] rounded-lg px-3 py-2 text-sm font-sans outline-none focus:ring-2 focus:ring-[#2D9E6B]/20 focus:border-[#2D9E6B] text-[#1C1917] placeholder-[#A8A099]"
                    />
                    <button
                      onClick={() => removeService(i)}
                      className="w-9 h-9 flex items-center justify-center text-[#A8A099] hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addService}
                className="mt-2 flex items-center gap-1.5 text-sm font-sans text-[#2D9E6B] hover:text-[#3DC47F] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add service
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium font-sans text-[#1C1917] mb-2">
                Frequently asked questions
              </label>
              <div className="space-y-3">
                {form.faqs.map((faq, i) => (
                  <div key={i} className="bg-black/[0.03] rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium font-sans text-[#6B6560]">
                        Question {i + 1}
                      </span>
                      <button
                        onClick={() => removeFaq(i)}
                        className="text-[#A8A099] hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => updateFaq(i, "question", e.target.value)}
                      placeholder={
                        verticalCfg?.faqQuestionPlaceholder ?? "e.g. What are your opening hours?"
                      }
                      className="w-full border border-black/[0.12] bg-white rounded-lg px-3 py-2 text-sm font-sans outline-none focus:ring-2 focus:ring-[#2D9E6B]/20 focus:border-[#2D9E6B] text-[#1C1917] placeholder-[#A8A099]"
                    />
                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) => updateFaq(i, "answer", e.target.value)}
                      placeholder={
                        verticalCfg?.faqAnswerPlaceholder ?? "Enter the answer here."
                      }
                      className="w-full border border-black/[0.12] bg-white rounded-lg px-3 py-2 text-sm font-sans outline-none focus:ring-2 focus:ring-[#2D9E6B]/20 focus:border-[#2D9E6B] resize-none text-[#1C1917] placeholder-[#A8A099]"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={addFaq}
                className="mt-2 flex items-center gap-1.5 text-sm font-sans text-[#2D9E6B] hover:text-[#3DC47F] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add question
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Contact */}
      {step === 5 && (
        <div>
          <h2 className="font-sans text-xl font-medium text-[#1C1917] mb-1">
            Contact information
          </h2>
          <p className="font-sans text-sm text-[#6B6560] mb-6">
            The assistant will share these details when a guest needs additional help.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium font-sans text-[#1C1917] mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="+1 212 555 0100"
                className="w-full border border-black/[0.12] rounded-lg px-3 py-2 text-sm font-sans outline-none focus:ring-2 focus:ring-[#2D9E6B]/20 focus:border-[#2D9E6B] text-[#1C1917] placeholder-[#A8A099]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium font-sans text-[#1C1917] mb-1">
                WhatsApp
              </label>
              <input
                type="tel"
                value={form.whatsapp}
                onChange={(e) => updateField("whatsapp", e.target.value)}
                placeholder="+1 212 555 0100"
                className="w-full border border-black/[0.12] rounded-lg px-3 py-2 text-sm font-sans outline-none focus:ring-2 focus:ring-[#2D9E6B]/20 focus:border-[#2D9E6B] text-[#1C1917] placeholder-[#A8A099]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium font-sans text-[#1C1917] mb-1">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="info@yourhotel.com"
                className="w-full border border-black/[0.12] rounded-lg px-3 py-2 text-sm font-sans outline-none focus:ring-2 focus:ring-[#2D9E6B]/20 focus:border-[#2D9E6B] text-[#1C1917] placeholder-[#A8A099]"
              />
            </div>
          </div>
          <div className="mt-6 bg-emerald-50 border border-[#2D9E6B]/20 rounded-xl p-4 text-sm font-sans text-[#2D9E6B]">
            <strong>All set.</strong> Click &ldquo;Generate config&rdquo; to get the JSON
            for your hotel, ready to use with the Place Companion API.
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={() => setStep((prev) => Math.max(1, prev - 1) as Step)}
          disabled={step === 1}
          className="text-sm font-sans text-[#6B6560] hover:text-[#1C1917] transition-colors disabled:opacity-30"
        >
          ← Back
        </button>
        {step < 5 ? (
          <button
            onClick={() => setStep((prev) => Math.min(5, prev + 1) as Step)}
            disabled={
              (step === 1 && !form.type) ||
              (step === 2 && (!form.name || !form.city || !form.country)) ||
              (step === 3 && (!form.companion_name || !form.companion_greeting))
            }
            className="bg-[#2D9E6B] text-white px-5 py-2 rounded-lg text-sm font-sans font-medium hover:bg-[#3DC47F] transition-colors disabled:opacity-40"
          >
            Continue →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-[#2D9E6B] text-white px-5 py-2 rounded-lg text-sm font-sans font-medium hover:bg-[#3DC47F] transition-colors"
          >
            Generate config
          </button>
        )}
      </div>
    </div>
  );
}
