import Link from "next/link"
import Button from "../ui/button"

export default function WelcomeSection() {
  return (
    <section className="min-h-[calc(100vh-64px)] bg-[url('/images/background_1.webp')] bg-cover bg-[center_20%] pt-24 sm:bg-fixed sm:pt-30">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:py-16">
        <div className="items-left flex max-w-xl flex-col justify-center gap-6 text-white sm:gap-8">
          <div className="space-y-3">
            <div className="overflow-hidden">
              <h1 className="animate-[revealUp_0.9s_cubic-bezier(0.25,1,0.5,1)_forwards] text-4xl font-bold sm:text-5xl lg:text-6xl">
                YOUR FREEDOM FROM ROUTINE
              </h1>
            </div>
            <div className="h-[3px] w-0 animate-[growLine_1s_ease-out_0.6s_forwards] bg-gold shadow-[0_0_12px_rgba(212,175,55,0.6)]" />
          </div>

          <p className="animate-in text-base leading-7 font-light delay-500 duration-1000 fill-mode-both fade-in sm:text-lg sm:leading-8 lg:text-xl">
            Step into our luxurious billiards and lounge where the daily grind
            fades away. Whether you&apos;re looking to unwind with friends,
            enjoy a game of pool, or simply relax in a stylish setting, we offer
            the perfect haven.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-1">
            <Link
              href="#details"
              className="inline-block animate-[springIn_0.7s_ease-out_0.8s_backwards]"
            >
              <Button className="w-full sm:w-auto">DETAILS</Button>
            </Link>
            <Link
              href="/booking"
              className="inline-block animate-[springIn_0.7s_ease-out_0.95s_backwards]"
            >
              <Button className="w-full sm:w-auto">BOOK TABLE</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
