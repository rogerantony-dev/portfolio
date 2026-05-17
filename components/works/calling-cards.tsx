"use client"

import { useCallback, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { cn } from "@/lib/utils"
import { dur, ease } from "@/lib/motion"
import {
  projects,
  categoryLabels,
  statusLabels,
  type Project,
  type ProjectAccent,
} from "@/lib/projects"

// ── Module-scope motion variants (hoist per react-best-practices) ──
const backdropMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} as const

const popupMotionFull = {
  initial: { opacity: 0, scale: 0.96, y: 8 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.97, y: 4 },
} as const

const popupMotionReduced = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} as const

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
  const reduceMotion = useReducedMotion() === true
  const popupMotion = reduceMotion ? popupMotionReduced : popupMotionFull
  const motionTransition = { duration: dur.fast, ease: ease.snap }

  const close = useCallback(() => setActiveId(null), [])

  return (
    <DialogPrimitive.Root
      open={!!active}
      onOpenChange={(open) => {
        if (!open) close()
      }}
      modal={true}
    >
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
        {projects.map((project, i) => {
          const clipPath = clipPaths[i % clipPaths.length]
          return (
            <li key={project.id}>
              <DialogPrimitive.Trigger
                type="button"
                onClick={() => setActiveId(project.id)}
                data-testid={`project-card-${project.id}`}
                className={cn(
                  "group block w-full text-left bg-elevated/70 border-2 p-5 md:p-6 relative overflow-hidden cursor-pointer",
                  "transition-transform hover:-translate-y-0.5 hover:translate-x-0.5 focus-visible:-translate-y-0.5",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-void",
                  "shadow-[6px_6px_0_0_var(--color-p5-black)]",
                  accentBorder[project.accent],
                )}
                style={{ clipPath }}
              >
                {/* Red slash sweep on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-red opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
                />
                <CardFace project={project} />
              </DialogPrimitive.Trigger>
            </li>
          )
        })}
      </ul>

      {/* Portal stays mounted; AnimatePresence + conditional inside it. */}
      <DialogPrimitive.Portal keepMounted>
        <AnimatePresence>
          {active && (
            <>
              <DialogPrimitive.Backdrop
                data-slot="dialog-overlay"
                render={
                  <motion.div
                    {...backdropMotion}
                    transition={motionTransition}
                  />
                }
                className="fixed inset-0 bg-void/85 backdrop-blur-md grid place-items-center p-4 md:p-12 cursor-pointer"
                style={{ zIndex: "var(--z-modal)" }}
              />
              <DialogPrimitive.Popup
                data-slot="dialog-content"
                data-testid="project-dialog"
                render={
                  <motion.div {...popupMotion} transition={motionTransition} />
                }
                className={cn(
                  "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                  "w-full max-w-3xl bg-elevated border-2 p-6 md:p-10 max-h-[85vh] overflow-y-auto cursor-default",
                  "shadow-[10px_10px_0_0_var(--color-p5-black)]",
                  accentBorder[active.accent],
                )}
                style={{
                  clipPath: clipPaths[0],
                  zIndex: "var(--z-modal)",
                }}
              >
                {/* Close */}
                <DialogPrimitive.Close
                  className="absolute top-4 right-6 font-mono text-ui text-muted hover:text-red transition-colors cursor-pointer"
                  aria-label="Close project detail"
                >
                  ✕ CLOSE
                </DialogPrimitive.Close>

                {/* Title (aria-labelledby auto-wired by Base UI) */}
                <DialogPrimitive.Title
                  className="font-display text-fg leading-none mb-3"
                  style={{ fontSize: "var(--text-hero)" }}
                >
                  {active.title}
                </DialogPrimitive.Title>

                <CardFace project={active} expanded />

                {/* Description (aria-describedby auto-wired by Base UI) */}
                <div className="mt-6 space-y-4">
                  <DialogPrimitive.Description
                    render={
                      <p className="font-sans text-fg leading-relaxed" />
                    }
                  >
                    {active.description}
                  </DialogPrimitive.Description>

                  {/* Links */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    {active.links.live && (
                      <a
                        href={active.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "inline-flex items-center gap-2 font-mono text-ui px-4 py-2 text-void hover:opacity-80 transition-opacity",
                          "shadow-[3px_3px_0_0_var(--color-p5-black)]",
                          accentBg[active.accent],
                        )}
                      >
                        ▸ LIVE
                      </a>
                    )}
                    {active.links.repo && (
                      <a
                        href={active.links.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-ui px-4 py-2 border border-line text-fg hover:border-amber hover:text-amber transition-colors"
                      >
                        ▸ SOURCE
                      </a>
                    )}
                  </div>
                </div>
              </DialogPrimitive.Popup>
            </>
          )}
        </AnimatePresence>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
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
        <span className={cn(accentText[project.accent], "tracking-widest")}>
          {project.number}
        </span>
        <span className="text-muted text-micro">
          {categoryLabels[project.category]} · {project.year}
        </span>
      </div>

      {!expanded && (
        <h3
          className="font-display text-fg leading-none"
          style={{ fontSize: "var(--text-h2)" }}
        >
          {project.title}
        </h3>
      )}

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
          className={cn(
            "tracking-widest",
            project.status === "shipped" && "text-cyan",
            project.status === "wip" && "text-amber",
            project.status === "archived" && "text-muted",
          )}
        >
          {statusLabels[project.status]}
        </span>
        {!expanded && (
          <span className={cn(accentText[project.accent], "tracking-wider")}>
            ▸ VIEW
          </span>
        )}
      </div>
    </div>
  )
}
