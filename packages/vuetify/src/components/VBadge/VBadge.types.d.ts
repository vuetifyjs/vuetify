// Types
import type { Component, StyleValue, TransitionProps } from 'vue'
import type { IconValue } from '@/composables/icons.types'
import type { Anchor } from '@/util/anchor.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VBadgeSlots = {
  default: never
  badge: never
}

export interface VBadgeProps {
  bordered?: boolean
  class?: any
  color?: string
  content?: string | number
  dot?: boolean
  dotSize?: string | number
  floating?: boolean
  height?: string | number
  icon?: IconValue
  inline?: boolean
  label?: string
  location?: Anchor | null
  max?: string | number
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  modelValue?: boolean
  offsetX?: string | number
  offsetY?: string | number
  rounded?: string | number | boolean
  style?: StyleValue
  tag?: string | JSXComponent
  textColor?: string
  theme?: string
  tile?: boolean
  transition?: string | boolean | (TransitionProps & { component?: Component | undefined }) | null
  width?: string | number
}

export type VBadgeDefaultKeys =
  | 'bordered'
  | 'dot'
  | 'floating'
  | 'inline'
  | 'label'
  | 'location'
  | 'modelValue'
  | 'rounded'
  | 'style'
  | 'tag'
  | 'tile'
  | 'transition'

export declare const VBadge: VuetifyComponent<
  VBadgeProps,
  VBadgeDefaultKeys,
  Record<string, any>,
  VBadgeSlots
>
export type VBadge = InstanceType<typeof VBadge>
