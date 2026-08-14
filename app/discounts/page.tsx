"use client"

import { weeklyDiscounts } from "@/consts/weeklyDiscounts"

export default function DiscountsPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12 text-white sm:px-6 lg:px-8">
      {/* Стили для CSS keyframes анимации появления */}
      <style jsx global>{`
        @keyframes fadeInSlideUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-card-appear {
          animation: fadeInSlideUp 0.5s ease-out forwards;
        }
      `}</style>

      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div
          className="animate-card-appear mb-10 text-center"
          style={{ animationDelay: "0ms" }}
        >
          <h1 className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
            Weekly Specials
          </h1>
          <p className="mt-2 text-base text-slate-400 sm:text-lg">
            Every day brings a new reason to visit us for great deals
          </p>
        </div>

        {/* Weekly discounts list */}
        <div className="space-y-4">
          {weeklyDiscounts.map((item, index) => (
            <div
              key={item.id}
              style={{ animationDelay: `${(index + 1) * 90}ms` }}
              className={`animate-card-appear relative rounded-xl border border-l-4 border-white/10 bg-gradient-to-r p-6 opacity-0 transition-none ${item.rainbow.borderLeft} ${item.rainbow.bgGradient} ${
                item.isSpecial
                  ? "border-red-500/50 shadow-lg ring-1 shadow-red-950/40 ring-red-500/30"
                  : ""
              }`}
            >
              {/* Badge for special day */}
              {item.badge && (
                <span className="absolute -top-3 right-6 rounded-full bg-red-600 px-3 py-1 text-xs font-black tracking-wider text-white uppercase shadow-md shadow-red-950/50">
                  {item.badge}
                </span>
              )}

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {/* Day and deal title */}
                <div className="space-y-1">
                  <span
                    className={`text-sm font-extrabold tracking-wider uppercase ${item.rainbow.dayText}`}
                  >
                    {item.day}
                  </span>
                  <h2 className="text-xl font-bold text-white">{item.title}</h2>
                </div>

                {/* Deal description */}
                <p className="text-sm leading-relaxed text-slate-300 sm:text-base md:max-w-md">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
