import Image from "next/image"

export default function WelcomeSection() {
  return (
    <section className="relative isolate overflow-hidden text-white">
      <div className="relative mx-auto w-full max-w-7xl px-4 pt-20 lg:pt-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="space-y-5">
            <p className="text-xs font-semibold tracking-[0.25em] text-gold/80 uppercase">
              Book your game
            </p>

            <h1 className="text-6xl leading-tight font-black tracking-[0.05em] text-white sm:text-5xl lg:text-7xl lg:leading-[1.05]">
              BOOKING
            </h1>

            <div className="h-1 w-32 bg-gold/80" />

            <p className="max-w-xl text-base leading-7 font-light text-white/70 sm:text-lg">
              Reserve your table in advance and enjoy the game. Experience the
              prestige and camaraderie that billiards bring at Gipsi Billiard
              Club.
            </p>
          </div>

          <div className="hidden lg:block">
            <div className="relative aspect-2/1 overflow-hidden">
              <Image
                src="/images/tableGipsi.webp"
                alt="Gipsi Billiard Table"
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                className="scale-[1.01] object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,20,43,0.35)_0%,rgba(7,20,43,0.15)_50%,rgba(7,20,43,1)_100%)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
