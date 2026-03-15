# REBUILD.md — Place Companion
> Complete codebase reference as of 2026-03-15. A developer with zero prior context should be able to rebuild this from scratch using this document.

---

## 1. Project Overview

**Place Companion** is a SaaS platform that lets hotels (and other hospitality venues) deploy an AI guest assistant in minutes. Operators onboard their property by pasting a URL or text, the AI extracts structured knowledge, and a branded chat widget is generated at `/assistant/[id]`. Operators manage their property, view conversations, and review guest issue logs via a dashboard.

**Stack:**
- Next.js 16.1.6 (App Router, React 19, TypeScript 5)
- Supabase (Postgres + Auth + RLS)
- Vercel AI SDK (`ai` v6, `@ai-sdk/anthropic`) — Claude Haiku 4.5
- Stripe (subscriptions)
- Resend (transactional email alerts)
- Tailwind CSS v4 (utility classes + inline styles)
- Lucide React (icons)
- Google Fonts: Cormorant Garamond (serif) + DM Sans (sans-serif)

---

## 2. Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| Page darkest | `#080706` | Homepage background |
| Onboarding bg | `#1C1917` | Onboarding + assistant page |
| Page dark | `#0F0D0B` | Dashboard, modal backgrounds |
| Nav / footer bg | `#161310` | Footer, nav blur base |
| Card primary | `#1A1715` | Cards, chat bubbles (assistant) |
| Card secondary | `#1F1C19` | User chat bubbles, input bg |
| Card tertiary | `#141210` | Chat headers, form input area |
| Onboarding card | `#242019` | Onboarding chat messages |
| Input bg | `#080706` | Main chat input |
| Input dark | `#2C2720` | File chips bg |
| Border subtle | `rgba(232,227,220,0.06)` | Card borders default |
| Border medium | `rgba(232,227,220,0.08)` | Modal borders, input borders |
| Border visible | `rgba(232,227,220,0.12–0.25)` | Hover states, focus rings |
| Text primary | `#FFFFFF` | Headlines, prices |
| Text warm-white | `#FAF9F5` | Body text primary |
| Text warm | `#E8E3DC` | Subheadings, nav links |
| Text muted | `#A8A099` | Secondary body text |
| Text dimmer | `#9C9A93` | Plan periods, hints |
| Text subtle | `#C4BDB6` | Onboarding helpers |
| Text faint | `#6B6560` | Labels, descriptions |
| Text whisper | `#4A4540` | Bottom notes |
| Text ghost | `#53525D` | Team access note |
| **Orange primary** | `#C96A3A` | CTAs, buttons, progress bar, selected state border |
| **Orange hover** | `#D4784A` | CTA hover |
| Orange selected bg | `#2C1810` | Selected card/button background |
| Orange disabled | `rgba(201,106,58,0.35)` | Disabled send button |
| **Green accent** | `#2D9E6B` | Status badges, checkmarks, active indicators |
| Green badge bg | `#242019` | Status badge background |
| Error red | `#F87171` | Error messages |
| Warning yellow | `#FCD34D` | Trial warning text |

### Typography

```
Serif:  Cormorant Garamond — weights 300, 400, 600, 700 — CSS var: --font-serif
Sans:   DM Sans — weights 300, 400, 500 — CSS var: --font-sans
```

Both fonts loaded via `next/font/google` in `layout.tsx`. Body defaults to `font-sans`.

**Utility heading classes (globals.css):**

| Class | Font-size (clamp) | Line-height |
|---|---|---|
| `.heading-hero` | clamp(2rem, 6vw, 4.5rem) | 1.05 |
| `.heading-section` | clamp(2rem, 5vw, 4.25rem) | 1.1 |
| `.heading-page` | clamp(2.5rem, 7vw, 4rem) | 1.05 |
| `.heading-card` | clamp(1.5rem, 4vw, 2rem) | 1.2 |

**Common inline font sizes:**
- Hero/section headline: heading-* serif
- Card title: 24–28px serif
- Body large: 18px sans / 1.7 line-height
- Body: 15–16px sans
- Label: 14px sans
- Small: 13px sans
- Micro: 11–12px sans / tracking-widest
- Stat number: 28–40px serif / fontWeight 600

### Button Styles

**Primary CTA (orange):**
```css
background: #C96A3A; color: white;
font-family: DM Sans; font-weight: 500;
height: 48px; padding: 0 24px;
border-radius: 8px; font-size: 15px;
hover → background: #D4784A;
```

**Ghost button:**
```css
background: transparent; color: #A8A099;
border: 1px solid rgba(232,227,220,0.15);
border-radius: 8px; padding: 10px 16px; font-size: 14px;
```

**Nav CTA (ghost outline):**
```css
border: 1px solid rgba(255,255,255,0.25);
color: #E8E3DC; height: 40px; padding: 0 20px; border-radius: 6px;
hover → background: rgba(255,255,255,0.05);
```

**Chat send button:**
```css
width/height: 40px; border-radius: 999px;
background: #C96A3A; (disabled: rgba(201,106,58,0.35))
hover → #D4784A;
```

**Suggestion chips:**
```css
background: #1F1C19; border: 1px solid rgba(232,227,220,0.08);
border-radius: 9999px; padding: 8px 16px;
color: #A8A099; font-size: 13px;
hover → color #FAF9F5, border rgba(232,227,220,0.2);
```

### Card Styles

**Standard dashboard card:**
```css
background: #1A1715; border: 1px solid rgba(232,227,220,0.06);
border-radius: 16px; padding: 32px;
hover → border rgba(232,227,220,0.12);
```

**Modal container:**
```css
background: #0F0D0B; border: 1px solid rgba(232,227,220,0.08);
border-radius: 16px; padding: 40px;
overlay: rgba(0,0,0,0.85);
```

**Invoice / Calendly option card:**
```css
background: #1A1715; border: 1px solid rgba(232,227,220,0.06);
border-radius: 12px; padding: 20px 24px;
```

### Onboarding Selected State

Style selector and room-count buttons when selected:
```css
background: #2C1810; border: 1px solid #C96A3A;
```

### Scroll Animations (globals.css)

```css
.animate-scroll-left  { animation: scroll-left  35s linear infinite; }
.animate-scroll-right { animation: scroll-right 25s linear infinite; }
```
Used on the homepage scrolling questions strip.

---

## 3. File Structure

```
placecompanion/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout: fonts, LanguageProvider, pt-16 body wrapper
│   │   ├── globals.css             # Tailwind import, body defaults, heading classes, scroll animations
│   │   ├── page.tsx                # Homepage (client component)
│   │   ├── not-found.tsx           # 404 page
│   │   ├── about/page.tsx          # About page (static marketing)
│   │   ├── demo/page.tsx           # Interactive demo page
│   │   ├── features/page.tsx       # Features marketing page
│   │   ├── privacy/page.tsx        # Privacy policy
│   │   ├── terms/page.tsx          # Terms of service
│   │   ├── onboarding/page.tsx     # 4-step onboarding flow (client)
│   │   ├── auth/
│   │   │   ├── login/page.tsx      # Login page
│   │   │   └── signup/page.tsx     # Signup page
│   │   ├── assistant/[id]/
│   │   │   ├── page.tsx            # Server: fetch property → AssistantClient
│   │   │   └── AssistantClient.tsx # Guest-facing chat widget
│   │   ├── dashboard/
│   │   │   ├── page.tsx            # Server: fetch properties + open issue counts
│   │   │   ├── DashboardClient.tsx # Property grid, invoice modal, upgrade modal
│   │   │   └── properties/[id]/
│   │   │       ├── page.tsx        # Server: fetch property, conversations, issues
│   │   │       └── PropertyClient.tsx # Tabbed property manager (Overview + Issues)
│   │   └── api/
│   │       ├── chat/route.ts           # Demo chat endpoint (no DB)
│   │       ├── extract/route.ts        # URL/PDF/text → structured hotel data
│   │       ├── preview-chat/route.ts   # Onboarding step 3 preview chat (no DB)
│   │       ├── assistant/[id]/route.ts # Live assistant with DB logging + issue alerts
│   │       └── stripe/
│   │           ├── checkout/route.ts   # Create Stripe checkout session
│   │           └── webhook/route.ts    # Handle Stripe events → update properties table
│   ├── components/
│   │   ├── site-nav.tsx            # Sticky top nav with hide-on-scroll, language toggle, mobile drawer
│   │   ├── site-footer.tsx         # Footer with links and language toggle
│   │   ├── chat-interface.tsx      # Reusable chat widget (homepage/demo)
│   │   ├── faq-section.tsx         # FAQ accordion
│   │   ├── final-cta.tsx           # Marketing final CTA section
│   │   ├── inline-demo.tsx         # Inline interactive demo
│   │   ├── onboarding-form.tsx     # Legacy (onboarding now in onboarding/page.tsx)
│   │   ├── UpgradeModal.tsx        # Stripe subscription upgrade modal
│   │   ├── CalendlyModal.tsx       # Calendly call booking modal
│   │   └── LanguageToggle.tsx      # EN · ES toggle button pair
│   ├── lib/
│   │   ├── build-system-prompt.ts  # Builds AI system prompt per vertical from PropertyConfig
│   │   ├── demo-config.ts          # Re-exports marazulConfig as demoConfig
│   │   ├── marazul-config.ts       # MarAzul demo hotel config + ChatConfig
│   │   ├── vertical-configs.ts     # Per-vertical form defaults and suggestion chips
│   │   ├── i18n/
│   │   │   ├── translations.ts     # EN + ES translation keys (full i18n object)
│   │   │   └── LanguageContext.tsx # React context: lang state, localStorage, browser detection
│   │   └── supabase/
│   │       ├── client.ts           # Browser Supabase client (anon key)
│   │       ├── server.ts           # Server Supabase client (cookie-based, anon key)
│   │       ├── service.ts          # Service role client (bypasses RLS — server only)
│   │       └── schema.sql          # Core DB schema with RLS policies
│   ├── middleware.ts               # Auth middleware: protect /dashboard, redirect logged-in from /auth
│   └── types/
│       └── property.ts             # Types: PropertyConfig, ChatMessage, SpaceVertical, SupportedLanguage
├── next.config.ts                  # Empty Next.js config (no customizations)
├── package.json
└── REBUILD.md
```

---

## 4. Pages

### `/` — Homepage (`src/app/page.tsx`)
Client component. Sections in order:
1. **Hero**: Two-column. Left: headline + subhead + CTA. Right: live MarAzul demo chat (hidden on mobile).
2. **Scrolling questions strip**: Two rows infinite scroll (`.animate-scroll-left` / `.animate-scroll-right`).
3. **$47B stats section**: Single Medallia stat. `py-32`, flex column centered. Source color `#6B6560`.
4. **Revenue simulation**: Interactive upsell revenue calculator.
5. **How it works**: 3-step grid (`01 / 02 / 03`).
6. **Features grid**: Marketing features.
7. **Destination intelligence**: YOUR HOTEL / YOUR DESTINATION comparison.
8. **Pricing section** (`id="pricing"`): Pricing cards.
9. **Enterprise bar**: "Let's talk →" / "Hablemos →" ghost CTA.
10. **Destination bar**: Ghost CTA matching enterprise style.
11. **FAQ section**: `<FaqSection />`.
12. **Final CTA**: `<FinalCta />`.
13. **Footer**: `<SiteFooter />`.

Sticky bottom enterprise bar appears at `window.scrollY > 400`.

---

### `/features` — Features page (`src/app/features/page.tsx`)
Static marketing. Sections:
- Hero: `min-h-screen flex flex-col items-center justify-center pt-24 md:pt-32 pb-24 md:pb-32`
- Personality style cards: name 16px/500, tagline 14px/`#6B6560`
- Always On Duty: title 17px/500, desc 15px/1.7/`#6B6560`
- Intelligence section: YOUR HOTEL/DESTINATION labels `color: #FAF9F5`
- Bottom CTA button: `background: #C96A3A`, `hover: #D4784A`, `color: white`

---

### `/demo` — Demo page (`src/app/demo/page.tsx`)
Interactive chat demo using `<ChatInterface>` with MarAzul config. Trust line: `fontSize: 14px, color: #A8A099`.

---

### `/about` — About page (`src/app/about/page.tsx`)
Static marketing. Uses i18n keys: `whyHeadline`, `whyP1`, `whyP2`, `genericHeadline`, `genericBody`, `destinationBody`, `notHeadline`, `notItems`, `visionBody`. Background `#0F0D0B`, pill labels.

---

### `/onboarding` — Onboarding (`src/app/onboarding/page.tsx`)
4-step flow, all client-side. Background `#1C1917` (`.onboarding-page` class).

**Step 1 — Input:**
- URL input, PDF drag-and-drop upload, textarea for additional info
- Style selector: 5 cards (warm_local, refined_concierge, barefoot_luxury, playful_explorer, zen_mindful) — selected state: `bg #2C1810, border #C96A3A`
- Room count selector: 4 pills (Under 40 / 41–200 / 200+ / Multiple) — same selected style
- "Analyze" button: `#C96A3A` (disabled: `#6B6560` when all inputs empty)
- Progress bar: `#C96A3A`

**Step 2 — Extraction animation:**
- 6 items animate in sequentially (600ms delay each): hotelName, restaurant, spa, amenities, policies, nearby
- On completion → auto-advances to Step 3

**Step 3 — Preview chat:**
- Live chat against `/api/preview-chat` using extracted data
- User messages: `bg #2D9E6B` (green). Assistant: `bg #242019`
- "Build my assistant" button → Step 4

**Step 4 — Account creation:**
- Email + password inputs → `supabase.auth.signUp()`
- Then `properties.insert()` with extracted data + system prompt + conversational style
- Redirect to `/dashboard`

---

### `/assistant/[id]` — Guest assistant
Server fetches property by `id` (must be `is_active = true`). Renders `<AssistantClient>`. 404 if not found.

Chat widget features:
- Session ID: `Math.random().toString(36).slice(2)` in `useRef` (resets on page refresh)
- Dynamic suggestion chips from `system_prompt + extracted_data` keyword matching (spa/dining/beach/wifi)
- Streams from `/api/assistant/[id]`
- "← Back to dashboard" shown only if Supabase session exists
- Background `#1C1917`; card `#0F0D0B`

---

### `/dashboard` — Dashboard
Server component. Fetches properties with `conversations(count)` + `messages(count)` aggregates, then fetches `issue_logs` with `status = 'open'` to compute `openIssueCount` per property. Passes merged data to `<DashboardClient>`.

---

### `/dashboard/properties/[id]` — Property Manager
Server fetches property (ownership check), last 50 conversations, last 100 issue_logs. Renders `<PropertyClient>`.

---

### `/auth/login` and `/auth/signup`
Standard Supabase auth. Middleware redirects logged-in users away.

---

## 5. Components

### `<SiteNav>` (`src/components/site-nav.tsx`)
- Fixed top, `z-50`, `backdrop-blur-xl`, `bg-[rgba(28,25,23,0.92)]`, `border-b`
- Hides on scroll down (via `-translate-y-full`), reappears on scroll up or at `y < 60`
- **Desktop:** logo · nav links · Sign In · See Demo · Create Assistant · `<LanguageToggle>`
- **Mobile header row:** logo · `<LanguageToggle>` · hamburger (all on same row, always visible)
- **Mobile drawer:** nav links + Demo / Sign In / Create CTAs + `<LanguageToggle>` centered

---

### `<SiteFooter>` (`src/components/site-footer.tsx`)
- `bg-[#161310]`, border-top `rgba(232,227,220,0.06)`
- Logo + tagline left; link grid center; `<LanguageToggle>` right
- Links: Features, How It Works, Pricing, Demo, About, Founding Partners, Privacy, Terms

---

### `<ChatInterface>` (`src/components/chat-interface.tsx`)
Reusable chat widget for homepage and `/demo`.

**Props (`ChatConfig` interface):**
```typescript
{
  hotelName: string
  assistantName: string
  collection: string
  systemPrompt: string
  suggestionChips?: string[]
  placeholder?: string
  mobileChipsLimit?: number  // hides chips above this index on mobile
  greeting?: string
}
```

- POSTs to `/api/chat`
- On `429` rate-limit → shows conversion CTA card with `/onboarding` link
- Custom markdown renderer: bold, italic, inline code, bullet lists
- Send button: `#C96A3A` / hover `#D4784A` / disabled `rgba(201,106,58,0.35)`

---

### `<UpgradeModal>` (`src/components/UpgradeModal.tsx`)
**Props:** `propertyId: string`, `userId: string`, `onClose: () => void`

Two hardcoded plans (see Section 12). Coupon `FOUNDING40` → 40% off. Calls `/api/stripe/checkout`. ESC key closes.

---

### `<CalendlyModal>` (`src/components/CalendlyModal.tsx`)
**Props:** `onClose: () => void`

Two Calendly options:
- 15 min discovery: `calendly.com/placecompanion/15-minute-discovery-call`
- 30 min full demo: `calendly.com/placecompanion/30min`

Label color: 15min → `#2D9E6B`; 30min → `#C96A3A`.

---

### `<LanguageToggle>` (`src/components/LanguageToggle.tsx`)
EN · ES toggle pair. Active: `color: #E8E3DC, fontWeight: 500`. Inactive: `color: #6B6560`. Persists to `localStorage` key `pc_lang`.

---

### `<DashboardClient>` (`src/app/dashboard/DashboardClient.tsx`)
**Props:** `user: any`, `properties: any[]`

Features:
- Property cards: name, location, orange `openIssueCount` badge (`● X open issues`), trial/canceled/past_due banners, stats row (conversations / questions / days left `∞` if active), View Assistant + Manage + Upgrade buttons
- "Get Invoice" → invoice modal (`#0F0D0B` bg, CFDI MX + International option cards, Google Forms links, arrow SVG `stroke: #6B6560`)
- Upgrade button → `<UpgradeModal>`
- Team access note + Calendly CTA → `<CalendlyModal>`

---

### `<PropertyClient>` (`src/app/dashboard/properties/[id]/PropertyClient.tsx`)
**Props:** `property: any`, `conversations: any[]`, `issues: any[]`

Two tabs with orange underline active indicator:
- **Overview**: deploy instructions, conversation list, revenue signals, property settings
- **Issues** (+ count badge): dark table — Date/Time · Guest Message · Room · Status · Action
  - Open: `rgba(201,106,58,0.15)` bg / `#C96A3A` text
  - Resolved: `rgba(45,158,107,0.15)` bg / `#2D9E6B` text
  - Mark Resolved: optimistic UI update, PATCH to `issue_logs`

---

## 6. API Routes

### `POST /api/chat`
Demo/homepage chat. No DB.

**Body:** `{ messages, propertyConfig? }`
**Model:** `claude-haiku-4-5-20251001`, `maxOutputTokens: 1024`
Normalizes both `content` string and `parts` array message formats. Falls back to `demoConfig`.

---

### `POST /api/extract`
Extracts structured hotel data.

**Body:** `{ url?, text?, files?: [{ name, base64 }] }`

**Response:** `{ extracted: { hotelName, restaurant, spa, amenities, policies, nearby, location, summary, systemPrompt } }`

URL scraped with 10s timeout, stripped to 12,000 chars. PDF files received but not parsed (stub). Combined input truncated to 20,000 chars. Model: `claude-haiku-4-5-20251001`.

---

### `POST /api/preview-chat`
Onboarding step 3. No DB.

**Body:** `{ messages, extracted, conversationalStyle? }`
**Model:** `claude-haiku-4-5-20251001`, `maxOutputTokens: 512`

---

### `POST /api/assistant/[id]`
Live production assistant. Full DB read/write.

**Body:** `{ messages, sessionId }`

**Flow:**
1. Fetch property (`is_active = true`)
2. Compose system prompt: `system_prompt + COMMUNICATION STYLE + HALLUCINATION_GUARDRAIL + FALLBACK_BEHAVIOR + ISSUE_HANDLING`
3. Find or create `conversations` row by `(property_id, guest_session_id)`
4. Save user message with `revenue_signal`
5. Stream response
6. `onFinish`: save assistant message; detect issues → email alert via Resend + fire-and-forget insert to `issue_logs` via service client

**Issue keywords (EN + ES):** broken, not working, issue, problem, maintenance, leak, no hot water, no water, no electricity, no wifi, wifi not working, air conditioning, ac, toilet, emergency, help, stuck, locked out + Spanish equivalents.

**Revenue signals:** spa → `spa`, restaurant/dining → `restaurant`, tour/activity → `activity`, transport/taxi → `transport`, checkout/late → `late_checkout`, upgrade/room → `room_upgrade`.

**Conversational styles:**
| Key | Description |
|---|---|
| `warm_local` | Warm local friend, personal |
| `refined_concierge` | Five-star polish |
| `barefoot_luxury` | Luxury beach resort |
| `playful_explorer` | Fun, emojis, adventurous |
| `zen_mindful` | Calm, unhurried |

---

### `POST /api/stripe/checkout`
**Body:** `{ priceId, coupon?, propertyId, userId }`
**Returns:** `{ url }` — Stripe hosted checkout redirect.
Success: `/dashboard?success=true` · Cancel: `/dashboard?canceled=true`

---

### `POST /api/stripe/webhook`
Uses **service role** Supabase client. Verifies Stripe signature.

| Event | Action |
|---|---|
| `checkout.session.completed` | Set `subscription_status = 'active'`, save Stripe IDs |
| `customer.subscription.deleted` | Set `subscription_status = 'canceled'` |
| `invoice.payment_failed` | Set `subscription_status = 'past_due'` |

---

## 7. Database Schema

> Run `src/lib/supabase/schema.sql` first. Then add the additional columns and `issue_logs` table below.

### `public.properties`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | `uuid_generate_v4()` |
| `user_id` | uuid FK | → `auth.users(id)` ON DELETE CASCADE |
| `hotel_name` | text NOT NULL | |
| `location` | text | |
| `room_count` | text | |
| `extracted_data` | jsonb NOT NULL | Raw extraction result |
| `system_prompt` | text NOT NULL | Built during onboarding |
| `conversational_style` | text | One of 5 style keys |
| `is_active` | boolean | Default `true` |
| `trial_started_at` | timestamptz | Default `now()` |
| `trial_ends_at` | timestamptz | Default `now() + 14 days` |
| `subscription_status` | text | `trial` / `active` / `canceled` / `past_due` |
| `stripe_customer_id` | text | Set by webhook |
| `stripe_subscription_id` | text | Set by webhook |
| `subscription_price_id` | text | Set by webhook |
| `alert_email` | text | Where issue alert emails are sent |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |

**RLS:** Owner full CRUD via `user_id = auth.uid()`. Public can SELECT where `is_active = true`.

> ⚠️ `schema.sql` does not include: `conversational_style`, `alert_email`, `subscription_*`, `stripe_*`. Add these manually.

---

### `public.conversations`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `property_id` | uuid FK | → `properties(id)` CASCADE |
| `guest_session_id` | text NOT NULL | Random string from client |
| `language_detected` | text | Default `'en'` |
| `started_at` | timestamptz | |
| `last_message_at` | timestamptz | |
| `message_count` | integer | |

**RLS:** Owner SELECT via property join. Public INSERT + UPDATE.

---

### `public.messages`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `conversation_id` | uuid FK | → `conversations(id)` CASCADE |
| `property_id` | uuid FK | → `properties(id)` CASCADE |
| `role` | text | CHECK: `'user'` or `'assistant'` |
| `content` | text NOT NULL | |
| `revenue_signal` | text | Nullable |
| `created_at` | timestamptz | |

**RLS:** Owner SELECT via property join. Public INSERT.

---

### `public.issue_logs` (must be created manually)

```sql
CREATE TABLE IF NOT EXISTS public.issue_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id uuid REFERENCES public.properties(id) ON DELETE CASCADE,
  guest_message text NOT NULL,
  room_number text,
  status text DEFAULT 'open',
  created_at timestamptz DEFAULT now(),
  resolved_at timestamptz,
  resolved_by text
);
ALTER TABLE public.issue_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own property issues"
  ON public.issue_logs FOR SELECT
  USING (property_id IN (SELECT id FROM public.properties WHERE user_id = auth.uid()));
CREATE POLICY "Service role full access to issue_logs"
  ON public.issue_logs FOR ALL USING (true);
```

Status values: `open` / `resolved`.

---

## 8. i18n System

**Supported:** `en`, `es`

**Location:** `src/lib/i18n/translations.ts`

**Top-level keys:**
```
nav, hero, howItWorks, features, about, demo, pricing, finalCta, faq,
footer, auth, onboarding, dashboard, property
```

**Usage:**
```typescript
import { useLang } from '@/lib/i18n/LanguageContext'
const { t, lang, setLang } = useLang()
// t.dashboard.addProperty, t.nav.features, etc.
```

`LanguageProvider` wraps entire app in `layout.tsx`. On mount, reads `localStorage['pc_lang']`; if missing, detects from `navigator.language` (Spanish if starts with `es`, else English).

---

## 9. Environment Variables

| Variable | Required | Used in |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | All Supabase clients + middleware |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Browser + server clients + middleware |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | `service.ts`, Stripe webhook |
| `ANTHROPIC_API_KEY` | ✅ | All AI routes |
| `STRIPE_SECRET_KEY` | ✅ | Stripe checkout + webhook |
| `STRIPE_WEBHOOK_SECRET` | ✅ | Webhook signature verification |
| `RESEND_API_KEY` | ✅ | Issue alert emails |
| `NEXT_PUBLIC_SITE_URL` | Optional | Stripe success/cancel URL fallback |

---

## 10. Middleware (`src/middleware.ts`)

Runs on `/dashboard/:path*` and `/auth/:path*`.

- No session + `/dashboard/**` → redirect to `/auth/login`
- Has session + `/auth/login` or `/auth/signup` → redirect to `/dashboard`

Uses `@supabase/ssr` `createServerClient` with cookie passthrough pattern.

---

## 11. Verticals (`src/lib/vertical-configs.ts`)

Six supported verticals (`SpaceVertical` union type):

| Key | Label |
|---|---|
| `hotel_resort` | Hotels & Resorts |
| `hospital_clinic` | Hospitals & Clinics |
| `airport_transport` | Airports & Transport |
| `residential` | Residential Buildings |
| `shopping_retail` | Shopping Malls & Retail |
| `university_campus` | Universities & Campuses |

Each has: `label`, `description`, `visitorLabel`, `defaultPersonality`, `defaultGreeting`, `servicePlaceholder`, `faqQuestionPlaceholder`, `faqAnswerPlaceholder`, `suggestions[]`.

The system prompt builder (`build-system-prompt.ts`) selects per-vertical instructions. Onboarding only surfaces `hotel_resort` in the UI, but the backend fully supports all six.

---

## 12. Subscription Plans

Hardcoded in `<UpgradeModal>`:

| Plan | Price | Stripe Price ID |
|---|---|---|
| Single Property | $299/mo | `price_1TALsJBgMSWbEFIIFMFSR5Nz` |
| Small Group | $549/mo | `price_1TALnGBgMSWbEFIIYeCYeBfT` |

Founding partner coupon: `FOUNDING40` → 40% off forever. Client-side check only — actual discount enforced by Stripe coupon object with same ID.

---

## 13. Demo Config — MarAzul (`src/lib/marazul-config.ts`)

Fictional hotel used for all demos on the homepage and `/demo`.

- **Hotel:** MarAzul Riviera Maya
- **Assistant name:** Marina
- **Type:** `hotel_resort`, Riviera Maya, Mexico
- **Services:** Casa Marina Restaurant, Spa Ixchel, beach club, rooftop bar, pool, gym, nearby attractions
- **FAQs:** breakfast, surf lessons, pool hours, pharmacy
- **Suggestion chips:** 5 (mix EN/ES)

`marazulChatConfig` adds `hotelName`, `assistantName`, `collection`, `mobileChipsLimit: 2` for `<ChatInterface>`.

---

## 14. Breakpoints

Standard Tailwind:
- `sm:` (640px) — chip visibility, email in dashboard header
- `md:` (768px) — most layout splits, nav hamburger → desktop
- `lg:` (1024px) — hero two-column grid

---

## 15. Things That Are Easy to Break

### ⚠️ `issue_logs` table must be created manually
Not in `schema.sql`. Must be run separately in Supabase SQL Editor (see Section 7). If missing, issue logging silently fails (fire-and-forget). Everything else still works.

### ⚠️ `properties` has columns not in `schema.sql`
Production uses: `conversational_style`, `alert_email`, `subscription_status`, `stripe_customer_id`, `stripe_subscription_id`, `subscription_price_id`. These are not in the schema file. Add them with `ALTER TABLE` when setting up a fresh database.

### ⚠️ `SUPABASE_SERVICE_ROLE_KEY` must never go client-side
`src/lib/supabase/service.ts` is only safe in server-side code (API routes). Importing it in a client component would expose it to the browser. Bypasses all RLS.

### ⚠️ Stripe webhook secret mismatch = silent failures
Subscriptions will never activate if `STRIPE_WEBHOOK_SECRET` is wrong or missing. The route returns 400 and Stripe retries. Check logs for `[stripe/webhook] signature verification failed`.

### ⚠️ Supabase email confirmation
If Supabase's "Confirm email" is enabled, `signUp()` creates the user but doesn't log them in immediately. The redirect to `/dashboard` will fail. Disable email confirmation or handle the unconfirmed state.

### ⚠️ `alert_email` must be set manually on the property
Not collected during onboarding. If `alert_email` is null, issue email alerts are silently skipped (`if (property.alert_email)`). Set directly in Supabase or via a future settings screen.

### ⚠️ Fire-and-forget issue_log insert
`Promise.resolve(serviceSupabase.from('issue_logs').insert(...)).then().catch()` — never throws, never blocks. If the service role key is wrong, issues silently fail. Watch for `[issue_log] insert error:` in server logs.

### ⚠️ Supabase `PromiseLike` vs `Promise`
Supabase returns a `PromiseLike`, not a full `Promise`. Calling `.catch()` directly on a Supabase query result causes a TypeScript error. Always wrap in `Promise.resolve(...)` before chaining `.then().catch()`.

### ⚠️ Never use inline `position` style in TypeScript
`style={{ position: 'absolute' }}` causes a TS type error. Use Tailwind `className="absolute"` or `className="relative"` instead. This pattern is applied consistently throughout the codebase.

### ⚠️ Public SELECT policy exposes system prompts
Any `is_active = true` property is publicly readable, including `system_prompt` and `extracted_data`. This is intentional (guest chat requires it) but means hotel system prompts are not private.

### ⚠️ PDF parsing is a stub
`/api/extract` accepts PDFs but does not parse them. They are logged as `[PDF UPLOAD: name — processing not available]`. Users who upload PDFs expecting extraction will get no content from them.

### ⚠️ Guest session ID is ephemeral
`sessionId` is created with `Math.random()` in a `useRef`. Refreshing the page creates a new conversation row. There is no persistent guest identity.

---

## 16. Local Development

```bash
npm install
npm run dev   # http://localhost:3000
```

**`.env.local`:**
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Stripe webhooks locally:**
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```
The CLI outputs a webhook signing secret — use that as `STRIPE_WEBHOOK_SECRET`.

**TypeScript check:**
```bash
npx tsc --noEmit
```
