// Composables
import { useLocale } from '@/composables/locale'

// Utilities
import { inject, watch } from 'vue'
import { propsFactory } from '@/util'

// Adapters
import { VuetifyDateAdapter } from './adapters/vuetify'

// Types
import type { DateAdapter } from './DateAdapter'
import type { InjectionKey, PropType } from 'vue'

export interface DateInstance<T> extends DateAdapter<T> {
  locale: string
}

export type DateOptions<T = any> = {
  adapter: (new (options: { locale: any }) => DateInstance<T>) | DateInstance<T>
  formats?: Record<string, string>
  locale?: Record<string, any>
}

export const DateAdapterSymbol: InjectionKey<DateOptions> = Symbol.for('vuetify:date-adapter')

export interface DateProps {
  displayDate: any
  hideAdjacentMonths: boolean
  modelValue: any[]
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
    type: null as unknown as PropType<any[]>,
    default: () => [],
  },
}, 'date')

export function useDate () {
  const date = inject(DateAdapterSymbol)
  const locale = useLocale()

  if (!date) throw new Error('[Vuetify] Could not find injected date')

  const instance = typeof date.adapter === 'function'
    // eslint-disable-next-line new-cap
    ? new date.adapter({ locale: date.locale ? date.locale[locale.current.value] : locale.current.value })
    : date.adapter

  watch(locale.current, value => {
    const newLocale = date.locale ? date.locale[value] : value
    instance.locale = newLocale ?? instance.locale
  })

  return instance
}
