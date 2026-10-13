// Types
import type { StyleValue } from 'vue'
import type { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from 'vue-router'
import type { VListItemSlots } from '@/components/VList/VListItem.types'
import type { Density } from '@/composables/density.types'
import type { IconValue } from '@/composables/icons.types'
import type { Variant } from '@/composables/variant.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VFileUploadItemSlots = {
  clear: {
    props: { onClick: () => void }
  }
} & VListItemSlots

export interface VFileUploadItemProps {
  active?: boolean
  activeClass?: string
  activeColor?: string
  appendAvatar?: string
  appendIcon?: IconValue
  baseColor?: string
  border?: string | number | boolean
  class?: any
  clearable?: boolean
  color?: string
  density?: Density
  disabled?: boolean
  elevation?: string | number
  exact?: boolean
  file?: File
  fileIcon?: string
  height?: string | number
  hoverElevation?: string | number
  href?: string
  index?: number
  lines?: false | 'one' | 'two' | 'three'
  link?: boolean
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
  showSize?: boolean
  slim?: boolean
  style?: StyleValue
  subtitle?: string | number | boolean
  tabindex?: string | number
  tag?: string | JSXComponent
  theme?: string
  tile?: boolean
  title?: string | number | boolean
  to?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
  value?: any
  variant?: Variant
  width?: string | number
}

export type VFileUploadItemDefaultKeys =
  | 'active'
  | 'border'
  | 'clearable'
  | 'density'
  | 'disabled'
  | 'exact'
  | 'file'
  | 'fileIcon'
  | 'lines'
  | 'link'
  | 'nav'
  | 'replace'
  | 'ripple'
  | 'rounded'
  | 'showSize'
  | 'slim'
  | 'style'
  | 'subtitle'
  | 'tag'
  | 'tile'
  | 'title'
  | 'variant'

export declare const VFileUploadItem: VuetifyComponent<
  VFileUploadItemProps,
  VFileUploadItemDefaultKeys,
  {
    'click:remove': () => true
    click: (e: MouseEvent | KeyboardEvent) => true
  },
  VFileUploadItemSlots
>
export type VFileUploadItem = InstanceType<typeof VFileUploadItem>
