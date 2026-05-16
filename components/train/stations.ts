export type StationId =
  | "now"
  | "works"
  | "lab"
  | "rumors"
  | "bgm"
  | "contact"

export type Station = {
  readonly id: StationId
  readonly href: string
  readonly label: string
  readonly kanji: string
  readonly order: number
  readonly sprint: number
}

export const stations = [
  { id: "now",     href: "/",        label: "NOW",     kanji: "現在地", order: 0, sprint: 2 },
  { id: "works",   href: "/works",   label: "WORKS",   kanji: "仕事",   order: 1, sprint: 3 },
  { id: "lab",     href: "/lab",     label: "LAB",     kanji: "実験",   order: 2, sprint: 5 },
  { id: "rumors",  href: "/rumors",  label: "RUMORS",  kanji: "噂",     order: 3, sprint: 4 },
  { id: "bgm",     href: "/bgm",     label: "BGM",     kanji: "BGM",    order: 4, sprint: 4 },
  { id: "contact", href: "/contact", label: "CONTACT", kanji: "連絡",   order: 5, sprint: 2 },
] as const satisfies readonly Station[]

export function getStationByPath(pathname: string): Station | undefined {
  return stations.find((s) =>
    s.href === "/" ? pathname === "/" : pathname.startsWith(s.href)
  )
}
