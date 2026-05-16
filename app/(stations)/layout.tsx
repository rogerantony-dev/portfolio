import { ArrivingAnnouncer } from "@/components/train/arriving-announcer"
import { Carriage } from "@/components/train/carriage"
import { RouteMap } from "@/components/train/route-map"
import { StatusBar } from "@/components/train/status-bar"
import { Transition } from "@/components/train/transition"
import { TunnelOverlay } from "@/components/train/tunnel-overlay"

export default function StationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <StatusBar />
      <Carriage>
        <main id="main">
          <Transition>{children}</Transition>
        </main>
      </Carriage>
      <RouteMap />
      <ArrivingAnnouncer />
      <TunnelOverlay />
    </>
  )
}
