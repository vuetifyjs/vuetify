// Composables
import { useTimes } from './times'
import { computeColor } from '@/composables/color'
import { useDate } from '@/composables/date'
import { provideLocale } from '@/composables/locale'

// Utilities
import { computed } from 'vue'
import {
  createDayList,
  createNativeLocaleFormatter,
  getEndOfMonth,
  getEndOfWeek,
  getStartOfMonth,
  getStartOfWeek,
  getTimestampIdentifier,
  getWeekdaySkips,
  parseDate,
  parseTimestamp,
  validateTimestamp,
  validateWeekdays,
} from '../util/timestamp'
import { propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { CalendarFormatter, CalendarTimestamp } from '../types'
import type { ColorValue } from '@/composables/color'

export const makeCalendarBaseProps = propsFactory({
  start: {
    type: [String, Number, Date],
    validate: validateTimestamp,
    default: () => parseDate(new Date()).date,
  },
  end: {
    type: [String, Number, Date],
    validate: validateTimestamp,
  },
  weekdays: {
    type: [Array, String] as PropType<number[] | string>,
    default: () => [0, 1, 2, 3, 4, 5, 6],
    validate: validateWeekdays,
  },
  firstDayOfWeek: [Number, String],
  firstDayOfYear: [Number, String],
  weekdayFormat: {
    type: Function as PropType<CalendarFormatter>,
    default: null,
  },
  dayFormat: {
    type: Function as PropType<CalendarFormatter>,
    default: null,
  },
  locale: String,
  now: {
    type: String,
    validator: validateTimestamp,
  },
  type: {
    type: String as PropType<'month' | 'week' | 'day' | '4day' | 'custom-weekly' | 'custom-daily' | 'category'>,
    default: 'month',
  },
}, 'VCalendar-base')

export interface CalendarBaseProps {
  modelValue?: string | number | Date
  categoryDays?: string | number
  start: string | number | Date
  end: string | number | Date | undefined
  weekdays: string | number[]
  firstDayOfWeek: number | string | undefined
  firstDayOfYear: number | string | undefined
  weekdayFormat: CalendarFormatter | string | undefined
  dayFormat: CalendarFormatter | string | undefined
  locale: string | undefined
  now: string | undefined
  type: 'month' | 'week' | 'day' | '4day' | 'custom-weekly' | 'custom-daily' | 'category'
}

export function useCalendarBase (props: CalendarBaseProps) {
  const { times, updateTimes } = useTimes({ now: props.now })
  const locale = provideLocale(props)

  const adapter = useDate()

  const parsedStart = computed((): CalendarTimestamp => {
    if (props.type === 'month') {
      return getStartOfMonth(parseTimestamp(props.start, true))
    }
    return parseTimestamp(props.start, true)
  })

  const parsedEnd = computed((): CalendarTimestamp => {
    const start = parsedStart.value
    const end: CalendarTimestamp = props.end ? parseTimestamp(props.end) || start : start
    const value = getTimestampIdentifier(end) < getTimestampIdentifier(start) ? start : end

    if (props.type === 'month') {
      return getEndOfMonth(value)
    }
    return value
  })

  const parsedValue = computed((): CalendarTimestamp => {
    return (validateTimestamp(props.modelValue)
      ? parseTimestamp(props.modelValue, true)
      : (parsedStart.value || times.today))
  })

  const parsedWeekdays = computed((): number[] => {
    const weekdays = Array.isArray(props.weekdays)
      ? props.weekdays
      : (props.weekdays || '').split(',').map(x => parseInt(x, 10))

    const first = adapter.toJsDate(adapter.startOfWeek(adapter.date(), props.firstDayOfWeek)).getDay()
    return [
      ...weekdays.toSorted().filter(v => v >= first),
      ...weekdays.toSorted().filter(v => v < first),
    ]
  })

  const effectiveWeekdays = computed((): number[] => {
    const start = parsedValue.value
    const days = parseInt(String(props.categoryDays)) || 1

    switch (props.type) {
      case 'day': return [start.weekday]
      case '4day': return [
        start.weekday,
        (start.weekday + 1) % 7,
        (start.weekday + 2) % 7,
        (start.weekday + 3) % 7,
      ]
      case 'category': return Array.from({ length: days }, (_, i) => (start.weekday + i) % 7)
      default: return parsedWeekdays.value
    }
  })

  const weekdaySkips = computed((): number[] => {
    return getWeekdaySkips(parsedWeekdays.value)
  })

  const days = computed((): CalendarTimestamp[] => {
    return createDayList(
      parsedStart.value,
      parsedEnd.value,
      times.today,
      weekdaySkips.value,
    )
  })

  const dayFormatter = computed((): CalendarFormatter => {
    if (props.dayFormat) {
      return props.dayFormat as CalendarFormatter
    }

    return createNativeLocaleFormatter(
      locale.current.value,
      () => ({ timeZone: 'UTC', day: 'numeric' })
    )
  })

  const weekdayFormatter = computed((): CalendarFormatter => {
    if (props.weekdayFormat) {
      return props.weekdayFormat as CalendarFormatter
    }

    return createNativeLocaleFormatter(
      locale.current.value,
      (_tms, short) => ({ timeZone: 'UTC', weekday: short ? 'short' : 'long' })
    )
  })

  function getColorProps (colors: { background?: ColorValue, text?: ColorValue }) {
    return computeColor(colors)
  }

  function getRelativeClasses (timestamp: CalendarTimestamp, outside = false) {
    return {
      'v-present': timestamp.present,
      'v-past': timestamp.past,
      'v-future': timestamp.future,
      'v-outside': outside,
    }
  }

  function getWeekNumber (timestamp: CalendarTimestamp): number {
    return adapter.getWeek(
      adapter.date(timestamp.date),
      props.firstDayOfWeek,
      props.firstDayOfYear,
    )
  }

  function _getStartOfWeek (timestamp: CalendarTimestamp): CalendarTimestamp {
    return getStartOfWeek(timestamp, parsedWeekdays.value, times.today)
  }

  function _getEndOfWeek (timestamp: CalendarTimestamp): CalendarTimestamp {
    return getEndOfWeek(timestamp, parsedWeekdays.value, times.today)
  }

  function getFormatter (options: Intl.DateTimeFormatOptions): CalendarFormatter {
    return createNativeLocaleFormatter(locale.current.value, () => options)
  }

  return {
    times,
    locale,
    parsedValue,
    parsedWeekdays,
    effectiveWeekdays,
    weekdaySkips,
    parsedStart,
    parsedEnd,
    days,
    dayFormatter,
    weekdayFormatter,
    getColorProps,
    getRelativeClasses,
    getWeekNumber,
    getStartOfWeek: _getStartOfWeek,
    getEndOfWeek: _getEndOfWeek,
    getFormatter,
    updateTimes,
  }
}
