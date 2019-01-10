
// Mixins
import CalendarBase from './calendar-base'

// Util
import props from '../util/props'
import {
  VTimestamp,
  VTimestampFormatter,
  copyTimestamp,
  updateMinutes,
  createDayList,
  createIntervalList,
  createNativeLocaleFormatter
} from '../util/timestamp'

/* @vue/component */
export default CalendarBase.extend({
  name: 'calendar-with-intervals',

  props: props.intervals,

  computed: {
    parsedFirstInterval (): number {
      return parseInt(this.firstInterval)
    },
    parsedIntervalMinutes (): number {
      return parseInt(this.intervalMinutes)
    },
    parsedIntervalCount (): number {
      return parseInt(this.intervalCount)
    },
    parsedIntervalHeight (): number {
      return parseFloat(this.intervalHeight)
    },
    firstMinute (): number {
      return this.parsedFirstInterval * this.parsedIntervalMinutes
    },
    bodyHeight (): number {
      return this.parsedIntervalCount * this.parsedIntervalHeight
    },
    days (): VTimestamp[] {
      return createDayList(
        this.parsedStart,
        this.parsedEnd,
        this.times.today,
        this.weekdaySkips,
        this.maxDays
      )
    },
    intervals (): VTimestamp[][] {
      const days: VTimestamp[] = this.days
      const first: number = this.parsedFirstInterval
      const minutes: number = this.parsedIntervalMinutes
      const count: number = this.parsedIntervalCount
      const now: VTimestamp = this.times.now

      return days.map(d => createIntervalList(d, first, minutes, count, now))
    },
    intervalFormatter (): VTimestampFormatter {
      if (this.intervalFormat) {
        return this.intervalFormat as VTimestampFormatter
      }

      const longOptions = { timeZone: 'UTC', hour12: true, hour: '2-digit', minute: '2-digit' }
      const shortOptions = { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: '2-digit' }
      const shortHourOptions = { timeZone: 'UTC', hour12: true, hour: 'numeric' }

      return createNativeLocaleFormatter(
        this.locale,
        (tms, short) => short ? (tms.minute === 0 ? shortHourOptions : shortOptions) : longOptions
      )
    }
  },

  methods: {
    showIntervalLabelDefault (interval: VTimestamp): boolean {
      const first: VTimestamp = this.intervals[0][0]
      const isFirst: boolean = first.hour === interval.hour && first.minute === interval.minute
      return !isFirst && interval.minute === 0
    },
    intervalStyleDefault (interval: VTimestamp): object | undefined {
      return undefined
    },
    getTimestampAtEvent (e: MouseEvent | TouchEvent, day: VTimestamp): VTimestamp {
      const timestamp: VTimestamp = copyTimestamp(day)
      const bounds = (e.currentTarget as HTMLElement).getBoundingClientRect()
      const baseMinutes: number = this.firstMinute
      const touchEvent: TouchEvent = e as TouchEvent
      const mouseEvent: MouseEvent = e as MouseEvent
      const touches: TouchList = touchEvent.changedTouches || touchEvent.touches
      const clientY: number = touches && touches[0] ? touches[0].clientY : mouseEvent.clientY
      const addIntervals: number = (clientY - bounds.top) / this.parsedIntervalHeight
      const addMinutes: number = Math.floor(addIntervals * this.parsedIntervalMinutes)
      const minutes: number = baseMinutes + addMinutes

      return updateMinutes(timestamp, minutes, this.times.now)
    }
  }
})
