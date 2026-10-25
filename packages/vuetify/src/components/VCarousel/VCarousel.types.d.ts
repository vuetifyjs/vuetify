// Types
import type { VWindow, VWindowEmits, VWindowProps, VWindowSlots } from '@/components/VWindow/VWindow.types'
import type { IconValue } from '@/composables/icons.types'
import type { DefaultKeysOf, GenericProps, VuetifyComponent } from '@/util/defineComponent.types'

export interface VCarouselProps<T = any> extends VWindowProps<T> {
  color?: string
  cycle?: boolean
  delimiterIcon?: IconValue
  height?: number | string
  hideDelimiterBackground?: boolean
  hideDelimiters?: boolean
  interval?: number | string
  pauseOnHover?: boolean
  progress?: string | boolean
  verticalDelimiters?: boolean | 'left' | 'right'
}

type VCarouselDefaultKeys =
  | DefaultKeysOf<typeof VWindow>
  | 'cycle'
  | 'delimiterIcon'
  | 'height'
  | 'hideDelimiterBackground'
  | 'hideDelimiters'
  | 'interval'
  | 'pauseOnHover'
  | 'showArrows'

export type VCarouselSlots = Omit<VWindowSlots, 'additional'> & {
  item: {
    props: Record<string, any>
    item: {
      id: string
      value: unknown
      disabled: boolean | undefined
    }
  }
}

export declare const VCarousel: VuetifyComponent<
  VCarouselProps,
  VCarouselDefaultKeys,
  VWindowEmits,
  new <T>(
    props: {
      modelValue?: T
      'onUpdate:modelValue'?: (value: T) => void
    },
    slots: VCarouselSlots,
  ) => GenericProps<typeof props, typeof slots>
>
export type VCarousel = InstanceType<typeof VCarousel>

export {}
