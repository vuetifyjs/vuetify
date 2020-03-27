const hourInMilliseconds = 60 * 1000
const dayInMilliseconds = 24 * 60 * hourInMilliseconds

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
  const fwd = 7 + firstDayOfWeek - firstDayOfYear
  const fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - firstDayOfWeek) % 7

  return -fwdlw + fwd - 1
}

function dayOfYear (determineDate: Date, newYear: Date) {
  return Math.floor((determineDate.getTime() - newYear.getTime() -
    (determineDate.getTimezoneOffset() - newYear.getTimezoneOffset()) * hourInMilliseconds) / dayInMilliseconds) + 1
}

function weekOfYear (year: number, month: number, day: number, firstDayOfWeek: number, firstDayOfYear: number) {
  const weekOffset = firstWeekOffset(year, firstDayOfWeek, firstDayOfYear)
  const week = Math.floor((dayOfYear(createUTCDate(year, month, day), createUTCDate(year)) - weekOffset - 1) / 7) + 1
  var weeknumber

  if (week < 1) {
    weeknumber = week + weeksInYear(year - 1, firstDayOfWeek, firstDayOfYear)
  } else if (week > weeksInYear(year, firstDayOfWeek, firstDayOfYear)) {
    weeknumber = week - weeksInYear(year, firstDayOfWeek, firstDayOfYear)
  } else {
    weeknumber = week
  }

  return weeknumber
}

function weeksInYear (year: number, firstDayOfWeek: number, firstDayOfYear: number) {
  const weekOffset = firstWeekOffset(year, firstDayOfWeek, firstDayOfYear)
  const weekOffsetNext = firstWeekOffset(year + 1, firstDayOfWeek, firstDayOfYear)
  const daysInYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 366 : 365

  return (daysInYear - weekOffset + weekOffsetNext) / 7
}

export default function determineWeeknumber (year: number, month: number, day: number, firstDayOfWeek: number, firstDayOfYear: number) {
  const determineDate = createUTCDate(year, month, day)

  return weekOfYear(determineDate.getFullYear(), determineDate.getMonth(), determineDate.getDate(), firstDayOfWeek, firstDayOfYear)
}
