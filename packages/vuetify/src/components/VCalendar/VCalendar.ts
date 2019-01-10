// Styles
// import '../../stylus/components/_calendar-daily.styl'

// Types
import { VNode } from 'vue'

// Mixins
import CalendarBase from './mixins/calendar-base'

// Util
import props from './util/props'
import {
  VTimestamp,
  parseTimestamp,
  relativeDays,
  nextDay,
  copyTimestamp,
  updateFormatted
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
