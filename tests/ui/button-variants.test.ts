// ┌──────────────────────────────────────────────────────────────────┐
// │  Snapshot test for the pa-* Velvet Line Button variants.          │
// │                                                                    │
// │  If `pnpm dlx shadcn@<v> add button --overwrite` ever clobbers the │
// │  pa-* extensions, this test fails loudly. The snapshot strings are │
// │  inline so diffs in the variant class string are visible in PR     │
// │  review without spelunking through .snap files.                    │
// │                                                                    │
// │  When intentionally tweaking a pa-* variant (e.g. via the design   │
// │  pass in deepening D6), run `pnpm test -u` to update the snapshots.│
// └──────────────────────────────────────────────────────────────────┘

import { describe, expect, it } from "vitest"
import { buttonVariants } from "@/components/ui/button-variants"

describe("pa-* button variants", () => {
  it("pa-amber: filled with 6px offset shadow + hover translate", () => {
    const cls = buttonVariants({ variant: "pa-amber" })
    expect(cls).toContain("bg-amber")
    expect(cls).toContain("shadow-[6px_6px_0_0_var(--color-p5-black)]")
    expect(cls).toContain("hover:-translate-y-0.5")
    expect(cls).toContain("active:translate-y-0")
    expect(cls).toContain("font-mono")
  })

  it("pa-yellow: filled with 6px shadow, swaps to amber on hover", () => {
    const cls = buttonVariants({ variant: "pa-yellow" })
    expect(cls).toContain("bg-yellow")
    expect(cls).toContain("hover:bg-amber")
    expect(cls).toContain("shadow-[6px_6px_0_0_var(--color-p5-black)]")
  })

  it("pa-amber-outline: 3px shadow, transparent bg, amber border + text", () => {
    const cls = buttonVariants({ variant: "pa-amber-outline" })
    expect(cls).toContain("border-amber")
    expect(cls).toContain("text-amber")
    expect(cls).toContain("bg-transparent")
    expect(cls).toContain("shadow-[3px_3px_0_0_var(--color-p5-black)]")
  })

  it("pa-line-outline: 3px shadow, line border, fg text", () => {
    const cls = buttonVariants({ variant: "pa-line-outline" })
    expect(cls).toContain("border-line")
    expect(cls).toContain("text-fg")
    expect(cls).toContain("hover:border-amber")
  })

  it("default (shadcn) variant survives alongside pa-* additions", () => {
    const cls = buttonVariants({ variant: "default" })
    expect(cls).toContain("bg-primary")
    expect(cls).toContain("rounded-lg")
  })

  it("lg-pa size: 48px tall, 24px padding — Velvet Line CTA tier", () => {
    const cls = buttonVariants({ variant: "pa-amber", size: "lg-pa" })
    expect(cls).toContain("h-12")
    expect(cls).toContain("px-6")
  })
})
