import { openingHours } from "@/consts/openingHours"
import { isToday, getBufferTime } from "./dateUtils"

export function getAvailableTimeSlots(date: string, durationHours: number = 1) {
  const weekday = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
  })

  const schedule = openingHours[weekday]

  if (!schedule) return []

  const slots: string[] = []

  const [startHour, startMinute] = schedule.start.split(":").map(Number)
  const [endHour, endMinute] = schedule.end.split(":").map(Number)

  const current = new Date()
  current.setHours(startHour, startMinute, 0, 0)

  const finish = new Date()
  finish.setHours(endHour, endMinute, 0, 0)

  if (finish <= current) {
    finish.setDate(finish.getDate() + 1)
  }

  const isTodayDate = isToday(date)
  const bufferTime = getBufferTime(30)

  while (current <= finish) {
    const slotTime = current.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })

    // Если сегодня, пропускаем слоты, которые уже прошли
    if (isTodayDate) {
      const slotDate = new Date(date)
      const [slotHour, slotMin] = slotTime.split(":").map(Number)
      slotDate.setHours(slotHour, slotMin, 0, 0)

      if (slotDate < bufferTime) {
        current.setMinutes(current.getMinutes() + 30)
        continue
      }
    }

    // Проверяем, что бронирование закончится до закрытия
    const slotEndTime = new Date(
      current.getTime() + durationHours * 60 * 60 * 1000
    )
    if (slotEndTime <= finish) {
      slots.push(slotTime)
    }

    current.setMinutes(current.getMinutes() + 30)
  }

  return slots
}
