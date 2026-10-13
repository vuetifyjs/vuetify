// Types
import type { Ref, StyleValue } from 'vue'
import type { VListItemSlots } from './VListItem.types'
import type { Density } from '@/composables/density.types'
import type { IconValue } from '@/composables/icons.types'
import type { ListItem } from '@/composables/list-items.types'
import type { ActiveStrategyProp, ItemsRegistrationType, OpenStrategyProp, SelectStrategyProp } from '@/composables/nested/nested.types'
import type { Variant } from '@/composables/variant.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { ClassValue, JSXComponent, SelectItemKey, ValueComparator } from '@/util/shared.types'

type ListClickEvent = { id: unknown, value: boolean, path: unknown[] }

export interface VListProps {
  activatable?: boolean
  activated?: any
  activeClass?: string
  activeColor?: string
  activeStrategy?: ActiveStrategyProp
  baseColor?: string
  bgColor?: string
  border?: string | number | boolean
  class?: ClassValue
  collapseIcon?: IconValue
  color?: string
  density?: Density
  disabled?: boolean
  elevation?: string | number
  expandIcon?: IconValue
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
  'onClick:open'?: (value: ListClickEvent) => void
  'onClick:select'?: (value: ListClickEvent) => void
  'onUpdate:opened'?: (value: unknown) => void
  opened?: any
  openStrategy?: OpenStrategyProp
  prependGap?: string | number
  returnObject?: boolean
  rounded?: string | number | boolean
  selectable?: boolean
  selected?: any
  selectStrategy?: SelectStrategyProp
  slim?: boolean
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
  tile?: boolean
  valueComparator?: ValueComparator
  variant?: Variant
  width?: string | number
}

export type VListDefaultKeys =
  | 'activatable'
  | 'density'
  | 'disabled'
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
  | 'slim'
  | 'style'
  | 'tag'
  | 'tile'
  | 'variant'

export interface InternalListItem<T = any> extends ListItem<T> {}

export type VListChildrenSlots<T> = {
  [K in keyof Omit<VListItemSlots, 'default'>]: VListItemSlots[K] & { item: T }
} & {
  default: never
  item: { props: InternalListItem['props'] & { index: number } }
  divider: { props: InternalListItem['props'] }
  subheader: { props: InternalListItem['props'] }
  header: { props: InternalListItem['props'] }
}

type ItemType<T> = T extends readonly (infer U)[] ? U : never

export type VListExposed = {
  activeDescendant: Readonly<Ref<string | undefined>>
  open: (id: unknown, value: boolean, event?: Event | undefined) => void
  select: (id: unknown, value: boolean, event?: Event | undefined) => void
  focus: (location?: number | 'next' | 'prev' | 'first' | 'last' | null | undefined, options?: FocusOptions | undefined) => void
  children: Ref<Map<unknown, unknown[]>, Map<unknown, unknown[]>>
  parents: Ref<Map<unknown, unknown>, Map<unknown, unknown>>
  getPath: (id: unknown) => unknown[]
  navigationIndex: Ref<number, number> & { readonly externalValue: number | undefined }
}

export declare const VList: VuetifyComponent<
  VListProps,
  VListDefaultKeys,
  {
    'update:selected': (value: unknown) => true
    'update:activated': (value: unknown) => true
    'update:opened': (value: unknown) => true
    'update:navigationIndex': (value: number) => true
    'click:open': (value: ListClickEvent) => true
    'click:activate': (value: ListClickEvent) => true
    'click:select': (value: ListClickEvent) => true
  },
  new <S, A, O, T extends readonly any[]>(
    props: {
      items?: T
      itemTitle?: SelectItemKey<ItemType<T>>
      itemValue?: SelectItemKey<ItemType<T>>
      itemChildren?: SelectItemKey<ItemType<T>>
      itemProps?: SelectItemKey<ItemType<T>>
      selected?: S
      activated?: A
      opened?: O
      'onUpdate:selected'?: (value: S) => void
      'onUpdate:activated'?: (value: A) => void
      'onUpdate:opened'?: (value: O) => void
      'onClick:open'?: (value: ListClickEvent) => void
      'onClick:select'?: (value: ListClickEvent) => void
    },
    slots: VListChildrenSlots<ItemType<T>>
  ) => GenericProps<typeof props, typeof slots>,
  VListExposed
>
export type VList = InstanceType<typeof VList>
