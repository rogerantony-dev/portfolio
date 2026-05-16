import { Anton, Inter, JetBrains_Mono, Noto_Sans_JP } from "next/font/google"

export const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
})

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const notoJp = Noto_Sans_JP({
  weight: ["900"],
  subsets: ["latin"],
  variable: "--font-noto-jp",
  preload: false,
})
