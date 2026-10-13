// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VTabsWindowItemProps {
  class?: any
  disabled?: boolean
  eager?: boolean
  reverseTransition?: string | boolean
  selectedClass?: string
  style?: StyleValue
  transition?: string | boolean
  value?: any
}

export type VTabsWindowItemDefaultKeys =
  | 'disabled'
  | 'eager'
  | 'reverseTransition'
  | 'style'
  | 'transition'

export declare const VTabsWindowItem: VuetifyComponent<
  VTabsWindowItemProps,
  VTabsWindowItemDefaultKeys,
  Record<string, any>
>
export type VTabsWindowItem = InstanceType<typeof VTabsWindowItem>
