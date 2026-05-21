import { profile } from "@/lib/profile"
import { SkillBar } from "./skill-bar"

export function TrainerCard() {
  return (
    <section
      aria-labelledby="trainer-card-heading"
      className="border-2 border-red/70 bg-elevated/70 backdrop-blur-[1px] relative"
      style={{
        boxShadow:
          "8px 8px 0 0 var(--color-p5-black), inset 0 0 0 1px rgba(245,184,46,0.15)",
      }}
    >
      {/* Tab header */}
      <div className="absolute -top-3 left-4 bg-red text-bone px-3 py-0.5 font-mono text-micro tracking-[0.3em]">
        TRAINER CARD
      </div>

      <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:grid sm:grid-cols-[auto_1fr] sm:gap-6 items-start">
        {/* Avatar */}
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-red flex items-center justify-center font-display text-bone select-none text-[2.75rem] sm:text-[3.5rem]"
          style={{
            boxShadow: "4px 4px 0 0 var(--color-p5-black)",
          }}
          aria-hidden="true"
        >
          <span lang="ja">現</span>
        </div>

        {/* Identity */}
        <div className="font-mono text-ui min-w-0 w-full">
          <h2
            id="trainer-card-heading"
            className="font-display text-fg leading-none break-words text-[1.625rem] sm:text-[1.875rem] md:text-[2.25rem]"
          >
            {profile.name}
          </h2>
          <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-muted">
            <dt className="text-amber">callsign</dt>
            <dd className="text-fg">{profile.callsign}</dd>
            <dt className="text-amber">role</dt>
            <dd className="text-fg">{profile.role}</dd>
            <dt className="text-amber">location</dt>
            <dd className="text-fg">{profile.location}</dd>
          </dl>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-line/40 mx-4 sm:mx-6 md:mx-8" />

      {/* Skills */}
      <div className="p-4 sm:p-6 md:p-8 space-y-2.5">
        {profile.skills.map((skill) => (
          <SkillBar key={skill.name} skill={skill} />
        ))}
      </div>

      {/* Bio quote */}
      <div className="border-t border-line/40 mx-4 sm:mx-6 md:mx-8" />
      <p className="p-4 sm:p-6 md:p-8 font-mono text-ui text-muted italic">
        “{profile.bio}”
      </p>
    </section>
  )
}
