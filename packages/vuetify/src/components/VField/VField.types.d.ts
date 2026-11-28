// Types
import type { ComputedRef, Ref, StyleValue } from 'vue'
import type { IconValue } from '@/composables/icons.types'
import type { LoaderSlotProps } from '@/composables/loader.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { ClassValue } from '@/util/shared.types'

export type VFieldVariant = 'underlined' | 'outlined' | 'filled' | 'solo' | 'solo-inverted' | 'solo-filled' | 'plain'

export interface VFieldBaseProps {
  active?: boolean
  appendInnerIcon?: IconValue
  baseColor?: string
  bgColor?: string
  centerAffix?: boolean
  class?: ClassValue
  clearable?: boolean
  clearIcon?: IconValue
  color?: string
  dirty?: boolean
  disabled?: boolean
  error?: boolean
  flat?: boolean
  glow?: boolean
  iconColor?: string | boolean
  label?: string
  loading?: string | boolean
  'onClick:appendInner'?: (event: MouseEvent) => void
  'onClick:clear'?: (event: MouseEvent) => void
  'onClick:prependInner'?: (event: MouseEvent) => void
  persistentClear?: boolean
  prependInnerIcon?: IconValue
  reverse?: boolean
  rounded?: string | number | boolean
  singleLine?: boolean
  style?: StyleValue
  theme?: string
  tile?: boolean
  variant?: VFieldVariant
}

type VFieldBaseDefaultKeys =
  | 'active'
  | 'centerAffix'
  | 'clearable'
  | 'clearIcon'
  | 'dirty'
  | 'disabled'
  | 'error'
  | 'flat'
  | 'glow'
  | 'persistentClear'
  | 'reverse'
  | 'rounded'
  | 'singleLine'
  | 'style'
  | 'tile'
  | 'variant'

export interface VFieldProps<T = any> extends VFieldBaseProps {
  details?: boolean
  focused?: boolean
  id?: string
  labelId?: string
  modelValue?: T
  'onUpdate:focused'?: (value: boolean) => void
}

type VFieldDefaultKeys =
  | VFieldBaseDefaultKeys
  | 'details'
  | 'focused'

export interface DefaultInputSlot {
  isActive: Ref<boolean>
  isFocused: Ref<boolean>
  iconColor: ComputedRef<string | undefined>
  controlRef: Ref<HTMLElement | undefined>
  focus: () => void
  blur: () => void
}

export interface VFieldSlot extends DefaultInputSlot {
  props: Record<string, unknown> & {
    class?: ClassValue
  }
}

export type VFieldSlots = {
  clear: DefaultInputSlot & { props: Record<string, any> }
  'prepend-inner': DefaultInputSlot
  'append-inner': DefaultInputSlot
  label: DefaultInputSlot & { label: string | undefined, props: Record<string, any> }
  loader: LoaderSlotProps
  default: VFieldSlot
}

export type VFieldExposed = {
  controlRef: Ref<HTMLElement | undefined, HTMLElement | undefined>
  fieldIconColor: ComputedRef<string | undefined>
}

export declare const VField: VuetifyComponent<
  VFieldProps,
  VFieldDefaultKeys,
  {
    'update:focused': (focused: boolean) => true
    'update:modelValue': (value: any) => true
  },
  new <T>(
    props: {
      modelValue?: T
      'onUpdate:modelValue'?: (value: T) => void
    },
    slots: VFieldSlots
  ) => GenericProps<typeof props, typeof slots>,
  VFieldExposed
>
export type VField = InstanceType<typeof VField>

export {}
