// Types
import type { StyleValue } from 'vue'
import type { IconValue } from '@/composables/icons.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VEmptyStateSlots = {
  actions: {
    props: {
      onClick: (e: Event) => void
    }
  }
  default: never
  headline: never
  title: never
  media: never
  text: never
}

export interface VEmptyStateProps {
  actionText?: string
  bgColor?: string
  class?: any
  color?: string
  headline?: string
  height?: string | number
  href?: string
  icon?: IconValue
  image?: string
  justify?: 'start' | 'end' | 'center'
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  size?: string | number
  style?: StyleValue
  text?: string
  textWidth?: string | number
  theme?: string
  title?: string
  to?: string
  width?: string | number
}

type VEmptyStateDefaultKeys =
  | 'justify'
  | 'size'
  | 'style'
  | 'textWidth'

export declare const VEmptyState: VuetifyComponent<
  VEmptyStateProps,
  VEmptyStateDefaultKeys,
  {
    'click:action': (e: Event) => true
  },
  VEmptyStateSlots
>
export type VEmptyState = InstanceType<typeof VEmptyState>

export {}
