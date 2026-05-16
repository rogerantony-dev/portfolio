// ┌──────────────────────────────────────────────────────────────────┐
// │  Blog posts on /rumors. Replace these placeholders, or migrate   │
// │  to MDX when you want full markdown authoring (see roadmap).     │
// │                                                                  │
// │  panelSize controls the manga-grid cell:                         │
// │    large  = 2 cols × 2 rows (feature)                            │
// │    medium = 2 cols × 1 row  (banner)                             │
// │    small  = 1 col  × 1 row  (regular)                            │
// └──────────────────────────────────────────────────────────────────┘

export type PanelSize = "large" | "medium" | "small"

export type Post = {
  readonly slug: string
  readonly title: string
  readonly date: string // ISO
  readonly excerpt: string
  readonly tags: readonly string[]
  readonly cover: string // emoji / kanji as placeholder
  readonly panelSize: PanelSize
  readonly rotate: number // small angle for hand-pinned feel
  readonly readingMins: number
}

export const posts: readonly Post[] = [
  {
    slug: "building-the-velvet-line",
    title: "Building the Velvet Line",
    date: "2026-05-16",
    excerpt:
      "How a Tokyo-metro metaphor + Persona 5's UI language collapsed into one portfolio architecture — and what I learned wiring up the carriage frame.",
    tags: ["design", "nextjs", "motion"],
    cover: "🚂",
    panelSize: "large",
    rotate: -1.5,
    readingMins: 7,
  },
  {
    slug: "notes-on-motion-easing",
    title: "Notes on Motion Easing",
    date: "2026-04-22",
    excerpt:
      "Why every great UI motion library ends up shipping the same four easings, and how to know which one you need.",
    tags: ["motion", "design"],
    cover: "◢◤",
    panelSize: "medium",
    rotate: 1,
    readingMins: 4,
  },
  {
    slug: "tailwind-v4-first-impressions",
    title: "Tailwind v4: First Impressions",
    date: "2026-04-10",
    excerpt:
      "CSS-first config is the right move. A few rough edges, but the @theme directive feels like the future.",
    tags: ["css", "tailwind"],
    cover: "✦",
    panelSize: "small",
    rotate: -0.5,
    readingMins: 3,
  },
  {
    slug: "small-things-on-the-internet",
    title: "Small Things on the Internet",
    date: "2026-03-28",
    excerpt:
      "On the value of building tiny, finished things instead of starting large, abandoned ones.",
    tags: ["essay"],
    cover: "現",
    panelSize: "small",
    rotate: 1.5,
    readingMins: 2,
  },
  {
    slug: "useful-svg-tricks-i-keep-forgetting",
    title: "SVG Tricks I Keep Forgetting",
    date: "2026-03-12",
    excerpt:
      "<animate>, viewBox math, SMIL vs CSS, and the one or two things <use> still does best.",
    tags: ["svg", "notes"],
    cover: "◈",
    panelSize: "small",
    rotate: -1,
    readingMins: 3,
  },
] as const

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}
