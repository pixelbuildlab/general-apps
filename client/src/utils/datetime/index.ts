import type { TimeEntry } from '@/types'

export function formatTime(isoString: string) {
  return new Date(isoString).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export function calculateDuration(start: string, end: string) {
  const startTime = new Date(start)
  const endTime = new Date(end)
  const diffMs = endTime.getTime() - startTime.getTime()
  const hours = Math.floor(diffMs / (1000 * 60 * 60))
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
  return `${hours}h ${minutes}m`
}

export function calculateTotalHours(entries: TimeEntry[]) {
  const totalMs = entries.reduce((total, entry) => {
    const start = new Date(entry.start)
    const end = new Date(entry.end)
    return total + (end.getTime() - start.getTime())
  }, 0)
  const totalHours = Math.floor(totalMs / (1000 * 60 * 60))
  const totalMinutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60))
  return `${totalHours}h ${totalMinutes}m`
}

export function formatHumanReadableDate(dateStr: string | undefined): string {
  if (!dateStr) return ''
  const inputDate = new Date(dateStr)
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)

  const isSameDate = (d1: Date, d2: Date) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()

  if (isSameDate(inputDate, today)) return 'Today'
  if (isSameDate(inputDate, yesterday)) return 'Yesterday'

  return inputDate
    .toLocaleDateString('en-US', {
      weekday: 'short', // Mon
      day: '2-digit', // 02
      month: 'short', // Feb
      year: 'numeric', // 2025
    })
    .replace(',', '') // optional: remove the comma after weekday
}

export function isWeekend(date: string) {
  const parsedDate = new Date(date)
  const day = parsedDate.getDay()
  return day === 6 || day === 0 // Saturday or Sunday
}

export function canAddLogForDate(selectedDateStr: string): boolean {
  const selectedDate = new Date(selectedDateStr)
  const now = new Date()

  selectedDate.setHours(0, 0, 0, 0)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const cutoffToday = new Date(today)
  cutoffToday.setHours(15, 0, 0, 0) // 3:00 PM

  if (selectedDate < today) return true

  if (selectedDate.getTime() === today.getTime()) {
    return now >= cutoffToday
  }

  return false
}
