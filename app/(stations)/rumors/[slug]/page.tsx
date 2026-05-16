import Link from "next/link"
import { notFound } from "next/navigation"
import { getPost, posts } from "@/lib/posts"
import type { Metadata } from "next"

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <article className="grid gap-8 max-w-prose mx-auto">
      <header className="space-y-3">
        <div className="font-mono text-micro text-muted flex items-center gap-3">
          <Link
            href="/rumors"
            className="text-amber hover:text-yellow transition-colors"
          >
            ← back to rumors
          </Link>
          <span aria-hidden="true">·</span>
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span aria-hidden="true">·</span>
          <span>{post.readingMins} min</span>
        </div>

        <h1
          className="font-display text-fg leading-tight"
          style={{ fontSize: "var(--text-hero)" }}
        >
          <span className="text-red">▸</span> {post.title}
        </h1>

        <div className="flex flex-wrap gap-2 pt-1">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-micro text-muted border border-line/60 px-2 py-0.5"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      <div className="border-t border-line/40" />

      <div className="font-sans text-fg leading-relaxed space-y-4">
        <p className="text-muted font-mono text-ui italic">{post.excerpt}</p>

        <div className="border border-line/40 bg-elevated/40 p-6 font-mono text-ui">
          <p className="text-amber tracking-[0.3em]">▸ DRAFT</p>
          <p className="text-muted mt-3">
            // this post is a placeholder. Real content arrives when this slug
            <br />
            // is wired to an MDX file or a CMS. For now it&apos;s here to
            <br />
            // prove the route, metadata, and back-navigation all work.
          </p>
        </div>
      </div>
    </article>
  )
}
