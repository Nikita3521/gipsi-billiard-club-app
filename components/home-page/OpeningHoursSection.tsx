import Link from "next/link"
import { Clock3 } from "lucide-react"
import { openingHours } from "@/consts/openingHours"
import Button from "../ui/button"

export default function OpeningHoursSection() {
  return (
    <section className="relative overflow-hidden bg-[url('/images/background_2.webp')] bg-cover bg-center bg-no-repeat text-white">
      <div className="inset-0 bg-gradient-to-r from-[#07142b]/95 via-[#07142b]/90 to-transparent">
        <div className="relative mx-auto grid min-h-[calc(100vh-64px)] w-full max-w-7xl items-center px-4 py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(26rem,0.95fr)] lg:py-8">
          <div className="max-w-[42rem]">
            <h2 className="max-w-[12ch] text-2xl leading-[0.95] font-black tracking-[-0.05em] text-white uppercase sm:text-6xl">
              We're open when you are
            </h2>

            <div className="mt-10 border-t border-white/10">
              <dl className="divide-y divide-white/10">
                {openingHours.map((item) => (
                  <div
                    key={item.day}
                    className="grid grid-cols-[1fr_auto] items-center gap-4 py-4 sm:py-5"
                  >
                    <dt className="text-base font-semibold tracking-[0.2em] text-white/60 uppercase sm:text-lg">
                      {item.day}
                    </dt>
                    <dd className="text-base font-medium tracking-[0.12em] text-gold sm:text-lg">
                      {item.time}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-5 border border-white/10 bg-black/10 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:p-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full border-2 border-gold/80 text-gold">
                    <Clock3 className="h-7 w-7" />
                  </div>

                  <div>
                    <p className="text-lg font-extrabold tracking-[0.12em] text-white">
                      OPEN EVERY DAY
                    </p>
                    <p className="mt-2 max-w-md text-sm leading-6 text-white/65 sm:text-base">
                      Walk-ins are welcome, but we recommend booking in advance
                      to guarantee your table.
                    </p>
                  </div>
                </div>

                <Link href="/booking">
                  <Button className="text-nowrap">Book table</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
