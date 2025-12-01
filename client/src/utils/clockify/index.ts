// import { getConfig } from '../getConfig'

// export function generateTimeEntries(activities: string) {
//   const timeEntries = []
//   const month = 4
//   const year = 2025

//   for (let day = 30; day <= 30; day++) {
//     const date = new Date(year, month, day)

//     const activity = `${activities}`.replaceAll('\n', ' ')

//     if (!isWeekend(date)) {
//       // Time entry from 3 PM to 8 PM
//       const startTime1 = new Date(year, month, day, 15, 0)
//       const endTime1 = new Date(year, month, day, 19, 0)

//       if (!activity) {
//         throw new Error('ACTIVITY REQUIRED')
//       }

//       const timeEntry1 = {
//         billable: true,
//         description: activity,
//         projectId: getConfig('VITE_CLOCKIFY_PROJECT_ID'),
//         start: startTime1.toISOString(),
//         end: endTime1.toISOString(),
//         type: 'REGULAR',
//       }

//       timeEntries.push(timeEntry1)

//       const startTime2 = new Date(year, month, day, 20, 0)
//       const endTime2 = new Date(year, month, day + 1, 0, 0)

//       const timeEntry2 = {
//         billable: true,
//         description: activity,
//         projectId: getConfig('VITE_CLOCKIFY_PROJECT_ID'),
//         start: startTime2.toISOString(),
//         end: endTime2.toISOString(),
//         type: 'REGULAR',
//       }

//       timeEntries.push(timeEntry2)
//     }
//   }

//   return timeEntries
// }

export function generateTimeEntriesForDate(
  dateStr: string,
  activities: string,
  breakTimeStr: string, // new arg, like "18:00"
  projectId: string
) {
  if (!projectId) {
    throw new Error('Project Id missing')
  }

  if (!activities.trim()) throw new Error('ACTIVITY REQUIRED')

  const timeEntries = []
  const activity = activities.replaceAll('\n', ' ')
  const [year, monthStr, dayStr] = dateStr.split('-')
  const yearNum = parseInt(year, 10)
  const monthNum = parseInt(monthStr, 10) - 1
  const dayNum = parseInt(dayStr, 10)

  const [breakHour, breakMinute] = breakTimeStr.split(':').map(Number)
  const breakStart = new Date(yearNum, monthNum, dayNum, breakHour, breakMinute)
  const breakEnd = new Date(breakStart.getTime() + 60 * 60 * 1000)

  // First time entry: 3 PM to break start
  const startTime1 = new Date(yearNum, monthNum, dayNum, 15, 0)
  const endTime1 = breakStart

  // Second time entry: break end to 12 AM (next day)
  const startTime2 = breakEnd
  const endTime2 = new Date(yearNum, monthNum, dayNum + 1, 0, 0)

  timeEntries.push({
    billable: true,
    description: activity,
    projectId,
    start: startTime1.toISOString(),
    end: endTime1.toISOString(),
    type: 'REGULAR',
  })

  timeEntries.push({
    billable: true,
    description: activity,
    projectId,
    start: startTime2.toISOString(),
    end: endTime2.toISOString(),
    type: 'REGULAR',
  })

  return timeEntries
}
