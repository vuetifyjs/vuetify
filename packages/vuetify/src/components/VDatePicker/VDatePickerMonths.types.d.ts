// Types
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VDatePickerMonthsSlots = {
  month: {
    month: {
      text: string
      value: number
    }
    i: number
    props: {
      onClick: () => void
    }
  }
}

export interface VDatePickerMonthsProps {
  allowedMonths?: number[] | ((date: number) => boolean)
  color?: string
  columns?: number
  height?: string | number
  max?: unknown
  min?: unknown
  modelValue?: number
  year?: number
}

type VDatePickerMonthsDefaultKeys =
  | 'columns'

export declare const VDatePickerMonths: VuetifyComponent<
  VDatePickerMonthsProps,
  VDatePickerMonthsDefaultKeys,
  {
    'update:modelValue': (date: any) => true
    escape: () => true
  },
  VDatePickerMonthsSlots
>
export type VDatePickerMonths = InstanceType<typeof VDatePickerMonths>

export {}
