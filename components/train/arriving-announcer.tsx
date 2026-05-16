"use client"

import { usePathname } from "next/navigation"
import { getStationByPath } from "./stations"

export function ArrivingAnnouncer() {
  const pathname = usePathname()
  const station = getStationByPath(pathname)
  return (
    <div role="status" aria-live="polite" className="sr-only">
      {station ? `Arrived at ${station.label} station` : "Station not found"}
    </div>
  )
}
