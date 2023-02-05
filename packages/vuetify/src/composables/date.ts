import type { DateAdapter } from '@/adapters/date-adapter'
import { enUS } from 'date-fns/locale'
import type { InjectionKey, Ref } from 'vue'
import { shallowRef, inject } from 'vue'
import { useLocale } from './locale'

export const DateAdapterSymbol: InjectionKey<{ adapter: Ref<DateAdapter<any>> }> = Symbol.for('vuetify:date-adapter')

export function createDate (options: { adapter: DateAdapter<any> }) {
  return { adapter: shallowRef(new options.adapter({ locale: enUS })) }
}

export function useDate () {
  const { current } = useLocale()
  const date = inject(DateAdapterSymbol)

  if (!date) throw new Error('foo')

  return date
}
