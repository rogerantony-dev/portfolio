import Link from "next/link"
import clsx from "clsx"
import type { Post } from "@/lib/posts"

const sizeClasses: Record<Post["panelSize"], string> = {
  large: "md:col-span-2 md:row-span-2",
  medium: "md:col-span-2",
  small: "",
}

const coverFontByLength: Record<number, string> = {
  1: "text-[5rem]",
  2: "text-[3.5rem]",
  3: "text-[3rem]",
}

function formatDate(iso: string) {
  return new Date(iso)
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    })
    .toUpperCase()
}

export function MangaPanels({ posts }: { posts: readonly Post[] }) {
  return (
    <ul
      className="grid grid-cols-2 md:grid-cols-3 auto-rows-[180px] md:auto-rows-[200px] gap-4 md:gap-5"
      style={{ gridAutoFlow: "dense" }}
    >
      {posts.map((post) => {
        const isLarge = post.panelSize === "large"
        return (
          <li
            key={post.slug}
            className={clsx(
              "col-span-2 sm:col-span-1",
              sizeClasses[post.panelSize]
            )}
          >
            <Link
              href={`/rumors/${post.slug}`}
              className="group block h-full bg-elevated border-2 border-ink relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-void transition-transform hover:scale-[1.01]"
              style={{
                transform: `rotate(${post.rotate}deg)`,
                boxShadow: "5px 5px 0 0 var(--color-p5-black)",
              }}
            >
              {/* Halftone-ish cover area */}
              <div
                aria-hidden="true"
                className="absolute inset-0 grid place-items-center"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(230,0,18,0.15), transparent 60%), radial-gradient(circle at 70% 80%, rgba(91,192,235,0.1), transparent 60%), repeating-radial-gradient(circle, rgba(255,255,255,0.04) 0 2px, transparent 2px 4px)",
                }}
              >
                <span
                  className={clsx(
                    "font-display select-none",
                    isLarge ? "text-[7rem]" : coverFontByLength[post.cover.length] ?? "text-[3rem]",
                    "text-fg/30 group-hover:text-fg/60 transition-colors"
                  )}
                >
                  {post.cover}
                </span>
              </div>

              {/* Caption box */}
              <div className="absolute bottom-0 left-0 right-0 bg-void/90 border-t-2 border-ink p-3 md:p-4">
                <div className="flex items-center gap-2 font-mono text-micro text-muted">
                  <span className="text-amber">{formatDate(post.date)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingMins} MIN</span>
                </div>
                <h3
                  className={clsx(
                    "font-display text-fg leading-tight mt-1",
                    isLarge ? "text-h2" : "text-ui md:text-h2"
                  )}
                  style={{
                    fontSize: isLarge
                      ? "var(--text-h2)"
                      : "var(--text-body)",
                  }}
                >
                  {post.title}
                </h3>
                {isLarge && (
                  <p className="font-mono text-micro text-muted mt-1 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
              </div>

              {/* Red diagonal sweep on hover */}
              <span
                aria-hidden="true"
                className="absolute -top-8 -right-8 w-24 h-24 bg-red opacity-0 group-hover:opacity-100 transition-opacity rotate-45"
              />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
