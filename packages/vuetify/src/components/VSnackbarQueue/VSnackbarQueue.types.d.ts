// Types
import type { Component, ComponentPublicInstance, StyleValue, TransitionProps, VNodeProps } from 'vue'
import type { LocationStrategyFunction } from '@/components/VOverlay/locationStrategies.types'
import type { VSnackbar } from '@/components/VSnackbar/VSnackbar.types'
import type { IconValue } from '@/composables/icons.types'
import type { Variant } from '@/composables/variant.types'
import type { Anchor } from '@/util/anchor.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'

export type SnackbarMessage =
  | string
  | (SingleSnackbarProps & {
    collapsed?: { width: number, height: number }
    promise?: Promise<unknown>
    success?: (val?: unknown) => SingleSnackbarProps
    error?: (val?: Error) => SingleSnackbarProps
    onDismiss?: (reason: SnackbarMessageDismissType) => void
  })

export type VSnackbarQueueSlots<T extends string | SnackbarMessage> = {
  header: { item: T }
  item: { item: T }
  text: { item: T }
  actions: {
    item: T
    props: {
      onClick: () => void
    }
  }
}

export type SingleSnackbarProps = Omit<
  VSnackbar['$props'],
  | 'modelValue'
  | 'onUpdate:modelValue'
  | 'activator'
  | 'activatorProps'
  | 'closeDelay'
  | 'openDelay'
  | 'openOnClick'
  | 'openOnFocus'
  | 'openOnHover'
  | 'collapsed'
  | 'style'
  | '$children'
  | 'v-slots'
  | `v-slot:${string}`
  | keyof VNodeProps
> & {
  style?: any
}

export type SnackbarMessageDismissType =
  | 'dismissed'
  | 'cleared'
  | 'overflow'
  | 'auto'

export interface VSnackbarQueueProps {
  absolute?: boolean
  activator?: (string & {}) | Element | ComponentPublicInstance | 'parent'
  activatorProps?: Record<string, any>
  attach?: string | boolean | Element
  class?: any
  closable?: string | boolean
  closeDelay?: string | number
  closeOnBack?: boolean
  closeOnContentClick?: boolean
  closeText?: string
  collapsed?: boolean
  color?: string
  contained?: boolean
  contentClass?: any
  contentProps?: any
  disabled?: boolean
  displayStrategy?: 'overflow' | 'hold'
  eager?: boolean
  gap?: string | number
  height?: string | number
  loading?: boolean
  location?: Anchor | null
  locationStrategy?: 'static' | 'connected' | LocationStrategyFunction | null
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  modelValue?: readonly SnackbarMessage[]
  opacity?: string | number
  openDelay?: string | number
  openOnClick?: boolean
  openOnFocus?: boolean
  openOnHover?: boolean
  origin?: Anchor | 'auto' | 'overlap'
  position?: 'fixed' | 'relative' | 'absolute' | 'static' | 'sticky'
  prependAvatar?: string
  prependIcon?: IconValue
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
  totalVisible?: string | number
  transition?: string | boolean | (TransitionProps & { component?: Component | undefined }) | null
  variant?: Variant
  vertical?: boolean
  width?: string | number
  zIndex?: string | number
}

type VSnackbarQueueDefaultKeys =
  | 'absolute'
  | 'activatorProps'
  | 'closeOnBack'
  | 'closeOnContentClick'
  | 'closeText'
  | 'collapsed'
  | 'contained'
  | 'disabled'
  | 'displayStrategy'
  | 'eager'
  | 'gap'
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
  | 'totalVisible'
  | 'transition'
  | 'variant'
  | 'vertical'
  | 'zIndex'

export declare const VSnackbarQueue: VuetifyComponent<
  VSnackbarQueueProps,
  VSnackbarQueueDefaultKeys,
  {
    'update:modelValue': (val: SnackbarMessage[]) => true
  },
  new <T extends readonly SnackbarMessage[]> (
    props: {
      modelValue?: T
      'onUpdate:modelValue'?: (val: T) => void
    },
    slots: VSnackbarQueueSlots<T[number]>,
  ) => GenericProps<typeof props, typeof slots>,
  { clear: () => void }
>
export type VSnackbarQueue = InstanceType<typeof VSnackbarQueue>

export {}
