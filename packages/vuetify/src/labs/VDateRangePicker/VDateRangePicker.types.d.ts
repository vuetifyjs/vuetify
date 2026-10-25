// Types
import type { StyleValue } from 'vue'
import type { CalendarWeekdays } from '@/composables/calendar.types'
import type { IconValue } from '@/composables/icons.types'
import type { Anchor } from '@/util/anchor.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VDateRangePickerSlots = {
  default: never
  footer: never
}

export interface VDateRangePickerProps {
  allowedDates?: unknown[] | ((date: unknown) => boolean)
  allowedMonths?: number[] | ((date: number) => boolean)
  allowedYears?: number[] | ((date: number) => boolean)
  bgColor?: string
  border?: string | number | boolean
  class?: any
  color?: string
  controlHeight?: string | number
  disabled?: boolean
  divided?: boolean
  elevation?: string | number
  firstDayOfWeek?: string | number
  firstDayOfYear?: string | number
  height?: string | number
  hideHeader?: boolean
  hideTitle?: boolean
  hideWeekdays?: boolean
  hoverElevation?: string | number
  independentMonths?: boolean
  landscape?: boolean
  location?: Anchor | null
  max?: unknown
  maxHeight?: string | number
  maxWidth?: string | number
  min?: unknown
  minHeight?: string | number
  minWidth?: string | number
  modelValue?: any
  nextIcon?: IconValue
  position?: 'fixed' | 'relative' | 'absolute' | 'static' | 'sticky'
  prevIcon?: IconValue
  readonly?: boolean
  reverseTransition?: string
  rounded?: string | number | boolean
  showWeek?: boolean
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
  tile?: boolean
  title?: string
  transition?: string
  weekdayFormat?: 'long' | 'short' | 'narrow'
  weekdays?: CalendarWeekdays[]
  weeksInMonth?: 'static' | 'dynamic'
  width?: string | number
}

type VDateRangePickerDefaultKeys =
  | 'disabled'
  | 'divided'
  | 'firstDayOfWeek'
  | 'firstDayOfYear'
  | 'hideHeader'
  | 'hideTitle'
  | 'hideWeekdays'
  | 'independentMonths'
  | 'landscape'
  | 'nextIcon'
  | 'prevIcon'
  | 'readonly'
  | 'reverseTransition'
  | 'rounded'
  | 'showWeek'
  | 'style'
  | 'tag'
  | 'tile'
  | 'title'
  | 'transition'
  | 'weekdays'
  | 'weeksInMonth'

export declare const VDateRangePicker: VuetifyComponent<
  VDateRangePickerProps,
  VDateRangePickerDefaultKeys,
  {
    'update:modelValue': (_value: any) => true
  },
  new <
    T,
    TModel = T[],
  > (
    props: {
      modelValue?: TModel
      'onUpdate:modelValue'?: (value: TModel) => void
    },
    slots: VDateRangePickerSlots
  ) => GenericProps<typeof props, typeof slots>
>
export type VDateRangePicker = InstanceType<typeof VDateRangePicker>

export {}
