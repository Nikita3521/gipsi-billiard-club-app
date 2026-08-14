"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, Clock3 } from "lucide-react"
import { cn } from "@/consts/utils"
import Button from "./button"
import { durations } from "@/consts/openingHours"
import { getAvailableTimeSlots } from "@/utils/GetAvailableTimeSlots"

interface FindMenuProps {
  date: string
  setDate: (date: string) => void
  time: string
  setTime: (time: string) => void
  duration: number
  setDuration: (duration: number) => void
  setSelectedTable: (id: string | null) => void
}

export default function FindMenu({
  date,
  setDate,
  time,
  setTime,
  duration,
  setDuration,
  setSelectedTable,
}: FindMenuProps) {
  const [selectedDate, setSelectedDate] = useState(date)
  const initialSlots = getAvailableTimeSlots(date, duration)
  const [selectedTime, setSelectedTime] = useState(
    initialSlots[0] || time || ""
  )

  const [selectedDuration, setSelectedDuration] = useState(String(duration))

  // Sync local state with props when they change from parent
  useEffect(() => {
    setSelectedDate(date)
    const slots = getAvailableTimeSlots(date, duration)
    // Only reset time if current selected time is not in available slots
    if (!slots.includes(selectedTime)) {
      setSelectedTime(slots[0] || time)
    }
  }, [date, duration])

  // Update time slots when duration changes
  useEffect(() => {
    const slots = getAvailableTimeSlots(selectedDate, Number(selectedDuration))
    if (!slots.includes(selectedTime)) {
      setSelectedTime(slots[0] || "")
    }
  }, [selectedDuration])

  const handleFind = () => {
    setDate(selectedDate)
    setTime(selectedTime)
    setDuration(Number(selectedDuration))
    setSelectedTable(null)
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-2 border border-white/10 bg-[#0b1e3f]/50 p-4 lg:flex-row lg:items-center"
      )}
    >
      {/* Date Selection */}
      <div className="flex-1 space-y-2 border-r border-white/10 px-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-white/90">
          <Calendar className="h-4 w-4 text-gold" />
          Select date
        </label>
        <select
          value={selectedDate}
          onChange={(e) => {
            const newDate = e.target.value
            setSelectedDate(newDate)

            // Умный ход: при смене даты сразу берем первый доступный слот времени для этой даты
            const availableSlots = getAvailableTimeSlots(
              newDate,
              Number(selectedDuration)
            )
            setSelectedTime(availableSlots[0] || "")
          }}
          className="w-full bg-[#0b1e3f]/50 px-4 py-3 text-white focus:border-gold/50 focus:ring-1 focus:ring-gold/50 focus:outline-none"
        >
          {Array.from({ length: 14 }, (_, i) => {
            const d = new Date()
            d.setDate(d.getDate() + i)
            return (
              <option key={i} value={d.toISOString().split("T")[0]}>
                {d.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </option>
            )
          })}
        </select>
      </div>

      {/* Time Selection */}
      <div className="flex-1 space-y-2 border-r border-white/10 px-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-white/90">
          <Clock className="h-4 w-4 text-gold" />
          Select time
        </label>
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="w-full bg-[#0b1e3f]/50 px-4 py-3 text-white focus:border-gold/50 focus:ring-1 focus:ring-gold/50 focus:outline-none"
        >
          {getAvailableTimeSlots(selectedDate, Number(selectedDuration)).map(
            (t) => (
              <option key={t} value={t}>
                {t}
              </option>
            )
          )}
        </select>
      </div>

      {/* Duration Selection */}
      <div className="flex-1 space-y-2 border-r border-white/10 px-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-white/90">
          <Clock3 className="h-4 w-4 text-gold" />
          Select duration
        </label>
        <select
          value={selectedDuration}
          onChange={(e) => setSelectedDuration(e.target.value)}
          className="w-full bg-[#0b1e3f]/50 px-4 py-3 text-white focus:border-gold/50 focus:ring-1 focus:ring-gold/50 focus:outline-none"
        >
          {durations.map((d) => (
            <option key={d} value={d}>
              {d} {Number(d) === 1 ? "hour" : "hours"}
            </option>
          ))}
        </select>
      </div>

      {/* buttons */}
      <div className="flex flex-1 items-center justify-center">
        {/* Кнопка теперь вызывает наш рабочий handleFind */}
        <Button onClick={handleFind}>FIND A TABLE</Button>
      </div>
    </div>
  )
}
