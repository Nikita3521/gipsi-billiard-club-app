import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN

export async function POST(req: Request) {
  try {
    const receivedSecret = req.headers.get("X-Telegram-Bot-Api-Secret-Token")
    const expectedSecret = process.env.TELEGRAM_WEBHOOK_SECRET

    if (!receivedSecret || receivedSecret !== expectedSecret) {
      console.warn("⚠️ Unauthorized webhook request blocked!")
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const update = await req.json()

    if (!update.message) return NextResponse.json({ ok: true })

    const chatId = update.message.chat.id.toString()
    const text = update.message.text || ""
    const contact = update.message.contact

    if (text.startsWith("/start")) {
      const token = text.split(" ")[1]

      if (!token) {
        await sendTelegramMessage(
          chatId,
          "Hello! Please initiate the phone number verification directly from the checkout page on our website."
        )
        return NextResponse.json({ ok: true })
      }

      const session = await prisma.telegramSession.findUnique({
        where: { token },
      })

      if (session && session.status === "PENDING") {
        await prisma.telegramSession.update({
          where: { token },
          data: { chatId },
        })

        await sendTelegramMessageWithContactButton(
          chatId,
          "Please click the '📱 Share Phone Number' button below to verify your profile for your table booking."
        )
      } else {
        await sendTelegramMessage(
          chatId,
          "This booking session has expired. Please refresh the checkout page on our website."
        )
      }
      return NextResponse.json({ ok: true })
    }

    if (contact) {
      let phone = contact.phone_number
      if (!phone.startsWith("+")) phone = `+${phone}`

      const activeSession = await prisma.telegramSession.findFirst({
        where: { chatId, status: "PENDING" },
        orderBy: { createdAt: "desc" },
      })

      if (activeSession) {
        await prisma.telegramSession.update({
          where: { id: activeSession.id },
          data: {
            status: "APPROVED",
            phone: phone,
          },
        })

        await sendTelegramMessage(
          chatId,
          "✅ Phone number verified successfully! Please return to the website to complete your table payment."
        )
      } else {
        await sendTelegramMessage(
          chatId,
          "Active booking session not found. Please start the process over on our website."
        )
      }
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Telegram webhook error:", error)
    return NextResponse.json({ ok: true })
  }
}

async function sendTelegramMessage(chatId: string, text: string) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  })
}

async function sendTelegramMessageWithContactButton(
  chatId: string,
  text: string
) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      reply_markup: {
        keyboard: [[{ text: "📱 Share Phone Number", request_contact: true }]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    }),
  })
}
