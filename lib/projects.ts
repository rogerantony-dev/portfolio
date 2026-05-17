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
    id: "recollect",
    number: "#001",
    title: "RECOLLECT",
    subtitle: "Bookmark manager for the modern web",
    description:
      "A bookmark app that turns saved links into something you actually revisit — tags, search, and a focused reading view. I joined as one of the developers during my time at Timeless and shipped features across the product.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Supabase"],
    category: "web",
    status: "shipped",
    accent: "red",
    year: "2024",
    links: {
      live: "https://recollect.so",
    },
  },
  {
    id: "timeless-co",
    number: "#002",
    title: "TIMELESS.CO",
    subtitle: "Marketing site for Timeless",
    description:
      "The marketing site for Timeless — designed and built end-to-end. Focused on fast loads, crisp type, and motion that supports the story instead of fighting it.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    category: "web",
    status: "shipped",
    accent: "amber",
    year: "2024",
    links: {
      live: "https://timeless.co",
    },
  },
  {
    id: "edu-hub",
    number: "#003",
    title: "EDU HUB",
    subtitle: "Mobile study companion for students",
    description:
      "A mobile platform where students share notes and question papers, vote on the best ones, and save favourites. An AI layer reads the archive and surfaces high-priority, frequently repeated questions so you study what actually shows up. Data models and auth ride on Firebase.",
    stack: ["Flutter", "Firebase", "Gemini"],
    category: "tools",
    status: "shipped",
    accent: "cyan",
    year: "2024",
    links: {
      repo: "https://github.com/rogerantony-dev/my_college_guide",
    },
  },
  {
    id: "wersute",
    number: "#004",
    title: "WERSUTE",
    subtitle: "Full-stack product, built from scratch",
    description:
      "Designed and built end-to-end, onboarding 300–400 users in the first month. Real-time chat, secure payment flows, and a REST API back a React frontend powered by a Django + DRF backend.",
    stack: ["React", "Django", "Django REST Framework"],
    category: "web",
    status: "shipped",
    accent: "yellow",
    year: "2023",
    links: {
      live: "https://wersute.com",
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
