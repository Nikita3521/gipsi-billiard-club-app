import Image from "next/image"
import Link from "next/link"
import { NavLink } from "./NavLink"
import Button from "../ui/button"
import { navigation } from "@/consts/navigation"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#111827]/95 text-white backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-18">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.webp"
            alt="Gipsi Billiard Club logo"
            width={50}
            height={50}
            className="h-14 w-14 object-contain"
            priority
          />

          <div className="flex flex-col leading-none">
            <span className="text-[0.65rem] font-medium tracking-[0.28em] text-gold/80 uppercase">
              Gipsi
            </span>
            <span className="text-sm font-semibold tracking-[0.22em] text-white uppercase">
              Billiard Club
            </span>
          </div>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-6 lg:flex"
        >
          {navigation.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/booking">
            <Button>Book table</Button>
          </Link>
        </div>

        <details className="relative lg:hidden">
          <summary className="cursor-pointer list-none border border-white/10 px-4 py-2 text-sm font-medium tracking-[0.18em] text-white/80 uppercase transition-colors hover:border-gold hover:text-gold [&::-webkit-details-marker]:hidden">
            Menu
          </summary>

          <div className="absolute top-full right-0 mt-3 w-[min(22rem,calc(100vw-2rem))] border border-white/10 bg-[#111827] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
            <nav className="grid gap-1 p-3" aria-label="Mobile navigation">
              {navigation.map((item) => (
                <NavLink key={item.href} href={item.href}>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="border-t border-white/10 p-3">
              <Link
                href="/booking"
                className="flex h-11 items-center justify-center border border-gold bg-gold text-sm font-bold tracking-[0.18em] text-[#111827] uppercase transition-colors duration-200 hover:bg-transparent hover:text-gold"
              >
                Book table
              </Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  )
}
