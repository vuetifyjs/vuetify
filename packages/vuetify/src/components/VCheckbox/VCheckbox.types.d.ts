// Types
import type { Ref, StyleValue } from 'vue'
import type { VCheckboxBtn } from '@/components/VCheckbox/VCheckboxBtn.types'
import type { VInput, VInputSlots } from '@/components/VInput/VInput.types'
import type { VSelectionControlSlots } from '@/components/VSelectionControl/VSelectionControl.types'
import type { Density } from '@/composables/density.types'
import type { ForwardRefs } from '@/composables/forwardRefs.types'
import type { IconValue } from '@/composables/icons.types'
import type { ValidateOn, ValidationResult } from '@/composables/validation.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { ValueComparator } from '@/util/shared.types'

export type VCheckboxSlots = Omit<VInputSlots, 'default'> & VSelectionControlSlots

export interface VCheckboxProps {
  appendIcon?: IconValue
  baseColor?: string
  centerAffix?: boolean
  class?: any
  color?: string
  defaultsTarget?: string
  density?: Density
  description?: string
  detailsActive?: boolean
  disabled?: boolean | null
  error?: boolean
  errorMessages?: string | readonly string[] | null
  falseIcon?: IconValue
  falseValue?: any
  focused?: boolean
  hideDetails?: boolean | 'auto'
  hideSpinButtons?: boolean
  hint?: string
  iconColor?: string | boolean
  id?: string
  indentDetails?: boolean
  indeterminate?: boolean
  indeterminateIcon?: IconValue
  label?: string
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
  style?: StyleValue
  theme?: string
  trueIcon?: IconValue
  trueValue?: any
  type?: string
  validateOn?: ValidateOn
  validationValue?: any
  value?: any
  valueComparator?: ValueComparator
  width?: string | number
}

type VCheckboxDefaultKeys =
  | 'centerAffix'
  | 'density'
  | 'detailsActive'
  | 'disabled'
  | 'error'
  | 'errorMessages'
  | 'falseIcon'
  | 'focused'
  | 'hideSpinButtons'
  | 'indentDetails'
  | 'indeterminate'
  | 'indeterminateIcon'
  | 'maxErrors'
  | 'messages'
  | 'multiple'
  | 'persistentHint'
  | 'readonly'
  | 'ripple'
  | 'rules'
  | 'style'
  | 'trueIcon'
  | 'valueComparator'

export declare const VCheckbox: VuetifyComponent<
  VCheckboxProps,
  VCheckboxDefaultKeys,
  {
    'update:modelValue': (value: any) => true
    'update:focused': (focused: boolean) => true
  },
  new <T>(
    props: {
      modelValue?: T | null
      'onUpdate:modelValue'?: (value: T | null) => void
    },
    slots: VCheckboxSlots,
  ) => GenericProps<typeof props, typeof slots>,
  ForwardRefs<{ isFocused: Ref<boolean, boolean> & { readonly externalValue: boolean } }, [VCheckboxBtn, VInput]>
>
export type VCheckbox = InstanceType<typeof VCheckbox>

export {}
