// @/components/TableSection.tsx
"use client"

import { useState, useMemo, useEffect } from "react"
import { cn } from "@/consts/utils"
import { tables } from "@/consts/tablesPosition"
import {
  Loader2,
  Users,
  Disc,
  ShieldCheck,
  Wind,
  X,
  Calendar,
  XCircle,
} from "lucide-react"
import Button from "../ui/button"
import Image from "next/image"
import Link from "next/link"
import { getAvailableTimeSlots } from "@/app/booking/actions" // 👈 Импортируем экшен из внешнего файла

interface TableSectionProps {
  bookedTables: number[]
  selectedTable: string | null
  setSelectedTable: (id: string | null) => void
  isLoading: boolean
  date: string
  time: string
  duration: number
  setTime: (time: string) => void
}

export default function TableSection({
  bookedTables,
  selectedTable,
  setSelectedTable,
  isLoading,
  date,
  time,
  duration,
  setTime,
}: TableSectionProps) {
  const [showTimeline, setShowTimeline] = useState(false)
  const [activeTimelineDate, setActiveTimelineDate] = useState(date)
  const [availableSlots, setAvailableSlots] = useState<
    Array<{ time: string; availableCount: number }>
  >([])
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)

  const TOTAL_TABLES_COUNT = 11
  const pricePerHour = selectedTable === "1" || selectedTable === "2" ? 40 : 26
  const paymentUrl = `/booking/payment?table=${selectedTable}&date=${encodeURIComponent(date)}&time=${time}&duration=${duration}&price=${pricePerHour}`

  useEffect(() => {
    async function fetchAvailableSlots() {
      if (bookedTables.length === TOTAL_TABLES_COUNT) {
        setIsLoadingSlots(true)
        const result = await getAvailableTimeSlots(date, duration)
        if (result.success) {
          setAvailableSlots(result.availableSlots)
        }
        setIsLoadingSlots(false)
      }
    }
    fetchAvailableSlots()
  }, [date, duration, bookedTables.length])

  const tableNumbers = Array.from(
    { length: TOTAL_TABLES_COUNT },
    (_, i) => i + 1
  )
  const timeSlots = Array.from({ length: 14 }, (_, i) => `${10 + i}:00`)

  const fourteenDays = useMemo(() => {
    const days = []
    const baseDate = new Date(date || new Date())
    for (let i = 0; i < 14; i++) {
      const current = new Date(baseDate)
      current.setDate(baseDate.getDate() + i)
      const yyyy = current.getFullYear()
      const mm = String(current.getMonth() + 1).padStart(2, "0")
      const dd = String(current.getDate()).padStart(2, "0")
      days.push({
        id: `${yyyy}-${mm}-${dd}`,
        label: current.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        weekday: current.toLocaleDateString("en-US", { weekday: "short" }),
      })
    }
    return days
  }, [date])

  const isSlotBooked = (tableNum: number, timeStr: string, dateStr: string) => {
    if (dateStr === date && timeStr === time) {
      return bookedTables.includes(tableNum)
    }
    return false
  }

  return (
    <section className="relative isolate overflow-hidden text-white">
      <div className="mx-auto w-full max-w-7xl p-4">
        <div className="flex flex-col items-center border-2 border-white/20 bg-[#0b1e3f]/20 pt-8 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-3xl font-black tracking-wider text-white sm:text-4xl lg:text-5xl">
              CHOOSE A TABLE
            </h2>
            <div className="mb-4 flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded border-2 border-green-500/50 bg-green-500/50" />
                <span className="text-sm font-semibold text-white/77">
                  Available
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded border-2 border-red-500/50 bg-red-500/50" />
                <span className="text-sm font-semibold text-white/77">
                  Booked
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded border-2 border-gold/50 bg-gold/70" />
                <span className="text-sm font-semibold text-white/77">
                  Selected
                </span>
              </div>
            </div>
          </div>

          <div className="relative aspect-[16/10] w-full overflow-hidden border-t-2 border-white/10">
            <div className="absolute inset-0 bg-[url('/images/tablesSection.webp')] bg-cover bg-center bg-no-repeat opacity-90" />

            {isLoading && (
              <div className="absolute inset-0 z-40 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-10 w-10 animate-spin text-gold" />
                  <p className="text-sm font-medium tracking-wide text-gold/90">
                    Checking availability...
                  </p>
                </div>
              </div>
            )}

            {bookedTables.length === TOTAL_TABLES_COUNT && (
              <div className="absolute inset-0 z-40 flex animate-in items-center justify-center bg-slate-950/80 backdrop-blur-xl duration-300 fade-in">
                <div className="flex max-w-142.5 flex-col items-center gap-4 px-6 text-center">
                  {/* Icon + Title */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 ring-1 ring-red-500/30">
                      <XCircle className="h-8 w-8 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-wide text-white uppercase sm:text-3xl">
                      Fully Booked
                    </h2>
                  </div>

                  <p className="max-w-sm text-sm font-medium text-white/60 sm:text-base">
                    All tables are reserved for this time slot. Please choose
                    another date or time to continue your booking.
                  </p>
                </div>
              </div>
            )}

            {/* Interactive Grid Canvas Buttons Layout */}
            <div>
              {tables.map((table) => {
                const isBooked = bookedTables.includes(Number(table.id))
                return (
                  <button
                    key={table.id}
                    type="button"
                    onClick={() => !isBooked && setSelectedTable(table.id)}
                    disabled={isBooked}
                    className={cn(
                      "absolute z-10 flex w-[12.6%] items-center justify-center border-2 text-xl font-bold text-white transition-all duration-300 min-[500px]:rounded-sm min-[500px]:text-4xl",
                      table.id === "1" || table.id === "2"
                        ? "h-[10.9%]"
                        : "h-[9.6%]",
                      !isBooked
                        ? selectedTable === table.id
                          ? "border-gold/50 bg-gold/70 shadow-[0_0_20px_rgba(201,162,78,0.6)]"
                          : "cursor-pointer border-green-500/50 bg-green-900/70 hover:bg-green-800/60"
                        : "cursor-not-allowed border-red-500/50 bg-red-900/70"
                    )}
                    style={{
                      left: `${table.x}%`,
                      top: `${table.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {table.id}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Table Details Sidebar Context Drawer */}
          {selectedTable ? (
            <div className="w-full border border-white/10 p-6 shadow-2xl md:p-8">
              <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12">
                <div className="group relative aspect-[16/10] overflow-hidden border border-white/10 md:col-span-4">
                  <Image
                    src="/images/tableBook.webp"
                    alt={`Table ${selectedTable}`}
                    fill
                    sizes="(min-width: 1024px) 600px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold text-amber-400 uppercase">
                    Premium
                  </div>
                </div>

                <div className="flex flex-col space-y-5 md:col-span-4">
                  <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-3">
                    <h3 className="text-3xl font-extrabold text-white uppercase md:text-4xl">
                      Table {selectedTable}
                    </h3>
                    <span className="inline-flex items-center text-lg font-medium text-green-500">
                      <span className="mr-1.5 h-4 w-4 animate-pulse rounded-full bg-green-500" />
                      Available
                    </span>
                  </div>

                  <div className="space-y-3 border-t border-white/5 pt-4 text-slate-400">
                    <div className="flex items-center space-x-3">
                      <Users size={16} />{" "}
                      <span className="text-slate-300">2 - 4 Players</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Disc size={16} />{" "}
                      <span className="text-slate-300">
                        {selectedTable === "1" || selectedTable === "2"
                          ? "VIP"
                          : "Standard"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <ShieldCheck size={16} />{" "}
                      <span className="text-slate-300">Premium Table</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Wind size={16} />{" "}
                      <span className="text-slate-300">Air Conditioning</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-5 text-right md:col-span-4">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-black text-amber-400 md:text-4xl">
                      ${pricePerHour}
                    </span>
                    <span className="text-xs font-medium text-amber-400">
                      / hour
                    </span>
                  </div>
                  <div className="flex flex-col items-end p-2 text-sm text-slate-200">
                    <span className="text-xs text-slate-500 uppercase">
                      Selected Slot
                    </span>
                    <span>
                      {date} at {time}
                    </span>
                    <span>for {duration} hours</span>
                  </div>
                  <Link href={paymentUrl}>
                    <Button>Confirm Booking</Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[300px] w-full flex-col items-center justify-center border border-white/5 p-6 text-center">
              <p className="text-4xl font-medium text-white/80 uppercase">
                Please choose a table
              </p>
              <p className="mt-2 max-w-md text-sm text-slate-500">
                Select an open table layout option above to configure
                transaction payment streams.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
