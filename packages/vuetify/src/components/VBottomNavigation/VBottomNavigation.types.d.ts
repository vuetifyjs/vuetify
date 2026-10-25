// Types
import type { StyleValue } from 'vue'
import type { Density } from '@/composables/density.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export interface VBottomNavigationProps {
  absolute?: boolean
  active?: boolean
  baseColor?: string
  bgColor?: string
  border?: string | number | boolean
  class?: any
  color?: string
  density?: Density
  disabled?: boolean
  elevation?: string | number
  grow?: boolean
  height?: string | number
  hoverElevation?: string | number
  mandatory?: boolean | 'force'
  max?: number
  mode?: string
  modelValue?: any
  multiple?: boolean
  name?: string
  order?: string | number
  rounded?: string | number | boolean
  selectedClass?: string
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
  tile?: boolean
}

type VBottomNavigationDefaultKeys =
  | 'absolute'
  | 'active'
  | 'density'
  | 'disabled'
  | 'grow'
  | 'height'
  | 'modelValue'
  | 'multiple'
  | 'name'
  | 'order'
  | 'rounded'
  | 'selectedClass'
  | 'style'
  | 'tag'
  | 'tile'

export declare const VBottomNavigation: VuetifyComponent<
  VBottomNavigationProps,
  VBottomNavigationDefaultKeys,
  {
    'update:active': (value: any) => true
    'update:modelValue': (value: any) => true
  },
  new <T>(
    props: {
      modelValue?: T
      'onUpdate:modelValue'?: (value: T) => void
    },
    slots: { default: never },
  ) => GenericProps<typeof props, typeof slots>
>
export type VBottomNavigation = InstanceType<typeof VBottomNavigation>

export {}
