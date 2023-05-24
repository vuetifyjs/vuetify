// Composables
import { useLocale } from '@/composables/locale'

// Utilities
import { inject, watch } from 'vue'
import { propsFactory } from '@/util'

// Adapters
import { VuetifyDateAdapter } from './adapters/vuetify'

// Types
import type { InjectionKey, PropType } from 'vue'
import type { DateAdapter } from './DateAdapter'

export interface DateInstance extends DateAdapter<Date> {
  locale: string
}

export type DateOptions = {
  adapter: (new (locale: string) => DateInstance) | DateInstance
}

export const DateAdapterSymbol: InjectionKey<DateOptions> = Symbol.for('vuetify:date-adapter')

export interface DateProps {
  displayDate: Date
  hideAdjacentMonths: boolean
  modelValue: readonly any[]
}

export function createDate (options?: DateOptions) {
  return options ?? { adapter: VuetifyDateAdapter }
}

// TODO: revisit this after it starts being implemented
export const makeDateProps = propsFactory({
  displayDate: {
    type: Object as PropType<Date>,
    default: new Date(),
  },
  hideAdjacentMonths: Boolean,
  modelValue: {
    type: null as unknown as PropType<readonly any[]>,
    default: () => [],
  },
}, 'date')

export function useDate (props?: DateProps) {
  const date = inject(DateAdapterSymbol)
  const locale = useLocale()

  if (!date) throw new Error('[Vuetify] Could not find injected date')

  const instance = typeof date.adapter === 'function'
    // eslint-disable-next-line new-cap
    ? new date.adapter(locale.current.value)
    : date.adapter

  if (typeof date.adapter === 'function') {
    watch(locale.current, val => {
      instance.locale = val
    })
  }

  return instance
}
