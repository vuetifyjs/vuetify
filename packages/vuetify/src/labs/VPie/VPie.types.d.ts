// Types
import type { TransitionProps } from 'vue'
import type { Density } from '@/composables/density.types'
import type { PieItem, TextTemplate } from '@/labs/VPie/types.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VPieSlots = {
  center: { total: number }
  legend: {
    isActive: (item: PieItem) => boolean
    toggle: (item: PieItem) => void
    items: PieItem[]
    total: number
  }
  'legend-text': {
    item: PieItem
    total: number
  }
  title: never
  tooltip: {
    item: PieItem
    total: number
  }
}

export interface VPieProps {
  animation?: boolean | { duration?: number | undefined, easing?: 'linear' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad' | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic' | 'easeInQuart' | 'easeOutQuart' | 'easeInOutQuart' | 'easeInQuint' | 'easeOutQuint' | 'easeInOutQuint' | 'instant' | undefined }
  bgColor?: string
  density?: Density
  gap?: string | number
  gaugeCut?: string | number
  hideSlice?: boolean
  hoverScale?: string | number
  innerCut?: string | number
  itemKey?: string
  items?: Record<string, any> | { color?: string | undefined, pattern?: string | undefined }[]
  itemTitle?: string
  itemValue?: string
  legend?: boolean | { position?: 'top' | 'left' | 'right' | 'bottom' | undefined, textFormat?: TextTemplate | undefined }
  palette?: (string | { color?: string | undefined, pattern?: string | undefined })[]
  reveal?: boolean | { duration?: number | undefined }
  rotate?: string | number
  rounded?: string | number
  size?: string | number
  title?: string
  tooltip?: boolean | { titleFormat?: TextTemplate | undefined, subtitleFormat?: TextTemplate | undefined, avatarSize?: number | undefined, transition?: string | boolean | TransitionProps | undefined, offset?: number | undefined }
}

export type VPieDefaultKeys =
  | 'animation'
  | 'density'
  | 'hideSlice'
  | 'hoverScale'
  | 'itemKey'
  | 'items'
  | 'itemTitle'
  | 'itemValue'
  | 'legend'
  | 'palette'
  | 'reveal'
  | 'size'
  | 'tooltip'

export declare const VPie: VuetifyComponent<
  VPieProps,
  VPieDefaultKeys,
  Record<string, any>,
  VPieSlots
>
export type VPie = InstanceType<typeof VPie>
