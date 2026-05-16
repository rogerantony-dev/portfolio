// ┌──────────────────────────────────────────────────────────────────┐
// │  Velvet Line BGM. The embed pulls from your Spotify playlist —    │
// │  swap playlistId below with your own public playlist's ID.       │
// │  Tracklist below is a static mirror you maintain by hand (for    │
// │  Sprint 4 placeholder mode). Sprint 5 polish can wire the        │
// │  Spotify Web API at build time.                                  │
// └──────────────────────────────────────────────────────────────────┘

export type Track = {
  readonly n: string
  readonly title: string
  readonly artist: string
  readonly duration: string
}

export const bgm = {
  playlistId: "37i9dQZF1DWWQRwui0ExPn", // "Lofi Beats" — replace with yours
  playlistName: "Velvet Line — on rotation",
  description:
    "Late-night build music. Mostly lofi, some city pop, the occasional Persona track.",
  tracks: [
    { n: "01", title: "Beneath the Mask",      artist: "Lyn Inaizumi",    duration: "4:08" },
    { n: "02", title: "Last Surprise",          artist: "Lyn Inaizumi",    duration: "3:36" },
    { n: "03", title: "Rivers in the Desert",  artist: "Lyn Inaizumi",    duration: "4:48" },
    { n: "04", title: "Plastic Love",          artist: "Mariya Takeuchi", duration: "4:52" },
    { n: "05", title: "Mayonaka no Door",      artist: "Miki Matsubara",  duration: "4:15" },
    { n: "06", title: "Lofi study, vol. 2",    artist: "various",         duration: "—:—" },
  ] as const,
} as const
