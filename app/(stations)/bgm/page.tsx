import { bgm } from "@/lib/bgm"

export default function BgmPage() {
  return (
    <section className="grid gap-8">
      <header className="space-y-3">
        <p className="font-mono text-ui text-amber tracking-[0.3em]">
          BGM · on rotation · <span aria-hidden="true">📻</span> velvet line radio
        </p>
        <h1
          className="font-display text-fg leading-[0.9]"
          style={{ fontSize: "var(--text-hero)" }}
        >
          <span className="text-red">PA</span>{" "}
          <span className="text-fg">ANNOUNCEMENT</span>
        </h1>
        <p className="font-mono text-ui text-muted max-w-prose">
          // {bgm.description}
        </p>
      </header>

      {/* Velvet Line PA panel — wraps the Spotify embed */}
      <div
        className="border-2 border-line bg-elevated/60 relative"
        style={{ boxShadow: "8px 8px 0 0 var(--color-p5-black)" }}
      >
        <div className="absolute -top-3 left-4 bg-amber text-void px-3 py-0.5 font-mono text-micro tracking-[0.3em]">
          NOW PLAYING
        </div>

        <div className="p-4 md:p-6 grid gap-4">
          {/* Wrapper radius must match (or exceed) Spotify's internal
              panel radius (~12px) so the iframe's white body is clipped
              behind Spotify's own rounded corners. The playlist embed
              renders taller than a single-album embed since it lists
              every track inline — bump height to 480 so the visible
              tracklist isn't hidden behind a scroll bar. */}
          <div className="rounded-2xl overflow-hidden bg-void">
            <iframe
              title={bgm.playlistName}
              src={`https://open.spotify.com/embed/${bgm.embedPath}?utm_source=generator&theme=0`}
              width="100%"
              height="480"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="block"
              style={{ border: 0, colorScheme: "dark", background: "transparent" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
