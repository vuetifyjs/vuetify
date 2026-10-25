// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export interface VFooterProps {
  absolute?: boolean
  app?: boolean
  border?: string | number | boolean
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
}

type VFooterDefaultKeys =
  | 'absolute'
  | 'app'
  | 'height'
  | 'order'
  | 'rounded'
  | 'style'
  | 'tag'
  | 'tile'

export declare const VFooter: VuetifyComponent<
  VFooterProps,
  VFooterDefaultKeys,
  Record<string, any>
>
export type VFooter = InstanceType<typeof VFooter>

export {}
