import type { DateAdapter } from '@/adapters/date-adapter'
import type { InjectionKey, Ref } from 'vue'
import { computed, inject } from 'vue'

export const DateAdapterSymbol: InjectionKey<{ adapter: DateAdapter<any> }> = Symbol.for('vuetify:date-adapter')

export function createDate (options: { adapter: DateAdapter<any> }) {
  return options
}

export function useDate (locale: Ref<string>) {
  const date = inject(DateAdapterSymbol)

  if (!date) throw new Error('foo')

  const adapter = computed<DateAdapter<any>>(() => {
    return new date.adapter({ locale: locale.value })
  })

  return { adapter }
}
