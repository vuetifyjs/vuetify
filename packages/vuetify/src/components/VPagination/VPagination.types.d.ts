// Types
import type { StyleValue } from 'vue'
import type { Density } from '@/composables/density.types'
import type { IconValue } from '@/composables/icons.types'
import type { Variant } from '@/composables/variant.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VPaginationSlots = {
  item: ItemSlot
  first: ControlSlot
  prev: ControlSlot
  next: ControlSlot
  last: ControlSlot
}

export type ItemSlot = {
  isActive: boolean
  key: string | number
  page: string
  props: Record<string, any>
}

export type ControlSlot = {
  icon: IconValue
  onClick: (e: Event) => void
  disabled: boolean
  'aria-label': string
  'aria-disabled': boolean
}

export interface VPaginationProps {
  activeColor?: string
  ariaLabel?: string
  border?: string | number | boolean
  class?: any
  color?: string
  currentPageAriaLabel?: string
  density?: Density
  disabled?: boolean
  elevation?: string | number
  ellipsis?: string
  firstAriaLabel?: string
  firstIcon?: IconValue
  hoverElevation?: string | number
  lastAriaLabel?: string
  lastIcon?: IconValue
  length?: string | number
  modelValue?: number
  nextAriaLabel?: string
  nextIcon?: IconValue
  pageAriaLabel?: string
  prevIcon?: IconValue
  previousAriaLabel?: string
  rounded?: string | number | boolean
  showFirstLastPage?: boolean | 'only-first'
  size?: string | number
  start?: string | number
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
  tile?: boolean
  totalVisible?: string | number
  variant?: Variant
}

type VPaginationDefaultKeys =
  | 'ariaLabel'
  | 'currentPageAriaLabel'
  | 'density'
  | 'disabled'
  | 'ellipsis'
  | 'firstAriaLabel'
  | 'firstIcon'
  | 'lastAriaLabel'
  | 'lastIcon'
  | 'length'
  | 'modelValue'
  | 'nextAriaLabel'
  | 'nextIcon'
  | 'pageAriaLabel'
  | 'prevIcon'
  | 'previousAriaLabel'
  | 'rounded'
  | 'showFirstLastPage'
  | 'size'
  | 'start'
  | 'style'
  | 'tag'
  | 'tile'
  | 'variant'

export declare const VPagination: VuetifyComponent<
  VPaginationProps,
  VPaginationDefaultKeys,
  {
    'update:modelValue': (value: number) => true
    first: (value: number) => true
    prev: (value: number) => true
    next: (value: number) => true
    last: (value: number) => true
  },
  VPaginationSlots
>
export type VPagination = InstanceType<typeof VPagination>

export {}
