const DAY_OF_YEAR_PER_FIRST_OF_MONTH = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]

function createUTCDate (year: number, month = 0, day = 1) {
  var date
  if (year < 100 && year >= 0) {
    date = new Date(Date.UTC(year, month, day))
    if (isFinite(date.getUTCFullYear())) {
      date.setUTCFullYear(year)
    }
  } else {
    date = new Date(Date.UTC(year, month, day))
  }

  return date
}

function firstWeekOffset (year: number, firstDayOfWeek: number, firstDayOfYear: number) {
  const firstWeekDayInFirstWeek = 7 + firstDayOfWeek - firstDayOfYear
  const firstWeekDayOfYear = (7 + createUTCDate(year, 0, firstWeekDayInFirstWeek).getUTCDay() - firstDayOfWeek) % 7

  return -firstWeekDayOfYear + firstWeekDayInFirstWeek - 1
}

function dayOfYear (year: number, month: number, day: number, firstDayOfWeek: number) {
  let dayOfYear = DAY_OF_YEAR_PER_FIRST_OF_MONTH[month]
  if (month > 1 && isLeapYear(year)) {
    dayOfYear++
  }

  return dayOfYear + day
}

function weekOfYear (year: number, month: number, day: number, firstDayOfWeek: number, firstDayOfYear: number) {
  const weekOffset = firstWeekOffset(year, firstDayOfWeek, firstDayOfYear)
  const week = Math.ceil((dayOfYear(year, month, day, firstDayOfWeek) - weekOffset) / 7)

  if (week < 1) {
    return week + weeksInYear(year - 1, firstDayOfWeek, firstDayOfYear)
  } else if (week > weeksInYear(year, firstDayOfWeek, firstDayOfYear)) {
    return week - weeksInYear(year, firstDayOfWeek, firstDayOfYear)
  } else {
    return week
  }
}

function weeksInYear (year: number, firstDayOfWeek: number, firstDayOfYear: number) {
  const weekOffset = firstWeekOffset(year, firstDayOfWeek, firstDayOfYear)
  const weekOffsetNext = firstWeekOffset(year + 1, firstDayOfWeek, firstDayOfYear)
  const daysInYear = isLeapYear(year) ? 366 : 365

  return (daysInYear - weekOffset + weekOffsetNext) / 7
}

export function weekNumber (year: number, month: number, day: number, firstDayOfWeek: number, firstDayOfYear: number): number {
  return weekOfYear(year, month, day, firstDayOfWeek, firstDayOfYear)
}

export function isLeapYear (year: number): boolean {
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)
}
