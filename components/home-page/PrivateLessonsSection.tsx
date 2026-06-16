import CarouselGeneral from "../ui/CarouselGeneral"
import { trainers } from "@/consts/trainers"

export default function PrivateLessonsSection() {
  return (
    <section className="relative overflow-hidden text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 lg:py-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.42em] text-gold/80 uppercase">
            Private lessons
          </p>

          <h2 className="mt-3 text-3xl leading-tight font-black text-white sm:text-5xl">
            Training with our coaches
          </h2>

          <div className="mx-auto mt-4 h-1 w-28 bg-gold/80" />
        </div>

        <div className="mt-10">
          <CarouselGeneral items={trainers} />
        </div>
      </div>
    </section>
  )
}
