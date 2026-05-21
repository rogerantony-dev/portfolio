export function Carriage({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mx-auto px-4 md:px-6"
      style={{
        maxWidth: "var(--container-carriage)",
        paddingTop: "calc(var(--spacing-station-y) + 0.5rem)",
        paddingBottom: "calc(var(--spacing-station-y) + 1.5rem)",
        position: "relative",
        zIndex: "var(--z-content)",
      }}
    >
      <div className="rounded-md border border-line/50 bg-panel/40 backdrop-blur-[1px] p-4 sm:p-6 md:p-12 min-h-[60vh]">
        {children}
      </div>
    </div>
  )
}
