// Types
import type { CalendarWeekdays } from '@/composables/calendar.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'

export type DatePickerEvents = string[] |
((date: string) => DatePickerEventColorValue) | Record<string, DatePickerEventColorValue>

export type DatePickerEventColorValue = boolean | string | string[]

export type DatePickerEventColors = DatePickerEventColorValue |
Record<string, DatePickerEventColorValue> | ((date: string) => DatePickerEventColorValue)

export type DatePickerDay = {
  date: Date
  isAdjacent: boolean
  isToday: boolean
  isoDate: string
}

export type VDatePickerMonthSlots = {
  day: {
    props: {
      onClick: () => void
    }
    item: any
    i: number
  }
}

export interface VDatePickerMonthProps {
  allowedDates?: unknown[] | ((date: unknown) => boolean)
  color?: string
  disabled?: boolean
  eventColor?: DatePickerEventColors
  events?: DatePickerEvents | null
  firstDayOfWeek?: string | number
  firstDayOfYear?: string | number
  hideWeekdays?: boolean
  max?: unknown
  min?: unknown
  modelValue?: unknown[]
  month?: string | number
  multiple?: number | boolean | (string & {}) | 'range'
  noAutoNavigation?: boolean
  previewValue?: unknown
  readonly?: boolean
  reverseTransition?: string
  showAdjacentMonths?: boolean
  showWeek?: boolean
  transition?: string
  weekdayFormat?: 'long' | 'short' | 'narrow'
  weekdays?: CalendarWeekdays[]
  weeksInMonth?: 'static' | 'dynamic'
  wheel?: boolean
  year?: string | number
}

type VDatePickerMonthDefaultKeys =
  | 'disabled'
  | 'eventColor'
  | 'events'
  | 'firstDayOfWeek'
  | 'firstDayOfYear'
  | 'hideWeekdays'
  | 'noAutoNavigation'
  | 'readonly'
  | 'reverseTransition'
  | 'showAdjacentMonths'
  | 'showWeek'
  | 'transition'
  | 'weekdays'
  | 'weeksInMonth'
  | 'wheel'

export declare const VDatePickerMonth: VuetifyComponent<
  VDatePickerMonthProps,
  VDatePickerMonthDefaultKeys,
  {
    'update:modelValue': (date: unknown) => true
    'update:month': (date: number) => true
    'update:year': (date: number) => true
    'update:previewValue': (_value: unknown) => true
    'boundary-navigate': (_payload: { direction: 'left' | 'right' | 'up' | 'down', targetIsoDate: string }) => true
  },
  new <TModel>(
    props: {
      modelValue?: TModel
      'onUpdate:modelValue'?: (value: TModel) => void
    },
    slots: VDatePickerMonthSlots
  ) => GenericProps<typeof props, typeof slots>,
  { focusGrid: () => void, focusItem: (value: string) => void }
>
export type VDatePickerMonth = InstanceType<typeof VDatePickerMonth>

export {}
