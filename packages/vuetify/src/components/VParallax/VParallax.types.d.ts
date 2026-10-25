// Types
import type { StyleValue } from 'vue'
import type { VImgSlots } from '@/components/VImg/VImg.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VParallaxProps {
  class?: any
  scale?: string | number
  style?: StyleValue
}

type VParallaxDefaultKeys =
  | 'scale'
  | 'style'

export declare const VParallax: VuetifyComponent<
  VParallaxProps,
  VParallaxDefaultKeys,
  Record<string, any>,
  VImgSlots
>
export type VParallax = InstanceType<typeof VParallax>

export {}
