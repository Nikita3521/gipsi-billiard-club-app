// @/app/booking/actions.ts
"use server"

import prisma from "@/lib/prisma"
import { openingHours } from "@/consts/openingHours"
import Stripe from "stripe"
import { isToday, getBufferTime } from "@/utils/dateUtils"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16" as any,
})

interface CreateBookingArgs {
  tableId: string
  date: string
  time: string
  duration: number
  comment?: string
  name: string
  phone: string
  paymentIntentId: string
  telegramChatId?: string
}

const TOTAL_TABLES = 11

function createDeterministicDate(dateStr: string, timeStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number)
  const [hours, minutes] = timeStr.split(":").map(Number)

  const date = new Date(Date.UTC(year, month - 1, day, hours, minutes))
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date or time format")
  }
  return date
}

function calculateBookingDates(
  dateStr: string,
  timeStr: string,
  durationHours: number
) {
  const startTime = createDeterministicDate(dateStr, timeStr)
  const endTime = new Date(startTime.getTime() + durationHours * 60 * 60 * 1000)
  return { startTime, endTime }
}

function getClosingTime(dateStr: string): Date {
  const weekday = new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long",
  })
  const schedule = openingHours[weekday]
  if (!schedule) {
    // Default to 00:00 next day if no schedule found
    const [endHour, endMinute] = [0, 0]
    const [year, month, day] = dateStr.split("-").map(Number)
    const finish = new Date(
      Date.UTC(year, month - 1, day + 1, endHour, endMinute, 0)
    )
    return finish
  }
  const [endHour, endMinute] = schedule.end.split(":").map(Number)
  const [year, month, day] = dateStr.split("-").map(Number)

  // If closing time is 00:00 (midnight), it means the next day
  if (endHour === 0 && endMinute === 0) {
    const finish = new Date(
      Date.UTC(year, month - 1, day + 1, endHour, endMinute, 0)
    )
    return finish
  }

  const finish = new Date(Date.UTC(year, month - 1, day, endHour, endMinute, 0))
  return finish
}

export async function createTelegramAuthSession() {
  try {
    const token = Math.random().toString(36).substring(2, 15)
    await prisma.telegramSession.create({
      data: { token, status: "PENDING" },
    })
    const botName = process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME
    return {
      success: true,
      token,
      link: `https://t.me/${botName}?start=${token}`,
    }
  } catch (error) {
    console.error("Error creating Telegram session:", error)
    return { success: false, error: "Failed to initialize the bot" }
  }
}

export async function checkTelegramAuthStatus(token: string) {
  try {
    const session = await prisma.telegramSession.findUnique({
      where: { token },
    })
    if (!session) return { success: false, status: "NOT_FOUND" }
    if (session.status === "APPROVED") {
      return {
        success: true,
        status: "APPROVED",
        phone: session.phone,
        chatId: session.chatId,
      }
    }
    return { success: true, status: "PENDING" }
  } catch (error) {
    return { success: false, status: "ERROR" }
  }
}

export async function createPaymentIntentAction(
  pricePerHour: number,
  duration: number
) {
  try {
    const totalAmount = pricePerHour * duration
    const prepaymentAmount = totalAmount * 0.5
    const amountInCents = Math.round(prepaymentAmount * 100)

    if (amountInCents < 50) {
      throw new Error("Payment amount is too small (minimum $0.50).")
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      payment_method_types: ["card"],
    })

    return { success: true, clientSecret: paymentIntent.client_secret }
  } catch (error: any) {
    console.error("Error creating Stripe PaymentIntent:", error)
    return {
      success: false,
      error: error.message || "Failed to initialize payment session.",
    }
  }
}

export async function getBookedTableNumbers(
  dateStr: string,
  timeStr: string,
  durationHours: number
) {
  try {
    const { startTime, endTime } = calculateBookingDates(
      dateStr,
      timeStr,
      durationHours
    )

    const activeBookings = await prisma.booking.findMany({
      where: {
        startTime: { lt: endTime },
        endTime: { gt: startTime },
      },
      select: { table: { select: { number: true } } },
    })

    return {
      success: true,
      bookedNumbers: activeBookings.map((b) => b.table.number),
    }
  } catch (error) {
    console.error("Error fetching booked tables:", error)
    return {
      success: false,
      error: "Failed to fetch table data.",
      bookedNumbers: [],
    }
  }
}

/**
 * Сканирует будущие дни, чтобы найти ближайшую дату со свободными местами
 */
async function findNextAvailableDay(
  startDateStr: string,
  durationHours: number
): Promise<string | null> {
  const [year, month, day] = startDateStr.split("-").map(Number)
  const baseDate = new Date(Date.UTC(year, month - 1, day))

  // Сканируем вперед на 7 дней
  for (let i = 1; i <= 7; i++) {
    const nextDate = new Date(baseDate.getTime() + i * 24 * 60 * 60 * 1000)
    const y = nextDate.getUTCFullYear()
    const m = String(nextDate.getUTCMonth() + 1).padStart(2, "0")
    const d = String(nextDate.getUTCDate()).padStart(2, "0")
    const nextDateStr = `${y}-${m}-${d}`

    const dayStart = createDeterministicDate(nextDateStr, "00:00")
    const dayEnd = createDeterministicDate(nextDateStr, "23:59")

    const bookings = await prisma.booking.findMany({
      where: { startTime: { lt: dayEnd }, endTime: { gt: dayStart } },
      select: { startTime: true, endTime: true },
    })

    // Проверяем хотя бы один популярный дневной/вечерний слот
    for (let hour = 12; hour < 22; hour++) {
      const slotStart = createDeterministicDate(nextDateStr, `${hour}:00`)
      const slotEnd = new Date(
        slotStart.getTime() + durationHours * 60 * 60 * 1000
      )

      const bookedCount = bookings.filter(
        (b) => b.startTime < slotEnd && b.endTime > slotStart
      ).length
      if (bookedCount < TOTAL_TABLES) {
        return nextDateStr // Нашли день, где есть хоть один свободный стол
      }
    }
  }
  return null
}

export async function getAvailableTimeSlots(
  dateStr: string,
  durationHours: number
) {
  try {
    const timeSlots: string[] = []
    for (let hour = 10; hour < 24; hour++) {
      timeSlots.push(`${hour}:00`)
      if (hour !== 23) {
        timeSlots.push(`${hour}:30`)
      }
    }

    const dayStart = createDeterministicDate(dateStr, "00:00")
    const dayEnd = createDeterministicDate(dateStr, "23:59")

    const daysBookings = await prisma.booking.findMany({
      where: { startTime: { lt: dayEnd }, endTime: { gt: dayStart } },
      select: { startTime: true, endTime: true },
    })

    // Проверка для сегодняшнего дня - фильтруем прошедшее время
    const isTodayDate = isToday(dateStr)
    const bufferTime = getBufferTime(30) // 30 минут буфер

    const availableSlots = timeSlots
      .map((timeStr) => {
        const slotStart = createDeterministicDate(dateStr, timeStr)
        const slotEnd = new Date(
          slotStart.getTime() + durationHours * 60 * 60 * 1000
        )

        // Если сегодня, пропускаем слоты, которые уже прошли или меньше 30 минут от текущего времени
        if (isTodayDate && slotStart < bufferTime) {
          return {
            time: timeStr,
            availableCount: 0,
          }
        }

        const bookedOnSlot = daysBookings.filter(
          (b) => b.startTime < slotEnd && b.endTime > slotStart
        )

        return {
          time: timeStr,
          availableCount: Math.max(0, TOTAL_TABLES - bookedOnSlot.length),
        }
      })
      .filter((slot) => slot.availableCount > 0)

    // Если на весь день вообще нет свободных мест, ищем альтернативную дату на будущее
    let suggestedAlternativeDate: string | null = null
    if (availableSlots.length === 0) {
      suggestedAlternativeDate = await findNextAvailableDay(
        dateStr,
        durationHours
      )
    }

    return {
      success: true,
      availableSlots,
      suggestedAlternativeDate,
    }
  } catch (error) {
    console.error("Error calculating available slots:", error)
    return {
      success: false,
      availableSlots: [],
      suggestedAlternativeDate: null,
    }
  }
}

export async function createTestBooking({
  tableId,
  date,
  time,
  duration,
  comment,
  name,
  phone,
  paymentIntentId,
  telegramChatId,
}: CreateBookingArgs) {
  try {
    if (!name?.trim()) throw new Error("Name is required.")
    if (!phone?.trim()) throw new Error("Phone number is required.")
    if (!paymentIntentId) throw new Error("Payment identifier is required.")

    const { startTime, endTime } = calculateBookingDates(date, time, duration)

    // Проверка: нельзя бронировать в прошлое время (сравниваем в UTC)
    const now = new Date()
    const bufferTime = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds()
      )
    )
    bufferTime.setMinutes(bufferTime.getUTCMinutes() + 30)

    if (startTime < bufferTime) {
      throw new Error(
        "Cannot book a table in the past. Please select a future time."
      )
    }

    // Временно отключаем проверку на закрытие для отладки
    // TODO: исправить логику сравнения с учетом часовых поясов
    /*
    const closingTime = getClosingTime(date)
    console.log("Booking check:", { startTime, endTime, closingTime, date, time, duration })
    if (endTime > closingTime) {
      throw new Error(
        "Booking duration exceeds operating hours. Please select an earlier time or shorter duration."
      )
    }
    */

    const formattedTableId = tableId.startsWith("table_")
      ? tableId
      : `table_${tableId}`

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    if (paymentIntent.status !== "succeeded") {
      throw new Error("Payment not confirmed. Booking rejected.")
    }

    // Запускаем проверку занятости и создание в единой безопасной логике
    const isTableBusy = await prisma.booking.findFirst({
      where: {
        tableId: formattedTableId,
        startTime: { lt: endTime },
        endTime: { gt: startTime },
      },
    })

    if (isTableBusy) {
      throw new Error(
        "This table has already been booked for the selected time."
      )
    }

    const user = await prisma.user.upsert({
      where: { phone: phone.trim() },
      update: {
        name: name.trim(),
        ...(telegramChatId ? { telegramChatId: telegramChatId.trim() } : {}),
      },
      create: {
        name: name.trim(),
        phone: phone.trim(),
        telegramChatId: telegramChatId ? telegramChatId.trim() : null,
      },
    })

    const newBooking = await prisma.booking.create({
      data: {
        userId: user.id,
        tableId: formattedTableId,
        startTime,
        endTime,
        comment: comment || null,
      },
      include: { table: true },
    })

    if (telegramChatId) {
      const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
      const tableNumber =
        newBooking.table?.number || formattedTableId.replace("table_", "")
      const formattedDate = new Date(date).toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      })

      const messageText =
        `🎉 <b>Booking successfully confirmed!</b>\n\n` +
        `👤 <b>Guest:</b> ${name.trim()}\n` +
        `🚪 <b>Table №:</b> ${tableNumber}\n` +
        `📅 <b>Date:</b> ${formattedDate}\n` +
        `🕒 <b>Time:</b> ${time}\n` +
        `⏳ <b>Duration:</b> ${duration} hour${duration > 1 ? "s" : ""}\n` +
        `${comment ? `💬 <b>Comment:</b> ${comment}\n` : ""}\n` +
        `We look forward to welcoming you!`

      try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: messageText,
            parse_mode: "HTML",
          }),
        })
      } catch (tgError) {
        console.error(
          "Failed to send confirmation message to Telegram:",
          tgError
        )
      }
    }

    return { success: true, data: newBooking }
  } catch (error: any) {
    console.error("Error creating booking:", error)
    return { success: false, error: error.message || "Server error" }
  }
}
