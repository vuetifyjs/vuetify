// Types
import type { ShallowRef, StyleValue } from 'vue'
import type { DisplayBreakpoint } from '@/composables/display.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VNavigationDrawerSlots = {
  default: never
  prepend: never
  append: never
  image: VNavigationDrawerImageSlot
}

export type VNavigationDrawerImageSlot = {
  image: string | undefined
}

export interface VNavigationDrawerProps {
  absolute?: boolean
  border?: string | number | boolean
  captureFocus?: boolean
  class?: any
  closeDelay?: string | number
  color?: string
  disableResizeWatcher?: boolean
  disableRouteWatcher?: boolean
  elevation?: string | number
  expanded?: boolean
  expandOnHover?: boolean
  floating?: boolean
  hoverElevation?: string | number
  image?: string
  location?: 'top' | 'left' | 'right' | 'bottom' | 'start' | 'end'
  mobile?: boolean | null
  mobileBreakpoint?: number | DisplayBreakpoint
  modal?: boolean
  modelValue?: boolean | null
  name?: string
  openDelay?: string | number
  order?: string | number
  permanent?: boolean
  persistent?: boolean
  rail?: boolean | null
  railWidth?: string | number
  retainFocus?: boolean
  rounded?: string | number | boolean
  scrim?: string | boolean
  sticky?: boolean
  style?: StyleValue
  tag?: string | JSXComponent
  temporary?: boolean
  theme?: string
  tile?: boolean
  touchless?: boolean
  width?: string | number
}

export type VNavigationDrawerDefaultKeys =
  | 'absolute'
  | 'captureFocus'
  | 'disableResizeWatcher'
  | 'disableRouteWatcher'
  | 'expanded'
  | 'expandOnHover'
  | 'floating'
  | 'location'
  | 'mobile'
  | 'modal'
  | 'modelValue'
  | 'order'
  | 'permanent'
  | 'persistent'
  | 'rail'
  | 'railWidth'
  | 'retainFocus'
  | 'rounded'
  | 'scrim'
  | 'sticky'
  | 'style'
  | 'tag'
  | 'temporary'
  | 'tile'
  | 'touchless'
  | 'width'

export declare const VNavigationDrawer: VuetifyComponent<
  VNavigationDrawerProps,
  VNavigationDrawerDefaultKeys,
  {
    'update:modelValue': (val: boolean) => true
    'update:rail': (val: boolean) => true
    'update:expanded': (val: boolean) => true
  },
  VNavigationDrawerSlots,
  { isStuck: ShallowRef<boolean | 'top' | 'bottom', boolean | 'top' | 'bottom'> }
>
export type VNavigationDrawer = InstanceType<typeof VNavigationDrawer>
