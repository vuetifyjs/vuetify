// Types
import type { StyleValue } from 'vue'
import type { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from 'vue-router'
import type { Density } from '@/composables/density.types'
import type { GroupItemProvide } from '@/composables/group.types'
import type { IconValue } from '@/composables/icons.types'
import type { Variant } from '@/composables/variant.types'
import type { Anchor } from '@/util/anchor.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VBtnSlots = {
  default: never
  prepend: never
  append: never
  loader: never
}

export interface VBtnProps {
  active?: boolean
  activeColor?: string
  appendIcon?: IconValue
  baseColor?: string
  block?: boolean
  border?: string | number | boolean
  class?: any
  color?: string
  density?: Density
  disabled?: boolean
  elevation?: string | number
  exact?: boolean
  flat?: boolean
  height?: string | number
  hoverElevation?: string | number
  href?: string
  icon?: boolean | IconValue
  loading?: string | boolean
  location?: Anchor | null
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  position?: 'fixed' | 'relative' | 'absolute' | 'static' | 'sticky'
  prependIcon?: IconValue
  readonly?: boolean
  replace?: boolean
  ripple?: boolean | { class?: string | undefined, keys?: string[] | undefined }
  rounded?: string | number | boolean
  selectedClass?: string
  size?: string | number
  slim?: boolean
  spaced?: 'start' | 'end' | 'both'
  stacked?: boolean
  style?: StyleValue
  symbol?: any
  tag?: string | JSXComponent
  text?: string | number | boolean
  theme?: string
  tile?: boolean
  to?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
  value?: any
  variant?: Variant
  width?: string | number
}

type VBtnDefaultKeys =
  | 'active'
  | 'block'
  | 'density'
  | 'disabled'
  | 'exact'
  | 'flat'
  | 'readonly'
  | 'replace'
  | 'ripple'
  | 'rounded'
  | 'size'
  | 'slim'
  | 'stacked'
  | 'style'
  | 'symbol'
  | 'tag'
  | 'text'
  | 'tile'
  | 'variant'

export declare const VBtn: VuetifyComponent<
  VBtnProps,
  VBtnDefaultKeys,
  {
    'group:selected': (val: { value: boolean }) => true
  },
  VBtnSlots,
  { group: GroupItemProvide | null }
>
export type VBtn = InstanceType<typeof VBtn>

export {}
