import { MangaPanels } from "@/components/rumors/manga-panels"
import { posts } from "@/lib/posts"

export default function RumorsPage() {
  return (
    <section className="grid gap-10">
      <header className="space-y-3">
        <p className="font-mono text-ui text-amber tracking-[0.3em]">
          <span lang="ja">噂</span> · RUMORS · [{String(posts.length).padStart(2, "0")} articles]
        </p>
        <h1
          className="font-display text-fg leading-[0.9]"
          style={{ fontSize: "var(--text-hero)" }}
        >
          <span className="text-red">RUMORS FROM</span>{" "}
          <span className="text-fg">MEMENTOS</span>
        </h1>
        <p className="font-mono text-ui text-muted max-w-prose">
          // notes, essays, devlogs — anything worth writing down
        </p>
      </header>

      <MangaPanels posts={posts} />
    </section>
  )
}
