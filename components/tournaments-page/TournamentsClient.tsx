"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, Trophy, Users, MapPin, DollarSign } from "lucide-react"
import { cn } from "@/consts/utils"
import { useInView } from "@/hooks/useInView"
import Button from "@/components/ui/button"
import RegistrationModal from "@/components/tournaments-page/RegistrationModal"

interface Tournament {
  id: string
  title: string
  image: string | null
  date: Date
  time: string
  location: string
  prize: string
  format: string
  maxParticipants: number
  entryFee: string
  description: string
  rules: string[]
  registeredCount: number
}

interface TournamentsClientProps {
  tournament: Tournament
}

export default function TournamentsClient({
  tournament,
}: TournamentsClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { ref: headerRef, inView: headerInView } =
    useInView<HTMLDivElement>(0.3)

  const { ref: cardRef, inView: cardInView } = useInView<HTMLDivElement>(0.1)

  const spotsLeft = tournament.maxParticipants - tournament.registeredCount

  const registrationPercentage =
    (tournament.registeredCount / tournament.maxParticipants) * 100

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07142b] text-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-12 lg:py-12">
        {/* Header */}
        <div ref={headerRef} className="mx-auto max-w-2xl text-center">
          <p
            className={cn(
              "text-xs font-semibold tracking-[0.4em] text-gold/80 uppercase transition-all duration-700 ease-out",
              headerInView
                ? "translate-y-0 opacity-100"
                : "translate-y-3 opacity-0"
            )}
          >
            Compete with the best
          </p>

          <div className="mt-4 overflow-hidden">
            <h1
              className={cn(
                "text-4xl leading-tight font-black text-white transition-transform delay-150 duration-700 ease-out sm:text-6xl",
                headerInView ? "translate-y-0" : "translate-y-full"
              )}
            >
              OUR TOURNAMENTS
            </h1>
          </div>

          <div
            className={cn(
              "mx-auto mt-5 h-1 bg-gold/80 shadow-[0_0_10px_rgba(212,175,55,0.5)] transition-all delay-300 duration-700 ease-out",
              headerInView ? "w-28" : "w-0"
            )}
          />

          <p
            className={cn(
              "mt-6 text-base leading-7 text-white/70 transition-all delay-500 duration-700 ease-out sm:text-lg",
              headerInView
                ? "translate-y-0 opacity-100"
                : "translate-y-3 opacity-0"
            )}
          >
            One tournament, one champion. Here&apos;s what&apos;s coming up next
            at Gipsi Billiard Club.
          </p>
        </div>

        {/* Tournament */}
        <div
          ref={cardRef}
          className={cn(
            "mt-8 overflow-hidden border border-white/10 bg-white/[0.03] shadow-[0_28px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-1000 ease-out",
            cardInView
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          )}
        >
          <div className="grid lg:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-[4/3] lg:aspect-auto">
              <Image
                src="/images/tournament.webp"
                alt={tournament.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-fill object-center"
              />

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,20,43,0.1)_0%,rgba(7,20,43,0.2)_60%,rgba(7,20,43,0.7)_100%)] lg:bg-[linear-gradient(90deg,rgba(7,20,43,0.1)_0%,rgba(7,20,43,0.1)_10%,rgba(7,20,43,0.85)_100%)]" />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center gap-6 p-8 sm:p-10">
              <div>
                <h2 className="text-2xl font-black text-white sm:text-3xl">
                  {tournament.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-white/65 sm:text-base">
                  {tournament.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-gold" />

                  <div>
                    <p className="text-xs text-white/50 uppercase">Date</p>

                    <p className="text-sm font-semibold text-white">
                      {new Date(tournament.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>

                    <p className="text-xs text-white/50">{tournament.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />

                  <div>
                    <p className="text-xs text-white/50 uppercase">Location</p>

                    <p className="text-sm font-semibold text-white">
                      {tournament.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Trophy className="mt-0.5 h-5 w-5 shrink-0 text-gold" />

                  <div>
                    <p className="text-xs text-white/50 uppercase">Prize</p>

                    <p className="text-sm font-semibold text-white">
                      {tournament.prize}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="mt-0.5 h-5 w-5 shrink-0 text-gold" />

                  <div>
                    <p className="text-xs text-white/50 uppercase">Entry fee</p>

                    <p className="text-sm font-semibold text-white">
                      {tournament.entryFee}
                    </p>
                  </div>
                </div>
              </div>

              {/* Participants */}
              <div className="border border-white/10 bg-white/5 px-5 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gold" />

                    <span className="text-sm font-semibold text-white">
                      {tournament.registeredCount} /{" "}
                      {tournament.maxParticipants} registered
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-gold">
                    {spotsLeft} spots left
                  </span>
                </div>

                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gold transition-all duration-700 ease-out"
                    style={{
                      width: cardInView ? `${registrationPercentage}%` : "0%",
                    }}
                  />
                </div>
              </div>

              <Button onClick={() => setIsModalOpen(true)} className="w-full">
                Register now
              </Button>
            </div>
          </div>
        </div>

        {/* Rules */}
        <div
          className={cn(
            "mx-auto mt-16 max-w-3xl transition-all delay-300 duration-700 ease-out",
            cardInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          )}
        >
          <h3 className="text-center text-lg font-bold tracking-widest text-gold uppercase">
            Tournament rules
          </h3>

          <ul className="mt-6 grid grid-cols-1 gap-1 sm:grid-cols-2">
            {tournament.rules.map((rule) => (
              <li
                key={rule}
                className="flex items-center gap-2 text-sm leading-6 text-white/70 before:mt-0.5 before:text-gold before:content-['✓']"
              >
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tournamentId={tournament.id}
      />
    </div>
  )
}
