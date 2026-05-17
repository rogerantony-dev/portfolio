// ┌──────────────────────────────────────────────────────────────────┐
// │  Velvet Line BGM. embedPath is "<kind>/<id>" where kind is one    │
// │  of "album" | "playlist" | "track" — matches the Spotify embed    │
// │  URL shape: https://open.spotify.com/embed/<kind>/<id>. The embed │
// │  itself renders the tracklist, so the page no longer maintains    │
// │  a static mirror.                                                  │
// └──────────────────────────────────────────────────────────────────┘

export const bgm = {
  embedPath: "playlist/12pSBlipirYllhJ5Q37r51", // Roger's on-rotation playlist
  playlistName: "On rotation — top 19",
  description:
    "What I'm actually playing on repeat. Heavy Kanye rotation, with 2Pac and J. Cole in the mix.",
} as const
