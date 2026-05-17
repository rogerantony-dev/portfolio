"use client"

import { useState, useEffect, useCallback } from "react"
import { AnimatePresence, motion } from "motion/react"
import clsx from "clsx"
import { dur, ease } from "@/lib/motion"
import {
  projects,
  categoryLabels,
  statusLabels,
  type Project,
  type ProjectAccent,
} from "@/lib/projects"

const accentBorder: Record<ProjectAccent, string> = {
  red: "border-red",
  amber: "border-amber",
  cyan: "border-cyan",
  yellow: "border-yellow",
}

const accentText: Record<ProjectAccent, string> = {
  red: "text-red",
  amber: "text-amber",
  cyan: "text-cyan",
  yellow: "text-yellow",
}

const accentBg: Record<ProjectAccent, string> = {
  red: "bg-red",
  amber: "bg-amber",
  cyan: "bg-cyan",
  yellow: "bg-yellow",
}

// Alternating angled clip-paths give the grid P5-style visual rhythm.
const clipPaths = [
  "polygon(0 0, 100% 0, 100% 92%, 90% 100%, 0 100%)", // bottom-right cut
  "polygon(10% 0, 100% 0, 100% 100%, 0 100%, 0 8%)", // top-left cut
] as const

export function CallingCards() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const active = projects.find((p) => p.id === activeId)

  const close = useCallback(() => setActiveId(null), [])

  // Lock body scroll while a card is open + close on Escape.
  useEffect(() => {
    if (!activeId) return
    const original = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = original
      document.removeEventListener("keydown", onKey)
    }
  }, [activeId, close])

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
        {projects.map((project, i) => {
          const clipPath = clipPaths[i % clipPaths.length]
          return (
            <li key={project.id}>
              <button
                type="button"
                onClick={() => setActiveId(project.id)}
                className={clsx(
                  "group block w-full text-left bg-elevated/70 border-2 p-5 md:p-6 relative overflow-hidden cursor-pointer",
                  "transition-transform hover:-translate-y-0.5 hover:translate-x-0.5 focus-visible:-translate-y-0.5",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-void",
                  accentBorder[project.accent]
                )}
                style={{
                  clipPath,
                  boxShadow: "6px 6px 0 0 var(--color-p5-black)",
                }}
              >
                {/* Red slash sweep on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-red opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
                />

                <CardFace project={project} />
              </button>
            </li>
          )
        })}
      </ul>

      {/* Detail overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: dur.fast, ease: ease.snap }}
            className="fixed inset-0 bg-void/85 backdrop-blur-md grid place-items-center p-4 md:p-12 cursor-pointer"
            style={{ zIndex: 70 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`card-${active.id}-title`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 4 }}
              transition={{ duration: dur.fast, ease: ease.snap }}
              onClick={(e) => e.stopPropagation()}
              className={clsx(
                "relative w-full max-w-3xl bg-elevated border-2 p-6 md:p-10 max-h-[85vh] overflow-y-auto cursor-default",
                accentBorder[active.accent]
              )}
              style={{
                clipPath: clipPaths[0],
                boxShadow: "10px 10px 0 0 var(--color-p5-black)",
              }}
            >
              {/* Close */}
              <button
                type="button"
                onClick={close}
                className="absolute top-4 right-6 font-mono text-ui text-muted hover:text-red transition-colors cursor-pointer"
                aria-label="Close project detail"
              >
                ✕ CLOSE
              </button>

              <CardFace project={active} expanded />

              {/* Description */}
              <div className="mt-6 space-y-4">
                <p className="font-sans text-fg leading-relaxed">
                  {active.description}
                </p>

                {/* Links */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {active.links.live && (
                    <a
                      href={active.links.live}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={clsx(
                        "inline-flex items-center gap-2 font-mono text-ui px-4 py-2 text-void hover:opacity-80 transition-opacity",
                        accentBg[active.accent]
                      )}
                      style={{ boxShadow: "3px 3px 0 0 var(--color-p5-black)" }}
                    >
                      ▸ LIVE DEMO
                    </a>
                  )}
                  {active.links.repo && (
                    <a
                      href={active.links.repo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 font-mono text-ui px-4 py-2 border border-line text-fg hover:border-amber hover:text-amber transition-colors"
                    >
                      ▸ SOURCE
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function CardFace({
  project,
  expanded = false,
}: {
  project: Project
  expanded?: boolean
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-2 font-mono text-ui">
        <span className={clsx(accentText[project.accent], "tracking-widest")}>
          {project.number}
        </span>
        <span className="text-muted text-micro">
          {categoryLabels[project.category]} · {project.year}
        </span>
      </div>

      <h3
        id={expanded ? `card-${project.id}-title` : undefined}
        className="font-display text-fg leading-none"
        style={{
          fontSize: expanded ? "var(--text-hero)" : "var(--text-h2)",
        }}
      >
        {project.title}
      </h3>

      <p className="font-mono text-ui text-muted">{project.subtitle}</p>

      <div className="flex flex-wrap gap-1.5 pt-1">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="font-mono text-micro px-2 py-0.5 border border-line/60 text-fg"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 font-mono text-micro">
        <span
          className={clsx(
            "tracking-widest",
            project.status === "shipped" && "text-cyan",
            project.status === "wip" && "text-amber",
            project.status === "archived" && "text-muted"
          )}
        >
          {statusLabels[project.status]}
        </span>
        {!expanded && (
          <span className={clsx(accentText[project.accent], "tracking-wider")}>
            ▸ VIEW
          </span>
        )}
      </div>
    </div>
  )
}
