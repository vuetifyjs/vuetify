// Composables
import { useDate } from '@/composables/date/date'

// Utilities
import { toRef } from 'vue'
import { consoleWarn, propsFactory } from '@/util'

// Types
import type { Ref } from 'vue'

// Types
export interface DateFormatProps {
  inputFormat?: string
}

class DateFormatSpec {
  constructor (
    public readonly order: string, // mdy | dmy | ymd
    public readonly separator: string // / | - | .
  ) { }

  get format () {
    return this.order.split('')
      .map(sign => `${sign}${sign}`)
      .join(this.separator)
      .replace('yy', 'yyyy')
  }

  static canBeParsed (v: any) {
    if (typeof v !== 'string') return false
    const lowercase = v.toLowerCase()
    return ['y', 'm', 'd'].every(sign => lowercase.includes(sign)) &&
      ['/', '-', '.'].some(sign => v.includes(sign))
  }

  static parse (v: string) {
    if (!DateFormatSpec.canBeParsed(v)) {
      throw new Error(`[${v}] cannot be parsed into date format specification`)
    }
    const order = v.toLowerCase().split('')
      .filter((c, i, all) => 'dmy'.includes(c) && all.indexOf(c) === i)
      .join('')
    const separator = ['/', '-', '.'].find(sign => v.includes(sign))!
    return new DateFormatSpec(order, separator)
  }
}

export const makeDateFormatProps = propsFactory({
  inputFormat: {
    type: String,
    validator: (v: string) => !v || DateFormatSpec.canBeParsed(v),
  },
}, 'lazy')

export function useDateFormat (props: DateFormatProps, locale: Ref<string>) {
  const adapter = useDate()

  function inferFromLocale () {
    const localeForDateFormat = locale.value ?? 'en-US'
    const formatFromLocale = Intl.DateTimeFormat(localeForDateFormat, { year: 'numeric', month: '2-digit', day: '2-digit' })
      .format(adapter.toJsDate(adapter.parseISO('1999-12-07')))
      .replace(/(07)|(٠٧)|(٢٩)|(۱۶)|(০৭)/, 'dd')
      .replace(/(12)|(١٢)|(٠٨)|(۰۹)|(১২)/, 'mm')
      .replace(/(1999)|(2542)|(١٩٩٩)|(١٤٢٠)|(۱۳۷۸)|(১৯৯৯)/, 'yyyy')
      .replace(/[^ymd\-/.]/g, '')
      .replace(/\.$/, '')

    if (!DateFormatSpec.canBeParsed(formatFromLocale)) {
      consoleWarn(`Date format inferred from locale [${localeForDateFormat}] is invalid: [${formatFromLocale}]`)
      return 'mm/dd/yyyy'
    }
    return formatFromLocale
  }

  const currentFormat = toRef(() => {
    return DateFormatSpec.canBeParsed(props.inputFormat)
      ? DateFormatSpec.parse(props.inputFormat!)
      : DateFormatSpec.parse(inferFromLocale())
  })

  function parseDate (dateString: string) {
    function parseDateParts (text: string): Record<'y' |'m' | 'd', number> {
      const parts = text.trim().split(currentFormat.value.separator)
      return {
        y: Number(parts[currentFormat.value.order.indexOf('y')]),
        m: Number(parts[currentFormat.value.order.indexOf('m')]),
        d: Number(parts[currentFormat.value.order.indexOf('d')]),
      }
    }

    function validateDateParts (dateParts: Record<string, number>) {
      const { y: year, m: month, d: day } = dateParts
      if (!year || !month || !day) return null
      if (month < 1 || month > 12) return null
      if (day < 1 || day > 31) return null
      return { year: autoFixYear(year), month, day }
    }

    function autoFixYear (year: number) {
      const currentYear = adapter.getYear(adapter.date())
      if (year > 100 || currentYear % 100 >= 50) {
        return year
      }

      const currentCentury = ~~(currentYear / 100) * 100
      return year < 50
        ? currentCentury + year
        : (currentCentury - 100) + year
    }

    const dateParts = parseDateParts(dateString)
    const validatedParts = validateDateParts(dateParts)
    if (!validatedParts) return null

    const { year, month, day } = validatedParts

    const pad = (v: number) => String(v).padStart(2, '0')
    return adapter.parseISO(`${year}-${pad(month)}-${pad(day)}`)
  }

  function isValid (text: string) {
    return !!parseDate(text)
  }

  function formatDate (value: unknown) {
    const parts = adapter.toISO(value).split('-')
    return currentFormat.value.order.split('')
      .map(sign => parts['ymd'.indexOf(sign)])
      .join(currentFormat.value.separator)
  }

  return {
    isValid,
    parseDate,
    formatDate,
    parserFormat: toRef(() => currentFormat.value.format),
  }
}
