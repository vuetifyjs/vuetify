// Utilities
import { computed, inject, shallowRef } from 'vue'
import { propsFactory } from '@/util'

// Types
import type { InjectionKey, PropType, Ref } from 'vue'
import type { DateAdapter } from '@/adapters/date-adapter'

export const DateAdapterSymbol: InjectionKey<{ adapter: Ref<DateAdapter<any>> }> = Symbol.for('vuetify:date-adapter')

export interface DateProps {
  displayDate: Date
  hideAdjacentMonths: boolean
  modelValue: any[]
}

export function createDate (options: { adapter: DateAdapter<any> }) {
  // eslint-disable-next-line new-cap
  return { adapter: shallowRef(new options.adapter()) }
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
  const date = inject(DateAdapterSymbol)

  if (!date) throw new Error('[Vuetify] Could not find injected date')

  const weeksInMonth = computed(() => {
    const { getWeekArray } = date.adapter.value

    return getWeekArray(props.displayDate)
  })

  const daysInMonth = computed(() => {
    return weeksInMonth.value.flat()
  })

  return {
    date,
    daysInMonth,
    weeksInMonth,
  }
}
