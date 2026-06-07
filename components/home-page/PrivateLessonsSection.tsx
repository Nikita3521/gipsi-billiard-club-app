"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Phone } from "lucide-react"
import { cn } from "@/consts/utils"
import { trainers } from "@/consts/trainers"

export default function PrivateLessonsSection() {
  const [activeTrainer, setActiveTrainer] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveTrainer((current) => (current + 1) % trainers.length)
    }, 4500)

    return () => window.clearInterval(interval)
  }, [])

  const totalTrainers = trainers.length

  const goToPrevious = () => {
    setActiveTrainer((current) =>
      current === 0 ? totalTrainers - 1 : current - 1
    )
  }

  const goToNext = () => {
    setActiveTrainer((current) => (current + 1) % totalTrainers)
  }

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,#0b2347_0%,#07142b_56%,#000000_100%)] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 lg:py-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.42em] text-gold/80 uppercase">
            Private lessons
          </p>

          <h2 className="mt-3 text-3xl leading-tight font-black tracking-[-0.05em] text-white sm:text-5xl">
            Training with our coaches
          </h2>

          <div className="mx-auto mt-4 h-1 w-28 bg-gold/80" />
        </div>

        <div className="mt-10">
          <div className="relative overflow-hidden border border-white/10 bg-[#08152b]/95 text-white shadow-[0_26px_90px_rgba(0,0,0,0.45)] lg:h-[500px]">
            {trainers.map((trainer, index) => (
              <article
                key={trainer.name}
                className={cn(
                  "absolute inset-0 grid transition-all duration-700 ease-out lg:grid-cols-[minmax(18rem,0.42fr)_minmax(0,0.58fr)]",
                  index === activeTrainer
                    ? "translate-x-0 opacity-100"
                    : "pointer-events-none translate-x-2 opacity-0"
                )}
                aria-hidden={index !== activeTrainer}
              >
                <div className="relative min-h-[320px] overflow-hidden lg:min-h-0">
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover object-center"
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,20,43,0.05)_0%,rgba(7,20,43,0.12)_40%,rgba(7,20,43,0.8)_100%)]" />

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <div className="inline-flex items-center gap-2 border border-white/15 bg-black/30 px-3 py-2 text-[0.62rem] font-semibold tracking-[0.34em] text-white uppercase backdrop-blur-sm">
                      <span className="h-2 w-2 rounded-full bg-gold" />
                      Trainer {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                </div>

                <div className="flex h-full flex-col justify-between p-6 sm:p-8 lg:p-10">
                  <div>
                    <p className="text-[0.62rem] font-semibold tracking-[0.34em] text-gold/70 uppercase">
                      Your professional coach
                    </p>

                    <h3 className="mt-3 text-2xl leading-[1.05] font-black tracking-[-0.04em] text-white sm:text-[2.1rem]">
                      {trainer.name}
                    </h3>

                    <div className="mt-5 h-px bg-white/10" />

                    <ul className="mt-5 grid gap-x-8 gap-y-3 text-sm leading-6 text-white/75 sm:text-[0.95rem] md:grid-cols-2">
                      {trainer.bio.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                          <span className="min-w-0">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <a
                      href={`tel:${trainer.number.replace(/[^\d+]/g, "")}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-white/90 transition-colors hover:text-gold"
                    >
                      <Phone className="h-4 w-4 text-gold" />
                      {trainer.number}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-5 flex justify-center gap-2">
            {trainers.map((trainer, index) => (
              <button
                key={trainer.name}
                type="button"
                onClick={() => {
                  setActiveTrainer(index)
                }}
                aria-label={`Show trainer ${index + 1}`}
                className={cn(
                  "grid h-8 min-w-8 place-items-center rounded-full border text-xs font-semibold transition-all",
                  index === activeTrainer
                    ? "border-gold bg-gold text-white"
                    : "border-white/15 bg-white/5 text-white/70 hover:border-gold/60 hover:text-gold"
                )}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
