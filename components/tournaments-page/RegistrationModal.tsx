"use client"

import { useState } from "react"
import { X, CheckCircle2 } from "lucide-react"
import Button from "../ui/button"

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function RegistrationModal({
  isOpen,
  onClose,
}: RegistrationModalProps) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const isValid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    phone.trim().length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return

    setIsSubmitting(true)

    // TODO: заменить на реальный запрос к API
    await new Promise((resolve) => setTimeout(resolve, 600))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setIsSubmitted(false)
      setFirstName("")
      setLastName("")
      setPhone("")
    }, 300)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex animate-in items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm duration-200 fade-in"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md animate-in border border-white/10 bg-[#0b1e3f] p-8 shadow-[0_28px_80px_rgba(0,0,0,0.5)] duration-300 zoom-in-95 fade-in"
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 text-white/50 transition-colors hover:text-white"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {isSubmitted ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-gold/10 ring-1 ring-gold/40">
              <CheckCircle2 className="h-8 w-8 text-gold" />
            </div>
            <h3 className="text-xl font-bold text-white">
              You&apos;re registered!
            </h3>
            <p className="text-sm leading-6 text-white/60">
              We&apos;ve saved your spot for the tournament. We&apos;ll contact
              you at <span className="font-semibold text-gold">{phone}</span> if
              anything changes.
            </p>
            <Button className="mt-2 w-full" onClick={handleClose}>
              Close
            </Button>
          </div>
        ) : (
          <>
            <p className="text-xs font-semibold tracking-[0.3em] text-gold/80 uppercase">
              Tournament sign-up
            </p>
            <h3 className="mt-2 text-2xl font-black text-white">
              Reserve your spot
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Fill in your details and we&apos;ll confirm your registration.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="text-xs font-semibold tracking-[0.15em] text-white/50 uppercase"
                >
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  className="mt-2 w-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold/60 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="text-xs font-semibold tracking-[0.15em] text-white/50 uppercase"
                >
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Smith"
                  className="mt-2 w-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold/60 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="text-xs font-semibold tracking-[0.15em] text-white/50 uppercase"
                >
                  Phone number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 234 567 8900"
                  className="mt-2 w-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold/60 focus:outline-none"
                />
              </div>

              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="mt-2 w-full disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isSubmitting ? "Submitting..." : "Confirm registration"}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
