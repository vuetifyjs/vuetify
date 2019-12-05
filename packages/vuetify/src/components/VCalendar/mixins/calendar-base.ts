
// Mixins
import mixins from '../../../util/mixins'
import Colorable from '../../../mixins/colorable'
import Localable from '../../../mixins/localable'
import Mouse from './mouse'
import Themeable from '../../../mixins/themeable'
import Times from './times'

// Directives
import Resize from '../../../directives/resize'

// Util
import props from '../util/props'
import {
  VTimestamp,
  VTimestampFormatter,
  parseTimestamp,
  getWeekdaySkips,
  getTimestampIdentifier,
  createDayList,
  createNativeLocaleFormatter,
  getStartOfWeek,
  getEndOfWeek,
} from '../util/timestamp'

export default mixins(
  Colorable,
  Localable,
  Mouse,
  Themeable,
  Times
/* @vue/component */
).extend({
  name: 'calendar-base',

  directives: {
    Resize,
  },

  props: props.base,

  computed: {
    parsedWeekdays (): number[] {
      return Array.isArray(this.weekdays)
        ? this.weekdays
        : this.weekdays.split(',').map(x => parseInt(x, 10))
    },
    weekdaySkips (): number[] {
      return getWeekdaySkips(this.parsedWeekdays)
    },
    weekdaySkipsReverse (): number [] {
      const reversed = this.weekdaySkips.slice()
      reversed.reverse()
      return reversed
    },
    parsedStart (): VTimestamp {
      return parseTimestamp(this.start) as VTimestamp
    },
    parsedEnd (): VTimestamp {
      const start = this.parsedStart
      const end: VTimestamp = this.end ? parseTimestamp(this.end) || start : start

      return getTimestampIdentifier(end) < getTimestampIdentifier(start) ? start : end
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
        this.currentLocale,
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
        this.currentLocale,
        (_tms, short) => short ? shortOptions : longOptions
      )
    },
  },

  methods: {
    getRelativeClasses (timestamp: VTimestamp, outside = false): object {
      return {
        'v-present': timestamp.present,
        'v-past': timestamp.past,
        'v-future': timestamp.future,
        'v-outside': outside,
      }
    },
    getStartOfWeek (timestamp: VTimestamp): VTimestamp {
      return getStartOfWeek(timestamp, this.parsedWeekdays, this.times.today)
    },
    getEndOfWeek (timestamp: VTimestamp): VTimestamp {
      return getEndOfWeek(timestamp, this.parsedWeekdays, this.times.today)
    },
    getFormatter (options: object): VTimestampFormatter {
      return createNativeLocaleFormatter(
        this.locale,
        (_tms, _short) => options
      )
    },
  },
})
