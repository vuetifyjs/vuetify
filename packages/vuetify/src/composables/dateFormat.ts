// Composables
import { useDate } from '@/composables/date/date'
import { dateSegments, maskSegmentsFrom, remainingHint, toMaskSource } from '@/composables/segmentedMask'

// Utilities
import { toRef } from 'vue'
import { consoleWarn, isString, propsFactory } from '@/util'

// Types
import type { Ref } from 'vue'
import type { Segment } from '@/composables/segmentedMask'

type HintToken = {
  text: string
  size: number
  fill: boolean // spelled one character per digit, so typing can strike it off letter by letter
}

const fieldName = { y: 'year', m: 'month', d: 'day' } as const

const rtlScript = /[\p{Script=Arabic}\p{Script=Hebrew}\p{Script=Thaana}]/u
const mirrorRtl = (text: string) => rtlScript.test(text) ? [...text].reverse().join('') : text

const nativeName: Record<string, Record<string, string>> = {
  ar: { y: 'سنة', m: 'شهر' },
  ko: { y: '연도' },
}

// Types
export interface DateFormatProps {
  inputFormat?: string
  multiple?: boolean | 'range' | number | (string & {})
  placeholder?: string
}

class DateFormatSpec {
  constructor (
    public readonly order: string, // mdy | dmy | ymd
    public readonly separator: string // / | - | .
  ) { }

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
    const parts = new Intl.DateTimeFormat(localeForDateFormat, { year: 'numeric', month: '2-digit', day: '2-digit' })
      .formatToParts(adapter.toJsDate(adapter.parseISO('1999-12-07')))

    const logicalOrder = parts.filter(p => ['year', 'month', 'day'].includes(p.type)).map(p => p.type[0]).join('')
    const literal = parts.find(p => p.type === 'literal')?.value ?? ''
    const separator = ['/', '-', '.'].find(sign => literal.includes(sign)) ?? '/'

    if (logicalOrder.length !== 3) {
      consoleWarn(`Date format inferred from locale [${localeForDateFormat}] is invalid: [${logicalOrder}]`)
      return new DateFormatSpec('mdy', '/')
    }

    const visualOrder = literal.includes('\u200f')
      ? [...logicalOrder].reverse().join('')
      : logicalOrder

    return new DateFormatSpec(visualOrder, separator)
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

  const typingOrder = toRef(() => {
    const { order } = currentFormat.value

    return isRtl.value
      ? [...order].reverse().join('')
      : order
  })

  const layout = toRef(() => {
    const isRange = props.multiple === 'range'
    const limit = isRange ? 2 : props.multiple ? Infinity : 1

    return {
      join: isRange ? ' - ' : ', ',
      limit,
      bounded: Number.isFinite(limit),
    }
  })

  function fieldNames () {
    const tag = locale.value || 'en'

    try {
      const display = new Intl.DisplayNames(tag, { type: 'dateTimeField' })
      const native = nativeName[tag.split('-')[0]] ?? {}

      return Object.fromEntries(
        Object.entries(fieldName).map(([key, field]) => [key, native[key] ?? display.of(field)])
      ) as Record<string, string | undefined>
    } catch {
      return null
    }
  }

  function spell (name: string, size: number) {
    return /[\p{Script=Latin}\p{Script=Cyrillic}\p{Script=Greek}]/u.test([...name][0])
      ? [...name][0].repeat(size)
      : name
  }

  const hintTokens = toRef((): HintToken[] => {
    const { order, separator } = currentFormat.value
    const custom = props.placeholder?.split(separator)
    const named = custom?.length === 3 && !/\d/.test(props.placeholder!)
    const names = named ? null : fieldNames()

    return dateSegments(order, separator).map((segment: Segment, i: number) => {
      if (segment.type === 'separator') {
        return { text: segment.value, size: segment.value.length, fill: true }
      }

      const text = named ? custom![i / 2] : spell(names?.[segment.key] || segment.key, segment.size)

      return { text, size: segment.size, fill: text.length === segment.size && new Set(text).size === 1 }
    })
  })

  const segments = toRef(() => dateSegments(typingOrder.value, currentFormat.value.separator, autoFixYear))

  function mirror (text: string, caret = -1) {
    const parts = text.split(/(\D+)/)
    const value = [...parts].reverse().join('')

    if (caret < 0) return { value, caret }

    let at = 0
    let start = 0

    while (at < parts.length - 1 && caret > start + parts[at].length) {
      start += parts[at].length + parts[at + 1].length
      at += 2
    }

    const mirroredCaret = text.length - start - parts[at].length + Math.max(caret - start, 0)

    return { value, caret: mirroredCaret }
  }

  function joinDates (dates: string[]) {
    return (isRtl.value
      ? [...dates].reverse()
      : dates).join(layout.value.join)
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

  function remainingFormat (width: number, dates: number) {
    const { bounded, join, limit } = layout.value
    const tokens = Array.from({ length: bounded ? limit : dates }, () => hintTokens.value)
      .flatMap((date, i) => i ? [{ text: join, size: join.length, fill: true }, ...date] : date)

    // the value grows from the end the format is read from, the hint is the stretch it has not reached
    const ordered = isRtl.value ? [...tokens].reverse() : tokens
    let left = width

    const parts = ordered.map(({ text, size, fill }) => {
      if (left >= size) {
        left -= size
        return ''
      }

      const shown = fill
        ? (isRtl.value ? text.slice(0, size - left) : text.slice(left))
        : (left ? '' : text)

      left = 0

      return shown
    })

    return {
      text: (isRtl.value ? parts.reverse() : parts).join(''),
      covered: width >= tokens.reduce((total, token) => total + token.size, 0),
    }
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

    const { text: hint, covered } = remainingFormat(width, dates)

    return {
      value: result,
      caret: outCaret < 0 ? result.length : outCaret,
      width,
      gaps,
      hint,
      complete: layout.value.bounded && covered,
    }
  }

  function maskDate (input: string, caret = -1, inPlace = false) {
    if (!isRtl.value) {
      return maskInTypingOrder(input, caret)
    }

    const typed = mirror(input, caret)
    const at = caret >= input.length ? typed.value.length : typed.caret
    const masked = maskInTypingOrder(typed.value, at)
    const shown = mirror(masked.value, masked.caret)
    const filled = !inPlace && masked.caret >= masked.value.length && masked.complete

    return {
      ...masked,
      value: shown.value,
      caret: filled ? 0 : shown.caret,
    }
  }

  function getHint (text: string) {
    const { value, hint } = maskDate(text)
    const flip = (v: string) => isRtl.value ? [...v].reverse().join('') : v

    return flip(remainingHint(flip(value), flip(hint), flip(text)))
  }

  function formatDate (value: unknown) {
    const parts = adapter.toISO(value).split('T')[0].split('-')

    return currentFormat.value.order.split('')
      .map(sign => parts['ymd'.indexOf(sign)])
      .join(currentFormat.value.separator)
  }

  return {
    isValid,
    getHint,
    joinDates,
    maskDate,
    parseDate,
    formatDate,
    separator: toRef(() => currentFormat.value.separator),
    parserFormat: toRef(() => mirrorRtl(hintTokens.value.map(token => token.text).join(''))),
  }
}
