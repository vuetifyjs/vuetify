
// Mixins
import CalendarBase from './calendar-base'

// Util
import props from '../util/props'
import {
  parseTime,
  copyTimestamp,
  updateMinutes,
  createDayList,
  createIntervalList,
  createNativeLocaleFormatter,
  VTime,
  MINUTES_IN_DAY,
} from '../util/timestamp'
import { CalendarTimestamp, CalendarFormatter, CalendarDayBodySlotScope } from 'vuetify/types'

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
    parsedFirstTime (): number | false {
      return parseTime(this.firstTime)
    },
    firstMinute (): number {
      const time = this.parsedFirstTime

      return time !== false && time >= 0 && time <= MINUTES_IN_DAY
        ? time
        : this.parsedFirstInterval * this.parsedIntervalMinutes
    },
    bodyHeight (): number {
      return this.parsedIntervalCount * this.parsedIntervalHeight
    },
    days (): CalendarTimestamp[] {
      return createDayList(
        this.parsedStart,
        this.parsedEnd,
        this.times.today,
        this.weekdaySkips,
        this.maxDays
      )
    },
    intervals (): CalendarTimestamp[][] {
      const days: CalendarTimestamp[] = this.days
      const first: number = this.firstMinute
      const minutes: number = this.parsedIntervalMinutes
      const count: number = this.parsedIntervalCount
      const now: CalendarTimestamp = this.times.now

      return days.map(d => createIntervalList(d, first, minutes, count, now))
    },
    intervalFormatter (): CalendarFormatter {
      if (this.intervalFormat) {
        return this.intervalFormat as CalendarFormatter
      }

      const longOptions = { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' }
      const shortOptions = { timeZone: 'UTC', hour: 'numeric', minute: '2-digit' }
      const shortHourOptions = { timeZone: 'UTC', hour: 'numeric' }

      return createNativeLocaleFormatter(
        this.currentLocale,
        (tms, short) => short ? (tms.minute === 0 ? shortHourOptions : shortOptions) : longOptions
      )
    },
  },

  methods: {
    showIntervalLabelDefault (interval: CalendarTimestamp): boolean {
      const first: CalendarTimestamp = this.intervals[0][0]
      const isFirst: boolean = first.hour === interval.hour && first.minute === interval.minute
      return !isFirst
    },
    intervalStyleDefault (_interval: CalendarTimestamp): object | undefined {
      return undefined
    },
    getTimestampAtEvent (e: MouseEvent | TouchEvent, day: CalendarTimestamp): CalendarTimestamp {
      const timestamp: CalendarTimestamp = copyTimestamp(day)
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
    },
    getSlotScope (timestamp: CalendarTimestamp): CalendarDayBodySlotScope {
      const scope = copyTimestamp(timestamp) as any
      scope.timeToY = this.timeToY
      scope.timeDelta = this.timeDelta
      scope.minutesToPixels = this.minutesToPixels
      scope.week = this.days
      return scope
    },
    scrollToTime (time: VTime): boolean {
      const y = this.timeToY(time)
      const pane = this.$refs.scrollArea as HTMLElement

      if (y === false || !pane) {
        return false
      }

      pane.scrollTop = y

      return true
    },
    minutesToPixels (minutes: number): number {
      return minutes / this.parsedIntervalMinutes * this.parsedIntervalHeight
    },
    timeToY (time: VTime, clamp = true): number | false {
      let y = this.timeDelta(time)

      if (y !== false) {
        y *= this.bodyHeight

        if (clamp) {
          if (y < 0) {
            y = 0
          }
          if (y > this.bodyHeight) {
            y = this.bodyHeight
          }
        }
      }

      return y
    },
    timeDelta (time: VTime): number | false {
      const minutes = parseTime(time)

      if (minutes === false) {
        return false
      }

      const min: number = this.firstMinute
      const gap: number = this.parsedIntervalCount * this.parsedIntervalMinutes

      return (minutes - min) / gap
    },
  },
})
