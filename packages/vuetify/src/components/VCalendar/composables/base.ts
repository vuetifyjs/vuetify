import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import {
  createDayList,
  createNativeLocaleFormatter,
  getEndOfWeek as getEndOfWeekComposable,
  getStartOfWeek as getStartOfWeekComposable,
  getTimestampIdentifier,
  getWeekdaySkips,
  parseTimestamp,
} from '@/composables/calendar/timestamp'

import type { CalendarFormatter, CalendarTimestamp } from '@/composables/calendar/timestamp'

export function useBaseCalendar (
  props,
  currentLocale: string,
  dayFormat,
  times: object,
  weekdayFormat,
) {
  // Computeds
  const parsedWeekdays: ComputedRef<number[]> = computed(() => {
    return Array.isArray(props.weekdays)
      ? props.weekdays
      : (props.weekdays || '').split(',').map((x: number | string): Number => parseInt(x, 10))
  })

  const weekdaySkips: ComputedRef<number[]> = computed(() => {
    return getWeekdaySkips(parsedWeekdays.value)
  })

  const weekdaySkipsReverse: ComputedRef<Array<number>> = computed(() => {
    const reversed = weekdaySkips.value.slice()
    reversed.reverse()
    return reversed
  })

  const parsedStart: ComputedRef<CalendarTimestamp> = computed(() => {
    return parseTimestamp(props.start, true)
  })

  const parsedEnd: ComputedRef<CalendarTimestamp> = computed(() => {
    const pStart = parsedStart.value
    const pEnd: CalendarTimestamp = props.end ? parseTimestamp(props.end) || pStart : pStart

    return getTimestampIdentifier(pEnd) < getTimestampIdentifier(pStart) ? pStart : pEnd
  })

  const days: ComputedRef<Array<CalendarTimestamp>> = computed(() => {
    return createDayList(
      parsedStart.value,
      parsedEnd.value,
      times.today,
      weekdaySkips.value
    )
  })

  const dayFormatter: ComputedRef<CalendarFormatter> = computed(() => {
    if (dayFormat) {
      return dayFormat as CalendarFormatter
    }

    const options = { timeZone: 'UTC', day: 'numeric' }

    return createNativeLocaleFormatter(
      currentLocale,
      (_tms, _short) => options
    )
  })

  const weekdayFormatter: ComputedRef<CalendarFormatter> = computed(() => {
    if (weekdayFormat) {
      return weekdayFormat as CalendarFormatter
    }

    const longOptions = { timeZone: 'UTC', weekday: 'long' }
    const shortOptions = { timeZone: 'UTC', weekday: 'short' }

    return createNativeLocaleFormatter(
      currentLocale,
      (_tms, short) => short ? shortOptions : longOptions
    )
  })

  // Methods
  const getRelativeClasses = (timestamp: CalendarTimestamp, outside = false): object => {
    return {
      'v-present': timestamp.present,
      'v-past': timestamp.past,
      'v-future': timestamp.future,
      'v-outside': outside,
    }
  }

  const getStartOfWeek = (timestamp: CalendarTimestamp): CalendarTimestamp => {
    return getStartOfWeekComposable(timestamp, parsedWeekdays.value, times.today)
  }

  const getEndOfWeek = (timestamp: CalendarTimestamp): CalendarTimestamp => {
    return getEndOfWeekComposable(timestamp, parsedWeekdays.value, times.today)
  }

  const getFormatter = (options: object): CalendarFormatter => {
    return createNativeLocaleFormatter(
      currentLocale,
      (_tms, _short) => options
    )
  }

  return {
    parsedWeekdays,
    weekdaySkips,
    weekdaySkipsReverse,
    parsedStart,
    parsedEnd,
    days,
    dayFormatter,
    weekdayFormatter,
    getRelativeClasses,
    getStartOfWeek,
    getEndOfWeek,
    getFormatter,
  }
}
