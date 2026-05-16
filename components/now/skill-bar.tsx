import clsx from "clsx"
import type { Skill, SkillColor } from "@/lib/profile"

const fillByColor: Record<SkillColor, string> = {
  red: "bg-red shadow-[0_0_8px_rgba(230,0,18,0.55)]",
  amber: "bg-amber shadow-[0_0_8px_rgba(245,184,46,0.55)]",
  cyan: "bg-cyan shadow-[0_0_8px_rgba(91,192,235,0.5)]",
  yellow: "bg-yellow shadow-[0_0_10px_rgba(255,213,0,0.55)]",
}

const SEGMENTS = 10

export function SkillBar({ skill }: { skill: Skill }) {
  const filled = Math.round((skill.level / 100) * SEGMENTS)
  return (
    <div className="flex items-center gap-3 font-mono text-ui">
      <span className="text-muted w-28 shrink-0 uppercase tracking-wider">
        {skill.name}
      </span>
      <div
        className="flex gap-[3px]"
        role="progressbar"
        aria-label={`${skill.name} skill level`}
        aria-valuenow={skill.level}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {Array.from({ length: SEGMENTS }).map((_, i) => (
          <span
            key={i}
            className={clsx(
              "block w-3 h-3 border border-line/40",
              i < filled ? fillByColor[skill.color] : "bg-elevated/60"
            )}
          />
        ))}
      </div>
      <span className="text-fg w-8 text-right tabular-nums">{skill.level}</span>
    </div>
  )
}
