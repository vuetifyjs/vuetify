// Types
import type { StyleValue } from 'vue'
import type { Density, VToolbarSlots } from '@/components/VToolbar/VToolbar.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export interface VAppBarProps {
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
  location?: 'top' | 'bottom'
  modelValue?: boolean
  name?: string
  order?: string | number
  rounded?: string | number | boolean
  scrollBehavior?: (string & {}) | 'hide' | 'fully-hide' | 'inverted' | 'collapse' | 'elevate' | 'fade-image'
  scrollTarget?: string
  scrollThreshold?: string | number
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
  tile?: boolean
  title?: string
}

type VAppBarDefaultKeys =
  | 'absolute'
  | 'collapse'
  | 'collapsePosition'
  | 'density'
  | 'extended'
  | 'extensionHeight'
  | 'flat'
  | 'floating'
  | 'height'
  | 'location'
  | 'modelValue'
  | 'order'
  | 'rounded'
  | 'scrollThreshold'
  | 'style'
  | 'tag'
  | 'tile'

export declare const VAppBar: VuetifyComponent<
  VAppBarProps,
  VAppBarDefaultKeys,
  {
    'update:modelValue': (value: boolean) => true
  },
  VToolbarSlots
>
export type VAppBar = InstanceType<typeof VAppBar>

export {}
