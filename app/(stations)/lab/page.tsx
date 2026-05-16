import { Terminal } from "@/components/lab/terminal"

export default function LabPage() {
  return (
    <section className="grid gap-8">
      <header className="space-y-3">
        <p className="font-mono text-ui text-amber tracking-[0.3em]">
          <span lang="ja">実験</span> · LAB · interactive experiments
        </p>
        <h1
          className="font-display text-fg leading-[0.9]"
          style={{ fontSize: "var(--text-hero)" }}
        >
          <span className="text-red">PLAY</span>{" "}
          <span className="text-fg">AROUND</span>
        </h1>
        <p className="font-mono text-ui text-muted max-w-prose">
          // small things that move. click anywhere in the terminal below to focus.
          <br />
          // try <span className="text-fg">whoami</span>,{" "}
          <span className="text-fg">skills</span>,{" "}
          <span className="text-fg">goto works</span>, or{" "}
          <span className="text-fg">help</span>
        </p>
      </header>

      <Terminal />

      <p className="font-mono text-micro text-muted">
        // more demos arriving — sketches, canvas toys, three.js scenes
      </p>
    </section>
  )
}
