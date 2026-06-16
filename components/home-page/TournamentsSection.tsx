import Image from "next/image"
import Link from "next/link"
import Button from "../ui/button"
import { tournaments } from "@/consts/tournaments"

export default function TournamentsSection() {
  return (
    <section
      id="tournaments"
      className="relative isolate overflow-hidden text-white"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 lg:py-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl leading-tight font-black text-white sm:text-5xl">
            OUR TOURNAMENTS
          </h2>

          <div className="mx-auto mt-5 h-1 w-28 bg-gold/80" />
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {tournaments.map((item, index) => (
            <article key={item.h5} className="flex flex-col items-center">
              <div className="mb-5 flex items-center justify-center gap-3 text-center">
                <h3 className="text-lg font-bold tracking-[0.08em] text-gold uppercase sm:text-xl">
                  {item.h5}
                </h3>

                {index === 0 ? (
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-gold text-[0.75rem] font-black text-[#07142b]">
                    8
                  </span>
                ) : null}
              </div>

              <div className="w-full max-w-[22.5rem]">
                <div className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-[#0b1d3a] shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
                  <Image
                    src={item.image}
                    alt={item.h5}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 100vw"
                    className="object-cover object-center"
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,20,43,0.04)_0%,rgba(7,20,43,0.12)_30%,rgba(7,20,43,0.16)_70%,rgba(7,20,43,0.44)_100%)]" />
                </div>

                <p className="mx-auto mt-5 max-w-[18rem] text-center text-base leading-6 text-white/75 sm:text-[1.05rem]">
                  {item.p}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/tournaments">
            <Button>TOURNAMENTS</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
