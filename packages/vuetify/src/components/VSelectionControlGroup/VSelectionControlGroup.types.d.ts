// Types
import type { StyleValue } from 'vue'
import type { Density } from '@/composables/density.types'
import type { IconValue } from '@/composables/icons.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { ValueComparator } from '@/util/shared.types'

export interface VSelectionControlGroupProps {
  class?: any
  color?: string
  defaultsTarget?: string
  density?: Density
  disabled?: boolean | null
  error?: boolean
  falseIcon?: IconValue
  id?: string
  indeterminateIcon?: IconValue
  inline?: boolean
  modelValue?: any
  multiple?: boolean | null
  name?: string
  readonly?: boolean | null
  ripple?: boolean | { class?: string | undefined, keys?: string[] | undefined }
  style?: StyleValue
  theme?: string
  trueIcon?: IconValue
  type?: string
  valueComparator?: ValueComparator
}

type VSelectionControlGroupDefaultKeys =
  | 'defaultsTarget'
  | 'density'
  | 'disabled'
  | 'error'
  | 'inline'
  | 'multiple'
  | 'readonly'
  | 'ripple'
  | 'style'
  | 'valueComparator'

export declare const VSelectionControlGroup: VuetifyComponent<
  VSelectionControlGroupProps,
  VSelectionControlGroupDefaultKeys,
  {
    'update:modelValue': (value: any) => true
  },
  new <T>(
    props: {
      modelValue?: T
      'onUpdate:modelValue'?: (value: T) => void
    },
    slots: { default: never },
  ) => GenericProps<typeof props, typeof slots>,
  { blur: () => void, focus: (options?: FocusOptions | undefined) => void }
>
export type VSelectionControlGroup = InstanceType<typeof VSelectionControlGroup>

export {}
