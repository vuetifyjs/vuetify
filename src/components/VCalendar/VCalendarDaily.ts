// Styles
import '../../stylus/components/_calendar-daily.styl'

// Types
import { VNode } from 'vue'

// Mixins
import mixins from '../../util/mixins'
import Themeable from '../../mixins/themeable'

// Util
import { validateNumber } from './util/validate'
import {
  VTimestamp,
  VTimestampFormatter,
  validateTimestamp,
  parseTimestamp,
  copyTimestamp,
  updateMinutes,
  getWeekdaySkips,
  createDayList,
  createIntervalList,
  createNativeLocaleFormatter
} from './util/timestamp'

type MouseHandler = (e: MouseEvent) => void

/* @vue/component */
export default mixins(Themeable).extend({
  name: 'v-calendar-daily',

  props: {
    start: {
      type: String,
      required: true,
      validate: validateTimestamp
    },
    end: {
      type: String,
      required: true,
      validate: validateTimestamp
    },
    weekdays: {
      type: Array as () => number[],
      default: () => [0, 1, 2, 3, 4, 5, 6]
    },
    hideWeekdays: {
      type: Boolean,
      default: false
    },
    shortWeekdays: {
      type: Boolean,
      default: true
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
    weekdayFormat: {
      type: Function, // VTimestampFormatter<string>,
      default: null
    },
    dayFormat: {
      type: Function, // VTimestampFormatter<string>,
      default: null
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
    },
    locale: {
      type: String,
      default: 'en-us'
    }
  },

  data: () => ({
    now: new Date()
  }),

  computed: {
    classes (): object {
      return {
        'v-calendar-daily': true,
        ...this.themeClasses
      }
    },
    weekdaySkips (): number[] {
      return getWeekdaySkips(this.weekdays)
    },
    parsedStart (): VTimestamp {
      return parseTimestamp(this.start) as VTimestamp
    },
    parsedEnd (): VTimestamp {
      return parseTimestamp(this.end) as VTimestamp
    },
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
      return this.parsedFirstInterval * this.parsedIntervalHeight
    },
    bodyHeight (): number {
      return this.parsedIntervalCount * this.parsedIntervalHeight
    },
    days (): VTimestamp[] {
      return createDayList(this.parsedStart, this.parsedEnd, this.now, this.weekdaySkips)
    },
    intervals (): VTimestamp[][] {
      let days: VTimestamp[] = this.days
      let first: number = this.parsedFirstInterval
      let minutes: number = this.parsedIntervalMinutes
      let count: number = this.parsedIntervalCount
      let now: Date = this.now

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
    },
    dayFormatter (): VTimestampFormatter<string> {
      if (this.dayFormat) {
        return this.dayFormat as VTimestampFormatter<string>
      }

      let options = { timeZone: 'UTC', day: 'numeric' }

      return createNativeLocaleFormatter(
        this.locale,
        (tms, short) => options
      )
    },
    weekdayFormatter (): VTimestampFormatter<string> {
      if (this.weekdayFormat) {
        return this.weekdayFormat as VTimestampFormatter<string>
      }

      let longOptions = { timeZone: 'UTC', weekday: 'long' }
      let shortOptions = { timeZone: 'UTC', weekday: 'short' }

      return createNativeLocaleFormatter(
        this.locale,
        (tms, short) => short ? shortOptions : longOptions
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

    getRelativeClasses (timestamp: VTimestamp): object {
      return {
        'v-present': timestamp.present,
        'v-past': timestamp.past,
        'v-future': timestamp.future
      }
    },

    getTimestampAtEvent (day: VTimestamp, e: MouseEvent): VTimestamp {
      let timestamp: VTimestamp = copyTimestamp(day)
      let bounds = (e.currentTarget as HTMLElement).getBoundingClientRect()
      let baseMinutes: number = this.firstMinute
      let addIntervals: number = (e.clientY - bounds.top) / this.parsedIntervalHeight
      let addMinutes: number = Math.floor(addIntervals * this.parsedIntervalMinutes)
      let minutes: number = baseMinutes + addMinutes

      return updateMinutes(timestamp, minutes, this.now)
    },

    genHead (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-calendar-daily__head'
      }, [
        this.genHeadIntervals(),
        ...this.genHeadDays()
      ])
    },

    genHeadIntervals (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-calendar-daily__intervals-head'
      }, [

      ])
    },

    genHeadDays (): VNode[] {
      return this.days.map(d => this.genHeadDay(d))
    },

    genHeadDay (day: VTimestamp): VNode {
      let slot = this.$scopedSlots.dayHeader

      return this.$createElement('div', {
        key: day.date,
        staticClass: 'v-calendar-daily_head-day',
        class: this.getRelativeClasses(day),
        on: {
          click: this.getClickDayHandler(day)
        }
      }, [
        this.genHeadWeekday(day),
        this.genHeadDayLabel(day),
        slot ? slot(day) : ''
      ])
    },

    getClickDayHandler (day: VTimestamp): MouseHandler {
      if (!this.$listeners['click:day']) {
        return this.emptyMouseHandler
      }

      return (e: MouseEvent) => {
        this.$emit('click:day', day)
      }
    },

    genHeadWeekday (day: VTimestamp): VNode {
      return this.$createElement('div', {
        staticClass: 'v-calendar-daily_head-weekday'
      }, this.weekdayFormatter(day, this.shortWeekdays))
    },

    genHeadDayLabel (day: VTimestamp): VNode {
      return this.$createElement('div', {
        staticClass: 'v-calendar-daily_head-day-label',
        on: {
          click: this.getViewDayHandler(day)
        }
      }, this.dayFormatter(day, false))
    },

    getViewDayHandler (day: VTimestamp): MouseHandler {
      if (!this.$listeners['view-day']) {
        return this.emptyMouseHandler
      }

      return (e: MouseEvent) => {
        e.stopPropagation()
        this.$emit('view-day', day)
      }
    },

    genBody (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-calendar-daily__body'
      }, [
        this.genScrollArea()
      ])
    },

    genScrollArea (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-calendar-daily__scroll-area'
      }, [
        this.genPane()
      ])
    },

    genPane (): VNode {
      return this.$createElement('div', {
        ref: 'pane',
        staticClass: 'v-calendar-daily__pane',
        style: {
          height: this.bodyHeight + 'px'
        }
      }, [
        this.genDayContainer()
      ])
    },

    genDayContainer (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-calendar-daily__day-container'
      }, [
        this.genBodyIntervals(),
        ...this.genDays()
      ])
    },

    genDays (): VNode[] {
      return this.days.map((d: VTimestamp, i: number) => this.genDay(d, i))
    },

    genDay (day: VTimestamp, index: number): VNode {
      let slot = this.$scopedSlots.dayBody

      return this.$createElement('div', {
        key: day.date,
        staticClass: 'v-calendar-daily__day',
        class: this.getRelativeClasses(day),
        on: {
          click: this.getClickTimeHandler(day)
        }
      }, [
        ...this.genDayIntervals(index),
        slot ? slot(day) : ''
      ])
    },

    getClickTimeHandler (day: VTimestamp): MouseHandler {
      if (!this.$listeners['click:time']) {
        return this.emptyMouseHandler
      }

      return (e: MouseEvent) => {
        this.$emit('click:time', this.getTimestampAtEvent(day, e))
      }
    },

    genDayIntervals (index: number): VNode[] {
      return this.intervals[index].map(i => this.genDayInterval(i))
    },

    genDayInterval (interval: VTimestamp): VNode {
      let height: string = this.intervalHeight + 'px'
      let styler = this.intervalStyle || this.intervalStyleDefault
      let slot = this.$scopedSlots.interval

      let data = {
        key: interval.time,
        staticClass: 'v-calendar-daily__day-interval',
        style: {
          height,
          ...styler(interval)
        }
      }

      let children = slot ? slot(interval) : undefined

      return this.$createElement('div', data, children)
    },

    genBodyIntervals (): VNode {
      let data = {
        staticClass: 'v-calendar-daily__intervals-body'
      }

      return this.$createElement('div', data, this.genIntervalLabels())
    },

    genIntervalLabels (): VNode[] {
      return this.intervals[0].map(i => this.genIntervalLabel(i))
    },

    genIntervalLabel (interval: VTimestamp): VNode {
      let height: string = this.intervalHeight + 'px'
      let short: boolean = this.shortIntervals
      let shower = this.showIntervalLabel || this.showIntervalLabelDefault
      let show = shower(interval)
      let label = show ? this.intervalFormatter(interval, short) : undefined

      return this.$createElement('div', {
        key: interval.time,
        staticClass: 'v-calendar-daily__interval',
        style: {
          height
        }
      }, [
        this.$createElement('div', {
          staticClass: 'v-calendar-daily__interval-text'
        },
        label
        )
      ])
    },

    emptyMouseHandler (e: MouseEvent) {

    }
  },

  render (h): VNode {
    return h('div', {
      class: this.classes
    }, [
      this.genHead(),
      this.genBody()
    ])
  }
})
