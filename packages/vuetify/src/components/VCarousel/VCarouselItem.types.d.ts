// Types
import type { StyleValue } from 'vue'
import type { srcObject, VImgSlots } from '@/components/VImg/VImg.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VCarouselItemProps {
  absolute?: boolean
  alt?: string
  aspectRatio?: string | number
  class?: any
  color?: string
  contentClass?: any
  cover?: boolean
  crossorigin?: '' | 'anonymous' | 'use-credentials'
  disabled?: boolean
  draggable?: boolean | 'true' | 'false'
  eager?: boolean
  gradient?: string
  height?: string | number
  imageClass?: any
  inline?: boolean
  lazySrc?: string
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  options?: IntersectionObserverInit
  position?: string
  referrerpolicy?: 'origin' | 'no-referrer' | 'no-referrer-when-downgrade' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'
  reverseTransition?: string | boolean
  rounded?: string | number | boolean
  selectedClass?: string
  sizes?: string
  src?: string | srcObject
  srcset?: string
  style?: StyleValue
  tile?: boolean
  transition?: string | boolean
  value?: any
  width?: string | number
}

export type VCarouselItemDefaultKeys =
  | 'absolute'
  | 'cover'
  | 'disabled'
  | 'draggable'
  | 'eager'
  | 'inline'
  | 'options'
  | 'reverseTransition'
  | 'rounded'
  | 'src'
  | 'style'
  | 'tile'
  | 'transition'

export declare const VCarouselItem: VuetifyComponent<
  VCarouselItemProps,
  VCarouselItemDefaultKeys,
  Record<string, any>,
  VImgSlots
>
export type VCarouselItem = InstanceType<typeof VCarouselItem>
