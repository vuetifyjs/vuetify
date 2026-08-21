// Composables
import { useDate } from '@/composables/date/date'
import { dateSegments, maskSegmentsFrom } from '@/composables/segmentedMask'

// Utilities
import { toRef } from 'vue'
import { consoleWarn, isString, propsFactory } from '@/util'

// Types
import type { Ref } from 'vue'
import type { Segment } from '@/composables/segmentedMask'

export interface DateFormatProps {
  inputFormat?: string
}

class DateFormatSpec {
  constructor (
    public readonly order: string,
    public readonly separator: string
  ) { }

  get format () {
    return this.order.split('')
      .map(sign => `${sign}${sign}`)
      .join(this.separator)
      .replace('yy', 'yyyy')
  }

  get segments (): Segment[] {
    return dateSegments(this.order, this.separator)
  }

  static canBeParsed (v: any) {
    if (!isString(v)) return false
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
}, 'date-format')

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

  function maskDate (input: string, multiple: boolean | 'range' | number | string = false) {
    const segments = currentFormat.value.segments
    const text = input.trimStart().replace(/[^\d/.\- ]/g, '')
    const isRange = multiple === 'range'
    const join = isRange ? ' - ' : ', '
    const limit = isRange ? 2 : multiple ? Infinity : 1
    let result = ''
    let index = 0

    for (let date = 0; date < limit; date++) {
      const start = index
      const { value, index: next, closed } = maskSegmentsFrom(segments, text, index)
      index = next

      if (index === start || !value) break

      result += value

      if (!closed && index >= text.length) break
      if (date + 1 < limit && (closed || index < text.length)) result += join
    }

    return result
  }

  function formatDate (value: unknown) {
    const parts = adapter.toISO(value).split('T')[0].split('-')

    return currentFormat.value.order.split('')
      .map(sign => parts['ymd'.indexOf(sign)])
      .join(currentFormat.value.separator)
  }

  return {
    isValid,
    maskDate,
    parseDate,
    formatDate,
    parserFormat: toRef(() => currentFormat.value.format),
    order: toRef(() => currentFormat.value.order),
    separator: toRef(() => currentFormat.value.separator),
  }
}
