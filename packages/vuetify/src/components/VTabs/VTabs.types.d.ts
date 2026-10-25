// Types
import type { StyleValue } from 'vue'
import type { Density } from '@/composables/density.types'
import type { DisplayBreakpoint } from '@/composables/display.types'
import type { IconValue } from '@/composables/icons.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type TabItem = string | number | Record<string, any>

export type VTabsSlots<T> = {
  default: never
  tab: VTabsSlot<T>
  item: VTabsSlot<T>
  window: never
  prev: never
  next: never
} & {
  [key: `tab.${string}`]: VTabsSlot<T>
  [key: `item.${string}`]: VTabsSlot<T>
}

export type VTabsSlot<T> = {
  item: T
}

export interface VTabsProps {
  alignTabs?: 'start' | 'end' | 'center' | 'title'
  bgColor?: string
  centerActive?: boolean
  class?: any
  color?: string
  contentClass?: any
  density?: Density
  direction?: 'horizontal' | 'vertical'
  disabled?: boolean
  fixedTabs?: boolean
  gap?: string | number
  grow?: boolean
  height?: string | number
  hideSlider?: boolean
  inset?: boolean
  insetPadding?: string | number
  insetRadius?: string | number
  items?: readonly TabItem[]
  mandatory?: boolean | 'force'
  max?: number
  mobile?: boolean | null
  mobileBreakpoint?: number | DisplayBreakpoint
  modelValue?: any
  multiple?: boolean
  nextIcon?: IconValue
  padding?: string | number | (string | number)[]
  prevIcon?: IconValue
  scrollDistance?: string | number
  scrollSnap?: 'start' | 'end' | 'center'
  scrollToActive?: boolean
  selectedClass?: string
  showArrows?: string | boolean
  sliderColor?: string
  sliderTransition?: 'shift' | 'grow' | 'fade'
  sliderTransitionDuration?: string | number
  sliderVariant?: 'primary' | 'secondary'
  spaced?: 'start' | 'end' | 'both'
  stacked?: boolean
  style?: StyleValue
  symbol?: any
  tag?: string | JSXComponent
}

type VTabsDefaultKeys =
  | 'alignTabs'
  | 'centerActive'
  | 'density'
  | 'direction'
  | 'disabled'
  | 'fixedTabs'
  | 'grow'
  | 'height'
  | 'hideSlider'
  | 'inset'
  | 'items'
  | 'mandatory'
  | 'mobile'
  | 'modelValue'
  | 'multiple'
  | 'nextIcon'
  | 'prevIcon'
  | 'scrollDistance'
  | 'scrollToActive'
  | 'selectedClass'
  | 'sliderVariant'
  | 'stacked'
  | 'style'
  | 'symbol'
  | 'tag'

export declare const VTabs: VuetifyComponent<
  VTabsProps,
  VTabsDefaultKeys,
  {
    'update:modelValue': (v: unknown) => true
  },
  new <TModel, T = TabItem>(
    props: {
      items?: T[]
      modelValue?: TModel
      'onUpdate:modelValue'?: (value: TModel) => void
    },
    slots: VTabsSlots<T>
  ) => GenericProps<typeof props, typeof slots>
>
export type VTabs = InstanceType<typeof VTabs>

export {}
