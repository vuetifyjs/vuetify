// Types
import type { StyleValue } from 'vue'
import type { IconValue } from '@/composables/icons.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type TimelineItemSide = 'start' | 'end' | undefined

export type VTimelineItemSlots = {
  default: never
  icon: never
  opposite: never
}

export interface VTimelineItemProps {
  class?: any
  density?: 'default' | 'compact'
  dotColor?: string
  elevation?: string | number
  fillDot?: boolean
  height?: string | number
  hideDot?: boolean
  hideOpposite?: boolean
  hoverElevation?: string | number
  icon?: IconValue
  iconColor?: string
  lineInset?: string | number
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  rounded?: string | number | boolean
  side?: TimelineItemSide
  size?: string | number
  style?: StyleValue
  tag?: string | JSXComponent
  tile?: boolean
  width?: string | number
}

type VTimelineItemDefaultKeys =
  | 'fillDot'
  | 'hideDot'
  | 'hideOpposite'
  | 'rounded'
  | 'size'
  | 'style'
  | 'tag'
  | 'tile'

export declare const VTimelineItem: VuetifyComponent<
  VTimelineItemProps,
  VTimelineItemDefaultKeys,
  Record<string, any>,
  VTimelineItemSlots
>
export type VTimelineItem = InstanceType<typeof VTimelineItem>

export {}
