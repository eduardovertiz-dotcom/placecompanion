# REBUILD.md — Place Companion
> Complete codebase reference as of 2026-03-15. A developer with zero prior context should be able to rebuild this from scratch using this document.

---

## 1. Project Overview

**Place Companion** (`placecompanion.com`) is a SaaS platform that lets hotels deploy an AI guest assistant in minutes. Operators onboard their property by pasting a URL, uploading a PDF, or writing a description. The AI extracts structured hotel knowledge, builds a system prompt, and generates a public chat widget at `/assistant/[id]`. Operators manage analytics, guest issues, deploy links, and settings via a private dashboard.

**Stack:**
- Next.js 16.1.6 (App Router, server + client components)
- React 19, TypeScript 5
- Tailwind CSS v4 (via `@tailwindcss/postcss`)
- Supabase (auth + database, using `@supabase/ssr`)
- Anthropic Claude Haiku 4.5 via `@ai-sdk/anthropic` + Vercel AI SDK
- Stripe for subscriptions
- Resend for email alerts
- Recharts for analytics charts

---

## 2. Design System

### 2.1 Color Tokens
All colors are applied via inline `style={{ color: '...' }}` or Tailwind arbitrary values. No `tailwind.config.ts` color extensions.

| Token Name | Hex | Usage |
|---|---|---|
| `background-dark` | `#141413` | Global page background (`body`, marketing pages) |
| `background-page` | `#141413` | Features, About pages |
| `background-card` | `#1A1715` | Card backgrounds, sidebar selected state, chat bubbles |
| `background-input` | `#0F0D0B` | Onboarding inputs, chat message area |
| `background-input-alt` | `#242019` | Step 2 input fields, chat input bg |
| `background-deeper` | `#161310` | Announcement bar, footer, dashboard header |
| `background-onboarding` | `#1C1917` | Onboarding page, auth pages |
| `background-elevated` | `#1F1C19` | User chat bubbles, suggestion chips |
| `background-muted` | `#141210` | Chat input bar |
| `background-dark-nav` | `rgba(28,25,23,0.92)` | Nav backdrop blur |
| `orange-primary` | `#C96A3A` | Primary CTA, active states, issue badges, selected borders |
| `orange-hover` | `#D4784A` | Orange button hover state |
| `orange-dim` | `rgba(201,106,58,0.35)` | Disabled send button |
| `orange-bg` | `#2C1810` | Selected style card background, onboarding selected state |
| `green-primary` | `#2D9E6B` | Live indicator dot, success states, sign-in buttons, resolution badges |
| `text-primary` | `#FAF9F5` | Primary headings on dark backgrounds |
| `text-heading` | `#E8E3DC` | Page headings, input labels, chat text |
| `text-secondary` | `#A8A099` | Nav links, body text, secondary labels |
| `text-muted` | `#9C9A93` | Subheadings, body copy on landing |
| `text-dim` | `#6B6560` | Placeholder text, dim labels, footer links |
| `text-faint` | `#4A4540` | Sidebar section labels, very dim text |
| `text-disabled` | `#53525D` | Team access note |
| `border-subtle` | `rgba(232,227,220,0.06)` | Card borders, dividers |
| `border-light` | `rgba(232,227,220,0.08)` | Input borders, panel borders |
| `border-medium` | `rgba(232,227,220,0.15)` | Button borders, nav CTA border |
| `border-active` | `rgba(232,227,220,0.25)` | Input focus border, hover border |
| `warning-yellow` | `#FCD34D` | Trial warning banners |
| `error-red` | `#F87171` / `#EF4444` | Error messages |

### 2.2 Typography
Two Google Fonts loaded in `layout.tsx` via `next/font/google`:

| Variable | Font | Weights | CSS var |
|---|---|---|---|
| `cormorantGaramond` | Cormorant Garamond | 300, 400, 600, 700 | `--font-serif` |
| `dmSans` | DM Sans | 300, 400, 500 | `--font-sans` |

Applied on `<body>`: `className="${cormorantGaramond.variable} ${dmSans.variable} font-sans antialiased"`

**Heading utility classes** (defined in `globals.css`):
```css
.heading-hero   { font-size: clamp(2rem, 6vw, 4.5rem); line-height: 1.05; }
.heading-section { font-size: clamp(2rem, 5vw, 4.25rem); line-height: 1.1; }
.heading-page   { font-size: clamp(2.5rem, 7vw, 4rem); line-height: 1.05; }
.heading-card   { font-size: clamp(1.5rem, 4vw, 2rem); line-height: 1.2; }
```

### 2.3 Button Styles

| Button Type | Background | Color | Border-radius | Height | Font size |
|---|---|---|---|---|---|
| Primary CTA (nav) | `#C96A3A` | white | `8px` | `48px` | `15px`, weight 600 |
| Primary CTA (form) | `#C96A3A` / `#2D9E6B` | white | `6px`–`12px` | `48px`–`56px` | `16px` |
| Ghost CTA (nav) | transparent | `#A8A099` | `8px` | `36px` | `13px` |
| Sign In link | transparent | `#6B6560` | — | — | `13px` |
| Dashboard Upgrade | `#C96A3A` | `#FAF9F5` | `8px` | auto | `14px` |
| Send button (chat) | `#C96A3A` active / `rgba(201,106,58,0.35)` disabled | `#FAF9F5` | `999px` | `40px` | — |
| Issue action | transparent | `#A8A099` | `6px`–`8px` | auto | `12px`–`13px` |

### 2.4 Card Styles
Standard card:
```
background: '#1A1715'
border: '1px solid rgba(232,227,220,0.06)'
borderRadius: '12px' or '16px'
padding: '24px'
```

Modal card:
```
background: '#0F0D0B'
border: '1px solid rgba(232,227,220,0.08)'
borderRadius: '16px'
```

### 2.5 CSS Animations (`globals.css`)
| Name | Description |
|---|---|
| `fade-up` | Opacity 0→1, translateY 20px→0 |
| `scroll-left` | Marquee scroll left, 22s |
| `scroll-right` | Marquee scroll right, 38s |
| `pulse-ring` | Box-shadow orange pulse ring |
| `pc-arrow-pulse` | translateX 0→-4px, opacity 1→0.6, 2s |
| `pc-btn-blink` | Outline color blinks orange, 1.2s |
| `pc-dot-pulse` | Opacity 1→0.3, 2s (green live dot) |

**`.marquee-row`**: `display:flex; gap:1rem; width:max-content` — hover pauses animation.
**`.marquee-chip:hover`**: `background: #2C1810; border-color: rgba(201,106,58,0.4); color: #FAF9F5`

---

## 3. File Structure

```
placecompanion/
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout: fonts, LanguageProvider, AnnouncementBar, pt-24 wrapper
│   │   ├── globals.css              # Tailwind import, body bg, heading classes, all @keyframes
│   │   ├── page.tsx                 # Marketing homepage (all sections)
│   │   ├── not-found.tsx            # 404 page
│   │   ├── favicon.ico
│   │   ├── about/page.tsx           # About page
│   │   ├── features/page.tsx        # Features deep-dive page
│   │   ├── demo/page.tsx            # Live demo page
│   │   ├── privacy/page.tsx         # Privacy policy
│   │   ├── terms/page.tsx           # Terms of service
│   │   ├── onboarding/page.tsx      # 4-step onboarding flow
│   │   ├── auth/
│   │   │   ├── login/page.tsx       # Login form (email + password)
│   │   │   └── signup/page.tsx      # Signup form (hotel name + email + password)
│   │   ├── dashboard/
│   │   │   ├── page.tsx             # Server component: auth check, data fetch, passes to DashboardClient
│   │   │   └── DashboardClient.tsx  # Full dashboard UI (client component)
│   │   ├── assistant/[id]/
│   │   │   ├── page.tsx             # Server: fetch property by id, pass to AssistantClient
│   │   │   └── AssistantClient.tsx  # Public chat widget UI
│   │   └── api/
│   │       ├── chat/route.ts        # POST: general chat (demo/preview), streams Claude
│   │       ├── extract/route.ts     # POST: scrape URL or parse text → structured hotel JSON
│   │       ├── preview-chat/route.ts # POST: onboarding step 3 chat with extracted data
│   │       ├── assistant/[id]/route.ts # POST: production chat for deployed property
│   │       └── stripe/
│   │           ├── checkout/route.ts  # POST: create Stripe checkout session
│   │           └── webhook/route.ts   # POST: handle Stripe events (subscription lifecycle)
│   ├── components/
│   │   ├── AnnouncementBar.tsx      # Dismissable top bar (hides on /dashboard, /auth, /assistant)
│   │   ├── CalendlyModal.tsx        # Modal with 15-min / 30-min Calendly links
│   │   ├── ChatInterface.tsx        # Reusable chat widget for demo/homepage
│   │   ├── LanguageToggle.tsx       # EN · ES toggle buttons
│   │   ├── UpgradeModal.tsx         # Stripe subscription modal with 2 plans + coupon
│   │   ├── faq-section.tsx          # FAQ accordion (used on homepage)
│   │   ├── final-cta.tsx            # Bottom CTA section component
│   │   ├── inline-demo.tsx          # Inline demo embed
│   │   ├── onboarding-form.tsx      # (Legacy/unused — superseded by onboarding/page.tsx)
│   │   ├── site-footer.tsx          # Footer with links and LanguageToggle
│   │   └── site-nav.tsx             # Sticky nav with hide-on-scroll, mobile drawer, LanguageToggle
│   ├── lib/
│   │   ├── build-system-prompt.ts   # Builds AI system prompts per vertical type
│   │   ├── demo-config.ts           # Demo property config for homepage chat
│   │   ├── marazul-config.ts        # Marazul hotel config (used as homepage demo)
│   │   ├── vertical-configs.ts      # Vertical-specific config templates
│   │   ├── i18n/
│   │   │   ├── translations.ts      # Full EN + ES string dictionary
│   │   │   └── LanguageContext.tsx  # React context: lang, t, setLang
│   │   └── supabase/
│   │       ├── client.ts            # createClient() — browser client (anon key)
│   │       ├── server.ts            # createClient() — server client (cookie-based)
│   │       ├── service.ts           # createServiceClient() — service role key (bypass RLS)
│   │       └── schema.sql           # Full Supabase schema definition
│   ├── types/
│   │   └── property.ts              # PropertyConfig, ChatMessage, SpaceVertical, SupportedLanguage types
│   └── middleware.ts                # Auth middleware: protect /dashboard, redirect /auth if logged in
├── next.config.ts                   # Empty Next.js config
├── package.json
└── tsconfig.json
```

---

## 4. Components Reference

### `AnnouncementBar`
**File:** `src/components/AnnouncementBar.tsx`
**Props:** none
**Behavior:**
- Hidden on `/dashboard`, `/assistant/*`, `/auth/*` (checked via `usePathname`)
- Dismisses to localStorage key `pc_announcement_dismissed`
- Renders `null` until `useEffect` runs (prevents hydration flash)
- Mobile: shows short version ("4 of 10 spots left — Lock in 20% off →") in `flex md:hidden`
- Desktop: shows full version ("Founding Partner spots: 4 of 10 remaining — lock in 20% off for life — Book your call →") in `hidden md:flex`
- "Book your call" / "Lock in 20% off" button: `getElementById('founding-partners')` → smooth scroll, fallback `window.location.href = '/#founding-partners'`
- Live green dot with `pc-dot-pulse` animation

### `SiteNav`
**File:** `src/components/site-nav.tsx`
**Props:** none
**Behavior:**
- `fixed top-10` (40px, accounts for AnnouncementBar height)
- Hides on scroll down, reappears on scroll up (< 60px always shown)
- Backdrop blur: `rgba(28,25,23,0.92)`
- Desktop: Features · How It Works · Pricing · About links + Sign In + See Demo + Try It Free CTA + LanguageToggle
- Mobile: LanguageToggle + hamburger (lucide `Menu`/`X`), expands drawer with same links

### `SiteFooter`
**File:** `src/components/site-footer.tsx`
**Props:** none
**Behavior:** Links to Features, How It Works, Pricing, Demo, About, Founding Partners, Privacy, Terms. LanguageToggle. Copyright from `t.footer.copyright`.

### `ChatInterface`
**File:** `src/components/chat-interface.tsx`
**Props:** `{ config: ChatConfig }`
**ChatConfig interface:**
```ts
{
  hotelName: string
  assistantName: string
  collection: string
  systemPrompt: string
  suggestionChips?: string[]
  placeholder?: string
  mobileChipsLimit?: number
  greeting?: string
}
```
**Behavior:**
- Sends to `/api/chat` with `{ messages, propertyConfig: config }`
- Rate-limit response (`429`) shows upgrade CTA bubble
- Renders inline markdown: bold `**`, italic `*`, code `` ` ``, bullet `-`/`*`, paragraph breaks
- Send button: orange ring blinks when empty (`pc-btn-blink`), solid orange when has text
- Suggestion chips hidden after first message; `mobileChipsLimit` hides extras on mobile

### `UpgradeModal`
**File:** `src/components/UpgradeModal.tsx`
**Props:** `{ propertyId: string, userId: string, onClose: () => void }`
**Plans (hardcoded):**
- Single Property: `$299/mo`, priceId `price_1TALsJBgMSWbEFIIFMFSR5Nz`
- Small Group: `$549/mo`, priceId `price_1TALnGBgMSWbEFIIYeCYeBfT`
**Coupon:** `FOUNDING40` applies 40% discount (client-side display only; Stripe processes actual discount)
**⚠ WARNING:** Price IDs are hardcoded. Changing Stripe products requires updating these constants.

### `CalendlyModal`
**File:** `src/components/CalendlyModal.tsx`
**Props:** `{ onClose: () => void }`
**Links:**
- 15 min: `https://calendly.com/placecompanion/15-minute-discovery-call`
- 30 min: `https://calendly.com/placecompanion/30min`
**i18n:** inline `lang === 'es'` check (does not use `t.*` keys)

### `LanguageToggle`
**File:** `src/components/LanguageToggle.tsx`
**Props:** none
**Behavior:** EN · ES buttons. Active is `#E8E3DC` weight 500, inactive `#6B6560`. Updates `LanguageContext` and `localStorage.pc_lang`.

### `AssistantClient`
**File:** `src/app/assistant/[id]/AssistantClient.tsx`
**Props:** `{ property: any }`
**Behavior:**
- Public chat widget at `/assistant/[id]`
- Session ID: `Math.random().toString(36).slice(2)` stored in `useRef`, persists for tab session
- Sends to `/api/assistant/[id]`
- Shows suggestion chips derived from property's `system_prompt` + `extracted_data` keywords (spa, restaurant, beach/pool, wifi)
- If owner is logged in, shows "← Back to dashboard" link

### `DashboardClient`
**File:** `src/app/dashboard/DashboardClient.tsx`
**Props:**
```ts
{
  user: any                        // Supabase user object
  properties: any[]                // All user's properties with openIssueCount
  selectedPropertyId: string | null
  selectedProperty: any            // Full property row or null
  selectedConversations: any[]     // Up to 50 conversations
  selectedIssues: any[]            // Up to 100 issue_logs
}
```
**State:** `activeTab`, `upgradeTarget`, `showInvoiceModal`, `showCalendly`, `copiedLink`, `copiedEmbed`, `isDeleting`, `revenueSignals`, `selectedStyle`, `isSavingStyle`, `styleSaved`, `alertEmail`, `isSavingAlert`, `alertSaved`, `issues`, `showMobileMenu`

---

## 5. API Routes

### `POST /api/chat`
General chat endpoint. Used by `ChatInterface` component (demo + homepage).
- Body: `{ messages, propertyConfig?, rawSystemPrompt? }`
- Model: `claude-haiku-4-5-20251001`, max 1024 tokens
- Normalizes message format (handles `parts` array or `content` string)
- Returns: text stream (`result.toTextStreamResponse()`)

### `POST /api/extract`
Extracts structured hotel data from a URL, text, or files.
- Body: `{ url?, text?, files?: Array<{name, base64}> }`
- Fetches URL, strips HTML, truncates to 12000 chars
- AI returns JSON: `{ hotelName, restaurant, spa, amenities, policies, nearby, location, summary }`
- Also builds a `systemPrompt` string from extracted fields
- Returns: `{ extracted }` — the full object including the generated `systemPrompt`
- **⚠ WARNING:** PDF parsing is NOT implemented — files are acknowledged but not parsed

### `POST /api/preview-chat`
Chat during onboarding step 3 with the just-extracted hotel data.
- Body: `{ messages, extracted, conversationalStyle? }`
- Applies style instructions, hallucination guardrail, fallback behavior, issue handling
- Model: `claude-haiku-4-5-20251001`, max 512 tokens
- Returns: text stream

### `POST /api/assistant/[id]`
Production chat for deployed property. The live endpoint guests use.
- Body: `{ messages, sessionId }`
- Fetches property from Supabase (`system_prompt`, `hotel_name`, `is_active`, `conversational_style`, `alert_email`)
- Upserts conversation record (by `property_id` + `guest_session_id`)
- Saves user message to `messages` table with `revenue_signal`
- On finish: saves assistant message, detects issue keywords → sends email alert via Resend, logs to `issue_logs`
- Room number follow-up: if second message has a room number and prior message had an issue, sends room-update alert
- Model: `claude-haiku-4-5-20251001`, max 1024 tokens

**Issue keywords detected (English + Spanish):** broken, not working, issue, problem, maintenance, leak, no hot water, no water, no electricity, no wifi, wifi not working, air conditioning, ac, toilet, emergency, help, stuck, locked out + Spanish equivalents

**Revenue signals detected:** spa, restaurant/food/dining, tour/activity/excursion, transport/taxi/airport, checkout/late, upgrade/room

### `POST /api/stripe/checkout`
Creates a Stripe checkout session for subscription.
- Body: `{ priceId, coupon?, propertyId, userId }`
- Success URL: `/dashboard?success=true`, Cancel URL: `/dashboard?canceled=true`
- Returns: `{ url }` — redirect to Stripe checkout

### `POST /api/stripe/webhook`
Handles Stripe webhook events.
- Verifies signature with `STRIPE_WEBHOOK_SECRET`
- `checkout.session.completed` → updates property: `subscription_status='active'`, `stripe_customer_id`, `stripe_subscription_id`, `subscription_price_id`
- `customer.subscription.deleted` → `subscription_status='canceled'`
- `invoice.payment_failed` → `subscription_status='past_due'`

---

## 6. Database Schema

**Full schema at:** `src/lib/supabase/schema.sql`

### `public.properties`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | auto generated |
| `user_id` | uuid FK → auth.users | cascade delete |
| `hotel_name` | text NOT NULL | |
| `location` | text | |
| `room_count` | text | |
| `extracted_data` | jsonb NOT NULL | full AI extraction result |
| `system_prompt` | text NOT NULL | built from extracted_data |
| `is_active` | boolean | default true |
| `trial_started_at` | timestamptz | default now() |
| `trial_ends_at` | timestamptz | default now() + 14 days |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |
| `conversational_style` | text | one of 5 style keys (not in schema.sql, added via migration) |
| `alert_email` | text | email for issue alerts (not in schema.sql, added via migration) |
| `subscription_status` | text | 'trial'\|'active'\|'canceled'\|'past_due' (not in schema.sql, added via migration) |
| `stripe_customer_id` | text | (not in schema.sql, added via migration) |
| `stripe_subscription_id` | text | (not in schema.sql, added via migration) |
| `subscription_price_id` | text | (not in schema.sql, added via migration) |

### `public.conversations`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `property_id` | uuid FK → properties | cascade delete |
| `guest_session_id` | text | random string from client |
| `language_detected` | text | default 'en' |
| `started_at` | timestamptz | |
| `last_message_at` | timestamptz | updated on each message |
| `message_count` | integer | updated on each message |

### `public.messages`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `conversation_id` | uuid FK → conversations | cascade delete |
| `property_id` | uuid FK → properties | cascade delete |
| `role` | text | CHECK in ('user','assistant') |
| `content` | text | |
| `revenue_signal` | text | nullable, detected keyword category |
| `created_at` | timestamptz | |

### `public.issue_logs`
*(Not in schema.sql — added via migration in production)*
| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `property_id` | uuid FK → properties | |
| `guest_message` | text | the triggering message |
| `room_number` | text | nullable |
| `status` | text | 'open'\|'resolved' |
| `resolved_at` | timestamptz | set on resolution |
| `created_at` | timestamptz | |

### RLS Policies
- Properties: users can CRUD their own rows only; public can SELECT active properties (for guest widget)
- Conversations: owners can SELECT via property ownership; public can INSERT/UPDATE (guests create convos)
- Messages: owners can SELECT; public can INSERT (AI route saves messages)
- Issue logs: uses service role key (bypasses RLS) for inserts from the API route

---

## 7. Environment Variables

| Variable | Where Used | Required |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | client.ts, server.ts, middleware.ts, webhook | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client.ts, server.ts, middleware.ts | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | service.ts, webhook/route.ts | Yes |
| `ANTHROPIC_API_KEY` | chat/route.ts, extract/route.ts, preview-chat/route.ts, assistant/[id]/route.ts | Yes |
| `STRIPE_SECRET_KEY` | checkout/route.ts, webhook/route.ts | Yes |
| `STRIPE_WEBHOOK_SECRET` | webhook/route.ts | Yes |
| `RESEND_API_KEY` | assistant/[id]/route.ts | Yes (alerts won't send without it) |
| `NEXT_PUBLIC_SITE_URL` | checkout/route.ts (fallback to host header) | Optional |

---

## 8. Authentication Flow

1. **Middleware** (`src/middleware.ts`): Runs on `/dashboard/*` and `/auth/*` routes.
   - No session + `/dashboard` → redirect to `/auth/login`
   - Has session + `/auth/login` or `/auth/signup` → redirect to `/dashboard`
2. **Signup**: `supabase.auth.signUp({ email, password, options: { data: { hotel_name } } })` → `window.location.href = '/dashboard'`
3. **Login**: `supabase.auth.signInWithPassword({ email, password })` → `window.location.href = '/dashboard'`
4. **Onboarding signup**: Same `signUp` call, then immediately inserts a `properties` row with the extracted data
5. **Sign out**: `supabase.auth.signOut()` → `window.location.href = '/'`
6. **Session**: Cookie-based via `@supabase/ssr`. Server client reads cookies. Client client uses browser localStorage.

---

## 9. i18n System

**Files:** `src/lib/i18n/translations.ts`, `src/lib/i18n/LanguageContext.tsx`

**Languages supported:** `'en'` | `'es'`

**How it works:**
1. `LanguageProvider` wraps the entire app in `layout.tsx`
2. On mount: reads `localStorage.pc_lang`. If not set, detects browser language (`navigator.language.startsWith('es')`)
3. Calling `setLang(lang)` updates React state + writes to `localStorage.pc_lang`
4. Any component calls `const { t, lang, setLang } = useLang()` to access translations

**Translation key namespaces:**
- `nav` — navigation labels
- `hero` — homepage hero section
- `pain` — question pills
- `realQuestions` — marquee rows
- `howItWorks` — step titles/descriptions
- `features` — features page
- `intelligence` — intelligence section
- `pricing` — pricing cards (boutique, independent, portfolio)
- `cta` — call to action text
- `footer` — footer links and copyright
- `auth` — login/signup form labels
- `onboarding` — all 4 onboarding steps, style names, room count options
- `property` — issue labels (open, resolved, mark resolved)
- `dashboard` — dashboard UI labels (signOut, addProperty, getInvoice, invoiceTitle, etc.)

**⚠ WARNING:** `CalendlyModal.tsx` uses inline `lang === 'es'` checks instead of `t.*` keys. If you add a language, update it manually.

---

## 10. Homepage Sections (in order)

All in `src/app/page.tsx` — a `'use client'` component.

1. **AnnouncementBar** — rendered in `layout.tsx` above children
2. **SiteNav** — fixed, top-10, hide-on-scroll
3. **Hero** — `heading-hero` serif headline, subheadline, two CTAs (Try It Free → `/onboarding`, Try the Demo → `/demo`), trust line, live demo `ChatInterface` panel (using `marazulChatConfig`)
4. **Pain / Marquee** — "Guests are asking. Right now." — two scrolling marquee rows with question chips. Row 1 scrolls left (22s), Row 2 scrolls right (38s). Green live dot + `pc-dot-pulse`.
5. **Real Questions** — (Overlaps with marquee — same section)
6. **How It Works** — 3 icon cards with hover border transitions, steps 01/02/03 from `t.howItWorks.*`
7. **Revenue Section** — 4-tab pill selector (`activeConvo` state 0–3) showing bilingual sample conversations for: Spa, Dining, Activities, Upgrade. Each conversation is a mockup showing the AI handling revenue opportunities.
8. **Dashboard Teaser** (`#dashboard-teaser`) — animated on scroll (IntersectionObserver, threshold 0.08, fires once and disconnects). Desktop: full browser chrome mockup with sidebar, tab bar, line chart, bar chart, and donut chart. Mobile: simplified single-column view with chart + CTA.
9. **Stats Strip** — 3 numeric stats (200+ questions/week, 91% resolved by AI, 14 languages) in a row
10. **Pricing** (`#pricing`) — 3 plan cards: Boutique ($149/mo), Independent ($299/mo), Portfolio (custom). Each has feature list. Boutique has 9 features including "Staff notification routing". Independent has 5 features starting "Everything in Single Property".
11. **Founding Partners** (`#founding-partners`) — 10 partner spots, 4 remaining. 3 featured cards. Book a call CTA opens `CalendlyModal`.
12. **FAQ** — `FaqSection` component
13. **Final CTA** — `FinalCta` component with orange CTA
14. **SiteFooter**

---

## 11. Dashboard Layout (Full Detail)

**File:** `src/app/dashboard/DashboardClient.tsx`

### Overall Structure
```
<div> [background: #0F0D0B, minHeight: 100vh, flexDirection: column]
  <header>        [TOP BAR — 56px, background: #161310]
  <div flex-1>    [BODY]
    <aside>       [LEFT SIDEBAR — 220px, hidden md:flex]
    <main>        [MAIN CONTENT — flex:1]
  </div>
  <nav>           [BOTTOM TAB BAR — fixed bottom-0, md:hidden]
  [MODALS]        [Invoice, Upgrade, Calendly]
</div>
```

### Top Bar (56px)
- Left: "Place Companion" serif logo → links to `/`
- Desktop right (`hidden md:flex`): user email, "Get Invoice" button, "Sign Out" button
- Mobile right (`flex md:hidden`): `⋯` button (22px, opens dropdown)
- Mobile dropdown: absolute, `top: 56px`, user email + Invoice + Sign Out

### Left Sidebar (`hidden md:flex flex-col`, 220px)
- Section label: "Your Hotels" (10px, uppercase, `#4A4540`)
- Each property: pill button with hotel name, orange left border when selected, orange badge for open issues
- Bottom: "+ Add hotel" link → `/onboarding`

### Main Content
- `pb-24 md:pb-0` (padding-bottom 96px on mobile to clear bottom tab bar)
- `padding: '20px 16px'` (overridden by `md:px-10 md:py-8`)

**No property selected:**
- Mobile: card list of all hotels (`md:hidden`) — tappable, shows `>` chevron, orange badge for issues
- Open issues summary banner (orange bg, lists properties with open issues)
- Empty state: serif text + "Configure your first hotel" CTA → `/onboarding`
- Desktop arrow hint (`hidden md:flex`): animated left-arrow SVG + "Select a hotel from the left"
- Team access note + "Book a call" → opens CalendlyModal

**Property selected:**
- Mobile-only back button: `← All hotels` → `router.push('/dashboard')`
- Property name (28px serif) + location
- Subscription status banners: trial warning (≤3 days), canceled, past_due
- Upgrade button if trial/canceled/past_due

**Tab bar (desktop, within main content):**
- 4 tabs: Analytics | Issues | Deploy | Settings
- Active: `color: #FAF9F5`, `borderBottom: 2px solid #C96A3A`
- Issues tab shows open count badge

### Analytics Tab
- 2-column grid (`grid-cols-1 md:grid-cols-2`):
  - Line chart: "Guest questions this month" — mock 30-day data, `LineChart` from recharts, orange line (`#C96A3A`)
  - Bar chart: "What guests are asking about" — `BarChart` horizontal, orange gradient fill
- Full-width: Resolution rate card — SVG donut chart (91% green), explanation text. Flex column on mobile, row on desktop.
- **⚠ WARNING:** Analytics data is entirely mocked (module-level constants). Real analytics requires querying `messages` table.

### Issues Tab
- Empty state: centered "No issues yet"
- Desktop: grid table (`hidden md:grid`, 5 columns: Date/Time | Guest Message | Room | Status | Action)
- Mobile: card per issue (`md:hidden`) — date + room badge + status pill in header row, full message body, full-width "Mark Resolved" button
- Resolve action: Supabase `.update({ status: 'resolved', resolved_at })` + optimistic state update via `setIssues`

### Deploy Tab
- `grid-cols-1 md:grid-cols-3` with 3 cards:
  1. Public link — copy button → `https://placecompanion.com/assistant/[id]`
  2. Widget embed code — `<script src="..." data-property="[id]">` — copy button
  3. QR code — fetched from `api.qrserver.com`, download button

### Settings Tab
- Conversational Style selector: 5 style cards (warm_local, refined_concierge, barefoot_luxury, playful_explorer, zen_mindful) — click to update + save to Supabase
- Alert email: full-width input (`sm:flex-row` on sm+), Save button `w-full sm:w-auto`
- Danger zone: Delete property button

### Bottom Tab Bar (`fixed bottom-0 md:hidden`)
```
background: #161310
borderTop: 1px solid rgba(232,227,220,0.06)
height: ~64px + env(safe-area-inset-bottom) [note: safe-area not currently implemented]
```
4 tabs, each `flex-1`:
| Tab | Icon | Badge |
|---|---|---|
| Analytics | Bar chart SVG (3 bars) | — |
| Issues | Circle with exclamation SVG | Orange pill with open count |
| Deploy | Monitor/screen SVG | — |
| Settings | Gear SVG | — |

Active color: `#C96A3A`. Inactive: `#6B6560`. Label: 10px font.
Issues badge: `position: absolute; top: 6px; right: calc(50% - 18px)` — 9px font, orange.

Only renders when `selectedPropertyId && selectedProperty` are both truthy.

---

## 12. Onboarding Flow (`/onboarding`)

4-step flow. Progress bar: 25% / 50% / 75% / 100%. Background: `#1C1917`.

**Step 1 — Build your assistant:**
- Website URL input (scrapes via `/api/extract`)
- PDF upload (drag-and-drop, multi-file — **⚠ NOT parsed, acknowledged only**)
- Additional info textarea
- Conversational style selector (5 styles, 2–3 col grid, orange selected state)
- Room count selector (pill buttons, orange selected state)
- "Analyze" button → calls `/api/extract` → advances to Step 2

**Step 2 — Processing (loading state):**
- Animated checklist: hotel name, restaurant, spa, amenities, policies, nearby — staggered 600ms reveals
- Auto-advances to Step 3 after 1s post-animation

**Step 3 — Test your assistant:**
- Live chat using `/api/preview-chat` with the extracted data
- Shows greeting + user can type questions
- "Save your assistant" button → Step 4

**Step 4 — Create account:**
- Email + password inputs
- `supabase.auth.signUp()` + `properties.insert()` in one flow
- On success: `window.location.href = '/dashboard'`

---

## 13. Conversational Styles

5 styles available throughout the product (onboarding, dashboard settings, API routes):

| Key | Description |
|---|---|
| `warm_local` | Warm genuine local friend, personal, conversational |
| `refined_concierge` | Five-star concierge polish, precise, professional |
| `barefoot_luxury` | Relaxed luxury beach resort, effortlessly refined |
| `playful_explorer` | Fun, enthusiastic, adventurous, occasional emojis |
| `zen_mindful` | Calm, unhurried, thoughtful, serene |

Stored in `properties.conversational_style`. Applied in both `/api/preview-chat` and `/api/assistant/[id]`.

---

## 14. Things That Are Easy to Break

### ⚠ Critical Fragilities

1. **Stripe price IDs are hardcoded in `UpgradeModal.tsx`** (lines 10 and 15). Changing Stripe products requires updating these two strings. No env var.

2. **`issue_logs` table is NOT in `schema.sql`** — it was added via a Supabase migration after the fact. If you run `schema.sql` from scratch, the `issue_logs` table won't exist and the assistant route will throw on every issue alert.

3. **Properties table `conversational_style`, `alert_email`, `subscription_status`, `stripe_customer_id`, `stripe_subscription_id`, `subscription_price_id` columns are NOT in `schema.sql`** — also added via migration. Same issue if rebuilding DB from scratch.

4. **Analytics data is entirely mocked** in `DashboardClient.tsx` (module-level `last30Days`, `categoryData`, `totalQuestions`). Real analytics requires querying the `messages` table by `property_id` and `created_at`.

5. **PDF parsing is not implemented** in `/api/extract`. The code reads the file, encodes as base64, but the AI is only given `[PDF UPLOAD: filename — processing not available]`. Users who upload PDFs get no benefit.

6. **`selectedConversations` prop is fetched but not rendered** in `DashboardClient.tsx` (suppressed with `void selectedConversations`). The conversations tab doesn't exist yet.

7. **Nav `top-10` depends on AnnouncementBar height being exactly 40px.** If bar height changes (e.g. taller text on mobile), nav will overlap content. `pt-24` on layout wrapper accounts for 40px bar + 64px nav = 104px, but actual nav height is `h-16` = 64px.

8. **AnnouncementBar is hidden on `/assistant/*` via `pathname.startsWith('/assistant')`.** The layout wrapper still applies `pt-24`. This means assistant pages have 96px of padding at the top even though no bar or nav is rendered — creates dead space.

9. **`handleEmailSubmit` in `onboarding/page.tsx` (legacy function, line ~214) is no longer called** but still present. It saves to `localStorage.pc_lead`. Not a bug but dead code.

10. **Resend `from:` address is hardcoded as `onboarding@resend.dev`** — this is Resend's test domain. In production you must use a verified domain or alerts won't deliver reliably.

11. **`DashboardClient` receives `selectedConversations` but suppresses the value with `void selectedConversations`.** If the conversations tab is ever built, the prop is already there.

12. **Mobile bottom tab bar only renders when `selectedPropertyId && selectedProperty` are both truthy.** On mobile, when no property is selected, there's no bottom navigation — the user must use the property card list in the main area.

### ⚠ Coupling Points

- `layout.tsx` sets `pt-24` to account for `AnnouncementBar` (40px) + `SiteNav` (h-16 = 64px). If either changes height, update `pt-24`.
- `SiteNav` uses `top-10` (40px) to sit below the announcement bar. If bar height changes, update this.
- Dashboard `main` uses `pb-24` on mobile to clear the bottom tab bar. If tab bar height changes, update this.
- The `issue_logs` table in `assistant/[id]/route.ts` is imported dynamically from `service.ts` — if service client isn't configured, the dynamic import will fail silently (the error is caught).

---

## 15. Stripe Price IDs (Production)

| Plan | Monthly Price | Stripe Price ID |
|---|---|---|
| Single Property | $299/mo | `price_1TALsJBgMSWbEFIIFMFSR5Nz` |
| Small Group | $549/mo | `price_1TALnGBgMSWbEFIIYeCYeBfT` |

Founding partner coupon code: `FOUNDING40` (40% off forever — validated client-side, must also exist in Stripe dashboard).

---

## 16. Calendly Links

- 15-min discovery: `https://calendly.com/placecompanion/15-minute-discovery-call`
- 30-min full demo: `https://calendly.com/placecompanion/30min`

---

## 17. Google Forms (Invoice Requests)

- Mexico CFDI: `https://forms.gle/CsYAreNSpr2nHCq87`
- International: `https://forms.gle/gv8vDE62ABG7otH9A`

---

## 18. Key Supabase Queries

**Dashboard page (server):**
```ts
// All user properties with conversation + message counts
supabase.from('properties').select('*, conversations(count), messages(count)').eq('user_id', user.id)

// Open issue counts per property
supabase.from('issue_logs').select('property_id').eq('status', 'open').in('property_id', propertyIds)

// Selected property conversations (limit 50)
supabase.from('conversations').select('*').eq('property_id', id).order('started_at', { ascending: false }).limit(50)

// Selected property issues (limit 100)
supabase.from('issue_logs').select('*').eq('property_id', id).order('created_at', { ascending: false }).limit(100)
```

**Revenue signals (client-side in DashboardClient):**
```ts
supabase.from('messages').select('revenue_signal').eq('property_id', id).eq('role', 'user').not('revenue_signal', 'is', null)
```
