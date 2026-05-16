export function Scanlines() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{
        zIndex: "var(--z-overlay-scan)",
        background:
          "repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(228, 232, 238, 0.04) 2px, rgba(228, 232, 238, 0.04) 3px)",
      }}
    />
  )
}
