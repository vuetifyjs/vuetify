// Types
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VPieSegmentProps {
  active?: boolean
  animation?: boolean | { duration?: number | undefined, easing?: 'linear' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad' | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic' | 'easeInQuart' | 'easeOutQuart' | 'easeInOutQuart' | 'easeInQuint' | 'easeOutQuint' | 'easeInOutQuint' | 'instant' | undefined }
  color?: string
  gap?: string | number
  hideSlice?: boolean
  hoverScale?: string | number
  innerCut?: string | number
  pattern?: string
  reveal?: boolean | { duration?: number | undefined }
  rotate?: string | number
  rounded?: string | number
  value?: number
}

type VPieSegmentDefaultKeys =
  | 'active'
  | 'animation'
  | 'hideSlice'
  | 'hoverScale'
  | 'reveal'
  | 'value'

export declare const VPieSegment: VuetifyComponent<
  VPieSegmentProps,
  VPieSegmentDefaultKeys,
  {
    'update:active': (val: boolean) => true
  }
>
export type VPieSegment = InstanceType<typeof VPieSegment>

export {}
