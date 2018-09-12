// Styles
import '../../stylus/components/_calendar-weekly.styl'

// Mixins
import VCalendarWeekly from './VCalendarWeekly'

// Util
import { VTimestamp, parseTimestamp, updateWeekday, updateFormatted, daysInMonth, DAY_MIN } from './util/timestamp'

/* @vue/component */
export default VCalendarWeekly.extend({
  name: 'v-calendar-monthly',

  computed: {
    parsedStart (): VTimestamp {
      const start = parseTimestamp(this.start) as VTimestamp
      start.day = DAY_MIN
      updateWeekday(start)
      updateFormatted(start)
      return start
    },
    parsedEnd (): VTimestamp {
      const end = parseTimestamp(this.start) as VTimestamp
      end.day = daysInMonth(end.year, end.month)
      updateWeekday(end)
      updateFormatted(end)
      return end
    }
  }

})
