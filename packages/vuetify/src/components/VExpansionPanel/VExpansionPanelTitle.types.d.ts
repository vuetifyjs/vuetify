// Types
import type { StyleValue } from 'vue'
import type { IconValue } from '@/composables/icons.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VExpansionPanelTitleSlots = {
  default: ExpansionPanelTitleSlot
  actions: ExpansionPanelTitleSlot
}

export interface ExpansionPanelTitleSlot {
  collapseIcon: IconValue
  disabled: boolean | undefined
  expanded: boolean
  expandIcon: IconValue
  readonly: boolean
}

export interface VExpansionPanelTitleProps {
  class?: any
  collapseIcon?: IconValue
  color?: string
  expandIcon?: IconValue
  focusable?: boolean
  height?: string | number
  hideActions?: boolean
  hover?: boolean
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  readonly?: boolean
  ripple?: boolean | { class?: string | undefined, keys?: string[] | undefined }
  static?: boolean
  style?: StyleValue
  width?: string | number
}

export type VExpansionPanelTitleDefaultKeys =
  | 'collapseIcon'
  | 'expandIcon'
  | 'focusable'
  | 'hideActions'
  | 'hover'
  | 'readonly'
  | 'ripple'
  | 'static'
  | 'style'

export declare const VExpansionPanelTitle: VuetifyComponent<
  VExpansionPanelTitleProps,
  VExpansionPanelTitleDefaultKeys,
  Record<string, any>,
  VExpansionPanelTitleSlots
>
export type VExpansionPanelTitle = InstanceType<typeof VExpansionPanelTitle>
