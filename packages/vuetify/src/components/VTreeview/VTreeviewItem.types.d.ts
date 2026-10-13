// Types
import type { StyleValue } from 'vue'
import type { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from 'vue-router'
import type { VListItem, VListItemSlots } from '@/components/VList/VListItem.types'
import type { ToggleListItemSlot } from '@/components/VTreeview/shared.types'
import type { Density } from '@/composables/density.types'
import type { ForwardRefs } from '@/composables/forwardRefs.types'
import type { IconValue } from '@/composables/icons.types'
import type { Variant } from '@/composables/variant.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { IndentLineType } from '@/util/indentLines.types'
import type { JSXComponent } from '@/util/shared.types'

export type VTreeviewItemSlots = VListItemSlots & {
  toggle: ToggleListItemSlot & { loading: boolean }
}

export interface VTreeviewItemProps {
  active?: boolean
  activeClass?: string
  activeColor?: string
  appendAvatar?: string
  appendIcon?: IconValue
  baseColor?: string
  border?: string | number | boolean
  class?: any
  color?: string
  density?: Density
  disabled?: boolean
  elevation?: string | number
  exact?: boolean
  hasCustomPrepend?: boolean
  height?: string | number
  hideActions?: boolean
  hoverElevation?: string | number
  href?: string
  indentLines?: IndentLineType[]
  index?: number
  lines?: false | 'one' | 'two' | 'three'
  link?: boolean
  loading?: boolean
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  nav?: boolean
  onClick?: ((args_0: MouseEvent | KeyboardEvent) => void)
  onClickOnce?: ((args_0: MouseEvent) => void)
  prependAvatar?: string
  prependGap?: string | number
  prependIcon?: IconValue
  replace?: boolean
  ripple?: boolean | { class?: string | undefined, keys?: string[] | undefined }
  rounded?: string | number | boolean
  slim?: boolean
  style?: StyleValue
  subtitle?: string | number | boolean
  tabindex?: string | number
  tag?: string | JSXComponent
  theme?: string
  tile?: boolean
  title?: string | number | boolean
  to?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
  toggleIcon?: IconValue
  value?: any
  variant?: Variant
  width?: string | number
}

export type VTreeviewItemDefaultKeys =
  | 'active'
  | 'density'
  | 'disabled'
  | 'exact'
  | 'hasCustomPrepend'
  | 'hideActions'
  | 'link'
  | 'loading'
  | 'nav'
  | 'replace'
  | 'ripple'
  | 'rounded'
  | 'slim'
  | 'style'
  | 'subtitle'
  | 'tag'
  | 'tile'
  | 'title'
  | 'variant'

export declare const VTreeviewItem: VuetifyComponent<
  VTreeviewItemProps,
  VTreeviewItemDefaultKeys,
  {
    toggleExpand: (value: PointerEvent) => true
  },
  VTreeviewItemSlots,
  ForwardRefs<{}, [VListItem]>
>
export type VTreeviewItem = InstanceType<typeof VTreeviewItem>
