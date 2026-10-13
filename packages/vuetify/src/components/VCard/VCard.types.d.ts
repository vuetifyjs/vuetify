// Types
import type { StyleValue } from 'vue'
import type { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from 'vue-router'
import type { VCardItemSlots } from '@/components/VCard/VCardItem.types'
import type { Density } from '@/composables/density.types'
import type { IconValue } from '@/composables/icons.types'
import type { LoaderSlotProps } from '@/composables/loader.types'
import type { Variant } from '@/composables/variant.types'
import type { Anchor } from '@/util/anchor.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VCardSlots = VCardItemSlots & {
  default: never
  actions: never
  text: never
  loader: LoaderSlotProps
  image: never
  item: never
}

export interface VCardProps {
  appendAvatar?: string
  appendIcon?: IconValue
  border?: string | number | boolean
  class?: any
  color?: string
  density?: Density
  disabled?: boolean
  elevation?: string | number
  exact?: boolean
  flat?: boolean
  height?: string | number
  hover?: boolean
  hoverElevation?: string | number
  href?: string
  image?: string
  link?: boolean
  loading?: string | boolean
  location?: Anchor | null
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  position?: 'fixed' | 'relative' | 'absolute' | 'static' | 'sticky'
  prependAvatar?: string
  prependIcon?: IconValue
  replace?: boolean
  ripple?: boolean | { class?: string | undefined, keys?: string[] | undefined }
  rounded?: string | number | boolean
  style?: StyleValue
  subtitle?: string | number | boolean
  tag?: string | JSXComponent
  text?: string | number | boolean
  theme?: string
  tile?: boolean
  title?: string | number | boolean
  to?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
  variant?: Variant
  width?: string | number
}

export type VCardDefaultKeys =
  | 'density'
  | 'disabled'
  | 'exact'
  | 'flat'
  | 'hover'
  | 'link'
  | 'replace'
  | 'ripple'
  | 'rounded'
  | 'style'
  | 'subtitle'
  | 'tag'
  | 'text'
  | 'tile'
  | 'title'
  | 'variant'

export declare const VCard: VuetifyComponent<
  VCardProps,
  VCardDefaultKeys,
  Record<string, any>,
  VCardSlots
>
export type VCard = InstanceType<typeof VCard>
