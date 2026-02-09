// Composables
import { useCalendarBase } from './calendarBase'

// Utilities
import { computed, shallowRef } from 'vue'
import {
  copyTimestamp,
  createDayList,
  createIntervalList,
  createNativeLocaleFormatter,
  getDayIdentifier,
  MINUTES_IN_DAY,
  parseTime,
  updateMinutes,
  validateNumber,
  validateTime,
} from '../util/timestamp'
import { propsFactory } from '@/util'

// Types
import type { PropType, StyleValue } from 'vue'
import type { CalendarBaseProps } from './calendarBase'
import type { CalendarDayBodySlotScope, CalendarFormatter, CalendarTimestamp } from '../types'
import type { VTime } from '../util/timestamp'

export const makeCalendarWithIntervalsProps = propsFactory({
  maxDays: {
    type: Number,
    default: 7,
  },
  intervalHeight: {
    type: [Number, String],
    default: 48,
    validate: validateNumber,
  },
  intervalWidth: {
    type: [Number, String],
    default: 60,
    validate: validateNumber,
  },
  intervalMinutes: {
    type: [Number, String],
    default: 60,
    validate: validateNumber,
  },
  firstInterval: {
    type: [Number, String],
    default: 0,
    validate: validateNumber,
  },
  firstTime: {
    type: [Number, String, Object] as PropType<VTime>,
    validate: validateTime,
  },
  intervalCount: {
    type: [Number, String],
    default: 24,
    validate: validateNumber,
  },
  intervalFormat: {
    type: Function as PropType<CalendarFormatter>,
    default: null,
  },
  intervalStyle: {
    type: Function as PropType<(interval: CalendarTimestamp) => StyleValue>,
    default: null,
  },
  showIntervalLabel: {
    type: Function as PropType<(interval: CalendarTimestamp) => boolean>,
    default: null,
  },
}, 'VCalendar-intervals')

interface CalendarWithIntervalsProps extends CalendarBaseProps {
  maxDays: number
  intervalHeight: string | number
  intervalMinutes: string | number
  firstInterval: string | number
  firstTime: VTime | undefined
  intervalCount: string | number
  intervalFormat: CalendarFormatter | string | undefined
}

export function useCalendarWithIntervals (props: CalendarWithIntervalsProps) {
  const base = useCalendarBase(props)

  const scrollAreaRef = shallowRef<HTMLElement>()

  const parsedFirstInterval = computed((): number => {
    return parseInt(String(props.firstInterval || 0))
  })

  const parsedIntervalMinutes = computed((): number => {
    return parseInt(String(props.intervalMinutes || 60))
  })

  const parsedIntervalCount = computed((): number => {
    return parseInt(String(props.intervalCount || 24))
  })

  const parsedIntervalHeight = computed((): number => {
    return parseFloat(String(props.intervalHeight || 48))
  })

  const parsedFirstTime = computed((): number | false => {
    return parseTime(props.firstTime)
  })

  const firstMinute = computed((): number => {
    const time = parsedFirstTime.value

    return time !== false && time >= 0 && time <= MINUTES_IN_DAY
      ? time
      : parsedFirstInterval.value * parsedIntervalMinutes.value
  })

  const bodyHeight = computed((): number => {
    return parsedIntervalCount.value * parsedIntervalHeight.value
  })

  const days = computed((): CalendarTimestamp[] => {
    return createDayList(
      base.parsedStart.value,
      base.parsedEnd.value,
      base.times.today,
      base.weekdaySkips.value,
      props.maxDays
    )
  })

  const intervals = computed((): CalendarTimestamp[][] => {
    const daysValue = days.value
    const first: number = firstMinute.value
    const minutes: number = parsedIntervalMinutes.value
    const count: number = parsedIntervalCount.value
    const now: CalendarTimestamp = base.times.now

    return daysValue.map(d => createIntervalList(d, first, minutes, count, now))
  })

  const intervalFormatter = computed((): CalendarFormatter => {
    if (props.intervalFormat) {
      return props.intervalFormat as CalendarFormatter
    }

    return createNativeLocaleFormatter(
      base.locale.current.value,
      (tms, short) => (
        !short ? { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' }
        : tms.minute === 0 ? { timeZone: 'UTC', hour: 'numeric' }
        : { timeZone: 'UTC', hour: 'numeric', minute: '2-digit' }
      )
    )
  })

  function showIntervalLabelDefault (interval: CalendarTimestamp): boolean {
    const first: CalendarTimestamp = intervals.value[0][0]
    const isFirst: boolean = first.hour === interval.hour && first.minute === interval.minute
    return !isFirst
  }

  function intervalStyleDefault (_interval: CalendarTimestamp): StyleValue {
    return undefined
  }

  function getTimestampAtEvent (e: Event, day: CalendarTimestamp): CalendarTimestamp {
    const timestamp: CalendarTimestamp = copyTimestamp(day)
    const bounds = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const baseMinutes: number = firstMinute.value
    const touchEvent: TouchEvent = e as TouchEvent
    const mouseEvent: MouseEvent = e as MouseEvent
    const touches: TouchList = touchEvent.changedTouches || touchEvent.touches
    const clientY: number = touches && touches[0] ? touches[0].clientY : mouseEvent.clientY
    const addIntervals: number = (clientY - bounds.top) / parsedIntervalHeight.value
    const addMinutes: number = Math.floor(addIntervals * parsedIntervalMinutes.value)
    const minutes: number = baseMinutes + addMinutes

    return updateMinutes(timestamp, minutes, base.times.now)
  }

  function getSlotScope (timestamp: CalendarTimestamp): CalendarDayBodySlotScope {
    const scope = copyTimestamp(timestamp) as any
    scope.timeToY = timeToY
    scope.timeDelta = timeDelta
    scope.minutesToPixels = minutesToPixels
    scope.week = days.value
    scope.intervalRange = [
      firstMinute.value,
      firstMinute.value + parsedIntervalCount.value * parsedIntervalMinutes.value,
    ]
    return scope
  }

  function scrollToTime (time: VTime): boolean {
    const y = timeToY(time)

    const pane = scrollAreaRef.value

    if (y === false || !pane) {
      return false
    }

    pane.scrollTop = y

    return true
  }

  function minutesToPixels (minutes: number): number {
    return minutes / parsedIntervalMinutes.value * parsedIntervalHeight.value
  }

  function timeToY (
    time: VTime | CalendarTimestamp,
    targetDateOrClamp: CalendarTimestamp | boolean = false
  ): number | false {
    const clamp = targetDateOrClamp !== false
    const targetDate = typeof targetDateOrClamp !== 'boolean' ? targetDateOrClamp : undefined

    let y = timeDelta(time, targetDate)
    if (y === false) return y

    y *= bodyHeight.value

    if (clamp) {
      if (y < 0) {
        y = 0
      } else if (y > bodyHeight.value) {
        y = bodyHeight.value
      }
    } else {
      if (y < 0) {
        y = y + bodyHeight.value
      } else if (y > bodyHeight.value) {
        y = y - bodyHeight.value
      }
    }

    return y
  }

  function timeDelta (time: VTime | CalendarTimestamp, targetDate?: CalendarTimestamp): number | false {
    let minutes = parseTime(time)

    if (minutes === false) {
      return false
    }

    const gap: number = parsedIntervalCount.value * parsedIntervalMinutes.value

    if (targetDate && typeof time === 'object' && 'day' in time) {
      const a = getDayIdentifier(time)
      const b = getDayIdentifier(targetDate)
      minutes += (a - b) * gap
    }

    const min: number = firstMinute.value

    return (minutes - min) / gap
  }

  return {
    ...base,
    scrollAreaRef,
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
