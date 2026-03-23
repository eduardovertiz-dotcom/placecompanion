# PLACE COMPANION — Master Context Document
Last updated: March 22, 2026

## WHAT THIS IS
Place Companion is an AI guest companion platform for independent boutique hotels. SaaS product live at placecompanion.com. Built with Next.js 15, Tailwind v4, Supabase, Stripe, Anthropic API, Resend, Vercel.

## TECH STACK
- Framework: Next.js 15 App Router
- Styling: Tailwind v4 + inline styles
- Database: Supabase (fhrgapgrxmbkjwearixc)
- Payments: Stripe (test mode)
- Email: Resend
- AI: Anthropic API (@ai-sdk/anthropic — NOT @anthropic-ai/sdk)
- Hosting: Vercel (placecompanion-v2 project)
- Repo: github.com/eduardovertiz-dotcom/placecompanion
- Local: ~/Desktop/placecompanion
- Terminal shortcut: type `pc` to cd into project

## DESIGN SYSTEM — NEVER DEVIATE
### Colors
- Page bg: #080706
- Card bg: #0F0D0B
- Elevated card: #1A1715
- Input fields: #1F1C19
- Primary text: #FFFFFF
- Secondary text: #A8A099
- Muted text: #6B6560
- Borders: rgba(232,227,220,0.06)
- Accent orange (CTAs, send buttons): #C96A3A hover #D4784A
- Accent green (status, active): #2D9E6B
- Accent amber: #D4A84B

### Typography
- Headings: Cormorant Garamond (font-serif)
- Body/UI: DM Sans (font-sans)
- Font smoothing: antialiased in globals.css

### Buttons
- Primary: bg #C96A3A text white — ALL primary CTAs
- Ghost: border rgba(232,227,220,0.25) text #E8E3DC
- Green: ONLY for save/subscribe actions
- NEVER green on send buttons or primary CTAs

### Cards
- border-radius: 12px
- border: 1px solid rgba(232,227,220,0.06)

## WHAT NOT TO DO — EVER
- No team section anywhere on the site
- No light/dark alternating sections
- No "chatbot" — always "assistant"
- No @anthropic-ai/sdk — use @ai-sdk/anthropic
- No green on send buttons — always orange #C96A3A
- No "RECOMMENDED" badge on pricing cards
- No "free trial" language — always "pilot"
- No "Try It Free" — always "Start Your Pilot"
- No "Trusted by X hotels" until true
- No PMS/Cloudbeds/Mews language anywhere
- No team section
- No "Talk to Us First" button

## PRICING (LIVE IN STRIPE)
| Plan | Monthly | Annual | Stripe Monthly ID | Stripe Annual ID |
|------|---------|--------|-------------------|------------------|
| Companion | $349/mo | $3,348/yr | price_1TDoo6BgMSWbEFIIRTiYpX3C | price_1TDrWsBgMSWbEFIIvUeyIEsM |
| Companion Pro | $599/mo | $5,748/yr | price_1TDoyDBgMSWbEFIImxwyxJvL | price_1TDrXwBgMSWbEFIIOk74Tmc4 |
| Portfolio | Custom | Custom | price_1TDqW5BgMSWbEFIImsrlKac2 | — |

- Coupon: FOUNDING20 — 20% off forever — max 5 redemptions
- Founding partner rate: 20% off locked for life

## ENVIRONMENT VARIABLES (all set in Vercel + .env.local)
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- ANTHROPIC_API_KEY
- RESEND_API_KEY
- STRIPE_SECRET_KEY
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- STRIPE_PRICE_SINGLE_MONTHLY
- STRIPE_PRICE_SINGLE_ANNUAL
- STRIPE_PRICE_GROUP_MONTHLY
- STRIPE_PRICE_GROUP_ANNUAL
- STRIPE_PRICE_PORTFOLIO_MONTHLY
- STRIPE_PRODUCT_PORTFOLIO
- STRIPE_WEBHOOK_SECRET
- NEXT_PUBLIC_SITE_URL
- FIRECRAWL_API_KEY

## SUPABASE TABLES (all with RLS enabled)
- properties
- conversations
- messages
- issue_logs
- agent_memory_logs
- ambassador_referrals
- api_cost_logs
- error_logs

## DEMO PROPERTIES
| Property | URL | Visible | Assistant | Purpose |
|----------|-----|---------|-----------|---------|
| Casa Aurelia San Miguel | /demo | Public | Sofía | Homepage demo — Foursquare + Claude generic |
| La Valise Mexico City | /demo/lavalise | Private link | Lucia | Namron pitch |
| Condesa DF | /demo/condesadf | Private link | Melissa | Habita pitch |
| Ahau Tulum | /demo/ahau | Private link | Nina | Ahau pitch |

## SITE ARCHITECTURE
- / — Homepage
- /features — Features page
- /about — About page
- /demo — Public demo (Casa Aurelia)
- /demo/lavalise — Private demo
- /demo/condesadf — Private demo
- /demo/ahau — Private demo
- /onboarding — Magic moment flow (dark, no nav)
- /auth/login — Auth
- /dashboard — Protected
- /dashboard/properties/[id] — Property management
- /assistant/[id] — Public guest chat
- /admin — Command center (eduardovertiz@gmail.com only) — NOT YET BUILT

## KEY FILES
- src/components/site-nav.tsx — Fixed nav, scroll-aware, language toggle
- src/components/site-footer.tsx
- src/components/AnnouncementBar.tsx — Top bar with founding partner copy
- src/components/CalendlyModal.tsx — Two Calendly call options
- src/components/chat-interface.tsx — Shared chat UI
- src/components/UpgradeModal.tsx — Dark design system
- src/components/FaqSection.tsx
- src/lib/i18n/translations.ts — ALL copy EN + ES
- src/lib/i18n/LanguageContext.tsx
- src/app/api/chat/route.ts — MarAzul demo chat
- src/app/api/assistant/[id]/route.ts — Public assistant (issue detection, email alerts)
- src/app/api/extract/route.ts — Hotel info extraction
- src/app/api/preview-chat/route.ts — Onboarding preview
- src/app/api/stripe/checkout/route.ts
- src/app/api/stripe/webhook/route.ts

## ANNOUNCEMENT BAR
- Desktop EN: "Founding Partner Program · 3 spots remaining — lock in 20% off for life."
- Desktop ES: "Programa de Socios Fundadores · 3 lugares disponibles — tarifas de por vida con 20% de descuento."
- Mobile EN: "3 spots left — 20% off for life."
- Mobile ES: "Quedan 3 lugares — 20% de por vida."
- CTA: "Book your call →" / "Agenda tu llamada →"
- Key numbers highlighted in color #E8E3DC, rest muted #A8A099

## HERO COPY
- EN headline: "Every guest question answered. Every revenue opportunity captured."
- EN subhead: "Your team handles what matters. The rest runs itself."
- ES headline: "Cada pregunta de huésped respondida. Cada oportunidad de ingreso capturada."
- ES subhead: "Tu equipo atiende lo que importa. El resto se maneja solo."
- Trust line EN: "No commitment required · Live in 30 minutes"
- Trust line ES: "Sin compromiso · En vivo en 30 minutos"

## CTA LANGUAGE — CONSISTENT EVERYWHERE
- Primary CTA: "Start Your Pilot" / "Inicia tu Piloto"
- Nav ghost: "See Live Demo" / "Ver Demo en Vivo"
- Founding partners: "Apply for a Founding Partner Spot →"
- Pricing cards: "Start Your Pilot" / "Inicia tu Piloto"
- Pilot language: "14-day pilot · No commitment required"
- NEVER: "Try It Free", "free trial", "no credit card required", "Create Assistant"

## FOUNDING PARTNERS SECTION
- 5 properties, 3 spots remaining
- Body EN: "Founding Partners lock in lifetime rates and shape the product with direct access to the founding team. We select properties that set the standard for independent hospitality in their destination."
- CTA: "Apply for a Founding Partner Spot →"

## DEMO FRAME BORDER — KNOWN ISSUE
Frame visible in Safari only. Chrome/Firefox fix pending. NEXT ATTEMPT (not yet run): background-clip dual-background technique:
```css
border: 1.5px solid transparent;
background: linear-gradient(#0F0D0B, #0F0D0B) padding-box,
            linear-gradient(135deg, rgba(232,227,220,0.35) 0%, rgba(232,227,220,0.08) 50%, rgba(232,227,220,0.28) 100%) border-box;
overflow: hidden;
```
Apply to SINGLE div — no wrapper needed. Safe for dark mode (no WebkitMaskImage).

## BUILD SEQUENCE STATUS (Phase 1)
- ✅ Build 0: Pricing, tier rename, hero headline, founding partners, CTA language
- ⏳ Build 1: Command Center + Conversational Intelligence (/admin) — NEXT
- ⏳ Build 2: Website updates + demo selector (Casa Aurelia as default)
- ⏳ Build 3: Theming engine + property configs
- ⏳ Build 4: Microphone dictation
- ⏳ Build 5: Query routing classifier
- ⏳ Build 6: Google Maps API
- ⏳ Build 7: Knowledge bases + Interaction Logger
- ⏳ Build 8: Demo pages + Critic Agent + polish

## BUILD 1 — COMMAND CENTER FULL PROMPT
Protected route /admin — eduardovertiz@gmail.com only. Seven sections:
1. Protected route + AdminClient sidebar nav (Live/Properties/Revenue/Costs/Intelligence/Ambassadors/Ask the Platform)
2. Live view — summary cards + properties activity table
3. Properties view — full table with search
4. Revenue view — Stripe API server-side, MRR, trials, payments
5. Costs view — api_cost_logs table, margin per property, alert if cost >30% of subscription
6. Intelligence view — agent_memory_logs, critic scores, re-ask patterns
7. Ask the Platform — conversational intelligence, natural language → Supabase queries → streamed answers

Design system: bg #080706, cards #0F0D0B, elevated #1A1715, text #FFFFFF, secondary #A8A099, orange #C96A3A, green #2D9E6B. DM Sans UI, Cormorant Garamond headings.

Also wire api cost logging into src/app/api/assistant/[id]/route.ts — fire and forget after every Claude API call.

Estimated token cost: $6-8 using Claude Code desktop app (Pro subscription).

## PENDING FIXES
1. Demo frame border — Chrome/Firefox (background-clip technique ready — see above)
2. Mobile viewport still slightly too wide — overflow-x hidden on html/body + page wrapper
3. Mobile sticky bottom bar — left button legacy text "Create Assistant" → "See Live Demo", background fully opaque #0F0D0B
4. Intelligence section columns — off-center on desktop, need mx-auto fix

## INVOICE MODAL (already built in DashboardClient.tsx)
- CFDI form: https://forms.gle/CsYAreNSpr2nHCq87
- International: https://forms.gle/gv8vDE62ABG7otH9A

## AMBASSADOR TRACKING
- UTM ?ref= captured in localStorage as pc_ref
- ambassador_referrals table in Supabase
- Commission: 30% year 1, 20% year 2+
- Admin view for eduardovertiz@gmail.com only

## ACCOUNTS
- Anthropic: eduardovertiz@gmail.com
- GitHub: eduardovertiz-dotcom
- Vercel: placecompanion-v2 project → connected to placecompanion repo
- Domain: placecompanion.com (Spaceship, expires Mar 10 2027)
- Stripe: test mode — Corazon del Universo SAS de CV / Place Companion
- Resend: placecompanion.com verified
- Calendly: calendly.com/placecompanion (15min + 30min)
- Supabase: fhrgapgrxmbkjwearixc

## HOW TO START A NEW SESSION
1. Open Claude in the Place Companion Project
2. Say: "Read REBUILD.md in the project root. That is our full context. Let's continue."
3. Claude Code reads the file and has everything it needs instantly.
