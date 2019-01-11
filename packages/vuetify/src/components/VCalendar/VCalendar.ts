// Styles
// import '../../stylus/components/_calendar-daily.styl'

// Types
import { VNode } from 'vue'

// Mixins
import CalendarBase from './mixins/calendar-base'

// Util
import props from './util/props'
import {
  DAYS_IN_MONTH_MAX,
  DAY_MIN,
  DAYS_IN_WEEK,
  VTimestamp,
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

/* @vue/component */
export default CalendarBase.extend({
  name: 'v-calendar',

  props: {
    ...props.calendar,
    ...props.weeks,
    ...props.intervals
  },

  computed: {
    parsedValue (): VTimestamp {
      return parseTimestamp(this.value) ||
        this.parsedStart ||
        this.times.today
    }
  },

  methods: {
    move (amount: number = 1): void {
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
    },
    next (amount: number = 1): void {
      this.move(amount)
    },
    prev (amount: number = 1): void {
      this.move(-amount)
    }
  },

  render (h): VNode {
    const around = this.parsedValue
    let component: any = 'div'
    let maxDays = this.maxDays
    let start = around
    let end = around
    switch (this.type) {
      case 'month':
        component = VCalendarMonthly
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
        start = this.parsedStart
        end = this.parsedEnd
        break
      case 'custom-daily':
        component = VCalendarDaily
        start = this.parsedStart
        end = this.parsedEnd
        break
    }

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
