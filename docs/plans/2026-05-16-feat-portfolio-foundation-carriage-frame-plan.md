---
title: Portfolio Foundation + Train Carriage Frame (Sprint 1)
type: feat
status: active
date: 2026-05-16
brainstorm: docs/brainstorms/2026-05-16-portfolio-website-brainstorm.md
---

# ✨ Portfolio Foundation + Train Carriage Frame (Sprint 1)

## Overview

Scaffold the Persona-5-themed portfolio site with its signature persistent UI: a "train carriage" frame visible on every page (top status bar, framed content carriage, bottom 6-dot route map), the full design token system (palette, fonts, motion constants), placeholder content for all 6 stations, atmospheric overlays (scanlines, noise, vignette), and a clean Vercel deployment.

This is the load-bearing sprint. Every subsequent sprint (NOW, WORKS, RUMORS, BGM, LAB, train choreography) builds on the architecture decisions made here. The goal is to ship a *navigable shell* with no real content yet, deployed to production from day one.

## Problem Statement / Motivation

A portfolio fused with Persona 5 design language only sells the concept if the persistent UI feels coherent and intentional. Building stations one at a time without the shared frame leads to inconsistent layouts and broken metaphor. Front-loading the carriage, tokens, and navigation:

- **Locks in the design system** so every sprint reuses tokens instead of hardcoding values
- **Tests the train metaphor early** — if the carriage feels wrong with placeholder content, we find out before investing in real content
- **De-risks deployment** — the site is on Vercel from day one, so every subsequent sprint just pushes
- **Forces architectural decisions** (RSC vs Client boundaries, route group structure) now, when the cost of changing is low

## Proposed Solution

A Next.js 16 (App Router) app with a single route group `app/(stations)/` containing a shared `layout.tsx` that mounts the carriage frame. Inside the carriage, page content swaps via `AnimatePresence` with a 200ms crossfade placeholder (the full DEPART → TUNNEL → ARRIVE choreography ships in Sprint 5). Tailwind v4 CSS-first config holds all design tokens. Motion easings and durations live in a TypeScript module so Motion components and CSS can share them. Atmosphere overlays (scanlines, noise, vignette) are fixed full-screen Server Components.

## Technical Approach

### Architecture Decisions (locked for all sprints)

| Decision | Choice | Rationale |
|---|---|---|
| **Layout component model** | RSC layout, isolated client subtrees | Preserves streaming and reduces client JS. Only `<RouteMap>` and `<TransitionWrapper>` are `'use client'`. |
| **Route organization** | Route group `(stations)` with shared `layout.tsx` | Avoids URL pollution while sharing the carriage. Confirmed in Next.js 16 docs. |
| **Theme strategy** | Dark-only, cyberpunk by design | Light mode is explicitly out of scope. Documented as a non-goal in this plan. |
| **Motion package** | `motion` (not `framer-motion`) | Current name. Import from `motion/react`. |
| **Styling** | Tailwind v4 CSS-first via `@theme` in `globals.css` | No `tailwind.config.js`. All tokens map 1:1 to utilities. |
| **Package manager** | pnpm | Fast, disk-efficient, modern default. |
| **Mobile** | Responsive in Sprint 1 (not deferred) | Recruiters open links on phones. |
| **Transition during Sprint 1** | 200ms crossfade | Reserves the full train choreography for Sprint 5 polish. |

### Stack Pin

```
next@^16.2          react@^19          typescript@^5.6
tailwindcss@^4      @tailwindcss/postcss@^4
motion@^11          (imports from "motion/react")
@vercel/analytics   @vercel/og        clsx          tailwind-merge
```

Node 24 LTS. pnpm 9.x.

### Project Structure

```
portfolio/
├── app/
│   ├── (stations)/
│   │   ├── layout.tsx              # RSC — wraps content with carriage frame
│   │   ├── loading.tsx             # "TRAIN INCOMING ▮▮▮"
│   │   ├── error.tsx               # "SIGNAL FAILURE" + retry
│   │   ├── page.tsx                # NOW placeholder
│   │   ├── works/page.tsx          # WORKS placeholder
│   │   ├── lab/page.tsx            # LAB placeholder
│   │   ├── rumors/page.tsx         # RUMORS placeholder
│   │   ├── bgm/page.tsx            # BGM placeholder
│   │   └── contact/page.tsx        # CONTACT placeholder
│   ├── globals.css                 # Tailwind v4 @theme + reset + atmosphere CSS
│   ├── layout.tsx                  # Root: <html lang>, fonts, atmosphere, metadata
│   ├── not-found.tsx               # "STATION NOT FOUND — return to NOW"
│   ├── icon.tsx                    # Dynamic favicon (kanji 現 on void bg)
│   └── opengraph-image.tsx         # Dynamic OG via @vercel/og
├── components/
│   ├── train/
│   │   ├── carriage.tsx            # RSC — framed container, max-w 1280px
│   │   ├── route-map.tsx           # CLIENT — interactive 6-dot nav
│   │   ├── status-bar.tsx          # RSC — top bar with name + lang toggle stub
│   │   ├── transition.tsx          # CLIENT — AnimatePresence wrapper
│   │   ├── stations.ts             # Pure data — kanji, label, href
│   │   └── arriving-announcer.tsx  # CLIENT — aria-live region
│   ├── atmosphere/
│   │   ├── scanlines.tsx           # RSC, fixed overlay
│   │   ├── noise.tsx               # RSC
│   │   └── vignette.tsx            # RSC
│   └── skip-link.tsx               # RSC — skip-to-content
├── lib/
│   ├── motion.ts                   # ease + duration constants
│   ├── fonts.ts                    # next/font setup, exported
│   └── hooks/
│       └── use-reduced-motion.ts   # client hook wrapping motion's hook
├── public/
│   └── (real assets land in later sprints)
├── docs/
│   ├── brainstorms/
│   │   └── 2026-05-16-portfolio-website-brainstorm.md
│   └── plans/
│       └── 2026-05-16-feat-portfolio-foundation-carriage-frame-plan.md
├── .env.example
├── next.config.ts
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
├── eslint.config.mjs
└── README.md
```

### Component Boundary Map

```
RSC                                  CLIENT
─────────────────────────────────    ──────────────────────────────────
app/layout.tsx                       components/train/route-map.tsx
app/(stations)/layout.tsx            components/train/transition.tsx
app/(stations)/page.tsx (+others)    components/train/arriving-announcer.tsx
app/(stations)/loading.tsx           lib/hooks/use-reduced-motion.ts
app/(stations)/error.tsx
app/not-found.tsx
components/train/status-bar.tsx
components/train/carriage.tsx
components/train/stations.ts
components/atmosphere/*.tsx
components/skip-link.tsx
```

### Design Token Mapping (Tailwind v4 `@theme`)

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* ── Palette ── */
  --color-void:          #0A0E14;
  --color-panel:         #11161D;
  --color-elevated:      #1A2029;
  --color-line:          #2A3340;
  --color-text:          #E4E8EE;
  --color-text-muted:    #8A95A5;
  --color-accent-cyan:   #5BC0EB;
  --color-accent-amber:  #F5B82E;
  --color-p5-red:        #E60012;
  --color-p5-red-deep:   #8B0000;
  --color-p5-black:      #0A0A0A;
  --color-p5-white:      #FFF8E7;
  --color-p5-yellow:     #FFD500;

  /* ── Typography ── */
  --font-display: var(--font-anton), "Impact", sans-serif;
  --font-sans:    var(--font-inter), system-ui, sans-serif;
  --font-mono:    var(--font-jetbrains-mono), ui-monospace, monospace;
  --font-jp:      var(--font-noto-jp), serif;

  /* ── Type scale (fluid) ── */
  --text-display:  clamp(3rem, 8vw, 6rem);
  --text-h1:       clamp(2rem, 5vw, 3.5rem);
  --text-h2:       1.875rem;
  --text-body:     1rem;
  --text-ui:       0.875rem;
  --text-micro:    0.75rem;

  /* ── Motion easings ── */
  --ease-snap:    cubic-bezier(0.22, 1, 0.36, 1);
  --ease-punch:   cubic-bezier(0.16, 1.3, 0.36, 1);
  --ease-train:   cubic-bezier(0.65, 0, 0.35, 1);
  --ease-glitch:  cubic-bezier(0.85, 0, 0.15, 1);

  /* ── Layout constants ── */
  --container-carriage: 1280px;
  --spacing-station-y:  6rem;

  /* ── Z-index scale ── */
  --z-skip-link:      60;
  --z-overlay-noise:  50;
  --z-overlay-scan:   49;
  --z-overlay-vig:    48;
  --z-statusbar:      40;
  --z-routemap:       40;
  --z-content:        10;
}
```

### Motion Constants (TS module)

```ts
// lib/motion.ts
export const ease = {
  snap:   [0.22, 1, 0.36, 1] as const,
  punch:  [0.16, 1.3, 0.36, 1] as const,
  train:  [0.65, 0, 0.35, 1] as const,
  glitch: [0.85, 0, 0.15, 1] as const,
}

export const dur = {
  micro:  0.15,
  fast:   0.3,
  normal: 0.5,
  punch:  0.6,
  train:  1.2,
} as const
```

### Fonts (next/font/google)

```ts
// lib/fonts.ts
import { Anton, Inter, JetBrains_Mono, Noto_Sans_JP } from "next/font/google"

export const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anton",
  adjustFontFallback: true,
})

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: true,
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  adjustFontFallback: true,
})

export const notoJp = Noto_Sans_JP({
  weight: ["900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-jp",
  preload: false,           // deferred — only used for kanji decoration
})
```

### Station Data Shape

```ts
// components/train/stations.ts
export type Station = {
  id: "now" | "works" | "lab" | "rumors" | "bgm" | "contact"
  href: string
  label: string         // EN
  kanji: string         // JP (will be wrapped with lang="ja")
  order: number
}

export const stations: readonly Station[] = [
  { id: "now",     href: "/",        label: "NOW",     kanji: "現在地", order: 0 },
  { id: "works",   href: "/works",   label: "WORKS",   kanji: "仕事",   order: 1 },
  { id: "lab",     href: "/lab",     label: "LAB",     kanji: "実験",   order: 2 },
  { id: "rumors",  href: "/rumors",  label: "RUMORS",  kanji: "噂",     order: 3 },
  { id: "bgm",     href: "/bgm",     label: "BGM",     kanji: "BGM",   order: 4 },
  { id: "contact", href: "/contact", label: "CONTACT", kanji: "連絡",   order: 5 },
] as const
```

### Visual State Specifications

| State | Dot size | Fill | Ring | Animation |
|---|---|---|---|---|
| Inactive | 10px | `--color-line` | none | none |
| Hover | 12px (scale 1.2) | `--color-p5-red` | 6px glow `--color-p5-red/40` | 150ms `--ease-snap` |
| Active | 14px (scale 1.4) | `--color-accent-amber` | 8px glow `--color-accent-amber/30` | persistent |
| Focus | (state's size) | (state's fill) | 2px solid `--color-accent-cyan` offset 2px | none |
| Disabled | n/a (Sprint 1 has no disabled state) | | | |

Color contrast verified: `--color-accent-amber` (#F5B82E) on `--color-void` (#0A0E14) = 11.2:1 AA✅ AAA✅. `--color-p5-red` (#E60012) on `--color-void` = 5.1:1 AA✅ — usable for active labels.

### Implementation Phases

Sprint 1 splits into 4 phases. Each is a single sitting (~2-4 hrs). Ship-to-Vercel between each.

#### Phase 1: Scaffold & Deploy

**Deliverable:** A pnpm-managed Next.js 16 app deployed to Vercel showing a single placeholder page.

Tasks:
1. `pnpm create next-app@latest portfolio` → TypeScript ✅, ESLint ✅, Tailwind ✅, App Router ✅, Turbopack ✅, `src/` directory ❌, import alias `@/*` ✅
2. Pin dependencies: `pnpm add motion @vercel/analytics @vercel/og clsx tailwind-merge`
3. Set Node version: add `"engines": { "node": ">=24.0.0" }` and `.nvmrc` with `24`
4. Initialize git, create GitHub repo, push
5. Connect repo on Vercel dashboard, deploy
6. Verify deploy URL works
7. Add `<Analytics />` to root layout

**Acceptance:** `pnpm dev` boots clean; production URL renders default page; analytics events fire.

#### Phase 2: Tokens, Fonts, Atmosphere

**Deliverable:** The page now feels right even with no content — scanlines, noise, vignette, fonts loaded, dark-void background.

Tasks:
1. Rewrite `app/globals.css` with the full `@theme` block above
2. Add Tailwind v4 base reset utilities
3. Create `lib/fonts.ts` per spec
4. Create `lib/motion.ts` per spec
5. Update `app/layout.tsx`:
   - Apply `lang="en"`, all font CSS variables on `<body>`
   - Mount `<ScanlineOverlay />`, `<NoiseOverlay />`, `<Vignette />`
   - Mount `<SkipLink />` first focusable
   - Set base metadata (title, description, themeColor `#0A0E14`)
6. Create `app/icon.tsx` (kanji 現 rendered with `@vercel/og`)
7. Create `app/opengraph-image.tsx` (1200x630 with site name on void bg)
8. Build atmosphere components:
   - `scanlines.tsx`: fixed pseudo-bg, `aria-hidden`, `pointer-events: none`, z=`--z-overlay-scan`, opacity 0.04
   - `noise.tsx`: 1px SVG turbulence noise tiled, opacity 0.03, z=`--z-overlay-noise`
   - `vignette.tsx`: radial gradient overlay, z=`--z-overlay-vig`
9. Build `components/skip-link.tsx` — sr-only until focused, jumps to `#main`

**Acceptance:** Visiting the deployed URL shows the void background with scanlines + noise + vignette. Fonts load with `display: swap`, CLS < 0.05 on Lighthouse mobile.

#### Phase 3: Carriage Frame & Route Stubs

**Deliverable:** All 6 stations are reachable, each renders its placeholder inside the consistent carriage frame.

Tasks:
1. Create `components/train/stations.ts` per spec
2. Create `<StatusBar />` (RSC):
   - Top of carriage; mono font; site identifier (your name + tagline)
   - JP/EN toggle as a non-functional `<button>` stub (logs to console)
   - Settings icon (Lucide) as stub
3. Create `<Carriage />` (RSC):
   - `max-width: var(--container-carriage)`, `mx-auto`
   - Subtle 1px `--color-line` inset border with rounded corners
   - Padding `var(--spacing-station-y)` Y
4. Create `<RouteMap />` (CLIENT):
   - Uses `usePathname()` to determine active station
   - Renders an `<nav aria-label="Velvet Line stations">` with 6 `<Link>` elements (always real anchors for no-JS fallback)
   - Each link wraps a dot + sr-only label text
   - Animated amber rail (`<div>` with `--color-accent-amber/30` and 3px height) behind dots
   - Keyboard: arrow keys move focus between stations (clamp at ends, no wrap), Enter activates
   - Below 1024px: dot spacing compresses; below 640px: route map becomes horizontal scroller with `scroll-snap-type: x mandatory` and active dot scrolls into center
5. Create `<TransitionWrapper>` (CLIENT):
   - Receives `children` and keys `<AnimatePresence mode="wait">` on `usePathname()`
   - `initial={false}` on first mount (no transition on direct deep-link)
   - 200ms crossfade only (Sprint 5 will replace with the train choreography)
   - Respects `useReducedMotion()` — falls back to instant swap
6. Create `<ArrivingAnnouncer />` (CLIENT):
   - `aria-live="polite"` region announcing "Arrived at [station name]" on route change
7. Build `app/(stations)/layout.tsx` (RSC):
   ```tsx
   <SkipLink />
   <StatusBar />
   <Carriage>
     <main id="main">
       <TransitionWrapper>{children}</TransitionWrapper>
     </main>
   </Carriage>
   <RouteMap />
   <ArrivingAnnouncer />
   ```
8. Build the 6 placeholder pages (`app/(stations)/page.tsx` + 5 others). Each looks like:
   ```tsx
   export default function Station() {
     return (
       <section className="grid place-items-center min-h-[60vh]">
         <div className="text-center font-mono">
           <p className="text-text-muted" lang="ja">現在地 / NOW</p>
           <p className="font-display text-display mt-4">UNDER CONSTRUCTION</p>
           <p className="text-text-muted mt-2">// arrives Sprint 2</p>
         </div>
       </section>
     )
   }
   ```
9. Add `app/(stations)/loading.tsx`: "TRAIN INCOMING ▮▮▮" mono text inside the carriage
10. Add `app/(stations)/error.tsx` (client component): "SIGNAL FAILURE" + retry button
11. Add `app/not-found.tsx`: "STATION NOT FOUND — return to NOW"

**Acceptance:** All 6 routes navigate cleanly via RouteMap. Active dot is distinguishable. Keyboard nav works. ARRIVING text announces. Direct deep-link to `/lab` renders without flash. Refresh on any station works. 404 renders inside the carriage. Mobile (375px) is usable.

#### Phase 4: Quality Pass & Deploy

**Deliverable:** Lighthouse-clean, accessible, deployed, README'd.

Tasks:
1. Add `<Analytics />` from `@vercel/analytics/react` to root layout (verify pageviews fire)
2. Run Lighthouse on the home placeholder (mobile, Slow 4G):
   - Performance > 90
   - Accessibility > 95
   - Best Practices > 95
   - Fix anything below target
3. Verify in axe DevTools — zero violations
4. Verify TypeScript strict + `noUncheckedIndexedAccess` enabled, run `tsc --noEmit` clean
5. Verify ESLint passes
6. Test with `prefers-reduced-motion` set in DevTools — transition is instant
7. Test keyboard-only navigation start-to-finish
8. Test with screen reader (VoiceOver on macOS) — landmarks announced, station changes announced
9. Write README:
   - Quick start (`pnpm install && pnpm dev`)
   - Stack overview
   - Sprint roadmap with link to the brainstorm doc
   - Deployment notes
10. Ship to production

**Acceptance:** Production URL passes all targets; README is complete; you'd be comfortable putting the URL in a job application *as a foundation in progress*.

## Alternative Approaches Considered

### Alt 1: Build everything in one big page, scroll-snap between sections
**Rejected.** Loses the "train arrives at a station" metaphor. Long pages also hurt perceived performance and make per-section URL sharing impossible (a recruiter can't link directly to your Lab).

### Alt 2: Use a state machine library (XState) for the train state
**Rejected.** YAGNI. `usePathname` + `AnimatePresence` covers everything needed. State machines pay off when you have orthogonal concurrent states; we don't.

### Alt 3: Server-Component-only with View Transitions API instead of Motion
**Tempting but rejected for now.** View Transitions API has uneven browser support (Safari 18+ only), and the Sprint 5 choreography (streaking lights, viewport rumble) is easier in Motion. Reconsider for v2 of the site.

### Alt 4: Parallel routes (`@station` slots) for the carriage
**Rejected.** Adds complexity without solving a current need. If Sprint 5 turns out to require showing outgoing-and-incoming pages simultaneously during TUNNEL, we'll refactor — but the standard `AnimatePresence mode="wait"` pattern handles most needs.

## Acceptance Criteria

### Functional
- [ ] `pnpm install && pnpm dev` boots cleanly with no warnings
- [ ] All 6 station routes render their placeholder inside the carriage frame
- [ ] Direct deep-link to any station (e.g., `/lab`) renders correctly without transition flash
- [ ] RouteMap dot states match the table in "Visual State Specifications"
- [ ] Clicking any dot navigates to that station and updates the active visual state
- [ ] Hovering a dot reveals the station label tooltip
- [ ] Keyboard nav: Tab reaches the RouteMap, arrow keys move focus (clamped, no wrap), Enter activates
- [ ] Inactive route transition is a 200ms crossfade (Sprint 5 replaces this)
- [ ] All 4 custom fonts load with `display: swap` and metric-adjusted fallbacks
- [ ] Design tokens consumable as Tailwind utilities (`bg-void`, `text-text`, `font-display`) AND raw CSS vars
- [ ] Scanline + noise + vignette overlays render correctly with `aria-hidden` and `pointer-events: none`
- [ ] Atmosphere overlays don't intercept clicks or scroll
- [ ] `app/(stations)/loading.tsx` renders during route transitions on slow networks
- [ ] `app/(stations)/error.tsx` renders on thrown errors with a retry option
- [ ] `app/not-found.tsx` renders inside the carriage frame
- [ ] Dynamic favicon and OG image generate via `@vercel/og`
- [ ] Production deploy on Vercel succeeds
- [ ] Vercel Analytics pageview events fire

### Non-Functional
- [ ] Lighthouse (mobile, Slow 4G): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 90
- [ ] CLS < 0.05 on initial load
- [ ] No console errors or warnings in any browser
- [ ] Keyboard-only user can reach and operate every interactive element
- [ ] Skip-to-content link works (first focusable, visible on focus, jumps to `<main id="main">`)
- [ ] `prefers-reduced-motion: reduce` is respected — transitions go instant; scanline animation stops (if any)
- [ ] All atmosphere overlays have `aria-hidden="true"`
- [ ] Screen reader announces station changes via `aria-live="polite"`
- [ ] All Japanese text wrapped with `lang="ja"`
- [ ] Color contrast verified: active station label, status bar text, body text all ≥ AA
- [ ] Renders correctly at 375px, 768px, 1024px, 1440px viewports

### Quality Gates
- [ ] TypeScript: `strict: true` + `noUncheckedIndexedAccess: true`, `tsc --noEmit` passes
- [ ] ESLint passes with no warnings
- [ ] No `any` types anywhere
- [ ] No client components beyond the documented set (RouteMap, TransitionWrapper, ArrivingAnnouncer, error.tsx, useReducedMotion hook)
- [ ] All RSCs avoid client-only APIs (no `useState`, no event handlers)
- [ ] README documents quickstart, stack, and deployment

## Success Metrics

- **Time-to-Phase-4-deploy:** Target < 8 hours (4 phases × ~2 hrs)
- **Bundle size first-load JS:** Target < 100KB
- **Time-to-Interactive on Vercel preview, mobile Slow 4G:** Target < 3s
- **Tokens consumed in placeholder pages:** Every placeholder uses ≥3 design tokens (validates the system works)
- **Subjective:** When you look at the carriage frame with no content, does it already feel like *your* site? If yes, Sprint 1 succeeded.

## Dependencies & Prerequisites

### Pre-Sprint-1 (not blocking but recommended in parallel)
- **Domain registration.** Pick and register a domain (e.g., `yourname.dev`). Wire DNS to Vercel before Phase 4 deploy. *Site will be live on Vercel's free `*.vercel.app` URL without it.*
- **Repo + GitHub.** Empty repo created and accessible.
- **Vercel account.** Free tier is sufficient.
- **Node 24 LTS installed locally.** Verify with `node -v`.
- **pnpm 9.x installed.** `npm i -g pnpm`.

### In-Sprint dependencies
- None external. Everything else is in the lockfile.

## Risk Analysis & Mitigation

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Motion package mismatched with Next 16 RSC | Low | Medium | Confirmed import path is `motion/react` and client components are isolated. If breakage surfaces, downgrade to `framer-motion@^11` (drop-in compatible API). |
| Tailwind v4 `@theme` token typo causes silent utility-not-found | Medium | Low | Phase 2 includes a sanity-check page that uses every token. |
| Custom font CLS fails the AC | Medium | Medium | `adjustFontFallback: true` enabled. If still flaky, add explicit `size-adjust` in CSS. |
| Vercel build fails on first deploy due to lockfile mismatch | Low | Low | Use `pnpm install --frozen-lockfile` in Vercel build settings. |
| Mobile <640px route map is unusable | Medium | Medium | Horizontal scroll-snap fallback. If still bad, hide route map below 640px and replace with a fixed "hamburger" that opens a vertical drawer (deferred to a sub-task in Phase 3 if needed). |
| Direct deep-link causes initial-transition flash | Medium | Low | `<AnimatePresence initial={false}>` — explicitly tested in Phase 3 AC. |
| Z-index conflict between atmosphere overlays and modals (future sprints) | Low | Medium | Z-index scale published in tokens. Future modals must use a value > 50. |
| Sprint 5 train choreography requires layout restructure | Medium | Medium | Documented as a known-fragile area. If `AnimatePresence mode="wait"` proves insufficient, refactor to parallel routes — at known cost. |

## Future Considerations

- **Sprint 2 (NOW + CONTACT):** trainer-card stat block component, Resend integration, CV PDF.
- **Sprint 3 (WORKS):** calling-card component with angled clip-path + glitch overlay; in-carriage detail expansion (no route change).
- **Sprint 4 (RUMORS + BGM):** `@next/mdx` setup + manga-panel layout for blog; Spotify playlist embed + custom tracklist wrapper for music.
- **Sprint 5 (LAB + transition + polish):** react-three-fiber showpiece; replace `<TransitionWrapper>` with the full DEPART → TUNNEL → ARRIVE choreography; cumulative polish + SEO + RSS.
- **Post-launch:** decide on a CMS-vs-MDX-only strategy for blog growth; consider adding a `?theme=` URL param for "Velvet Line" vs alternate "lines" (color palette swaps).

## Documentation Plan

- `README.md`: Quickstart, stack, sprint roadmap, deployment.
- `docs/brainstorms/2026-05-16-portfolio-website-brainstorm.md`: Already authored. Linked from this plan and from README.
- Inline JSDoc on `lib/motion.ts` and `components/train/stations.ts` (the two files most likely to be referenced from other sprints).
- A future `docs/decisions/` directory can hold ADRs as the codebase grows; not needed in Sprint 1.

## References & Research

### External
- [Next.js 16 — Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- [Next.js 16 — Route Groups](https://nextjs.org/docs/app/getting-started/project-structure#route-groups-and-private-folders)
- [Tailwind CSS v4 — CSS-first Configuration](https://tailwindcss.com/blog/tailwindcss-v4)
- [Motion — React Installation](https://motion.dev/docs/react-installation)
- [Motion — Easing functions](https://motion.dev/docs/easing-functions)
- [Vercel — Web Analytics](https://vercel.com/docs/analytics)
- [Vercel — @vercel/og](https://vercel.com/docs/functions/og-image-generation)
- [WCAG 2.2 — Contrast minimum (AA)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)

### Internal
- Brainstorm: `docs/brainstorms/2026-05-16-portfolio-website-brainstorm.md`
- Design system tokens: `app/globals.css` (Phase 2)
- Motion constants: `lib/motion.ts` (Phase 2)
- Component boundary map: This plan, "Component Boundary Map" section

### Related Sprints (future plans)
- Sprint 2 plan: `docs/plans/yyyy-mm-dd-feat-now-contact-stations-plan.md` (not yet written)
- Sprint 3 plan: `docs/plans/yyyy-mm-dd-feat-works-calling-cards-plan.md`
- Sprint 4 plan: `docs/plans/yyyy-mm-dd-feat-rumors-bgm-stations-plan.md`
- Sprint 5 plan: `docs/plans/yyyy-mm-dd-feat-lab-train-choreography-polish-plan.md`
