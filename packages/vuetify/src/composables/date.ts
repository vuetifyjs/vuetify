// Utilities
import { inject, shallowRef, watch } from 'vue'
import { propsFactory } from '@/util'

// Types
import type { InjectionKey, PropType } from 'vue'
import type { DateAdapter } from '@/adapters/date-adapter'
import { useLocale } from './locale'

export const DateAdapterSymbol: InjectionKey<{ adapter: { new(locale: string): DateAdapter<any> } }> = Symbol.for('vuetify:date-adapter')

export interface DateProps {
  displayDate: Date
  hideAdjacentMonths: boolean
  modelValue: any[]
}

export function createDate (options: { adapter: { new(locale: string): DateAdapter<any> } }) {
  return options
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
  const locale = useLocale()

  if (!date) throw new Error('[Vuetify] Could not find injected date')

  // eslint-disable-next-line new-cap
  const instance = shallowRef(new date.adapter(locale.current.value))

  watch(locale.current, () => {
    // eslint-disable-next-line new-cap
    instance.value = new date.adapter(locale.current.value)
  })

  return instance
}
