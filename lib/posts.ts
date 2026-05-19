// ┌──────────────────────────────────────────────────────────────────┐
// │  Blog posts on /rumors. Authored as MDX in /content/rumors/.     │
// │  Each file's frontmatter supplies the metadata below; the MDX    │
// │  body is rendered on /rumors/[slug].                             │
// │                                                                  │
// │  panelSize controls the manga-grid cell:                         │
// │    large  = 2 cols × 2 rows (feature)                            │
// │    medium = 2 cols × 1 row  (banner)                             │
// │    small  = 1 col  × 1 row  (regular)                            │
// └──────────────────────────────────────────────────────────────────┘

import "server-only"
import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

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
  readonly body: string // raw MDX source
}

const CONTENT_DIR = path.join(process.cwd(), "content", "rumors")

function loadPosts(): readonly Post[] {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((name) => name.endsWith(".mdx"))

  const loaded = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "")
    const source = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8")
    const { data, content } = matter(source)

    return {
      slug,
      title: String(data.title),
      date: String(data.date),
      excerpt: String(data.excerpt),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      cover: String(data.cover),
      panelSize: data.panelSize as PanelSize,
      rotate: Number(data.rotate ?? 0),
      readingMins: Number(data.readingMins ?? 1),
      body: content,
    } satisfies Post
  })

  return loaded.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export const posts: readonly Post[] = loadPosts()

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}
