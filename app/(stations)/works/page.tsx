import { CallingCards } from "@/components/works/calling-cards"
import { projects } from "@/lib/projects"

export default function WorksPage() {
  return (
    <section className="grid gap-10">
      <header className="space-y-3">
        <p className="font-mono text-ui text-amber tracking-[0.3em]">
          <span lang="ja">仕事</span> · WORKS · [{String(projects.length).padStart(2, "0")} calling cards]
        </p>
        <h1
          className="font-display text-fg leading-[0.9]"
          style={{ fontSize: "var(--text-hero)" }}
        >
          <span className="text-red">SELECTED</span>{" "}
          <span className="text-fg">WORKS</span>
        </h1>
        <p className="font-mono text-ui text-muted max-w-prose">
          // tap a card to open · esc or click outside to close
        </p>
      </header>

      <CallingCards />
    </section>
  )
}
