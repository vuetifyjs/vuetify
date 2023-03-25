// Composables
import { useDate } from '@/composables/date'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed } from 'vue'
import { propsFactory, wrapInArray } from '@/util'

// Types
import type { PropType } from 'vue'

export const makeDateProps = propsFactory({
  modelValue: {
    type: null as unknown as PropType<any[]>,
    required: true,
  },
  displayDate: {
    type: null as unknown as PropType<any>,
    required: true,
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
  'update:modelValue': (date: any[]) => true,
  'update:displayDate': (date: any) => true,
  'update:inputMode': (inputMode: 'calendar' | 'keyboard') => true,
  'update:viewMode': (viewMode: 'month' | 'year') => true,
}

type DateFieldProps = {
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

export function createDateField (props: DateFieldProps, isRange: boolean) {
  const adapter = useDate()
  const pub = useProxiedModel(
    props,
    'modelValue',
    [],
    v => {
      if (v == null) return []
      const arr = wrapInArray(v).filter(v => !!v)
      return arr.map(adapter.value.date)
    },
    v => {
      const arr = wrapInArray(v)
      const formatted = props.format ? arr.map(d => adapter.value.format(d, props.format as any)) : arr
      if (isRange) return formatted
      return formatted[0]
    })

  const model = computed({
    get () {
      return wrapInArray(pub.value)
    },
    set (value) {
      pub.value = value
    },
  })

  const inputMode = useProxiedModel(props, 'inputMode')
  const viewMode = useProxiedModel(props, 'viewMode')
  const displayDate = useProxiedModel(props, 'displayDate', model.value.length ? model.value[0] : adapter.value.date())

  function parseKeyboardDate (input: string, fallback?: any) {
    const date = adapter.value.date(input)

    return adapter.value.isValid(date) ? date : fallback
  }

  return {
    model,
    adapter,
    inputMode,
    viewMode,
    displayDate,
    parseKeyboardDate,
  }
}
