// Types
import type { Component, StyleValue, TransitionProps } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VMessageSlot = {
  message: string
}

export type VMessagesSlots = {
  message: VMessageSlot
}

export interface VMessagesProps {
  active?: boolean
  class?: any
  color?: string
  messages?: string | readonly string[]
  style?: StyleValue
  transition?: string | boolean | (TransitionProps & { component?: Component | undefined }) | { component: Component, leaveAbsolute: boolean, group: boolean } | null
}

type VMessagesDefaultKeys =
  | 'active'
  | 'messages'
  | 'style'
  | 'transition'

export declare const VMessages: VuetifyComponent<
  VMessagesProps,
  VMessagesDefaultKeys,
  Record<string, any>,
  VMessagesSlots
>
export type VMessages = InstanceType<typeof VMessages>

export {}
