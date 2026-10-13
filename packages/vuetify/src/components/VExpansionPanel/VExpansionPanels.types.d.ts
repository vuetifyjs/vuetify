// Types
import type { StyleValue } from 'vue'
import type { IconValue } from '@/composables/icons.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VExpansionPanelSlots = {
  default: VExpansionPanelSlot
}

export type VExpansionPanelSlot = {
  prev: () => void
  next: () => void
}

export interface VExpansionPanelsProps {
  bgColor?: string
  class?: any
  collapseIcon?: IconValue
  color?: string
  disabled?: boolean
  eager?: boolean
  elevation?: string | number
  expandIcon?: IconValue
  flat?: boolean
  focusable?: boolean
  gap?: string | number
  hideActions?: boolean
  hover?: boolean
  mandatory?: boolean | 'force'
  max?: number
  modelValue?: any
  multiple?: boolean
  noDivider?: boolean
  readonly?: boolean
  ripple?: boolean | { class?: string | undefined, keys?: string[] | undefined }
  rounded?: string | number | boolean | (string | number)[]
  selectedClass?: string
  static?: boolean
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
  tile?: boolean
  variant?: 'default' | 'inset' | 'accordion' | 'popout'
}

export type VExpansionPanelsDefaultKeys =
  | 'collapseIcon'
  | 'disabled'
  | 'eager'
  | 'expandIcon'
  | 'flat'
  | 'focusable'
  | 'hideActions'
  | 'hover'
  | 'modelValue'
  | 'multiple'
  | 'noDivider'
  | 'readonly'
  | 'ripple'
  | 'rounded'
  | 'static'
  | 'style'
  | 'tag'
  | 'tile'
  | 'variant'

export declare const VExpansionPanels: VuetifyComponent<
  VExpansionPanelsProps,
  VExpansionPanelsDefaultKeys,
  {
    'update:modelValue': (val: unknown) => true
  },
  new <TModel>(
    props: {
      modelValue?: TModel
      'onUpdate:modelValue'?: (value: TModel) => void
    },
    slots: VExpansionPanelSlots
  ) => GenericProps<typeof props, typeof slots>,
  { next: () => void, prev: () => void }
>
export type VExpansionPanels = InstanceType<typeof VExpansionPanels>
