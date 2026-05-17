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
              behind Spotify's own rounded corners. */}
          <div className="rounded-2xl overflow-hidden bg-void">
            <iframe
              title={bgm.playlistName}
              src={`https://open.spotify.com/embed/${bgm.embedPath}?utm_source=generator&theme=0`}
              width="100%"
              height="380"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="block"
              style={{ border: 0, colorScheme: "dark", background: "transparent" }}
            />
          </div>
          <p className="font-mono text-micro text-muted">
            // swap the playlist ID in <code className="text-fg">lib/bgm.ts</code> to use your own playlist
          </p>
        </div>
      </div>

      {/* Static tracklist mirror */}
      <div className="space-y-4">
        <p className="font-mono text-ui text-amber tracking-[0.3em]">
          ▸ TRACKLIST
        </p>
        <ul className="border border-line/40 divide-y divide-line/40">
          {bgm.tracks.map((track) => (
            <li
              key={track.n}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3 font-mono text-ui hover:bg-elevated/40 transition-colors"
            >
              <span className="text-muted w-6 tabular-nums">{track.n}</span>
              <div className="min-w-0">
                <p className="text-fg truncate">{track.title}</p>
                <p className="text-muted text-micro truncate">{track.artist}</p>
              </div>
              <span className="text-muted tabular-nums">{track.duration}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
