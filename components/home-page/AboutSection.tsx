"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Medal } from "lucide-react"
import { cn } from "@/consts/utils"
import { slides } from "@/consts/slides"
import { entertainments } from "@/consts/entertainments"
import Button from "../ui/button"
import CarouselGeneral from "../ui/CarouselGeneral"

export default function AboutSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  return (
    <section id="details" className="relative overflow-hidden text-white">
      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-8">
        <div className="relative overflow-hidden border border-white/10 bg-black/20 shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
          <div className="relative aspect-[4/5] min-h-[30rem] lg:min-h-[42rem]">
            <CarouselGeneral
              items={slides}
              interval={2500}
              hideDots={true}
              className="border-0 bg-transparent shadow-none lg:h-full"
              activeIndex={activeSlide}
              onActiveChange={setActiveSlide}
              isPlaying={isPlaying}
              renderItem={(item, index, isActive) => (
                <div
                  className={cn(
                    "absolute inset-0 transition-all duration-700 ease-out",
                    isActive
                      ? "scale-100 opacity-100"
                      : "pointer-events-none scale-[1.03] opacity-0"
                  )}
                >
                  <Image
                    src={item.src || ""}
                    alt={item.alt || ""}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1024px) 52vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>
              )}
            />

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,20,43,0.08)_0%,rgba(7,20,43,0.1)_35%,rgba(7,20,43,0.55)_100%)]" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
              <div className="hidden items-center gap-2 rounded-full border border-white/12 bg-black/30 px-4 py-2 text-xs tracking-[0.28em] text-white/80 uppercase backdrop-blur-sm sm:flex">
                <span className="h-2 w-2 rounded-full bg-gold" />
                {String(activeSlide + 1).padStart(2, "0")} /{" "}
                {String(slides.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10 lg:pt-2">
          <div className="space-y-4">
            <h2 className="max-w-2xl text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl lg:text-[2.25rem] lg:leading-[1.05]">
              GIPSI BILLIARD CLUB
            </h2>

            <div className="h-1 w-40 bg-gold/70" />

            <p className="max-w-2xl text-base leading-7 font-light text-white/70 sm:text-lg">
              Welcome to our world of billiards, where the game is not just a
              pastime but a way of life. We celebrate the elegance, strategy,
              and social connections that billiards foster. Our mission is to
              share the joy and sophistication of this timeless game, helping
              you elevate your skills and status in the community. Join us to
              experience the prestige and camaraderie that billiards bring.
            </p>
          </div>

          <div className="space-y-8 pt-4 lg:pt-10">
            <p className="max-w-md text-sm leading-6 font-semibold text-white/90 sm:text-base">
              At Peaky Sticks Billiards Academy, we offer a wide range of
              entertainment options:
            </p>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start">
              <ul className="flex flex-col">
                {entertainments.map((item, index) => (
                  <li
                    key={item}
                    onClick={() => {
                      setActiveSlide(index)
                    }}
                    onMouseEnter={() => {
                      setActiveSlide(index)
                      setIsPlaying(false)
                    }}
                    onMouseLeave={() => {
                      setIsPlaying(true)
                    }}
                    onFocus={() => {
                      setActiveSlide(index)
                    }}
                    tabIndex={0}
                    className="cursor-pointer text-sm leading-6 font-semibold text-white/80 before:text-gold before:content-['✓_'] hover:text-gold"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="grid min-h-[220px] place-items-center border-4 border-gold/60 bg-[#0b1e3f] px-6 py-8 text-center shadow-[0_18px_60px_rgba(0,0,0,0.2)]">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white text-white">
                  <Medal className="h-10 w-10" />
                </div>

                <p className="mt-6 max-w-[10rem] text-lg leading-6 font-semibold text-gold">
                  Your premium escape from ordinary
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="min-w-55">
                <Link href="/booking">Book table</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
