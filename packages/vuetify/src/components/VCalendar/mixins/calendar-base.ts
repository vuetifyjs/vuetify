
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
  parseTimestamp,
  getWeekdaySkips,
  createDayList,
  createNativeLocaleFormatter,
  getStartOfWeek,
  getEndOfWeek,
  getTimestampIdentifier,
} from '../util/timestamp'
import { CalendarTimestamp, CalendarFormatter } from 'vuetify/types'

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
        : (this.weekdays || '').split(',').map(x => parseInt(x, 10))
    },
    weekdaySkips (): number[] {
      return getWeekdaySkips(this.parsedWeekdays)
    },
    weekdaySkipsReverse (): number [] {
      const reversed = this.weekdaySkips.slice()
      reversed.reverse()
      return reversed
    },
    parsedStart (): CalendarTimestamp {
      return parseTimestamp(this.start, true)
    },
    parsedEnd (): CalendarTimestamp {
      const start = this.parsedStart
      const end: CalendarTimestamp = this.end ? parseTimestamp(this.end) || start : start

      return getTimestampIdentifier(end) < getTimestampIdentifier(start) ? start : end
    },
    days (): CalendarTimestamp[] {
      return createDayList(
        this.parsedStart,
        this.parsedEnd,
        this.times.today,
        this.weekdaySkips
      )
    },
    dayFormatter (): CalendarFormatter {
      if (this.dayFormat) {
        return this.dayFormat as CalendarFormatter
      }

      const options = { timeZone: 'UTC', day: 'numeric' }

      return createNativeLocaleFormatter(
        this.currentLocale,
        (_tms, _short) => options
      )
    },
    weekdayFormatter (): CalendarFormatter {
      if (this.weekdayFormat) {
        return this.weekdayFormat as CalendarFormatter
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
    getRelativeClasses (timestamp: CalendarTimestamp, outside = false): object {
      return {
        'v-present': timestamp.present,
        'v-past': timestamp.past,
        'v-future': timestamp.future,
        'v-outside': outside,
      }
    },
    getStartOfWeek (timestamp: CalendarTimestamp): CalendarTimestamp {
      return getStartOfWeek(timestamp, this.parsedWeekdays, this.times.today)
    },
    getEndOfWeek (timestamp: CalendarTimestamp): CalendarTimestamp {
      return getEndOfWeek(timestamp, this.parsedWeekdays, this.times.today)
    },
    getFormatter (options: object): CalendarFormatter {
      return createNativeLocaleFormatter(
        this.locale,
        (_tms, _short) => options
      )
    },
  },
})
