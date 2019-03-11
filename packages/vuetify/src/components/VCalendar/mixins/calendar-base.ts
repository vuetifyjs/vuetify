
// Mixins
import mixins from '../../../util/mixins'
import Themeable from '../../../mixins/themeable'
import Colorable from '../../../mixins/colorable'
import Times from './times'
import Mouse from './mouse'

// Util
import props from '../util/props'
import {
  VTimestamp,
  VTimestampFormatter,
  parseTimestamp,
  getWeekdaySkips,
  createDayList,
  createNativeLocaleFormatter,
  getStartOfWeek,
  getEndOfWeek
} from '../util/timestamp'

/* @vue/component */
export default mixins(Colorable, Themeable, Times, Mouse).extend({
  name: 'calendar-base',

  props: props.base,

  computed: {
    weekdaySkips (): number[] {
      return getWeekdaySkips(this.weekdays)
    },
    parsedStart (): VTimestamp {
      return parseTimestamp(this.start) as VTimestamp
    },
    parsedEnd (): VTimestamp {
      return parseTimestamp(this.end) as VTimestamp
    },
    days (): VTimestamp[] {
      return createDayList(
        this.parsedStart,
        this.parsedEnd,
        this.times.today,
        this.weekdaySkips
      )
    },
    dayFormatter (): VTimestampFormatter {
      if (this.dayFormat) {
        return this.dayFormat as VTimestampFormatter
      }

      const options = { timeZone: 'UTC', day: 'numeric' }

      return createNativeLocaleFormatter(
        this.locale,
        (_tms, _short) => options
      )
    },
    weekdayFormatter (): VTimestampFormatter {
      if (this.weekdayFormat) {
        return this.weekdayFormat as VTimestampFormatter
      }

      const longOptions = { timeZone: 'UTC', weekday: 'long' }
      const shortOptions = { timeZone: 'UTC', weekday: 'short' }

      return createNativeLocaleFormatter(
        this.locale,
        (_tms, short) => short ? shortOptions : longOptions
      )
    }
  },

  methods: {
    getRelativeClasses (timestamp: VTimestamp, outside = false): object {
      return {
        'v-present': timestamp.present,
        'v-past': timestamp.past,
        'v-future': timestamp.future,
        'v-outside': outside
      }
    },
    getStartOfWeek (timestamp: VTimestamp): VTimestamp {
      return getStartOfWeek(timestamp, this.weekdays, this.times.today)
    },
    getEndOfWeek (timestamp: VTimestamp): VTimestamp {
      return getEndOfWeek(timestamp, this.weekdays, this.times.today)
    }
  }
})
