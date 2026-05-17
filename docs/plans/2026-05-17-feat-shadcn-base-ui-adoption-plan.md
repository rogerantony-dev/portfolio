---
title: Adopt shadcn/ui (Base UI) for the replaceable interactive surface
type: feat
status: active
date: 2026-05-17
deepened: 2026-05-17
---

# Adopt shadcn/ui (Base UI) for the replaceable interactive surface

## Enhancement Summary

**Deepened on:** 2026-05-17 via /compound-engineering:deepen-plan

**Agents consulted:** architecture-strategist, code-simplicity-reviewer,
julik-frontend-races-reviewer, kieran-typescript-reviewer,
pattern-recognition-specialist, performance-oracle, security-sentinel,
silent-failure-hunter, type-design-analyzer, agent-native-reviewer +
skill applications (no-use-effect, frontend-design, react-best-practices,
nextjs) + research on heavily-themed shadcn deployments (Cal.com,
Trigger.dev, Vercel, Supabase) and tw-animate-css Tailwind v4 quirks.

**Anything in this Enhancement Summary or the "Deepening Notes" section
at the bottom supersedes conflicting text in Phases 1–5 above.**

### Top adjustments (load-bearing)

1. **Scope cuts** (Simplicity + Architecture converged):
   - **CUT** `Form` / `Input` / `Label` scaffolds + `react-hook-form` +
     `@hookform/resolvers` + `zod` deps. Zero v1 consumers. `pnpm dlx
     shadcn@latest add form` takes two seconds the day a real form lands.
   - **CUT** `Tooltip` scaffold. Route-map's CSS-only tooltips work and
     the plan keeps them bespoke. No v1 consumer.
   - **CUT** `pa-cyan` / `pa-red` / `pa-icon` Button variants. Audit
     shows zero consumers — pure speculation.
   - **CUT** `--color-p5-black` fix from this PR. Latent-bug fix
     belongs in a separate one-line commit; mixing it muddies the diff.
   - **CUT** terminal focus-wrapper `<div role="button">` conversion.
     Current `<button>` works; scope creep into bespoke territory.
   - **CUT** `日 / EN` status-bar toggle promotion to `<Button
     variant="pa-icon">`. No-op handler, doesn't earn primitive.
   - **Keep `pa-amber`, `pa-yellow`, `pa-ghost-amber`, `pa-ghost-line`**
     (or renamed per D6 below). Each has a real consumer.
2. **AnimatePresence + Dialog.Portal nesting was inverted** (Races F6).
   Correct nesting: `<Dialog.Root open=…><Dialog.Portal keepMounted><AnimatePresence>{open && <Dialog.Backdrop … /><Dialog.Popup … />}</AnimatePresence></Dialog.Portal></Dialog.Root>`.
   AnimatePresence goes **inside** Portal so `keepMounted` and the
   conditional don't fight. Plan's original sketch swapped these.
3. **`pa-*` variants live in a separate file** (Architecture F4) —
   `components/ui/button-variants.ts` exports the extended cva;
   `components/ui/button.tsx` imports it. `shadcn add --overwrite`
   regenerates only button.tsx; pa-* survive untouched. README
   warning alone is insufficient.
4. **TypeScript** (Kieran MUST FIX): drop `forwardRef` in
   hand-written sketches (React 19 ref-as-prop); make `ButtonProps`
   a **discriminated union** over `asChild`; brand `PaButtonVariant`
   separately from `ShadcnButtonVariant`; re-export Dialog prop types.
5. **Performance**: drop `@radix-ui/react-slot`, use Base UI's
   `render` prop for Button polymorphism — saves ~1 KB, brings the
   bundle under the ≤10 KB target, and aligns with Dialog's idiom
   (one polymorphism API across the file). Convert inline `boxShadow`
   strings in `calling-cards.tsx` to `shadow-[6px_6px_0_0_var(--color-p5-black)]`
   Tailwind utilities — eliminates per-render style allocation across
   ~14 elements.
6. **Shadow tier correction** (Patterns + Design): `4px 4px` was an
   invented tier. Use the existing 3/6/8/10 scale — `pa-amber` /
   `pa-yellow` get `6px 6px` (peer to cards); `pa-ghost-*` get `3px 3px`
   (peer to existing inline pill links).
7. **Reduced-motion implemented in JS** (Pattern + Silent failure):
   the current `@media (prefers-reduced-motion: reduce)` CSS rule
   only affects CSS animations/transitions — **not** motion/react JS
   variants. Wire `useReducedMotion()` at the modal component top and
   derive variants inline so reduced-motion users get cross-fade only.
8. **AnimatePresence + route navigation** (Silent #9, Races #7): clicks
   on internal links inside the modal must `close()` first and await
   `onExitComplete` before navigation — else the modal vanishes
   without exit animation. Add a small `usePathname()` effect to
   force-close on navigation as a backstop.
9. **shadcn-overwrite guard** (Silent #1): three layers, not one.
   (a) Sentinel comment at the top of `button.tsx` warning about
   pa-* re-merge. (b) Inline-snapshot test on `buttonVariants({
   variant: "pa-amber" })`. (c) Optional pre-commit grep guard. Plus
   F4's variant-file split which makes the whole problem smaller.
10. **Test infrastructure** (Silent #2 / #3 / #5 / #7):
    `tests/ui/button-variants.test.tsx` (snapshot), `tests/ui/dialog-a11y.test.tsx`
    (focus trap + Escape + scroll-lock + download attr), `tests/ui/token-integrity.test.ts`
    (regex assertions on globals.css). CI gates the previously
    "manual smoke" criteria.
11. **Agent-native annotations** (Agent-native): `data-variant={variant}
    data-size={size}` on Button; `data-testid="project-card-${id}"` on
    DialogTrigger; `data-testid="project-dialog"` on Dialog.Popup.
    Costs one line each, makes the page agent/test-driveable.
12. **Security hygiene**: canonical `rel="noopener noreferrer"` order
    (was `noreferrer noopener`); `pnpm audit --prod` in Phase 5; pin
    `tw-animate-css` to exact version; pin shadcn CLI version in README.
13. **Base UI ecosystem exit clause** (Architecture F2 + research):
    Base UI v1 is GA in 2026 but ecosystem is thinner than Radix.
    Add a documented escape hatch — if a future shadcn block requires
    Radix-only primitives, install Radix alongside without uprooting
    Base UI. Plan's all-Base-UI framing was implicit absolutism.
14. **`cacheComponents` removal is N/A** (Next.js): the reverted
    BGM feature left no config residue; `next.config.ts` only has
    `reactStrictMode: true`. Drop that bullet from Phase 5.
15. **Hoist motion variants to module scope** (React best-practices):
    `backdropMotion`, `popupMotion`, `motionTransition` constants at
    the top of `calling-cards.tsx`, not inline per render.
16. **`--z-modal: 70` token** (Patterns): replace inline `zIndex: 70`
    on the modal with a project token in `app/globals.css :root`.
17. **`clsx` → `cn()` migration policy clarification** (Simplicity +
    Patterns): convert `calling-cards.tsx` (the file we're heavily
    editing) in this PR. Leave the other 5 sites on `clsx`. Reserve
    `cn()` for `components/ui/` consumers. No half-migration limbo.

→ Full agent-by-agent findings in **Deepening Notes** at the bottom.

## Overview

Bring shadcn/ui (Base UI primitive variant, style `base-vega`) into the
portfolio as the foundation for **future** interactive components and the
small set of **existing** components that are genuinely shadcn-shaped.
Every adopted component is re-skinned in the Velvet Line idiom — 8px hard
offset shadows, `border-2 border-line` + `bg-elevated/60` panels, amber
`font-mono` labels — so the page looks identical to today but is built on
accessible Base UI primitives.

**Real replaceable surface (per repo audit):** 1 modal (the project-card
modal in `components/works/calling-cards.tsx`) + 5 raw `<button>` elements
+ 7 button-styled `<a>` elements. Everything else (train graphic, route
map, atmosphere overlays, manga panels, terminal REPL chrome, typing
text, trainer card, tunnel/transition/skip-link) stays bespoke — they
have no shadcn equivalents and they ARE the site's identity.

Source brainstorm: `docs/brainstorms/2026-05-17-shadcn-base-ui-adoption-brainstorm.md`.

## Problem Statement

- The hand-rolled modal in `calling-cards.tsx` has documented a11y gaps:
  no focus trap (Tab escapes the dialog), no focus-restore on close, no
  `aria-hidden` on outside content. WCAG 2.1 SC 2.4.3 / 2.4.11 violation.
- Five raw `<button>` elements + seven button-shaped `<a>` elements have
  drifted across files with no shared focus-ring / disabled-state /
  `asChild` story. Future buttons will keep drifting unless we anchor a
  primitive.
- Future features (contact form, command palette, tooltips on route-map
  dots, share menus, toasts) all need primitives we don't have. Pay the
  install cost once now, not five times later.
- `--color-p5-black` is referenced in `box-shadow` inline strings 10
  places and undefined in `app/globals.css` — latent visual bug. We're
  touching that file anyway for shadcn token aliasing; fold the
  one-liner fix in.

## Proposed Solution

Five-phase adoption that:

1. **Foundation** — install deps, scaffold `components.json` with
   `style: "base-vega"`, wire `app/globals.css` to alias shadcn's
   expected variables to existing project tokens, add `lib/utils.ts`
   with `cn()`, define `--color-p5-black`.
2. **Primitives** — scaffold `Button`, `Dialog`, `Tooltip`, `Input`,
   `Form` into `components/ui/`. Customize the generated files: extend
   the `Button` `cva` with Velvet Line variants (`pa-amber`, `pa-cyan`,
   `pa-red`, `pa-yellow`, `pa-ghost-amber`), re-skin `Dialog` chrome to
   the existing PA-panel idiom, leave `Tooltip`/`Input`/`Form` as
   light re-skins for future use.
3. **Dialog migration** — replace the AnimatePresence + manual modal in
   `calling-cards.tsx` with `Dialog.Root` + `Dialog.Portal keepMounted`
   + `Dialog.Backdrop render={motion.div}` + `Dialog.Popup
   render={motion.div initial/animate/exit}` (canonical 2026 pattern from
   `motion.dev/docs/base-ui`). Same look, gains 5 a11y wins.
4. **Button replacement audit** — convert the 5 raw `<button>`s and the
   7 button-shaped `<a>`s to `<Button>` (with `asChild` for nav). Two
   exceptions: terminal's outer focus-wrapper `<button>` (not Button-shaped),
   and tooltip on route-map dots (current CSS-only works, no win).
5. **Quality gates + docs** — typecheck, lint, build, README section.

## Why This Approach

- **Scope honesty.** "Wholesale" was the user's instinct; the audit
  shows the actually-replaceable surface is small. Forcing shadcn into
  bespoke components (train graphic SVG, atmosphere overlays, manga
  panels with rotated clip-paths) would be ceremony without benefit.
- **Velvet Line look preserved 1:1.** shadcn ships unstyled primitives.
  Aliasing shadcn's expected variables (`--background`, `--primary`,
  `--ring`, `--border`) to existing project tokens (`--color-void`,
  `--color-amber`, etc.) means re-running `shadcn add <component>`
  later won't blow up the design system. Linear, Vercel, and Supabase
  all do this with Radix; the Base UI surface area is materially
  similar.
- **Future leverage.** Forms, tooltips, popovers, command palette,
  toasts — when those land, the primitives are already scaffolded and
  re-skinned. Cost paid once, in this PR.
- **Base UI over Radix** because (a) it's the newer official combo
  shadcn supports as of 2026, (b) bundle savings are meaningful
  (Dialog ~7-9 kB gzip vs Radix ~11-13 kB; Tooltip ~5-6 kB vs ~8-9 kB),
  (c) MUI's Floating UI lineage is what we'd want for any future
  popover/tooltip math anyway.
- **Motion stays.** `motion/react` keeps its existing job. Base UI's
  `render` prop is exactly the slot pattern that lets `motion.div`
  drive open/close transitions while Base UI handles a11y. Pattern
  documented at motion.dev/docs/base-ui and base-ui.com/react/handbook/animation.

## Technical Approach

### Architecture

```
                ┌────────────────────────────────────────────────┐
                │  app/globals.css                                │
                │  - @import "tw-animate-css"                     │
                │  - @theme {…} project tokens (existing)         │
                │  - :root {…} shadcn aliases of project tokens   │
                │  - @theme inline {…} util mapping for shadcn    │
                │  - --color-p5-black (latent bug fix)            │
                └────────────────────────────────────────────────┘
                                  ▲
                                  │ utility classes
                                  │
                ┌────────────────────────────────────────────────┐
                │  components/ui/   (NEW, scaffolded + re-skinned)│
                │  - button.tsx     cva variants pa-amber/red/…   │
                │  - dialog.tsx     Base UI primitives + chrome   │
                │  - tooltip.tsx    for future use                │
                │  - input.tsx      for future use                │
                │  - form.tsx       for future use (react-hook-form)
                └────────────────────────────────────────────────┘
                                  ▲
                ┌─────────────────┴──────────────────┐
                │ consumers (per-feature components)  │
                │ - works/calling-cards.tsx (Dialog)  │
                │ - now/page.tsx (Button asChild)     │
                │ - contact/page.tsx (Button asChild) │
                │ - (stations)/error.tsx (Button)     │
                │ - not-found.tsx (Button asChild)    │
                │ - train/status-bar.tsx (Button)     │
                └────────────────────────────────────┘
                                  │
                ┌─────────────────┴──────────────────┐
                │ untouched bespoke components        │
                │ - components/atmosphere/*           │
                │ - components/train/{train-graphic,  │
                │   route-map, transition, tunnel,    │
                │   arriving-announcer}/*             │
                │ - components/now/{trainer-card,     │
                │   typing-text}/*                    │
                │ - components/rumors/manga-panels    │
                │ - components/lab/terminal           │
                │ - components/skip-link              │
                └────────────────────────────────────┘
```

### Key Decisions

| Decision | Choice | Why |
|---|---|---|
| Primitive variant | Base UI via `style: "base-vega"` | Bundle savings, newer official combo, Floating UI lineage |
| Token strategy | Alias shadcn vars → project tokens in `:root` | Preserves `shadcn add` upgradability without polluting design system |
| `tailwindcss-animate` | Replaced by `@import "tw-animate-css"` | tailwindcss-animate deprecated 2025-03-19 |
| `cssVariables` | `true` | Required by token aliasing strategy; default for v4 setups |
| `darkMode` | Omit `.dark {}` block | Project is dark-only; `:root` is the only theme |
| `radius` | `--radius: 0` (alias) | Project uses hard corners + clip-paths; shadcn defaults to rounded |
| `cn()` placement | `lib/utils.ts` (shadcn default) | No conflict — project has `clsx` + `tailwind-merge` deps, neither currently used as a helper |
| Button variants | Extend `cva`, keep shadcn defaults + add `pa-*` | Future shadcn blocks/forms hard-code `variant="ghost"` etc.; keep them working |
| `asChild` polyfill | Keep `@radix-ui/react-slot` dep | Even with Base UI, `Slot` is the cleanest cross-library polymorphism; Base UI's `render` prop is alternative but doesn't compose as cleanly with shadcn's existing Button source |
| Dialog motion | Pattern A (DOM unmount via AnimatePresence + `Dialog.Portal keepMounted`) | Matches existing calling-cards behavior 1:1; preserves opacity/scale/y variants |
| Terminal focus-wrapper | Stay bespoke (or `<div role="button">`) | Not a Button-shaped affordance; converting loses the cursor-text + focus-within idiom |
| Route-map tooltips | Stay bespoke (CSS-only) | Current opacity/group-hover pattern works and is zero-bundle; Tooltip primitive is ceremony |
| `--color-p5-black` fix | Folded in (one CSS line) | We're touching globals.css; scope creep at zero cost vs separate commit |

### Implementation Phases

#### Phase 1 — Foundation (deps, tokens, utilities)

**1.1. Dependencies**

> **Superseded by D1 / D5.** Final command drops `@radix-ui/react-slot`
> (Button uses Base UI `render`) and `react-hook-form` / `@hookform/resolvers`
> / `zod` (Form scaffold cut). Original block retained for context:

```bash
# OLD — superseded
# pnpm add @base-ui-components/react @radix-ui/react-slot \
#          class-variance-authority tw-animate-css \
#          react-hook-form @hookform/resolvers zod

# NEW per D1 + D5:
pnpm add @base-ui-components/react class-variance-authority
pnpm add -D tw-animate-css
```

`clsx` and `tailwind-merge` are already in `package.json`. `react-hook-form` /
`zod` are bundled with shadcn's `form.tsx` — we'll be ready when we
actually mount a form, but ESM tree-shaking means zero runtime cost
until we import them.

**1.2. `components.json`**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base-vega",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "utils": "@/lib/utils"
  },
  "iconLibrary": "lucide"
}
```

Note: no `tailwind.config` field (v4 is config-less). Run `pnpm dlx
shadcn@latest init` after the file is written — the CLI accepts existing
`components.json` and skips the prompts.

**1.3. `app/globals.css` rewrite**

```css
@import "tailwindcss";
@import "tw-animate-css";

@theme {
  /* Existing project tokens — unchanged source of truth. */
  --color-void: #000000;
  --color-panel: #08090C;
  --color-elevated: #11141A;
  --color-line: #232A36;
  --color-fg: #E4E8EE;
  --color-muted: #8A95A5;
  --color-cyan: #5BC0EB;
  --color-amber: #F5B82E;
  --color-red: #E60012;
  --color-red-deep: #8B0000;
  --color-ink: #0A0A0A;
  --color-bone: #FFF8E7;
  --color-yellow: #FFD500;
  --color-p5-black: #000000;  /* NEW — latent bug fix */

  /* Fonts, type scale, easings, z-scale stay as-is. */
  /* … (existing block preserved) … */
}

:root {
  /* shadcn-expected variables, aliased to project tokens. */
  --background:          var(--color-void);
  --foreground:          var(--color-fg);
  --card:                var(--color-elevated);
  --card-foreground:     var(--color-fg);
  --popover:             var(--color-elevated);
  --popover-foreground:  var(--color-fg);
  --primary:             var(--color-amber);
  --primary-foreground:  var(--color-void);
  --secondary:           var(--color-cyan);
  --secondary-foreground: var(--color-void);
  --muted:               var(--color-elevated);
  --muted-foreground:    var(--color-muted);
  --accent:              var(--color-amber);
  --accent-foreground:   var(--color-void);
  --destructive:         var(--color-red);
  --destructive-foreground: var(--color-bone);
  --border:              var(--color-line);
  --input:               var(--color-line);
  --ring:                var(--color-amber);
  --radius:              0;  /* Hard corners, no rounding */

  /* Existing z-scale + spacing stay as-is. */
  /* … */
}

@theme inline {
  /* Map shadcn vars onto Tailwind utility namespace so
     bg-background / text-foreground / border-border / ring-ring work. */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius: var(--radius);
}

/* Base + reduced-motion blocks stay as-is. */
/* html[data-bgm-expanded="true"] removed earlier; no longer present. */
```

**1.4. `lib/utils.ts`**

```ts
// ┌──────────────────────────────────────────────────────────────────┐
// │  Canonical class-name composer. tailwind-merge handles the        │
// │  utility-class conflict resolution; clsx handles conditional      │
// │  classes. Use cn() in new code; existing direct clsx() usages can │
// │  migrate opportunistically.                                       │
// └──────────────────────────────────────────────────────────────────┘
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
```

**1.5. Build verification**

After Phase 1 changes, `pnpm typecheck && pnpm lint && pnpm build`
must still pass — zero functional changes yet.

#### Phase 2 — Scaffold + customize primitives

**2.1. Run the CLI**

> **Superseded by D1.** `tooltip` / `input` / `form` cut. Pin shadcn
> CLI version (Security D9).

```bash
pnpm dlx shadcn@<pinned-version> add button dialog
```

Files land in `components/ui/`:
- `button.tsx` (re-imports pa-* from button-variants.ts — see D3)
- `button-variants.ts` (NEW, shadcn-add-safe)
- `dialog.tsx`

**2.2. Customize `components/ui/button.tsx`**

> **Superseded by D3 / D4 / D5 / D6.** The sketch below is the v1
> draft; the deepened version (a) puts `cva` in a separate
> `button-variants.ts` file, (b) drops `forwardRef` for React 19
> ref-as-prop, (c) uses Base UI `render` instead of Radix `Slot`,
> (d) drops `pa-cyan`/`pa-red`/`pa-icon`, (e) corrects shadow tiers
> to 3/6/10 (not invented 4px), (f) renames `pa-ghost-*` →
> `pa-*-outline`, (g) emits `data-variant` / `data-size`.

Extend the generated `cva` with project variants. Sketch:

```ts
"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base classes (focus ring, font, disabled state)
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono text-ui transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-void disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // shadcn defaults — keep working for any future blocks
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",

        // Velvet Line variants — the project's own idiom
        "pa-amber":  "border-2 border-line bg-amber text-void hover:bg-yellow shadow-[4px_4px_0_0_var(--color-p5-black)] hover:-translate-y-px hover:translate-x-px transition-transform",
        "pa-yellow": "border-2 border-line bg-yellow text-void hover:bg-amber shadow-[4px_4px_0_0_var(--color-p5-black)] hover:-translate-y-px hover:translate-x-px transition-transform",
        "pa-cyan":   "border-2 border-line bg-cyan text-void hover:opacity-90 shadow-[4px_4px_0_0_var(--color-p5-black)] hover:-translate-y-px hover:translate-x-px transition-transform",
        "pa-red":    "border-2 border-line bg-red text-bone hover:bg-red-deep shadow-[4px_4px_0_0_var(--color-p5-black)] hover:-translate-y-px hover:translate-x-px transition-transform",

        // Ghost / outlined family — RETRY, RETURN TO NOW, SOURCE
        "pa-ghost-amber": "border border-amber text-amber hover:bg-amber hover:text-void",
        "pa-ghost-line":  "border border-line text-fg hover:border-amber hover:text-amber",

        // Compact icon-only — language toggle, etc.
        "pa-icon": "text-muted hover:text-fg",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
        lg: "h-12 px-6",
        icon: "size-9",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

**2.3. Customize `components/ui/dialog.tsx`**

Goal: keep the Base UI primitives as the structural backbone, but
re-style `Dialog.Backdrop` and `Dialog.Popup` to match the Velvet Line
modal chrome (`bg-void/85 backdrop-blur-md` backdrop, `bg-elevated
border-2 border-{accent} shadow-[10px_10px_0_0_var(--color-p5-black)]`
panel with clip-path on consumer side).

Sketch (high-level — generated file gets surgical edits):

```tsx
"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui-components/react/dialog"
import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogBackdrop = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Backdrop>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Backdrop
    ref={ref}
    className={cn(
      "fixed inset-0 bg-void/85 backdrop-blur-md grid place-items-center p-4 md:p-12",
      // Default data-state animations via tw-animate-css —
      // overridden when caller passes motion render prop.
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
))
DialogBackdrop.displayName = "DialogBackdrop"

const DialogPopup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Popup>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Popup
    ref={ref}
    className={cn(
      "relative w-full max-w-3xl bg-elevated border-2 p-6 md:p-10 max-h-[85vh] overflow-y-auto cursor-default",
      "shadow-[10px_10px_0_0_var(--color-p5-black)]",
      // Default state animations — overridden by motion render prop in consumers.
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      className,
    )}
    {...props}
  />
))
DialogPopup.displayName = "DialogPopup"

const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("font-display text-fg leading-none", className)}
    {...props}
  />
))
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("font-sans text-fg leading-relaxed", className)}
    {...props}
  />
))
DialogDescription.displayName = "DialogDescription"

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogBackdrop,
  DialogPopup,
  DialogTitle,
  DialogDescription,
}
```

**2.4. Tooltip, Input, Form**

Generated forms get a light pass to use project tokens (`bg-background`,
`border-border`, `text-foreground`, `font-mono`) but stay minimal. No
project consumer mounts these in v1 — they're scaffolded for future use.

**2.5. Build verification**

`pnpm typecheck && pnpm lint && pnpm build` after Phase 2.

#### Phase 3 — Migrate `calling-cards.tsx` to Dialog

**3.1. Replace AnimatePresence-driven modal**

> **Superseded by D2.** The original target sketch below had
> AnimatePresence wrapping Dialog.Portal — that's the wrong nesting
> (keepMounted + conditional rendering contradict each other). The
> deepened version puts AnimatePresence INSIDE Dialog.Portal, keeps
> Portal unconditional, and hoists motion variants to module scope.
> Also adds `useReducedMotion()` to derive variants for reduced-motion
> users.

Current shape (in `components/works/calling-cards.tsx:97-177`):

```tsx
<AnimatePresence>
  {active && (
    <motion.div key="backdrop" /* … */ onClick={close} role="dialog" aria-modal>
      <motion.div /* panel */ onClick={(e) => e.stopPropagation()}>
        <button onClick={close}>✕ CLOSE</button>
        <CardFace project={active} expanded />
        …
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
```

Target:

```tsx
<Dialog
  open={!!active}
  onOpenChange={(open) => { if (!open) close() }}
>
  <AnimatePresence>
    {active && (
      <DialogPortal keepMounted>
        <DialogBackdrop
          render={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: dur.fast, ease: ease.snap }}
            />
          }
        />
        <DialogPopup
          render={
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 4 }}
              transition={{ duration: dur.fast, ease: ease.snap }}
            />
          }
          className={cn(
            accentBorder[active.accent],
            // clip-path stays inline; tailwind can't express the polygon
          )}
          style={{ clipPath: clipPaths[0] }}
        >
          <DialogClose asChild>
            <button
              type="button"
              className="absolute top-4 right-6 font-mono text-ui text-muted hover:text-red transition-colors cursor-pointer"
              aria-label="Close project detail"
            >
              ✕ CLOSE
            </button>
          </DialogClose>

          <DialogTitle id={`card-${active.id}-title`} style={{ fontSize: "var(--text-hero)" }}>
            {active.title}
          </DialogTitle>

          <CardFace project={active} expanded />

          <DialogDescription className="mt-6">
            {active.description}
          </DialogDescription>

          {/* Links unchanged */}
          <div className="flex flex-wrap gap-3 pt-2">
            {active.links.live && (
              <Button asChild variant="pa-amber" className={accentBg[active.accent]}>
                <a href={active.links.live} target="_blank" rel="noreferrer noopener">▸ LIVE</a>
              </Button>
            )}
            {active.links.repo && (
              <Button asChild variant="pa-ghost-line">
                <a href={active.links.repo} target="_blank" rel="noreferrer noopener">▸ SOURCE</a>
              </Button>
            )}
          </div>
        </DialogPopup>
      </DialogPortal>
    )}
  </AnimatePresence>
</Dialog>
```

**3.2. Delete the manual a11y plumbing**

Lines 49-61 of the current file (scroll-lock + Escape useEffect): delete.
`Dialog` does both.

`role="dialog" aria-modal aria-labelledby` on the backdrop: delete.
`Dialog.Popup` + `Dialog.Title` auto-wire `aria-labelledby`.

**3.3. Card tile (`<button>` at line 70-91)**

The card tile that opens the modal is a button (`<button onClick={() =>
setActiveId(project.id)}>`). Wrap in `<DialogTrigger asChild>`:

```tsx
<Dialog open={...} onOpenChange={...}>
  <DialogTrigger asChild>
    <button
      type="button"
      className={cn(
        "group block w-full text-left bg-elevated/70 border-2 p-5 md:p-6 relative overflow-hidden cursor-pointer",
        "transition-transform hover:-translate-y-0.5 hover:translate-x-0.5 focus-visible:-translate-y-0.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-void",
        accentBorder[project.accent],
      )}
      style={{ clipPath, boxShadow: "6px 6px 0 0 var(--color-p5-black)" }}
    >
      …
    </button>
  </DialogTrigger>
  …
</Dialog>
```

Alternative: use `<Button asChild>` with a custom variant — but the
clip-path + accent border + offset shadow combination is so specific
that wrapping in Button adds nothing. Keep it as a raw `<button>`
inside `DialogTrigger asChild`. The Button primitive earns its keep
elsewhere (LIVE/SOURCE/CTAs/CV/RETRY).

#### Phase 4 — Button replacement audit

Convert each interactive element to `<Button>`. File-by-file:

| File | Element | Migration |
|---|---|---|
| `app/(stations)/error.tsx:21-27` | `▸ RETRY` button | `<Button variant="pa-ghost-amber" onClick={reset}>▸ RETRY</Button>` |
| `app/not-found.tsx:27-32` | `▸ RETURN TO NOW` link | `<Button asChild variant="pa-ghost-amber"><Link href="/">▸ RETURN TO NOW</Link></Button>` |
| `app/(stations)/page.tsx:42-51` | `BOARD NEXT TRAIN` link | `<Button asChild variant="pa-amber"><Link href="/works">BOARD NEXT TRAIN</Link></Button>` |
| `app/(stations)/contact/page.tsx:80-89` | `↓ DOWNLOAD CV` link | `<Button asChild variant="pa-yellow"><a href={profile.cvUrl} download>↓ DOWNLOAD CV</a></Button>` |
| `app/(stations)/contact/page.tsx:61-73` | Social rows | Keep as `<a>` for now — they're tile-shaped, not button-shaped. Revisit if visual consistency suffers. |
| `app/(stations)/rumors/[slug]/page.tsx:37-42` | `← back to rumors` link | Keep as `<a>` — text link, not button-shaped |
| `components/train/status-bar.tsx:15-21` | `日 / EN` toggle | `<Button variant="pa-icon" size="sm" aria-label="..." onClick={...}>日 / EN</Button>` (no-op handler is fine) |
| `components/lab/terminal.tsx:151-209` | Outer focus-wrapper `<button>` | **Convert to `<div role="button" tabIndex={0} onClick={...} onKeyDown={...}>`** — it's a focus-capture container, not a button-shaped affordance. Keep cursor-text idiom. |

The terminal one is the only "judgment call." Two paths:
- (a) Leave as `<button>` (current state, technically incorrect role but works)
- (b) Convert to `<div role="button">` with explicit key handling

Recommend (b): it's still bespoke, but more semantically honest.

#### Phase 5 — Quality gates + docs

- [ ] `pnpm typecheck` passes
- [ ] `pnpm lint` passes
- [ ] `pnpm build` passes (the previously-mentioned `cacheComponents`
      removal is a no-op — confirmed via `next.config.ts` check that
      it was never added; the reverted BGM feature left no residue)
- [ ] Dev server smoke test: open every station, open + close the
      project modal, hit Tab inside the modal to confirm focus is
      trapped, hit Escape to close
- [ ] Click outside backdrop closes the modal
- [ ] Focus returns to the originating card tile after close
- [ ] README updated with a short "Component library" section
      describing the shadcn+Base UI scaffolding and the `pa-*` variant
      table

### Alternative Approaches Considered

| Alt | Why rejected |
|---|---|
| shadcn with Radix (default style) | Bundle is ~50% larger for the primitives we use; Base UI is the newer official combo shadcn recommends as of 2026 |
| Headless UI from Tailwind Labs | Smaller scope (no Dialog with portal/focus-trap parity), shrinking ecosystem |
| Hand-roll a focus trap library | The focus-trap problem has been solved by Base UI; reinventing it on a portfolio is the textbook "don't do this" |
| Wholesale rewrite of every component | Audit showed the actually-replaceable surface is small. Forcing shadcn into the train graphic or atmosphere overlays would be ceremony without benefit |
| Cleaner default shadcn aesthetic | User explicitly chose 1:1 Velvet Line preservation in the brainstorm |
| Skip Form scaffold | We don't have a form today, but adding `form.tsx` now is two CLI seconds — the cost of NOT having it shows up when the first form needs to ship and we have to retrofit |
| Migrate route-map tooltips to Tooltip primitive | Current CSS-only opacity/group-hover is zero-bundle and works. Tooltip primitive adds 5-6 kB for no visible win |

## Acceptance Criteria

### Functional

- [ ] `pnpm dlx shadcn@latest add <component>` succeeds for any future
      component without requiring manual `components.json` patching
- [ ] The project-card modal in `calling-cards.tsx` opens, closes via
      backdrop click, closes via Escape, closes via ✕ CLOSE
- [ ] Tab key cycles focus WITHIN the modal — does NOT escape to page
      content (NEW vs current behavior)
- [ ] Closing the modal returns focus to the card tile that opened it
      (NEW vs current behavior)
- [ ] Modal entry/exit animation matches current 1:1 (opacity + scale
      + y, `dur.fast` / `ease.snap`)
- [ ] Every `<Button>` consumer renders with correct Velvet Line chrome
      (offset shadow, border-2, font-mono, amber accent where applicable)
- [ ] Reduced-motion (`prefers-reduced-motion: reduce`) disables the
      modal scale/y animations (cross-fade only)

### Non-Functional

- [ ] `pnpm typecheck` passes (TS strict + `noUncheckedIndexedAccess`)
- [ ] `pnpm lint` passes
- [ ] `pnpm build` succeeds; no new prerender errors
- [ ] Bundle delta for `/works` route (the modal page) is **≤ +10 KB
      gzip** vs main (Base UI Dialog + Button slot machinery should
      come in under this)
- [ ] No new dev-mode console warnings
- [ ] `shadcn add` re-run on `dialog` / `button` does not regress
      project tokens (verified by re-running and `git diff` showing
      only chrome adjustments)

### Quality Gates

- [ ] No `useEffect` reintroduced for behavior that Base UI now owns
      (scroll-lock, Escape, focus-trap — all delete from
      `calling-cards.tsx`)
- [ ] `cn()` used in all new code; existing `clsx(...)` call sites can
      stay (opportunistic migration, not required)
- [ ] All client-component boundaries explicit via `"use client"` at
      the file top (double quotes per project convention)
- [ ] No semicolons in new files (project ASI convention)
- [ ] `--color-p5-black` is now defined in `app/globals.css @theme {}`;
      `grep` for it across the repo shows zero broken references

## Success Metrics

- [ ] Future feature with a Dialog/Tooltip/Popover/Form lands in <1
      hour of UI work (primitives are ready, just compose)
- [ ] Modal a11y audit (axe-core, manual keyboard test) shows zero
      WCAG 2.1 SC 2.4.3 / 2.4.11 violations on `/works`
- [ ] Visual diff (manual): `/works` modal indistinguishable from
      current

## Dependencies & Risks

| Risk | Mitigation |
|---|---|
| `@base-ui-components/react` API rename to `@base-ui/react` mid-flight (per InfoQ — Feb 2026) | Verify package name at install time; if rename has shipped, use the new one and document |
| `tw-animate-css` plugin syntax under Tailwind v4 differs from docs | Validated by 2-of-3 research agents; if it errors, fall back to inline `@keyframes` (small, contained) |
| Aliasing `--background` etc. conflicts with future shadcn block that hard-codes a different hue | Aliases use existing project tokens — same hue everywhere — so no conflict expected |
| Motion + Base UI Dialog `render` prop doesn't forward refs cleanly under React 19 strict mode | Documented working pattern at motion.dev/docs/base-ui; verify with dev-mode strict double-mount before merging |
| `shadcn add --overwrite` later wipes our customizations | The `pa-*` variants and chrome adjustments live in our `components/ui/*.tsx` — they'd be overwritten. **Mitigation:** post-install, run `git diff components/ui/` so any future overwrite is surfaced as a diff to merge by hand. Document this in README. |
| Card tile inside `DialogTrigger asChild` doesn't render motion's framer-style hover translate | Current uses CSS `hover:-translate-y-0.5` not motion; safe |
| Existing direct `clsx` imports in 6 files diverge from new `cn` | Acceptable v1; opportunistic migration over time |

## References

### Internal

- Brainstorm: `docs/brainstorms/2026-05-17-shadcn-base-ui-adoption-brainstorm.md`
- Modal target: `components/works/calling-cards.tsx:97-177`
- Scroll-lock + Escape effect to delete: `components/works/calling-cards.tsx:49-61`
- Project tokens: `app/globals.css:3-41`
- Motion tokens: `lib/motion.ts:1-15`
- Path alias: `tsconfig.json:30-33` (`@/*`)
- Convention confirmations: double quotes (`"use client"`), no semicolons, TS strict + `noUncheckedIndexedAccess`
- Existing button-shaped surface (file:line per audit):
  - `components/works/calling-cards.tsx:70-91` (card tile)
  - `components/works/calling-cards.tsx:129-136` (✕ CLOSE)
  - `components/works/calling-cards.tsx:149-160` (▸ LIVE)
  - `components/works/calling-cards.tsx:163-170` (▸ SOURCE)
  - `app/(stations)/error.tsx:21-27` (RETRY)
  - `app/not-found.tsx:27-32` (RETURN TO NOW)
  - `app/(stations)/page.tsx:42-51` (BOARD NEXT TRAIN)
  - `app/(stations)/contact/page.tsx:80-89` (CV DOWNLOAD)
  - `components/train/status-bar.tsx:15-21` (日 / EN toggle)
  - `components/lab/terminal.tsx:151-209` (focus wrapper — converted to `<div role="button">`)

### External

- [shadcn/ui — components.json schema](https://ui.shadcn.com/docs/components-json)
- [shadcn/ui — Tailwind v4 setup](https://ui.shadcn.com/docs/tailwind-v4)
- [shadcn/ui — Theming + cssVariables](https://ui.shadcn.com/docs/theming)
- [shadcn/ui — January 2026 Base UI changelog](https://ui.shadcn.com/docs/changelog/2026-01-base-ui)
- [shadcnblocks — Introducing Base UI and Component Styles](https://www.shadcnblocks.com/blog/introducing-base-ui-and-component-styles)
- [shadcn-ui/ui Discussion #6248 — migrate Radix to Base UI](https://github.com/shadcn-ui/ui/discussions/6248)
- [Base UI — Dialog](https://base-ui.com/react/components/dialog)
- [Base UI — Tooltip](https://base-ui.com/react/components/tooltip)
- [Base UI — Animation handbook (motion/react)](https://base-ui.com/react/handbook/animation)
- [Base UI — Forms handbook](https://base-ui.com/react/handbook/forms)
- [Base UI — Accessibility overview](https://base-ui.com/react/overview/accessibility)
- [Motion — Animate Base UI components](https://motion.dev/docs/base-ui)
- [Radix Primitives — Linear case study (heavy theming reference)](https://www.radix-ui.com/primitives/case-studies/linear)
- [Radix Primitives — Vercel case study](https://www.radix-ui.com/primitives/case-studies/vercel)
- [Infinum frontend handbook — extending shadcn variants](https://infinum.com/handbook/frontend/react/tailwind/shadcn)
- [enhanced-button (jakobhoeg) — variant API pattern](https://github.com/jakobhoeg/enhanced-button)
- [tw-animate-css repository (shadcn replacement for tailwindcss-animate)](https://github.com/Wombosvideo/tw-animate-css)
- [UXPin — accessible modals + focus traps 2026](https://www.uxpin.com/studio/blog/how-to-build-accessible-modals-with-focus-traps/)

### Compiled Gotchas

1. **`tailwindcss-animate` is deprecated.** Use `@import "tw-animate-css";` in CSS + `pnpm add -D tw-animate-css`. The plan installs the new package and uses the new import line.
2. **Base UI imports use sub-paths.** `import { Dialog } from "@base-ui-components/react/dialog"` — never the package root. Turbopack tree-shakes correctly with sub-paths.
3. **`'use client'` boundary** lives at the primitive wrapper file (`components/ui/*.tsx`), not at every consumer. Server components can import client primitives freely.
4. **Motion + Dialog**: animate only `opacity` / `transform` / `filter` / `clipPath`. Anything else won't hold the exit animation reliably.
5. **`Dialog.Popup` must stay as the focus-managed element.** Replacing it with a plain `<motion.div>` (not via the `render` prop) loses the focus trap and screen-reader semantics.
6. **`Dialog.Close` should live INSIDE `Dialog.Popup`** so touch-screen-reader users have an in-context escape.
7. **`asChild` requires exactly one child.** If you need icon+text inside an `asChild` button, wrap children in a `<span>` or use Radix `Slottable`.
8. **`shadcn add --overwrite`** will wipe your customizations. Always commit `components/ui/*.tsx` before re-running the CLI on an existing component; resolve via git merge. **Mitigated further by D3: pa-* variants live in a separate file the CLI never touches.**

## Deepening Notes (2026-05-17)

These notes consolidate the 16-agent review (10 reviewers + 4 skill
applications + 2 research explorations) and **supersede** any
conflicting text in Phases 1–5 above.

### D1. Scope cuts (load-bearing)

| Item | Cut | Reason |
|---|---|---|
| `Form`, `Input`, `Label` scaffolds | YES | Zero v1 consumers. Future contact form is hypothetical. `pnpm dlx shadcn@latest add form` is 2s when needed. |
| `react-hook-form`, `@hookform/resolvers`, `zod` deps | YES | Only pulled in because of Form scaffold. Cut Form → cut these. |
| `Tooltip` scaffold | YES | Route-map's CSS-only tooltip stays bespoke; no v1 consumer. |
| `pa-cyan`, `pa-red`, `pa-icon` variants | YES | Pure speculation, no consumer in audit. |
| `pa-yellow` | KEEP | Single consumer (CV download). Could fold into pa-amber via className override; not worth the special case. |
| `pa-amber`, `pa-ghost-amber`, `pa-ghost-line` | KEEP | All have multiple real consumers. |
| `--color-p5-black` fix folded in | CUT from PR | Separate one-line commit before/after; muddies the diff. |
| Terminal `<div role="button">` conversion | CUT | Scope creep into bespoke territory. Current works. |
| Status-bar `日 / EN` Button promotion | CUT | No-op handler doesn't earn primitive treatment. |
| Full `clsx` → `cn` codemod | CUT | Convert only `calling-cards.tsx` (file being heavily edited). Other 5 sites stay on `clsx`. Reserve `cn()` for `components/ui/` callers. |

**Final dep install command:**

```bash
pnpm add @base-ui-components/react class-variance-authority
pnpm add -D tw-animate-css
```

(Drop `@radix-ui/react-slot` per D5; drop `react-hook-form`, `zod`,
`@hookform/resolvers` per cuts above.)

**Final `pnpm dlx shadcn@latest add` invocation:**

```bash
pnpm dlx shadcn@<pinned-version> add button dialog
```

(Drop `tooltip`, `input`, `form` per cuts.)

### D2. AnimatePresence + Dialog.Portal nesting — the critical race fix

Original Phase 3 sketch had:

```tsx
<Dialog.Root open={open}>
  <AnimatePresence>
    {open && (
      <Dialog.Portal keepMounted>
        <Dialog.Backdrop … />
        <Dialog.Popup … />
      </Dialog.Portal>
    )}
  </AnimatePresence>
</Dialog.Root>
```

**This is contradictory.** `keepMounted` tells Base UI to retain DOM
across `open` transitions; the surrounding conditional gates mount on
`open`. When `open` flips false, AnimatePresence holds the exit
animation while the conditional unmounts the Portal — Base UI sees
hard unmount, motion can't run exit.

**Correct nesting (canonical 2026 pattern, julik-frontend-races +
motion.dev/docs/base-ui):**

```tsx
<Dialog.Root open={open} onOpenChange={setOpen} modal={true}>
  <Dialog.Portal keepMounted>
    <AnimatePresence>
      {open && (
        <>
          <Dialog.Backdrop
            render={
              <motion.div
                {...backdropMotion}
                transition={motionTransition}
              />
            }
          />
          <Dialog.Popup
            render={
              <motion.div
                {...popupVariants}
                transition={motionTransition}
              />
            }
            className={cn(accentBorder[active.accent])}
          >
            {/* content */}
          </Dialog.Popup>
        </>
      )}
    </AnimatePresence>
  </Dialog.Portal>
</Dialog.Root>
```

Key invariants:

- `Dialog.Root` always rendered with controlled `open`
- `Dialog.Portal keepMounted` always rendered — Base UI keeps DOM alive
- `AnimatePresence` always rendered inside Portal
- `{open && (…)}` lives inside AnimatePresence; flipping false triggers
  exit animation, then unmount, then `onExitComplete`
- `modal={true}` explicit (per Silent #3 — don't rely on default)

Hoist motion variants to module scope (React best-practices):

```ts
// Top of components/works/calling-cards.tsx
const backdropMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} as const

const popupMotionFull = {
  initial: { opacity: 0, scale: 0.96, y: 8 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.97, y: 4 },
} as const

const popupMotionReduced = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} as const

const motionTransition = { duration: dur.fast, ease: ease.snap } as const
```

Reduced-motion handling (Pattern #5, Silent #10):

```tsx
const reduceMotion = useReducedMotion() === true
const popupVariants = reduceMotion ? popupMotionReduced : popupMotionFull
```

`prefers-reduced-motion: reduce` users get cross-fade only — the CSS
rule in `globals.css:82-91` doesn't affect motion/react JS variants.

### D3. shadcn-add-safe pa-* split

**Architecture F4 (the single most important architectural fix).**
Move pa-* variants into a separate file the CLI never overwrites:

```ts
// components/ui/button-variants.ts (NEW, never touched by shadcn CLI)
import { cva, type VariantProps } from "class-variance-authority"

export const buttonVariants = cva(
  // …base classes…
  {
    variants: {
      variant: {
        // shadcn defaults — keep so future blocks work
        default: "…",
        destructive: "…",
        outline: "…",
        secondary: "…",
        ghost: "…",
        link: "…",
        // Velvet Line — pa-* family
        "pa-amber":          "border-2 border-line bg-amber text-void shadow-[6px_6px_0_0_var(--color-p5-black)] hover:bg-yellow hover:-translate-y-0.5 hover:translate-x-0.5 active:translate-y-0 active:translate-x-0 transition-transform",
        "pa-yellow":         "border-2 border-line bg-yellow text-void shadow-[6px_6px_0_0_var(--color-p5-black)] hover:bg-amber hover:-translate-y-0.5 hover:translate-x-0.5 active:translate-y-0 active:translate-x-0 transition-transform",
        "pa-amber-outline":  "border border-amber text-amber hover:bg-amber hover:text-void shadow-[3px_3px_0_0_var(--color-p5-black)]",
        "pa-line-outline":   "border border-line text-fg hover:border-amber hover:text-amber shadow-[3px_3px_0_0_var(--color-p5-black)]",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-5",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
```

```tsx
// components/ui/button.tsx (shadcn-generated; we ONLY edit it to import from button-variants.ts)
"use client"

// !! VELVET LINE: pa-* variants live in ./button-variants.ts so
// !! `pnpm dlx shadcn@<v> add button --overwrite` doesn't clobber them.
// !! If you regenerate this file, re-import from ./button-variants.

import * as React from "react"
import { cn } from "@/lib/utils"
import { buttonVariants, type ButtonVariantProps } from "./button-variants"
// …rest of generated Button below, with cva import removed…
```

Three-layer guard (Silent #1):

1. **Sentinel comment** (above) — visible in every `git diff`.
2. **Inline-snapshot test** at `tests/ui/button-variants.test.ts`:
   ```ts
   import { buttonVariants } from "@/components/ui/button-variants"
   it("pa-amber variant string is stable", () => {
     expect(buttonVariants({ variant: "pa-amber" })).toMatchInlineSnapshot()
   })
   ```
3. **Optional pre-commit grep** (`.husky/pre-commit`):
   ```bash
   grep -q "from \"./button-variants\"" components/ui/button.tsx \
     || { echo "components/ui/button.tsx must import buttonVariants from ./button-variants"; exit 1; }
   ```

### D4. TypeScript fixes (Kieran MUST FIX)

**Drop forwardRef** — React 19 ref-as-prop pattern:

```tsx
// Hand-written components only. CLI-generated files keep forwardRef
// for now (the CLI will catch up).
interface ButtonOwnProps extends ButtonVariantProps {
  className?: string
  ref?: React.Ref<HTMLElement>
}
type AsChildButton = ButtonOwnProps & { asChild: true; children: React.ReactElement }
type NativeButton = ButtonOwnProps & { asChild?: false } & React.ButtonHTMLAttributes<HTMLButtonElement>
export type ButtonProps = AsChildButton | NativeButton
```

Discriminated union forces `children` to be a single `ReactElement`
when `asChild=true` (Slot's runtime contract). Forbids passing native
button props on the slot path.

**Brand PaButtonVariant** (so Velvet Line consumers can constrain):

```ts
export type ShadcnButtonVariant =
  | "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
export type PaButtonVariant =
  | "pa-amber" | "pa-yellow" | "pa-amber-outline" | "pa-line-outline"
export type ButtonVariant = ShadcnButtonVariant | PaButtonVariant
```

Optional `PaButton` wrapper for `pa-*`-only call sites:

```tsx
export type PaButtonProps = Omit<ButtonProps, "variant"> & { variant: PaButtonVariant }
```

**Re-export Dialog prop types** so consumers don't have to reach back
into Base UI:

```ts
export type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root>
export type DialogPopupProps = React.ComponentProps<typeof DialogPrimitive.Popup>
export { Dialog, type DialogProps, DialogPopup, type DialogPopupProps }
```

**Replace forwardRef wrappers with function components** for Dialog
sub-parts that only merge className (Kieran's example #4):

```tsx
type BackdropProps = React.ComponentProps<typeof DialogPrimitive.Backdrop>
export function DialogBackdrop({ className, ...props }: BackdropProps) {
  return <DialogPrimitive.Backdrop {...props} className={cn(BACKDROP_BASE_CN, className)} />
}
```

**Verify `render` prop signature post-install** — open
`node_modules/@base-ui-components/react/dist/dialog/popup/DialogPopup.d.ts`
and check the actual type. Document the exact import path used so
future reviews can verify it didn't drift.

**`noUncheckedIndexedAccess` watch** — the existing `clipPaths[0]`
indexing yields `string | undefined`. Already tolerated at call site;
flag any future shadcn block (`DataTable`, `Command`, `Combobox`) for
similar patterns before merging.

### D5. Performance: drop `@radix-ui/react-slot`, use Base UI `render`

Original plan kept `@radix-ui/react-slot` for Button polymorphism while
Dialog uses Base UI's `render` prop. Inconsistent (one polymorphism API
per file is cleaner) and adds ~1 KB.

**Use Base UI's `render` prop in Button** (consistent with Dialog,
saves the dep):

```tsx
import { useRender } from "@base-ui-components/react/use-render"

export function Button({ render, variant, size, className, ...props }: ButtonProps) {
  const element = useRender({
    render: render ?? <button />,
    props: { className: cn(buttonVariants({ variant, size }), className), ...props },
  })
  return element
}
```

Consumers wrap with `render={<Link href="…" />}`:

```tsx
<Button render={<Link href="/works" />} variant="pa-amber">BOARD NEXT TRAIN</Button>
```

Trade-off acknowledged:
- **Pro**: drops 1KB, removes Radix/Base UI cross-library tension,
  consistent with Dialog API, brings bundle under ≤10 KB target.
- **Con**: differs from shadcn CLI's default button.tsx (which uses
  Slot). If user prefers the CLI default, keep `@radix-ui/react-slot`
  and accept the asymmetry — it's a 1KB tax for not having to hand-edit.

**Decision: use Base UI `render`.** Keeps Phase 2 sketches honest;
matches Dialog idiom; aligns with the architecture-strategist's F5
"revisit when shadcn's Base UI button template supports `render`"
recommendation — we just skip ahead.

**Convert inline `boxShadow` strings** in `calling-cards.tsx` to
Tailwind arbitrary utilities:

```diff
- style={{ boxShadow: "6px 6px 0 0 var(--color-p5-black)" }}
+ className={cn("shadow-[6px_6px_0_0_var(--color-p5-black)]", …)}
```

Eliminates per-render style allocation across ~14 elements. Tailwind
generates one cached rule per unique shadow value.

**Add `@next/bundle-analyzer`** to Phase 5 quality gates and replace
"estimated ≤10 KB" with a measured per-route delta. Specifically scope
the budget per route:

```
/works: +≤8 KB gzip (Button + Dialog)
/now, /contact, /lab, /rumors: +≤3 KB gzip (Button only)
```

**Keep `afterInteractive`** (no plan change) for any Script tag added
later — irrelevant here since no script is loaded.

**Don't memoize `cn()` or Button.** twMerge has internal LRU; React 19
compiler-friendly path skips equal-prop renders naturally.

### D6. Frontend design refinements

- **Hover translate `1px` → `0.5` (2px)** — match `calling-cards.tsx:75`
  card tile hover. 1px breaks continuity.
- **Add `active:translate-y-0 active:translate-x-0`** — shadow visually
  collapses on click (Persona menu staple).
- **Drop invented `4px 4px` shadow tier.** Use existing 3/6/8/10:
  `pa-amber` / `pa-yellow` → `6px 6px` (peer to cards);
  `pa-amber-outline` / `pa-line-outline` → `3px 3px` (peer to inline
  pill links). The Dialog popup stays `10px 10px` (active modal tier).
- **Focus ring pairs by accent** (not always amber):
  `pa-amber` / `pa-yellow` / `pa-red` → `focus-visible:ring-cyan`;
  `pa-cyan` (if/when added) → `focus-visible:ring-amber`;
  `pa-*-outline` → `focus-visible:ring-amber`.
- **Disabled state = shadow collapses**, not opacity drop:
  ```
  disabled:translate-x-[6px] disabled:translate-y-[6px]
  disabled:shadow-none disabled:bg-elevated disabled:text-muted
  disabled:border-line disabled:pointer-events-none
  ```
  Reads as a "punched-in PA tile."
- **Size scale fix**: `lg` was `px-6`. Tighten to `px-5` so label-to-edge
  ratio matches 6px shadow. Drop `icon` size entirely since no
  consumer mounts it.
- **Rename `pa-ghost-amber` → `pa-amber-outline`**, `pa-ghost-line` →
  `pa-line-outline`. "Ghost" is shadcn vocabulary; the Velvet Line uses
  "OUTLINE" as a stencil idiom (matches `font-mono tracking-[0.3em]`
  labels). Authors scan accent-first.
- **Dialog backdrop scanline overlay** (uses existing
  `--z-overlay-scan` z-token):
  ```
  before:absolute before:inset-0 before:pointer-events-none
  before:opacity-[0.06] before:bg-[repeating-linear-gradient(0deg,transparent_0,transparent_2px,var(--color-fg)_2px,var(--color-fg)_3px)]
  ```
  6% opacity over `bg-void/85` reads CRT, not noise. Page atmosphere
  already carries noise — don't stack.
- **Dialog title**: `font-display tracking-[0.04em] text-fg leading-[0.95]`
  + add an amber eyebrow `<span className="font-mono text-micro
  tracking-[0.3em] text-amber">DOSSIER · {n}</span>` above. Anton at
  modal-hero sizes needs the +4% tracking nudge to escape "movie
  poster" condensed look.
- **Shared `.pa-tab` micro-affordance** in `globals.css`: reusable
  amber 8×3px tag (`amber bg, void text, font-mono text-micro,
  tracking-[0.3em], uppercase`) consumed by Dialog title eyebrow and
  any future tab/badge. Binds Button + Dialog visually.

### D7. Test infrastructure (catch the silent failures)

Project currently has no tests. The plan's "manual smoke test" criteria
are the through-line silent-failure pattern. Add a thin Vitest setup
gated on shadcn-affected surfaces.

**Minimum gate** (Phase 5):

```
tests/ui/button-variants.test.ts     // inline snapshot per pa-* variant
tests/ui/dialog-a11y.test.tsx        // Vitest browser mode: Tab focus trap,
                                     // Escape close, scroll-lock, download
                                     // attr survival, ESC during exit anim
tests/ui/token-integrity.test.ts     // grep + regex: --color-p5-black
                                     // defined; no --color-p5-blakc typos
```

CI runs `pnpm typecheck && pnpm lint && pnpm test && pnpm build`. Phase 5
quality gates updated accordingly.

Add `vitest`, `@vitest/browser`, `@testing-library/react`,
`@testing-library/user-event`, `@testing-library/jest-dom` to
devDependencies. (~30 MB devDeps, ~0 KB runtime — they don't ship.)

### D8. Agent-native annotations

Cheap additions for test/agent driveability:

```tsx
// Button
<Comp data-variant={variant} data-size={size} …>

// Dialog (in calling-cards.tsx)
<DialogTrigger asChild>
  <button data-testid={`project-card-${project.id}`} …>…</button>
</DialogTrigger>
<DialogPopup data-testid="project-dialog" …>
```

Plus `data-state="open|closed"` from Base UI Dialog (auto). Agents and
Playwright tests get deterministic selectors without scraping
classnames (which twMerge can re-order).

### D9. Security hygiene

| Item | Action |
|---|---|
| `rel="noreferrer noopener"` order | Swap to canonical `rel="noopener noreferrer"`. |
| `jsx-no-target-blank` ESLint rule | Confirm enforced (default in `eslint-config-next`); add explicit AC. |
| `pnpm audit --prod` | Add as Phase 5 gate; zero high/critical advisories. |
| Pin `tw-animate-css` | Exact version (no `^`). Single-maintainer + CSS injection surface. |
| Pin shadcn CLI in README | `pnpm dlx shadcn@<x.y.z>` not `@latest`. |
| `dialog.tsx` style-prop policy | Add code comment forbidding user input in `style`. |
| CSP / `X-Frame-Options` | **Defer to separate task.** Add a "future work" note that any CSP must allow `https://open.spotify.com` (already cut with BGM revert but worth tracking) and accommodate motion + tw-animate-css inline styles. |

### D10. Base UI ecosystem split exit clause

Architecture F2 + heavily-themed-sites research both flagged: Base UI
v1 is GA but the ecosystem is thinner than Radix in 2026. ~90% of
shadcn community blocks (DataTable, Combobox, Calendar) still ship
Radix-only imports. Cal.com and Trigger.dev are the closest themed
references; both currently use Radix.

**Exit clause** to document in README:

> If a future shadcn block requires Radix-only primitives, install
> Radix alongside Base UI rather than uprooting Base UI. The Velvet
> Line `pa-*` variants live in `button-variants.ts` and don't care
> about primitive backend. Mixing in a single component is bad
> (incompatible event models per heavily-themed-sites research);
> mixing across components is fine.

### D11. Token + globals.css adjustments

- **`--z-modal: 70`** in `app/globals.css :root` (Pattern #9). Replace
  inline `zIndex: 70` in the migrated `calling-cards.tsx` with
  `style={{ zIndex: "var(--z-modal)" }}`.
- **`--color-p5-black` resolution**: don't define `#000000` as a new
  token — alias to the existing void token:
  ```css
  --color-p5-black: var(--color-void);
  ```
  Architecture F9: two tokens for one hue is the start of drift.
  **However**, fold this into a separate one-line commit, not this
  PR (Simplicity #5).
- **shadcn alias layer can skip `@theme inline {}`** if we don't expect
  shadcn blocks to need `bg-card ≠ bg-elevated` (Architecture F1).
  Decision: **keep the alias layer** for upgradability; the indirection
  is ~10 CSS lines and zero runtime cost. Worth the bet.

### D12. clsx → cn migration policy

- **Migrate `components/works/calling-cards.tsx`** in this PR (heavily
  edited, all-or-nothing).
- **Leave the other 5 `clsx` consumers** alone (`terminal.tsx`,
  `skill-bar.tsx`, `route-map.tsx`, `manga-panels.tsx`, +1).
- **Reserve `cn()` for `components/ui/` callers** as the shadcn-side
  helper.

No half-migration limbo, no global codemod scope creep.

### D13. AnimatePresence + Next 16 route navigation

Silent #9 + Races #7: clicking an in-modal link causes Next to unmount
the route tree before AnimatePresence runs exit. Modal "vanishes
cheaply."

Fix:

```tsx
// In calling-cards.tsx
const pathname = usePathname()
useEffect(() => {
  // Backstop: force-close on any pathname change.
  setActiveId(null)
}, [pathname])
```

Wait — that's a `useEffect`. The no-use-effect skill flagged that we
should avoid new effects. **Alternative without effect**: derive close
from `usePathname()` in render via a `useDeferredValue` or — simpler
— accept this single justified effect as "external system
subscription" (the Next router). Pre-existing terminal.tsx has a
useEffect already; one more for route-driven cleanup is honest.

For internal links inside the modal, also wire:

```tsx
const handleInternalNav = (href: string) => async (e: MouseEvent) => {
  e.preventDefault()
  setActiveId(null)
  // wait for AnimatePresence exit ~300ms then navigate
  await new Promise((r) => setTimeout(r, dur.fast * 1000 + 50))
  router.push(href)
}
```

Trade-off acknowledged: this adds latency to in-modal navigation. For
this codebase, in-modal links are rare (LIVE/SOURCE go external in
new tabs). Apply the route-change backstop effect; skip the explicit
intercept handler unless a real consumer needs it.

### D14. tw-animate-css setup specifics

- Install: `pnpm add -D tw-animate-css` (devDependency per shadcn
  convention).
- CSS: `@import "tw-animate-css";` **after** `@import "tailwindcss";`
  at the top of `globals.css`.
- Pin to exact version (Security D9).
- Skip the known-broken release with the `fill-mode` default bug
  (Wombosvideo/tw-animate-css#42 — check version notes at install).
- **Class names match deprecated `tailwindcss-animate`** exactly:
  `animate-in`, `animate-out`, `fade-in-0`, `fade-out-0`, `zoom-in-95`,
  `zoom-out-95`, `slide-in-from-{top|bottom|left|right}`, `duration-*`,
  `delay-*`. Zero shadcn template changes needed.
- **Motion conflict guard**: only one library may animate a given
  property on a given element. Plan animates Dialog via motion variants
  (`render={<motion.div … />}`), so tw-animate-css `data-state` rules
  in the generated `dialog.tsx` will be overridden — fine. Don't apply
  both `animate-in` and `motion.div initial=…` on the same element.

### D15. Updated files-to-add/modify

**Add:**
- `lib/utils.ts` (cn helper)
- `components/ui/button.tsx` (shadcn-generated)
- `components/ui/button-variants.ts` (pa-* cva, shadcn-add-safe)
- `components/ui/dialog.tsx` (shadcn-generated, re-skinned)
- `tests/ui/button-variants.test.ts`
- `tests/ui/dialog-a11y.test.tsx`
- `tests/ui/token-integrity.test.ts`
- `vitest.config.ts`
- `components.json`

**Modify:**
- `app/globals.css` — `@import "tw-animate-css"`, `:root` shadcn alias
  layer, `@theme inline` mapping, `--z-modal: 70`, **(NOT)
  --color-p5-black** (separate commit).
- `app/(stations)/page.tsx` — `<Button render={<Link…/>} variant="pa-amber">`
- `app/(stations)/contact/page.tsx` — `<Button render={<a…download/>} variant="pa-yellow">`
- `app/(stations)/error.tsx` — `<Button variant="pa-amber-outline" onClick={reset}>`
- `app/not-found.tsx` — `<Button render={<Link…/>} variant="pa-amber-outline">`
- `components/works/calling-cards.tsx` — Dialog migration + `clsx`→`cn`
  + module-scope motion variants + `useReducedMotion` + boxShadow→Tailwind utilities + `data-testid`
- `package.json` — add `@base-ui-components/react`, `cva`,
  `tw-animate-css`, vitest devDeps; add `test` script; pin shadcn CLI
  in README
- `README.md` — Component library section + a11y/agent contract
  paragraph + exit clause for primitive split + shadcn add policy

**Do NOT touch:**
- `components/train/status-bar.tsx` (toggle stays bespoke)
- `components/lab/terminal.tsx` (focus wrapper stays bespoke)
- `components/train/route-map.tsx` (CSS-only tooltips stay bespoke)
- `components/atmosphere/*` (overlays)
- `components/rumors/manga-panels.tsx` (bespoke grid)
- `components/now/*` (bespoke)
- `components/skip-link.tsx` (tiny bespoke)
- `app/(stations)/contact/page.tsx` social row anchors (tile-shaped,
  not button-shaped)
- `app/(stations)/rumors/[slug]/page.tsx` "← back" link (text link)

### D16. Updated acceptance criteria (additions)

Append to original AC:

- [ ] **`pa-*` variants survive `shadcn add button --overwrite`** (verified by snapshot test + sentinel comment + variant-file split)
- [ ] **`pnpm test` passes** — button snapshot, dialog a11y, token integrity tests green
- [ ] **`pnpm audit --prod` reports zero high/critical** advisories
- [ ] **Bundle delta measured** with `@next/bundle-analyzer`: `/works` ≤ +8 KB gzip; other routes ≤ +3 KB gzip
- [ ] **Tab cycles focus within modal** (asserted via `@testing-library/user-event.tab()`, not manual)
- [ ] **`prefers-reduced-motion: reduce` produces cross-fade only** (no `scale`/`y` in computed transform; asserted via matchMedia mock)
- [ ] **`data-state="open"` on Dialog.Popup** verified visible in DOM
- [ ] **All `target="_blank"` anchors carry `rel="noopener noreferrer"`** (lint rule + grep)
- [ ] **No new `useEffect` introduced** except the justified one route-change backstop in `calling-cards.tsx`
- [ ] **README documents** the `components/ui/` vs `components/<feature>/` boundary, the pa-* re-merge policy, the Base UI primitive-split exit clause, and the a11y/agent contract Dialog enforces

### D17. Known unknowns to verify at install time

1. **Base UI package name.** `@base-ui-components/react` vs `@base-ui/react` — InfoQ Feb 2026 mentioned a rename. Confirm via `pnpm view @base-ui-components/react version` before install.
2. **shadcn `style: "base-vega"` exact name.** Other base-* styles
   (base-nova, base-maia, base-lyra, base-mira) may be more current.
   Verify against `ui.shadcn.com/docs/components-json` at install.
3. **`useRender` import path** for Base UI's polymorphism. The Button
   sketch in D5 uses `@base-ui-components/react/use-render`; verify
   actual path post-install.
4. **`Dialog.Popup` `render` prop type signature.** Verify against
   `node_modules/@base-ui-components/react/dist/dialog/popup/DialogPopup.d.ts`
   after install (Kieran #5).
5. **`tw-animate-css` version-specific bugs.** Check release notes
   for the fill-mode bug (#42) and Jan 2026 issue (#61).
