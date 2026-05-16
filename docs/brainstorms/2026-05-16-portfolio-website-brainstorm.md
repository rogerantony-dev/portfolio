---
date: 2026-05-16
topic: portfolio-website
---

# Persona 5 × Cyberpunk-Terminal Portfolio

## What We're Building

A personal portfolio website for an early-career developer, fusing Persona 5's design language (bold red/black slashes, kanji, snappy overshoot motion, collage energy) with a cyberpunk-terminal tech aesthetic. The site is navigated as a **train (the "Velvet Line")** moving between 6 stations — each station is a section of the portfolio. The train metaphor ties directly into Persona 5 (Phantom Thieves use the Tokyo metro as their hub between worlds).

Primary audience: recruiters and hiring managers (job/freelance) + general personal-brand expression. Personality is the differentiator — the site itself is part of the portfolio.

## Why This Approach

Three approaches were considered:

- **A. "Phantom Thieves OS"** — full P5 fusion everywhere. Max personality but risks reading as gimmick.
- **B. "Pure P5"** — leans entirely into P5 visual language with tech only as metaphor. Easiest but doesn't deliver the tech aesthetic.
- **C. "Cyberpunk-Terminal with P5 Punch"** ⭐ — clean tech default; P5 explodes on transitions, hovers, train arrivals.

**Approach C chosen** because:
- Recruiters can scan it fast (critical for early-career)
- Big P5 moments stay memorable instead of exhausting
- Shows design judgment ("calm → punch") rather than wall-to-wall flash
- Scales as content grows

## Key Decisions

### Stations (6 total, in order)

```
◉─────◯─────◯─────◯─────◯─────◯
NOW   WORKS  LAB   RUMORS BGM    CONTACT
現在地 仕事   実験  噂     BGM    連絡
```

1. **`現在地 / NOW`** — Home. Hero, "trainer card" stat block, intro typing animation.
2. **`仕事 / WORKS`** — Projects as P5 "calling cards" with angled clip-paths.
3. **`実験 / LAB`** — Interactive demos (one r3f showpiece + smaller experiments).
4. **`噂 / RUMORS`** — Blog. Manga-panel card layout (irregular grid, rotated panels, halftone images on hover). MDX-powered. Launch with 2 posts.
5. **`BGM / on rotation`** — Music section. Spotify playlist embed wrapped in a "Velvet Line PA system" panel. No autoplay.
6. **`連絡 / CONTACT`** — Terminus. Contact form (Resend) + CV download + socials.

### Train Navigation

- Persistent carriage frame with top status bar and bottom route map (6 dots on a rail).
- Click any dot → train choreography: DEPART (0-200ms) → TUNNEL (200-600ms) → ARRIVE (600-1000ms) → SETTLE (1000-1200ms).
- Tunnel overlay slides in from right with streaking yellow lights (animated div strips).
- Subtle viewport rumble during tunnel.
- Station name slams in with `punch` easing + overshoot.
- Red angled slash (`-8deg`) wipes across station header on arrival.
- `prefers-reduced-motion` → fallback to 200ms crossfade.

## Tech Stack

| Layer | Pick |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (for boring form/dialog bits) |
| Animation | Framer Motion |
| 3D (LAB) | react-three-fiber + drei |
| Blog | @next/mdx + gray-matter + Shiki (terminal-themed code blocks) |
| Music | Spotify Playlist Embed (`<iframe>`) + Spotify Web API at build time for tracklist |
| Contact | Resend + Next.js route handler |
| Icons | Lucide + custom SVG kanji marks |
| Fonts | Anton (display), Inter (body), JetBrains Mono (mono), Noto Sans JP Black (kanji deco) |
| Hosting | Vercel |
| Analytics | Vercel Analytics |

## Design System

### Palette

```css
/* Terminal (default, 90% of UI) */
--bg-void:       #0A0E14;
--bg-panel:      #11161D;
--bg-elevated:   #1A2029;
--line:          #2A3340;
--text-primary:  #E4E8EE;
--text-muted:    #8A95A5;
--accent-cyan:   #5BC0EB;
--accent-amber:  #F5B82E;

/* Persona Punch (interactions + transitions) */
--p5-red:        #E60012;
--p5-red-deep:   #8B0000;
--p5-black:      #0A0A0A;
--p5-white:      #FFF8E7;
--p5-yellow:     #FFD500;  /* rarest, biggest moments only */
```

### Type Scale

```
display:  clamp(3rem, 8vw, 6rem)     Anton
h1:       clamp(2rem, 5vw, 3.5rem)   Anton
h2:       1.875rem                    Anton
body:     1rem                        Inter
mono:     0.875rem                    JetBrains Mono
```

### Motion Constants

```ts
const ease = {
  snap:    [0.22, 1, 0.36, 1],
  punch:   [0.16, 1.3, 0.36, 1],
  train:   [0.65, 0, 0.35, 1],
  glitch:  [0.85, 0, 0.15, 1],
}
const dur = { micro: 150, fast: 300, normal: 500, train: 1200, punch: 600 }
```

### Layout Constants

```
--carriage-max:    1280px
--station-pad-y:   96px
--rail-thickness:  3px
--angle-slash:     -8deg
```

### Atmosphere

- Fixed full-screen scanline overlay at `opacity: 0.04`
- Noise/grain at `opacity: 0.03`
- Animated amber rail line as background decoration
- Radial CRT vignette on body (8% corner darkening)

## Build Order (5 weekend sprints)

- **Sprint 1** — Next.js + design tokens + persistent carriage frame + route stubs + Vercel deploy
- **Sprint 2** — NOW (hero + trainer card) + CONTACT (form + Resend + CV download)
- **Sprint 3** — WORKS (calling cards + in-carriage detail view) — needs 3 real projects minimum
- **Sprint 4** — RUMORS (MDX pipeline + manga-panel layout + 2 launch posts) + BGM (Spotify embed wrapped in PA panel)
- **Sprint 5** — LAB (one r3f showpiece + 2-3 smaller demos) + the full train transition choreography + polish (a11y, Lighthouse, OG images, RSS) + production deploy

Deploy to Vercel on Sprint 1 day 1; ship every sprint.

## Open Questions

- Domain name? (will need it before Sprint 1 deploy ideally)
- Names: keep "Velvet Line" as the literal line name, or something else?
- Exact 3 projects to feature in WORKS — needs a list before Sprint 3
- 2 launch blog post topics — needs decision before Sprint 4
- The Spotify playlist itself — needs to be curated before Sprint 4

## Next Steps

→ `/workflows:plan` to turn Sprint 1 into a file-by-file implementation plan
