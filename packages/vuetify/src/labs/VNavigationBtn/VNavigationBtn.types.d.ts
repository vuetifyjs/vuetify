// Types
import type { StyleValue } from 'vue'
import type { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from 'vue-router'
import type { GroupItemProvide } from '@/composables/group.types'
import type { IconValue } from '@/composables/icons.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VNavigationBtnSlots = {
  default: never
  badge: never
  icon: { isActive: boolean }
}

export interface VNavigationBtnProps {
  active?: boolean
  activeIcon?: IconValue
  badge?: boolean | number | string | Record<string, any>
  baseColor?: string
  class?: any
  color?: string
  disabled?: boolean
  exact?: boolean
  href?: string
  icon?: IconValue
  labels?: 'always' | 'selected' | 'none'
  replace?: boolean
  rounded?: string | number | boolean
  selectedClass?: string
  stacked?: boolean
  style?: StyleValue
  tag?: string | JSXComponent
  text?: string | number
  tile?: boolean
  to?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
  value?: any
}

type VNavigationBtnDefaultKeys =
  | 'active'
  | 'badge'
  | 'disabled'
  | 'exact'
  | 'labels'
  | 'replace'
  | 'rounded'
  | 'stacked'
  | 'style'
  | 'tag'
  | 'tile'

export declare const VNavigationBtn: VuetifyComponent<
  VNavigationBtnProps,
  VNavigationBtnDefaultKeys,
  {
    'group:selected': (val: { value: boolean }) => true
  },
  VNavigationBtnSlots,
  { group: GroupItemProvide | null }
>
export type VNavigationBtn = InstanceType<typeof VNavigationBtn>

export {}
