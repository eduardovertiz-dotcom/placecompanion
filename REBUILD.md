# REBUILD.md — Place Companion Complete Survival Kit

> Everything needed to rebuild this project from scratch. If the laptop burns, this file is the whole company.

---

## 1 — Project Overview

**Product:** Place Companion
**Description:** AI-powered guest companion SaaS for boutique hotels and resort properties. Hotel owners paste their website or upload their guest guide, and an AI assistant is live in under 30 minutes — answering guest questions, detecting issues, firing staff alerts, and surfacing revenue opportunities.
**Target market:** Boutique hotels, villa collections, surf camps, eco-lodges — 1–5 properties, English and Spanish markets
**Positioning:** "Your hotel's voice, available 24/7" — not a chatbot, a companion that knows the property and the destination

**Live URL:** https://placecompanion.com
**GitHub:** https://github.com/eduardovertiz-dotcom/placecompanion
**Vercel project:** placecompanion-v2
**Supabase project:** fhrgapgrxmbkjwearixc
**Contact:** hola@placecompanion.com

**Tech stack:**
- **Framework:** Next.js 16 (App Router), React 19, TypeScript 5
- **Styling:** Tailwind CSS v4
- **Database / Auth:** Supabase (Postgres + Row Level Security + auth.users)
- **AI:** Anthropic AI SDK (`@ai-sdk/anthropic`) — model `claude-haiku-4-5-20251001` for streaming chat, `claude-sonnet-4-6` for extraction
- **Web scraping:** Firecrawl API (`FIRECRAWL_API_KEY`) — scrapes hotel websites during onboarding
- **Payments:** Stripe (checkout sessions, webhooks, subscriptions)
- **Email:** Resend — transactional alerts to hotel staff
- **Deployment:** Vercel (auto-deploy from `main` branch)

---

## 2 — Design System

### Background Colors (darkest to lightest — sectioned by use)

| Token | Hex | Used for |
|-------|-----|----------|
| Page base | `#0F0D0B` | Dashboard, property detail, assistant page background |
| App chrome | `#141210` | Panel bars, input areas, card headers, chat input tray |
| Cards | `#1A1715` | Content cards, assistant bubbles, revenue cards, conversation rows |
| Elevated / inputs | `#1F1C19` | Input fields, dropdowns, user chat bubbles, suggestion chips, stat cards |
| Badge bg | `#242019` | Language badges, status pills, coupon section |
| Dividers | `rgba(232,227,220,0.06)` | All card borders and separators |
| Input borders | `rgba(232,227,220,0.08)` | Input field borders, chip borders |
| Hover borders | `rgba(232,227,220,0.12)` | Card hover state borders |
| Ghost btn borders | `rgba(232,227,220,0.15)` | Ghost button borders |

**Homepage section backgrounds (dark-to-light progression):**

| Section | Hex |
|---------|-----|
| Root wrapper + Hero | `#080706` |
| Pain Pills | `#0F0D0B` |
| Revenue | `#141210` |
| Intelligence | `#1A1715` |
| How It Works | `#1F1C19` |
| Founding Partners | `#16131F` |
| Pricing | `#1C1917` |
| Pricing cards | `#080706` |
| Final CTA | `#2A2725` |

**Onboarding page:** `#1C1917` (via `.onboarding-page` class in globals.css)

**`body` background:** `#141413` (fallback in globals.css — overridden per-page)

### Text Colors

| Hex | Usage |
|-----|-------|
| `#FFFFFF` | Primary headings, large stat numbers, card values |
| `#FAF9F5` | Nav logo, body copy (globals default), button text |
| `#E8E3DC` | Assistant chat bubbles text, secondary headings |
| `#A8A099` | Secondary labels, muted body text, ghost button text |
| `#9C9A93` | Homepage subheads, hero description text |
| `#6B6560` | Tertiary / disabled / placeholder text, conversation timestamps |
| `#C4BDB6` | Onboarding muted labels (stepped up from #6B6560 for legibility) |
| `#53525D` | Fine print, trial notes under CTAs |

### Accent Colors

| Hex | Name | Used for |
|-----|------|----------|
| `#C96A3A` | Orange | Primary CTA ("Create Your Assistant"), send button, progress bar fill, active pricing buttons — **NEVER change this** |
| `#D4784A` | Orange hover | Hover state for all `#C96A3A` elements |
| `rgba(201,106,58,0.35)` | Orange disabled | Disabled send button |
| `#2D9E6B` | Green | Section labels (PUBLIC URL, EMBED WIDGET), language detection badges, feature bullet dots, step numbers |
| `rgba(45,158,107,0.2)` | Green bg | Legacy — replaced by `#242019` for badge backgrounds |

### Typography

**Fonts:** Loaded via `next/font` (Google Fonts)
- **Serif / headings:** Cormorant Garamond — weights 300 (light), 400 (normal), 600 (semibold)
  - Class: `font-serif`
  - Used for: all h1, h2, property names, stat numbers, modal headlines
- **Sans-serif / UI:** DM Sans — weights 300 (light), 400 (normal), 500 (medium), 600 (semibold)
  - Class: `font-sans`
  - Used for: all body, labels, buttons, chips, inputs, nav

**CSS Heading Utilities (globals.css):**

```css
.heading-hero {
  font-size: clamp(2.5rem, 8vw, 6rem);
  line-height: 1.05;
}
.heading-section {
  font-size: clamp(2rem, 5vw, 4.25rem);
  line-height: 1.1;
}
.heading-page {
  font-size: clamp(2.5rem, 7vw, 4rem);
  line-height: 1.05;
}
.heading-card {
  font-size: clamp(1.5rem, 4vw, 2rem);
  line-height: 1.2;
}
```

**Common font sizes (inline):**
- Hero subhead: `18px`, line-height `1.7`
- Section body: `16–18px`, line-height `1.75`
- Card body / nav: `14–15px`
- Labels / badges: `11–13px`, `letterSpacing: '0.08em'`, `textTransform: 'uppercase'`
- Fine print: `12px`

**Font smoothing (globals.css body):**
```css
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
```

### Borders & Dividers

```
Card border:        1px solid rgba(232,227,220,0.06)
Input border:       1px solid rgba(232,227,220,0.08)
Card hover:         1px solid rgba(232,227,220,0.12)
Ghost button:       1px solid rgba(232,227,220,0.15)
Section divider:    1px solid rgba(255,255,255,0.06)  (nav)
```

### Button Styles

**Primary — Orange CTA:**
```
background: #C96A3A → hover: #D4784A
color: white
height: 44–48px, padding: 0 24px
borderRadius: 8px
fontSize: 14–15px, fontWeight: 500–600
```

**Ghost / Secondary:**
```
background: transparent
border: 1px solid rgba(232,227,220,0.15)
color: #A8A099
borderRadius: 8px
padding: 8px 14–16px
fontSize: 13–14px
```

**Send button (chat):**
```
background: #C96A3A → hover: #D4784A
width/height: 40px
borderRadius: 999px (full circle)
disabled: rgba(201,106,58,0.35)
```

**Delete / danger:**
```
background: transparent
border: 1px solid rgba(220,50,50,0.3)
color: #E05555
borderRadius: 8px
height: 48px
```

### Card Styles

**Standard content card:**
```
background: #1A1715
borderRadius: 12–16px
padding: 24–32px
border: 1px solid rgba(232,227,220,0.06)
```

**Stat card:**
```
background: #1F1C19
borderRadius: 12px
padding: 24px
border: 1px solid rgba(232,227,220,0.06)
```

**Chat message bubbles:**
```
User:      background: #1F1C19, color: #FFFFFF
Assistant: background: #1A1715, color: #E8E3DC
borderRadius: 12–16px (rounded-2xl), padding: 12px 16px
```

**Suggestion chips:**
```
background: #1F1C19
border: 1px solid rgba(232,227,220,0.08)
borderRadius: 9999px
padding: 8px 16px
fontSize: 13px, color: #A8A099
hover: color #FAF9F5, border rgba(232,227,220,0.2)
```

---

## 3 — Environment Variables

Add all of these to Vercel → Settings → Environment Variables, and to `.env.local` for local dev.

| Variable | Description | Where to get it |
|----------|-------------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Supabase dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public JWT | Supabase dashboard → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role JWT (bypasses RLS) | Supabase dashboard → Settings → API → service_role |
| `ANTHROPIC_API_KEY` | Claude API key | console.anthropic.com → API Keys |
| `FIRECRAWL_API_KEY` | Firecrawl scraping API key | firecrawl.dev → Dashboard |
| `STRIPE_SECRET_KEY` | Stripe secret key (sk_live_... or sk_test_...) | Stripe dashboard → Developers → API keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (pk_live_...) | Stripe dashboard → Developers → API keys |
| `STRIPE_PRICE_SINGLE_MONTHLY` | Stripe Price ID for Single Property plan | Stripe dashboard → Products → copy Price ID |
| `STRIPE_PRICE_GROUP_MONTHLY` | Stripe Price ID for Small Group plan | Stripe dashboard → Products → copy Price ID |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (whsec_...) | Stripe dashboard → Webhooks → click endpoint → Signing secret |
| `NEXT_PUBLIC_SITE_URL` | Full site URL with no trailing slash | `https://placecompanion.com` |
| `RESEND_API_KEY` | Resend email API key (re_...) | resend.com → API Keys |

**Current Stripe Price IDs (live):**
- Single Property: `price_1TALsJBgMSWbEFIIFMFSR5Nz`
- Small Group: `price_1TALnGBgMSWbEFIIYeCYeBfT`

---

## 4 — Supabase Setup

**Project URL:** `https://fhrgapgrxmbkjwearixc.supabase.co`
**Region:** (check Supabase dashboard)

**Auth settings:**
- Go to Authentication → Settings
- Set **"Confirm email"** to **OFF** (guests sign up and are immediately logged in — no confirmation step)
- Site URL: `https://placecompanion.com`

### SQL — Create Tables from Scratch

Run this in the Supabase SQL editor:

```sql
-- PROPERTIES
create table if not exists properties (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid references auth.users(id) on delete cascade,
  hotel_name            text not null,
  location              text,
  website_url           text,
  system_prompt         text,
  extracted_data        jsonb,
  knowledge_base        text,
  conversational_style  text default 'warm_local',
  alert_email           text,
  is_active             boolean default true,
  trial_ends_at         timestamptz default (now() + interval '14 days'),
  subscription_status   text default 'trial',  -- trial | active | past_due | canceled
  stripe_customer_id    text,
  stripe_subscription_id text,
  created_at            timestamptz default now()
);

-- CONVERSATIONS
create table if not exists conversations (
  id                uuid primary key default gen_random_uuid(),
  property_id       uuid references properties(id) on delete cascade,
  guest_session_id  text,
  started_at        timestamptz default now(),
  last_message_at   timestamptz default now(),
  message_count     int default 0,
  language_detected text
);

-- MESSAGES
create table if not exists messages (
  id              uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id) on delete cascade,
  property_id     uuid references properties(id) on delete cascade,
  role            text not null,   -- 'user' | 'assistant'
  content         text not null,
  revenue_signal  text,            -- spa | restaurant | activity | transport | late_checkout | room_upgrade
  created_at      timestamptz default now()
);
```

### RLS Policies

```sql
-- Enable RLS on all tables
alter table properties enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;

-- PROPERTIES: users can only manage their own properties
create policy "Users manage own properties"
  on properties
  for all
  using (auth.uid() = user_id);

-- Allow anon read on active properties (for the guest assistant)
create policy "Anon can read active properties"
  on properties
  for select
  using (is_active = true);

-- CONVERSATIONS: property owners can read; service role can write
create policy "Owner reads conversations"
  on conversations
  for select
  using (
    exists (
      select 1 from properties p
      where p.id = property_id and p.user_id = auth.uid()
    )
  );

create policy "Anyone can insert conversation"
  on conversations
  for insert
  with check (true);

create policy "Anyone can update conversation"
  on conversations
  for update
  using (true);

-- MESSAGES: property owners can read; anyone can insert (guests)
create policy "Owner reads messages"
  on messages
  for select
  using (
    exists (
      select 1 from properties p
      where p.id = property_id and p.user_id = auth.uid()
    )
  );

create policy "Anyone can insert message"
  on messages
  for insert
  with check (true);
```

### Supabase Dashboard Queries Used in App

**Dashboard — properties with conversation/message counts:**
```sql
select
  p.*,
  (select count(*) from conversations c where c.property_id = p.id) as conversations,
  (select count(*) from messages m where m.property_id = p.id) as messages
from properties p
where p.user_id = auth.uid();
```
(This is actually done via Supabase client with nested selects in `src/app/dashboard/page.tsx`)

---

## 5 — Stripe Setup

### Products to Create

**Product 1 — Single Property**
- Name: `Single Property`
- Price: `$249.00` USD / month (recurring)
- Copy the Price ID → set as `STRIPE_PRICE_SINGLE_MONTHLY`

**Product 2 — Small Group**
- Name: `Small Group`
- Price: `$449.00` USD / month (recurring)
- Copy the Price ID → set as `STRIPE_PRICE_GROUP_MONTHLY`

> Note: The UpgradeModal still shows $299/$549 — these are the modal display prices. The actual Stripe prices may differ. Reconcile before going live.

### Coupon

- Go to Stripe → Coupons → Create coupon
- **Code:** `FOUNDING40`
- **Discount:** 40% off
- **Duration:** Forever
- **Redemption:** No limit

### Webhook Endpoint

- URL: `https://placecompanion.com/api/stripe/webhook`
- Events to subscribe to:
  - `checkout.session.completed`
  - `customer.subscription.deleted`
  - `invoice.payment_failed`
- After creating, copy the **Signing secret** → set as `STRIPE_WEBHOOK_SECRET`

### What the webhook does

| Event | Action |
|-------|--------|
| `checkout.session.completed` | Updates `properties` row: sets `stripe_customer_id`, `stripe_subscription_id`, `subscription_status = 'active'` |
| `customer.subscription.deleted` | Sets `subscription_status = 'canceled'` |
| `invoice.payment_failed` | Sets `subscription_status = 'past_due'` |

The `propertyId` and `userId` are passed as `metadata` in the checkout session and read back in the webhook.

### Test vs Live Mode

- Use `sk_test_...` keys and test price IDs during development
- Use Stripe CLI for local webhook testing: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
- Switch to `sk_live_...` keys in Vercel production environment

---

## 6 — Resend Setup

### Domain verification

1. Go to resend.com → Domains → Add Domain → `placecompanion.com`
2. Resend will show DNS records to add — log in to Spaceship (domain registrar) and add them:
   - SPF record (TXT)
   - DKIM record (TXT)
   - DMARC record (TXT)
3. Wait for verification (usually <30 min)

### From address

- Intended: `alerts@placecompanion.com`
- **Current state:** Using `onboarding@resend.dev` (Resend sandbox address) because custom domain may not be verified yet
- To switch: change `from:` in `src/app/api/assistant/[id]/route.ts` in both `sendIssueAlert` and `sendRoomUpdateAlert` functions
- Final from address should be: `Place Companion Alerts <alerts@placecompanion.com>`

### DNS records for Spaceship (placecompanion.com)

Add whatever Resend gives you. Typical set:

```
Type  Name                          Value
TXT   @                             v=spf1 include:amazonses.com ~all
TXT   resend._domainkey             [DKIM key from Resend]
TXT   _dmarc                        v=DMARC1; p=none;
```

---

## 7 — Vercel Setup

1. Go to vercel.com → New Project → Import Git repository
2. Select `eduardovertiz-dotcom/placecompanion`
3. **Branch to deploy:** `main`
4. **Framework preset:** Next.js (auto-detected)
5. **Build command:** `next build` (default)
6. **Output directory:** `.next` (default)

### Environment Variables (add all from Section 3)

In Vercel → Project → Settings → Environment Variables, add every variable from Section 3. Set them for **Production**, **Preview**, and **Development** environments.

### Custom Domain

1. Vercel → Project → Settings → Domains
2. Add `placecompanion.com`
3. In Spaceship DNS, add:
   - `A` record: `@` → `76.76.21.21` (Vercel's IP)
   - `CNAME` record: `www` → `cname.vercel-dns.com`

### Important Vercel settings

- **Serverless function timeout:** Default 10s is fine; the AI streaming endpoint auto-handles streaming
- **Node.js version:** 20.x recommended

---

## 8 — Key Architecture Decisions

### Knowledge fallback chain

When answering guest questions, the assistant follows this hierarchy:
1. **Hotel knowledge base** — `system_prompt` built from the hotel's website + uploaded documents + manual text
2. **Claude's general knowledge** — used for destination questions not in the KB
3. **No hallucination rule** — never invent specific business names, addresses, hours, or prices not in the KB
4. **Fallback behavior** — if truly stuck, offer to connect the guest with the front desk (never say "I don't know")

### Conversational Styles (5 options)

| Slug | English Name | Tagline |
|------|-------------|---------|
| `warm_local` | Warm & Local | Feels like a friend who knows the area |
| `refined_concierge` | Refined Concierge | Polished, precise, always professional |
| `barefoot_luxury` | Barefoot Luxury | Relaxed but impeccable — like the hotel itself |
| `playful_explorer` | Playful Explorer | Adventurous, fun, emoji-friendly |
| `zen_mindful` | Zen & Mindful | Calm, unhurried, present |

Style is stored in `properties.conversational_style`. Injected into system prompt at runtime in `src/app/api/assistant/[id]/route.ts`.

### Issue Detection Keywords

The assistant detects issues from guest messages using these keywords:

**English:** broken, not working, issue, problem, maintenance, leak, no hot water, no water, no electricity, no wifi, wifi not working, air conditioning, ac, toilet, emergency, help, stuck, locked out

**Spanish:** roto, no funciona, problema, fuga, sin agua, sin luz, sin wifi, aire acondicionado, emergencia, ayuda, atascado, cerrado, mantenimiento, no hay agua caliente

### Email Alert Flow (two-stage)

When a guest reports an issue:

**Stage 1 — Immediate alert (on issue detection):**
- Fires the moment an issue keyword is detected
- Includes hotel name, room number (if already known in conversation), guest's message, timestamp UTC
- Subject: `Guest Issue — {Hotel Name} — Room {N or "Not provided"}`
- Asks assistant to get room number from guest if not yet known

**Stage 2 — Room confirmation alert:**
- Fires when guest provides a room number in a follow-up message
- Only fires if a prior message in the session had an issue keyword
- Subject: `Guest Issue UPDATE — Room {N} confirmed — {Hotel Name}`

Both emails sent via Resend from `onboarding@resend.dev` (temp) to `properties.alert_email`.

### Revenue Signal Detection

The assistant tags user messages with revenue intent:

| Signal | Triggers |
|--------|---------|
| `spa` | spa, massage, treatment |
| `restaurant` | restaurant, dinner, breakfast, lunch, food |
| `activity` | tour, activity, excursion |
| `transport` | transport, taxi, airport, transfer |
| `late_checkout` | checkout, check out, late |
| `room_upgrade` | upgrade, room |

Stored in `messages.revenue_signal`. Aggregated in the property dashboard as a tally per signal type.

### Suggestion Chips (AssistantClient)

Three chips are shown before the first message. Generated from property knowledge:
- Regex checks `system_prompt + extracted_data + knowledge_base` for: spa/massage, restaurant/dining, beach/pool, wifi
- If keyword detected → shows a relevant question (EN + ES)
- Fallback chips: "What can you help me with?" / "Tell me about the hotel" / "What's nearby?"

### Pricing

| Plan | Price | Properties | Trial |
|------|-------|-----------|-------|
| Single Property | $249/mo | 1 | 14 days, no CC |
| Small Group | $449/mo | 2–5 | 14 days, no CC |
| Enterprise | Contact | 5+ | Custom |

### Subscription Status States

`trial` → `active` (after Stripe checkout) → `past_due` (payment fails) → `canceled` (subscription deleted)

Trial expires via `trial_ends_at` date. No automatic expiry logic — frontend checks `daysLeft` to show warning banners.

---

## 9 — File Structure

```
/
├── src/
│   ├── app/
│   │   ├── page.tsx                         Homepage (hero, pain pills, revenue, intelligence, how it works, founding, pricing, FAQ, final CTA)
│   │   ├── globals.css                      Body base styles, heading utilities, onboarding background
│   │   ├── layout.tsx                       Root layout — loads fonts, LanguageProvider, metadata
│   │   ├── demo/page.tsx                    Demo page — left copy + right chat window (same ChatInterface component)
│   │   ├── onboarding/page.tsx              4-step onboarding: collect info → analyze → test → create account
│   │   ├── dashboard/
│   │   │   ├── page.tsx                     Server component — fetches user + properties from Supabase
│   │   │   └── DashboardClient.tsx          Property cards, upgrade modal trigger, sign out
│   │   ├── dashboard/properties/[id]/
│   │   │   ├── page.tsx                     Server component — fetches property + conversations
│   │   │   └── PropertyClient.tsx           Stats, deploy links, QR code, conversation list, revenue signals, settings
│   │   ├── assistant/[id]/
│   │   │   ├── page.tsx                     Server component — fetches property, renders AssistantClient
│   │   │   └── AssistantClient.tsx          Guest-facing chat UI — streaming, chips, session tracking
│   │   ├── api/
│   │   │   ├── assistant/[id]/route.ts      POST — streaming AI chat, issue detection, email alerts, revenue signals
│   │   │   ├── preview-chat/route.ts        POST — streaming AI chat for onboarding step 3 test (no DB writes)
│   │   │   ├── extract/route.ts             POST — scrapes URL via Firecrawl, processes files/text, returns knowledge base
│   │   │   ├── stripe/checkout/route.ts     POST — creates Stripe checkout session with property+user metadata
│   │   │   └── stripe/webhook/route.ts      POST — handles Stripe events, updates subscription_status in DB
│   │   ├── auth/callback/route.ts           Handles Supabase OAuth/magic link callbacks
│   │   ├── login/page.tsx                   Login page
│   │   ├── onboarding-success/page.tsx      Post-signup confirmation page
│   │   └── privacy/page.tsx / terms/page.tsx  Legal pages
│   ├── components/
│   │   ├── site-nav.tsx                     Top navigation — logo, Sign In, Demo, Create Assistant CTA, language toggle, mobile drawer
│   │   ├── site-footer.tsx                  Footer — links, language toggle, branding
│   │   ├── chat-interface.tsx               Shared chat UI used in hero demo + /demo page (no property ID, uses /api/demo endpoint)
│   │   ├── UpgradeModal.tsx                 Two-plan upgrade modal with coupon input (FOUNDING40)
│   │   ├── faq-section.tsx                  Accordion FAQ component
│   │   └── LanguageToggle.tsx               EN/ES language switcher button
│   └── lib/
│       ├── i18n/
│       │   ├── translations.ts              All EN + ES strings for every page
│       │   ├── LanguageContext.tsx          React context — provides `t` (translations) and `lang` string
│       │   └── index.ts                     Re-exports
│       ├── supabase/
│       │   ├── client.ts                    Browser Supabase client
│       │   ├── server.ts                    Server Supabase client (cookie-based)
│       │   └── middleware.ts                Session refresh middleware
│       └── marazul-config.ts               Demo property config (MarAzul Riviera Maya) for homepage + /demo
├── middleware.ts                            Next.js middleware — refreshes Supabase session on every request
├── next.config.ts                          Next.js config
├── tailwind.config.ts                      Tailwind v4 config (minimal — mostly uses CSS-first config)
├── tsconfig.json                           TypeScript config
├── package.json                            Dependencies
├── REBUILD.md                              This file
└── .env.local                              Local environment variables (never commit)
```

---

## 10 — Deploy Commands

### Day-to-day deploy
```bash
git add -A && git commit -m "feat: your message" && git push
```
Vercel auto-deploys from `main` branch. No manual deploy step needed.

### First-time local setup
```bash
git clone https://github.com/eduardovertiz-dotcom/placecompanion
cd placecompanion
npm install
cp .env.example .env.local   # add your keys
npm run dev
```

### Environment check
```bash
npx tsc --noEmit   # type check before pushing
npm run build      # full build check
```

### Tag a release
```bash
git tag -a v2.0-production -m "Production ready — unified design system, email alerts, Stripe billing, full EN/ES"
git push origin v2.0-production
```

### Stripe webhook local testing
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

---

## 11 — Things That Are Easy to Break (Don't)

1. **The orange button color** — `#C96A3A` on the "Create Your Assistant" CTA is the brand signature. Never change it to green or any other color.
2. **pdf-parse is uninstalled** — do not re-add it. It caused ESM build failures on Vercel. Files are stubbed with `[PDF UPLOAD: {name} — processing not available]` in `extract/route.ts`.
3. **Auth email confirmation is OFF** — if you re-create the Supabase project, turn this off immediately or new signups will fail silently.
4. **RLS policies** — if you drop and recreate tables, RLS needs to be re-enabled and policies re-applied. The service role key bypasses RLS; the anon key does not.
5. **Stripe price IDs** — these are hardcoded in `.env`. If you archive old prices and create new ones, update the env vars or all checkout sessions will fail.
6. **Resend from address** — currently using `onboarding@resend.dev` (sandbox). When custom domain is verified, switch both calls in `assistant/[id]/route.ts` to `alerts@placecompanion.com`.
7. **Streaming AI responses** — the assistant uses raw text streaming (`result.toTextStreamResponse()`), not the AI SDK's `useChat` hook. The client reads chunks directly. Do not switch to `useChat` without testing — it changes the response format.
