export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded focus:bg-cyan focus:px-4 focus:py-2 focus:text-void focus:outline-none focus:ring-2 focus:ring-cyan"
      style={{ zIndex: "var(--z-skip-link)" }}
    >
      Skip to content
    </a>
  )
}
