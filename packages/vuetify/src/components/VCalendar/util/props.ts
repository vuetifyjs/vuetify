
import { validateTimestamp, parseDate } from './timestamp'
import { PropValidator } from 'vue/types/options'
import { VEventInput, VTimestampFormatter, VTimestamp } from '../types'

export default {
  base: {
    start: {
      type: String,
      validate: validateTimestamp,
      default: () => parseDate(new Date()).date,
    },
    end: {
      type: String,
      validate: validateTimestamp,
    },
    weekdays: {
      type: Array,
      default: () => [0, 1, 2, 3, 4, 5, 6],
    } as PropValidator<number[]>,
    hideHeader: {
      type: Boolean,
      default: false,
    },
    shortWeekdays: {
      type: Boolean,
      default: true,
    },
    weekdayFormat: {
      type: Function,
      default: null,
    } as PropValidator<VTimestampFormatter>,
    dayFormat: {
      type: Function,
      default: null,
    } as PropValidator<VTimestampFormatter>,
  },
  intervals: {
    maxDays: {
      type: Number,
      default: 7,
    },
    shortIntervals: {
      type: Boolean,
      default: true,
    },
    intervalHeight: {
      type: [Number, String],
      default: 40,
      validate: validateNumber,
    },
    intervalMinutes: {
      type: [Number, String],
      default: 60,
      validate: validateNumber,
    },
    firstInterval: {
      type: [Number, String],
      default: 0,
      validate: validateNumber,
    },
    intervalCount: {
      type: [Number, String],
      default: 24,
      validate: validateNumber,
    },
    intervalFormat: {
      type: Function,
      default: null,
    } as PropValidator<VTimestampFormatter>,
    intervalStyle: {
      type: Function,
      default: null,
    } as PropValidator<(interval: VTimestamp) => object>,
    showIntervalLabel: {
      type: Function,
      default: null,
    } as PropValidator<(interval: VTimestamp) => boolean>,
  },
  weeks: {
    minWeeks: {
      validate: validateNumber,
      default: 1,
    },
    shortMonths: {
      type: Boolean,
      default: true,
    },
    showMonthOnFirst: {
      type: Boolean,
      default: true,
    },
    monthFormat: {
      type: Function,
      default: null,
    } as PropValidator<VTimestampFormatter>,
  },
  calendar: {
    type: {
      type: String,
      default: 'month',
    },
    value: {
      type: String,
      validate: validateTimestamp,
    },
  },
  events: {
    events: {
      type: Array,
      default: () => [],
    } as PropValidator<VEventInput[]>,
    eventStart: {
      type: String,
      default: 'start',
    },
    eventEnd: {
      type: String,
      default: 'end',
    },
    eventHeight: {
      type: Number,
      default: 20,
    },
    eventColor: {
      type: [String, Function],
      default: 'secondary',
    },
    eventTextColor: {
      type: [String, Function],
      default: 'white',
    },
    eventName: {
      type: [String, Function],
      default: 'name',
    },
    eventOverlapThreshold: {
      type: Number,
      default: 60,
    },
    eventMore: {
      type: Boolean,
      default: true,
    },
    eventMoreText: {
      type: String,
      default: '$vuetify.calendar.moreEvents',
    },
    eventRipple: {
      type: [Boolean, Object],
      default: null,
    },
    eventMarginBottom: {
      type: Number,
      default: 1,
    },
  },
}

export function validateNumber (input: any): boolean {
  return isFinite(parseInt(input))
}
