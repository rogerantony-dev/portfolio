# Portfolio — Velvet Line

A Persona-5-themed portfolio site. Navigated as a train (the "Velvet Line") moving between six stations. Each station is a section: NOW, WORKS, LAB, RUMORS, BGM, CONTACT.

**Status:** All five sprints built locally. Ready for Vercel deploy.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript 5 (strict + `noUncheckedIndexedAccess`)
- **Styling:** Tailwind CSS v4 (CSS-first `@theme` config)
- **Animation:** [motion](https://motion.dev) (formerly Framer Motion)
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

lib/
├── profile.ts           # ← edit this
├── projects.ts          # ← edit this
├── posts.ts             # ← edit this
├── bgm.ts               # ← edit this
├── fonts.ts             # next/font setup
└── motion.ts            # ease + duration constants

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
