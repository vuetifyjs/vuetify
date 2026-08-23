// Composables
import { useDate } from '@/composables/date/date'
import { dateSegments, maskSegmentsFrom, toMaskSource } from '@/composables/segmentedMask'

// Utilities
import { toRef } from 'vue'
import { consoleWarn, isString, propsFactory } from '@/util'

// Types
import type { Ref } from 'vue'

// Types
export interface DateFormatProps {
  inputFormat?: string
  multiple?: boolean | 'range' | number | (string & {})
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

export function useDateFormat (props: DateFormatProps, locale: Ref<string>, isRtl: Ref<boolean>) {
  const adapter = useDate()

  function inferFromLocale () {
    const localeForDateFormat = locale.value ?? 'en-US'
    const parts = Intl.DateTimeFormat(localeForDateFormat, { year: 'numeric', month: '2-digit', day: '2-digit' })
      .formatToParts(adapter.toJsDate(adapter.parseISO('1999-12-07')))

    const logical = parts.filter(p => ['year', 'month', 'day'].includes(p.type)).map(p => p.type[0]).join('')
    const literal = parts.find(p => p.type === 'literal')?.value ?? ''
    const separator = ['/', '-', '.'].find(sign => literal.includes(sign)) ?? '/'

    if (logical.length !== 3) {
      consoleWarn(`Date format inferred from locale [${localeForDateFormat}] is invalid: [${logical}]`)
      return new DateFormatSpec('mdy', '/')
    }

    // CLDR wraps arabic patterns in U+200F, which renders a day-first date year-first, we reorder instead
    const order = literal.includes('\u200f') ? [...logical].reverse().join('') : logical

    return new DateFormatSpec(order, separator)
  }

  const currentFormat = toRef(() => {
    return DateFormatSpec.canBeParsed(props.inputFormat)
      ? DateFormatSpec.parse(props.inputFormat!)
      : inferFromLocale()
  })

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

  // an rtl field is filled from its other end, so its sections are typed the other way round
  const typingOrder = toRef(() => {
    const { order } = currentFormat.value

    return isRtl.value ? [...order].reverse().join('') : order
  })

  const layout = toRef(() => {
    const isRange = props.multiple === 'range'
    const limit = isRange ? 2 : props.multiple ? Infinity : 1

    return {
      join: isRange ? ' - ' : ', ',
      limit,
      // a list takes another date whatever it holds, a single date and a range do not
      bounded: Number.isFinite(limit),
    }
  })

  const segments = toRef(() => dateSegments(typingOrder.value, currentFormat.value.separator, autoFixYear))

  // an rtl value is masked in typing order and shown the other way round, its sections swap ends
  function mirror (text: string, caret = -1) {
    // sections sit on the even indices, the separators that divide them on the odd ones
    const parts = text.split(/(\D+)/)
    const value = [...parts].reverse().join('')

    if (caret < 0) return { value, caret }

    let at = 0
    let start = 0

    while (at < parts.length - 1 && caret > start + parts[at].length) {
      start += parts[at].length + parts[at + 1].length
      at += 2
    }

    // the section keeps the caret, its digits still read left to right
    return { value, caret: text.length - start - parts[at].length + Math.max(caret - start, 0) }
  }

  // dates are typed one after another, an rtl field lays them out the other way round
  function joinDates (dates: string[]) {
    return (isRtl.value ? [...dates].reverse() : dates).join(layout.value.join)
  }

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

  // the sections the value has not grown into yet, on the end it grows towards
  function hintFrom (width: number, dates: number) {
    const { bounded, join, limit } = layout.value
    const { format } = currentFormat.value
    const template = Array.from({ length: bounded ? limit : dates }, () => format).join(join)

    return isRtl.value ? template.slice(0, template.length - width) : template.slice(width)
  }

  function maskInTypingOrder (input: string, caret: number) {
    const { join, limit } = layout.value
    const { text, caret: before } = toMaskSource(input, /[^\d/.\- ]/g, caret)

    let result = ''
    let index = 0
    let width = 0
    let outCaret = -1
    let gaps = false
    let dates = 1

    for (let date = 0; date < limit; date++) {
      const start = index
      const masked = maskSegmentsFrom(segments.value, text, index, before)
      index = masked.index

      // the next date waits for the end of the previous one
      if (index === start || !masked.value) {
        break
      }

      if (masked.caret >= 0 && outCaret < 0) {
        outCaret = result.length + masked.caret
      }

      result += masked.value
      width += masked.width
      gaps ||= masked.gaps

      if (!masked.complete || (!masked.closed && index >= text.length)) {
        break
      }

      if (date + 1 < limit) {
        result += join
        width += join.length
        dates++
      }
    }

    const hint = hintFrom(width, dates)

    return {
      value: result,
      caret: outCaret < 0 ? result.length : outCaret,
      width,
      gaps,
      hint,
      // a list takes another date however many it holds, so it is never done growing
      complete: layout.value.bounded && !hint,
    }
  }

  function maskDate (input: string, caret = -1, inPlace = false) {
    if (!isRtl.value) {
      return maskInTypingOrder(input, caret)
    }

    const typed = mirror(input, caret)
    // a caret at the end of what is shown sits at the end of what was typed, e.g. after a paste
    const at = caret >= input.length ? typed.value.length : typed.caret
    const masked = maskInTypingOrder(typed.value, at)
    const shown = mirror(masked.value, masked.caret)
    // with no section and no date left to type the caret waits where an edit would go, in front of it all
    // an overwrite keeps the caret it was given, only what was typed onto the value hands it over
    const filled = !inPlace && masked.caret >= masked.value.length && layout.value.bounded && !masked.hint

    return { ...masked, value: shown.value, caret: filled ? 0 : shown.caret }
  }

  function formatDate (value: unknown) {
    const parts = adapter.toISO(value).split('T')[0].split('-')

    return currentFormat.value.order.split('')
      .map(sign => parts['ymd'.indexOf(sign)])
      .join(currentFormat.value.separator)
  }

  return {
    isValid,
    joinDates,
    maskDate,
    parseDate,
    formatDate,
    separator: toRef(() => currentFormat.value.separator),
    parserFormat: toRef(() => currentFormat.value.format),
  }
}
