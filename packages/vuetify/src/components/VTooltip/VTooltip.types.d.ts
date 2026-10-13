// Types
import type { Component, ComponentPublicInstance, StyleValue, TransitionProps } from 'vue'
import type { LocationStrategyFunction } from '@/components/VOverlay/locationStrategies.types'
import type { ScrollStrategyFunction } from '@/components/VOverlay/scrollStrategies.types'
import type { OverlaySlots, VOverlay } from '@/components/VOverlay/VOverlay.types'
import type { ForwardRefs } from '@/composables/forwardRefs.types'
import type { Anchor } from '@/util/anchor.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VTooltipProps {
  activator?: (string & {}) | Element | ComponentPublicInstance | 'parent'
  activatorProps?: Record<string, any>
  attach?: string | boolean | Element
  class?: any
  closeDelay?: string | number
  closeOnBack?: boolean
  closeOnContentClick?: boolean
  color?: string
  contained?: boolean
  contentClass?: any
  contentProps?: any
  disabled?: boolean
  eager?: boolean
  height?: string | number
  id?: string
  interactive?: boolean
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
  scrim?: string | boolean
  scrollStrategy?: 'block' | 'none' | 'close' | 'reposition' | ScrollStrategyFunction
  stickToTarget?: boolean
  style?: StyleValue
  target?: (string & {}) | Element | ComponentPublicInstance | 'parent' | 'cursor' | [x: number, y: number]
  text?: string
  theme?: string
  transition?: string | boolean | (TransitionProps & { component?: Component | undefined }) | null
  viewportMargin?: string | number
  width?: string | number
  zIndex?: string | number
}

export type VTooltipDefaultKeys =
  | 'activatorProps'
  | 'closeOnBack'
  | 'closeOnContentClick'
  | 'contained'
  | 'disabled'
  | 'eager'
  | 'interactive'
  | 'location'
  | 'locationStrategy'
  | 'minWidth'
  | 'modelValue'
  | 'noClickAnimation'
  | 'offset'
  | 'openOnClick'
  | 'openOnFocus'
  | 'openOnHover'
  | 'origin'
  | 'persistent'
  | 'scrim'
  | 'scrollStrategy'
  | 'stickToTarget'
  | 'style'
  | 'transition'
  | 'viewportMargin'
  | 'zIndex'

export declare const VTooltip: VuetifyComponent<
  VTooltipProps,
  VTooltipDefaultKeys,
  {
    'update:modelValue': (value: boolean) => true
  },
  OverlaySlots,
  ForwardRefs<{}, [VOverlay]>
>
export type VTooltip = InstanceType<typeof VTooltip>
