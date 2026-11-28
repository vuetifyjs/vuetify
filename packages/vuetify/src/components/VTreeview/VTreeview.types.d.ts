// Types
import type { IgnoreAccents } from '@vuetify/v0'
import type { StyleValue } from 'vue'
import type { VTreeviewChildrenSlots } from '@/components/VTreeview/VTreeviewChildren.types'
import type { Density } from '@/composables/density.types'
import type { FilterFunction, FilterKeyFunctions, FilterKeys, FilterMode } from '@/composables/filter.types'
import type { IconValue } from '@/composables/icons.types'
import type { ActiveStrategyProp, ItemsRegistrationType, SelectStrategyProp } from '@/composables/nested/nested.types'
import type { Variant } from '@/composables/variant.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { IndentLinesVariant } from '@/util/indentLines.types'
import type { JSXComponent, SelectItemKey, ValueComparator } from '@/util/shared.types'

export interface VTreeviewProps {
  activatable?: boolean
  activated?: any
  activeClass?: string
  activeColor?: string
  activeStrategy?: ActiveStrategyProp
  baseColor?: string
  bgColor?: string
  border?: string | number | boolean
  class?: any
  collapseIcon?: IconValue
  color?: string
  customFilter?: FilterFunction
  customKeyFilter?: FilterKeyFunctions
  density?: Density
  disabled?: boolean
  elevation?: string | number
  expandIcon?: IconValue
  falseIcon?: IconValue
  filterable?: boolean
  filterKeys?: FilterKeys
  filterMode?: FilterMode
  fluid?: boolean
  height?: string | number
  hideActions?: boolean
  hideNoData?: boolean
  hoverElevation?: string | number
  ignoreAccents?: IgnoreAccents
  indent?: string | number
  indentLines?: boolean | IndentLinesVariant
  indentLinesColor?: string
  indentLinesOpacity?: string | number
  indeterminateIcon?: IconValue
  itemChildren?: SelectItemKey
  itemProps?: SelectItemKey
  items?: any[]
  itemsRegistration?: ItemsRegistrationType
  itemTitle?: SelectItemKey
  itemType?: SelectItemKey
  itemValue?: SelectItemKey
  lines?: false | 'one' | 'two' | 'three'
  loadChildren?: ((item: unknown) => Promise<void>)
  loadingIcon?: string
  mandatory?: boolean
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  modelValue?: unknown[]
  navigationIndex?: number
  navigationStrategy?: 'focus' | 'track'
  noDataText?: string
  noFilter?: boolean
  'onClick:open'?: ((args_0: { id: unknown, value: boolean, path: unknown[] }) => void)
  'onClick:select'?: ((args_0: { id: unknown, value: boolean, path: unknown[] }) => void)
  'onUpdate:opened'?: ((args_0: unknown) => void)
  openAll?: boolean
  opened?: any
  openOnClick?: boolean
  prependGap?: string | number
  returnObject?: boolean
  rounded?: string | number | boolean
  search?: string
  selectable?: boolean
  selected?: any
  selectedColor?: string
  selectStrategy?: SelectStrategyProp
  separateRoots?: boolean
  slim?: boolean
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
  tile?: boolean
  trueIcon?: IconValue
  valueComparator?: ValueComparator
  variant?: Variant
  width?: string | number
}

type VTreeviewDefaultKeys =
  | 'activatable'
  | 'collapseIcon'
  | 'density'
  | 'disabled'
  | 'expandIcon'
  | 'filterable'
  | 'filterKeys'
  | 'filterMode'
  | 'fluid'
  | 'hideActions'
  | 'hideNoData'
  | 'indeterminateIcon'
  | 'itemChildren'
  | 'itemProps'
  | 'items'
  | 'itemsRegistration'
  | 'itemTitle'
  | 'itemType'
  | 'itemValue'
  | 'lines'
  | 'loadingIcon'
  | 'mandatory'
  | 'navigationStrategy'
  | 'noDataText'
  | 'noFilter'
  | 'openAll'
  | 'openOnClick'
  | 'returnObject'
  | 'rounded'
  | 'selectable'
  | 'selectStrategy'
  | 'separateRoots'
  | 'slim'
  | 'style'
  | 'tag'
  | 'tile'
  | 'variant'

export declare const VTreeview: VuetifyComponent<
  VTreeviewProps,
  VTreeviewDefaultKeys,
  {
    'update:opened': (val: unknown) => true
    'update:activated': (val: unknown) => true
    'update:selected': (val: unknown) => true
    'update:modelValue': (val: unknown) => true
    'click:open': (value: { id: unknown, value: boolean, path: unknown[] }) => true
    'click:select': (value: { id: unknown, value: boolean, path: unknown[] }) => true
  },
  new <T, O, A, S, M>(
    props: {
      items?: T[]
      opened?: O
      activated?: A
      selected?: S
      modelValue?: M
      'onUpdate:opened'?: (value: O) => void
      'onUpdate:activated'?: (value: A) => void
      'onUpdate:selected'?: (value: S) => void
      'onUpdate:modelValue'?: (value: M) => void
    },
    slots: VTreeviewChildrenSlots<T> & {
      'no-data': never
    }
  ) => GenericProps<typeof props, typeof slots>
>
export type VTreeview = InstanceType<typeof VTreeview>

export {}
