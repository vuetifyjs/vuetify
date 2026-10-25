// Types
import type { StyleValue } from 'vue'
import type { IconValue } from '@/composables/icons.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VInfiniteCarouselSlots = {
  default: never
  separator: never
  prev: { props: Record<string, any> }
  next: { props: Record<string, any> }
}

export interface VInfiniteCarouselProps {
  class?: any
  direction?: 'horizontal' | 'vertical'
  draggable?: boolean
  gap?: string | number
  height?: string | number
  mask?: string | number | boolean
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  nextIcon?: IconValue
  paused?: boolean
  pauseOnHover?: boolean
  prevIcon?: IconValue
  reverse?: boolean
  shiftDistance?: string | number
  showArrows?: boolean | 'hover'
  speed?: string | number
  style?: StyleValue
  tag?: string | JSXComponent
  wheel?: boolean
  width?: string | number
}

type VInfiniteCarouselDefaultKeys =
  | 'direction'
  | 'draggable'
  | 'nextIcon'
  | 'paused'
  | 'pauseOnHover'
  | 'prevIcon'
  | 'reverse'
  | 'shiftDistance'
  | 'speed'
  | 'style'
  | 'tag'
  | 'wheel'

export declare const VInfiniteCarousel: VuetifyComponent<
  VInfiniteCarouselProps,
  VInfiniteCarouselDefaultKeys,
  Record<string, any>,
  VInfiniteCarouselSlots,
  { slide: (direction: 'next' | 'prev') => void }
>
export type VInfiniteCarousel = InstanceType<typeof VInfiniteCarousel>

export {}
