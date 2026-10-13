// Types
import type { StyleValue } from 'vue'
import type { VTextField, VTextFieldSlots } from '@/components/VTextField/VTextField.types'
import type { Density } from '@/composables/density.types'
import type { ForwardRefs } from '@/composables/forwardRefs.types'
import type { IconValue } from '@/composables/icons.types'
import type { MaskOptions } from '@/composables/mask/mask.types'
import type { ValidateOn, ValidationResult } from '@/composables/validation.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VMaskInputSlots = VTextFieldSlots

export interface VMaskInputProps {
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
  counter?: string | number | boolean | null
  counterValue?: number | ((value: any) => number)
  density?: Density
  detailsActive?: boolean
  dirty?: boolean
  disabled?: boolean
  error?: boolean
  errorMessages?: string | readonly string[] | null
  flat?: boolean
  focused?: boolean
  glow?: boolean
  hideDetails?: boolean | 'auto'
  hideSpinButtons?: boolean
  hint?: string
  iconColor?: string | boolean
  id?: string
  indentDetails?: boolean
  label?: string
  loading?: string | boolean
  mask?: string | MaskOptions
  maxErrors?: string | number
  maxWidth?: string | number
  messages?: string | readonly string[]
  minWidth?: string | number
  modelModifiers?: Record<string, boolean>
  modelValue?: any
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
  prefix?: string
  prependIcon?: IconValue
  prependInnerIcon?: IconValue
  readonly?: boolean | null
  returnMaskedValue?: boolean
  reverse?: boolean
  role?: string
  rounded?: string | number | boolean
  rules?: readonly (string | boolean | PromiseLike<ValidationResult> | ((value: any) => ValidationResult) | ((value: any) => PromiseLike<ValidationResult>) | [string, any, (string | undefined)?])[]
  singleLine?: boolean
  style?: StyleValue
  suffix?: string
  theme?: string
  tile?: boolean
  type?: string
  validateOn?: ValidateOn
  validationValue?: any
  variant?: 'outlined' | 'plain' | 'underlined' | 'filled' | 'solo' | 'solo-inverted' | 'solo-filled'
  width?: string | number
}

export type VMaskInputDefaultKeys =
  | 'active'
  | 'autofocus'
  | 'centerAffix'
  | 'clearable'
  | 'clearIcon'
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
  | 'hideSpinButtons'
  | 'indentDetails'
  | 'maxErrors'
  | 'messages'
  | 'persistentClear'
  | 'persistentCounter'
  | 'persistentHint'
  | 'persistentPlaceholder'
  | 'readonly'
  | 'returnMaskedValue'
  | 'reverse'
  | 'rounded'
  | 'rules'
  | 'singleLine'
  | 'style'
  | 'tile'
  | 'type'
  | 'variant'

export declare const VMaskInput: VuetifyComponent<
  VMaskInputProps,
  VMaskInputDefaultKeys,
  {
    'update:modelValue': (val: string) => true
  },
  VMaskInputSlots,
  ForwardRefs<{}, [VTextField]>
>
export type VMaskInput = InstanceType<typeof VMaskInput>
