// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export interface VCardActionsProps {
  class?: any
  style?: StyleValue
  tag?: string | JSXComponent
}

export type VCardActionsDefaultKeys =
  | 'style'
  | 'tag'

export declare const VCardActions: VuetifyComponent<
  VCardActionsProps,
  VCardActionsDefaultKeys,
  Record<string, any>
>
export type VCardActions = InstanceType<typeof VCardActions>
