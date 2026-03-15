You are working on the Place Companion codebase. Read every file listed before making changes. Do not guess — read first.

DESIGN SYSTEM — USE ONLY THESE VALUES:
Page bg: #080706 | Nav bg: #161310 | Card: #1A1715 | Card2: #1F1C19
Modal bg: #0F0D0B | Onboarding bg: #1C1917 | Selected bg: #2C1810
Border subtle: rgba(232,227,220,0.06) | Border medium: rgba(232,227,220,0.08)
Border hover: rgba(232,227,220,0.12) | Ghost border: rgba(232,227,220,0.15)
Text white: #FFFFFF | Text warm: #FAF9F5 | Text warm2: #E8E3DC
Text muted: #A8A099 | Text faint: #6B6560
Orange CTA: #C96A3A (NEVER CHANGE) | Orange hover: #D4784A
Green: #2D9E6B | Error: #F87171
Fonts: font-serif = Cormorant Garamond | font-sans = DM Sans

RULES — NEVER BREAK THESE:
- Never introduce hex colors not listed above
- Never change #C96A3A orange CTA
- Never touch API routes, Supabase, Stripe, Resend, or auth logic
- Never change any href or link destination
- Never add new npm packages
- Use className="absolute" not style={{position:'absolute'}}
- Follow i18n pattern (useLang / t.*) in any file that already uses it
- Run npx tsc --noEmit when done and fix all TypeScript errors

CHANGE 1 — NAV CTA HIERARCHY
File: src/components/site-nav.tsx
Read the full file first.
Make Sign In, See Demo, and Create Assistant have three distinct visual weights:

Sign In — plain text only, no button styling:
  color #6B6560, fontSize 13px, padding 4px 8px
  hover color #A8A099, no border, no background

See Demo — ghost button:
  background transparent, border 1px solid rgba(232,227,220,0.15)
  borderRadius 8px, color #A8A099, padding 8px 16px
  fontSize 13px, height 36px
  hover color #FAF9F5, borderColor rgba(232,227,220,0.25)

Create Assistant — full orange primary button:
  background #C96A3A, hover background #D4784A
  color white, borderRadius 8px
  height 48px, padding 0 24px
  fontSize 15px, fontWeight 600
  This must be the largest most dominant element in nav

Apply same three tiers in the mobile drawer too.
Do NOT change logo, nav links, language toggle, hamburger, scroll behavior, or backdrop blur.

CHANGE 2 — ANNOUNCEMENT BAR
Read first: src/app/layout.tsx and src/components/site-nav.tsx

Create new file: src/components/AnnouncementBar.tsx

Specs:
- Add 'use client' at top
- Read localStorage key 'pc_announcement_dismissed' on mount
- If value is 'true' return null immediately (no flash)
- Dismiss button sets localStorage to 'true' and hides bar

Visual design:
  background #161310
  borderBottom 1px solid rgba(232,227,220,0.06)
  height 40px, display flex, alignItems center, justifyContent center
  position relative (NOT fixed)

Content inside the bar (centered row, gap 8px):
  1. Green pulsing dot: width 7px, height 7px, borderRadius 9999px
     background #2D9E6B, animate opacity 1 to 0.3 and back, 2s loop
  2. Text: "Founding Partner spots: " color #A8A099, fontSize 13px
  3. Text: "4 of 10 remaining" color #FAF9F5, fontWeight 500
  4. Text: " — lock in 20% off for life" color #A8A099
  5. Link "Book your call →" href="#founding-partners"
     color #C96A3A, hover #D4784A, fontSize 13px, fontWeight 500
  6. Dismiss × button: className="absolute", right 16px
     background none, border none, color #6B6560
     fontSize 18px, cursor pointer
     hover color #A8A099

Then in src/app/layout.tsx:
  Import AnnouncementBar
  Render it ABOVE SiteNav
  Only show on marketing pages — NOT on /dashboard, /assistant, or /auth paths
  Do not change pt-16 or any other layout padding

CHANGE 3 — "ONE ASSISTANT" STAMP
File: src/app/page.tsx
Read the full file first.
Find the Destination Intelligence section with YOUR HOTEL / YOUR DESTINATION columns.
Find the line "One assistant. Complete knowledge." at the bottom of that section.

Change its styling to:
  Full width below both columns
  paddingTop 40px, marginTop 40px
  borderTop 1px solid rgba(232,227,220,0.08)
  textAlign center
  font-serif, fontSize clamp(1.8rem, 4vw, 2.8rem), fontWeight 600
  color #FFFFFF, letterSpacing -0.02em

Do NOT change anything else in that section.

CHANGE 4 — ONBOARDING HEADLINE
File: src/app/onboarding/page.tsx
Read the full file first. Find Step 1 input area.
Find the subtitle that describes the three input methods.

ADD this headline element ABOVE the existing subtitle (do not replace it):
  Text: "Use what you have." (English) / "Usa lo que tienes." (Spanish)
  font-serif, fontSize clamp(1.8rem, 5vw, 3rem), fontWeight 600
  color #FFFFFF, lineHeight 1.1, marginBottom 12px

If the page uses i18n t.* keys, add the key to src/lib/i18n/translations.ts too.
Do NOT change any form fields, upload areas, style selectors, room count pills, or buttons.

CHANGE 5 — FIX UPGRADE MODAL
File: src/components/UpgradeModal.tsx
Read the full file first.

Problem: modal is too tall, clips top and bottom, cannot scroll.

Fix:
1. Overlay div:
   className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center"
   paddingTop 24px, paddingBottom 24px, paddingLeft 16px, paddingRight 16px
   background rgba(0,0,0,0.85) — keep existing color

2. Modal box div:
   Remove any fixed height causing overflow
   Add maxHeight calc(100vh - 48px), overflowY auto
   Keep background #0F0D0B, border 1px solid rgba(232,227,220,0.08)
   Keep borderRadius 16px
   Padding: 40px desktop, 24px mobile
   width 100%, maxWidth 560px

3. Modal header (title + close button):
   className="sticky top-0"
   background #0F0D0B, paddingBottom 20px, zIndex 10

4. Plan cards:
   Desktop: side by side — keep existing
   Mobile: stack vertically, full width
   Remove any fixed height on cards

5. Close on outside click:
   Add onClick={onClose} to overlay div
   Add onClick={e => e.stopPropagation()} to modal box div

6. ESC key: keep existing handler if present

CHANGE 6 — ADD UPSELL CONVERSATION EXAMPLES
File: src/app/page.tsx
Read the Revenue section completely first.
Find the existing room upgrade conversation example (10:14 PM, +$250/night).
Use the EXACT same JSX structure, bubble styles, and card styles for the three new examples below.

If existing examples use tabs: add three new tabs.
If stacking: add borderTop 1px solid rgba(232,227,220,0.06), paddingTop 40px, marginTop 40px between each.

ADD EXAMPLE 2 — Spa booking:
  Time: "2:32 PM"
  User: "Do you have couples massages available this evening?"
  AI: "Yes! The spa has availability at 6 PM and 7:30 PM. Our Riviera Couples Ritual is 90 minutes — $180/couple. Add a champagne welcome for $220 total. Shall I reserve a time?"
  User: "7:30 with the champagne, please."
  AI: "Done! Confirmed for 7:30 PM. The team will have everything ready. Enjoy your evening."
  Result label: "Spa booking + upsell captured"
  Result value: "+$220"

ADD EXAMPLE 3 — Late checkout:
  Time: "8:45 AM"
  User: "Our flight is at 4pm — any chance we can check out at 2pm instead of 12?"
  AI: "Good news — 2 PM late checkout is available. There is a $45 fee added to your final bill. Want me to confirm?"
  User: "Yes, perfect, thank you."
  AI: "Confirmed! Checkout updated to 2 PM. Safe travels — hope to see you at MarAzul again soon."
  Result label: "Late checkout fee captured"
  Result value: "+$45"

ADD EXAMPLE 4 — Maintenance issue:
  Time: "11:52 PM"
  User: "The AC in our room is not cooling — it is quite warm in here."
  AI: "I am sorry about that. Can you confirm your room number so I can alert maintenance right away?"
  User: "Room 221."
  AI: "Maintenance has been alerted and is on the way. I have also requested a portable fan as backup. We will have this sorted shortly."
  Result label: "Issue resolved before a bad review"
  Result value: "0 complaints"
  Result value color: #2D9E6B (green, not orange — this is operational not revenue)

FINAL CHECKS:
1. Run npx tsc --noEmit and fix ALL TypeScript errors
2. Confirm no new hex colors outside the design system
3. Confirm #C96A3A is unchanged everywhere
4. Confirm no new packages in package.json
5. Confirm no API routes were touched
6. Report every file modified with a one-line summary of what changed
