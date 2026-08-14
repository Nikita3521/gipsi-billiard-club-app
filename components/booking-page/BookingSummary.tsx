import { CreditCard, Loader2, ShieldCheck } from "lucide-react"
import Button from "@/components/ui/button"

interface BookingSummaryProps {
  selectedTable: string
  date: string
  time: string
  duration: number
  pricePerHour: number
  totalAmount: number
  prepaymentAmount: number
  remainingAmount: number
  onSubmit: (e: React.FormEvent) => void
  isProcessing: boolean
  isStripeReady: boolean
}

export default function BookingSummary({
  selectedTable,
  date,
  time,
  duration,
  pricePerHour,
  totalAmount,
  prepaymentAmount,
  remainingAmount,
  onSubmit,
  isProcessing,
  isStripeReady,
}: BookingSummaryProps) {
  return (
    <div className="space-y-5 border border-white/10 p-6 shadow-2xl shadow-black/50">
      <h2 className="border-b border-white/5 pb-3 text-lg font-bold tracking-wider text-white uppercase">
        Booking Summary
      </h2>

      <div className="space-y-2.5 text-sm text-slate-400">
        <div className="flex justify-between">
          <span>Selected table:</span>
          <span className="font-semibold text-white uppercase">
            Table {selectedTable}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Date & Time:</span>
          <span className="font-semibold text-slate-200">
            {date} at {time}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Duration:</span>
          <span className="font-semibold text-slate-200">
            {duration} {duration === 1 ? "hour" : "hours"}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Rate:</span>
          <span className="font-semibold text-amber-400">
            ${pricePerHour} / hour
          </span>
        </div>
      </div>

      <div className="space-y-2 border-t border-white/5 pt-4 text-sm">
        <div className="flex justify-between text-slate-400">
          <span>Total Rent Price:</span>
          <span className="font-medium text-white">
            ${totalAmount.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span>Service Fee:</span>
          <span className="font-medium text-emerald-400">FREE</span>
        </div>

        <div className="mt-2 space-y-2 border-t border-dashed border-white/10 pt-3">
          <div className="flex items-center justify-between border border-amber-500/20 bg-amber-500/5 p-3">
            <span className="text-xs font-bold tracking-wider text-amber-400 uppercase">
              Prepayment (50%)
            </span>
            <span className="text-2xl font-black text-amber-400">
              ${prepaymentAmount.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between px-1 text-xs text-slate-500">
            <span>Pay at the club:</span>
            <span>${remainingAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Button
        onClick={onSubmit}
        disabled={isProcessing || !isStripeReady}
        className="flex w-full items-center justify-center space-x-2 py-4 text-lg font-bold tracking-widest text-white uppercase shadow-lg shadow-amber-500/10 transition-all duration-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isProcessing ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <CreditCard size={20} />
        )}
        <span>
          {isProcessing
            ? "Processing..."
            : `Pay Now $${prepaymentAmount.toFixed(2)}`}
        </span>
      </Button>

      <div className="flex items-center justify-center space-x-2 pt-2 text-[11px] text-slate-500">
        <ShieldCheck size={14} className="text-emerald-500/60" />
        <span>Secure SSL encrypted payment transaction</span>
      </div>
    </div>
  )
}
