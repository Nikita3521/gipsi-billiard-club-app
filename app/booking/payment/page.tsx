"use client"

import { useState, useEffect, Suspense } from "react"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

import CheckoutFormContent from "@/components/booking-page/CheckoutFormContent"
import { createPaymentIntentAction } from "../actions"

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

function PaymentPageContent() {
  const searchParams = useSearchParams()
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [stripeError, setStripeError] = useState<string | null>(null)

  const selectedTable = searchParams.get("table") || "1"
  const date = searchParams.get("date") || ""
  const time = searchParams.get("time") || ""
  const duration = Number(searchParams.get("duration") || 1)
  const pricePerHour = Number(searchParams.get("price") || 26)

  const totalAmount = pricePerHour * duration
  const prepaymentAmount = totalAmount * 0.5
  const remainingAmount = totalAmount - prepaymentAmount

  useEffect(() => {
    async function initPayment() {
      setClientSecret(null)
      setStripeError(null)

      const result = await createPaymentIntentAction(pricePerHour, duration)

      if (result.success && result.clientSecret) {
        setClientSecret(result.clientSecret)
      } else {
        setStripeError(result.error || "Не удалось загрузить платежный шлюз.")
      }
    }
    initPayment()
  }, [pricePerHour, duration])

  return (
    <div className="min-h-screen px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/booking"
          className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-slate-400 uppercase transition-colors hover:text-amber-400"
        >
          <ArrowLeft size={14} />
          <span>Back to floor plan</span>
        </Link>

        <h1 className="mt-4 mb-10 bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-3xl font-black tracking-wide text-transparent uppercase md:text-4xl">
          Checkout & Payment
        </h1>

        {stripeError ? (
          <div className="border border-rose-500/30 bg-rose-500/10 p-4 font-mono text-sm tracking-wide text-rose-400 uppercase">
            {stripeError}
          </div>
        ) : clientSecret ? (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: "night",
                variables: {
                  colorPrimary: "#f59e0b",
                  colorBackground: "#0b1e3f",
                  colorText: "#ffffff",
                },
              },
            }}
          >
            <CheckoutFormContent
              selectedTable={selectedTable}
              date={date}
              time={time}
              duration={duration}
              pricePerHour={pricePerHour}
              totalAmount={totalAmount}
              prepaymentAmount={prepaymentAmount}
              remainingAmount={remainingAmount}
            />
          </Elements>
        ) : (
          <PageLoader />
        )}
      </div>
    </div>
  )
}

function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center space-y-3 py-20">
      <Loader2 size={32} className="animate-spin text-amber-500" />
      <p className="font-mono text-sm tracking-wider text-slate-400 uppercase">
        Establishing secure connection...
      </p>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#020817]">
          <PageLoader />
        </div>
      }
    >
      <PaymentPageContent />
    </Suspense>
  )
}
