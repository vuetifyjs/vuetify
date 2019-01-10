// Styles
import '../../stylus/components/_calendar-weekly.styl'

// Mixins
import VCalendarWeekly from './VCalendarWeekly'

// Util
import { VTimestamp, parseTimestamp } from './util/timestamp'

/* @vue/component */
export default VCalendarWeekly.extend({
  name: 'v-calendar-monthly',

  computed: {
    parsedStart (): VTimestamp {
      return this.getStartOfMonth(parseTimestamp(this.start) as VTimestamp)
    },
    parsedEnd (): VTimestamp {
      return this.getEndOfMonth(parseTimestamp(this.end) as VTimestamp)
    }
  }

})
