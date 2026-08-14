export interface DayDiscount {
  id: string
  day: string
  title: string
  description: string
  badge?: string
  isSpecial?: boolean
  rainbow: {
    dayText: string
    borderLeft: string
    bgGradient: string
  }
}

export const weeklyDiscounts: DayDiscount[] = [
  {
    id: "mon",
    day: "Monday",
    title: "3 + 1 Beer Deal",
    description: "Buy 3 liters of beer — get 1 liter of the same variety free!",
    badge: "Best Deal of the Week",
    isSpecial: true,
    rainbow: {
      dayText: "text-red-400",
      borderLeft: "border-l-red-500",
      bgGradient: "from-red-950/40 via-[#0b1e3f]/60 to-[#0b1e3f]/40",
    },
  },
  {
    id: "tue",
    day: "Tuesday",
    title: "Seafood Discount",
    description: "10% off all shrimp, crayfish, and dried fish.",
    rainbow: {
      dayText: "text-orange-400",
      borderLeft: "border-l-orange-500",
      bgGradient: "from-orange-950/25 via-[#0b1e3f]/60 to-[#0b1e3f]/40",
    },
  },
  {
    id: "wed",
    day: "Wednesday",
    title: "Midweek Special",
    description: "Order any snack set — get a signature drink for $1.",
    rainbow: {
      dayText: "text-yellow-400",
      borderLeft: "border-l-yellow-500",
      bgGradient: "from-yellow-950/25 via-[#0b1e3f]/60 to-[#0b1e3f]/40",
    },
  },
  {
    id: "thu",
    day: "Thursday",
    title: "Fish Day",
    description: "15% off all smoked and dried fillet.",
    rainbow: {
      dayText: "text-emerald-400",
      borderLeft: "border-l-emerald-500",
      bgGradient: "from-emerald-950/25 via-[#0b1e3f]/60 to-[#0b1e3f]/40",
    },
  },
  {
    id: "fri",
    day: "Friday",
    title: "Friday Warm-up",
    description: "Double loyalty points on purchases over $25.",
    rainbow: {
      dayText: "text-cyan-400",
      borderLeft: "border-l-cyan-500",
      bgGradient: "from-cyan-950/25 via-[#0b1e3f]/60 to-[#0b1e3f]/40",
    },
  },
  {
    id: "sat",
    day: "Saturday",
    title: "Big Company",
    description: "20% off all large sets and towers.",
    rainbow: {
      dayText: "text-blue-400",
      borderLeft: "border-l-blue-500",
      bgGradient: "from-blue-950/30 via-[#0b1e3f]/60 to-[#0b1e3f]/40",
    },
  },
  {
    id: "sun",
    day: "Sunday",
    title: "Sunday Relax",
    description: "15% off all canned and bottled craft beer.",
    rainbow: {
      dayText: "text-purple-400",
      borderLeft: "border-l-purple-500",
      bgGradient: "from-purple-950/25 via-[#0b1e3f]/60 to-[#0b1e3f]/40",
    },
  },
]
