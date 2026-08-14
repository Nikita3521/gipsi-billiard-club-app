import { XCircle, RefreshCw } from "lucide-react"

interface PaymentErrorProps {
  errorMessage: string
  onRetry: () => void
}

export default function PaymentError({
  errorMessage,
  onRetry,
}: PaymentErrorProps) {
  return (
    <div className="flex min-h-[450px] w-full animate-in flex-col items-center justify-center border border-rose-500/20 bg-rose-950/10 p-8 text-center shadow-2xl shadow-rose-950/20 duration-500 fade-in zoom-in">
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-rose-500/20 blur-xl" />
        <XCircle size={74} className="relative animate-pulse text-rose-500" />
      </div>
      <h2 className="bg-gradient-to-r from-rose-200 to-rose-400 bg-clip-text text-2xl font-black tracking-widest text-transparent uppercase md:text-3xl">
        Transaction Failed
      </h2>
      <p className="mt-3 max-w-md border border-rose-500/10 bg-rose-950/30 px-4 py-2 font-mono text-xs font-semibold tracking-wider text-rose-400/90 uppercase">
        {errorMessage}
      </p>
      <button
        onClick={onRetry}
        className="mt-8 flex cursor-pointer items-center space-x-2 border border-white/10 bg-white/5 px-6 py-3 font-mono text-xs font-bold tracking-widest text-white uppercase transition-all hover:bg-white/10 hover:text-amber-400 active:scale-95"
      >
        <RefreshCw size={14} />
        <span>Try Again</span>
      </button>
    </div>
  )
}
