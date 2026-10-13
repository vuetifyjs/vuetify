// Types
import type { StyleValue } from 'vue'
import type { Variant } from '@/composables/variant.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VToolbarItemsProps {
  class?: any
  color?: string
  style?: StyleValue
  variant?: Variant
}

export type VToolbarItemsDefaultKeys =
  | 'style'
  | 'variant'

export declare const VToolbarItems: VuetifyComponent<
  VToolbarItemsProps,
  VToolbarItemsDefaultKeys,
  Record<string, any>
>
export type VToolbarItems = InstanceType<typeof VToolbarItems>
