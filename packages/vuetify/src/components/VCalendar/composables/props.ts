import {
  parseDate,
  validateTime,
  validateTimestamp,
  validateWeekdays,
} from '@/composables/calendar/timestamp'
import type {
  CalendarCategory,
  CalendarEvent,
  CalendarFormatter,
  CalendarTimestamp,
} from '@/composables/calendar/timestamp'
import { propsFactory } from '@/util'
import type { PropType } from 'vue'
import { CalendarEventOverlapModes } from './modes'

export const makeTimesProps = propsFactory({
  now: {
    type: String,
    validator: validateTimestamp,
  },
})

export const makeBaseProps = propsFactory({
  start: {
    type: [ String, Number, Date ],
    validate: validateTimestamp,
    default: () => parseDate(new Date()).date,
  },
  end: {
    type: [ String, Number, Date ],
    validate: validateTimestamp,
  },
  weekdays: {
    type: [ Array, String ] as PropType<number[] | string>,
    default: () => [ 0, 1, 2, 3, 4, 5, 6 ],
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
}, 'baseCalendar')

export const makeEventsProps = propsFactory({
  events: {
    type: Array,
    default: () => [],
  } as Proptype<CalendarEvent[]>,
  eventStart: {
    type: String,
    default: 'start',
  },
  eventEnd: {
    type: String,
    default: 'end',
  },
  eventTimed: {
    type: [ String, Function ] as PropType<string | CalendarEventTimedFunction>,
    default: 'timed',
  },
  eventCategory: {
    type: [ String, Function ] as PropType<string | CalendarEventCategoryFunction>,
    default: 'category',
  },
  eventHeight: {
    type: Number,
    default: 20,
  },
  eventColor: {
    type: [ String, Function ] as PropType<string | CalendarEventColorFunction>,
    default: 'primary',
  },
  eventTextColor: {
    type: [ String, Function ] as PropType<string | CalendarEventColorFunction>,
    default: 'white',
  },
  eventName: {
    type: [ String, Function ] as PropType<string | CalendarEventNameFunction>,
    default: 'name',
  },
  eventOverlapThreshold: {
    type: [ String, Number ],
    default: 60,
  },
  eventOverlapMode: {
    type: [ String, Function ],
    default: 'stack',
    validate: (mode: any) => mode in CalendarEventOverlapModes || typeof mode === 'function',
  } as 'stack' | 'column' | CalendarEventOverlapMode,
  eventMore: {
    type: Boolean,
    default: true,
  },
  eventMoreText: {
    type: String,
    default: '$vuetify.calendar.moreEvents',
  },
  eventRipple: {
    type: [ Boolean, Object ],
    default: null,
  },
  eventMarginBottom: {
    type: Number,
    default: 1,
  },
})

export const makeCalendarProps = propsFactory({
  type: {
    type: String,
    default: 'month',
  },
  value: {
    type: [ String, Number, Date ] as PropType<string | number | Date>,
    validate: validateTimestamp,
  },
})

export const makeCategoryProps = propsFactory({
  categories: {
    type: [ Array, String ] as PropType<CalendarCategory[] | string>,
    default: '',
  },
  categoryText: {
    type: [ String, Function ] as PropType<string | CalendarCategoryTextFunction>,
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
    type: [ Number, String ],
    default: 1,
    validate: (x: any) => isFinite(parseInt(x)) && parseInt(x) > 0,
  },
})

export const makeIntervalProps = propsFactory({
  maxDays: {
    type: Number,
    default: 7,
  },
  shortIntervals: {
    type: Boolean,
    default: true,
  },
  intervalHeight: {
    type: [ Number, String ],
    default: 48,
    validate: validateNumber,
  },
  intervalWidth: {
    type: [ Number, String ],
    default: 60,
    validate: validateNumber,
  },
  intervalMinutes: {
    type: [ Number, String ],
    default: 60,
    validate: validateNumber,
  },
  firstInterval: {
    type: [ Number, String ],
    default: 0,
    validate: validateNumber,
  },
  firstTime: {
    type: [ Number, String, Object ],
    validate: validateTime,
  },
  intervalCount: {
    type: [ Number, String ],
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
})

export const makeWeeksProps = propsFactory({
  localeFirstDayOfYear: {
    type: [ String, Number ],
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
})

export function validateNumber (input: any): boolean {
  return isFinite(parseInt(input))
}
