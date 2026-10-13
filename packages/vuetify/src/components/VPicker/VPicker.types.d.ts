// Types
import type { StyleValue } from 'vue'
import type { Anchor } from '@/util/anchor.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VPickerSlots = {
  header: never
  default: never
  actions: never
  title: never
}

export interface VPickerProps {
  bgColor?: string
  border?: string | number | boolean
  class?: any
  color?: string
  divided?: boolean
  elevation?: string | number
  height?: string | number
  hideHeader?: boolean
  hideTitle?: boolean
  hoverElevation?: string | number
  landscape?: boolean
  location?: Anchor | null
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  position?: 'fixed' | 'relative' | 'absolute' | 'static' | 'sticky'
  rounded?: string | number | boolean
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
  tile?: boolean
  title?: string
  width?: string | number
}

export type VPickerDefaultKeys =
  | 'divided'
  | 'hideHeader'
  | 'hideTitle'
  | 'landscape'
  | 'rounded'
  | 'style'
  | 'tag'
  | 'tile'

export declare const VPicker: VuetifyComponent<
  VPickerProps,
  VPickerDefaultKeys,
  Record<string, any>,
  VPickerSlots
>
export type VPicker = InstanceType<typeof VPicker>
