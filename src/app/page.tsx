import Link from "next/link";
import {
  BotMessageSquare,
  Globe,
  Settings2,
  Sparkles,
  ChevronRight,
  Zap,
  Star,
  BedDouble,
  HeartPulse,
  Plane,
  Home,
  ShoppingBag,
  GraduationCap,
  Gift,
  Tag,
  MessageSquare,
} from "lucide-react";

const INDUSTRIES = [
  {
    icon: BedDouble,
    title: "Hotels & Resorts",
    description: "Give guests instant answers — 24/7, in their language, without calling the front desk.",
    useCases: ["Guest services", "Room requests", "Local recommendations", "Booking assistance"],
  },
  {
    icon: HeartPulse,
    title: "Hospitals & Clinics",
    description: "Guide patients and visitors through complex facilities with calm, accurate information.",
    useCases: ["Patient navigation", "Appointment info", "Department directions", "Facility FAQs"],
  },
  {
    icon: Plane,
    title: "Airports & Transport",
    description: "Every terminal, every language. Passengers get instant answers without searching for staff.",
    useCases: ["Gate information", "Lounges & retail", "Transport connections", "Terminal services"],
  },
  {
    icon: Home,
    title: "Residential Buildings",
    description: "A 24/7 building assistant that handles requests before they become support tickets.",
    useCases: ["Maintenance requests", "Amenity booking", "Visitor information", "Building announcements"],
  },
  {
    icon: ShoppingBag,
    title: "Shopping Malls & Retail",
    description: "Replace the kiosk. Visitors scan a QR code and instantly get wayfinding, hours, and promotions.",
    useCases: ["Store finder", "Active promotions", "Opening hours", "Customer service"],
  },
  {
    icon: GraduationCap,
    title: "Universities & Campuses",
    description: "One assistant for every student, faculty member, and visitor on campus.",
    useCases: ["Campus navigation", "Events & activities", "Enrollment info", "Department directory"],
  },
];

const FEATURES = [
  {
    icon: BotMessageSquare,
    title: "Vertical-aware AI",
    description:
      "Each space type loads a purpose-built AI profile. A hotel AI companion, a hospital guide, a campus assistant — not a generic chatbot.",
  },
  {
    icon: Globe,
    title: "6 languages",
    description:
      "English, Spanish, Portuguese, French, German, and Mandarin. Visitors get answers in their own language, automatically.",
  },
  {
    icon: Settings2,
    title: "Fully configurable",
    description:
      "Set your space's name, services, personality, FAQs, and contact info. No developers, no integrations.",
  },
  {
    icon: Sparkles,
    title: "Accurate by design",
    description:
      "The AI only answers from your configured data. No hallucinations. No wrong information.",
  },
  {
    icon: Zap,
    title: "Live in minutes",
    description:
      "No code, no complex setup. Configure your space and deploy the same day.",
  },
  {
    icon: Star,
    title: "Better visitor experience",
    description:
      "Instant, accurate answers at any hour reduce staff load and increase satisfaction.",
  },
];

const FOUNDING_BENEFITS = [
  {
    icon: Gift,
    title: "2 Months Free",
    description: "Full access, no credit card required during the founding period.",
  },
  {
    icon: Tag,
    title: "Lifetime Discount",
    description: "Founding partners lock in 40% off standard pricing — forever.",
  },
  {
    icon: MessageSquare,
    title: "Shape the Product",
    description: "Direct access to our team. Your feedback drives our roadmap.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BotMessageSquare className="w-6 h-6 text-emerald-600" />
            <span className="font-semibold text-lg tracking-tight">Place Companion</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            <Link href="#industries" className="hover:text-slate-900 transition-colors">
              Industries
            </Link>
            <Link href="#features" className="hover:text-slate-900 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="hover:text-slate-900 transition-colors">
              How it works
            </Link>
            <Link href="#founding-partners" className="hover:text-slate-900 transition-colors">
              Founding Partners
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/demo"
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              Live demo
            </Link>
            <Link
              href="/onboarding"
              className="text-sm bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-sm font-medium px-3 py-1.5 rounded-full mb-6">
          <Sparkles className="w-4 h-4" />
          AI Companion · 6 languages · Worldwide
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
          Every space,{" "}
          <span className="text-emerald-600">a smarter experience</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Deploy an AI companion for any physical space in minutes. Hotels, hospitals,
          airports, residences and more — in any language, anywhere in the world.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-emerald-700 transition-colors"
          >
            See it live
            <ChevronRight className="w-4 h-4" />
          </Link>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 px-6 py-3 rounded-lg text-base font-medium hover:bg-slate-50 transition-colors"
          >
            Configure your space
          </Link>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Built for every type of space
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              One platform, six purpose-built vertical profiles — each tuned for the
              specific needs of your industry.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES.map((industry) => (
              <div
                key={industry.title}
                className="bg-white rounded-xl p-6 border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
                  <industry.icon className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{industry.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  {industry.description}
                </p>
                <ul className="space-y-1.5">
                  {industry.useCases.map((uc) => (
                    <li key={uc} className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                      {uc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Everything you need to deploy
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              A complete platform built for physical spaces — not retrofitted from a generic chatbot tool.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-xl p-6 border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              From zero to deployed in minutes
            </h2>
            <p className="text-slate-500 text-lg">
              No developers. No integrations. Just configure and go.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                step: "01",
                title: "Choose your space type",
                desc: "Select from 6 verticals. The AI profile is pre-configured for your industry — hotels, hospitals, airports, and more.",
              },
              {
                step: "02",
                title: "Customize your assistant",
                desc: "Give it a name, a personality, and your space's key information: services, FAQs, contact details.",
              },
              {
                step: "03",
                title: "Share the link",
                desc: "Get a unique URL for your space. Deploy via QR code, WhatsApp, email, or embed it directly on your site.",
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center text-sm font-bold mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 text-lg">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founding Partner Program */}
      <section id="founding-partners" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-sm font-medium px-3 py-1.5 rounded-full mb-6">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              Limited availability
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Founding Partner Program
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              We&apos;re selecting 10 spaces to shape the future of Place Companion.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {FOUNDING_BENEFITS.map((b) => (
              <div
                key={b.title}
                className="rounded-xl p-6 border border-slate-100 hover:shadow-md transition-shadow text-center"
              >
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <b.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{b.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-emerald-700 transition-colors"
            >
              Apply to Become a Founding Partner
              <ChevronRight className="w-4 h-4" />
            </Link>
            <p className="text-sm text-slate-400 mt-4">
              10 spots available. Any space type welcome — hotels, hospitals, malls, universities and more.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to upgrade your space?
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            No credit card required. Configure your assistant and go live today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-emerald-400 transition-colors"
            >
              Get started free
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 border border-slate-700 text-slate-300 px-6 py-3 rounded-lg text-base font-medium hover:bg-slate-800 transition-colors"
            >
              See the demo first
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-600">
            <BotMessageSquare className="w-5 h-5 text-emerald-600" />
            <span className="font-medium">Place Companion</span>
          </div>
          <p className="text-sm text-slate-400">
            © 2026 Place Companion. Built for every space.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-400 flex-wrap justify-center">
            <span>English</span>
            <span>Español</span>
            <span>Português</span>
            <span>Français</span>
            <span>Deutsch</span>
            <span>中文</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
