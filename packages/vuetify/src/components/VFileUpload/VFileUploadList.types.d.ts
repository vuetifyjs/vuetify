// Types
import type { StyleValue } from 'vue'
import type { Density } from '@/composables/density.types'
import type { IconValue } from '@/composables/icons.types'
import type { ActiveStrategyProp, ItemsRegistrationType, OpenStrategyProp, SelectStrategyProp } from '@/composables/nested/nested.types'
import type { Variant } from '@/composables/variant.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent, SelectItemKey, ValueComparator } from '@/util/shared.types'

export type VFileUploadListSlots = {
  default: {
    files: readonly File[]
    onClickRemove: (index: number) => void
  }
  item: {
    file: File
    props: { 'onClick:remove': () => void }
  }
}

export interface VFileUploadListProps {
  activatable?: boolean
  activated?: any
  activeClass?: string
  activeColor?: string
  activeStrategy?: ActiveStrategyProp
  baseColor?: string
  bgColor?: string
  border?: string | number | boolean
  class?: any
  clearable?: boolean
  collapseIcon?: IconValue
  color?: string
  density?: Density
  disabled?: boolean
  elevation?: string | number
  expandIcon?: IconValue
  files?: File[]
  filterable?: boolean
  height?: string | number
  hoverElevation?: string | number
  indent?: string | number
  itemChildren?: SelectItemKey
  itemProps?: SelectItemKey
  items?: any[]
  itemsRegistration?: ItemsRegistrationType
  itemTitle?: SelectItemKey
  itemType?: SelectItemKey
  itemValue?: SelectItemKey
  lines?: false | 'one' | 'two' | 'three'
  mandatory?: boolean
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  nav?: boolean
  navigationIndex?: number
  navigationStrategy?: 'focus' | 'track'
  'onClick:open'?: ((args_0: { id: unknown, value: boolean, path: unknown[] }) => void)
  'onClick:select'?: ((args_0: { id: unknown, value: boolean, path: unknown[] }) => void)
  'onUpdate:opened'?: ((args_0: unknown) => void)
  opened?: any
  openStrategy?: OpenStrategyProp
  prependGap?: string | number
  returnObject?: boolean
  rounded?: string | number | boolean
  selectable?: boolean
  selected?: any
  selectStrategy?: SelectStrategyProp
  showSize?: boolean
  slim?: boolean
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
  tile?: boolean
  valueComparator?: ValueComparator
  variant?: Variant
  width?: string | number
}

export type VFileUploadListDefaultKeys =
  | 'activatable'
  | 'border'
  | 'clearable'
  | 'density'
  | 'disabled'
  | 'elevation'
  | 'filterable'
  | 'itemChildren'
  | 'itemProps'
  | 'items'
  | 'itemsRegistration'
  | 'itemTitle'
  | 'itemType'
  | 'itemValue'
  | 'lines'
  | 'mandatory'
  | 'nav'
  | 'navigationStrategy'
  | 'openStrategy'
  | 'returnObject'
  | 'rounded'
  | 'selectable'
  | 'selectStrategy'
  | 'showSize'
  | 'slim'
  | 'style'
  | 'tag'
  | 'tile'
  | 'variant'

export declare const VFileUploadList: VuetifyComponent<
  VFileUploadListProps,
  VFileUploadListDefaultKeys,
  Record<string, any>,
  VFileUploadListSlots
>
export type VFileUploadList = InstanceType<typeof VFileUploadList>
