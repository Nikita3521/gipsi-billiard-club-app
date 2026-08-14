"use client"

import Link from "next/link"
import { cn } from "@/consts/utils"
import { useInView } from "@/hooks/useInView"
import Button from "../ui/button"
import { foods } from "@/consts/foods"
import CarouselFoods from "../ui/CarouselFoods"

export default function MenuSection() {
  const { ref, inView } = useInView<HTMLElement>(0.15)

  return (
    <section
      id="menu"
      ref={ref}
      className="relative isolate overflow-hidden text-white"
    >
      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:py-8">
        <div className="max-w-xl">
          <div
            className={cn(
              "text-4xl font-black tracking-[0.1em] uppercase transition-all duration-700 ease-out",
              inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            Our menu
          </div>

          <div
            className={cn(
              "mt-6 h-px bg-gold/60 transition-all delay-200 duration-700 ease-out",
              inView ? "w-28" : "w-0"
            )}
          />

          <div className="mt-6 overflow-hidden">
            <h2
              className={cn(
                "text-3xl leading-[0.95] font-semibold uppercase transition-transform delay-300 duration-700 ease-out sm:text-3xl",
                inView ? "translate-y-0" : "translate-y-full"
              )}
            >
              Food for every break
            </h2>
          </div>

          <p
            className={cn(
              "mt-6 max-w-[34rem] text-base leading-7 text-white/70 transition-all delay-500 duration-700 ease-out sm:text-lg",
              inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            A warm mix of snacks, mains and desserts for long matches, late
            evenings and relaxed time with friends.
          </p>

          <div
            className={cn(
              "mt-10 flex flex-wrap items-center gap-4 transition-all delay-700 duration-700 ease-out",
              inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            )}
          >
            <Link
              href="/files/menu.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>menu</Button>
            </Link>
          </div>

          <div className="mt-10 grid max-w-lg gap-3 sm:grid-cols-2">
            <div
              style={{ transitionDelay: inView ? "850ms" : "0ms" }}
              className={cn(
                "border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm transition-all duration-600 ease-out",
                inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}
            >
              <p className="text-xs tracking-[0.28em] text-gold/70 uppercase">
                Fresh serving
              </p>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Simple, fast and easy to pair with a night at the club.
              </p>
            </div>

            <div
              style={{ transitionDelay: inView ? "950ms" : "0ms" }}
              className={cn(
                "border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm transition-all duration-600 ease-out",
                inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}
            >
              <p className="text-xs tracking-[0.28em] text-gold/70 uppercase">
                Rotating selection
              </p>
              <p className="mt-2 text-sm leading-6 text-white/70">
                A dynamic menu that changes to keep every visit fresh and
                unexpected.
              </p>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "relative transition-all delay-300 duration-1000 ease-out",
            inView ? "scale-100 opacity-100" : "scale-95 opacity-0"
          )}
        >
          <div />
          <CarouselFoods img={foods} />
        </div>
      </div>
    </section>
  )
}
