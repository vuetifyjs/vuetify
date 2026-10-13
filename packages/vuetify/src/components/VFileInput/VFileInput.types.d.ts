// Types
import type { StyleValue } from 'vue'
import type { VField, VFieldSlots } from '@/components/VField/VField.types'
import type { VInput, VInputSlots } from '@/components/VInput/VInput.types'
import type { Density } from '@/composables/density.types'
import type { ForwardRefs } from '@/composables/forwardRefs.types'
import type { IconValue } from '@/composables/icons.types'
import type { ValidateOn, ValidationResult } from '@/composables/validation.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VFileInputSlots = VInputSlots & VFieldSlots & {
  counter: never
  selection: {
    fileNames: string[]
    totalBytes: number
    totalBytesReadable: string
  }
}

export interface VFileInputProps {
  active?: boolean
  appendIcon?: IconValue
  appendInnerIcon?: IconValue
  baseColor?: string
  bgColor?: string
  centerAffix?: boolean
  chips?: boolean
  class?: any
  clearable?: boolean
  clearIcon?: IconValue
  color?: string
  counter?: boolean | null
  counterSizeString?: string
  counterString?: string
  density?: Density
  detailsActive?: boolean
  dirty?: boolean
  disabled?: boolean
  error?: boolean
  errorMessages?: string | readonly string[] | null
  filterByType?: string
  flat?: boolean
  focused?: boolean
  glow?: boolean
  hideDetails?: boolean | 'auto'
  hideInput?: boolean
  hideSpinButtons?: boolean
  hint?: string
  iconColor?: string | boolean
  id?: string
  indentDetails?: boolean
  label?: string
  loading?: string | boolean
  maxErrors?: string | number
  maxWidth?: string | number
  messages?: string | readonly string[]
  minWidth?: string | number
  modelValue?: File | File[] | null
  multiple?: boolean
  name?: string
  'onClick:append'?: ((args_0: MouseEvent) => void)
  'onClick:appendInner'?: ((args_0: MouseEvent) => void)
  'onClick:clear'?: ((args_0: MouseEvent) => void)
  'onClick:prepend'?: ((args_0: MouseEvent) => void)
  'onClick:prependInner'?: ((args_0: MouseEvent) => void)
  'onUpdate:focused'?: ((args_0: boolean) => void)
  persistentClear?: boolean
  persistentHint?: boolean
  persistentPlaceholder?: boolean
  placeholder?: string
  prependIcon?: IconValue
  prependInnerIcon?: IconValue
  readonly?: boolean | null
  reverse?: boolean
  rounded?: string | number | boolean
  rules?: readonly (string | boolean | PromiseLike<ValidationResult> | ((value: any) => ValidationResult) | ((value: any) => PromiseLike<ValidationResult>) | [string, any, (string | undefined)?])[]
  showSize?: boolean | 1000 | 1024
  singleLine?: boolean
  style?: StyleValue
  theme?: string
  tile?: boolean
  truncateLength?: string | number
  validateOn?: ValidateOn
  validationValue?: any
  variant?: 'outlined' | 'plain' | 'underlined' | 'filled' | 'solo' | 'solo-inverted' | 'solo-filled'
  width?: string | number
}

export type VFileInputDefaultKeys =
  | 'active'
  | 'centerAffix'
  | 'chips'
  | 'clearable'
  | 'clearIcon'
  | 'counter'
  | 'counterSizeString'
  | 'counterString'
  | 'density'
  | 'detailsActive'
  | 'dirty'
  | 'disabled'
  | 'error'
  | 'errorMessages'
  | 'flat'
  | 'focused'
  | 'glow'
  | 'hideInput'
  | 'hideSpinButtons'
  | 'indentDetails'
  | 'maxErrors'
  | 'messages'
  | 'modelValue'
  | 'multiple'
  | 'persistentClear'
  | 'persistentHint'
  | 'persistentPlaceholder'
  | 'prependIcon'
  | 'readonly'
  | 'reverse'
  | 'rounded'
  | 'rules'
  | 'showSize'
  | 'singleLine'
  | 'style'
  | 'tile'
  | 'truncateLength'
  | 'variant'

export declare const VFileInput: VuetifyComponent<
  VFileInputProps,
  VFileInputDefaultKeys,
  {
    'click:control': (e: MouseEvent) => true
    'mousedown:control': (e: MouseEvent) => true
    'update:focused': (focused: boolean) => true
    'update:modelValue': (files: File | File[]) => true
    rejected: (files: File[]) => true
  },
  VFileInputSlots,
  ForwardRefs<{}, [VInput, VField, HTMLInputElement]>
>
export type VFileInput = InstanceType<typeof VFileInput>
