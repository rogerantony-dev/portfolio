"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRef, type KeyboardEvent } from "react"
import { motion, useReducedMotion } from "motion/react"
import clsx from "clsx"
import { dur, ease } from "@/lib/motion"
import { stations, getStationByPath } from "./stations"
import { TrainGraphic } from "./train-graphic"

export function RouteMap() {
  const pathname = usePathname()
  const active = getStationByPath(pathname) ?? stations[0]
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([])
  const reducedMotion = useReducedMotion() === true

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
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 py-4 md:py-5">
        <div className="flex items-center justify-between gap-4 font-mono text-ui">
          <div className="hidden md:flex items-center gap-3 shrink-0">
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

          <div
            className="relative flex items-center md:gap-0 overflow-x-auto md:overflow-visible scroll-px-6 grow md:grow-0"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {/* Amber rail behind the dots */}
            <span
              aria-hidden="true"
              className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-px bg-amber/30 pointer-events-none"
            />
            <ul className="flex items-center justify-between md:justify-end gap-8 md:gap-10 mx-auto md:mx-0 relative w-full md:w-auto px-2">
              {stations.map((station, i) => {
                const isActive = station.id === active.id
                return (
                  <li
                    key={station.id}
                    style={{ scrollSnapAlign: "center" }}
                    className="relative shrink-0"
                  >
                    {/* The Velvet Line train — sits above the active dot
                        and animates between stations via shared layoutId.
                        Gentle idle bob unless reduced motion is preferred. */}
                    {isActive && (
                      <motion.div
                        layoutId="velvet-line-train"
                        animate={
                          reducedMotion ? undefined : { y: [0, -1.5, 0] }
                        }
                        transition={{
                          layout: { duration: dur.normal, ease: ease.train },
                          y: {
                            duration: 2.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        }}
                        className="hidden md:block absolute left-1/2 pointer-events-none"
                        style={{ top: "-4.25rem", x: "-50%" }}
                      >
                        <TrainGraphic />
                      </motion.div>
                    )}
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
                        className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-micro bg-elevated border border-line text-fg px-2 py-1 rounded opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity pointer-events-none"
                      >
                        <span lang="ja">{station.kanji}</span> · {station.label}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
