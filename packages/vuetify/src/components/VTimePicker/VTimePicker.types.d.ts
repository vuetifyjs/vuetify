// Types
import type { StyleValue } from 'vue'
import type { VPickerSlots } from '@/components/VPicker/VPicker.types'
import type { Period, VTimePickerViewMode } from '@/components/VTimePicker/shared.types'
import type { AllowFunction } from '@/components/VTimePicker/useTimeValidation.types'
import type { Density } from '@/composables/density.types'
import type { Anchor } from '@/util/anchor.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type Variant = 'dial' | 'input'

export type VTimePickerSlots = Omit<VPickerSlots, 'header'>

export interface VTimePickerProps {
  allowedHours?: number[] | AllowFunction
  allowedMinutes?: number[] | AllowFunction
  allowedSeconds?: number[] | AllowFunction
  bgColor?: string
  border?: string | number | boolean
  class?: any
  color?: string
  density?: Density
  disabled?: boolean
  divided?: boolean
  elevation?: string | number
  format?: 'ampm' | '24hr'
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
  modelValue?: any
  period?: Period
  position?: 'fixed' | 'relative' | 'absolute' | 'static' | 'sticky'
  readonly?: boolean
  rounded?: string | number | boolean
  scrollable?: boolean
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
  tile?: boolean
  title?: string
  useSeconds?: boolean
  variant?: Variant
  viewMode?: VTimePickerViewMode
  width?: string | number
}

export type VTimePickerDefaultKeys =
  | 'density'
  | 'disabled'
  | 'divided'
  | 'format'
  | 'hideHeader'
  | 'hideTitle'
  | 'period'
  | 'readonly'
  | 'rounded'
  | 'scrollable'
  | 'style'
  | 'tag'
  | 'tile'
  | 'title'
  | 'useSeconds'
  | 'variant'
  | 'viewMode'

export declare const VTimePicker: VuetifyComponent<
  VTimePickerProps,
  VTimePickerDefaultKeys,
  {
    'update:hour': (val: number) => true
    'update:minute': (val: number) => true
    'update:period': (val: Period) => true
    'update:second': (val: number) => true
    'update:modelValue': (val: string | null) => true
    'update:viewMode': (val: VTimePickerViewMode) => true
  },
  VTimePickerSlots
>
export type VTimePicker = InstanceType<typeof VTimePicker>
