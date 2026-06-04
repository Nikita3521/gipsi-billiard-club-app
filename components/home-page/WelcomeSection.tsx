import Link from "next/link"
import Button from "../ui/button"

export default function WelcomeSection() {
  return (
    <section className="min-h-[calc(100vh-64px)] bg-[url('/images/background_1.webp')] bg-cover bg-fixed bg-[center_20%] pt-30">
      <div className={"mx-auto w-full max-w-7xl px-4"}>
        <div className="items-left flex max-w-xl flex-col justify-center gap-8 text-white">
          <h1 className={"text-6xl font-bold"}>YOUR FREEDOM FROM ROUTINE</h1>
          <p className="text-xl font-light">
            Step into our luxurious billiards and lounge where the daily grind
            fades away. Whether you&apos;re looking to unwind with friends,
            enjoy a game of pool, or simply relax in a stylish setting, we offer
            the perfect haven.
          </p>
          <div className="flex gap-1">
            <Link href="#details">
              <Button>DETAILS</Button>
            </Link>
            <Link href="/booking">
              <Button>BOOK TABLE</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
