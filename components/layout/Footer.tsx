import Image from "next/image"
import Link from "next/link"
import { openingHours } from "@/consts/openingHours"
import {
  instagramUrl,
  number,
  email,
  googleMapsReviewsUrl,
} from "@/consts/links"
import { Phone, Mail } from "lucide-react"
import { location } from "@/consts/location"
import { navigation } from "@/consts/navigation"

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#111827] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[auto_auto_auto_auto_auto]">
          <div className="flex flex-col gap-1">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.webp"
                alt="Gipsi Billiard Club logo"
                width={50}
                height={50}
                className="h-14 w-14 object-contain"
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
            <p className="text-sm leading-6 text-white/60">
              Your premium escape from ordinary
            </p>
            <p className="mt-auto text-xs text-white/50">
              © 2026 Gipsi Billiard Club. All rights reserved.
            </p>
          </div>
          <div className="max-w-[150px] text-center">
            <h3 className="mb-4 text-xs font-bold tracking-[0.2em] text-gold uppercase">
              Location
            </h3>
            <Link href={googleMapsReviewsUrl} target="_blank" rel="noreferrer">
              <p className="text-sm text-white/70 transition-colors hover:text-gold">
                {location}
              </p>
            </Link>
          </div>

          <div className="max-w-[150px]">
            <h3 className="mb-4 text-xs font-bold tracking-[0.2em] text-gold uppercase">
              Navigation
            </h3>
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-center text-xs font-bold tracking-[0.2em] text-gold uppercase">
              Opening Hours
            </h3>
            <ul className="space-y-2">
              {openingHours.map((item) => (
                <li
                  key={item.day}
                  className="flex justify-between gap-4 text-sm"
                >
                  <span className="text-white/70">{item.day}</span>
                  <span className="text-white/70">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold tracking-[0.2em] text-gold uppercase">
              Contact & Socials
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${number.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-gold"
                >
                  <Phone className="h-4 w-4" />
                  {number}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-gold"
                >
                  <Mail className="h-4 w-4" />
                  {email}
                </a>
              </li>
              <li>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-gold"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
