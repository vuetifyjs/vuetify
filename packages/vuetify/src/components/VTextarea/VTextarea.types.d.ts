// Types
import type { StyleValue } from 'vue'
import type { VCounterSlot } from '@/components/VCounter/VCounter.types'
import type { VField, VFieldSlots } from '@/components/VField/VField.types'
import type { VInput, VInputSlots } from '@/components/VInput/VInput.types'
import type { Density } from '@/composables/density.types'
import type { ForwardRefs } from '@/composables/forwardRefs.types'
import type { IconValue } from '@/composables/icons.types'
import type { ValidateOn, ValidationResult } from '@/composables/validation.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VTextareaSlots = Omit<VInputSlots & VFieldSlots, 'default'> & {
  counter: VCounterSlot
}

export interface VTextareaProps {
  active?: boolean
  appendIcon?: IconValue
  appendInnerIcon?: IconValue
  autocomplete?: string
  autofocus?: boolean
  autoGrow?: boolean
  baseColor?: string
  bgColor?: string
  centerAffix?: boolean
  class?: any
  clearable?: boolean
  clearIcon?: IconValue
  color?: string
  counter?: string | number | boolean | null
  counterValue?: ((value: any) => number)
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
  maxErrors?: string | number
  maxHeight?: string | number
  maxRows?: string | number
  maxWidth?: string | number
  messages?: string | readonly string[]
  minWidth?: string | number
  modelModifiers?: Record<string, boolean>
  modelValue?: any
  name?: string
  noResize?: boolean
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
  reverse?: boolean
  rounded?: string | number | boolean
  rows?: string | number
  rules?: readonly (string | boolean | PromiseLike<ValidationResult> | ((value: any) => ValidationResult) | ((value: any) => PromiseLike<ValidationResult>) | [string, any, (string | undefined)?])[]
  singleLine?: boolean
  style?: StyleValue
  suffix?: string
  theme?: string
  tile?: boolean
  validateOn?: ValidateOn
  validationValue?: any
  variant?: 'outlined' | 'plain' | 'underlined' | 'filled' | 'solo' | 'solo-inverted' | 'solo-filled'
  width?: string | number
}

type VTextareaDefaultKeys =
  | 'active'
  | 'autofocus'
  | 'autoGrow'
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
  | 'noResize'
  | 'persistentClear'
  | 'persistentCounter'
  | 'persistentHint'
  | 'persistentPlaceholder'
  | 'readonly'
  | 'reverse'
  | 'rounded'
  | 'rows'
  | 'rules'
  | 'singleLine'
  | 'style'
  | 'tile'
  | 'variant'

export declare const VTextarea: VuetifyComponent<
  VTextareaProps,
  VTextareaDefaultKeys,
  {
    'click:control': (e: MouseEvent) => true
    'mousedown:control': (e: MouseEvent) => true
    'update:focused': (focused: boolean) => true
    'update:modelValue': (val: string) => true
    'update:rows': (rows: number) => true
  },
  VTextareaSlots,
  ForwardRefs<{}, [VInput, VField, HTMLTextAreaElement]>
>
export type VTextarea = InstanceType<typeof VTextarea>

export {}
