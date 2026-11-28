// Types
import type { VTimePickerViewMode } from '@/components/VTimePicker/shared.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VTimePickerClockProps {
  allowedValues?: ((value: number) => boolean)
  ampm?: boolean
  color?: string
  disabled?: boolean
  displayedValue?: any
  double?: boolean
  format?: Function
  max: number
  min: number
  modelValue?: number
  readonly?: boolean
  rotate?: number
  scrollable?: boolean
  step?: number
  viewMode?: VTimePickerViewMode
}

type VTimePickerClockDefaultKeys =
  | 'ampm'
  | 'disabled'
  | 'double'
  | 'format'
  | 'readonly'
  | 'rotate'
  | 'scrollable'
  | 'step'
  | 'viewMode'

export declare const VTimePickerClock: VuetifyComponent<
  VTimePickerClockProps,
  VTimePickerClockDefaultKeys,
  {
    change: (val: number) => true
    input: (val: number) => true
  }
>
export type VTimePickerClock = InstanceType<typeof VTimePickerClock>

export {}
