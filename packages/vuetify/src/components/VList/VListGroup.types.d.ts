// Types
import type { ComputedRef, StyleValue } from 'vue'
import type { IconValue } from '@/composables/icons.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VListGroupSlots = {
  default: never
  activator: { isOpen: boolean, props: Record<string, unknown> }
}

export interface VListGroupProps {
  activeColor?: string
  appendIcon?: IconValue
  baseColor?: string
  class?: any
  collapseIcon?: IconValue
  color?: string
  disabled?: boolean
  expandIcon?: IconValue
  fluid?: boolean
  prependIcon?: IconValue
  rawId?: string | number
  style?: StyleValue
  subgroup?: boolean
  tag?: string | JSXComponent
  title?: string
  value?: any
}

type VListGroupDefaultKeys =
  | 'collapseIcon'
  | 'disabled'
  | 'expandIcon'
  | 'fluid'
  | 'style'
  | 'subgroup'
  | 'tag'

export declare const VListGroup: VuetifyComponent<
  VListGroupProps,
  VListGroupDefaultKeys,
  Record<string, any>,
  VListGroupSlots,
  { isOpen: ComputedRef<boolean> }
>
export type VListGroup = InstanceType<typeof VListGroup>

export {}
