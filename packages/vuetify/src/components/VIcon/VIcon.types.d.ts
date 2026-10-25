// Types
import type { StyleValue } from 'vue'
import type { IconValue } from '@/composables/icons.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export interface VIconProps {
  class?: any
  color?: string
  disabled?: boolean
  end?: boolean
  icon?: IconValue
  opacity?: string | number
  size?: string | number
  start?: boolean
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
}

type VIconDefaultKeys =
  | 'disabled'
  | 'end'
  | 'size'
  | 'start'
  | 'style'
  | 'tag'

export declare const VIcon: VuetifyComponent<
  VIconProps,
  VIconDefaultKeys,
  Record<string, any>
>
export type VIcon = InstanceType<typeof VIcon>

export {}
