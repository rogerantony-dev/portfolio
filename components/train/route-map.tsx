"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRef, type KeyboardEvent } from "react"
import { motion, useReducedMotion } from "motion/react"
import clsx from "clsx"
import { stations, getStationByPath } from "./stations"
import { TrainGraphic } from "./train-graphic"

export function RouteMap() {
  const pathname = usePathname()
  const active = getStationByPath(pathname) ?? stations[0]
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([])
  const reducedMotion = useReducedMotion() === true

  // Position of the train along the rail. Dots live in a 6-column grid
  // (one cell per station), so dot i's center is at (i + 0.5) / 6 of
  // the container width. The outer wrapper transitions its `left`
  // value smoothly; an inner translateX(-50%) keeps the train centered
  // on the dot regardless of train width.
  const trainLeftPct = ((active.order + 0.5) / stations.length) * 100

  function handleKeyDown(e: KeyboardEvent<HTMLAnchorElement>, index: number) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return
    e.preventDefault()
    const next = e.key === "ArrowLeft" ? index - 1 : index + 1
    const clamped = Math.max(0, Math.min(stations.length - 1, next))
    linksRef.current[clamped]?.focus()
  }

  return (
    <nav
      aria-label="Velvet Line stations"
      className="fixed bottom-0 inset-x-0 border-t border-line bg-void/85 backdrop-blur-sm"
      style={{ zIndex: "var(--z-routemap)" }}
    >
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 py-4 md:pt-20 md:pb-5">
        {/* ── Rail + dots row ── */}
        <div className="relative">
          {/* Amber rail behind the dots */}
          <span
            aria-hidden="true"
            className="absolute top-1/2 -translate-y-1/2 h-px bg-amber/30 pointer-events-none"
            style={{
              left: `${(0.5 / stations.length) * 100}%`,
              right: `${(0.5 / stations.length) * 100}%`,
            }}
          />

          {/* The Velvet Line train — persistent element, slides
              smoothly via CSS `left` transition. Hidden below md. */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute pointer-events-none"
            style={{
              top: "-3.25rem",
              left: `${trainLeftPct}%`,
              transition:
                "left 700ms cubic-bezier(0.65, 0, 0.35, 1)",
            }}
          >
            <div style={{ transform: "translateX(-50%)" }}>
              <motion.div
                animate={reducedMotion ? undefined : { y: [0, -1.5, 0] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <TrainGraphic />
              </motion.div>
            </div>
          </div>

          {/* Dots — equal-width grid keeps positions predictable */}
          <ul className="grid grid-cols-6 items-center">
            {stations.map((station, i) => {
              const isActive = station.id === active.id
              return (
                <li key={station.id} className="grid place-items-center">
                  <Link
                    href={station.href}
                    ref={(el) => {
                      linksRef.current[i] = el
                    }}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    aria-current={isActive ? "page" : undefined}
                    className={clsx(
                      "group relative grid place-items-center min-h-11 min-w-11",
                      "outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-void rounded-full"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={clsx(
                        "block rounded-full transition-all duration-150",
                        isActive
                          ? "size-3.5 bg-amber shadow-[0_0_14px_3px_rgba(245,184,46,0.45)]"
                          : "size-2.5 bg-line group-hover:bg-red group-hover:size-3 group-hover:shadow-[0_0_10px_2px_rgba(230,0,18,0.5)]"
                      )}
                    />
                    <span className="sr-only">
                      {station.label} ({station.kanji})
                    </span>
                    {/* Tooltip */}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap text-micro bg-elevated border border-line text-fg px-2 py-1 rounded opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity pointer-events-none"
                    >
                      <span lang="ja">{station.kanji}</span> · {station.label}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* ── ARRIVING text — below the dots, centered ── */}
        <div className="mt-3 flex items-center justify-center gap-3 font-mono text-ui">
          <span aria-hidden="true" className="text-amber">
            ▸
          </span>
          <span className="text-muted">ARRIVING:</span>
          <span lang="ja" className="text-fg">
            {active.kanji}
          </span>
          <span aria-hidden="true" className="text-amber">
            /
          </span>
          <span className="text-fg">{active.label}</span>
        </div>
      </div>
    </nav>
  )
}
