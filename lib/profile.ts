// ┌──────────────────────────────────────────────────────────────────┐
// │  This is YOUR profile data. Edit me to make the site yours.      │
// │  Drop a CV at /public/cv.pdf to make the download button work.   │
// └──────────────────────────────────────────────────────────────────┘

export type SkillColor = "red" | "amber" | "cyan" | "yellow"

export type Skill = {
  readonly name: string
  readonly level: number // 0-100
  readonly color: SkillColor
}

export type Profile = {
  readonly name: string
  readonly callsign: string
  readonly role: string
  readonly bio: string
  readonly location: string
  readonly tagline: string
  readonly skills: readonly Skill[]
  readonly socials: {
    readonly github: string
    readonly linkedin: string
    readonly twitter: string
    readonly email: string
  }
  readonly cvUrl: string
}

export const profile: Profile = {
  name: "Roger Antony",
  callsign: "RA-ROOK",
  role: "developer",
  bio: "Building things that move. Learning by doing — projects, side experiments, late nights.",
  location: "Earth, en route",
  tagline: "I make small things on the internet.",
  skills: [
    { name: "FRONT-END", level: 78, color: "red" },
    { name: "BACK-END",  level: 54, color: "amber" },
    { name: "AI",        level: 71, color: "cyan" },
    { name: "DIET COKE", level: 99, color: "yellow" },
  ],
  socials: {
    github:   "https://github.com/rogerantony-dev",
    linkedin: "https://linkedin.com/in/your-handle",
    twitter:  "https://twitter.com/your-handle",
    email:    "hello@timeless.co",
  },
  cvUrl: "/cv.pdf",
}
