"use client"

import { Mail, Phone } from "lucide-react"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/consts/utils"
import { email, number, instagramUrl } from "@/consts/links"

export default function ContactsPage() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2)

  return (
    <div className="relative flex min-h-[calc(100vh-356px)] items-center justify-center overflow-hidden bg-[#07142b] text-white">
      <div ref={ref} className="mx-auto w-full max-w-5xl px-4">
        {/* Header */}
        <div className="text-center">
          <p
            className={cn(
              "text-xs font-semibold tracking-[0.4em] text-gold/80 uppercase transition-all duration-700",
              inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            )}
          >
            Get in touch
          </p>

          <h1
            className={cn(
              "mt-4 text-4xl font-black text-white transition-all delay-150 duration-700 sm:text-6xl",
              inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            )}
          >
            CONTACT US
          </h1>

          <div
            className={cn(
              "mx-auto mt-5 h-1 bg-gold/80 shadow-[0_0_10px_rgba(212,175,55,0.5)] transition-all delay-300 duration-700",
              inView ? "w-28" : "w-0"
            )}
          />
        </div>

        {/* Contacts */}
        <div
          className={cn(
            "mx-auto mt-10 grid w-full max-w-5xl grid-cols-1 border-y border-white/10 sm:grid-cols-3",
            "transition-all delay-500 duration-700",
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          )}
        >
          {/* Instagram */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 border-b border-white/10 px-6 py-6 transition-colors hover:bg-white/[0.03] sm:border-r sm:border-b-0"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold/40 text-gold transition-colors group-hover:border-gold">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-5 w-5"
              >
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-white/40 uppercase">
                Instagram
              </p>

              <p className="mt-1 text-sm font-semibold break-all text-white transition-colors group-hover:text-gold">
                @gipsibilliardclub
              </p>
            </div>
          </a>

          {/* Phone */}
          <a
            href={`tel:${number}`}
            className="group flex items-start gap-4 border-b border-white/10 px-6 py-6 transition-colors hover:bg-white/[0.03] sm:border-r sm:border-b-0"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold/40 text-gold transition-colors group-hover:border-gold">
              <Phone className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-white/40 uppercase">
                Phone
              </p>

              <p className="mt-1 text-sm font-semibold break-words text-white">
                {number}
              </p>
            </div>
          </a>

          {/* Email */}
          <div className="flex items-start gap-4 px-6 py-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold/40 text-gold">
              <Mail className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-white/40 uppercase">
                Email
              </p>

              <p className="mt-1 text-sm font-semibold break-all text-white">
                {email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
