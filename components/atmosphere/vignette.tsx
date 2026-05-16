export function Vignette() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{
        zIndex: "var(--z-overlay-vig)",
        background:
          "radial-gradient(ellipse at center, transparent 55%, rgba(0, 0, 0, 0.45) 100%)",
      }}
    />
  )
}
