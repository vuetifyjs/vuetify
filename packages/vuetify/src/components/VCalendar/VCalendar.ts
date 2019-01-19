// Styles
// import '../../stylus/components/_calendar-daily.styl'

// Types
import { VNode, Component } from 'vue'

// Mixins
import CalendarBase from './mixins/calendar-base'

// Util
import props from './util/props'
import {
  DAYS_IN_MONTH_MAX,
  DAY_MIN,
  DAYS_IN_WEEK,
  VTimestamp,
  VTime,
  parseTimestamp,
  relativeDays,
  nextDay,
  prevDay,
  copyTimestamp,
  updateFormatted,
  updateWeekday,
  updateRelative
} from './util/timestamp'

// Calendars
import VCalendarMonthly from './VCalendarMonthly'
import VCalendarDaily from './VCalendarDaily'
import VCalendarWeekly from './VCalendarWeekly'

// Types
interface VCalendarRenderProps {
  start: VTimestamp
  end: VTimestamp
  component: string | Component
  maxDays: number
}

/* @vue/component */
export default CalendarBase.extend({
  name: 'v-calendar',

  props: {
    ...props.calendar,
    ...props.weeks,
    ...props.intervals
  },

  data: () => ({
    lastStart: null as VTimestamp | null,
    lastEnd: null as VTimestamp | null
  }),

  computed: {
    parsedValue (): VTimestamp {
      return parseTimestamp(this.value) ||
        this.parsedStart ||
        this.times.today
    },
    renderProps (): VCalendarRenderProps {
      const around = this.parsedValue
      let component: any = 'div'
      let maxDays = this.maxDays
      let start = around
      let end = around
      switch (this.type) {
        case 'month':
          component = VCalendarMonthly
          start = this.getStartOfMonth(around)
          end = this.getEndOfMonth(around)
          break
        case 'week':
          component = VCalendarDaily
          start = this.getStartOfWeek(around)
          end = this.getEndOfWeek(around)
          maxDays = 7
          break
        case 'day':
          component = VCalendarDaily
          maxDays = 1
          break
        case '4day':
          component = VCalendarDaily
          end = relativeDays(copyTimestamp(end), nextDay, 4)
          updateFormatted(end)
          maxDays = 4
          break
        case 'custom-weekly':
          component = VCalendarWeekly
          start = this.parsedStart || around
          end = this.parsedEnd
          break
        case 'custom-daily':
          component = VCalendarDaily
          start = this.parsedStart || around
          end = this.parsedEnd
          break
      }

      return { component, start, end, maxDays }
    }
  },

  watch: {
    renderProps: 'checkChange'
  },

  methods: {
    checkChange (): void {
      const { start, end } = this.renderProps
      if (start !== this.lastStart || end !== this.lastEnd) {
        this.lastStart = start
        this.lastEnd = end
        this.$emit('change', { start, end })
      }
    },
    move (amount = 1): void {
      const moved = copyTimestamp(this.parsedValue)
      const forward = amount > 0
      const mover = forward ? nextDay : prevDay
      const limit = forward ? DAYS_IN_MONTH_MAX : DAY_MIN
      let times = forward ? amount : -amount

      while (--times >= 0) {
        switch (this.type) {
          case 'month':
            moved.day = limit
            mover(moved)
            break
          case 'week':
            relativeDays(moved, mover, DAYS_IN_WEEK)
            break
          case 'day':
            mover(moved)
            break
          case '4day':
            relativeDays(moved, mover, 4)
            break
        }
      }

      updateWeekday(moved)
      updateFormatted(moved)
      updateRelative(moved, this.times.now)

      this.$emit('input', moved.date)
      this.$emit('moved', moved)
    },
    next (amount = 1): void {
      this.move(amount)
    },
    prev (amount = 1): void {
      this.move(-amount)
    },
    timeToY (time: VTime, clamp = true): number | false {
      const c = this.$children[0] as any
      if (c && c.timeToY) {
        return c.timeToY(time, clamp)
      } else {
        return false
      }
    },
    minutesToPixels (minutes: number): number {
      const c = this.$children[0] as any
      if (c && c.minutesToPixels) {
        return c.minutesToPixels(minutes)
      } else {
        return -1
      }
    },
    scrollToTime (time: VTime): boolean {
      const c = this.$children[0] as any
      if (c && c.scrollToTime) {
        return c.scrollToTime(time)
      } else {
        return false
      }
    }
  },

  render (h): VNode {
    const { start, end, maxDays, component } = this.renderProps

    return h(component, {
      staticClass: 'v-calendar',
      props: {
        ...this.$props,
        start: start.date,
        end: end.date,
        maxDays
      },
      on: {
        ...this.$listeners,
        'click:date': (day: VTimestamp) => {
          if (this.$listeners['input']) {
            this.$emit('input', day)
          }
          if (this.$listeners['click:date']) {
            this.$emit('click:date', day)
          }
        }
      },
      scopedSlots: this.$scopedSlots
    })
  }
})
