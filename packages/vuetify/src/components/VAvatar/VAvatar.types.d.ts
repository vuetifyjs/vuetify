// Types
import type { StyleValue } from 'vue'
import type { VBadge } from '@/components/VBadge/VBadge.types'
import type { Density } from '@/composables/density.types'
import type { IconValue } from '@/composables/icons.types'
import type { Variant } from '@/composables/variant.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VAvatarSlots = {
  default: never
  badge: never
}

export interface VAvatarProps {
  badge?: boolean | VBadge['$props']
  border?: string | number | boolean
  class?: any
  color?: string
  density?: Density
  end?: boolean
  icon?: IconValue
  image?: string
  rounded?: string | number | boolean
  size?: string | number
  start?: boolean
  style?: StyleValue
  tag?: string | JSXComponent
  text?: string
  theme?: string
  tile?: boolean
  variant?: Variant
}

export type VAvatarDefaultKeys =
  | 'badge'
  | 'density'
  | 'end'
  | 'rounded'
  | 'size'
  | 'start'
  | 'style'
  | 'tag'
  | 'tile'
  | 'variant'

export declare const VAvatar: VuetifyComponent<
  VAvatarProps,
  VAvatarDefaultKeys,
  Record<string, any>,
  VAvatarSlots
>
export type VAvatar = InstanceType<typeof VAvatar>
