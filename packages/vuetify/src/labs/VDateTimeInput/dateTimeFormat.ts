// Composables
import { useDate } from '@/composables/date'
import { useDateFormat } from '@/composables/dateFormat'
import { maskSegmentsFrom, toMaskSource } from '@/composables/segmentedMask'
import { useTimeFormat } from '@/composables/timeFormat'

// Utilities
import { toRef } from 'vue'
import { isString } from '@/util'

// Types
import type { Ref } from 'vue'
import type { DateFormatProps } from '@/composables/dateFormat'
import type { MaskEditResult } from '@/composables/segmentedMask'
import type { TimeFormatProps } from '@/composables/timeFormat'

// a zone suffix fails the match, a moment in time has no wall clock until the app picks its zone
const pattern = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2})(?::\d{2}(?:\.\d+)?)?)?$/

// a local `YYYY-MM-DDTHH:mm` string, the shape that keeps plain string comparison in order
export function normalize (value: unknown, time: string) {
  const match = isString(value) ? pattern.exec(value) : null

  return match ? `${match[1]}T${match[2] ?? time}` : null
}

export function useDateTimeFormat (props: DateFormatProps & TimeFormatProps, locale: Ref<string>) {
  const adapter = useDate()
  // the input stays left to right like VTimeInput, an rtl locale only aligns it to the right
  const dateFormat = useDateFormat(props, locale, toRef(() => false))
  const timeFormat = useTimeFormat(props, locale)

  const placeholder = toRef(() => `${dateFormat.parserFormat.value} ${timeFormat.placeholder.value}`)

  function toDay (date: unknown) {
    return adapter.toISO(date).split('T')[0]
  }

  // the date takes the digits it has room for, whatever is left over flows into the time
  function mask (input: string, caret = -1): MaskEditResult {
    const source = toMaskSource(input, /[^\d/.\-: ]/g, caret)
    const date = maskSegmentsFrom(dateFormat.segments.value, source.text, 0, source.caret)

    if (!date.complete) {
      return {
        value: date.value,
        caret: date.caret < 0 ? date.value.length : date.caret,
        width: date.width,
        gaps: date.gaps,
        complete: false,
      }
    }

    const inDate = date.caret >= 0 && date.caret < date.value.length
    const time = timeFormat.maskTime(
      source.text.slice(date.index),
      inDate || source.caret < 0 ? -1 : Math.max(source.caret - date.index, 0),
    )
    const prefix = `${date.value} `

    return {
      value: prefix + time.value,
      caret: inDate ? date.caret : prefix.length + time.caret,
      width: prefix.length + time.width,
      gaps: date.gaps || time.gaps,
      complete: time.complete,
    }
  }

  // the date never holds a space, the first one starts the time
  function split (text: string) {
    const boundary = text.indexOf(' ')

    return boundary < 0
      ? { date: text, time: '', boundary: text.length }
      : { date: text.slice(0, boundary), time: text.slice(boundary + 1), boundary }
  }

  function getHint (text: string) {
    const { date, time, boundary } = split(text)

    return boundary < text.length
      ? timeFormat.getHint(time)
      : `${dateFormat.getHint(date)} ${timeFormat.placeholder.value}`
  }

  function parse (text: string, defaultTime: string) {
    const { date, time } = split(text.trim())
    const day = dateFormat.parseDate(date)
    const clock = time.trim() ? timeFormat.parseTime(time) : defaultTime

    return day && clock ? `${toDay(day)}T${clock}` : null
  }

  function format (value: string) {
    return `${dateFormat.formatDate(adapter.parseISO(value.slice(0, 10)))} ${timeFormat.formatTime(value.slice(11))}`
  }

  return {
    hour12: timeFormat.hour12,
    period: timeFormat.period,
    placeholder,
    readPeriod: timeFormat.readPeriod,
    format,
    getHint,
    mask,
    parse,
    split,
    toDay,
  }
}
