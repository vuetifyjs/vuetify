// Types
import type { StyleValue } from 'vue'
import type { Density } from '@/composables/density.types'
import type { Variant } from '@/composables/variant.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export interface VBtnGroupProps {
  baseColor?: string
  border?: string | number | boolean
  class?: any
  color?: string
  connected?: boolean
  density?: Density
  direction?: 'horizontal' | 'vertical'
  divided?: boolean
  elevation?: string | number
  hoverElevation?: string | number
  rounded?: string | number | boolean
  size?: string | number
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
  tile?: boolean
  variant?: Variant
}

type VBtnGroupDefaultKeys =
  | 'connected'
  | 'density'
  | 'direction'
  | 'divided'
  | 'rounded'
  | 'size'
  | 'style'
  | 'tag'
  | 'tile'
  | 'variant'

export declare const VBtnGroup: VuetifyComponent<
  VBtnGroupProps,
  VBtnGroupDefaultKeys,
  Record<string, any>
>
export type VBtnGroup = InstanceType<typeof VBtnGroup>

export {}
