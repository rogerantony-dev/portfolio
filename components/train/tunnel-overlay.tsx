"use client"

import { motion } from "motion/react"
import { usePathname } from "next/navigation"
import { ease } from "@/lib/motion"

// Sweeps a soft dark gradient across the viewport on every route
// change — feels like a tunnel passing over the carriage. Subtle, not
// a full-bleed blackout. Plays once per pathname change (the key
// trick re-mounts the motion element).
export function TunnelOverlay() {
  const pathname = usePathname()
  return (
    <motion.div
      key={pathname}
      aria-hidden="true"
      initial={{ x: "-100%", opacity: 0 }}
      animate={{
        x: ["-100%", "0%", "100%"],
        opacity: [0, 0.85, 0],
      }}
      transition={{
        duration: 0.65,
        ease: ease.train,
        times: [0, 0.5, 1],
      }}
      className="fixed inset-y-0 left-0 w-2/5 pointer-events-none"
      style={{
        zIndex: 35,
        background:
          "linear-gradient(90deg, transparent, rgba(10,14,20,0.95) 30%, rgba(10,14,20,0.95) 70%, transparent)",
      }}
    />
  )
}
