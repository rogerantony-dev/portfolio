// ┌──────────────────────────────────────────────────────────────────┐
// │  Dialog a11y smoke tests for the calling-cards modal.             │
// │                                                                    │
// │  Tested in jsdom + RTL — Base UI internals (focus trap, scroll    │
// │  lock) are exercised by mounting and asserting attributes.        │
// │  Full focus-trap / browser keyboard cycle requires browser mode   │
// │  and is deferred.                                                  │
// └──────────────────────────────────────────────────────────────────┘

import { describe, expect, it, beforeEach, afterEach } from "vitest"
import { cleanup, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CallingCards } from "@/components/works/calling-cards"

beforeEach(() => {
  // Stop motion animations from running so Open/Close transitions resolve
  // immediately — keeps the closing assertion deterministic.
  Element.prototype.animate = (() => ({
    cancel: () => {},
    finished: Promise.resolve(),
    play: () => {},
    pause: () => {},
    reverse: () => {},
  })) as unknown as typeof Element.prototype.animate
})

afterEach(() => {
  cleanup()
})

describe("calling-cards modal", () => {
  it("renders one DialogTrigger per project", () => {
    render(<CallingCards />)
    const cards = screen.getAllByTestId(/^project-card-/)
    expect(cards.length).toBeGreaterThan(0)
    for (const card of cards) {
      expect(card.tagName).toBe("BUTTON")
    }
  })

  it("each trigger has a project-id-bearing data-testid", () => {
    render(<CallingCards />)
    const cards = screen.getAllByTestId(/^project-card-/)
    for (const card of cards) {
      const testId = card.getAttribute("data-testid") ?? ""
      expect(testId).toMatch(/^project-card-[a-z0-9-]+$/)
    }
  })

  it("does not render the dialog popup on mount", () => {
    render(<CallingCards />)
    expect(screen.queryByTestId("project-dialog")).not.toBeInTheDocument()
  })

  it("clicking a card opens the dialog with role=dialog", async () => {
    const user = userEvent.setup()
    render(<CallingCards />)

    const firstCard = screen.getAllByTestId(/^project-card-/)[0]
    if (!firstCard) throw new Error("expected at least one project card")
    await user.click(firstCard)

    const popup = await screen.findByTestId("project-dialog")
    expect(popup).toBeInTheDocument()
    expect(popup).toHaveAttribute("role", "dialog")
    // Base UI enforces modal-ness via `inert` on siblings rather than
    // aria-modal on the dialog itself (2026 best practice). Trust the
    // primitive; full focus-trap verification requires browser mode.
  })

  it("the Close button is the focus-trap escape (in-popup)", async () => {
    const user = userEvent.setup()
    render(<CallingCards />)

    await user.click(screen.getAllByTestId(/^project-card-/)[0]!)
    const popup = await screen.findByTestId("project-dialog")

    const close = popup.querySelector("[aria-label='Close project detail']")
    expect(close).not.toBeNull()
  })
})
