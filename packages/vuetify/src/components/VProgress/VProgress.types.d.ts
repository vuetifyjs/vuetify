// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { ValueFormat } from '@/util/shared.types'

export type VProgressSlots = {
  default: VProgressSlotsProps
  label: VProgressSlotsProps
  value: VProgressSlotsProps
}

export type VProgressSlotsProps = {
  max: number
  percent: number
  value: number
  formattedValue: string
}

export interface VProgressProps {
  absolute?: boolean
  bgColor?: string
  class?: any
  color?: string
  detailsPosition?: 'top' | 'bottom'
  hideLabel?: boolean
  hideValue?: boolean
  indeterminate?: boolean
  label?: string
  max?: string | number
  modelValue?: string | number
  reveal?: boolean | { duration?: number | undefined }
  rounded?: boolean
  style?: StyleValue
  theme?: string
  transition?: boolean | { duration?: string | number | undefined }
  type?: 'linear' | 'circular'
  valueFormat?: ValueFormat
}

type VProgressDefaultKeys =
  | 'absolute'
  | 'detailsPosition'
  | 'hideLabel'
  | 'hideValue'
  | 'indeterminate'
  | 'max'
  | 'modelValue'
  | 'reveal'
  | 'rounded'
  | 'style'
  | 'transition'
  | 'type'
  | 'valueFormat'

export declare const VProgress: VuetifyComponent<
  VProgressProps,
  VProgressDefaultKeys,
  Record<string, any>,
  VProgressSlots
>
export type VProgress = InstanceType<typeof VProgress>

export {}
