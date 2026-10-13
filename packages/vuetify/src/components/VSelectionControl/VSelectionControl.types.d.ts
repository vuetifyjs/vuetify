// Types
import type { CSSProperties, Ref, ShallowRef, StyleValue, VNode, WritableComputedRef } from 'vue'
import type { Density } from '@/composables/density.types'
import type { IconValue } from '@/composables/icons.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { ValueComparator } from '@/util/shared.types'

export type VSelectionControlSlots = {
  default: {
    backgroundColorClasses: Ref<string[]>
    backgroundColorStyles: Ref<CSSProperties>
  }
  label: { label: string | undefined, props: Record<string, unknown> }
  input: SelectionControlSlot
}

export type SelectionControlSlot = {
  model: WritableComputedRef<boolean>
  textColorClasses: Ref<string[]>
  textColorStyles: Ref<CSSProperties>
  backgroundColorClasses: Ref<string[]>
  backgroundColorStyles: Ref<CSSProperties>
  inputNode: VNode
  icon: IconValue | undefined
  props: {
    onBlur: (e: Event) => void
    onFocus: (e: FocusEvent) => void
    id: string
  }
}

export interface VSelectionControlProps {
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
  indeterminate?: boolean
  indeterminateIcon?: IconValue
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

export type VSelectionControlDefaultKeys =
  | 'density'
  | 'disabled'
  | 'error'
  | 'indeterminate'
  | 'inline'
  | 'multiple'
  | 'readonly'
  | 'ripple'
  | 'style'
  | 'valueComparator'

export declare const VSelectionControl: VuetifyComponent<
  VSelectionControlProps,
  VSelectionControlDefaultKeys,
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
  { blur: () => void, focus: (options?: FocusOptions | undefined) => void, isFocused: ShallowRef<boolean, boolean>, input: ShallowRef<HTMLInputElement | undefined, HTMLInputElement | undefined> }
>
export type VSelectionControl = InstanceType<typeof VSelectionControl>
