"use client"

import { useState, useEffect, useRef } from "react"
import {
  User,
  Phone,
  MessageSquare,
  CreditCard,
  Loader2,
  CheckCircle,
  Send,
} from "lucide-react"
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"

import {
  createTestBooking,
  createTelegramAuthSession,
  checkTelegramAuthStatus,
} from "@/app/booking/actions"
import BookingSummary from "./BookingSummary"
import PaymentReceipt from "./PaymentReceipt"
import PaymentError from "./PaymentError"

interface CheckoutFormContentProps {
  selectedTable: string
  date: string
  time: string
  duration: number
  pricePerHour: number
  totalAmount: number
  prepaymentAmount: number
  remainingAmount: number
}

type PaymentStatus = "idle" | "processing" | "success" | "error"

export default function CheckoutFormContent(props: CheckoutFormContentProps) {
  const stripe = useStripe()
  const elements = useElements()

  // Main form states
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    comment: "",
  })

  const [formErrors, setFormErrors] = useState({
    name: false,
    phoneVerified: false, // Validates whether the Telegram verification milestone passed
  })

  // Telegram authorization states
  const [telegramChatId, setTelegramChatId] = useState<string | null>(null)
  const [isTelegramLoading, setIsTelegramLoading] = useState(false)
  const [isPhoneVerified, setIsPhoneVerified] = useState(false)
  const [pollingActive, setPollingActive] = useState(false)
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Stripe payment states
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [receiptNumber, setReceiptNumber] = useState("")

  useEffect(() => {
    if (paymentStatus === "success") {
      setReceiptNumber(`BK-${Math.floor(100000 + Math.random() * 900000)}`)
    }
  }, [paymentStatus])

  // Safely clean up the polling interval when the component unmounts
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current)
    }
  }, [])

  // Handle Telegram authorization button click
  const handleTelegramAuth = async () => {
    setIsTelegramLoading(true)
    setFormErrors((prev) => ({ ...prev, phoneVerified: false }))

    const result = await createTelegramAuthSession()

    if (!result.success || !result.token || !result.link) {
      setErrorMessage(
        result.error || "Failed to initialize the bot. Please try again later."
      )
      setIsTelegramLoading(false)
      return
    }

    // Open the bot link in a new browser tab
    window.open(result.link, "_blank")
    setPollingActive(true)

    // Start polling (querying the database every 2 seconds)
    pollingIntervalRef.current = setInterval(async () => {
      const statusCheck = await checkTelegramAuthStatus(result.token!)

      if (statusCheck.success && statusCheck.status === "APPROVED") {
        // Populate form data using values captured by the webhook channel
        setFormData((prev) => ({ ...prev, phone: statusCheck.phone || "" }))
        setTelegramChatId(statusCheck.chatId || null)
        setIsPhoneVerified(true)
        setPollingActive(false)
        setIsTelegramLoading(false)

        if (pollingIntervalRef.current)
          clearInterval(pollingIntervalRef.current)
      }
    }, 2000)
  }

  // Main submission handler for the entire form (Pay Button)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const hasNameError = !formData.name || !formData.name.trim()
    const hasPhoneVerifiedError = !isPhoneVerified

    setFormErrors({
      name: hasNameError,
      phoneVerified: hasPhoneVerifiedError,
    })

    // Stop execution if basic validation criteria fail
    if (hasNameError || hasPhoneVerifiedError) return

    if (!stripe || !elements || paymentStatus === "processing") return
    setPaymentStatus("processing")

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      })

      if (error) {
        setErrorMessage(
          error.message || "Something went wrong with the card transaction."
        )
        setPaymentStatus("error")
        return
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        // Send the booking data to the database including the associated telegramChatId
        const result = await createTestBooking({
          tableId: props.selectedTable,
          date: props.date,
          time: props.time,
          duration: props.duration,
          comment: formData.comment,
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          paymentIntentId: paymentIntent.id,
          telegramChatId: telegramChatId || undefined,
        })

        if (result.success) {
          setPaymentStatus("success")
        } else {
          setErrorMessage(
            result.error || "Payment passed, but Database recording failed."
          )
          setPaymentStatus("error")
        }
      }
    } catch (error) {
      setErrorMessage("Network error occurred. Please try again.")
      setPaymentStatus("error")
    }
  }

  if (paymentStatus === "success") {
    return (
      <PaymentReceipt
        formData={formData}
        receiptNumber={receiptNumber}
        {...props}
      />
    )
  }

  if (paymentStatus === "error") {
    return (
      <PaymentError
        errorMessage={errorMessage}
        onRetry={() => setPaymentStatus("idle")}
      />
    )
  }

  return (
    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
      {/* Left Column: Personal Information Form Wrapper (7 of 12 grid blocks) */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 border border-white/10 bg-[#0b1e3f]/20 p-6 shadow-2xl md:p-8 lg:col-span-7"
      >
        <h2 className="border-b border-white/5 pb-3 text-lg font-bold tracking-wider text-amber-400 uppercase">
          Personal Information
        </h2>

        {/* Guest Full Name Input Box */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
            <User size={14} className="text-amber-500/80" />
            Name *
          </label>
          <input
            type="text"
            placeholder="John"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value })
              if (formErrors.name) setFormErrors({ ...formErrors, name: false })
            }}
            className={`w-full border px-4 py-3.5 text-base text-white placeholder-slate-400 transition-all focus:ring-1 focus:outline-none ${
              formErrors.name
                ? "animate-shake border-rose-500 bg-rose-950/10 focus:border-rose-500 focus:ring-rose-500/50"
                : "border-white/10 focus:border-amber-500/50 focus:ring-amber-500/50"
            }`}
          />
          {formErrors.name && (
            <p className="text-[11px] font-bold tracking-wide text-rose-400 uppercase">
              Please enter your name
            </p>
          )}
        </div>

        {/* Contact Input Field Protected by Telegram Verification Gateways */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
            <Phone size={14} className="text-amber-500/80" />
            Phone Number *
          </label>

          {isPhoneVerified ? (
            /* State: Phone number verified successfully */
            <div className="flex w-full items-center justify-between border border-emerald-500/30 bg-emerald-950/20 px-4 py-3.5 text-emerald-400">
              <span className="font-mono text-base font-semibold tracking-wide">
                {formData.phone}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase">
                <CheckCircle size={15} className="text-emerald-400" /> Verified
                via TG
              </span>
            </div>
          ) : (
            /* State: Trigger authorization fallback request block button */
            <button
              type="button"
              onClick={handleTelegramAuth}
              disabled={isTelegramLoading}
              className={`flex w-full cursor-pointer items-center justify-center gap-3 border px-4 py-3.5 text-xs font-bold tracking-widest uppercase transition-all disabled:cursor-not-allowed disabled:opacity-60 ${
                formErrors.phoneVerified
                  ? "animate-shake border-rose-500 bg-rose-950/20 text-rose-400 hover:bg-rose-950/30"
                  : "border-sky-500/30 bg-sky-500/10 text-sky-400 hover:bg-sky-500/20"
              }`}
            >
              {isTelegramLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin text-sky-400" />
                  <span>
                    {pollingActive
                      ? "Waiting for button click in bot..."
                      : "Launching bot..."}
                  </span>
                </>
              ) : (
                <>
                  <Send size={15} className="-rotate-12 text-sky-400" />
                  <span>Verify Phone via Telegram</span>
                </>
              )}
            </button>
          )}

          {formErrors.phoneVerified && (
            <p className="text-[11px] font-bold tracking-wide text-rose-400 uppercase">
              Please verify your phone number via Telegram before paying
            </p>
          )}
        </div>

        {/* Special Requests Comment Block */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
            <MessageSquare size={14} className="text-amber-500/80" />
            Special Requests
          </label>
          <textarea
            rows={3}
            placeholder="Any preferences..."
            value={formData.comment}
            onChange={(e) =>
              setFormData({ ...formData, comment: e.target.value })
            }
            className="w-full resize-none border border-white/10 px-4 py-3.5 text-base text-white placeholder-slate-400 transition-all focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 focus:outline-none"
          />
        </div>

        {/* Native Stripe Card Element Mount Area */}
        <div className="space-y-3 border-t border-white/5 pt-4">
          <h2 className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
            <CreditCard size={14} className="text-amber-500" /> Card Details
          </h2>
          <div className="#0b1e3f border border-white/10 p-4">
            <PaymentElement options={{ layout: "tabs" }} />
          </div>
        </div>
      </form>

      {/* Right Column: Order Detail Summary Grid Layout Block (5 of 12 blocks) */}
      <div className="space-y-6 lg:col-span-5">
        <BookingSummary
          {...props}
          onSubmit={handleSubmit}
          isProcessing={paymentStatus === "processing"}
          isStripeReady={!!stripe}
        />
      </div>
    </div>
  )
}
