export default function BgmPage() {
  return (
    <section className="grid place-items-center min-h-[50vh]">
      <div className="text-center">
        <p className="font-mono text-muted text-ui tracking-[0.3em]">
          BGM / on rotation
        </p>
        <p
          className="font-display mt-6 leading-none"
          style={{ fontSize: "var(--text-display)" }}
        >
          <span className="text-red">UNDER</span>{" "}
          <span className="text-fg">CONSTRUCTION</span>
        </p>
        <p className="font-mono text-muted mt-4">// arrives Sprint 4</p>
      </div>
    </section>
  )
}
