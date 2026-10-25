// Types
import type { StyleValue } from 'vue'
import type { GroupItemProvide } from '@/composables/group.types'
import type { IconValue } from '@/composables/icons.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VExpansionPanelSlots = {
  default: never
  title: never
  text: never
}

export interface VExpansionPanelProps {
  bgColor?: string
  class?: any
  collapseIcon?: IconValue
  color?: string
  disabled?: boolean
  eager?: boolean
  elevation?: string | number
  expandIcon?: IconValue
  focusable?: boolean
  height?: string | number
  hideActions?: boolean
  hover?: boolean
  hoverElevation?: string | number
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  readonly?: boolean
  ripple?: boolean | { class?: string | undefined, keys?: string[] | undefined }
  rounded?: string | number | boolean
  selectedClass?: string
  static?: boolean
  style?: StyleValue
  tag?: string | JSXComponent
  text?: string
  tile?: boolean
  title?: string
  value?: any
  width?: string | number
}

type VExpansionPanelDefaultKeys =
  | 'collapseIcon'
  | 'disabled'
  | 'eager'
  | 'expandIcon'
  | 'focusable'
  | 'hideActions'
  | 'hover'
  | 'readonly'
  | 'ripple'
  | 'rounded'
  | 'static'
  | 'style'
  | 'tag'
  | 'tile'

export declare const VExpansionPanel: VuetifyComponent<
  VExpansionPanelProps,
  VExpansionPanelDefaultKeys,
  {
    'group:selected': (val: { value: boolean }) => true
  },
  VExpansionPanelSlots,
  { groupItem: GroupItemProvide }
>
export type VExpansionPanel = InstanceType<typeof VExpansionPanel>

export {}
