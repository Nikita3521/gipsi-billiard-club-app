"use client"

import { cn } from "@/consts/utils"
import { useInView } from "@/hooks/useInView"
import CarouselGeneral from "../ui/CarouselGeneral"
import { trainers } from "@/consts/trainers"

export default function PrivateLessonsSection() {
  const { ref, inView } = useInView<HTMLElement>(0.2)

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-10 text-white sm:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p
            className={cn(
              "text-[0.65rem] font-semibold tracking-[0.32em] text-gold/80 uppercase transition-all duration-700 ease-out sm:text-xs sm:tracking-[0.42em]",
              inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            )}
          >
            Private lessons
          </p>

          <div className="mt-3 overflow-hidden">
            <h2
              className={cn(
                "text-2xl leading-tight font-black text-white transition-transform delay-150 duration-700 ease-out sm:text-3xl lg:text-5xl",
                inView ? "translate-y-0" : "translate-y-full"
              )}
            >
              Training with our coaches
            </h2>
          </div>

          <div
            className={cn(
              "mx-auto mt-4 h-1 bg-gold/80 shadow-[0_0_10px_rgba(212,175,55,0.5)] transition-all delay-500 duration-700 ease-out",
              inView ? "w-20 sm:w-28" : "w-0"
            )}
          />
        </div>

        <div
          className={cn(
            "mt-8 transition-all delay-700 duration-1000 ease-out sm:mt-10",
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}
        >
          <CarouselGeneral items={trainers} />
        </div>
      </div>
    </section>
  )
}
