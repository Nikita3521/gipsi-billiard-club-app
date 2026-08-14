export function isToday(dateStr: string): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const selectedDate = new Date(dateStr)
  selectedDate.setHours(0, 0, 0, 0)
  return selectedDate.getTime() === today.getTime()
}

export function getCurrentTime(): Date {
  return new Date()
}

export function getBufferTime(minutes: number = 30): Date {
  const now = getCurrentTime()
  return new Date(now.getTime() + minutes * 60 * 1000)
}
