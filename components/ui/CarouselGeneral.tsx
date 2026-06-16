"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/consts/utils"
import { Phone } from "lucide-react"

interface CarouselItem {
  name?: string
  image?: string
  bio?: string[]
  number?: string
  src?: string
  alt?: string
  label?: string
}

interface CarouselGeneralProps {
  items: CarouselItem[]
  interval?: number
  renderItem?: (
    item: CarouselItem,
    index: number,
    isActive: boolean
  ) => React.ReactNode
  hideDots?: boolean
  className?: string
  activeIndex?: number
  onActiveChange?: (index: number) => void
  isPlaying?: boolean
}

export default function CarouselGeneral({
  items,
  interval = 4500,
  renderItem,
  hideDots = false,
  className = "",
  activeIndex: externalActive,
  onActiveChange,
  isPlaying: externalIsPlaying = true,
}: CarouselGeneralProps) {
  const [internalActive, setInternalActive] = useState(0)
  const active = externalActive !== undefined ? externalActive : internalActive
  const isPlaying = externalActive !== undefined ? externalIsPlaying : true

  useEffect(() => {
    if (!isPlaying) return

    const intervalId = window.setInterval(() => {
      const next = (active + 1) % items.length

      if (externalActive === undefined) {
        setInternalActive(next)
      } else {
        onActiveChange?.(next)
      }
    }, interval)

    return () => window.clearInterval(intervalId)
  }, [
    active,
    items.length,
    interval,
    isPlaying,
    externalActive,
    onActiveChange,
  ])

  const handleSetActive = (index: number) => {
    if (externalActive === undefined) {
      setInternalActive(index)
    }
    if (onActiveChange) {
      onActiveChange(index)
    }
  }

  return (
    <>
      <div
        className={cn(
          "relative overflow-hidden border border-white/10 bg-[#08152b]/95 text-white shadow-[0_26px_90px_rgba(0,0,0,0.45)] lg:h-[500px]",
          className
        )}
      >
        {items.map((item, index) => (
          <article
            key={item.name || item.src}
            className={cn(
              "absolute inset-0 grid transition-all duration-700 ease-out lg:grid-cols-[minmax(18rem,0.42fr)_minmax(0,0.58fr)]",
              index === active
                ? "translate-x-0 opacity-100"
                : "pointer-events-none translate-x-2 opacity-0"
            )}
            aria-hidden={index !== active}
          >
            {renderItem ? (
              renderItem(item, index, index === active)
            ) : (
              <>
                {item.image && item.name && (
                  <>
                    <div className="relative min-h-[320px] overflow-hidden lg:min-h-0">
                      <Image
                        src={item.image}
                        alt={item.name}
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
                          {item.name}
                        </h3>

                        <div className="mt-5 h-px bg-white/10" />

                        {item.bio && (
                          <ul className="mt-5 grid gap-x-8 gap-y-3 text-sm leading-6 text-white/75 sm:text-[0.95rem] md:grid-cols-2">
                            {item.bio.map((bioItem) => (
                              <li key={bioItem} className="flex gap-3">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                                <span className="min-w-0">{bioItem}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {item.number && (
                        <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                          <a
                            href={`tel:${item.number.replace(/[^\d+]/g, "")}`}
                            className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-white/90 transition-colors hover:text-gold"
                          >
                            <Phone className="h-4 w-4 text-gold" />
                            {item.number}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
          </article>
        ))}
      </div>
      {!hideDots && (
        <div className="mt-5 flex justify-center gap-2">
          {items.map((item, index) => (
            <button
              key={item.name || item.src}
              type="button"
              onClick={() => {
                handleSetActive(index)
              }}
              aria-label={`Show item ${index + 1}`}
              className={cn(
                "grid cursor-pointer place-items-center text-xs font-semibold hover:scale-110 hover:border-[#C9A24E]",
                index === active
                  ? "h-5 w-5 scale-125 rounded-full bg-[#C9A24E] shadow-[0_0_12px_rgba(201,162,78,0.6)] transition-all duration-300"
                  : "h-5 w-5 rounded-full border border-white/20 bg-transparent transition-all duration-300"
              )}
            ></button>
          ))}
        </div>
      )}
    </>
  )
}
