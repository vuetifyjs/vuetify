// Types
import type { Ref, StyleValue } from 'vue'
import type { Density } from '@/composables/density.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VOtpInputSlots = {
  default: never
  fields: never
  divider: { index: number }
  loader: never
}

export interface VOtpInputProps {
  autofocus?: boolean
  baseColor?: string
  bgColor?: string
  class?: any
  color?: string
  density?: Density
  disabled?: boolean
  divider?: string
  error?: boolean
  focusAll?: boolean
  focused?: boolean
  height?: string | number
  label?: string
  length?: string | number
  loading?: string | boolean
  masked?: boolean
  maxHeight?: string | number
  maxWidth?: string | number
  merged?: boolean
  minHeight?: string | number
  minWidth?: string | number
  modelValue?: string | number
  'onUpdate:focused'?: ((args_0: boolean) => void)
  pattern?: RegExp | 'numeric' | 'alpha' | 'alphanumeric' | 'unicode-alpha' | 'unicode-alphanumeric'
  placeholder?: string
  rounded?: string | number | boolean
  style?: StyleValue
  theme?: string
  type?: 'number' | 'text' | 'password'
  variant?: 'outlined' | 'plain' | 'underlined' | 'filled' | 'solo' | 'solo-inverted' | 'solo-filled'
  width?: string | number
}

type VOtpInputDefaultKeys =
  | 'autofocus'
  | 'density'
  | 'disabled'
  | 'error'
  | 'focusAll'
  | 'focused'
  | 'label'
  | 'length'
  | 'masked'
  | 'merged'
  | 'modelValue'
  | 'pattern'
  | 'rounded'
  | 'style'
  | 'type'
  | 'variant'

export declare const VOtpInput: VuetifyComponent<
  VOtpInputProps,
  VOtpInputDefaultKeys,
  {
    finish: (value: string) => true
    'update:focused': (value: boolean) => true
    'update:modelValue': (value: string) => true
  },
  VOtpInputSlots,
  { blur: () => void, focus: () => void, reset: () => void, isFocused: Ref<boolean, boolean> & { readonly externalValue: boolean } }
>
export type VOtpInput = InstanceType<typeof VOtpInput>

export {}
