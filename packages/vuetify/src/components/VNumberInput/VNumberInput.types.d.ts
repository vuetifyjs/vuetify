// Types
import type { StyleValue } from 'vue'
import type { VTextField, VTextFieldSlots } from '@/components/VTextField/VTextField.types'
import type { Density } from '@/composables/density.types'
import type { ForwardRefs } from '@/composables/forwardRefs.types'
import type { IconValue } from '@/composables/icons.types'
import type { ValidateOn, ValidationResult } from '@/composables/validation.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type ControlVariant = 'default' | 'stacked' | 'split' | 'hidden'

export type VNumberInputSlots = Omit<VTextFieldSlots, 'default'> & {
  increment: ControlSlot
  decrement: ControlSlot
}

export type ControlSlot = {
  props: Record<string, unknown>
}

export interface VNumberInputProps {
  active?: boolean
  appendIcon?: IconValue
  appendInnerIcon?: IconValue
  autocomplete?: string
  autofocus?: boolean
  baseColor?: string
  bgColor?: string
  centerAffix?: boolean
  class?: any
  clearable?: boolean
  clearIcon?: IconValue
  color?: string
  controlVariant?: ControlVariant
  counter?: string | number | boolean | null
  counterValue?: number | ((value: any) => number)
  decimalSeparator?: string
  density?: Density
  detailsActive?: boolean
  dirty?: boolean
  disabled?: boolean
  error?: boolean
  errorMessages?: string | readonly string[] | null
  flat?: boolean
  focused?: boolean
  glow?: boolean
  grouping?: boolean | 'auto' | 'always' | 'min2'
  groupSeparator?: string
  hideDetails?: boolean | 'auto'
  hideInput?: boolean
  hideSpinButtons?: boolean
  hint?: string
  iconColor?: string | boolean
  id?: string
  indentDetails?: boolean
  inset?: boolean
  label?: string
  loading?: string | boolean
  max?: number
  maxErrors?: string | number
  maxWidth?: string | number
  messages?: string | readonly string[]
  min?: number
  minFractionDigits?: number | null
  minWidth?: string | number
  modelModifiers?: Record<string, boolean>
  modelValue?: number | null
  name?: string
  'onClick:append'?: ((args_0: MouseEvent) => void)
  'onClick:appendInner'?: ((args_0: MouseEvent) => void)
  'onClick:clear'?: ((args_0: MouseEvent) => void)
  'onClick:prepend'?: ((args_0: MouseEvent) => void)
  'onClick:prependInner'?: ((args_0: MouseEvent) => void)
  'onUpdate:focused'?: ((args_0: boolean) => void)
  persistentClear?: boolean
  persistentCounter?: boolean
  persistentHint?: boolean
  persistentPlaceholder?: boolean
  placeholder?: string
  precision?: number | null
  prefix?: string
  prependIcon?: IconValue
  prependInnerIcon?: IconValue
  readonly?: boolean | null
  reverse?: boolean
  role?: string
  rounded?: string | number | boolean
  rules?: readonly (string | boolean | PromiseLike<ValidationResult> | ((value: any) => ValidationResult) | ((value: any) => PromiseLike<ValidationResult>) | [string, any, (string | undefined)?])[]
  singleLine?: boolean
  step?: number
  style?: StyleValue
  suffix?: string
  theme?: string
  tile?: boolean
  type?: string
  validateOn?: ValidateOn
  variant?: 'outlined' | 'plain' | 'underlined' | 'filled' | 'solo' | 'solo-inverted' | 'solo-filled'
  width?: string | number
}

export type VNumberInputDefaultKeys =
  | 'active'
  | 'autofocus'
  | 'centerAffix'
  | 'clearable'
  | 'clearIcon'
  | 'controlVariant'
  | 'counter'
  | 'density'
  | 'detailsActive'
  | 'dirty'
  | 'disabled'
  | 'error'
  | 'errorMessages'
  | 'flat'
  | 'focused'
  | 'glow'
  | 'grouping'
  | 'hideInput'
  | 'hideSpinButtons'
  | 'indentDetails'
  | 'inset'
  | 'max'
  | 'maxErrors'
  | 'messages'
  | 'min'
  | 'minFractionDigits'
  | 'modelValue'
  | 'persistentClear'
  | 'persistentCounter'
  | 'persistentHint'
  | 'persistentPlaceholder'
  | 'precision'
  | 'readonly'
  | 'reverse'
  | 'rounded'
  | 'rules'
  | 'singleLine'
  | 'step'
  | 'style'
  | 'tile'
  | 'type'
  | 'variant'

export declare const VNumberInput: VuetifyComponent<
  VNumberInputProps,
  VNumberInputDefaultKeys,
  {
    'update:focused': (val: boolean) => true
    'update:modelValue': (val: number) => true
  },
  VNumberInputSlots,
  ForwardRefs<{}, [VTextField]>
>
export type VNumberInput = InstanceType<typeof VNumberInput>
