import { createRange, padStart } from '@/util'

export function getFirstWeekdayOfMonth (year: number, month: number) {
  return new Date(`${year}-${month}-01`).getDay()
}

function getNumberOfDaysInMonth (year: number, month: number) {
  return new Date(year, month, 0).getDate()
}

function getMonthName (month: number, locale = 'en-US') {
  const date = new Date(`2022-${month}-01`)
  return date.toLocaleString(locale, { month: 'long' })
}

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

export function getWeek (year: number, month: number, day: number) {
  const date = new Date(year, month - 1, day)
  date.setHours(0, 0, 0, 0)
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7)
  // January 4 is always in week 1.
  const week1 = new Date(date.getFullYear(), 0, 4)
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
}

export function getDaysInMonth (year: number, month: number) {
  return createRange(getNumberOfDaysInMonth(year, month), 1).map(day => ({
    year,
    month,
    day,
    date: getDate(year, month, day),
  }))
}
