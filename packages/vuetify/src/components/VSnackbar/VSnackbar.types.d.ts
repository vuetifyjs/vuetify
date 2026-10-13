// Types
import type { Component, ComponentPublicInstance, Ref, StyleValue, TransitionProps } from 'vue'
import type { LocationStrategyFunction } from '@/components/VOverlay/locationStrategies.types'
import type { VOverlay } from '@/components/VOverlay/VOverlay.types'
import type { ForwardRefs } from '@/composables/forwardRefs.types'
import type { IconValue } from '@/composables/icons.types'
import type { Variant } from '@/composables/variant.types'
import type { Anchor } from '@/util/anchor.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VSnackbarSlots = {
  activator: { isActive: boolean, props: Record<string, any> }
  default: never
  prepend: never
  actions: { isActive: Ref<boolean> }
  header: never
  title: never
  text: never
}

export interface VSnackbarProps {
  absolute?: boolean
  activator?: (string & {}) | Element | ComponentPublicInstance | 'parent'
  activatorProps?: Record<string, any>
  attach?: string | boolean | Element
  class?: any
  closeDelay?: string | number
  closeOnBack?: boolean
  closeOnContentClick?: boolean
  collapsed?: { width: number, height: number }
  color?: string
  contained?: boolean
  contentClass?: any
  contentProps?: any
  disabled?: boolean
  eager?: boolean
  height?: string | number
  loading?: boolean
  location?: Anchor | null
  locationStrategy?: 'static' | 'connected' | LocationStrategyFunction | null
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  modelValue?: boolean
  opacity?: string | number
  openDelay?: string | number
  openOnClick?: boolean
  openOnFocus?: boolean
  openOnHover?: boolean
  origin?: Anchor | 'auto' | 'overlap'
  position?: 'fixed' | 'relative' | 'absolute' | 'static' | 'sticky'
  prependAvatar?: string
  prependIcon?: IconValue
  queueGap?: number
  queueIndex?: number
  reverseTimer?: boolean
  rounded?: string | number | boolean
  style?: StyleValue
  target?: (string & {}) | Element | ComponentPublicInstance | 'parent' | 'cursor' | [x: number, y: number]
  text?: string
  theme?: string
  tile?: boolean
  timeout?: string | number
  timer?: boolean | 'top' | 'bottom'
  timerColor?: string
  title?: string
  transition?: string | boolean | (TransitionProps & { component?: Component | undefined }) | null
  variant?: Variant
  vertical?: boolean
  width?: string | number
  zIndex?: string | number
}

export type VSnackbarDefaultKeys =
  | 'absolute'
  | 'activatorProps'
  | 'closeOnBack'
  | 'closeOnContentClick'
  | 'contained'
  | 'disabled'
  | 'eager'
  | 'loading'
  | 'location'
  | 'locationStrategy'
  | 'modelValue'
  | 'openOnClick'
  | 'openOnFocus'
  | 'openOnHover'
  | 'origin'
  | 'reverseTimer'
  | 'rounded'
  | 'style'
  | 'tile'
  | 'timeout'
  | 'timer'
  | 'transition'
  | 'variant'
  | 'vertical'
  | 'zIndex'

export declare const VSnackbar: VuetifyComponent<
  VSnackbarProps,
  VSnackbarDefaultKeys,
  {
    'update:modelValue': (v: boolean) => true
  },
  VSnackbarSlots,
  ForwardRefs<{}, [VOverlay]>
>
export type VSnackbar = InstanceType<typeof VSnackbar>
