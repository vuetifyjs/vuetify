// Types
import type { IgnoreAccents } from '@vuetify/v0'
import type { Component, ComponentPublicInstance, StyleValue, TransitionProps } from 'vue'
import type { VList, VListChildrenSlots } from '@/components/VList/VList.types'
import type { LocationStrategyFunction } from '@/components/VOverlay/locationStrategies.types'
import type { ScrollStrategyFunction } from '@/components/VOverlay/scrollStrategies.types'
import type { OverlaySlots } from '@/components/VOverlay/VOverlay.types'
import type { Density } from '@/composables/density.types'
import type { FilterFunction, FilterKeyFunctions, FilterKeys, FilterMode } from '@/composables/filter.types'
import type { VCommandPaletteItem } from '@/labs/VCommandPalette/types.types'
import type { Anchor } from '@/util/anchor.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VCommandPaletteSlots = {
  activator: OverlaySlots['activator']
  default: never
  prepend: never
  append: never
  input: { props: Record<string, unknown> }
  'input.append-inner': never
  'no-data': never
  'list.prepend': never
  'list.subheader': VListChildrenSlots<any>['subheader']
  item: { item: VCommandPaletteItem, index: number, props: Record<string, unknown> }
  'item.prepend': { item: VCommandPaletteItem, index: number }
  'item.title': { item: VCommandPaletteItem, index: number }
  'item.append': { item: VCommandPaletteItem, index: number }
}

export interface VCommandPaletteProps {
  absolute?: boolean
  activator?: (string & {}) | Element | ComponentPublicInstance | 'parent'
  activatorProps?: Record<string, any>
  attach?: string | boolean | Element
  captureFocus?: boolean
  class?: any
  closeDelay?: string | number
  closeOnBack?: boolean
  closeOnContentClick?: boolean
  closeOnSelect?: boolean
  contained?: boolean
  contentClass?: any
  contentProps?: any
  customFilter?: FilterFunction
  customKeyFilter?: FilterKeyFunctions
  density?: Density
  disabled?: boolean
  eager?: boolean
  filterKeys?: FilterKeys
  filterMode?: FilterMode
  fullscreen?: boolean
  height?: string | number
  hotkey?: string
  ignoreAccents?: IgnoreAccents
  inputIcon?: string
  items?: VCommandPaletteItem[]
  listProps?: VList['$props']
  location?: Anchor
  locationStrategy?: 'static' | 'connected' | LocationStrategyFunction
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  modelValue?: boolean
  noClickAnimation?: boolean
  noDataText?: string
  noFilter?: boolean
  offset?: string | number | number[]
  offsetTop?: string | number
  opacity?: string | number
  openDelay?: string | number
  openOnClick?: boolean
  openOnFocus?: boolean
  openOnHover?: boolean
  origin?: Anchor | 'auto' | 'overlap'
  persistent?: boolean
  placeholder?: string
  retainFocus?: boolean
  scrim?: string | boolean
  scrollable?: boolean
  scrollStrategy?: 'block' | 'none' | 'close' | 'reposition' | ScrollStrategyFunction
  search?: string
  stickToTarget?: boolean
  style?: StyleValue
  target?: (string & {}) | Element | ComponentPublicInstance | 'parent' | 'cursor' | [x: number, y: number]
  theme?: string
  transition?: string | boolean | (TransitionProps & { component?: Component | undefined }) | { component: Component } | null
  viewportMargin?: string | number
  width?: string | number
  zIndex?: string | number
}

export type VCommandPaletteDefaultKeys =
  | 'absolute'
  | 'activatorProps'
  | 'captureFocus'
  | 'closeOnBack'
  | 'closeOnContentClick'
  | 'closeOnSelect'
  | 'contained'
  | 'density'
  | 'disabled'
  | 'eager'
  | 'filterKeys'
  | 'filterMode'
  | 'fullscreen'
  | 'inputIcon'
  | 'items'
  | 'location'
  | 'locationStrategy'
  | 'maxWidth'
  | 'modelValue'
  | 'noClickAnimation'
  | 'noDataText'
  | 'noFilter'
  | 'offsetTop'
  | 'openOnClick'
  | 'openOnFocus'
  | 'openOnHover'
  | 'origin'
  | 'persistent'
  | 'placeholder'
  | 'retainFocus'
  | 'scrim'
  | 'scrollable'
  | 'scrollStrategy'
  | 'stickToTarget'
  | 'style'
  | 'transition'
  | 'viewportMargin'
  | 'zIndex'

export declare const VCommandPalette: VuetifyComponent<
  VCommandPaletteProps,
  VCommandPaletteDefaultKeys,
  {
    'update:modelValue': (value: boolean) => true
    'update:search': (value: string) => true
    'click:item': (item: VCommandPaletteItem, event: MouseEvent | KeyboardEvent) => true
    'before-select': (payload: { item: VCommandPaletteItem, event: MouseEvent | KeyboardEvent, preventDefault: () => void }) => true
  },
  VCommandPaletteSlots
>
export type VCommandPalette = InstanceType<typeof VCommandPalette>
