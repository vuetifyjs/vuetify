import type { DateAdapter } from '@/adapters/date-adapter'
import { useDate } from '@/composables/date'
import { useProxiedModel } from '@/composables/proxiedModel'
import type { InjectionKey, Ref } from 'vue'
import { computed, inject, provide } from 'vue'

export type DatePickerProvide = {
  date: Ref<any>
  mode: Ref<'month' | 'years'>
  input: Ref<'calendar' | 'keyboard'>
  displayDate: Ref<any>
  locale: Ref<any>
  adapter: Ref<DateAdapter<any>>
}

export const DatePickerSymbol: InjectionKey<DatePickerProvide> = Symbol.for('vuetify:date-picker')

export function createDatePicker (props: any) {
  const locale = computed(() => props.locale)
  const { adapter } = useDate(locale)
  const date = useProxiedModel(props, 'modelValue', null, v => adapter.value.date(v))
  const input = useProxiedModel(props, 'input')
  const mode = useProxiedModel(props, 'mode')
  const displayDate = useProxiedModel(props, 'displayDate', props.modelValue, v => adapter.value.date(v))

  provide(DatePickerSymbol, {
    date,
    input,
    mode,
    displayDate,
    locale,
    adapter,
  })

  return {
    date,
    input,
    mode,
    displayDate,
  }
}

export function useDatePicker () {
  const datePicker = inject(DatePickerSymbol)

  if (!datePicker) throw new Error('foo')

  return datePicker
}
