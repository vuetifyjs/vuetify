// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export interface VSystemBarProps {
  absolute?: boolean
  class?: any
  color?: string
  elevation?: string | number
  height?: string | number
  hoverElevation?: string | number
  name?: string
  order?: string | number
  rounded?: string | number | boolean
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
  tile?: boolean
  window?: boolean
}

export type VSystemBarDefaultKeys =
  | 'absolute'
  | 'order'
  | 'rounded'
  | 'style'
  | 'tag'
  | 'tile'
  | 'window'

export declare const VSystemBar: VuetifyComponent<
  VSystemBarProps,
  VSystemBarDefaultKeys,
  Record<string, any>
>
export type VSystemBar = InstanceType<typeof VSystemBar>
