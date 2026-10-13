// Types
import type { StyleValue } from 'vue'
import type { VSelectionControl, VSelectionControlSlots } from '@/components/VSelectionControl/VSelectionControl.types'
import type { Density } from '@/composables/density.types'
import type { ForwardRefs } from '@/composables/forwardRefs.types'
import type { IconValue } from '@/composables/icons.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { ValueComparator } from '@/util/shared.types'

export interface VRadioProps {
  baseColor?: string
  class?: any
  color?: string
  defaultsTarget?: string
  density?: Density
  disabled?: boolean | null
  error?: boolean
  falseIcon?: IconValue
  falseValue?: any
  id?: string
  inline?: boolean
  label?: string
  modelValue?: any
  multiple?: boolean | null
  name?: string
  readonly?: boolean | null
  ripple?: boolean | { class?: string | undefined, keys?: string[] | undefined }
  style?: StyleValue
  theme?: string
  trueIcon?: IconValue
  trueValue?: any
  type?: string
  value?: any
  valueComparator?: ValueComparator
}

export type VRadioDefaultKeys =
  | 'density'
  | 'disabled'
  | 'error'
  | 'falseIcon'
  | 'inline'
  | 'multiple'
  | 'readonly'
  | 'ripple'
  | 'style'
  | 'trueIcon'
  | 'valueComparator'

export declare const VRadio: VuetifyComponent<
  VRadioProps,
  VRadioDefaultKeys,
  {
    'update:modelValue': (value: any) => true
  },
  new <T>(
    props: {
      modelValue?: T
      'onUpdate:modelValue'?: (value: T) => void
    },
    slots: VSelectionControlSlots,
  ) => GenericProps<typeof props, typeof slots>,
  ForwardRefs<{}, [VSelectionControl]>
>
export type VRadio = InstanceType<typeof VRadio>
