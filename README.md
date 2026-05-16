# Portfolio — Velvet Line

A Persona-5-themed portfolio site. Navigated as a train (the "Velvet Line") moving between 6 stations.

**Status:** Sprint 1 — Foundation complete. Placeholder content across all six stations. Real content arrives in subsequent sprints.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript 5 (strict + `noUncheckedIndexedAccess`)
- **Styling:** Tailwind CSS v4 (CSS-first `@theme` config)
- **Animation:** [motion](https://motion.dev) (formerly Framer Motion)
- **Fonts:** Anton, Inter, JetBrains Mono, Noto Sans JP (via `next/font/google`)
- **Hosting:** Vercel
- **Package manager:** pnpm

## Quick Start

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Navigate between stations using the bottom route map — arrow keys, Tab, and clicks all work.

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Dev server (Turbopack) at `localhost:3000` |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm typecheck` | TypeScript strict check |
| `pnpm lint` | ESLint |

## Project Structure

```
app/
├── (stations)/        # Route group — shared carriage frame layout
│   ├── layout.tsx     # Mounts StatusBar + Carriage + RouteMap
│   ├── page.tsx       # NOW (home)
│   ├── works/         # WORKS — projects
│   ├── lab/           # LAB — interactive demos
│   ├── rumors/        # RUMORS — blog (MDX, Sprint 4)
│   ├── bgm/           # BGM — music section (Sprint 4)
│   └── contact/       # CONTACT — terminus
├── layout.tsx         # Root — fonts, metadata, atmosphere overlays
├── icon.tsx           # Dynamic favicon (kanji 現)
└── opengraph-image.tsx # Dynamic OG image
components/
├── train/             # Carriage frame components
└── atmosphere/        # Scanlines, noise, vignette overlays
lib/
├── fonts.ts           # next/font setup
├── motion.ts          # Easing + duration constants
└── hooks/             # Reusable hooks
docs/
├── brainstorms/       # Design rationale
└── plans/             # Sprint plans
```

## Roadmap

Each sprint deploys end-to-end. See [docs/plans/](./docs/plans/) for the detailed plan.

- **Sprint 1** — Foundation, design tokens, carriage frame, route stubs ✅
- **Sprint 2** — NOW (hero + trainer card) + CONTACT (form via Resend, CV download)
- **Sprint 3** — WORKS (calling cards with angled clip-paths, in-carriage detail view)
- **Sprint 4** — RUMORS (MDX blog, manga-panel layout) + BGM (Spotify embed)
- **Sprint 5** — LAB (r3f showpiece) + full train choreography (DEPART → TUNNEL → ARRIVE) + polish

## Design Notes

The site fuses Persona 5's design language (chunky kanji, angled red slashes, snappy motion with overshoot) with a cyberpunk-terminal default state (mono fonts, scanlines, CRT vignette). The Persona 5 energy "punches in" on interactions and transitions, while the default surface is calm enough to scan quickly.

See [`docs/brainstorms/`](./docs/brainstorms/) for the full design rationale.

## Deployment

The project deploys to Vercel with zero configuration:

1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js and deploys

Set `NEXT_PUBLIC_SITE_URL` in Vercel project settings for proper OG image URLs (e.g., `https://your-domain.dev`).

## License

Personal project — no public license. Inspired by [Persona 5](https://atlus.com/persona5/) by ATLUS.
