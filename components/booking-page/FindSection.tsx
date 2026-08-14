import FindMenu from "@/components/ui/FindMenu"

interface FindSectionProps {
  date: string
  setDate: (date: string) => void
  time: string
  setTime: (time: string) => void
  duration: number
  setDuration: (duration: number) => void
  setSelectedTable: (id: string | null) => void
}

export default function FindSection({
  date,
  setDate,
  time,
  setTime,
  duration,
  setDuration,
  setSelectedTable,
}: FindSectionProps) {
  return (
    <section className="relative isolate overflow-hidden text-white">
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-8">
        <FindMenu
          date={date}
          setDate={setDate}
          time={time}
          setTime={setTime}
          duration={duration}
          setDuration={setDuration}
          setSelectedTable={setSelectedTable}
        />
      </div>
    </section>
  )
}
