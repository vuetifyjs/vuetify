// Types
import type { ComputedRef, StyleValue } from 'vue'
import type { Anchor } from '@/util/anchor.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type Density = null | 'prominent' | 'default' | 'comfortable' | 'compact'

export type VToolbarSlots = {
  default: never
  image: never
  prepend: never
  append: never
  title: never
  extension: never
}

export interface VToolbarProps {
  absolute?: boolean
  border?: string | number | boolean
  class?: any
  collapse?: boolean
  collapsePosition?: 'start' | 'end'
  color?: string
  density?: Density
  elevation?: string | number
  extended?: boolean
  extensionHeight?: string | number
  flat?: boolean
  floating?: boolean
  height?: string | number
  hoverElevation?: string | number
  image?: string
  location?: Anchor | null
  rounded?: string | number | boolean
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
  tile?: boolean
  title?: string
}

type VToolbarDefaultKeys =
  | 'absolute'
  | 'collapse'
  | 'collapsePosition'
  | 'density'
  | 'extended'
  | 'extensionHeight'
  | 'flat'
  | 'floating'
  | 'height'
  | 'rounded'
  | 'style'
  | 'tag'
  | 'tile'

export declare const VToolbar: VuetifyComponent<
  VToolbarProps,
  VToolbarDefaultKeys,
  Record<string, any>,
  VToolbarSlots,
  { contentHeight: ComputedRef<number>, extensionHeight: ComputedRef<number> }
>
export type VToolbar = InstanceType<typeof VToolbar>

export {}
