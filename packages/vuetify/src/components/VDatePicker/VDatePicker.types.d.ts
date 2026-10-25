// Types
import type { StyleValue } from 'vue'
import type { ControlVariant, VDatePickerControlsDefaultSlotProps } from '@/components/VDatePicker/VDatePickerControls.types'
import type { VDatePickerHeaderSlots } from '@/components/VDatePicker/VDatePickerHeader.types'
import type { DatePickerDay, DatePickerEventColors, DatePickerEvents, VDatePickerMonthSlots } from '@/components/VDatePicker/VDatePickerMonth.types'
import type { VDatePickerMonthsSlots } from '@/components/VDatePicker/VDatePickerMonths.types'
import type { VDatePickerYearsSlots } from '@/components/VDatePicker/VDatePickerYears.types'
import type { VPickerSlots } from '@/components/VPicker/VPicker.types'
import type { CalendarWeekdays } from '@/composables/calendar.types'
import type { IconValue } from '@/composables/icons.types'
import type { Anchor } from '@/util/anchor.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VDatePickerSlots =
  & Omit<VPickerSlots, 'header' | 'default'>
  & Omit<VDatePickerHeaderSlots, 'default'>
  & VDatePickerYearsSlots
  & VDatePickerMonthsSlots
  & VDatePickerMonthSlots
  & {
    header: {
      header: string
      transition: string
    }
    controls: VDatePickerControlsDefaultSlotProps
  }

export interface VDatePickerProps {
  allowedDates?: unknown[] | ((date: unknown) => boolean)
  allowedMonths?: number[] | ((date: number) => boolean)
  allowedYears?: number[] | ((date: number) => boolean)
  bgColor?: string
  border?: string | number | boolean
  class?: any
  color?: string
  controlHeight?: string | number
  controlVariant?: ControlVariant
  disabled?: boolean
  divided?: boolean
  elevation?: string | number
  eventColor?: DatePickerEventColors
  events?: DatePickerEvents | null
  firstDayOfWeek?: string | number
  firstDayOfYear?: string | number
  header?: string
  headerColor?: string
  headerDateFormat?: string
  height?: string | number
  hideHeader?: boolean
  hideTitle?: boolean
  hideWeekdays?: boolean
  hoverElevation?: string | number
  landscape?: boolean
  landscapeHeaderWidth?: string | number
  location?: Anchor | null
  max?: unknown
  maxHeight?: string | number
  maxWidth?: string | number
  min?: unknown
  minHeight?: string | number
  minWidth?: string | number
  modeIcon?: IconValue
  modelValue?: any
  month?: string | number
  multiple?: number | boolean | (string & {}) | 'range'
  nextIcon?: IconValue
  noAutoNavigation?: boolean
  noMonthPicker?: boolean
  position?: 'fixed' | 'relative' | 'absolute' | 'static' | 'sticky'
  prevIcon?: IconValue
  previewValue?: unknown
  readonly?: boolean
  reverseTransition?: string
  rounded?: string | number | boolean
  showAdjacentMonths?: boolean
  showWeek?: boolean
  style?: StyleValue
  tag?: string | JSXComponent
  text?: string
  theme?: string
  tile?: boolean
  title?: string
  transition?: string
  viewMode?: 'month' | 'year' | 'months'
  weekdayFormat?: 'long' | 'short' | 'narrow'
  weekdays?: CalendarWeekdays[]
  weeksInMonth?: 'static' | 'dynamic'
  wheel?: boolean
  width?: string | number
  year?: number
}

type VDatePickerDefaultKeys =
  | 'controlVariant'
  | 'disabled'
  | 'divided'
  | 'eventColor'
  | 'events'
  | 'firstDayOfWeek'
  | 'firstDayOfYear'
  | 'header'
  | 'headerDateFormat'
  | 'hideHeader'
  | 'hideTitle'
  | 'hideWeekdays'
  | 'landscape'
  | 'modeIcon'
  | 'nextIcon'
  | 'noAutoNavigation'
  | 'noMonthPicker'
  | 'prevIcon'
  | 'readonly'
  | 'reverseTransition'
  | 'rounded'
  | 'showAdjacentMonths'
  | 'showWeek'
  | 'style'
  | 'tag'
  | 'tile'
  | 'title'
  | 'transition'
  | 'viewMode'
  | 'weekdays'
  | 'weeksInMonth'
  | 'wheel'

export declare const VDatePicker: VuetifyComponent<
  VDatePickerProps,
  VDatePickerDefaultKeys,
  {
    'update:modelValue': (date: any) => true
    'update:month': (date: any) => true
    'update:year': (date: any) => true
    'update:previewValue': (_value: any) => true
    'update:viewMode': (date: any) => true
    'boundary-navigate': (_payload: { direction: 'left' | 'right' | 'up' | 'down', targetIsoDate: string }) => true
  },
  new <
    T,
    Multiple extends boolean | 'range' | number | (string & {}) = false,
    TModel = Multiple extends true | number | string
      ? T[]
      : T,
  > (
    props: {
      [key: `on${Capitalize<string>}:day`]: (...args: [Event, DatePickerDay]) => void
      modelValue?: TModel
      'onUpdate:modelValue'?: (value: TModel) => void
      multiple?: Multiple
    },
    slots: VDatePickerSlots
  ) => GenericProps<typeof props, typeof slots>,
  { focusDate: (isoDate: string) => void }
>
export type VDatePicker = InstanceType<typeof VDatePicker>

export {}
