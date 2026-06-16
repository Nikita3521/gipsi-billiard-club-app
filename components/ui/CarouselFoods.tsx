import Image from "next/image"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

type CarouselProps = {
  img: Array<{ src: string; alt: string; label: string }>
}

export default function CarouselFoods({ img }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % img.length)
    }, 2600)

    return () => {
      window.clearInterval(interval)
    }
  }, [])

  const visibleImg = Array.from({ length: 4 }, (_, index) => {
    return img[(activeIndex + index) % img.length]
  })

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {visibleImg.map((item) => (
        <motion.div
          key={`${item.src}-${activeIndex}`}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
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
  )
}
