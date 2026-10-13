// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { ClassValue } from '@/util/shared.types'

export interface SimpleFunctionalProps {
  class?: ClassValue
  style?: StyleValue
  tag?: string
}

export type SimpleFunctionalDefaultKeys =
  | 'style'
  | 'tag'

export type SimpleFunctional = VuetifyComponent<
  SimpleFunctionalProps,
  SimpleFunctionalDefaultKeys,
  Record<string, any>
>
