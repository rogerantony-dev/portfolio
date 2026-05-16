"use client"

export default function StationError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <section className="grid place-items-center min-h-[40vh]">
      <div className="text-center">
        <p
          className="font-display text-red leading-none"
          style={{ fontSize: "var(--text-hero)" }}
        >
          SIGNAL FAILURE
        </p>
        <p className="font-mono text-muted mt-4">
          // the train hit a fault. try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="font-mono text-ui mt-6 px-6 py-2 border border-amber text-amber hover:bg-amber hover:text-void transition-colors"
        >
          ▸ RETRY
        </button>
      </div>
    </section>
  )
}
