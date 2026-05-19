import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
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

      <div className="font-sans text-fg leading-relaxed space-y-4 [&_p]:text-ui [&_p]:leading-relaxed [&_em]:text-muted [&_a]:text-amber [&_a:hover]:text-yellow [&_a]:underline [&_a]:underline-offset-4">
        <p className="text-muted font-mono text-ui italic">{post.excerpt}</p>
        <MDXRemote source={post.body} />
      </div>
    </article>
  )
}
