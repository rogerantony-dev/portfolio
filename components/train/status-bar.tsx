export function StatusBar() {
  return (
    <header
      className="fixed top-0 inset-x-0 border-b border-line bg-void/85 backdrop-blur-sm"
      style={{ zIndex: "var(--z-statusbar)" }}
    >
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 h-12 flex items-center justify-between font-mono text-ui">
        <div className="flex items-center gap-3">
          <span className="text-red" aria-hidden="true">
            ●●●
          </span>
          <span className="text-muted">portfolio.vel</span>
        </div>
        <div className="flex items-center gap-4 text-muted">
          <button
            type="button"
            className="hover:text-fg transition-colors"
            aria-label="Toggle language (Japanese / English) — coming soon"
          >
            <span lang="ja">日</span> / EN
          </button>
          <span aria-hidden="true" className="text-line">
            ▮
          </span>
          <span aria-hidden="true" className="text-amber">
            ▸
          </span>
        </div>
      </div>
    </header>
  )
}
