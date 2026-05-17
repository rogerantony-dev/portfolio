import Link from "next/link"
import { ArrivingAnnouncer } from "@/components/train/arriving-announcer"
import { Carriage } from "@/components/train/carriage"
import { RouteMap } from "@/components/train/route-map"
import { StatusBar } from "@/components/train/status-bar"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <>
      <StatusBar />
      <Carriage>
        <main id="main">
          <section className="grid place-items-center min-h-[50vh]">
            <div className="text-center">
              <p className="font-mono text-muted text-ui tracking-[0.3em]">
                ▶ 404
              </p>
              <p
                className="font-display mt-6 leading-none"
                style={{ fontSize: "var(--text-display)" }}
              >
                <span className="text-red">STATION</span>{" "}
                <span className="text-fg">NOT FOUND</span>
              </p>
              <p className="font-mono text-muted mt-4">
                // this stop doesn&apos;t exist on the velvet line
              </p>
              <Button
                variant="pa-amber-outline"
                size="lg-pa"
                className="mt-6"
                nativeButton={false}
                render={<Link href="/">▸ RETURN TO NOW</Link>}
              />
            </div>
          </section>
        </main>
      </Carriage>
      <RouteMap />
      <ArrivingAnnouncer />
    </>
  )
}
