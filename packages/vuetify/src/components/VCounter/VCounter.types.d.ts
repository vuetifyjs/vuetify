// Types
import type { Component, StyleValue, TransitionProps } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VCounterSlot = {
  counter: string
  max: string | number | undefined
  value: string | number | undefined
}

export type VCounterSlots = {
  default: VCounterSlot
}

export interface VCounterProps {
  active?: boolean
  class?: any
  disabled?: boolean
  max?: string | number
  style?: StyleValue
  transition?: string | boolean | (TransitionProps & { component?: Component | undefined }) | { component: Component } | null
  value?: string | number
}

export type VCounterDefaultKeys =
  | 'active'
  | 'disabled'
  | 'style'
  | 'transition'
  | 'value'

export declare const VCounter: VuetifyComponent<
  VCounterProps,
  VCounterDefaultKeys,
  Record<string, any>,
  VCounterSlots
>
export type VCounter = InstanceType<typeof VCounter>
