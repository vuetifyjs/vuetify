// Types
import type { StyleValue } from 'vue'
import type { VListGroupSlots } from '@/components/VList/VListGroup.types'
import type { IconValue } from '@/composables/icons.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export interface VTreeviewGroupProps {
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
  tag?: string | JSXComponent
  title?: string
  value?: any
}

type VTreeviewGroupDefaultKeys =
  | 'collapseIcon'
  | 'disabled'
  | 'expandIcon'
  | 'fluid'
  | 'style'
  | 'tag'

export declare const VTreeviewGroup: VuetifyComponent<
  VTreeviewGroupProps,
  VTreeviewGroupDefaultKeys,
  Record<string, any>,
  VListGroupSlots
>
export type VTreeviewGroup = InstanceType<typeof VTreeviewGroup>

export {}
