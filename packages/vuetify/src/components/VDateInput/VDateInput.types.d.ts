// Types
import type { StyleValue } from 'vue'
import type { VDatePicker, VDatePickerSlots } from '@/components/VDatePicker/VDatePicker.types'
import type { ControlVariant } from '@/components/VDatePicker/VDatePickerControls.types'
import type { DatePickerEventColors, DatePickerEvents } from '@/components/VDatePicker/VDatePickerMonth.types'
import type { VMenu } from '@/components/VMenu/VMenu.types'
import type { VTextField, VTextFieldSlots } from '@/components/VTextField/VTextField.types'
import type { CalendarWeekdays } from '@/composables/calendar.types'
import type { Density } from '@/composables/density.types'
import type { DisplayBreakpoint } from '@/composables/display.types'
import type { ForwardRefs } from '@/composables/forwardRefs.types'
import type { IconValue } from '@/composables/icons.types'
import type { ValidateOn, ValidationResult } from '@/composables/validation.types'
import type { Anchor } from '@/util/anchor.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VDateInputSlots = Omit<VTextFieldSlots, 'default'> &
  Pick<VDatePickerSlots, 'title' | 'header' | 'day' | 'month' | 'year'> & {
    actions: VDateInputActionsSlot
    default: never
  }

export type VDateInputActionsSlot = {
  save: () => void
  cancel: () => void
  isPristine: boolean
}

export interface VDateInputProps {
  active?: boolean
  allowedDates?: unknown[] | ((date: unknown) => boolean)
  allowedMonths?: number[] | ((date: number) => boolean)
  allowedYears?: number[] | ((date: number) => boolean)
  appendIcon?: IconValue
  appendInnerIcon?: IconValue
  autocomplete?: string
  autofocus?: boolean
  baseColor?: string
  bgColor?: string
  border?: string | number | boolean
  cancelText?: string
  centerAffix?: boolean
  class?: any
  clearable?: boolean
  clearIcon?: IconValue
  color?: string
  controlHeight?: string | number
  controlVariant?: ControlVariant
  counter?: string | number | boolean | null
  counterValue?: number | ((value: any) => number)
  density?: Density
  detailsActive?: boolean
  dirty?: boolean
  disabled?: boolean
  displayFormat?: string | ((date: unknown) => any)
  divided?: boolean
  elevation?: string | number
  error?: boolean
  errorMessages?: string | readonly string[] | null
  eventColor?: DatePickerEventColors
  events?: DatePickerEvents | null
  firstDayOfWeek?: string | number
  firstDayOfYear?: string | number
  flat?: boolean
  focused?: boolean
  glow?: boolean
  header?: string
  headerColor?: string
  headerDateFormat?: string
  hideActions?: boolean
  hideDetails?: boolean | 'auto'
  hideHeader?: boolean
  hideSpinButtons?: boolean
  hideTitle?: boolean
  hideWeekdays?: boolean
  hint?: string
  hoverElevation?: string | number
  iconColor?: string | boolean
  id?: string
  indentDetails?: boolean
  inputFormat?: string
  label?: string
  landscape?: boolean
  landscapeHeaderWidth?: string | number
  loading?: string | boolean
  location?: Anchor
  max?: unknown
  maxErrors?: string | number
  maxWidth?: string | number
  menu?: boolean
  menuProps?: VMenu['$props']
  messages?: string | readonly string[]
  min?: unknown
  minWidth?: string | number
  mobile?: boolean | null
  mobileBreakpoint?: number | DisplayBreakpoint
  modeIcon?: IconValue
  modelModifiers?: Record<string, boolean>
  modelValue?: any
  month?: string | number
  multiple?: number | boolean | (string & {}) | 'range'
  name?: string
  nextIcon?: IconValue
  noAutoNavigation?: boolean
  noMonthPicker?: boolean
  okText?: string
  'onClick:append'?: ((args_0: MouseEvent) => void)
  'onClick:appendInner'?: ((args_0: MouseEvent) => void)
  'onClick:clear'?: ((args_0: MouseEvent) => void)
  'onClick:prepend'?: ((args_0: MouseEvent) => void)
  'onClick:prependInner'?: ((args_0: MouseEvent) => void)
  'onUpdate:focused'?: ((args_0: boolean) => void)
  openOnFocus?: boolean
  persistentClear?: boolean
  persistentCounter?: boolean
  persistentHint?: boolean
  persistentPlaceholder?: boolean
  pickerProps?: VDatePicker['$props']
  placeholder?: string
  position?: 'fixed' | 'relative' | 'absolute' | 'static' | 'sticky'
  prefix?: string
  prependIcon?: IconValue
  prependInnerIcon?: IconValue
  prevIcon?: IconValue
  previewValue?: unknown
  readonly?: boolean
  reverse?: boolean
  reverseTransition?: string
  role?: string
  rounded?: string | number | boolean
  rules?: readonly (string | boolean | PromiseLike<ValidationResult> | ((value: any) => ValidationResult) | ((value: any) => PromiseLike<ValidationResult>) | [string, any, (string | undefined)?])[]
  showAdjacentMonths?: boolean
  showWeek?: boolean
  singleLine?: boolean
  style?: StyleValue
  suffix?: string
  tag?: string | JSXComponent
  text?: string
  theme?: string
  tile?: boolean
  title?: string
  transition?: string
  type?: string
  updateOn?: ('blur' | 'enter')[]
  validateOn?: ValidateOn
  validationValue?: any
  variant?: 'outlined' | 'plain' | 'underlined' | 'filled' | 'solo' | 'solo-inverted' | 'solo-filled'
  viewMode?: 'month' | 'year' | 'months'
  weekdayFormat?: 'long' | 'short' | 'narrow'
  weekdays?: CalendarWeekdays[]
  weeksInMonth?: 'static' | 'dynamic'
  wheel?: boolean
  width?: string | number
  year?: number
}

export type VDateInputDefaultKeys =
  | 'active'
  | 'autofocus'
  | 'cancelText'
  | 'centerAffix'
  | 'clearable'
  | 'clearIcon'
  | 'controlVariant'
  | 'counter'
  | 'density'
  | 'detailsActive'
  | 'dirty'
  | 'disabled'
  | 'displayFormat'
  | 'divided'
  | 'error'
  | 'errorMessages'
  | 'eventColor'
  | 'events'
  | 'firstDayOfWeek'
  | 'firstDayOfYear'
  | 'flat'
  | 'focused'
  | 'glow'
  | 'header'
  | 'headerDateFormat'
  | 'hideActions'
  | 'hideHeader'
  | 'hideSpinButtons'
  | 'hideTitle'
  | 'hideWeekdays'
  | 'indentDetails'
  | 'landscape'
  | 'location'
  | 'maxErrors'
  | 'menu'
  | 'messages'
  | 'mobile'
  | 'modeIcon'
  | 'nextIcon'
  | 'noAutoNavigation'
  | 'noMonthPicker'
  | 'okText'
  | 'openOnFocus'
  | 'persistentClear'
  | 'persistentCounter'
  | 'persistentHint'
  | 'persistentPlaceholder'
  | 'prependIcon'
  | 'prevIcon'
  | 'readonly'
  | 'reverse'
  | 'reverseTransition'
  | 'rounded'
  | 'rules'
  | 'showAdjacentMonths'
  | 'showWeek'
  | 'singleLine'
  | 'style'
  | 'tag'
  | 'tile'
  | 'title'
  | 'transition'
  | 'type'
  | 'updateOn'
  | 'variant'
  | 'viewMode'
  | 'weekdays'
  | 'weeksInMonth'
  | 'wheel'

export declare const VDateInput: VuetifyComponent<
  VDateInputProps,
  VDateInputDefaultKeys,
  {
    save: (value: unknown) => true
    cancel: () => true
    'update:focused': (val: boolean) => true
    'update:modelValue': (val: unknown) => true
    'update:menu': (val: boolean) => true
  },
  new <
    T,
    Multiple extends boolean | 'range' | number | (string & {}) = false,
    TModel = Multiple extends true | number | string
      ? T[]
      : T,
  > (
    props: {
      modelValue?: TModel
      onSave?: (value: TModel) => void
      'onUpdate:modelValue'?: (value: TModel) => void
      multiple?: Multiple
    },
    slots: VDateInputSlots
  ) => GenericProps<typeof props, typeof slots>,
  ForwardRefs<{}, [VTextField]>
>
export type VDateInput = InstanceType<typeof VDateInput>
