export const ease = {
  snap: [0.22, 1, 0.36, 1] as const,
  punch: [0.16, 1.3, 0.36, 1] as const,
  train: [0.65, 0, 0.35, 1] as const,
  glitch: [0.85, 0, 0.15, 1] as const,
}

export const dur = {
  micro: 0.15,
  fast: 0.3,
  normal: 0.5,
  punch: 0.6,
  train: 1.2,
} as const
