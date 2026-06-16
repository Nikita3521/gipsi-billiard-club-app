"use client"

import Link from "next/link"
import Button from "../ui/button"
import { foods } from "@/consts/foods"
import CarouselFoods from "../ui/CarouselFoods"

export default function MenuSection() {
  return (
    <section id="menu" className="relative isolate overflow-hidden text-white">
      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:py-8">
        <div className="max-w-xl">
          <div className="text-4xl font-black tracking-[0.1em] uppercase">
            Our menu
          </div>
          <div className="mt-6 h-px w-28 bg-gold/60" />
          <h2 className="mt-6 text-3xl leading-[0.95] font-semibold uppercase sm:text-3xl">
            Food for every break
          </h2>

          <p className="mt-6 max-w-[34rem] text-base leading-7 text-white/70 sm:text-lg">
            A warm mix of snacks, mains and desserts for long matches, late
            evenings and relaxed time with friends.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/files/menu.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>menu</Button>
            </Link>
          </div>

          <div className="mt-10 grid max-w-lg gap-3 sm:grid-cols-2">
            <div className="border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm">
              <p className="text-xs tracking-[0.28em] text-gold/70 uppercase">
                Fresh serving
              </p>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Simple, fast and easy to pair with a night at the club.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm">
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

        <div className="relative">
          <div />
          <CarouselFoods img={foods} />
        </div>
      </div>
    </section>
  )
}
