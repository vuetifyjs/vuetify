// Types
import type { IconValue } from '@/composables/icons.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type ControlVariant = 'docked' | 'modal'

export type VDatePickerControlsSlots = {
  default: VDatePickerControlsDefaultSlotProps
}

export type VDatePickerControlsDefaultSlotProps = {
  viewMode: 'month' | 'months' | 'year'
  monthYearText: string
  monthText: string
  yearText: string
  disabled: string[]
  openMonths: () => void
  openYears: () => void
  prevMonth: () => void
  nextMonth: () => void
  prevYear: () => void
  nextYear: () => void
}

export interface VDatePickerControlsProps {
  active?: string | string[]
  controlHeight?: string | number
  controlVariant?: ControlVariant
  disabled?: string | boolean | string[] | null
  modeIcon?: IconValue
  monthText?: string
  nextIcon?: IconValue
  noMonthPicker?: boolean
  prevIcon?: IconValue
  text?: string
  viewMode?: 'month' | 'year' | 'months'
  yearText?: string
}

type VDatePickerControlsDefaultKeys =
  | 'active'
  | 'controlVariant'
  | 'disabled'
  | 'modeIcon'
  | 'nextIcon'
  | 'noMonthPicker'
  | 'prevIcon'
  | 'viewMode'

export declare const VDatePickerControls: VuetifyComponent<
  VDatePickerControlsProps,
  VDatePickerControlsDefaultKeys,
  {
    'click:year': () => true
    'click:month': () => true
    'click:prev': () => true
    'click:next': () => true
    'click:prev-year': () => true
    'click:next-year': () => true
  },
  VDatePickerControlsSlots
>
export type VDatePickerControls = InstanceType<typeof VDatePickerControls>

export {}
