---
date: 2026-05-17
topic: shadcn-base-ui-adoption
---

# Adopt shadcn/ui + Base UI for the replaceable surface

## What We're Building

Bring shadcn/ui (Base UI primitive variant) into the portfolio as the
foundation for **future** interactive components and the small set of
**existing** components that are genuinely shadcn-shaped. Every adopted
component is re-skinned in the Velvet Line idiom — 8px hard offset
shadows, `border-2 border-line` + `bg-elevated/60` panels, amber `font-mono`
labels, retro PA chrome — so the page looks identical to today but is
built on accessible Base UI primitives.

Audit found exactly **one existing component with a 1:1 shadcn fit**:
the project-detail modal in `components/works/calling-cards.tsx`. Plus
every ad-hoc `<button>` in the codebase gets standardized via shadcn
`Button`. Everything else (train graphic, route map, atmosphere
overlays, manga panels, terminal REPL, typing text, trainer card,
tunnel overlay, skip-link) stays bespoke — none have shadcn
equivalents and they ARE the site's identity.

## Why This Approach

- **Scope honesty.** The user's instinct was "wholesale rewrite," but
  the audit shows the actually-replaceable surface is tiny (1 modal +
  buttons). Most of the codebase is bespoke for good reason — it's
  what makes the site distinctive. Forcing shadcn into the train or
  atmosphere overlays would be ceremony without benefit.
- **Velvet Line look preserved 1:1.** shadcn ships unstyled
  primitives; the project's existing Tailwind tokens (`--color-amber`,
  `--color-line`, `--color-elevated`, `--color-p5-black`,
  `--font-mono`, etc.) are reapplied on top. Result: the page looks
  exactly the same, but a screen reader gets correct ARIA, keyboard
  Tab cycles and Escape close come free, and focus management is
  handled by Base UI.
- **Future leverage.** Forms, popovers, tooltips, command palette,
  toasts — when those features land, the primitives are already
  scaffolded and re-skinned. Cost is paid once, in this PR.
- **Base UI over Radix** because (a) it's the newer official combo
  shadcn supports, (b) smaller bundle, (c) the floating-position math
  for popovers/tooltips is the Floating UI lineage we'd want anyway.

## Key Decisions

- **Scope (in):** install shadcn+Base UI scaffolding into
  `components/ui/`, scaffold `Button`, `Dialog`, `Tooltip`, `Input`,
  `Form`, refactor `components/works/calling-cards.tsx` to use
  shadcn `Dialog`, replace ad-hoc `<button>` elements site-wide with
  shadcn `Button`.
- **Scope (out):** train-graphic, route-map, station data, tunnel
  overlay, transition, arriving-announcer, manga-panels, typing-text,
  trainer-card, skip-link, terminal REPL, atmosphere overlays.
  All bespoke, all kept.
- **Aesthetic:** 1:1 with current. Every shadcn component re-skinned
  using the existing idiom — `border-2 border-line bg-elevated/60`,
  `box-shadow: 8px 8px 0 0 var(--color-p5-black)`, amber `NOW PLAYING`
  style tabs where applicable, `font-mono tracking-[0.3em]` labels,
  motion variants from `lib/motion.ts` (`ease.snap`, `dur.fast`).
- **Motion library:** keep `motion/react`. Wrap shadcn Dialog content
  in `AnimatePresence` so the calling-card modal's
  opacity/scale/y entry animation survives. shadcn's default
  `tailwindcss-animate` data-state transitions stay enabled as a
  fallback for components we add later.
- **Component organization:** `components/ui/` for shadcn primitives;
  feature folders (`components/works/`, `components/bgm/`, etc.) stay
  for project-specific compositions that consume them.
- **`useReducedMotion()`** continues to work — Base UI doesn't force
  animations, and our motion variants already honor it.

## Open Questions

These get answered in the plan / during implementation:

1. **Exact install command.** shadcn's Base UI registry is the
   relatively new variant; the precise CLI invocation (registry URL or
   `--variant base-ui` flag) and dependencies need to be confirmed
   against current docs at install time.
2. **`tailwindcss-animate` plugin.** shadcn typically requires it.
   Tailwind v4 with the CSS-first `@theme` directive may need a
   slightly different plugin registration than v3 docs assume.
3. **Should the contact page's CV download anchor become a shadcn
   `Button` variant?** Or stay a styled `<a>`? Aesthetic call —
   default to migration for consistency unless it looks worse.
4. **Existing `--color-p5-black` is referenced but undefined.**
   Defining it is technically out of scope for this PR; flag if it
   trips up any shadcn re-skin work and a one-liner fix gets folded in.

## Next Steps

→ `/workflows:plan` for implementation details: install command,
   tsconfig/components.json setup, exact re-skin token mapping per
   component, calling-cards refactor, button replacement audit, motion
   integration with shadcn Dialog.
