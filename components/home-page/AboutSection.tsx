"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Medal } from "lucide-react"
import { cn } from "@/consts/utils"
import { slides } from "@/consts/slides"
import { entertainments } from "@/consts/entertainments"
import { useInView } from "@/hooks/useInView"
import Button from "../ui/button"
import CarouselGeneral from "../ui/CarouselGeneral"

export default function AboutSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const { ref: sectionRef, inView } = useInView<HTMLElement>(0.15)

  return (
    <section
      id="details"
      ref={sectionRef}
      className="relative overflow-hidden text-white"
    >
      <div className="relative mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:gap-10 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-8">
        {/* Carousel */}
        <div
          className={cn(
            "relative order-1 overflow-hidden border border-white/10 bg-black/20 shadow-[0_28px_80px_rgba(0,0,0,0.35)] transition-all duration-1000 ease-out lg:order-none",
            inView ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
          )}
        >
          <div className="relative h-[16rem] w-full sm:h-[24rem] lg:h-[42rem]">
            <CarouselGeneral
              items={slides}
              interval={2500}
              hideDots={true}
              className="h-full w-full border-0 bg-transparent shadow-none"
              activeIndex={activeSlide}
              onActiveChange={setActiveSlide}
              isPlaying={isPlaying}
              renderItem={(item, index, isActive) => (
                <div
                  className={cn(
                    "absolute inset-0 h-full w-full transition-all duration-700 ease-out",
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
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                </div>
              )}
            />

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,20,43,0.08)_0%,rgba(7,20,43,0.1)_35%,rgba(7,20,43,0.55)_100%)]" />
          </div>
        </div>

        {/* Content */}
        <div className="order-2 flex flex-col gap-8 lg:order-none lg:gap-10 lg:pt-2">
          <div className="space-y-3 sm:space-y-4">
            <div className="overflow-hidden">
              <h2
                className={cn(
                  "max-w-2xl text-2xl leading-tight font-extrabold tracking-tight text-white transition-transform duration-700 ease-out sm:text-3xl lg:text-4xl lg:leading-[1.05]",
                  inView ? "translate-y-0" : "translate-y-full"
                )}
              >
                GIPSI BILLIARD CLUB
              </h2>
            </div>

            <div
              className={cn(
                "h-1 bg-gold/70 shadow-[0_0_10px_rgba(212,175,55,0.5)] transition-all delay-300 duration-700 ease-out",
                inView ? "w-28 sm:w-40" : "w-0"
              )}
            />

            <p
              className={cn(
                "max-w-2xl text-sm leading-6 font-light text-white/70 transition-all delay-500 duration-1000 ease-out sm:text-base sm:leading-7 lg:text-lg",
                inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}
            >
              Welcome to our world of billiards, where the game is not just a
              pastime but a way of life. We celebrate the elegance, strategy,
              and social connections that billiards foster. Our mission is to
              share the joy and sophistication of this timeless game, helping
              you elevate your skills and status in the community. Join us to
              experience the prestige and camaraderie that billiards bring.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8 lg:pt-10">
            <p
              className={cn(
                "max-w-md text-sm leading-6 font-semibold text-white/90 transition-all delay-700 duration-700 ease-out sm:text-base",
                inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              )}
            >
              At Peaky Sticks Billiards Academy, we offer a wide range of
              entertainment options:
            </p>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start">
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
                    style={{
                      transitionDelay: inView ? `${800 + index * 80}ms` : "0ms",
                    }}
                    className={cn(
                      "cursor-pointer border-b border-white/5 py-2.5 text-sm leading-6 font-semibold text-white/80 transition-all duration-500 ease-out before:text-gold before:content-['✓_'] hover:text-gold sm:border-0 sm:py-0",
                      inView
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-3 opacity-0"
                    )}
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div
                className={cn(
                  "flex min-h-[7rem] flex-row items-center gap-4 border-4 border-gold/60 bg-[#0b1e3f] px-5 py-5 text-left shadow-[0_18px_60px_rgba(0,0,0,0.2)] transition-all delay-900 duration-700 ease-out sm:min-h-[220px] sm:flex-col sm:items-center sm:gap-0 sm:px-6 sm:py-8 sm:text-center",
                  inView ? "scale-100 opacity-100" : "scale-90 opacity-0"
                )}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-white text-white sm:h-20 sm:w-20">
                  <Medal className="h-7 w-7 sm:h-10 sm:w-10" />
                </div>

                <p className="max-w-[10rem] text-base leading-6 font-semibold text-gold sm:mt-6 sm:text-lg">
                  Your premium escape from ordinary
                </p>
              </div>
            </div>

            <div
              className={cn(
                "flex justify-center transition-all delay-1000 duration-700 ease-out sm:justify-end",
                inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              )}
            >
              <Button className="w-full sm:w-auto sm:min-w-55">
                <Link href="/booking">Book table</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
