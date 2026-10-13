// Types
import type { Component, ComponentPublicInstance, StyleValue, TransitionProps } from 'vue'
import type { LocationStrategyFunction } from '@/components/VOverlay/locationStrategies.types'
import type { ScrollStrategyFunction } from '@/components/VOverlay/scrollStrategies.types'
import type { OverlaySlots } from '@/components/VOverlay/VOverlay.types'
import type { Anchor } from '@/util/anchor.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VBottomSheetProps {
  absolute?: boolean
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
  eager?: boolean
  fullscreen?: boolean
  height?: string | number
  inset?: boolean
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
  openOnClick?: boolean
  openOnFocus?: boolean
  openOnHover?: boolean
  origin?: Anchor | 'auto' | 'overlap'
  persistent?: boolean
  retainFocus?: boolean
  scrim?: string | boolean
  scrollable?: boolean
  scrollStrategy?: 'block' | 'none' | 'close' | 'reposition' | ScrollStrategyFunction
  stickToTarget?: boolean
  style?: StyleValue
  target?: (string & {}) | Element | ComponentPublicInstance | 'parent' | 'cursor' | [x: number, y: number]
  theme?: string
  transition?: string | boolean | (TransitionProps & { component?: Component | undefined }) | { component: Component } | null
  viewportMargin?: string | number
  width?: string | number
  zIndex?: string | number
}

export type VBottomSheetDefaultKeys =
  | 'absolute'
  | 'activatorProps'
  | 'captureFocus'
  | 'closeOnBack'
  | 'closeOnContentClick'
  | 'contained'
  | 'contextMenu'
  | 'disabled'
  | 'eager'
  | 'fullscreen'
  | 'inset'
  | 'location'
  | 'locationStrategy'
  | 'modelValue'
  | 'noClickAnimation'
  | 'openOnClick'
  | 'openOnFocus'
  | 'openOnHover'
  | 'origin'
  | 'persistent'
  | 'retainFocus'
  | 'scrim'
  | 'scrollable'
  | 'scrollStrategy'
  | 'stickToTarget'
  | 'style'
  | 'transition'
  | 'viewportMargin'
  | 'zIndex'

export declare const VBottomSheet: VuetifyComponent<
  VBottomSheetProps,
  VBottomSheetDefaultKeys,
  {
    'update:modelValue': (value: boolean) => true
    'click:outside': (e: MouseEvent) => true
    afterEnter: () => true
    afterLeave: () => true
  },
  OverlaySlots
>
export type VBottomSheet = InstanceType<typeof VBottomSheet>
