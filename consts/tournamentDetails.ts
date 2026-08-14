export interface TournamentDetails {
  title: string
  date: string
  time: string
  location: string
  prize: string
  format: string
  maxParticipants: number
  registeredCount: number
  entryFee: string
  image: string
  description: string
  rules: string[]
}

export const tournamentDetails: TournamentDetails = {
  title: "Summer Championship 2027",
  date: "July 27, 2027",
  time: "6:00 PM",
  location: "Gipsi Billiard Club",
  prize: "$1500 prize pool",
  format: "Single elimination",
  maxParticipants: 64,
  registeredCount: 8,
  entryFee: "$50 entry fee",
  image: "/images/tournament.webp",
  description:
    "Our biggest event of the summer. 64 players, single elimination bracket, one champion. Compete for the prize pool, bragging rights, and a permanent spot on our wall of fame.",
  rules: [
    "Standard 8-ball rules apply",
    "Single elimination bracket, best of 3 per match",
    "Players must arrive 15 minutes before their match",
    "Entry fee paid on-site or in advance",
    "No coaching or outside assistance during matches",
    "Referee decisions are final",
    "Sportsmanship is mandatory - unsportsmanlike conduct results in disqualification",
    "All equipment provided by the venue",
  ],
}
