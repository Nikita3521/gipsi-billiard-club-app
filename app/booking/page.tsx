"use client"

import { useState, useEffect } from "react"
import WelcomeSection from "@/components/booking-page/WelcomeSection"
import FindSection from "@/components/booking-page/FindSection"
import TablesSection from "@/components/booking-page/TablesSection"
import { getBookedTableNumbers } from "./actions"
import { getAvailableTimeSlots } from "@/utils/GetAvailableTimeSlots"

export default function BookingPage() {
  const today = new Date().toISOString().split("T")[0]
  const initialSlots = getAvailableTimeSlots(today, 1)

  const [date, setDate] = useState(today)
  const [time, setTime] = useState(initialSlots[0] || "12:00")
  const [duration, setDuration] = useState(1)

  const [bookedTables, setBookedTables] = useState<number[]>([])
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function updateTableStatuses() {
      setIsLoading(true)

      const result = await getBookedTableNumbers(date, time, duration)

      if (result.success) {
        setBookedTables(result.bookedNumbers)
      }

      setIsLoading(false)
    }

    updateTableStatuses()
  }, [date, time, duration])

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <WelcomeSection />

      <FindSection
        date={date}
        setDate={setDate}
        time={time}
        setTime={setTime}
        duration={duration}
        setDuration={setDuration}
        setSelectedTable={setSelectedTable}
      />

      <TablesSection
        date={date}
        time={time}
        duration={duration}
        bookedTables={bookedTables}
        selectedTable={selectedTable}
        setSelectedTable={setSelectedTable}
        isLoading={isLoading}
        setTime={setTime}
      />
    </main>
  )
}
