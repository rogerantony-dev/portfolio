export default function Loading() {
  return (
    <section className="grid place-items-center min-h-[40vh]">
      <p className="font-mono text-muted tracking-[0.3em] text-ui">
        ▶ TRAIN INCOMING{" "}
        <span className="inline-block animate-pulse" aria-hidden="true">
          ▮▮▮
        </span>
      </p>
    </section>
  )
}
