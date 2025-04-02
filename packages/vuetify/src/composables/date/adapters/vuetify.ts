// Utilities
import { createRange, padStart } from '@/util'

// Types
import type { DateAdapter } from '../DateAdapter'

type CustomDateFormat = Intl.DateTimeFormatOptions | ((date: Date, formatString: string, locale: string) => string)

const weekInfo: Record<string, { firstDay: number, firstWeekSize: number }> = {
  '001': { firstDay: 1, firstWeekSize: 1 }, // not covered by Intl
  AD: { firstDay: 1, firstWeekSize: 1 },
  AE: { firstDay: 6, firstWeekSize: 1 }, // ar-AE
  AF: { firstDay: 6, firstWeekSize: 1 }, // prs-AF or ps-AF
  AG: { firstDay: 1, firstWeekSize: 1 },
  AI: { firstDay: 1, firstWeekSize: 1 },
  AL: { firstDay: 1, firstWeekSize: 1 }, // sq-AL
  AM: { firstDay: 1, firstWeekSize: 1 }, // hy-AM
  AN: { firstDay: 1, firstWeekSize: 4 },
  AR: { firstDay: 1, firstWeekSize: 1 }, // es-AR
  AS: { firstDay: 0, firstWeekSize: 1 },
  AT: { firstDay: 1, firstWeekSize: 4 }, // de-AT
  AU: { firstDay: 1, firstWeekSize: 1 }, // en-AU
  AX: { firstDay: 1, firstWeekSize: 1 },
  AZ: { firstDay: 1, firstWeekSize: 1 }, // az-Cyrl-AZ or az-Latn-AZ
  BA: { firstDay: 1, firstWeekSize: 1 }, // bs-Cyrl-BA or bs-Latn-BA | hr-BA | sr-BA | sr-Cyrl-BA | sr-Latn-BA
  BD: { firstDay: 0, firstWeekSize: 1 }, // bn-BD
  BE: { firstDay: 1, firstWeekSize: 4 }, // fr-BE or nl-BE
  BG: { firstDay: 1, firstWeekSize: 4 }, // bg-BG
  BH: { firstDay: 6, firstWeekSize: 1 }, // ar-BH
  BM: { firstDay: 1, firstWeekSize: 1 },
  BN: { firstDay: 1, firstWeekSize: 1 }, // ms-BN
  BR: { firstDay: 0, firstWeekSize: 1 }, // pt-BR
  BS: { firstDay: 1, firstWeekSize: 1 },
  BT: { firstDay: 1, firstWeekSize: 1 },
  BW: { firstDay: 1, firstWeekSize: 1 },
  BY: { firstDay: 1, firstWeekSize: 1 }, // be-BY
  BZ: { firstDay: 0, firstWeekSize: 1 }, // en-BZ
  CA: { firstDay: 0, firstWeekSize: 1 }, // en-CA or fr-CA | iu-Cans-CA | iu-Latn-CA | moh-CA
  CH: { firstDay: 1, firstWeekSize: 4 }, // de-CH or fr-CH | it-CH | rm-CH
  CL: { firstDay: 1, firstWeekSize: 1 }, // arn-CL or es-CL
  CM: { firstDay: 1, firstWeekSize: 1 },
  CN: { firstDay: 1, firstWeekSize: 1 }, // bo-CN or ii-CN | mn-Mong-CN | ug-CN | zh-CN
  CO: { firstDay: 0, firstWeekSize: 1 }, // es-CO
  CR: { firstDay: 1, firstWeekSize: 1 }, // es-CR
  CY: { firstDay: 1, firstWeekSize: 1 }, // el-CY
  CZ: { firstDay: 1, firstWeekSize: 4 }, // cs-CZ
  DE: { firstDay: 1, firstWeekSize: 4 }, // de-DE or dsb-DE | hsb-DE
  DJ: { firstDay: 1, firstWeekSize: 1 },
  DK: { firstDay: 1, firstWeekSize: 4 }, // da-DK
  DM: { firstDay: 1, firstWeekSize: 1 },
  DO: { firstDay: 0, firstWeekSize: 1 }, // es-DO
  DZ: { firstDay: 6, firstWeekSize: 1 }, // ar-DZ or tzm-Latn-DZ
  EC: { firstDay: 1, firstWeekSize: 1 }, // es-EC or quz-EC
  EE: { firstDay: 1, firstWeekSize: 4 }, // et-EE
  EG: { firstDay: 6, firstWeekSize: 1 }, // ar-EG
  ES: { firstDay: 1, firstWeekSize: 4 }, // ca-ES or es-ES | eu-ES | gl-ES
  ET: { firstDay: 0, firstWeekSize: 1 }, // am-ET
  FI: { firstDay: 1, firstWeekSize: 4 }, // fi-FI or se-FI | smn-FI | sms-FI | sv-FI
  FJ: { firstDay: 1, firstWeekSize: 4 },
  FO: { firstDay: 1, firstWeekSize: 4 }, // fo-FO
  FR: { firstDay: 1, firstWeekSize: 4 }, // br-FR or co-FR | fr-FR | gsw-FR | oc-FR
  GB: { firstDay: 1, firstWeekSize: 4 }, // cy-GB or en-GB | gd-GB
  'GB-alt-variant': { firstDay: 0, firstWeekSize: 4 }, // not covered by Intl
  GE: { firstDay: 1, firstWeekSize: 1 }, // ka-GE
  GF: { firstDay: 1, firstWeekSize: 1 },
  GP: { firstDay: 1, firstWeekSize: 1 },
  GR: { firstDay: 1, firstWeekSize: 4 }, // el-GR
  GT: { firstDay: 0, firstWeekSize: 1 }, // es-GT or qut-GT
  GU: { firstDay: 0, firstWeekSize: 1 },
  HK: { firstDay: 0, firstWeekSize: 1 }, // zh-HK
  HN: { firstDay: 0, firstWeekSize: 1 }, // es-HN
  HR: { firstDay: 1, firstWeekSize: 1 }, // hr-HR
  HU: { firstDay: 1, firstWeekSize: 4 }, // hu-HU
  ID: { firstDay: 0, firstWeekSize: 1 }, // id-ID or in-ID
  IE: { firstDay: 1, firstWeekSize: 4 }, // en-IE or ga-IE
  IL: { firstDay: 0, firstWeekSize: 1 }, // he-IL or iw-IL
  IN: { firstDay: 0, firstWeekSize: 1 }, // as-IN or bn-IN | en-IN | gu-IN | hi-IN | kn-IN | kok-IN | ml-IN | mr-IN | or-IN | pa-IN | sa-IN | ta-IN | te-IN
  IQ: { firstDay: 6, firstWeekSize: 1 }, // ar-IQ
  IR: { firstDay: 6, firstWeekSize: 1 }, // fa-IR
  IS: { firstDay: 1, firstWeekSize: 4 }, // is-IS
  IT: { firstDay: 1, firstWeekSize: 4 }, // it-IT
  JM: { firstDay: 0, firstWeekSize: 1 }, // en-JM
  JO: { firstDay: 6, firstWeekSize: 1 }, // ar-JO
  JP: { firstDay: 0, firstWeekSize: 1 }, // ja-JP
  KE: { firstDay: 0, firstWeekSize: 1 }, // sw-KE
  KG: { firstDay: 1, firstWeekSize: 1 }, // ky-KG
  KH: { firstDay: 0, firstWeekSize: 1 }, // km-KH
  KR: { firstDay: 0, firstWeekSize: 1 }, // ko-KR
  KW: { firstDay: 6, firstWeekSize: 1 }, // ar-KW
  KZ: { firstDay: 1, firstWeekSize: 1 }, // kk-KZ
  LA: { firstDay: 0, firstWeekSize: 1 }, // lo-LA
  LB: { firstDay: 1, firstWeekSize: 1 }, // ar-LB
  LI: { firstDay: 1, firstWeekSize: 4 }, // de-LI
  LK: { firstDay: 1, firstWeekSize: 1 }, // si-LK
  LT: { firstDay: 1, firstWeekSize: 4 }, // lt-LT
  LU: { firstDay: 1, firstWeekSize: 4 }, // de-LU or fr-LU | lb-LU
  LV: { firstDay: 1, firstWeekSize: 1 }, // lv-LV
  LY: { firstDay: 6, firstWeekSize: 1 }, // ar-LY
  MC: { firstDay: 1, firstWeekSize: 4 }, // fr-MC
  MD: { firstDay: 1, firstWeekSize: 1 },
  ME: { firstDay: 1, firstWeekSize: 1 }, // sr-Cyrl-ME or sr-Latn-ME | sr-ME
  MH: { firstDay: 0, firstWeekSize: 1 },
  MK: { firstDay: 1, firstWeekSize: 1 }, // mk-MK
  MM: { firstDay: 1, firstWeekSize: 1 },
  MN: { firstDay: 1, firstWeekSize: 1 }, // mn-MN
  MO: { firstDay: 0, firstWeekSize: 1 }, // zh-MO
  MQ: { firstDay: 1, firstWeekSize: 1 },
  MT: { firstDay: 0, firstWeekSize: 1 }, // en-MT or mt-MT
  MV: { firstDay: 5, firstWeekSize: 1 }, // dv-MV
  MX: { firstDay: 0, firstWeekSize: 1 }, // es-MX
  MY: { firstDay: 1, firstWeekSize: 1 }, // en-MY or ms-MY
  MZ: { firstDay: 1, firstWeekSize: 1 },
  NI: { firstDay: 0, firstWeekSize: 1 }, // es-NI
  NL: { firstDay: 1, firstWeekSize: 4 }, // fy-NL or nl-NL
  NO: { firstDay: 1, firstWeekSize: 4 }, // nb-NO or nn-NO | se-NO | sma-NO | smj-NO
  NP: { firstDay: 0, firstWeekSize: 1 }, // ne-NP
  NZ: { firstDay: 1, firstWeekSize: 1 }, // en-NZ or mi-NZ
  OM: { firstDay: 6, firstWeekSize: 1 }, // ar-OM
  PA: { firstDay: 0, firstWeekSize: 1 }, // es-PA
  PE: { firstDay: 0, firstWeekSize: 1 }, // es-PE or quz-PE
  PH: { firstDay: 0, firstWeekSize: 1 }, // en-PH or fil-PH
  PK: { firstDay: 0, firstWeekSize: 1 }, // ur-PK
  PL: { firstDay: 1, firstWeekSize: 4 }, // pl-PL
  PR: { firstDay: 0, firstWeekSize: 1 }, // es-PR
  PT: { firstDay: 0, firstWeekSize: 4 }, // pt-PT
  PY: { firstDay: 0, firstWeekSize: 1 }, // es-PY
  QA: { firstDay: 6, firstWeekSize: 1 }, // ar-QA
  RE: { firstDay: 1, firstWeekSize: 1 },
  RO: { firstDay: 1, firstWeekSize: 1 }, // ro-RO
  RS: { firstDay: 1, firstWeekSize: 1 }, // sr-Cyrl-RS or sr-Latn-RS | sr-RS
  RU: { firstDay: 1, firstWeekSize: 4 }, // ba-RU or ru-RU | sah-RU | tt-RU
  SA: { firstDay: 0, firstWeekSize: 1 }, // ar-SA
  SD: { firstDay: 6, firstWeekSize: 1 }, // ar-SD
  SE: { firstDay: 1, firstWeekSize: 4 }, // se-SE or sma-SE | smj-SE | sv-SE
  SG: { firstDay: 0, firstWeekSize: 1 }, // en-SG or zh-SG
  SI: { firstDay: 1, firstWeekSize: 1 }, // sl-SI
  SK: { firstDay: 1, firstWeekSize: 4 }, // sk-SK
  SM: { firstDay: 0, firstWeekSize: 1 },
  SV: { firstDay: 0, firstWeekSize: 1 }, // es-SV
  SY: { firstDay: 6, firstWeekSize: 1 }, // ar-SY or syr-SY
  TH: { firstDay: 0, firstWeekSize: 1 }, // th-TH
  TJ: { firstDay: 1, firstWeekSize: 1 }, // tg-Cyrl-TJ
  TM: { firstDay: 1, firstWeekSize: 1 }, // tk-TM
  TR: { firstDay: 1, firstWeekSize: 1 }, // tr-TR
  TT: { firstDay: 0, firstWeekSize: 1 }, // en-TT
  TW: { firstDay: 0, firstWeekSize: 1 }, // zh-TW
  UA: { firstDay: 1, firstWeekSize: 1 }, // uk-UA
  UM: { firstDay: 1, firstWeekSize: 1 },
  US: { firstDay: 0, firstWeekSize: 1 }, // en-US or es-US
  UY: { firstDay: 1, firstWeekSize: 1 }, // es-UY
  UZ: { firstDay: 1, firstWeekSize: 1 }, // uz-Cyrl-UZ or uz-Latn-UZ
  VA: { firstDay: 1, firstWeekSize: 1 },
  VE: { firstDay: 0, firstWeekSize: 1 }, // es-VE
  VI: { firstDay: 1, firstWeekSize: 1 },
  VN: { firstDay: 1, firstWeekSize: 1 }, // vi-VN
  WS: { firstDay: 1, firstWeekSize: 1 },
  XK: { firstDay: 1, firstWeekSize: 1 },
  YE: { firstDay: 0, firstWeekSize: 1 }, // ar-YE
  ZA: { firstDay: 0, firstWeekSize: 1 }, // af-ZA or en-ZA | nso-ZA | tn-ZA | xh-ZA | zu-ZA
  ZW: { firstDay: 0, firstWeekSize: 1 }, // en-ZW
}

function getWeekArray (date: Date, locale: string, firstDayOfWeek?: number) {
  const weeks = []
  let currentWeek = []
  const firstDayOfMonth = startOfMonth(date)
  const lastDayOfMonth = endOfMonth(date)
  const first = firstDayOfWeek ?? weekInfo[locale.slice(-2).toUpperCase()]?.firstDay ?? 0
  const firstDayWeekIndex = (firstDayOfMonth.getDay() - first + 7) % 7
  const lastDayWeekIndex = (lastDayOfMonth.getDay() - first + 7) % 7

  for (let i = 0; i < firstDayWeekIndex; i++) {
    const adjacentDay = new Date(firstDayOfMonth)
    adjacentDay.setDate(adjacentDay.getDate() - (firstDayWeekIndex - i))
    currentWeek.push(adjacentDay)
  }

  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const day = new Date(date.getFullYear(), date.getMonth(), i)

    // Add the day to the current week
    currentWeek.push(day)

    // If the current week has 7 days, add it to the weeks array and start a new week
    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  }

  for (let i = 1; i < 7 - lastDayWeekIndex; i++) {
    const adjacentDay = new Date(lastDayOfMonth)
    adjacentDay.setDate(adjacentDay.getDate() + i)
    currentWeek.push(adjacentDay)
  }

  if (currentWeek.length > 0) {
    weeks.push(currentWeek)
  }

  return weeks
}

function startOfWeek (date: Date, locale: string, firstDayOfWeek?: number) {
  const day = firstDayOfWeek ?? weekInfo[locale.slice(-2).toUpperCase()]?.firstDay ?? 0

  const d = new Date(date)
  while (d.getDay() !== day) {
    d.setDate(d.getDate() - 1)
  }
  return d
}

function endOfWeek (date: Date, locale: string) {
  const d = new Date(date)
  const lastDay = ((weekInfo[locale.slice(-2).toUpperCase()]?.firstDay ?? 0) + 6) % 7
  while (d.getDay() !== lastDay) {
    d.setDate(d.getDate() + 1)
  }
  return d
}

function startOfMonth (date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function endOfMonth (date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

function parseLocalDate (value: string): Date {
  const parts = value.split('-').map(Number)

  // new Date() uses local time zone when passing individual date component values
  return new Date(parts[0], parts[1] - 1, parts[2])
}

const _YYYMMDD = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/

function date (value?: any): Date | null {
  if (value == null) return new Date()

  if (value instanceof Date) return value

  if (typeof value === 'string') {
    let parsed

    if (_YYYMMDD.test(value)) {
      return parseLocalDate(value)
    } else {
      parsed = Date.parse(value)
    }

    if (!isNaN(parsed)) return new Date(parsed)
  }

  return null
}

const sundayJanuarySecond2000 = new Date(2000, 0, 2)

function getWeekdays (locale: string, firstDayOfWeek?: number) {
  const daysFromSunday = firstDayOfWeek ?? weekInfo[locale.slice(-2).toUpperCase()]?.firstDay ?? 0

  return createRange(7).map(i => {
    const weekday = new Date(sundayJanuarySecond2000)
    weekday.setDate(sundayJanuarySecond2000.getDate() + daysFromSunday + i)
    return new Intl.DateTimeFormat(locale, { weekday: 'narrow' }).format(weekday)
  })
}

function format (
  value: Date,
  formatString: string,
  locale: string,
  formats?: Record<string, CustomDateFormat>
): string {
  const newDate = date(value) ?? new Date()
  const customFormat = formats?.[formatString]

  if (typeof customFormat === 'function') {
    return customFormat(newDate, formatString, locale)
  }

  let options: Intl.DateTimeFormatOptions = {}
  switch (formatString) {
    case 'fullDate':
      options = { year: 'numeric', month: 'long', day: 'numeric' }
      break
    case 'fullDateWithWeekday':
      options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      break
    case 'normalDate':
      const day = newDate.getDate()
      const month = new Intl.DateTimeFormat(locale, { month: 'long' }).format(newDate)
      return `${day} ${month}`
    case 'normalDateWithWeekday':
      options = { weekday: 'short', day: 'numeric', month: 'short' }
      break
    case 'shortDate':
      options = { month: 'short', day: 'numeric' }
      break
    case 'year':
      options = { year: 'numeric' }
      break
    case 'month':
      options = { month: 'long' }
      break
    case 'monthShort':
      options = { month: 'short' }
      break
    case 'monthAndYear':
      options = { month: 'long', year: 'numeric' }
      break
    case 'monthAndDate':
      options = { month: 'long', day: 'numeric' }
      break
    case 'weekday':
      options = { weekday: 'long' }
      break
    case 'weekdayShort':
      options = { weekday: 'short' }
      break
    case 'dayOfMonth':
      return new Intl.NumberFormat(locale).format(newDate.getDate())
    case 'hours12h':
      options = { hour: 'numeric', hour12: true }
      break
    case 'hours24h':
      options = { hour: 'numeric', hour12: false }
      break
    case 'minutes':
      options = { minute: 'numeric' }
      break
    case 'seconds':
      options = { second: 'numeric' }
      break
    case 'fullTime':
      options = { hour: 'numeric', minute: 'numeric' }
      break
    case 'fullTime12h':
      options = { hour: 'numeric', minute: 'numeric', hour12: true }
      break
    case 'fullTime24h':
      options = { hour: 'numeric', minute: 'numeric', hour12: false }
      break
    case 'fullDateTime':
      options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }
      break
    case 'fullDateTime12h':
      options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }
      break
    case 'fullDateTime24h':
      options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false }
      break
    case 'keyboardDate':
      options = { year: 'numeric', month: '2-digit', day: '2-digit' }
      break
    case 'keyboardDateTime':
      options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric' }
      return new Intl.DateTimeFormat(locale, options).format(newDate).replace(/, /g, ' ')
    case 'keyboardDateTime12h':
      options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric', hour12: true }
      return new Intl.DateTimeFormat(locale, options).format(newDate).replace(/, /g, ' ')
    case 'keyboardDateTime24h':
      options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric', hour12: false }
      return new Intl.DateTimeFormat(locale, options).format(newDate).replace(/, /g, ' ')
    default:
      options = customFormat ?? { timeZone: 'UTC', timeZoneName: 'short' }
  }

  return new Intl.DateTimeFormat(locale, options).format(newDate)
}

function toISO (adapter: DateAdapter<any>, value: Date) {
  const date = adapter.toJsDate(value)
  const year = date.getFullYear()
  const month = padStart(String(date.getMonth() + 1), 2, '0')
  const day = padStart(String(date.getDate()), 2, '0')

  return `${year}-${month}-${day}`
}

function parseISO (value: string) {
  const [year, month, day] = value.split('-').map(Number)

  return new Date(year, month - 1, day)
}

function addMinutes (date: Date, amount: number) {
  const d = new Date(date)
  d.setMinutes(d.getMinutes() + amount)
  return d
}

function addHours (date: Date, amount: number) {
  const d = new Date(date)
  d.setHours(d.getHours() + amount)
  return d
}

function addDays (date: Date, amount: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + amount)
  return d
}

function addWeeks (date: Date, amount: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + (amount * 7))
  return d
}

function addMonths (date: Date, amount: number) {
  const d = new Date(date)
  d.setDate(1)
  d.setMonth(d.getMonth() + amount)
  return d
}

function getYear (date: Date) {
  return date.getFullYear()
}

function getMonth (date: Date) {
  return date.getMonth()
}

function getWeek (date: Date, locale: string, firstDayOfWeek?: number, firstWeekMinSize?: number) {
  const weekInfoFromLocale = weekInfo[locale.slice(-2).toUpperCase()]
  const weekStart = firstDayOfWeek ?? weekInfoFromLocale?.firstDay ?? 0
  const minWeekSize = firstWeekMinSize ?? weekInfoFromLocale?.firstWeekSize ?? 1
  function firstWeekSize (year: number) {
    const yearStart = new Date(year, 0, 1)
    return 7 - getDiff(yearStart, startOfWeek(yearStart, locale, weekStart), 'days')
  }

  let year = getYear(date)
  const currentWeekEnd = addDays(startOfWeek(date, locale, weekStart), 6)
  if (year < getYear(currentWeekEnd)) {
    if (firstWeekSize(year + 1) >= minWeekSize) {
      year++
    }
  }

  const yearStart = new Date(year, 0, 1)
  const size = firstWeekSize(year)
  const d1w1 = size >= minWeekSize
    ? addDays(yearStart, size - 7)
    : addDays(yearStart, size)

  return 1 + getDiff(date, d1w1, 'weeks')
}

function getDate (date: Date) {
  return date.getDate()
}

function getNextMonth (date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1)
}

function getPreviousMonth (date: Date) {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1)
}

function getHours (date: Date) {
  return date.getHours()
}

function getMinutes (date: Date) {
  return date.getMinutes()
}

function startOfYear (date: Date) {
  return new Date(date.getFullYear(), 0, 1)
}
function endOfYear (date: Date) {
  return new Date(date.getFullYear(), 11, 31)
}

function isWithinRange (date: Date, range: [Date, Date]) {
  return isAfter(date, range[0]) && isBefore(date, range[1])
}

function isValid (date: any) {
  const d = new Date(date)

  return d instanceof Date && !isNaN(d.getTime())
}

function isAfter (date: Date, comparing: Date) {
  return date.getTime() > comparing.getTime()
}

function isAfterDay (date: Date, comparing: Date): boolean {
  return isAfter(startOfDay(date), startOfDay(comparing))
}

function isBefore (date: Date, comparing: Date) {
  return date.getTime() < comparing.getTime()
}

function isEqual (date: Date, comparing: Date) {
  return date.getTime() === comparing.getTime()
}

function isSameDay (date: Date, comparing: Date) {
  return date.getDate() === comparing.getDate() &&
    date.getMonth() === comparing.getMonth() &&
    date.getFullYear() === comparing.getFullYear()
}

function isSameMonth (date: Date, comparing: Date) {
  return date.getMonth() === comparing.getMonth() &&
    date.getFullYear() === comparing.getFullYear()
}

function isSameYear (date: Date, comparing: Date) {
  return date.getFullYear() === comparing.getFullYear()
}

function getDiff (date: Date, comparing: Date | string, unit?: string) {
  const d = new Date(date)
  const c = new Date(comparing)

  switch (unit) {
    case 'years':
      return d.getFullYear() - c.getFullYear()
    case 'quarters':
      return Math.floor((d.getMonth() - c.getMonth() + (d.getFullYear() - c.getFullYear()) * 12) / 4)
    case 'months':
      return d.getMonth() - c.getMonth() + (d.getFullYear() - c.getFullYear()) * 12
    case 'weeks':
      return Math.floor((d.getTime() - c.getTime()) / (1000 * 60 * 60 * 24 * 7))
    case 'days':
      return Math.floor((d.getTime() - c.getTime()) / (1000 * 60 * 60 * 24))
    case 'hours':
      return Math.floor((d.getTime() - c.getTime()) / (1000 * 60 * 60))
    case 'minutes':
      return Math.floor((d.getTime() - c.getTime()) / (1000 * 60))
    case 'seconds':
      return Math.floor((d.getTime() - c.getTime()) / 1000)
    default: {
      return d.getTime() - c.getTime()
    }
  }
}

function setHours (date: Date, count: number) {
  const d = new Date(date)
  d.setHours(count)
  return d
}

function setMinutes (date: Date, count: number) {
  const d = new Date(date)
  d.setMinutes(count)
  return d
}

function setMonth (date: Date, count: number) {
  const d = new Date(date)
  d.setMonth(count)
  return d
}

function setDate (date: Date, day: number) {
  const d = new Date(date)
  d.setDate(day)
  return d
}

function setYear (date: Date, year: number) {
  const d = new Date(date)
  d.setFullYear(year)
  return d
}

function startOfDay (date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
}

function endOfDay (date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999)
}

export class VuetifyDateAdapter implements DateAdapter<Date> {
  locale: string
  formats?: Record<string, CustomDateFormat>

  constructor (options: { locale: string, formats?: Record<string, CustomDateFormat> }) {
    this.locale = options.locale
    this.formats = options.formats
  }

  date (value?: any) {
    return date(value)
  }

  toJsDate (date: Date) {
    return date
  }

  toISO (date: Date): string {
    return toISO(this, date)
  }

  parseISO (date: string) {
    return parseISO(date)
  }

  addMinutes (date: Date, amount: number) {
    return addMinutes(date, amount)
  }

  addHours (date: Date, amount: number) {
    return addHours(date, amount)
  }

  addDays (date: Date, amount: number) {
    return addDays(date, amount)
  }

  addWeeks (date: Date, amount: number) {
    return addWeeks(date, amount)
  }

  addMonths (date: Date, amount: number) {
    return addMonths(date, amount)
  }

  getWeekArray (date: Date, firstDayOfWeek?: number | string) {
    return getWeekArray(date, this.locale, firstDayOfWeek ? Number(firstDayOfWeek) : undefined)
  }

  startOfWeek (date: Date, firstDayOfWeek?: number | string): Date {
    return startOfWeek(date, this.locale, firstDayOfWeek ? Number(firstDayOfWeek) : undefined)
  }

  endOfWeek (date: Date): Date {
    return endOfWeek(date, this.locale)
  }

  startOfMonth (date: Date) {
    return startOfMonth(date)
  }

  endOfMonth (date: Date) {
    return endOfMonth(date)
  }

  format (date: Date, formatString: string) {
    return format(date, formatString, this.locale, this.formats)
  }

  isEqual (date: Date, comparing: Date) {
    return isEqual(date, comparing)
  }

  isValid (date: any) {
    return isValid(date)
  }

  isWithinRange (date: Date, range: [Date, Date]) {
    return isWithinRange(date, range)
  }

  isAfter (date: Date, comparing: Date) {
    return isAfter(date, comparing)
  }

  isAfterDay (date: Date, comparing: Date) {
    return isAfterDay(date, comparing)
  }

  isBefore (date: Date, comparing: Date) {
    return !isAfter(date, comparing) && !isEqual(date, comparing)
  }

  isSameDay (date: Date, comparing: Date) {
    return isSameDay(date, comparing)
  }

  isSameMonth (date: Date, comparing: Date) {
    return isSameMonth(date, comparing)
  }

  isSameYear (date: Date, comparing: Date) {
    return isSameYear(date, comparing)
  }

  setMinutes (date: Date, count: number) {
    return setMinutes(date, count)
  }

  setHours (date: Date, count: number) {
    return setHours(date, count)
  }

  setMonth (date: Date, count: number) {
    return setMonth(date, count)
  }

  setDate (date: Date, day: number): Date {
    return setDate(date, day)
  }

  setYear (date: Date, year: number) {
    return setYear(date, year)
  }

  getDiff (date: Date, comparing: Date | string, unit?: string) {
    return getDiff(date, comparing, unit)
  }

  getWeekdays (firstDayOfWeek?: number | string) {
    return getWeekdays(this.locale, firstDayOfWeek ? Number(firstDayOfWeek) : undefined)
  }

  getYear (date: Date) {
    return getYear(date)
  }

  getMonth (date: Date) {
    return getMonth(date)
  }

  getWeek (date: Date, firstDayOfWeek?: number | string, firstWeekMinSize?: number) {
    return getWeek(date, this.locale, firstDayOfWeek ? Number(firstDayOfWeek) : undefined, firstWeekMinSize)
  }

  getDate (date: Date) {
    return getDate(date)
  }

  getNextMonth (date: Date) {
    return getNextMonth(date)
  }

  getPreviousMonth (date: Date) {
    return getPreviousMonth(date)
  }

  getHours (date: Date) {
    return getHours(date)
  }

  getMinutes (date: Date) {
    return getMinutes(date)
  }

  startOfDay (date: Date) {
    return startOfDay(date)
  }

  endOfDay (date: Date) {
    return endOfDay(date)
  }

  startOfYear (date: Date) {
    return startOfYear(date)
  }

  endOfYear (date: Date) {
    return endOfYear(date)
  }
}
