// Types
import type { Component, ComponentPublicInstance, ComputedRef, Ref, StyleValue, TransitionProps } from 'vue'
import type { LocationStrategyFunction } from '@/components/VOverlay/locationStrategies.types'
import type { ScrollStrategyFunction } from '@/components/VOverlay/scrollStrategies.types'
import type { Anchor } from '@/util/anchor.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { ClassValue, TemplateRef } from '@/util/shared.types'

export type TransitionValue = string | boolean | (TransitionProps & { component?: Component }) | null

export interface VOverlayBaseProps {
  absolute?: boolean
  activator?: (string & {}) | Element | 'parent' | ComponentPublicInstance
  activatorProps?: Record<string, any>
  attach?: string | boolean | Element
  captureFocus?: boolean
  class?: ClassValue
  closeDelay?: string | number
  closeOnBack?: boolean
  closeOnContentClick?: boolean
  contained?: boolean
  contentClass?: any
  contentProps?: any
  contextMenu?: boolean
  disabled?: boolean
  disableInitialFocus?: boolean
  eager?: boolean
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
  origin?: 'auto' | Anchor | 'overlap'
  persistent?: boolean
  retainFocus?: boolean
  scrim?: string | boolean
  scrollStrategy?: 'none' | 'close' | 'block' | 'reposition' | ScrollStrategyFunction
  stickToTarget?: boolean
  style?: StyleValue
  target?: (string & {}) | Element | 'parent' | 'cursor' | ComponentPublicInstance | [x: number, y: number]
  theme?: string
  transition?: TransitionValue
  viewportMargin?: string | number
  width?: string | number
  zIndex?: string | number
}

type VOverlayBaseDefaultKeys =
  | 'absolute'
  | 'activatorProps'
  | 'captureFocus'
  | 'closeOnBack'
  | 'closeOnContentClick'
  | 'contained'
  | 'contextMenu'
  | 'disabled'
  | 'disableInitialFocus'
  | 'eager'
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
  | 'scrollStrategy'
  | 'stickToTarget'
  | 'style'
  | 'viewportMargin'
  | 'zIndex'

export interface VOverlayProps extends Omit<VOverlayBaseProps, 'disableInitialFocus'> {
  _disableGlobalStack?: boolean
  _submenu?: boolean
}

type VOverlayDefaultKeys =
  | Exclude<VOverlayBaseDefaultKeys, 'disableInitialFocus'>
  | '_disableGlobalStack'
  | '_submenu'

export type OverlaySlots = {
  default: { isActive: Ref<boolean> }
  activator: { isActive: boolean, props: Record<string, any>, targetRef: TemplateRef }
}

export type VOverlayExposed = {
  activatorEl: Ref<HTMLElement | undefined, HTMLElement | undefined>
  scrimEl: Ref<HTMLElement | undefined, HTMLElement | undefined>
  target: ComputedRef<HTMLElement | [x: number, y: number] | undefined>
  animateClick: () => void
  contentEl: Ref<HTMLElement | undefined, HTMLElement | undefined>
  rootEl: Ref<HTMLElement | undefined, HTMLElement | undefined>
  globalTop: Readonly<Ref<boolean, boolean>>
  localTop: Readonly<Ref<boolean, boolean>>
  updateLocation: Ref<((e: Event) => void) | undefined, ((e: Event) => void) | undefined>
  openedByHover: Ref<boolean, boolean>
}

export declare const VOverlay: VuetifyComponent<
  VOverlayProps,
  VOverlayDefaultKeys,
  {
    'click:outside': (e: MouseEvent) => true
    'update:modelValue': (value: boolean) => true
    keydown: (e: KeyboardEvent) => true
    afterEnter: () => true
    afterLeave: () => true
  },
  OverlaySlots,
  VOverlayExposed
>
export type VOverlay = InstanceType<typeof VOverlay>

export {}
