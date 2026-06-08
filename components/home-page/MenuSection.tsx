"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { foods } from "@/consts/foods"
import Button from "../ui/button"
import { motion } from "framer-motion"

export default function MenuSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % foods.length)
    }, 2600)

    return () => {
      window.clearInterval(interval)
    }
  }, [])

  const visibleFoods = Array.from({ length: 4 }, (_, index) => {
    return foods[(activeIndex + index) % foods.length]
  })

  return (
    <section id="menu" className="relative isolate overflow-hidden text-white">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#07142b_0%,#07142b_52%,#04111f_100%)]" />

      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0, transparent 148px, rgba(214, 178, 111, 0.14) 148px, rgba(214, 178, 111, 0.14) 152px)",
        }}
      />

      <div className="absolute top-8 -left-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute top-1/2 right-[-8rem] h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 py-20 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:py-24">
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
          <div className="absolute -top-4 -right-4 hidden h-24 w-24 rounded-full border border-gold/25 lg:block" />
          <div className="grid gap-5 sm:grid-cols-2">
            {visibleFoods.map((item) => (
              <motion.div
                key={`${item.src}-${activeIndex}`}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-[#0b1d3a] shadow-[0_24px_70px_rgba(0,0,0,0.34)]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw,
       (max-width: 1024px) 50vw,
       25vw"
                />

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,20,43,0.05)_0%,rgba(7,20,43,0.12)_25%,rgba(7,20,43,0.7)_100%)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
