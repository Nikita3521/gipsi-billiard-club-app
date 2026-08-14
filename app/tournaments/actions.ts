"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import { Prisma } from "@/app/generated/prisma/client"
import prisma from "@/lib/prisma"

const registrationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Please enter your full name")
    .max(100, "Name is too long"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9]{10,15}$/, "Enter a valid phone number"),
  tournamentId: z.string().min(1, "Tournament is required"),
})

type RegistrationInput = z.infer<typeof registrationSchema>

export type RegisterForTournamentResult =
  | { success: true }
  | {
      success: false
      error: string
      field?: "fullName" | "phone"
    }

/**
 * Normalizes a phone number to a consistent format for storage/lookup.
 * Keeps a leading "+" if present, strips everything else non-numeric.
 * e.g. "+380 (63) 123-45-67" -> "+380631234567"
 */
function normalizePhone(rawPhone: string): string {
  const hasPlus = rawPhone.trim().startsWith("+")
  const digitsOnly = rawPhone.replace(/\D/g, "")
  return hasPlus ? `+${digitsOnly}` : digitsOnly
}

export async function registerForTournament(
  input: RegistrationInput
): Promise<RegisterForTournamentResult> {
  const parsed = registrationSchema.safeParse(input)

  if (!parsed.success) {
    const issue = parsed.error.issues[0]
    return {
      success: false,
      error: issue?.message ?? "Invalid input",
      field: issue?.path[0] as "fullName" | "phone" | undefined,
    }
  }

  const { fullName, tournamentId } = parsed.data
  const phone = normalizePhone(parsed.data.phone)

  try {
    const tournament = await prisma.tournament.findUnique({
      where: { id: tournamentId },
      select: { id: true },
    })

    if (!tournament) {
      return { success: false, error: "This tournament no longer exists." }
    }

    // Atomic: either both the user upsert and the participant record
    // are created, or neither is — no half-registered state.
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.upsert({
        where: { phone },
        update: { name: fullName },
        create: { phone, name: fullName },
        select: { id: true },
      })

      await tx.tournamentParticipant.create({
        data: {
          userId: user.id,
          tournamentId,
        },
      })
    })

    revalidatePath("/tournaments")

    return { success: true }
  } catch (error) {
    // Unique constraint on [userId, tournamentId] — user already registered
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        error: "This phone number is already registered for this tournament.",
        field: "phone",
      }
    }

    console.error("registerForTournament failed:", error)

    return {
      success: false,
      error: "Something went wrong. Please try again in a moment.",
    }
  }
}

export async function getTournament() {
  const tournament = await prisma.tournament.findFirst({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          participants: true,
        },
      },
    },
  })

  if (!tournament) {
    return null
  }

  return {
    ...tournament,
    registeredCount: tournament._count.participants,
  }
}
