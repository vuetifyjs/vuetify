// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export interface VKbdProps {
  border?: string | number | boolean
  class?: any
  color?: string
  elevation?: string | number
  hoverElevation?: string | number
  rounded?: string | number | boolean
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
  tile?: boolean
}

type VKbdDefaultKeys =
  | 'rounded'
  | 'style'
  | 'tag'
  | 'tile'

export declare const VKbd: VuetifyComponent<
  VKbdProps,
  VKbdDefaultKeys,
  Record<string, any>
>
export type VKbd = InstanceType<typeof VKbd>

export {}
