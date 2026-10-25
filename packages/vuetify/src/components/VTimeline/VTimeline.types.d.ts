// Types
import type { StyleValue } from 'vue'
import type { Density } from '@/composables/density.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type TimelineDirection = 'vertical' | 'horizontal'

export type TimelineAlign = 'center' | 'start'

export type TimelineJustify = 'auto' | 'center'

export type TimelineSide = 'start' | 'end' | undefined

export type TimelineTruncateLine = 'start' | 'end' | 'both' | undefined

export interface VTimelineProps {
  align?: TimelineAlign
  class?: any
  density?: Density
  direction?: TimelineDirection
  dotColor?: string
  fillDot?: boolean
  hideOpposite?: boolean
  iconColor?: string
  justify?: TimelineJustify
  lineColor?: string
  lineInset?: string | number
  lineThickness?: string | number
  side?: TimelineSide
  size?: string | number
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
  truncateLine?: TimelineTruncateLine
}

type VTimelineDefaultKeys =
  | 'density'
  | 'fillDot'
  | 'hideOpposite'
  | 'lineInset'
  | 'lineThickness'
  | 'size'
  | 'style'
  | 'tag'

export declare const VTimeline: VuetifyComponent<
  VTimelineProps,
  VTimelineDefaultKeys,
  Record<string, any>
>
export type VTimeline = InstanceType<typeof VTimeline>

export {}
