// Composables
import { useTimes } from './times'
import { computeColor } from '@/composables/color'
import { provideLocale } from '@/composables/locale'

// Utilities
import { computed } from 'vue'
import {
  createDayList,
  createNativeLocaleFormatter,
  getEndOfWeek,
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
}, 'VCalendar-base')

export interface CalendarBaseProps {
  start: string | number | Date
  end: string | number | Date | undefined
  weekdays: string | number[]
  weekdayFormat: CalendarFormatter | string | undefined
  dayFormat: CalendarFormatter | string | undefined
  locale: string | undefined
  now: string | undefined
}

export function useCalendarBase (props: CalendarBaseProps) {
  const { times } = useTimes({ now: props.now })
  const locale = provideLocale(props)

  const parsedWeekdays = computed((): number[] => {
    return Array.isArray(props.weekdays)
      ? props.weekdays
      : (props.weekdays || '').split(',').map(x => parseInt(x, 10))
  })

  const weekdaySkips = computed((): number[] => {
    return getWeekdaySkips(parsedWeekdays.value)
  })

  const parsedStart = computed((): CalendarTimestamp => {
    return parseTimestamp(props.start, true)
  })

  const parsedEnd = computed((): CalendarTimestamp => {
    const start = parsedStart.value
    const end: CalendarTimestamp = props.end ? parseTimestamp(props.end) || start : start

    return getTimestampIdentifier(end) < getTimestampIdentifier(start) ? start : end
  })

  const days = computed((): CalendarTimestamp[] => {
    return createDayList(
      parsedStart.value,
      parsedEnd.value,
      times.today,
      weekdaySkips.value
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
    parsedWeekdays,
    weekdaySkips,
    parsedStart,
    parsedEnd,
    days,
    dayFormatter,
    weekdayFormatter,
    getColorProps,
    getRelativeClasses,
    getStartOfWeek: _getStartOfWeek,
    getEndOfWeek: _getEndOfWeek,
    getFormatter,
  }
}
