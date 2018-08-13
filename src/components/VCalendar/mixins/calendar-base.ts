
// Mixins
import mixins from '../../../util/mixins'
import Themeable from '../../../mixins/themeable'
import Colorable from '../../../mixins/colorable'
import Times from './times'
import Mouse from './mouse'

// Util
import {
  VTimestamp,
  VTimestampFormatter,
  validateTimestamp,
  parseTimestamp,
  getWeekdaySkips,
  createDayList,
  createNativeLocaleFormatter
} from '../util/timestamp'

/* @vue/component */
export default mixins(Colorable, Themeable, Times, Mouse).extend({
  name: 'calendar-base',

  // depends on: maxDays

  props: {
    start: {
      type: String,
      required: true,
      validate: validateTimestamp
    },
    end: {
      type: String,
      validate: validateTimestamp,
      default: '0000-00-00'
    },
    weekdays: {
      type: Array as () => number[],
      default: () => [0, 1, 2, 3, 4, 5, 6]
    },
    hideHeader: {
      type: Boolean,
      default: false
    },
    shortWeekdays: {
      type: Boolean,
      default: true
    },
    weekdayFormat: {
      type: Function, // VTimestampFormatter<string>,
      default: null
    },
    dayFormat: {
      type: Function, // VTimestampFormatter<string>,
      default: null
    },
    locale: {
      type: String,
      default: 'en-us'
    }
  },

  data: () => ({
    defaultColor: 'primary'
  }),

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
    getRelativeClasses (timestamp: VTimestamp): object {
      return {
        'v-present': timestamp.present,
        'v-past': timestamp.past,
        'v-future': timestamp.future
      }
    }
  }
})
