import type { DateAdapter } from '@/adapters/date-adapter'
import { enUS } from 'date-fns/locale'
import type { InjectionKey, PropType, Ref } from 'vue'
import { computed, inject, shallowRef } from 'vue'
// import { useLocale } from './locale'

// Utilities
import { propsFactory } from '@/util'

// Types

export const DateAdapterSymbol: InjectionKey<{ adapter: Ref<DateAdapter<any>> }> = Symbol.for('vuetify:date-adapter')

export interface DateProps {
  displayDate: Date
  hideAdjacentMonths: boolean
  modelValue: any[]
}

export function createDate (options: { adapter: DateAdapter<any> }) {
  return { adapter: shallowRef(new options.adapter({ locale: enUS })) }
}

export const makeDateProps = propsFactory({
  displayDate: {
    type: Object as PropType<Date>,
    default: new Date(),
  },
  hideAdjacentMonths: Boolean,
  modelValue: {
    type: null as unknown as PropType<any[]>,
    default: () => [],
  },
}, 'date')

export function useDate (props: DateProps) {
  // const { current } = useLocale()
  const date = inject(DateAdapterSymbol)

  if (!date) throw new Error('[Vuetify] Could not find injected date')

  const month = computed(() => props.displayDate)

  const weeksInMonth = computed(() => {
    const weeks = date.adapter.value.getWeekArray(month.value)

    const days = weeks.flat()

    // Make sure there's always 6 weeks in month (6 * 7 days)
    // But only do it if we're not hiding adjacent months?
    const daysInMonth = 6 * 7
    if (days.length < daysInMonth && !props.hideAdjacentMonths) {
      const lastDay = days[days.length - 1]

      let week = []
      for (let day = 1; day <= daysInMonth - days.length; day++) {
        week.push(date.adapter.value.addDays(lastDay, day))

        if (day % 7 === 0) {
          weeks.push(week)
          week = []
        }
      }
    }

    return weeks
  })

  const daysInMonth = computed(() => {
    const { format, getYear, getMonth, isWithinRange, isSameMonth, isSameDay } = date.adapter.value
    const validDates = props.modelValue.filter(v => !!v)
    const isRange = validDates.length > 1

    const days = weeksInMonth.value.flat()
    const today = date.adapter.value.date()

    const startDate = validDates[0]
    const endDate = validDates[1]

    return days.map((day, index) => {
      const isStart = isSameDay(day, startDate)
      const isEnd = isSameDay(day, endDate)
      const isAdjacent = !isSameMonth(day, month.value)
      const isSame = validDates.length === 2 && isSameDay(startDate, endDate)

      return {
        date,
        formatted: date.adapter.value.format(day, 'keyboardDate'),
        year: getYear(day),
        month: getMonth(day),
        isWeekStart: index % 7 === 0,
        isWeekEnd: index % 7 === 6,
        isSelected: isStart || isEnd,
        isStart,
        isEnd,
        isToday: isSameDay(day, today),
        isAdjacent,
        isHidden: isAdjacent && props.hideAdjacentMonths,
        inRange: isRange && !isSame && (isStart || (validDates.length === 2 && isWithinRange(day, validDates as [any, any]))),
        isHovered: false,
        inHover: false,
        localized: format(day, 'dayOfMonth'),
      }
    })
  })

  return {
    date,
    daysInMonth,
    weeksInMonth,
  }
}
