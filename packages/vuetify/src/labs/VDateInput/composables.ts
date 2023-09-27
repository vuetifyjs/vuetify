// Composables
import { useProxiedModel } from '@/composables/proxiedModel'
import { useDate } from '@/labs/date'

// Utilities
import { propsFactory, wrapInArray } from '@/util'

// Types
import type { PropType } from 'vue'

export const makeDateProps = propsFactory({
  modelValue: {
    type: null as unknown as PropType<any[]>,
    default: () => [],
  },
  displayDate: {
    type: null as unknown as PropType<any>,
    default: null,
  },
  inputMode: {
    type: String as PropType<'calendar' | 'keyboard'>,
    default: 'calendar',
  },
  viewMode: {
    type: String as PropType<'month' | 'year'>,
    default: 'month',
  },
  format: String,
}, 'date')

export const dateEmits = {
  'update:modelValue': (date: readonly any[]) => true,
  'update:displayDate': (date: any) => true,
  'update:focused': (focused: boolean) => true,
  'update:inputMode': (inputMode: 'calendar' | 'keyboard') => true,
  'update:viewMode': (viewMode: 'month' | 'year') => true,
}

export type DateInputProps = {
  modelValue?: any | any[]
  'onUpdate:modelValue': ((value: any | any[]) => void) | undefined
  displayDate?: any
  'onUpdate:displayDate': ((value: any) => void) | undefined
  inputMode?: 'calendar' | 'keyboard'
  'onUpdate:inputMode': ((value: 'calendar' | 'keyboard') => void) | undefined
  viewMode?: 'month' | 'year'
  'onUpdate:viewMode': ((value: 'month' | 'year') => void) | undefined
  format?: string
}

export function createDateInput (props: DateInputProps, isRange: boolean) {
  const adapter = useDate()
  const model = useProxiedModel(
    props,
    'modelValue',
    [],
    v => {
      if (v == null) return []
      const arr = wrapInArray(v).filter(v => !!v)
      return arr.map(adapter.date) as Date[]
    },
    v => {
      const arr = wrapInArray(v)
      const formatted = props.format ? arr.map(d => adapter.format(d, props.format as any)) : arr
      if (isRange) return formatted
      return formatted[0]
    })

  const inputMode = useProxiedModel(props, 'inputMode')
  const viewMode = useProxiedModel(props, 'viewMode')
  const displayDate = useProxiedModel(props, 'displayDate', model.value.length ? model.value[0] : adapter.date())

  function parseKeyboardDate (input: string, fallback?: any) {
    const date = adapter.date(input)

    return adapter.isValid(date) ? date : fallback
  }

  function isEqual (model: readonly any[], comparing: readonly any[]) {
    if (model.length !== comparing.length) return false

    for (let i = 0; i < model.length; i++) {
      if (comparing[i] && !adapter.isEqual(model[i], comparing[i])) {
        return false
      }
    }

    return true
  }

  return {
    model,
    adapter,
    inputMode,
    viewMode,
    displayDate,
    parseKeyboardDate,
    isEqual,
  }
}
