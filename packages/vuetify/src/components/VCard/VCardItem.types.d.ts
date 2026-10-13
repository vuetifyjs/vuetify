// Types
import type { StyleValue } from 'vue'
import type { Density } from '@/composables/density.types'
import type { IconValue } from '@/composables/icons.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VCardItemSlots = {
  default: never
  prepend: never
  append: never
  title: never
  subtitle: never
}

export interface VCardItemProps {
  appendAvatar?: string
  appendIcon?: IconValue
  class?: any
  density?: Density
  prependAvatar?: string
  prependIcon?: IconValue
  style?: StyleValue
  subtitle?: string | number | boolean
  tag?: string | JSXComponent
  title?: string | number | boolean
}

export type VCardItemDefaultKeys =
  | 'density'
  | 'style'
  | 'subtitle'
  | 'tag'
  | 'title'

export declare const VCardItem: VuetifyComponent<
  VCardItemProps,
  VCardItemDefaultKeys,
  Record<string, any>,
  VCardItemSlots
>
export type VCardItem = InstanceType<typeof VCardItem>
