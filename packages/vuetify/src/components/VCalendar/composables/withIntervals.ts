import {
  copyTimestamp,
  createDayList,
  createIntervalList,
  createNativeLocaleFormatter,
  MINUTES_IN_DAY,
  parseTime,
  updateMinutes,
} from '@/composables/calendar/timestamp'
import type {
  CalendarFormatter,
  CalendarTimestamp,
  VTime,
} from '@/composables/calendar/timestamp'
import type { ComputedRef } from 'vue'
import { computed, ref } from 'vue'

export function useWithIntervals (
  currentLocale,
  doDays,
  firstInterval,
  firstTime,
  intervalCount,
  intervalFormat,
  intervalHeight,
  intervalMinutes,
  maxDays,
  parsedStart,
  parsedEnd,
  times,
  weekdaySkips
) {
  const parsedFirstInterval: ComputedRef<number> = computed(() => {
    return parseInt(firstInterval)
  })

  const parsedIntervalMinutes: ComputedRef<number> = computed(() => {
    return parseInt(intervalMinutes)
  })

  const parsedIntervalCount: ComputedRef<number> = computed(() => {
    return parseInt(intervalCount)
  })

  const parsedIntervalHeight: ComputedRef<number> = computed(() => {
    return parseFloat(intervalHeight)
  })

  const parsedFirstTime: ComputedRef<number | false> = computed(() => {
    return parseTime(firstTime)
  })

  const firstMinute: ComputedRef<number> = computed(() => {
    const time = parsedFirstTime.value

    return time !== false && time >= 0 && time <= MINUTES_IN_DAY
      ? time
      : parsedFirstInterval.value * parsedIntervalMinutes.value
  })

  const bodyHeight: ComputedRef<number> = computed(() => {
    return parsedIntervalCount.value * parsedIntervalHeight.value
  })

  const days: ComputedRef<CalendarTimestamp[]> = computed(() => {
    return createDayList(
      parsedStart,
      parsedEnd,
      times.today,
      weekdaySkips,
      maxDays
    )
  })

  const intervals: ComputedRef<CalendarTimestamp[][]> = computed(() => {
    const days: CalendarTimestamp[] = doDays
    const first: number = firstMinute.value
    const minutes: number = parsedIntervalMinutes.value
    const count: number = parsedIntervalCount.value
    const now: CalendarTimestamp = times.now

    return days.map(d => createIntervalList(d, first, minutes, count, now))
  })

  const intervalFormatter: ComputedRef<CalendarFormatter> = computed(() => {
    if (intervalFormat) {
      return intervalFormat as CalendarFormatter
    }

    const longOptions = { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' }
    const shortOptions = { timeZone: 'UTC', hour: 'numeric', minute: '2-digit' }
    const shortHourOptions = { timeZone: 'UTC', hour: 'numeric' }

    return createNativeLocaleFormatter(
      currentLocale,
      (tms, short) => short ? (tms.minute === 0 ? shortHourOptions : shortOptions) : longOptions
    )
  })

  // Methods
  const showIntervalLabelDefault = (interval: CalendarTimestamp): boolean => {
    const first: CalendarTimestamp = intervals.value[ 0 ][ 0 ]
    const isFirst: boolean = first.hour === interval.hour && first.minute === interval.minute
    return !isFirst
  }

  const intervalStyleDefault = (_interval: CalendarTimestamp): object | undefined => {
    return undefined
  }

  const getTimestampAtEvent = (e: MouseEvent | TouchEvent, day: CalendarTimestamp): CalendarTimestamp => {
    const timestamp: CalendarTimestamp = copyTimestamp(day)
    const bounds = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const baseMinutes: number = firstMinute.value
    const touchEvent: TouchEvent = e as TouchEvent
    const mouseEvent: MouseEvent = e as MouseEvent
    const touches: TouchList = touchEvent.changedTouches || touchEvent.touches
    const clientY: number = touches && touches[ 0 ] ? touches[ 0 ].clientY : mouseEvent.clientY
    const addIntervals: number = (clientY - bounds.top) / parsedIntervalHeight.value
    const addMinutes: number = Math.floor(addIntervals * parsedIntervalMinutes.value)
    const minutes: number = baseMinutes + addMinutes

    return updateMinutes(timestamp, minutes, times.now)
  }

  const timeDelta = (time: VTime): number | false => {
    const minutes = parseTime(time)

    if (minutes === false) {
      return false
    }

    const min: number = firstMinute.value
    const gap: number = parsedIntervalCount.value * parsedIntervalMinutes.value

    return (minutes - min) / gap
  }

  const timeToY = (time: VTime, clamp = true): number | false => {
    let y = timeDelta(time)

    if (y !== false) {
      y *= bodyHeight.value

      if (clamp) {
        if (y < 0) {
          y = 0
        }
        if (y > bodyHeight.value) {
          y = bodyHeight.value
        }
      }
    }

    return y
  }

  const minutesToPixels = (minutes: number): number => {
    return minutes / parsedIntervalMinutes.value * parsedIntervalHeight.value
  }

  const getSlotScope = (timestamp: CalendarTimestamp): CalendarDayBodySlotScope => {
    const scope = copyTimestamp(timestamp) as any
    scope.timeToY = timeToY
    scope.timeDelta = timeDelta
    scope.minutesToPixels = minutesToPixels
    scope.week = days
    return scope
  }

  const scrollToTime = (time: VTime): boolean => {
    const y = timeToY(time)
    const pane = ref('scrollArea') as HTMLElement

    if (y === false || !pane) {
      return false
    }

    pane.scrollTop = y

    return true
  }

  return {
    parsedFirstInterval,
    parsedIntervalMinutes,
    parsedIntervalCount,
    parsedIntervalHeight,
    parsedFirstTime,
    firstMinute,
    bodyHeight,
    days,
    intervals,
    intervalFormatter,
    showIntervalLabelDefault,
    intervalStyleDefault,
    getTimestampAtEvent,
    getSlotScope,
    scrollToTime,
    minutesToPixels,
    timeToY,
    timeDelta,
  }
}
