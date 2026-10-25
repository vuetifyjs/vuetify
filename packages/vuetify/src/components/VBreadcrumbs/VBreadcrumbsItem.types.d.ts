// Types
import type { StyleValue } from 'vue'
import type { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from 'vue-router'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export interface VBreadcrumbsItemProps {
  active?: boolean
  activeClass?: string
  activeColor?: string
  class?: any
  color?: string
  disabled?: boolean
  exact?: boolean
  href?: string
  maxWidth?: string | number
  replace?: boolean
  style?: StyleValue
  tag?: string | JSXComponent
  title?: string
  to?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
  width?: string | number
}

type VBreadcrumbsItemDefaultKeys =
  | 'active'
  | 'disabled'
  | 'exact'
  | 'replace'
  | 'style'
  | 'tag'

export declare const VBreadcrumbsItem: VuetifyComponent<
  VBreadcrumbsItemProps,
  VBreadcrumbsItemDefaultKeys,
  Record<string, any>
>
export type VBreadcrumbsItem = InstanceType<typeof VBreadcrumbsItem>

export {}
