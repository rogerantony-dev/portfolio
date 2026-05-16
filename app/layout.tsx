import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/react"
import { anton, inter, jetbrainsMono, notoJp } from "@/lib/fonts"
import { Scanlines } from "@/components/atmosphere/scanlines"
import { Noise } from "@/components/atmosphere/noise"
import { Vignette } from "@/components/atmosphere/vignette"
import { SkipLink } from "@/components/skip-link"
import "./globals.css"

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Portfolio — Velvet Line",
    template: "%s — Velvet Line",
  },
  description: "A portfolio. Take the Velvet Line.",
  openGraph: {
    type: "website",
    siteName: "Portfolio",
  },
}

export const viewport: Viewport = {
  themeColor: "#0A0E14",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} ${jetbrainsMono.variable} ${notoJp.variable}`}
    >
      <body>
        <SkipLink />
        {children}
        <Scanlines />
        <Noise />
        <Vignette />
        <Analytics />
      </body>
    </html>
  )
}
