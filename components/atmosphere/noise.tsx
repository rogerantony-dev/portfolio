const NOISE_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
      <filter id='n'>
        <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
      </filter>
      <rect width='100%' height='100%' filter='url(%23n)'/>
    </svg>`
  )

export function Noise() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 opacity-[0.05] mix-blend-screen"
      style={{
        zIndex: "var(--z-overlay-noise)",
        backgroundImage: `url("${NOISE_SVG}")`,
        backgroundSize: "200px 200px",
      }}
    />
  )
}
