// Types
import type { Component, ComponentPublicInstance, StyleValue, TransitionProps } from 'vue'
import type { LocationStrategyFunction } from '@/components/VOverlay/locationStrategies.types'
import type { ScrollStrategyFunction } from '@/components/VOverlay/scrollStrategies.types'
import type { OverlaySlots, VOverlay } from '@/components/VOverlay/VOverlay.types'
import type { ForwardRefs } from '@/composables/forwardRefs.types'
import type { Anchor } from '@/util/anchor.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VDialogProps {
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
  disabled?: boolean
  eager?: boolean
  fullscreen?: boolean
  height?: string | number
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

export type VDialogDefaultKeys =
  | 'absolute'
  | 'activatorProps'
  | 'captureFocus'
  | 'closeOnBack'
  | 'closeOnContentClick'
  | 'contained'
  | 'disabled'
  | 'eager'
  | 'fullscreen'
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

export declare const VDialog: VuetifyComponent<
  VDialogProps,
  VDialogDefaultKeys,
  {
    'update:modelValue': (value: boolean) => true
    afterEnter: () => true
    afterLeave: () => true
  },
  OverlaySlots,
  ForwardRefs<{}, [VOverlay]>
>
export type VDialog = InstanceType<typeof VDialog>
