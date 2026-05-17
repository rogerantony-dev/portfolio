import { profile } from "@/lib/profile"
import { Button } from "@/components/ui/button"

type ContactLink = {
  label: string
  value: string
  href: string
  external?: boolean
}

const contacts: ContactLink[] = [
  {
    label: "EMAIL",
    value: profile.socials.email,
    href: `mailto:${profile.socials.email}`,
  },
  {
    label: "GITHUB",
    value: profile.socials.github.replace(/^https?:\/\//, ""),
    href: profile.socials.github,
    external: true,
  },
  {
    label: "LINKEDIN",
    value: profile.socials.linkedin.replace(/^https?:\/\//, ""),
    href: profile.socials.linkedin,
    external: true,
  },
  {
    label: "TWITTER",
    value: profile.socials.twitter.replace(/^https?:\/\//, ""),
    href: profile.socials.twitter,
    external: true,
  },
]

export default function ContactPage() {
  return (
    <section className="grid gap-10">
      {/* Header */}
      <header className="space-y-3">
        <p className="font-mono text-ui text-amber tracking-[0.3em]">
          <span lang="ja">連絡</span> · CONTACT ·{" "}
          <span lang="ja">終点</span> / TERMINUS
        </p>
        <h1
          className="font-display text-fg leading-[0.9]"
          style={{ fontSize: "var(--text-hero)" }}
        >
          <span className="text-red">END OF</span>{" "}
          <span className="text-fg">THE LINE</span>
        </h1>
        <p className="font-mono text-ui text-muted max-w-prose">
          // platform announcement: this train terminates here. let&apos;s talk.
        </p>
      </header>

      {/* Contact list */}
      <ul className="grid sm:grid-cols-2 gap-3 max-w-2xl">
        {contacts.map((c) => (
          <li key={c.label}>
            <a
              href={c.href}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noopener noreferrer" : undefined}
              className="group block border border-line/60 bg-elevated/40 px-5 py-4 hover:border-amber hover:bg-elevated transition-colors"
            >
              <p className="font-mono text-micro text-amber tracking-[0.3em]">
                ▸ {c.label}
              </p>
              <p className="font-mono text-fg text-ui mt-1 truncate group-hover:text-amber transition-colors">
                {c.value}
              </p>
            </a>
          </li>
        ))}
      </ul>

      {/* CV Download */}
      <div className="flex flex-wrap items-center gap-4">
        <Button
          variant="pa-yellow"
          size="lg-pa"
          nativeButton={false}
          render={
            <a href={profile.cvUrl} download className="gap-3">
              <span aria-hidden="true">⬇</span>
              <span className="font-display tracking-wider normal-case">
                DOWNLOAD CV
              </span>
            </a>
          }
        />
      </div>
    </section>
  )
}
