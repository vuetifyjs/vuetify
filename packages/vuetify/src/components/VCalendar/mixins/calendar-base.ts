
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
  copyTimestamp,
  getWeekdaySkips,
  findWeekday,
  prevDay,
  updateWeekday,
  updateFormatted,
  updateRelative,
  daysInMonth,
  createDayList,
  createNativeLocaleFormatter,
  DAY_MIN
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
      const start = copyTimestamp(timestamp)
      findWeekday(start, this.weekdays[0], prevDay)
      updateFormatted(start)
      updateRelative(start, this.times.today, start.hasTime)
      return start
    },
    getEndOfWeek (timestamp: VTimestamp): VTimestamp {
      const end = copyTimestamp(timestamp)
      findWeekday(end, this.weekdays[this.weekdays.length - 1])
      updateFormatted(end)
      updateRelative(end, this.times.today, end.hasTime)
      return end
    },
    getStartOfMonth (timestamp: VTimestamp): VTimestamp {
      const start = copyTimestamp(timestamp)
      start.day = DAY_MIN
      updateWeekday(start)
      updateFormatted(start)
      return start
    },
    getEndOfMonth (timestamp: VTimestamp): VTimestamp {
      const end = copyTimestamp(timestamp)
      end.day = daysInMonth(end.year, end.month)
      updateWeekday(end)
      updateFormatted(end)
      return end
    }
  }
})
