import { CheckCircle2, Receipt } from "lucide-react"

interface PaymentReceiptProps {
  formData: {
    name: string
    phone: string
  }
  receiptNumber: string
  selectedTable: string
  date: string
  time: string
  duration: number
  totalAmount: number
  prepaymentAmount: number
  remainingAmount: number
}

export default function PaymentReceipt({
  formData,
  receiptNumber,
  selectedTable,
  date,
  time,
  duration,
  totalAmount,
  prepaymentAmount,
  remainingAmount,
}: PaymentReceiptProps) {
  return (
    <div className="mx-auto max-w-xl animate-in border border-emerald-500/30 bg-[#0b1e3f]/20 p-6 shadow-2xl shadow-emerald-950/20 duration-500 fade-in zoom-in md:p-8">
      <div className="flex flex-col items-center border-b border-white/5 pb-6 text-center">
        <div className="relative mb-4">
          <div className="absolute inset-0 animate-pulse rounded-full bg-emerald-500/20 blur-xl" />
          <CheckCircle2
            size={68}
            className="relative animate-bounce text-emerald-400"
          />
        </div>
        <h2 className="bg-gradient-to-r from-emerald-200 to-emerald-400 bg-clip-text text-2xl font-black tracking-widest text-transparent uppercase">
          Booking Confirmed
        </h2>
        <div className="mt-2 flex items-center gap-1.5 font-mono text-xs tracking-wider text-slate-400 uppercase">
          <Receipt size={12} className="text-slate-500" />
          <span>Receipt {receiptNumber}</span>
        </div>
      </div>

      <div className="mt-6 space-y-4 font-mono text-sm">
        <div className="flex justify-between border-b border-white/5 pb-2">
          <span className="text-xs text-slate-500 uppercase">Customer:</span>
          <span className="font-semibold text-white">{formData.name}</span>
        </div>
        <div className="flex justify-between border-b border-white/5 pb-2">
          <span className="text-xs text-slate-500 uppercase">Phone:</span>
          <span className="font-semibold text-slate-300">{formData.phone}</span>
        </div>
        <div className="flex justify-between border-b border-white/5 pb-2">
          <span className="text-xs text-slate-500 uppercase">
            Selected table:
          </span>
          <span className="font-bold text-amber-400 uppercase">
            Table {selectedTable}
          </span>
        </div>
        <div className="flex justify-between border-b border-white/5 pb-2">
          <span className="text-xs text-slate-500 uppercase">Schedule:</span>
          <span className="font-semibold text-slate-200">
            {date} at {time}
          </span>
        </div>
        <div className="flex justify-between border-b border-white/5 pb-2">
          <span className="text-xs text-slate-500 uppercase">Duration:</span>
          <span className="font-semibold text-slate-200">
            {duration} {duration === 1 ? "hour" : "hours"}
          </span>
        </div>

        <div className="mt-6 space-y-2.5 border-t border-dashed border-white/10 pt-4">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Total Rent Cost:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>

          <div className="my-2 flex items-center justify-between border border-emerald-500/20 bg-emerald-500/5 p-3.5">
            <span className="text-xs font-bold tracking-wider text-emerald-400 uppercase">
              Prepayment Paid (50%)
            </span>
            <span className="text-xl font-black text-emerald-400">
              ${prepaymentAmount.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between px-1 pt-1 text-xs text-slate-400">
            <span className="text-[11px] tracking-wider uppercase">
              Remaining balance (Pay at club):
            </span>
            <span className="border-b border-white/20 pb-0.5 font-bold text-white">
              ${remainingAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
