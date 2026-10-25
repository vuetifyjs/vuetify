// Types
import type { StyleValue } from 'vue'
import type { VColorPicker } from '@/components/VColorPicker/VColorPicker.types'
import type { VMenu } from '@/components/VMenu/VMenu.types'
import type { VTextField, VTextFieldSlots } from '@/components/VTextField/VTextField.types'
import type { Density } from '@/composables/density.types'
import type { ForwardRefs } from '@/composables/forwardRefs.types'
import type { IconValue } from '@/composables/icons.types'
import type { ValidateOn, ValidationResult } from '@/composables/validation.types'
import type { Variant } from '@/composables/variant.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VColorInputSlots = Omit<VTextFieldSlots, 'default'> & {
  actions: VColorInputActionsSlot
  default: never
}

export type VColorInputActionsSlot = {
  save: () => void
  cancel: () => void
  isPristine: boolean
}

export interface VColorInputProps {
  active?: boolean
  appendIcon?: IconValue
  appendInnerIcon?: IconValue
  autocomplete?: string
  autofocus?: boolean
  baseColor?: string
  bgColor?: string
  border?: string | number | boolean
  cancelText?: string
  canvasHeight?: string | number
  centerAffix?: boolean
  class?: any
  clearable?: boolean
  clearIcon?: IconValue
  color?: string
  colorPip?: boolean
  counter?: string | number | boolean | null
  counterValue?: number | ((value: any) => number)
  density?: Density
  detailsActive?: boolean
  dirty?: boolean
  disabled?: boolean
  divided?: boolean
  dotSize?: string | number
  elevation?: string | number
  error?: boolean
  errorMessages?: string | readonly string[] | null
  eyeDropperIcon?: IconValue
  flat?: boolean
  focused?: boolean
  glow?: boolean
  hideActions?: boolean
  hideCanvas?: boolean
  hideDetails?: boolean | 'auto'
  hideEyeDropper?: boolean
  hideHeader?: boolean
  hideInputLabels?: boolean
  hideInputs?: boolean
  hidePip?: boolean
  hideSliders?: boolean
  hideSpinButtons?: boolean
  hideTitle?: boolean
  hint?: string
  hoverElevation?: string | number
  iconColor?: string | boolean
  id?: string
  indentDetails?: boolean
  label?: string
  landscape?: boolean
  loading?: string | boolean
  maxErrors?: string | number
  maxWidth?: string | number
  menuProps?: VMenu['$props']
  messages?: string | readonly string[]
  minWidth?: string | number
  mode?: 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hex' | 'hexa'
  modelModifiers?: Record<string, boolean>
  modelValue?: string | Record<string, unknown> | null
  modes?: readonly ('rgb' | 'rgba' | 'hsl' | 'hsla' | 'hex' | 'hexa')[]
  name?: string
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
  pickerProps?: VColorPicker['$props']
  pipIcon?: string
  pipLocation?: 'prepend' | 'append' | 'prepend-inner' | 'append-inner'
  pipVariant?: Variant
  placeholder?: string
  position?: 'fixed' | 'relative' | 'absolute' | 'static' | 'sticky'
  prefix?: string
  prependIcon?: IconValue
  prependInnerIcon?: IconValue
  readonly?: boolean
  reverse?: boolean
  role?: string
  rounded?: string | number | boolean
  rules?: readonly (string | boolean | PromiseLike<ValidationResult> | ((value: any) => ValidationResult) | ((value: any) => PromiseLike<ValidationResult>) | [string, any, (string | undefined)?])[]
  showSwatches?: boolean
  singleLine?: boolean
  style?: StyleValue
  suffix?: string
  swatches?: readonly (readonly (string | number | { readonly h: number, readonly s: number, readonly v: number, readonly a?: number | undefined } | { readonly r: number, readonly g: number, readonly b: number, readonly a?: number | undefined } | { readonly h: number, readonly s: number, readonly l: number, readonly a?: number | undefined })[])[]
  swatchesMaxHeight?: string | number
  tag?: string | JSXComponent
  theme?: string
  tile?: boolean
  title?: string
  type?: string
  validateOn?: ValidateOn
  validationValue?: any
  variant?: 'outlined' | 'plain' | 'underlined' | 'filled' | 'solo' | 'solo-inverted' | 'solo-filled'
  width?: string | number
}

type VColorInputDefaultKeys =
  | 'active'
  | 'autofocus'
  | 'cancelText'
  | 'canvasHeight'
  | 'centerAffix'
  | 'clearable'
  | 'clearIcon'
  | 'colorPip'
  | 'counter'
  | 'density'
  | 'detailsActive'
  | 'dirty'
  | 'disabled'
  | 'divided'
  | 'dotSize'
  | 'error'
  | 'errorMessages'
  | 'eyeDropperIcon'
  | 'flat'
  | 'focused'
  | 'glow'
  | 'hideActions'
  | 'hideCanvas'
  | 'hideEyeDropper'
  | 'hideHeader'
  | 'hideInputLabels'
  | 'hideInputs'
  | 'hidePip'
  | 'hideSliders'
  | 'hideSpinButtons'
  | 'hideTitle'
  | 'indentDetails'
  | 'landscape'
  | 'maxErrors'
  | 'messages'
  | 'mode'
  | 'modes'
  | 'okText'
  | 'openOnFocus'
  | 'persistentClear'
  | 'persistentCounter'
  | 'persistentHint'
  | 'persistentPlaceholder'
  | 'pipIcon'
  | 'pipLocation'
  | 'pipVariant'
  | 'readonly'
  | 'reverse'
  | 'rounded'
  | 'rules'
  | 'showSwatches'
  | 'singleLine'
  | 'style'
  | 'swatchesMaxHeight'
  | 'tag'
  | 'tile'
  | 'type'
  | 'variant'

export declare const VColorInput: VuetifyComponent<
  VColorInputProps,
  VColorInputDefaultKeys,
  {
    'update:modelValue': (val: string) => true
  },
  VColorInputSlots,
  ForwardRefs<{}, [VTextField]>
>
export type VColorInput = InstanceType<typeof VColorInput>

export {}
