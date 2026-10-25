// Types
import type { Component, ComponentPublicInstance, StyleValue, TransitionProps } from 'vue'
import type { LocationStrategyFunction } from '@/components/VOverlay/locationStrategies.types'
import type { ScrollStrategyFunction } from '@/components/VOverlay/scrollStrategies.types'
import type { OverlaySlots } from '@/components/VOverlay/VOverlay.types'
import type { Anchor } from '@/util/anchor.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VSpeedDialProps {
  activator?: (string & {}) | Element | ComponentPublicInstance | 'parent'
  activatorProps?: Record<string, any>
  attach?: string | boolean | Element
  captureFocus?: boolean
  class?: any
  closeDelay?: string | number
  closeOnBack?: boolean
  closeOnContentClick?: boolean
  contained?: boolean
  contentClass?: any
  contentProps?: any
  contextMenu?: boolean
  disabled?: boolean
  disableInitialFocus?: boolean
  _disableKeys?: boolean
  eager?: boolean
  height?: string | number
  id?: string
  location?: Anchor
  locationStrategy?: 'static' | 'connected' | LocationStrategyFunction
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  modelValue?: boolean
  noClickAnimation?: boolean
  offset?: string | number | number[]
  opacity?: string | number
  openDelay?: string | number
  openOnArrow?: boolean
  openOnClick?: boolean
  openOnFocus?: boolean
  openOnHover?: boolean
  origin?: Anchor | 'auto' | 'overlap'
  persistent?: boolean
  retainFocus?: boolean
  scrim?: string | boolean
  scrollStrategy?: 'block' | 'none' | 'close' | 'reposition' | ScrollStrategyFunction
  stickToTarget?: boolean
  style?: StyleValue
  submenu?: boolean
  target?: (string & {}) | Element | ComponentPublicInstance | 'parent' | 'cursor' | [x: number, y: number]
  theme?: string
  transition?: string | boolean | (TransitionProps & { component?: Component | undefined }) | { component: Component } | null
  viewportMargin?: string | number
  width?: string | number
  zIndex?: string | number
}

type VSpeedDialDefaultKeys =
  | 'activatorProps'
  | 'captureFocus'
  | 'closeDelay'
  | 'closeOnBack'
  | 'closeOnContentClick'
  | 'contained'
  | 'contextMenu'
  | 'disabled'
  | 'disableInitialFocus'
  | '_disableKeys'
  | 'eager'
  | 'location'
  | 'locationStrategy'
  | 'minWidth'
  | 'modelValue'
  | 'noClickAnimation'
  | 'offset'
  | 'openDelay'
  | 'openOnArrow'
  | 'openOnClick'
  | 'openOnFocus'
  | 'openOnHover'
  | 'origin'
  | 'persistent'
  | 'retainFocus'
  | 'scrim'
  | 'scrollStrategy'
  | 'stickToTarget'
  | 'style'
  | 'submenu'
  | 'transition'
  | 'viewportMargin'
  | 'zIndex'

export declare const VSpeedDial: VuetifyComponent<
  VSpeedDialProps,
  VSpeedDialDefaultKeys,
  {
    'update:modelValue': (value: boolean) => true
  },
  OverlaySlots
>
export type VSpeedDial = InstanceType<typeof VSpeedDial>

export {}
