"use client"

import { motion } from "motion/react"
import { usePathname } from "next/navigation"
import { dur, ease } from "@/lib/motion"

// No AnimatePresence here on purpose. AnimatePresence mode="wait"
// can race with Next.js App Router's async navigation: if the
// exit animation finishes before the new RSC payload is ready (or
// a follow-up click cancels things), the page stays blank until
// a hard reload. Keying a plain motion.div on the pathname makes
// React swap synchronously, and the new tree fades in from
// initial → animate. No stuck states.
export function Transition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: dur.fast, ease: ease.snap }}
    >
      {children}
    </motion.div>
  )
}
