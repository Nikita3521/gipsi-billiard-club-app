import { getTournament } from "./actions"
import TournamentsClient from "@/components/tournaments-page/TournamentsClient"

export default async function TournamentsPage() {
  const tournament = await getTournament()

  if (!tournament) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07142b] text-white">
        <p className="text-white/60">No tournament found.</p>
      </div>
    )
  }

  return <TournamentsClient tournament={tournament} />
}
