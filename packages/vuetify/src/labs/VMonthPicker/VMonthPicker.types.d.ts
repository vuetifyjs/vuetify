// Types
import type { StyleValue } from 'vue'
import type { IconValue } from '@/composables/icons.types'
import type { Anchor } from '@/util/anchor.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VMonthPickerSlots = {
  header: never
  title: never
  actions: never
  month: {
    month: {
      text: string
      label: string
      value: number
    }
    i: number
    props: Record<string, unknown>
  }
}

export interface VMonthPickerProps {
  allowedMonths?: number[] | ((date: number) => boolean)
  allowedYears?: number[] | ((date: number) => boolean)
  bgColor?: string
  border?: string | number | boolean
  class?: any
  color?: string
  disabled?: boolean
  divided?: boolean
  elevation?: string | number
  headerColor?: string
  height?: string | number
  hideHeader?: boolean
  hideTitle?: boolean
  hoverElevation?: string | number
  location?: Anchor | null
  max?: string
  maxHeight?: string | number
  maxWidth?: string | number
  min?: string
  minHeight?: string | number
  minWidth?: string | number
  modeIcon?: IconValue
  modelValue?: any
  monthsColumns?: string | number
  multiple?: boolean | 'range'
  nextIcon?: IconValue
  position?: 'fixed' | 'relative' | 'absolute' | 'static' | 'sticky'
  prevIcon?: IconValue
  readonly?: boolean
  reverseTransition?: string
  rounded?: string | number | boolean
  selectedIcon?: IconValue
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
  tile?: boolean
  title?: string
  transition?: string
  width?: string | number
  yearsColumns?: string | number
}

type VMonthPickerDefaultKeys =
  | 'disabled'
  | 'divided'
  | 'hideHeader'
  | 'hideTitle'
  | 'modeIcon'
  | 'monthsColumns'
  | 'nextIcon'
  | 'prevIcon'
  | 'readonly'
  | 'reverseTransition'
  | 'rounded'
  | 'selectedIcon'
  | 'style'
  | 'tag'
  | 'tile'
  | 'title'
  | 'transition'
  | 'yearsColumns'

export declare const VMonthPicker: VuetifyComponent<
  VMonthPickerProps,
  VMonthPickerDefaultKeys,
  {
    'update:modelValue': (value: any) => true
  },
  new <
    Multiple extends boolean | 'range' = false,
    TModel = Multiple extends true | 'range' ? string[] : string | null,
  > (
    props: {
      modelValue?: TModel
      'onUpdate:modelValue'?: (value: TModel) => void
      multiple?: Multiple
    },
    slots: VMonthPickerSlots
  ) => GenericProps<typeof props, typeof slots>
>
export type VMonthPicker = InstanceType<typeof VMonthPicker>

export {}
