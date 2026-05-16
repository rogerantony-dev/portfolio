"use client"

import { useState, useRef, useEffect, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import clsx from "clsx"
import { profile } from "@/lib/profile"
import { stations } from "@/components/train/stations"

type LineKind = "prompt" | "output" | "error" | "system"

type Line = {
  readonly id: number
  readonly kind: LineKind
  readonly text: string
}

const HELP_TEXT = `available commands:
  whoami       — who is this person
  skills       — stat block
  socials      — contact links
  cv           — download CV
  goto <stop>  — board the train to a station
  stations     — list available stops
  joke         — programmer wisdom
  clear        — clear the terminal
  help, ?      — show this help`

const JOKES = [
  "there are 10 kinds of people in this world: those who understand binary and those who don't.",
  "why do programmers prefer dark mode? because light attracts bugs.",
  "i would tell you a UDP joke, but you might not get it.",
  "a SQL query walks into a bar, walks up to two tables and asks, 'can i join you?'",
  "to understand recursion, you must first understand recursion.",
  "real programmers count from 0.",
] as const

const BOOT_LINES: readonly Pick<Line, "kind" | "text">[] = [
  { kind: "system", text: "velvet-line terminal · v1.0" },
  { kind: "system", text: "type 'help' or '?' to see commands" },
  { kind: "system", text: "" },
]

export function Terminal() {
  const [lines, setLines] = useState<Line[]>(
    BOOT_LINES.map((l, i) => ({ ...l, id: i }))
  )
  const [input, setInput] = useState("")
  const nextIdRef = useRef(BOOT_LINES.length)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()

  // Auto-scroll to bottom on new lines
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [lines])

  const push = (kind: LineKind, text: string) => {
    const id = nextIdRef.current++
    setLines((prev) => [...prev, { id, kind, text }])
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const raw = input.trim()
    if (!raw) return

    // Echo the prompt
    push("prompt", raw)
    setInput("")

    const [cmd, ...rest] = raw.toLowerCase().split(/\s+/)
    const arg = rest.join(" ")

    switch (cmd) {
      case "whoami": {
        push("output", profile.name.toUpperCase())
        push("output", `> ${profile.role}`)
        push("output", `> ${profile.bio}`)
        break
      }
      case "skills": {
        for (const skill of profile.skills) {
          const bars = "█".repeat(Math.round(skill.level / 10)).padEnd(10, "░")
          push("output", `${skill.name.padEnd(12)} ${bars} ${skill.level}%`)
        }
        break
      }
      case "socials": {
        push("output", `email     ${profile.socials.email}`)
        push("output", `github    ${profile.socials.github}`)
        push("output", `linkedin  ${profile.socials.linkedin}`)
        push("output", `twitter   ${profile.socials.twitter}`)
        break
      }
      case "cv": {
        push("output", "fetching CV...")
        push("output", `→ ${profile.cvUrl}`)
        window.open(profile.cvUrl, "_blank")
        break
      }
      case "goto": {
        const station = stations.find(
          (s) =>
            s.id === arg ||
            s.label.toLowerCase() === arg ||
            s.kanji === arg
        )
        if (!station) {
          push(
            "error",
            `unknown station: '${arg}'. try 'stations' to see the line.`
          )
          break
        }
        push("output", `boarding train to ${station.label}...`)
        setTimeout(() => router.push(station.href), 400)
        break
      }
      case "stations": {
        for (const s of stations) {
          push("output", `${s.kanji.padEnd(4)} · ${s.label.padEnd(8)} → ${s.href}`)
        }
        break
      }
      case "joke": {
        const joke = JOKES[Math.floor(Math.random() * JOKES.length)]!
        push("output", joke)
        break
      }
      case "clear": {
        nextIdRef.current = 0
        setLines([])
        break
      }
      case "help":
      case "?": {
        for (const line of HELP_TEXT.split("\n")) push("output", line)
        break
      }
      default: {
        push("error", `command not found: ${cmd}. try 'help' or '?'`)
      }
    }
  }

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.focus()}
      className="block w-full text-left border-2 border-line bg-ink relative cursor-text focus-within:border-cyan/60 transition-colors"
      style={{ boxShadow: "6px 6px 0 0 var(--color-p5-black)" }}
      aria-label="Velvet Line terminal — click to focus"
    >
      {/* Window chrome */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-line/60 bg-elevated/40 font-mono text-micro">
        <div className="flex items-center gap-2 text-muted">
          <span className="text-red">●</span>
          <span className="text-amber">●</span>
          <span className="text-cyan">●</span>
          <span className="ml-3">~/velvet-line/lab</span>
        </div>
        <span className="text-muted">ZSH</span>
      </div>

      {/* Output area */}
      <div
        ref={scrollRef}
        className="h-80 md:h-96 overflow-y-auto p-4 font-mono text-ui leading-relaxed scroll-smooth"
      >
        {lines.map((line) => (
          <pre
            key={line.id}
            className={clsx(
              "whitespace-pre-wrap break-words",
              line.kind === "prompt" && "text-fg",
              line.kind === "output" && "text-cyan/90",
              line.kind === "error" && "text-red",
              line.kind === "system" && "text-muted italic"
            )}
          >
            {line.kind === "prompt" && (
              <span className="text-amber">▸ </span>
            )}
            {line.text}
          </pre>
        ))}

        {/* Live input prompt */}
        <form onSubmit={handleSubmit} className="flex items-center mt-1">
          <span className="text-amber font-mono" aria-hidden="true">
            ▸&nbsp;
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            aria-label="terminal input"
            className="flex-1 bg-transparent border-0 outline-none font-mono text-ui text-fg caret-amber"
          />
        </form>
      </div>
    </button>
  )
}
