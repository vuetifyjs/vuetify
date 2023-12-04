// Composables
import { getWeek, useDate } from '@/composables/date/date'

// Utilities
import { computed } from 'vue'
import { propsFactory, wrapInArray } from '@/util'

// Types
import type { PropType } from 'vue'
import { useProxiedModel } from '../../composables/proxiedModel'

// Types
export interface CalendarProps {
  allowedDates: unknown[] | ((date: unknown) => boolean)
  disabled: boolean
  displayValue: unknown
  modelValue: unknown[]
  max: unknown
  min: unknown
  showAdjacentMonths: boolean

  'onUpdate:modelValue': (value: unknown[]) => void
}

// Composables
export const makeCalendarProps = propsFactory({
  allowedDates: [Array, Function],
  disabled: Boolean,
  displayValue: null as any as PropType<unknown>,
  modelValue: Array as PropType<unknown[]>,
  max: null as any as PropType<unknown>,
  min: null as any as PropType<unknown>,
  showAdjacentMonths: Boolean,
}, 'calendar')

export function useCalendar (props: CalendarProps) {
  const adapter = useDate()
  const model = useProxiedModel(
    props,
    'modelValue',
    [],
    v => wrapInArray(v),
  )
  const displayValue = computed(() => {
    if (adapter.isValid(props.displayValue)) return adapter.date(props.displayValue)
    if (model.value.length > 0) return adapter.date(model.value[0])
    if (props.min) return adapter.date(props.min)
    if (Array.isArray(props.allowedDates)) return adapter.date(props.allowedDates[0])

    return adapter.date()
  })

  const weeksInMonth = computed(() => {
    const weeks = adapter.getWeekArray(displayValue.value)

    const days = weeks.flat()

    // Make sure there's always 6 weeks in month (6 * 7 days)
    // But only do it if we're not hiding adjacent months?
    const daysInMonth = 6 * 7
    if (days.length < daysInMonth) {
      const lastDay = days[days.length - 1]

      let week = []
      for (let day = 1; day <= daysInMonth - days.length; day++) {
        week.push(adapter.addDays(lastDay, day))

        if (day % 7 === 0) {
          weeks.push(week)
          week = []
        }
      }
    }

    return weeks
  })

  const daysInMonth = computed(() => {
    const days = weeksInMonth.value.flat()
    const today = adapter.date()

    return days.map((date, index) => {
      const isoDate = adapter.toISO(date)
      const isAdjacent = !adapter.isSameMonth(date, displayValue.value)
      const isStart = adapter.isSameDay(date, adapter.startOfMonth(displayValue.value))
      const isEnd = adapter.isSameDay(date, adapter.endOfMonth(displayValue.value))
      const isSame = adapter.isSameDay(date, displayValue.value)

      return {
        date,
        isoDate,
        formatted: adapter.format(date, 'keyboardDate'),
        year: adapter.getYear(date),
        month: adapter.getMonth(date),
        isDisabled: isDisabled(date),
        isWeekStart: index % 7 === 0,
        isWeekEnd: index % 7 === 6,
        isToday: adapter.isSameDay(date, today),
        isAdjacent,
        isHidden: isAdjacent && !props.showAdjacentMonths,
        isStart,
        isEnd,
        isSame,
        localized: adapter.format(date, 'dayOfMonth'),
      }
    })
  })

  const weekNumbers = computed(() => {
    return weeksInMonth.value.map(week => {
      return week.length ? getWeek(adapter, week[0]) : null
    })
  })

  function isDisabled (value: unknown) {
    if (props.disabled) return true

    const date = adapter.date(value)

    if (props.min && adapter.isAfter(adapter.date(props.min), date)) return true
    if (props.max && adapter.isAfter(date, adapter.date(props.max))) return true

    if (Array.isArray(props.allowedDates) && props.allowedDates.length > 0) {
      return !props.allowedDates.some(d => adapter.isSameDay(adapter.date(d), date))
    }

    if (typeof props.allowedDates === 'function') {
      return !props.allowedDates(date)
    }

    return false
  }

  return {
    displayValue,
    daysInMonth,
    weeksInMonth,
    weekNumbers,
  }
}
