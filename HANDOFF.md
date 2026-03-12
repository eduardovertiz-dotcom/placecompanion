# Place Companion — Project Handoff

## What This Is

**Place Companion** is an AI-powered guest concierge SaaS built exclusively for hotels.

The pitch: hotels are the most human business in the world, but they have no conversation layer — every tool they use (PMS, booking engine) manages operations, not guests. Place Companion fills that gap. It knows both the hotel's internal services *and* the destination around it. Guests reach it via QR codes in rooms, an embedded website widget, or a shareable link. No app required. Multilingual by default.

**Positioning: hotels only.** The codebase supports 6 verticals (hotels, hospitals, airports, residential, retail, university), but all marketing, copy, and brand decisions are locked to hotels. The multi-vertical capability is infrastructure — do not surface it in marketing or change the positioning.

**Live demo persona:** Marina, AI Companion of MarAzul Riviera Maya (a fictional boutique coastal hotel, part of the MarAzul Collection).

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| AI | Vercel AI SDK (`ai`, `@ai-sdk/anthropic`, `@ai-sdk/react`) |
| Model | `claude-haiku-4-5-20251001` |
| Icons | `lucide-react` |
| Backend (future) | Supabase (`@supabase/ssr`, `@supabase/supabase-js` — installed, not yet wired) |
| Fonts | Cormorant Garamond (serif) + DM Sans (sans) via `next/font/google` |
| Deploy | Vercel |

---

## Design System — Locked Tokens

### Dark palette (marketing site, chat)

| Role | Hex | Used in |
|---|---|---|
| Page background | `#1C1917` | `body`, all dark pages |
| Deep black | `#0F0D0B` | Chat area bg, hero demo window bg |
| Card / surface | `#242019` | User chat bubble, pricing cards, form bg |
| Footer | `#161310` | `SiteFooter` |
| Assistant bubble | `#1E3328` | AI message background |
| Reserved dark 1 | `#141413` | Defined, not yet placed |
| Reserved dark 2 | `#1F1E1D` | Defined, not yet placed |

### Text

| Role | Hex |
|---|---|
| Primary text | `#E8E3DC` |
| Secondary text | `#A8A099` |
| Muted / labels | `#6B6560` |

### Action colors

| Role | Hex |
|---|---|
| Green (primary) | `#2D9E6B` |
| Green hover | `#3DC47F` |
| Terracotta | `#C96A3A` |

### CTA Color Rule (locked decision)

- **Nav CTA** ("Create Your Hotel Assistant") → `#C96A3A`
- **Hero CTA** ("Create Your Hotel Assistant") → `#C96A3A`
- **Chat send button** → `#2D9E6B`
- All other CTAs (pricing cards, FinalCTA section, founding partners CTA) → `#2D9E6B`

> **Note:** The nav and hero CTAs are currently rendered in `#2D9E6B`. Switching them to `#C96A3A` is a pending design task.

### Typography

- Headings: `font-serif` → Cormorant Garamond
- Body / UI: `font-sans` → DM Sans
- Hero h1: `88px`, section h2: `56px` (hardcoded inline style — responsive scaling not yet done)
- Nav background: `rgba(28,25,23,0.92)` with `backdrop-blur-xl`

### Light palette (onboarding only)

The onboarding page uses an intentionally different light theme:
- Background: `#F7F4EE`
- Text: `#1C1917`
- Form card: `white`

---

## File Map — Every File Modified

### Modified (tracked, had prior content)

| File | What changed |
|---|---|
| `src/app/api/chat/route.ts` | Switched from raw Anthropic SDK to Vercel AI SDK (`streamText`); config now passed from client as `propertyConfig` |
| `src/app/demo/page.tsx` | Rebuilt as dedicated demo page with MarAzul chat window; replaced earlier placeholder |
| `src/app/globals.css` | Added `@theme inline` font variable mapping for Cormorant + DM Sans |
| `src/app/layout.tsx` | Added Google Font imports, metadata, font CSS variables on `<body>` |
| `src/app/onboarding/page.tsx` | Full onboarding layout with light theme, `OnboardingForm` component |
| `src/app/page.tsx` | Full marketing homepage: Hero, Pain, Revenue, Intelligence, How It Works, Founding Partners, Pricing sections |
| `src/components/chat-interface.tsx` | Rebuilt with `useChat` + `TextStreamChatTransport`; suggestion chips; markdown renderer; loading state |
| `src/components/onboarding-form.tsx` | 5-step multi-vertical onboarding form; generates `PropertyConfig` JSON |
| `package.json` | Added `@ai-sdk/anthropic`, `@ai-sdk/react`, `ai`, Supabase packages |
| `package-lock.json` | Updated lockfile |
| `.claude/settings.local.json` | Claude Code local settings |

### New (untracked, created this session)

| File | What it is |
|---|---|
| `src/app/about/page.tsx` | Full about page: why hotels, the destination angle, what Place Companion is not, the vision |
| `src/app/features/page.tsx` | Features page: intelligence, guest journey (pre/during/post stay), 3 deployment methods, stack positioning |
| `src/components/final-cta.tsx` | Reusable bottom-of-page CTA section ("Create your hotel assistant") |
| `src/components/site-footer.tsx` | Site footer with nav links, EN/ES toggle, copyright |
| `src/components/site-nav.tsx` | Sticky top nav with logo, links (hidden on mobile), "See Live Demo" + "Create Your Hotel Assistant" CTAs |
| `src/lib/marazul-config.ts` | `PropertyConfig` object for MarAzul Riviera Maya — the live demo persona (Marina) |

### Supporting files (not modified but important)

| File | What it is |
|---|---|
| `src/lib/build-system-prompt.ts` | Builds Claude system prompt from `PropertyConfig`; vertical-specific instructions |
| `src/lib/vertical-configs.ts` | Form defaults (labels, placeholders, default personality/greeting) for all 6 verticals |
| `src/lib/demo-config.ts` | Re-exports `marazulConfig` as `demoConfig` |
| `src/types/property.ts` | Core types: `PropertyConfig`, `SpaceVertical`, `SupportedLanguage`, `ChatMessage` |

---

## Architecture — How It Works

```
PropertyConfig (type-safe object)
       │
       ▼
buildSystemPrompt()  →  Claude system prompt string
       │
       ▼
/api/chat  (POST, streamText via Vercel AI SDK)
       │
       ▼
ChatInterface (useChat + TextStreamChatTransport)
```

- `PropertyConfig` is the central data contract. Every hotel's services, FAQs, companion identity, and branding live here.
- `marazulConfig` is the static demo config used on `/` and `/demo`.
- `OnboardingForm` generates a `PropertyConfig` JSON client-side (no backend yet — next step is persisting to Supabase).
- The chat API route (`/api/chat`) accepts `propertyConfig` in the request body and builds the system prompt dynamically.
- `demoConfig` is just a re-export alias of `marazulConfig`.

---

## Known Issues / Fixed During Sessions

- **Greeting duplication:** The initial assistant greeting was appearing twice (once from `useChat` initial messages, once from the API). Fixed by seeding the greeting as a static initial message in `useChat` and not returning it from the API.
- **Streaming on Vercel AI SDK v6:** `useChat` API changed significantly in AI SDK v6 — messages use `parts` arrays, not `content` strings. Updated `ChatInterface` and the route accordingly.
- **Font flash:** Body was rendering in system font before Cormorant loaded. Fixed by using `next/font` variables properly in `globals.css` via `@theme inline`.
- **Nav links hidden on mobile:** `hidden md:flex` — intentional for now, hamburger menu not yet built.
- **Hero h1 overflow on small screens:** `88px` hardcoded in `style={{}}` — not yet responsive.

---

## Git & Deployment

### Remotes

| Name | Repo | Purpose |
|---|---|---|
| `origin` | `github.com/eduardovertiz-dotcom/placecompanion` | Source of truth / backup |
| `vercel` | `placecompanion-v2` | Production deploy target |

### Deploy command

```bash
git add . && git commit -m "message" && git push vercel main --force
```

### Environment variables required

```
ANTHROPIC_API_KEY=...
```

Supabase vars (not yet active):
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

---

## What's Next

### Priority 1 — Mobile responsiveness

The site is desktop-first. Nothing breaks catastrophically on mobile but it needs proper responsive treatment:

- **Nav:** Add hamburger menu — links are `hidden md:flex`, CTA buttons stack awkwardly below `sm`
- **Hero h1:** `88px` hardcoded — needs `text-[clamp(40px,8vw,88px)]` or responsive Tailwind classes
- **Hero grid:** `lg:grid-cols-2` collapses to single column correctly, but chat window height (`580px`) is too tall on mobile
- **About page h1:** `96px` hardcoded — same issue
- **Features page h1:** `88px` hardcoded
- **Pricing cards:** Grid collapses fine but `p-12` is generous — needs `p-6 md:p-12`
- **Chat interface:** Input bar and send button are fine; suggestion chips may overflow on very small screens

### Priority 2 — Supabase persistence

Supabase is installed but not wired. The API route shared in the last conversation shows the intended schema:
- `properties` table (id, system_prompt, hotel_name, is_active)
- `conversations` table (property_id, guest_session_id, last_message_at, message_count)
- `messages` table (conversation_id, property_id, role, content, revenue_signal)

Revenue signal detection is already written (`detectRevenueSignal()` in the shared code).

### Priority 3 — CTA color swap

Switch nav CTA and hero CTA from `#2D9E6B` to `#C96A3A` per the locked design rule above.
