// ┌──────────────────────────────────────────────────────────────────┐
// │  Velvet Line BGM. embedPath is "<kind>/<id>" where kind is one    │
// │  of "album" | "playlist" | "track" — matches the Spotify embed    │
// │  URL shape: https://open.spotify.com/embed/<kind>/<id>.           │
// └──────────────────────────────────────────────────────────────────┘

export type Track = {
  readonly n: string
  readonly title: string
  readonly artist: string
  readonly duration: string
}

export const bgm = {
  embedPath: "album/5fPglEDz9YEwRgbLRvhCZy", // Kanye West — Graduation
  playlistName: "Graduation — on rotation",
  description:
    "Graduation by Kanye. Late-night build music for when you need a little stadium energy in the room.",
  tracks: [
    { n: "01", title: "Good Morning",        artist: "Kanye West",                       duration: "3:15" },
    { n: "02", title: "Champion",            artist: "Kanye West",                       duration: "2:48" },
    { n: "03", title: "Stronger",            artist: "Kanye West",                       duration: "5:11" },
    { n: "04", title: "I Wonder",            artist: "Kanye West",                       duration: "4:03" },
    { n: "05", title: "Good Life",           artist: "Kanye West, T-Pain",               duration: "3:27" },
    { n: "06", title: "Can't Tell Me Nothing", artist: "Kanye West",                     duration: "4:31" },
    { n: "07", title: "Barry Bonds",         artist: "Kanye West, Lil Wayne",            duration: "3:24" },
    { n: "08", title: "Drunk and Hot Girls", artist: "Kanye West, Mos Def",              duration: "5:13" },
    { n: "09", title: "Flashing Lights",     artist: "Kanye West, Dwele",                duration: "3:57" },
    { n: "10", title: "Everything I Am",     artist: "Kanye West, DJ Premier",           duration: "3:48" },
    { n: "11", title: "The Glory",           artist: "Kanye West",                       duration: "3:33" },
    { n: "12", title: "Homecoming",          artist: "Kanye West, Chris Martin",         duration: "3:23" },
    { n: "13", title: "Big Brother",         artist: "Kanye West",                       duration: "4:47" },
  ] as const,
} as const
