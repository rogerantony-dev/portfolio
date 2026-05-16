// ┌──────────────────────────────────────────────────────────────────┐
// │  Your projects, displayed as P5 calling cards on /works.         │
// │  Add/remove entries. Order in this array = display order.        │
// │  Card variant (slash direction) auto-alternates for visual rhythm.│
// └──────────────────────────────────────────────────────────────────┘

export type ProjectCategory = "web" | "games" | "tools" | "design"
export type ProjectStatus = "shipped" | "wip" | "archived"
export type ProjectAccent = "red" | "amber" | "cyan" | "yellow"

export type Project = {
  readonly id: string
  readonly number: string
  readonly title: string
  readonly subtitle: string
  readonly description: string
  readonly stack: readonly string[]
  readonly category: ProjectCategory
  readonly status: ProjectStatus
  readonly accent: ProjectAccent
  readonly year: string
  readonly links: {
    readonly live?: string
    readonly repo?: string
  }
}

export const projects: readonly Project[] = [
  {
    id: "velvet-line",
    number: "#001",
    title: "VELVET LINE",
    subtitle: "This site",
    description:
      "A Persona-5-themed portfolio framed as a metro line. Each section is a station; transitions are the train moving along the rail. Built entirely as an exercise in design fidelity and motion craft.",
    stack: ["Next.js 16", "TypeScript", "Tailwind v4", "Motion", "Vercel"],
    category: "web",
    status: "wip",
    accent: "red",
    year: "2026",
    links: {
      repo: "https://github.com/rogerantony-dev/portfolio",
    },
  },
  {
    id: "pixel-garden",
    number: "#002",
    title: "PIXEL GARDEN",
    subtitle: "Grid-based pixel art editor",
    description:
      "A web-based pixel art canvas with infinite undo, palette presets, and one-click GIF export. Built to learn HTML canvas and explore minimal toolbar design.",
    stack: ["React", "Canvas API", "Zustand", "gif.js"],
    category: "tools",
    status: "shipped",
    accent: "cyan",
    year: "2025",
    links: {
      live: "https://example.com/pixel-garden",
      repo: "https://github.com/your-handle/pixel-garden",
    },
  },
  {
    id: "auto-caption",
    number: "#003",
    title: "AUTO-CAPTION BOT",
    subtitle: "Discord bot, Vision API powered",
    description:
      "A Discord bot that watches a channel and adds witty captions to posted images using OpenAI's vision model. Used daily by ~120 people in a hobby server.",
    stack: ["Python", "discord.py", "OpenAI", "Fly.io"],
    category: "tools",
    status: "shipped",
    accent: "amber",
    year: "2025",
    links: {
      repo: "https://github.com/your-handle/auto-caption",
    },
  },
  {
    id: "mini-synth",
    number: "#004",
    title: "MINI SYNTH",
    subtitle: "Web modular synthesizer",
    description:
      "Five oscillators, three filters, a delay, and a reverb — drag-and-connect modular synth in the browser. Shipped, then archived once I learned what I wanted from it.",
    stack: ["WebAudio", "React", "TypeScript", "rete.js"],
    category: "web",
    status: "archived",
    accent: "yellow",
    year: "2024",
    links: {
      repo: "https://github.com/your-handle/mini-synth",
    },
  },
] as const

export const categoryLabels: Record<ProjectCategory, string> = {
  web: "WEB",
  games: "GAMES",
  tools: "TOOLS",
  design: "DESIGN",
}

export const statusLabels: Record<ProjectStatus, string> = {
  shipped: "▸ SHIPPED",
  wip: "◆ WIP",
  archived: "× ARCHIVED",
}
