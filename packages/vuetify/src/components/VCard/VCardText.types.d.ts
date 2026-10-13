// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export interface VCardTextProps {
  class?: any
  opacity?: string | number
  style?: StyleValue
  tag?: string | JSXComponent
}

export type VCardTextDefaultKeys =
  | 'style'
  | 'tag'

export declare const VCardText: VuetifyComponent<
  VCardTextProps,
  VCardTextDefaultKeys,
  Record<string, any>
>
export type VCardText = InstanceType<typeof VCardText>
