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

  const daysInMonth = computed(() => {
    const { getDays } = date.adapter.value

    const days = getDays(new Date(2023, 2, 20))

    return days.map((day, index) => {
      return {
        day,
        // formatted: date.adapter.value.format(day, 'keyboardDate'),
        // year: getYear(day),
        // month: getMonth(day),
        isWeekStart: index % 7 === 0,
        isWeekEnd: index % 7 === 6,
        // isSelected: isStart || isEnd,
        // isStart,
        // isEnd,
        // isToday: isSameDay(day, today),
        // isAdjacent,
        // isHidden: isAdjacent && props.hideAdjacentMonths,
        // inRange: isRange && !isSame && (isStart || (validDates.length === 2 && isWithinRange(day, validDates as [any, any]))),
        // isHovered: false,
        // inHover: false,
        // localized: format(day, 'dayOfMonth'),
      }
    })
  })

  return {
    date,
    daysInMonth,
    weeksInMonth,
  }
}
