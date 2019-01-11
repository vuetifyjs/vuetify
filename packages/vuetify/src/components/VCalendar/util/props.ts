
import { validateTimestamp, parseDate } from './timestamp'

export default {
  base: {
    start: {
      type: String,
      validate: validateTimestamp,
      default: () => parseDate(new Date()).date
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
      type: Function, // VTimestampFormatter,
      default: null
    },
    dayFormat: {
      type: Function, // VTimestampFormatter,
      default: null
    },
    locale: {
      type: String,
      default: 'en-us'
    }
  },
  intervals: {
    maxDays: {
      type: Number,
      default: 7
    },
    shortIntervals: {
      type: Boolean,
      default: true
    },
    intervalHeight: {
      type: [Number, String],
      default: 40,
      validate: validateNumber
    },
    intervalMinutes: {
      type: [Number, String],
      default: 60,
      validate: validateNumber
    },
    firstInterval: {
      type: [Number, String],
      default: 0,
      validate: validateNumber
    },
    intervalCount: {
      type: [Number, String],
      default: 24,
      validate: validateNumber
    },
    intervalFormat: {
      type: Function, // VTimestampFormatter,
      default: null
    },
    intervalStyle: {
      type: Function, // (interval: VTimestamp): object
      default: null
    },
    showIntervalLabel: {
      type: Function, // (interval: VTimestamp): boolean
      default: null
    }
  },
  weeks: {
    minWeeks: {
      validate: validateNumber,
      default: 1
    },
    shortMonths: {
      type: Boolean,
      default: true
    },
    showMonthOnFirst: {
      type: Boolean,
      default: true
    },
    monthFormat: {
      type: Function, // VTimestampFormatter,
      default: null
    }
  },
  calendar: {
    type: {
      type: String,
      default: 'month'
    },
    value: {
      type: String,
      validate: validateTimestamp
    }
  }
}

function validateNumber (input: any): boolean {
  return isFinite(parseInt(input))
}
