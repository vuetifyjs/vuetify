// Composables
import { createDateInput } from '../VDateInput/composables'

// Utilities
import { inject, provide, ref } from 'vue'

// Types
import type { InjectionKey, Ref } from 'vue'
import type { DateInputProps } from '../VDateInput/composables'

export type DatePickerProvide = {
  hoverDate: Ref<any>
  hoverMonth: Ref<any>
  isDragging: Ref<boolean>
  dragHandle: Ref<number | null>
  hasScrolled: Ref<boolean>
}

export const DatePickerSymbol: InjectionKey<DatePickerProvide> = Symbol.for('vuetify:date-picker')

type DateProps = DateInputProps & { multiple?: boolean }

export function createDatePicker (props: DateProps) {
  const hoverDate = ref()
  const hoverMonth = ref()
  const isDragging = ref(false)
  const dragHandle = ref(null)
  const hasScrolled = ref(false)

  provide(DatePickerSymbol, {
    hoverDate,
    hoverMonth,
    isDragging,
    dragHandle,
    hasScrolled,
  })

  // TODO: This composable should probably not live in DateInput
  const { model, displayDate, viewMode, inputMode, isEqual } = createDateInput(props, !!props.multiple)

  return {
    hoverDate,
    hoverMonth,
    isDragging,
    dragHandle,
    hasScrolled,
    model,
    displayDate,
    viewMode,
    inputMode,
    isEqual,
  }
}

export function useDatePicker () {
  const datePicker = inject(DatePickerSymbol)

  if (!datePicker) throw new Error('foo')

  return datePicker
}
