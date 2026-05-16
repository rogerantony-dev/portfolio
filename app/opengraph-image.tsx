import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Portfolio — Velvet Line"

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A0E14",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 80,
          color: "#E4E8EE",
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0, transparent 4px, rgba(228,232,238,0.04) 4px, rgba(228,232,238,0.04) 5px)",
        }}
      >
        <div
          style={{
            color: "#F5B82E",
            fontSize: 28,
            fontFamily: "monospace",
            letterSpacing: 6,
          }}
        >
          ▶ VELVET LINE
        </div>
        <div
          style={{
            fontSize: 140,
            fontWeight: 900,
            marginTop: 16,
            lineHeight: 0.95,
            color: "#E60012",
            textShadow: "6px 6px 0 #0A0A0A",
          }}
        >
          PORTFOLIO
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            gap: 28,
            color: "#8A95A5",
            fontSize: 22,
            fontFamily: "monospace",
          }}
        >
          <span>現在地</span>
          <span>·</span>
          <span>仕事</span>
          <span>·</span>
          <span>実験</span>
          <span>·</span>
          <span>噂</span>
          <span>·</span>
          <span>BGM</span>
          <span>·</span>
          <span>連絡</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
