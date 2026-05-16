export default function WorksPage() {
  return (
    <section className="grid place-items-center min-h-[50vh]">
      <div className="text-center">
        <p
          lang="ja"
          className="font-mono text-muted text-ui tracking-[0.3em]"
        >
          仕事 / WORKS
        </p>
        <p
          className="font-display mt-6 leading-none"
          style={{ fontSize: "var(--text-display)" }}
        >
          <span className="text-red">UNDER</span>{" "}
          <span className="text-fg">CONSTRUCTION</span>
        </p>
        <p className="font-mono text-muted mt-4">// arrives Sprint 3</p>
      </div>
    </section>
  )
}
