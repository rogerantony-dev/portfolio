// ┌──────────────────────────────────────────────────────────────────┐
// │  Static checks on app/globals.css to catch silent token failures: │
// │   - shadcn alias variables exist (--background / --primary / etc.)│
// │   - --z-modal is defined                                          │
// │   - tw-animate-css is imported                                    │
// │  These guard the "var() falls back to invalid → transparent"      │
// │  silent-failure mode where a typo in a token name renders nothing.│
// └──────────────────────────────────────────────────────────────────┘

import { describe, expect, it } from "vitest"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"

const globalsCss = readFileSync(
  resolve(__dirname, "../../app/globals.css"),
  "utf8",
)

describe("globals.css tokens", () => {
  it("imports tw-animate-css", () => {
    expect(globalsCss).toMatch(/@import\s+"tw-animate-css"/)
  })

  it("defines --z-modal in :root", () => {
    expect(globalsCss).toMatch(/--z-modal:\s*\d+/)
  })

  it.each([
    "--background",
    "--foreground",
    "--border",
    "--ring",
    "--primary",
    "--primary-foreground",
    "--destructive",
    "--radius",
  ])("defines shadcn alias %s", (token) => {
    const pattern = new RegExp(token.replace(/-/g, "\\-") + ":\\s*[^;]+;")
    expect(globalsCss).toMatch(pattern)
  })

  it("maps shadcn aliases into Tailwind namespace via @theme inline", () => {
    expect(globalsCss).toMatch(/@theme\s+inline\s*\{/)
    expect(globalsCss).toMatch(/--color-background:\s*var\(--background\)/)
    expect(globalsCss).toMatch(/--color-primary:\s*var\(--primary\)/)
  })
})
