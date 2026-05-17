import Link from "next/link"
import { profile } from "@/lib/profile"
import { TrainerCard } from "@/components/now/trainer-card"
import { TypingText } from "@/components/now/typing-text"
import { Button } from "@/components/ui/button"

export default function NowPage() {
  return (
    <section className="grid gap-12 md:gap-16">
      {/* Hero */}
      <header className="space-y-4">
        <p className="font-mono text-ui text-amber tracking-[0.3em]">
          <span lang="ja">現在地</span> · NOW
        </p>
        <h1
          className="font-display text-fg leading-[0.9]"
          style={{ fontSize: "var(--text-display)" }}
        >
          <TypingText
            text={`> hello, ${profile.name.toLowerCase()}_`}
            cursor={false}
            charDelay={0.05}
            startDelay={0.3}
            className="block font-mono text-red text-ui md:text-h2 leading-none mb-4 tracking-tight"
          />
          <span className="block">
            <span className="text-red">{profile.name.split(" ")[0]}</span>{" "}
            <span className="text-fg">
              {profile.name.split(" ").slice(1).join(" ") || "."}
            </span>
          </span>
        </h1>
        <p className="font-mono text-ui text-muted max-w-prose">
          {profile.role} <span className="text-line">·</span> {profile.tagline}
        </p>
      </header>

      {/* Trainer card */}
      <TrainerCard />

      {/* CTA — board the train to WORKS */}
      <div className="flex flex-wrap items-center gap-4">
        <Button
          variant="pa-amber"
          size="lg-pa"
          nativeButton={false}
          render={
            <Link href="/works" className="group gap-3">
              <span className="font-display tracking-wider normal-case">
                BOARD NEXT TRAIN
              </span>
              <span className="transition-transform group-hover:translate-x-1">
                ▸▸
              </span>
            </Link>
          }
        />
        <p className="font-mono text-micro text-muted">
          // next stop: <span lang="ja">仕事</span> / WORKS
        </p>
      </div>
    </section>
  )
}
