// Types
import type { Ref, StyleValue } from 'vue'
import type { VInput, VInputSlots } from '@/components/VInput/VInput.types'
import type { VSelectionControlGroup } from '@/components/VSelectionControlGroup/VSelectionControlGroup.types'
import type { Density } from '@/composables/density.types'
import type { ForwardRefs } from '@/composables/forwardRefs.types'
import type { IconValue } from '@/composables/icons.types'
import type { ValidateOn, ValidationResult } from '@/composables/validation.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { ValueComparator } from '@/util/shared.types'

export type VRadioGroupSlots = Omit<VInputSlots, 'default'> & {
  default: never
  label: {
    label: string | undefined
    props: Record<string, any>
  }
}

export interface VRadioGroupProps {
  appendIcon?: IconValue
  baseColor?: string
  centerAffix?: boolean
  class?: any
  color?: string
  defaultsTarget?: string
  density?: Density
  detailsActive?: boolean
  disabled?: boolean | null
  error?: boolean
  errorMessages?: string | readonly string[] | null
  falseIcon?: IconValue
  focused?: boolean
  height?: string | number
  hideDetails?: boolean | 'auto'
  hideSpinButtons?: boolean
  hint?: string
  iconColor?: string | boolean
  id?: string
  indentDetails?: boolean
  indeterminateIcon?: IconValue
  inline?: boolean
  label?: string
  maxErrors?: string | number
  maxWidth?: string | number
  messages?: string | readonly string[]
  minWidth?: string | number
  modelValue?: any
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
  type?: string
  validateOn?: ValidateOn
  validationValue?: any
  valueComparator?: ValueComparator
  width?: string | number
}

type VRadioGroupDefaultKeys =
  | 'centerAffix'
  | 'density'
  | 'detailsActive'
  | 'disabled'
  | 'error'
  | 'errorMessages'
  | 'falseIcon'
  | 'focused'
  | 'height'
  | 'hideSpinButtons'
  | 'indentDetails'
  | 'inline'
  | 'maxErrors'
  | 'messages'
  | 'persistentHint'
  | 'readonly'
  | 'ripple'
  | 'rules'
  | 'style'
  | 'trueIcon'
  | 'type'
  | 'valueComparator'

export declare const VRadioGroup: VuetifyComponent<
  VRadioGroupProps,
  VRadioGroupDefaultKeys,
  {
    'update:modelValue': (value: any) => true
    'update:focused': (focused: boolean) => true
  },
  new <T>(
    props: {
      modelValue?: T | null
      'onUpdate:modelValue'?: (value: T | null) => void
    },
    slots: VRadioGroupSlots,
  ) => GenericProps<typeof props, typeof slots>,
  ForwardRefs<{ isFocused: Ref<boolean, boolean> & { readonly externalValue: boolean } }, [VSelectionControlGroup, VInput]>
>
export type VRadioGroup = InstanceType<typeof VRadioGroup>

export {}
