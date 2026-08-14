"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/consts/utils"
import { useInView } from "@/hooks/useInView"
import Button from "../ui/button"
import { tournaments } from "@/consts/tournaments"

export default function TournamentsSection() {
  const { ref, inView } = useInView<HTMLElement>(0.1)

  return (
    <section
      id="tournaments"
      ref={ref}
      className="relative isolate overflow-hidden text-white"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 lg:py-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="overflow-hidden">
            <h2
              className={cn(
                "text-3xl leading-tight font-black text-white transition-transform duration-700 ease-out sm:text-5xl",
                inView ? "translate-y-0" : "translate-y-full"
              )}
            >
              OUR TOURNAMENTS
            </h2>
          </div>

          <div
            className={cn(
              "mx-auto mt-5 h-1 bg-gold/80 shadow-[0_0_10px_rgba(212,175,55,0.5)] transition-all delay-300 duration-700 ease-out",
              inView ? "w-28" : "w-0"
            )}
          />
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {tournaments.map((item, index) => (
            <article
              key={item.h5}
              style={{
                transitionDelay: inView ? `${500 + index * 150}ms` : "0ms",
              }}
              className={cn(
                "flex flex-col items-center transition-all duration-700 ease-out",
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              )}
            >
              <div className="mb-5 flex items-center justify-center gap-3 text-center">
                <h3 className="text-lg font-bold tracking-[0.08em] text-gold uppercase sm:text-xl">
                  {item.h5}
                </h3>

                {index === 0 ? (
                  <span
                    style={{
                      transitionDelay: inView
                        ? `${500 + index * 150 + 400}ms`
                        : "0ms",
                    }}
                    className={cn(
                      "grid h-8 w-8 place-items-center rounded-full bg-gold text-[0.75rem] font-black text-[#07142b] transition-all duration-500 ease-out",
                      inView ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    )}
                  >
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
                    className={cn(
                      "object-cover object-center transition-transform duration-[1200ms] ease-out",
                      inView ? "scale-100" : "scale-110"
                    )}
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

        <div
          className={cn(
            "mt-10 flex justify-center transition-all delay-1000 duration-700 ease-out",
            inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          )}
        >
          <Link href="/tournaments">
            <Button>TOURNAMENTS</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
