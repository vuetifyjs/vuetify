
import { validateTimestamp, parseDate, DAYS_IN_WEEK, validateTime } from './timestamp'
import { PropType } from 'vue'
import { CalendarEvent, CalendarFormatter, CalendarTimestamp, CalendarEventOverlapMode, CalendarEventNameFunction, CalendarEventColorFunction, CalendarEventCategoryFunction, CalendarEventTimedFunction } from 'vuetify/types'
import { CalendarEventOverlapModes } from '../modes'
import { PropValidator } from 'vue/types/options'

export default {
  base: {
    start: {
      type: [String, Number, Date],
      validate: validateTimestamp,
      default: () => parseDate(new Date()).date,
    },
    end: {
      type: [String, Number, Date],
      validate: validateTimestamp,
    },
    weekdays: {
      type: [Array, String] as PropType<number[] | string>,
      default: () => [0, 1, 2, 3, 4, 5, 6],
      validate: validateWeekdays,
    },
    hideHeader: {
      type: Boolean,
    },
    shortWeekdays: {
      type: Boolean,
      default: true,
    },
    weekdayFormat: {
      type: Function as PropType<CalendarFormatter>,
      default: null,
    },
    dayFormat: {
      type: Function as PropType<CalendarFormatter>,
      default: null,
    },
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
      default: 48,
      validate: validateNumber,
    },
    intervalWidth: {
      type: [Number, String],
      default: 60,
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
    firstTime: {
      type: [Number, String, Object],
      validate: validateTime,
    },
    intervalCount: {
      type: [Number, String],
      default: 24,
      validate: validateNumber,
    },
    intervalFormat: {
      type: Function as PropType<CalendarFormatter>,
      default: null,
    },
    intervalStyle: {
      type: Function as PropType<(interval: CalendarTimestamp) => object>,
      default: null,
    },
    showIntervalLabel: {
      type: Function as PropType<(interval: CalendarTimestamp) => boolean>,
      default: null,
    },
  },
  weeks: {
    localeFirstDayOfYear: {
      type: [String, Number],
      default: 0,
    },
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
    showWeek: Boolean,
    monthFormat: {
      type: Function as PropType<CalendarFormatter>,
      default: null,
    },
  },
  calendar: {
    type: {
      type: String,
      default: 'month',
    },
    value: {
      type: [String, Number, Date] as PropType<string | number | Date>,
      validate: validateTimestamp,
    },
  },
  category: {
    categories: {
      type: [Array, String],
      default: '',
    },
    categoryHideDynamic: {
      type: Boolean,
    },
    categoryShowAll: {
      type: Boolean,
    },
    categoryForInvalid: {
      type: String,
      default: '',
    },
    categoryDays: {
      type: [Number, String],
      default: 1,
      validate: (x: any) => isFinite(parseInt(x)) && parseInt(x) > 0,
    },
  },
  events: {
    events: {
      type: Array,
      default: () => [],
    } as PropValidator<CalendarEvent[]>,
    eventStart: {
      type: String,
      default: 'start',
    },
    eventEnd: {
      type: String,
      default: 'end',
    },
    eventTimed: {
      type: [String, Function] as PropType<string | CalendarEventTimedFunction>,
      default: 'timed',
    },
    eventCategory: {
      type: [String, Function] as PropType<string | CalendarEventCategoryFunction>,
      default: 'category',
    },
    eventHeight: {
      type: Number,
      default: 20,
    },
    eventColor: {
      type: [String, Function] as PropType<string | CalendarEventColorFunction>,
      default: 'primary',
    },
    eventTextColor: {
      type: [String, Function] as PropType<string | CalendarEventColorFunction>,
      default: 'white',
    },
    eventName: {
      type: [String, Function] as PropType<string | CalendarEventNameFunction>,
      default: 'name',
    },
    eventOverlapThreshold: {
      type: [String, Number],
      default: 60,
    },
    eventOverlapMode: {
      type: [String, Function],
      default: 'stack',
      validate: (mode: any) => mode in CalendarEventOverlapModes || typeof mode === 'function',
    } as PropValidator<'stack' | 'column' | CalendarEventOverlapMode>,
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

export function validateWeekdays (input: string | (number | string)[]): boolean {
  if (typeof input === 'string') {
    input = input.split(',')
  }

  if (Array.isArray(input)) {
    const ints = input.map(x => parseInt(x))

    if (ints.length > DAYS_IN_WEEK || ints.length === 0) {
      return false
    }

    const visited: Record<number, boolean> = {}
    let wrapped = false

    for (let i = 0; i < ints.length; i++) {
      const x = ints[i]

      if (!isFinite(x) || x < 0 || x >= DAYS_IN_WEEK) {
        return false
      }

      if (i > 0) {
        const d = x - ints[i - 1]
        if (d < 0) {
          if (wrapped) {
            return false
          }
          wrapped = true
        } else if (d === 0) {
          return false
        }
      }

      if (visited[x]) {
        return false
      }
      visited[x] = true
    }

    return true
  }

  return false
}
