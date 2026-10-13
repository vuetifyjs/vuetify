// Types
import type { ComputedRef, Ref, StyleValue } from 'vue'
import type { VInput, VInputSlots } from '@/components/VInput/VInput.types'
import type { VSelectionControl, VSelectionControlSlots } from '@/components/VSelectionControl/VSelectionControl.types'
import type { Density } from '@/composables/density.types'
import type { ForwardRefs } from '@/composables/forwardRefs.types'
import type { IconValue } from '@/composables/icons.types'
import type { LoaderSlotProps } from '@/composables/loader.types'
import type { ValidateOn, ValidationResult } from '@/composables/validation.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { ValueComparator } from '@/util/shared.types'

export type VSwitchSlots =
  & VInputSlots
  & VSelectionControlSlots
  & {
    loader: LoaderSlotProps
    thumb: { icon: IconValue | undefined } & VSwitchSlot
    'track-false': VSwitchSlot
    'track-true': VSwitchSlot
  }

export type VSwitchSlot = {
  model: Ref<boolean>
  isValid: ComputedRef<boolean | null>
}

export interface VSwitchProps {
  appendIcon?: IconValue
  baseColor?: string
  centerAffix?: boolean
  class?: any
  color?: string
  defaultsTarget?: string
  density?: Density
  description?: string
  detailsActive?: boolean
  direction?: 'horizontal' | 'vertical'
  disabled?: boolean | null
  error?: boolean
  errorMessages?: string | readonly string[] | null
  falseIcon?: IconValue
  falseValue?: any
  flat?: boolean
  focused?: boolean
  hideDetails?: boolean | 'auto'
  hideSpinButtons?: boolean
  hint?: string
  iconColor?: string | boolean
  id?: string
  indentDetails?: boolean
  indeterminate?: boolean
  indeterminateIcon?: IconValue
  inline?: boolean
  inset?: boolean | 'tonal' | 'material' | 'square'
  label?: string
  loading?: string | boolean
  maxErrors?: string | number
  maxWidth?: string | number
  messages?: string | readonly string[]
  minWidth?: string | number
  modelValue?: any
  multiple?: boolean | null
  name?: string
  'onClick:append'?: ((args_0: MouseEvent) => void)
  'onClick:prepend'?: ((args_0: MouseEvent) => void)
  'onUpdate:focused'?: ((args_0: boolean) => void)
  persistentHint?: boolean
  prependIcon?: IconValue
  readonly?: boolean | null
  ripple?: boolean | { class?: string | undefined, keys?: string[] | undefined }
  rules?: readonly (string | boolean | PromiseLike<ValidationResult> | ((value: any) => ValidationResult) | ((value: any) => PromiseLike<ValidationResult>) | [string, any, (string | undefined)?])[]
  size?: string | number
  style?: StyleValue
  theme?: string
  thumbColor?: string
  trueIcon?: IconValue
  trueValue?: any
  type?: string
  validateOn?: ValidateOn
  validationValue?: any
  value?: any
  valueComparator?: ValueComparator
  width?: string | number
}

export type VSwitchDefaultKeys =
  | 'centerAffix'
  | 'density'
  | 'detailsActive'
  | 'direction'
  | 'disabled'
  | 'error'
  | 'errorMessages'
  | 'flat'
  | 'focused'
  | 'hideSpinButtons'
  | 'indentDetails'
  | 'indeterminate'
  | 'inline'
  | 'inset'
  | 'loading'
  | 'maxErrors'
  | 'messages'
  | 'multiple'
  | 'persistentHint'
  | 'readonly'
  | 'ripple'
  | 'rules'
  | 'size'
  | 'style'
  | 'valueComparator'

export declare const VSwitch: VuetifyComponent<
  VSwitchProps,
  VSwitchDefaultKeys,
  {
    'update:focused': (focused: boolean) => true
    'update:modelValue': (value: any) => true
    'update:indeterminate': (value: boolean) => true
  },
  new <T>(
    props: {
      modelValue?: T | null
      'onUpdate:modelValue'?: (value: T | null) => void
    },
    slots: VSwitchSlots,
  ) => GenericProps<typeof props, typeof slots>,
  ForwardRefs<{ isFocused: Ref<boolean, boolean> & { readonly externalValue: boolean } }, [VSelectionControl, VInput]>
>
export type VSwitch = InstanceType<typeof VSwitch>
