"use client"

import { motion } from "motion/react"

type Props = {
  text: string
  charDelay?: number // seconds per char
  startDelay?: number // delay before first char
  cursor?: boolean
  className?: string
}

export function TypingText({
  text,
  charDelay = 0.045,
  startDelay = 0.2,
  cursor = true,
  className,
}: Props) {
  const chars = Array.from(text)
  return (
    <span className={className}>
      <span aria-label={text}>
        {chars.map((char, i) => (
          <motion.span
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0, delay: startDelay + i * charDelay }}
          >
            {char}
          </motion.span>
        ))}
      </span>
      {cursor && (
        <motion.span
          aria-hidden="true"
          className="inline-block w-[0.5ch] ml-[0.15ch] align-baseline"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0, 0] }}
          transition={{
            opacity: {
              delay: startDelay + chars.length * charDelay,
              duration: 1.05,
              repeat: Infinity,
              times: [0, 0.05, 0.5, 0.55, 1],
            },
          }}
        >
          ▮
        </motion.span>
      )}
    </span>
  )
}
