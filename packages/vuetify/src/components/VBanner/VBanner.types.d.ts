// Types
import type { StyleValue } from 'vue'
import type { Density } from '@/composables/density.types'
import type { DisplayBreakpoint } from '@/composables/display.types'
import type { IconValue } from '@/composables/icons.types'
import type { Anchor } from '@/util/anchor.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VBannerSlots = {
  default: never
  prepend: never
  text: never
  actions: never
}

export interface VBannerProps {
  avatar?: string
  bgColor?: string
  border?: string | number | boolean
  class?: any
  color?: string
  density?: Density
  elevation?: string | number
  height?: string | number
  hoverElevation?: string | number
  icon?: IconValue
  lines?: 'one' | 'two' | 'three'
  location?: Anchor | null
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  mobile?: boolean | null
  mobileBreakpoint?: number | DisplayBreakpoint
  position?: 'fixed' | 'relative' | 'absolute' | 'static' | 'sticky'
  rounded?: string | number | boolean
  stacked?: boolean
  sticky?: boolean
  style?: StyleValue
  tag?: string | JSXComponent
  text?: string
  theme?: string
  tile?: boolean
  width?: string | number
}

export type VBannerDefaultKeys =
  | 'density'
  | 'mobile'
  | 'rounded'
  | 'stacked'
  | 'sticky'
  | 'style'
  | 'tag'
  | 'tile'

export declare const VBanner: VuetifyComponent<
  VBannerProps,
  VBannerDefaultKeys,
  Record<string, any>,
  VBannerSlots
>
export type VBanner = InstanceType<typeof VBanner>
