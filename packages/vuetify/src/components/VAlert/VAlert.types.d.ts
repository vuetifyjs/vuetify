// Types
import type { Component, StyleValue } from 'vue'
import type { VIconBtnSizes } from '@/components/VIconBtn/VIconBtn.types'
import type { TransitionValue } from '@/components/VOverlay/VOverlay.types'
import type { Density } from '@/composables/density.types'
import type { IconValue } from '@/composables/icons.types'
import type { Variant } from '@/composables/variant.types'
import type { Anchor } from '@/util/anchor.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VAlertSlots = {
  default: never
  prepend: never
  title: never
  text: never
  append: never
  close: { props: Record<string, any>, timerProgress: number }
}

export interface VAlertProps {
  border?: boolean | 'top' | 'bottom' | 'start' | 'end'
  borderColor?: string
  class?: any
  closable?: boolean
  closeIcon?: IconValue
  closeLabel?: string
  color?: string
  density?: Density
  elevation?: string | number
  height?: string | number
  hoverElevation?: string | number
  icon?: false | IconValue
  iconSize?: string | number
  iconSizes?: [VIconBtnSizes, number][]
  location?: Anchor | null
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  modelValue?: boolean
  position?: 'fixed' | 'relative' | 'absolute' | 'static' | 'sticky'
  prominent?: boolean
  rounded?: string | number | boolean
  style?: StyleValue
  tag?: string | JSXComponent
  text?: string
  theme?: string
  tile?: boolean
  timeout?: number | string
  timer?: boolean | 'top' | 'bottom' | 'close'
  title?: string
  transition?: TransitionValue | { component: Component }
  type?: 'error' | 'success' | 'info' | 'warning'
  variant?: Variant
  width?: string | number
}

type VAlertDefaultKeys =
  | 'closable'
  | 'closeIcon'
  | 'closeLabel'
  | 'density'
  | 'icon'
  | 'iconSizes'
  | 'modelValue'
  | 'prominent'
  | 'rounded'
  | 'style'
  | 'tag'
  | 'tile'
  | 'timeout'
  | 'transition'
  | 'variant'

export declare const VAlert: VuetifyComponent<
  VAlertProps,
  VAlertDefaultKeys,
  {
    'click:close': (e: MouseEvent) => true
    'update:modelValue': (value: boolean) => true
  },
  VAlertSlots
>
export type VAlert = InstanceType<typeof VAlert>

export {}
