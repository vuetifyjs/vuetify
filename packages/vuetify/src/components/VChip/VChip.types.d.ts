// Types
import type { StyleValue } from 'vue'
import type { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from 'vue-router'
import type { Density } from '@/composables/density.types'
import type { IconValue } from '@/composables/icons.types'
import type { Variant } from '@/composables/variant.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VChipSlots = {
  default: {
    isSelected: boolean | undefined
    selectedClass: boolean | (string | undefined)[] | undefined
    select: ((value: boolean) => void) | undefined
    toggle: (() => void) | undefined
    value: unknown
    disabled: boolean
  }
  label: never
  prepend: never
  append: never
  close: never
  filter: never
}

export interface VChipProps {
  activeClass?: string
  appendAvatar?: string
  appendIcon?: IconValue
  baseColor?: string
  border?: string | number | boolean
  class?: any
  closable?: boolean
  closeIcon?: IconValue
  closeLabel?: string
  color?: string
  density?: Density
  disabled?: boolean
  draggable?: boolean
  elevation?: string | number
  exact?: boolean
  filter?: boolean
  filterIcon?: IconValue
  hoverElevation?: string | number
  href?: string
  label?: boolean
  link?: boolean
  modelValue?: boolean
  onClick?: ((args_0: MouseEvent) => void)
  onClickOnce?: ((args_0: MouseEvent) => void)
  pill?: boolean
  prependAvatar?: string
  prependIcon?: IconValue
  replace?: boolean
  ripple?: boolean | { class?: string | undefined, keys?: string[] | undefined }
  rounded?: string | number | boolean
  selectedClass?: string
  size?: string | number
  style?: StyleValue
  tag?: string | JSXComponent
  text?: string | number | boolean
  theme?: string
  tile?: boolean
  to?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
  value?: any
  variant?: Variant
}

type VChipDefaultKeys =
  | 'closable'
  | 'closeIcon'
  | 'closeLabel'
  | 'density'
  | 'disabled'
  | 'draggable'
  | 'exact'
  | 'filter'
  | 'filterIcon'
  | 'label'
  | 'link'
  | 'modelValue'
  | 'pill'
  | 'replace'
  | 'ripple'
  | 'rounded'
  | 'size'
  | 'style'
  | 'tag'
  | 'text'
  | 'tile'
  | 'variant'

export declare const VChip: VuetifyComponent<
  VChipProps,
  VChipDefaultKeys,
  {
    'click:close': (e: MouseEvent) => true
    'update:modelValue': (value: boolean) => true
    'group:selected': (val: { value: boolean }) => true
    click: (e: MouseEvent | KeyboardEvent) => true
  },
  VChipSlots
>
export type VChip = InstanceType<typeof VChip>

export {}
