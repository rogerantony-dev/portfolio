# Portfolio — Velvet Line

A Persona-5-themed portfolio site. Navigated as a train (the "Velvet Line") moving between six stations. Each station is a section: NOW, WORKS, LAB, RUMORS, BGM, CONTACT.

**Status:** All five sprints built locally. Ready for Vercel deploy.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript 5 (strict + `noUncheckedIndexedAccess`)
- **Styling:** Tailwind CSS v4 (CSS-first `@theme` config)
- **Animation:** [motion](https://motion.dev) (formerly Framer Motion)
- **Component primitives:** [shadcn/ui](https://ui.shadcn.com) with the [Base UI](https://base-ui.com) variant — `Button` and `Dialog` only; everything else hand-rolled
- **Fonts:** Anton, Inter, JetBrains Mono, Noto Sans JP (via `next/font/google`)
- **Music embed:** Spotify Playlist Embed (iframe)
- **Hosting:** Vercel
- **Package manager:** pnpm

## Quick Start

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Navigate between stations using the bottom route map — arrow keys, Tab, clicks all work. The train glides between active stations.

## Make It Yours — One Data File Per Concept

Three TypeScript data files hold everything you'd swap to make the site personal:

| File | Holds |
|---|---|
| `lib/profile.ts` | Your name, callsign, role, bio, skills, social links, CV URL |
| `lib/projects.ts` | Project entries shown as calling cards on `/works` |
| `lib/posts.ts` | Blog post metadata (cover, title, excerpt) shown on `/rumors` |
| `lib/bgm.ts` | Spotify playlist ID + a hand-maintained tracklist mirror |

Drop your CV at `public/cv.pdf` and the download button on `/contact` works.

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Dev server (Turbopack) at `localhost:3000` |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm typecheck` | TypeScript strict check |
| `pnpm lint` | ESLint (minimal config — see Sprint 5 polish notes) |
| `pnpm test` | Run Vitest test suite (jsdom + RTL) |
| `pnpm test:watch` | Watch-mode tests |

## Component Library

This site adopts [shadcn/ui](https://ui.shadcn.com) with the [Base UI](https://base-ui.com) primitive variant (`style: "base-nova"` in `components.json`, installed via `pnpm dlx shadcn@4.7.0 init -d --base base`). The replaceable interactive surface is small — `Button` and `Dialog` only. Everything else (train graphic, route map, atmosphere overlays, manga panels, terminal, the calling-cards grid layout itself) is hand-rolled and is the site's identity.

**Convention:** `components/ui/*` = shadcn-generated, upgradable via `pnpm dlx shadcn add`. `components/<feature>/*` = bespoke, never touched by the CLI.

### Adding a component

```bash
pnpm dlx shadcn@4.7.0 add <component>   # always pin the version
```

Pinning reduces supply-chain risk (a compromised registry can't inject malicious TSX if your `add` targets a specific version). After running, `git diff components/ui/` and review carefully.

### Velvet Line button variants (`pa-*`)

Custom button variants live in **`components/ui/button-variants.ts`** — a separate file from `button.tsx`. This ensures `pnpm dlx shadcn add button --overwrite` only regenerates `button.tsx`; the `pa-*` extensions survive untouched.

| Variant            | Use case                       | Shadow |
|--------------------|--------------------------------|--------|
| `pa-amber`         | Primary CTA (BOARD NEXT TRAIN) | 6px filled  |
| `pa-yellow`        | Secondary CTA (DOWNLOAD CV)    | 6px filled  |
| `pa-amber-outline` | Reactive action (RETRY, RETURN TO NOW) | 3px outline |
| `pa-line-outline`  | Tertiary action                 | 3px outline |

If you regenerate `button.tsx`, restore: (1) the import from `./button-variants`, (2) the `data-variant` / `data-size` attribute emission. The sentinel comment at the top of `button.tsx` and the inline-snapshot test in `tests/ui/button-variants.test.ts` will fail loudly if the variants vanish.

### Dialog accessibility contract

Base UI's `Dialog` primitive enforces:

- focus trap inside the popup when open
- focus restore to the trigger on close
- Escape key closes (no manual listener required)
- backdrop click closes (no manual listener required)
- `inert` applied to siblings when `modal={true}` (2026 best practice; modern browsers use this in place of `aria-modal` on the popup)
- `data-state="open|closed"` on backdrop, popup, and trigger — deterministic selector for automated tests and AI agents

`tests/ui/dialog-a11y.test.tsx` covers the basics in jsdom. Full keyboard-trap verification requires browser-mode tests (deferred).

### Agent-native targeting

Every shadcn primitive emits `data-slot="<component>"`. Our customizations add:

- `data-variant={variant}` and `data-size={size}` on `Button` — agents can target buttons by intent without scraping class names (which `tailwind-merge` can re-order).
- `data-testid="project-card-${id}"` on each calling-card trigger.
- `data-testid="project-dialog"` on the modal popup.

### Primitive-split exit clause

We use Base UI primitives via `style: "base-nova"`. If a future shadcn block requires Radix-only primitives (most community blocks still do as of 2026), install Radix alongside Base UI rather than uprooting. The `pa-*` variants live in `button-variants.ts` and don't care which primitive backend ships the underlying Button or Dialog. Mixing within a single component is bad (incompatible event models); mixing across components is fine.

## Project Structure

```
app/
├── (stations)/          # Route group — shared carriage layout
│   ├── layout.tsx       # Mounts StatusBar + Carriage + RouteMap + Tunnel
│   ├── page.tsx         # NOW — hero + trainer card + CTA
│   ├── works/           # WORKS — calling cards grid
│   ├── lab/             # LAB — interactive terminal
│   ├── rumors/          # RUMORS — manga-panel blog grid
│   │   └── [slug]/      # Individual post pages (SSG)
│   ├── bgm/             # BGM — Spotify embed + tracklist
│   └── contact/         # CONTACT — socials + CV download
├── layout.tsx           # Root — fonts, atmosphere, metadata
├── icon.tsx             # Dynamic favicon (kanji 現)
└── opengraph-image.tsx  # Dynamic OG image

components/
├── train/               # Carriage frame: StatusBar, Carriage, RouteMap,
│                        # Transition, TunnelOverlay, TrainGraphic, etc.
├── atmosphere/          # Scanlines, noise, vignette overlays
├── now/                 # Hero TypingText, TrainerCard, SkillBar
├── works/               # CallingCards grid with expand-in-place
├── rumors/              # MangaPanels grid
└── lab/                 # Interactive Terminal

components/ui/           # shadcn/ui primitives (Button, Dialog) — upgradable via CLI
                         # pa-* button variants live in button-variants.ts (regen-safe)

lib/
├── profile.ts           # ← edit this
├── projects.ts          # ← edit this
├── posts.ts             # ← edit this
├── bgm.ts               # ← edit this
├── fonts.ts             # next/font setup
├── motion.ts            # ease + duration constants
└── utils.ts             # cn() helper for shadcn primitives

tests/ui/                # Vitest + RTL — button-variants snapshot, dialog a11y,
                         # token integrity

docs/
├── brainstorms/         # Design rationale
└── plans/               # Sprint plans
```

## What Was Built (Sprint by Sprint)

- **Sprint 1 — Foundation:** Next.js 16 scaffold, Tailwind v4 `@theme` design tokens, four custom fonts, atmosphere overlays (scanlines/noise/vignette), persistent carriage frame (status bar + framed container + 6-dot route map with keyboard nav + mobile scroll-snap), 200ms route crossfade, dynamic favicon and OG image, custom 404 station, loading/error states.
- **Sprint 2 — NOW + CONTACT:** Hero typing animation, P5-style "TRAINER CARD" with kanji avatar and segmented skill bars, "BOARD NEXT TRAIN" CTA. Contact page with terminal-styled socials grid and yellow CV download button.
- **Sprint 3 — WORKS:** Calling cards grid with alternating angled clip-paths, hover slash, expand-in-place detail dialog via Motion `layoutId`, ESC/backdrop/✕ close, LIVE + SOURCE link buttons.
- **Sprint 4 — RUMORS + BGM:** Manga-panel blog grid with rotation + halftone covers, per-slug SSG post pages. PA-styled Spotify playlist embed with a static tracklist mirror below.
- **Sprint 5 — LAB + polish:** Interactive zsh-styled Terminal demo (`whoami`, `skills`, `goto works`, `joke`, `help`, etc.). TunnelOverlay sweeps across the viewport on every route change, syncing with the train's `layoutId` glide between stations.

## The Train

The train asset above the route map is a SVG locomotive + two ICF-style coaches (Indian Railways styling). It:

- Sits over the active station dot
- Glides to the new station when you click another dot (Motion `layoutId` shared-element transition)
- Bobs gently up and down 1.5px while idle (engine vibration feel)
- Puffs grey exhaust from the smokestack (three staggered SMIL animations)
- Pulses its headlight glow slowly
- Carries "VELVET LINE" stenciling on coach 1, "A1 · GENERAL" on coach 2, and "रेल" (Hindi: rail) on the locomotive

`prefers-reduced-motion` disables the bob; the small SMIL animations are decorative and stay.

## Accessibility

- Skip-to-content link as the first focusable element
- `<main id="main">` landmark
- `<nav aria-label="Velvet Line stations">` for the route map
- Active route is `aria-current="page"`
- `aria-live="polite"` "Arrived at..." region for screen readers
- Atmosphere overlays are `aria-hidden="true"` + `pointer-events: none`
- Japanese text wrapped with `lang="ja"`
- Keyboard nav on the route map (Tab → arrow keys clamp at ends → Enter)
- WCAG AA color contrast on body text (amber on void = 11.2:1, red on void = 5.1:1)
- ESC closes modal dialogs (WORKS detail view)

## Deployment

Zero-config Vercel deploy:

1. The repo is on GitHub: `rogerantony-dev/portfolio`
2. Open [vercel.com/new](https://vercel.com/new) → Import this repo
3. Hit **Deploy** — Vercel auto-detects Next.js 16
4. (Optional) Add a custom domain in project settings
5. (Optional) Set `NEXT_PUBLIC_SITE_URL` to your final domain so OG image URLs absolutise correctly

After import, every push to `main` auto-deploys.

## License

Personal project. Inspired by [Persona 5](https://atlus.com/persona5/) by ATLUS.
