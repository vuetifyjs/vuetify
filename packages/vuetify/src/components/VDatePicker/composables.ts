import type { DateAdapter } from '@/adapters/date-adapter'
import { useDate } from '@/composables/date'
import { useProxiedModel } from '@/composables/proxiedModel'
import { wrapInArray } from '@/util'
import { computed, inject, provide, watch } from 'vue'
import type { InjectionKey, Ref } from 'vue'

export type DatePickerProvide = {
  model: Ref<any[]>
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
  const model = useProxiedModel(
    props,
    'modelValue',
    null,
    v => {
      const arr = wrapInArray(v)

      return arr.map(adapter.value.date)
    },
    v => {
      if (props.range) return v
      return v[0]
    })
  const input = useProxiedModel(props, 'input')
  const mode = useProxiedModel(props, 'mode')
  const displayDate = useProxiedModel(props, 'displayDate', props.modelValue, v => adapter.value.date(v ?? new Date()))

  // TODO: Do this nicer
  watch(() => props.modelValue, () => {
    const date = wrapInArray(props.modelValue)[0]
    displayDate.value = adapter.value.date(date)
  })

  provide(DatePickerSymbol, {
    model,
    input,
    mode,
    displayDate,
    locale,
    adapter,
  })

  return {
    model,
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
