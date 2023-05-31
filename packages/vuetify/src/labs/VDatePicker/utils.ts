// Utilities
import { createRange, padStart } from '@/util'

export function getFirstWeekdayOfMonth (year: number, month: number) {
  return new Date(`${year}-${month}-01`).getDay()
}

function getNumberOfDaysInMonth (year: number, month: number) {
  return new Date(year, month, 0).getDate()
}

// function getMonthName (month: number, locale = 'en-US') {
//   const date = new Date(`2022-${month}-01`)
//   return date.toLocaleString(locale, { month: 'long' })
// }

export function changeMonth (year: number, month: number, change: number) {
  if (change < 0 && month + change < 1) {
    return [year - 1, 12 + (month + change)]
  } else if (change > 0 && month + change > 12) {
    return [year + 1, (month + change) % 12]
  } else {
    return [year, month + change]
  }
}

export function getDate (year: number, month: number, day: number) {
  return `${year}-${padStart(String(month), 2, '0')}-${padStart(String(day), 2, '0')}`
}

export function addDays (date: string, days: number) {
  const d = new Date(date)

  d.setDate(d.getDate() + days)

  return getDate(d.getFullYear(), d.getMonth() + 1, d.getDate())
}

export function parseDate (date: string): [number, number, number] {
  const [year, month, day] = date.split('-').map(Number)

  return [year, month, day]
}

function getMondayOfFirstWeekOfYear (year: number) {
  const januaryFirst = new Date(year, 0, 1)
  const mondayOfFirstWeek = new Date(januaryFirst)

  mondayOfFirstWeek.setDate(mondayOfFirstWeek.getDate() + ((11 - januaryFirst.getDay()) % 7) - 3)

  return mondayOfFirstWeek
}

// https://stackoverflow.com/questions/274861/how-do-i-calculate-the-week-number-given-a-date/275024#275024
export function getWeek (date: Date) {
  let year = date.getFullYear()
  let d1w1 = getMondayOfFirstWeekOfYear(year)

  if (date < d1w1) {
    year = year - 1
    d1w1 = getMondayOfFirstWeekOfYear(year)
  } else {
    const tv = getMondayOfFirstWeekOfYear(year + 1)
    if (date >= tv) {
      year = year + 1
      d1w1 = tv
    }
  }

  const diffTime = Math.abs(date.getTime() - d1w1.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return Math.floor(diffDays / 7) + 1
}

export function getDaysInMonth (year: number, month: number) {
  return createRange(getNumberOfDaysInMonth(year, month), 1).map(day => ({
    year,
    month,
    day,
    date: getDate(year, month, day),
  }))
}
