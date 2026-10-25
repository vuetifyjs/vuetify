// Types
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VDatePickerYearsSlots = {
  year: {
    year: {
      text: string
      value: number
    }
    i: number
    props: {
      active: boolean
      color?: string
      rounded: boolean
      text: string
      variant: 'flat' | 'text'
      onClick: () => void
    }
  }
}

export interface VDatePickerYearsProps {
  allowedYears?: number[] | ((date: number) => boolean)
  color?: string
  columns?: number
  height?: string | number
  max?: unknown
  min?: unknown
  modelValue?: number
}

type VDatePickerYearsDefaultKeys =
  | 'columns'

export declare const VDatePickerYears: VuetifyComponent<
  VDatePickerYearsProps,
  VDatePickerYearsDefaultKeys,
  {
    'update:modelValue': (year: number) => true
    escape: () => true
  },
  VDatePickerYearsSlots
>
export type VDatePickerYears = InstanceType<typeof VDatePickerYears>

export {}
