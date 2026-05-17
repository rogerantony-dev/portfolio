// ┌──────────────────────────────────────────────────────────────────┐
// │  Canonical class-name composer for shadcn primitives. Use cn() in │
// │  components/ui/* and any feature component being heavily edited   │
// │  alongside primitive adoption. Existing direct clsx() consumers   │
// │  in feature folders may stay as-is — no global codemod.           │
// └──────────────────────────────────────────────────────────────────┘

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
