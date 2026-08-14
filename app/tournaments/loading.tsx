export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07142b]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-gold" />

        <p className="text-sm font-medium tracking-widest text-white/50 uppercase">
          Loading tournament...
        </p>
      </div>
    </div>
  )
}
