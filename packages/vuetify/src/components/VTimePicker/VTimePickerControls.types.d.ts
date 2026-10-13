// Types
import type { Period, VTimePickerViewMode } from '@/components/VTimePicker/shared.types'
import type { AllowFunction } from '@/components/VTimePicker/useTimeValidation.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VTimePickerControlsProps {
  allowedHours?: number[] | AllowFunction
  allowedMinutes?: number[] | AllowFunction
  allowedSeconds?: number[] | AllowFunction
  ampm?: boolean
  color?: string
  disabled?: boolean
  hour?: string | number | null
  inputHints?: boolean
  max?: string
  min?: string
  minute?: string | number | null
  period?: Period
  readonly?: boolean
  second?: string | number | null
  useSeconds?: boolean
  value?: number
  viewMode?: VTimePickerViewMode
}

export type VTimePickerControlsDefaultKeys =
  | 'ampm'
  | 'disabled'
  | 'inputHints'
  | 'readonly'
  | 'useSeconds'

export declare const VTimePickerControls: VuetifyComponent<
  VTimePickerControlsProps,
  VTimePickerControlsDefaultKeys,
  {
    'update:period': (data: Period) => true
    'update:viewMode': (data: VTimePickerViewMode) => true
    'update:hour': (v: number) => true
    'update:minute': (v: number) => true
    'update:second': (v: number) => true
  }
>
export type VTimePickerControls = InstanceType<typeof VTimePickerControls>
