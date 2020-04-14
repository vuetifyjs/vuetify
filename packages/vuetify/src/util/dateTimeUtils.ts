function createUTCDate (year: number, month = 0, day = 1) {
  let date
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
  let dayOfYear = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334][month]
  if (month > 1 && isLeapYear(year)) {
    dayOfYear++
  }

  return dayOfYear + day
}

function weeksInYear (year: number, firstDayOfWeek: number, firstDayOfYear: number) {
  const weekOffset = firstWeekOffset(year, firstDayOfWeek, firstDayOfYear)
  const weekOffsetNext = firstWeekOffset(year + 1, firstDayOfWeek, firstDayOfYear)
  const daysInYear = isLeapYear(year) ? 366 : 365

  return (daysInYear - weekOffset + weekOffsetNext) / 7
}

export function weekNumber (year: number, month: number, day: number, firstDayOfWeek: number, localeFirstDayOfYear: number): number {
  const weekOffset = firstWeekOffset(year, firstDayOfWeek, localeFirstDayOfYear)
  const week = Math.ceil((dayOfYear(year, month, day, firstDayOfWeek) - weekOffset) / 7)

  if (week < 1) {
    return week + weeksInYear(year - 1, firstDayOfWeek, localeFirstDayOfYear)
  } else if (week > weeksInYear(year, firstDayOfWeek, localeFirstDayOfYear)) {
    return week - weeksInYear(year, firstDayOfWeek, localeFirstDayOfYear)
  } else {
    return week
  }
}

export function isLeapYear (year: number): boolean {
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)
}
