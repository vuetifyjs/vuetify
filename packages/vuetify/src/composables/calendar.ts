// Composables
import * as dateUtil from '@/composables/date/temporal'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed } from 'vue'
import { propsFactory, wrapInArray } from '@/util'

// Types
import type { PropType } from 'vue'

// Types
export interface CalendarProps {
  allowedDates: string[] | ((date: string) => boolean) | undefined
  disabled: boolean
  displayValue: string | undefined
  modelValue: string[] | undefined
  max: string
  min: string
  showAdjacentMonths: boolean
  month: number | string | undefined
  weekdays: number[]
  year: number | string | undefined
  weeksInMonth: 'dynamic' | 'static'
  firstDayOfWeek: number | string | undefined
  firstDayOfYear: number | string | undefined
  weekdayFormat: 'long' | 'short' | 'narrow' | undefined

  'onUpdate:modelValue': ((value: string[]) => void) | undefined
  'onUpdate:month': ((value: number) => void) | undefined
  'onUpdate:year': ((value: number) => void) | undefined
}

export type CalendarDay = {
  date: Temporal.PlainDate
  formatted: string
  isAdjacent: boolean
  isDisabled: boolean
  isEnd: boolean
  isHidden: boolean
  isSame: boolean
  isSelected: boolean
  isStart: boolean
  isToday: boolean
  isWeekEnd: boolean
  isWeekStart: boolean
  isoDate: string
  localized: string
  month: number
  year: number
}

export type CalendarWeekdays = 0 | 1 | 2 | 3 | 4 | 5 | 6

// Composables
export const makeCalendarProps = propsFactory({
  allowedDates: [Array, Function] as PropType<string[] | ((date: string) => boolean)>,
  disabled: {
    type: Boolean,
    default: null,
  },
  displayValue: String,
  modelValue: Array as PropType<string[] | Temporal.PlainDate[]>,
  month: [Number, String],
  min: [String, Object] as PropType<string | Temporal.PlainDate | null>,
  max: [String, Object] as PropType<string | Temporal.PlainDate | null>,
  showAdjacentMonths: Boolean,
  year: [Number, String],
  weekdays: {
    type: Array as PropType<CalendarWeekdays[]>,
    default: () => [1, 2, 3, 4, 5, 6, 7],
  },
  weeksInMonth: {
    type: String as PropType<'dynamic' | 'static'>,
    default: 'dynamic',
  },
  firstDayOfWeek: {
    type: [Number, String],
    default: undefined,
  },
  firstDayOfYear: {
    type: [Number, String],
    default: undefined,
  },
  weekdayFormat: String as PropType<'long' | 'short' | 'narrow' | undefined>,
}, 'calendar')

export function useCalendar (props: CalendarProps) {
  const model = useProxiedModel(
    props,
    'modelValue',
    [],
    v => wrapInArray(v).map(i => dateUtil.parsePlainDate(i)),
  )
  const displayValue = computed(() => {
    let v
    if (props.displayValue) v = dateUtil.parsePlainDate(props.displayValue)
    if (v) return v
    if (model.value.length > 0) v = model.value[0]
    if (v) return v
    if (props.min) v = dateUtil.parsePlainDate(props.min)
    if (v) return v
    if (Array.isArray(props.allowedDates)) v = dateUtil.parsePlainDate(props.allowedDates[0])
    if (v) return v

    return Temporal.Now.plainDateISO()
  })

  const year = useProxiedModel(
    props,
    'year',
    undefined,
    v => v != null ? Number(v) : displayValue.value.year,
  )

  const month = useProxiedModel(
    props,
    'month',
    undefined,
    v => {
      const value = v != null ? Number(v) : displayValue.value.month
      return Temporal.PlainDate.from({
        year: year.value,
        month: value,
        day: 1,
      })
    },
    v => v.month
  )

  const weekdayLabels = computed(() => {
    const firstDayOfWeek = dateUtil.startOfWeek(Temporal.Now.plainDateISO(), 'en', props.firstDayOfWeek).dayOfWeek
    const val = dateUtil.getWeekdays('en', props.firstDayOfWeek, props.weekdayFormat)
    // .filter((_, i) => props.weekdays.includes((i + firstDayOfWeek) % 7))
    console.log(val)
    return val
  })

  const weeksInMonth = computed(() => {
    const weeks = dateUtil.getWeekArray(month.value, '', props.firstDayOfWeek)

    const days = weeks.flat()

    // Make sure there's always 6 weeks in month (6 * 7 days)
    // if weeksInMonth is 'static'
    const daysInMonth = 6 * 7
    if (props.weeksInMonth === 'static' && days.length < daysInMonth) {
      const lastDay = days[days.length - 1]

      let week = []
      for (let day = 1; day <= daysInMonth - days.length; day++) {
        week.push(lastDay.add({ days: day }))

        if (day % 7 === 0) {
          weeks.push(week)
          week = []
        }
      }
    }

    return weeks
  })

  function genDays (days: Temporal.PlainDate[], today: Temporal.PlainDate): CalendarDay[] {
    return days.filter(date => {
      return props.weekdays.includes(date.dayOfWeek)
    }).map((date, index) => {
      const isoDate = date.toString()
      const isAdjacent = !dateUtil.isSameMonth(date, month.value)
      const isStart = dateUtil.isSameDay(date, dateUtil.startOfMonth(month.value))
      const isEnd = dateUtil.isSameDay(date, dateUtil.endOfMonth(month.value))
      const isSame = dateUtil.isSameDay(date, month.value)
      const weekdaysCount = props.weekdays.length

      return {
        date,
        formatted: dateUtil.format(date, 'keyboardDate'),
        isAdjacent,
        isDisabled: isDisabled(date),
        isEnd,
        isHidden: isAdjacent && !props.showAdjacentMonths,
        isSame,
        isSelected: model.value.some(value => value && dateUtil.isSameDay(date, value)),
        isStart,
        isToday: dateUtil.isSameDay(date, today),
        isWeekEnd: index % weekdaysCount === weekdaysCount - 1,
        isWeekStart: index % weekdaysCount === 0,
        isoDate,
        localized: dateUtil.format(date, 'dayOfMonth'),
        month: date.month,
        year: date.year,
      }
    })
  }

  const daysInWeek = computed(() => {
    const lastDay = dateUtil.startOfWeek(displayValue.value, 'en', props.firstDayOfWeek)
    const week: Temporal.PlainDate[] = []
    for (let day = 0; day <= 6; day++) {
      week.push(lastDay.add({ days: day }))
    }

    const today = Temporal.Now.plainDateISO()

    return genDays(week, today)
  })

  const daysInMonth = computed(() => {
    const days = weeksInMonth.value.flat()
    const today = Temporal.Now.plainDateISO()

    return genDays(days, today)
  })

  const weekNumbers = computed(() => {
    return weeksInMonth.value.map(week => {
      return week.length ? dateUtil.getWeek(week[0], props.firstDayOfWeek, props.firstDayOfYear) : null
    })
  })

  function isDisabled (value: Temporal.PlainDate) {
    if (props.disabled) return true

    if (props.min && dateUtil.isBefore(dateUtil.endOfDay(value), dateUtil.parsePlainDate(props.min))) return true
    if (props.max && dateUtil.isAfter(value, dateUtil.parsePlainDate(props.max))) return true

    if (Array.isArray(props.allowedDates) && props.allowedDates.length > 0) {
      return !props.allowedDates.some(d => dateUtil.isSameDay(dateUtil.parsePlainDate(d), value))
    }

    if (typeof props.allowedDates === 'function') {
      return !props.allowedDates(value.toString())
    }

    return false
  }

  return {
    displayValue,
    daysInMonth,
    daysInWeek,
    genDays,
    model,
    weeksInMonth,
    weekdayLabels,
    weekNumbers,
  }
}
