
// Mixins
import CalendarBase from './calendar-base'

// Util
import { validateNumber } from '../util/validate'
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

  // depends on: maxDays

  props: {
    maxDays: {
      type: Number,
      default: 7
    },
    shortIntervals: {
      type: Boolean,
      default: true
    },
    intervalHeight: {
      type: [Number, String],
      default: 40,
      validate: validateNumber
    },
    intervalMinutes: {
      type: [Number, String],
      default: 60,
      validate: validateNumber
    },
    firstInterval: {
      type: [Number, String],
      default: 0,
      validate: validateNumber
    },
    intervalCount: {
      type: [Number, String],
      default: 24,
      validate: validateNumber
    },
    intervalFormat: {
      type: Function, // VTimestampFormatter<string>,
      default: null
    },
    intervalStyle: {
      type: Function, // (interval: VTimestamp): object
      default: null
    },
    showIntervalLabel: {
      type: Function, // (interval: VTimestamp): boolean
      default: null
    }
  },

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
      let days: VTimestamp[] = this.days
      let first: number = this.parsedFirstInterval
      let minutes: number = this.parsedIntervalMinutes
      let count: number = this.parsedIntervalCount
      let now: VTimestamp = this.times.now

      return days.map(d => createIntervalList(d, first, minutes, count, now))
    },
    intervalFormatter (): VTimestampFormatter<string> {
      if (this.intervalFormat) {
        return this.intervalFormat as VTimestampFormatter<string>
      }

      let longOptions = { timeZone: 'UTC', hour12: true, hour: '2-digit', minute: '2-digit' }
      let shortOptions = { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: '2-digit' }
      let shortHourOptions = { timeZone: 'UTC', hour12: true, hour: 'numeric' }

      return createNativeLocaleFormatter(
        this.locale,
        (tms, short) => short ? (tms.minute === 0 ? shortHourOptions : shortOptions) : longOptions
      )
    }
  },

  methods: {
    showIntervalLabelDefault (interval: VTimestamp): boolean {
      let first: VTimestamp = this.intervals[0][0]
      let isFirst: boolean = first.hour === interval.hour && first.minute === interval.minute
      return !isFirst && interval.minute === 0
    },
    intervalStyleDefault (interval: VTimestamp): object | undefined {
      return undefined
    },
    getTimestampAtEvent (e: MouseEvent | TouchEvent, day: VTimestamp): VTimestamp {
      let timestamp: VTimestamp = copyTimestamp(day)
      let bounds = (e.currentTarget as HTMLElement).getBoundingClientRect()
      let baseMinutes: number = this.firstMinute
      let touchEvent: TouchEvent = e as TouchEvent
      let mouseEvent: MouseEvent = e as MouseEvent
      let touches: TouchList = touchEvent.changedTouches || touchEvent.touches
      let clientY: number = touches && touches[0] ? touches[0].clientY : mouseEvent.clientY
      let addIntervals: number = (clientY - bounds.top) / this.parsedIntervalHeight
      let addMinutes: number = Math.floor(addIntervals * this.parsedIntervalMinutes)
      let minutes: number = baseMinutes + addMinutes

      return updateMinutes(timestamp, minutes, this.times.now)
    }
  }
})
