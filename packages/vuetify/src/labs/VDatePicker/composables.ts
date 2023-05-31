// Utilities
import { inject, provide, ref } from 'vue'

// Types
import type { InjectionKey, Ref } from 'vue'

export type DatePickerProvide = {
  hoverDate: Ref<any>
  hoverMonth: Ref<any>
  isDragging: Ref<boolean>
  dragHandle: Ref<number | null>
  hasScrolled: Ref<boolean>
}

export const DatePickerSymbol: InjectionKey<DatePickerProvide> = Symbol.for('vuetify:date-picker')

interface DateProps {
}

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

  return {
    hoverDate,
    hoverMonth,
    isDragging,
    dragHandle,
    hasScrolled,
  }
}

export function useDatePicker () {
  const datePicker = inject(DatePickerSymbol)

  if (!datePicker) throw new Error('foo')

  return datePicker
}
