// ┌──────────────────────────────────────────────────────────────────┐
// │  Velvet Line Button variants. Lives in a SEPARATE file from        │
// │  components/ui/button.tsx so that re-running                       │
// │     pnpm dlx shadcn@<v> add button --overwrite                     │
// │  regenerates button.tsx without clobbering the pa-* extensions.    │
// │                                                                    │
// │  pa-* variant inventory:                                           │
// │   - pa-amber, pa-yellow         filled (6px offset hard shadow)    │
// │   - pa-amber-outline, pa-line-outline   ghost (3px offset shadow)  │
// │                                                                    │
// │  Adding a variant? Add it here. If button.tsx ever stops importing │
// │  buttonVariants from this file, the silent-failure hunter's        │
// │  tests/ui/button-variants.test.ts snapshot will catch it.          │
// └──────────────────────────────────────────────────────────────────┘

import { cva, type VariantProps } from "class-variance-authority"

export const buttonVariants = cva(
  // Base classes (focus ring, disabled, transition, icon size)
  "group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 active:not-aria-[haspopup]:translate-y-px",
  {
    variants: {
      variant: {
        // ── shadcn defaults — preserved so future shadcn blocks work. ──
        default: "bg-primary text-primary-foreground rounded-lg [a]:hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground rounded-lg",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground rounded-lg",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground rounded-lg",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 rounded-lg",
        link: "text-primary underline-offset-4 hover:underline",

        // ── Velvet Line — filled. Match card-tier shadow (6px). ──
        "pa-amber":
          "border-2 border-line bg-amber text-void font-mono tracking-[0.1em] uppercase shadow-[6px_6px_0_0_var(--color-p5-black)] hover:bg-yellow hover:-translate-y-0.5 hover:translate-x-0.5 active:translate-y-0 active:translate-x-0 transition-transform",
        "pa-yellow":
          "border-2 border-line bg-yellow text-void font-mono tracking-[0.1em] uppercase shadow-[6px_6px_0_0_var(--color-p5-black)] hover:bg-amber hover:-translate-y-0.5 hover:translate-x-0.5 active:translate-y-0 active:translate-x-0 transition-transform",

        // ── Velvet Line — outline. Match inline-pill-tier shadow (3px). ──
        "pa-amber-outline":
          "border border-amber bg-transparent text-amber font-mono tracking-[0.1em] uppercase shadow-[3px_3px_0_0_var(--color-p5-black)] hover:bg-amber hover:text-void hover:-translate-y-0.5 hover:translate-x-0.5 active:translate-y-0 active:translate-x-0 transition-transform",
        "pa-line-outline":
          "border border-line bg-transparent text-fg font-mono tracking-[0.1em] uppercase shadow-[3px_3px_0_0_var(--color-p5-black)] hover:border-amber hover:text-amber hover:-translate-y-0.5 hover:translate-x-0.5 active:translate-y-0 active:translate-x-0 transition-transform",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-1.5 px-5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        "lg-pa": "h-12 gap-2 px-6 text-base", // Velvet Line CTAs (BOARD NEXT TRAIN, DOWNLOAD CV)
        icon: "size-8",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
