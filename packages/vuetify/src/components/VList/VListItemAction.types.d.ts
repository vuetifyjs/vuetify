// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export interface VListItemActionProps {
  class?: any
  end?: boolean
  start?: boolean
  style?: StyleValue
  tag?: string | JSXComponent
}

export type VListItemActionDefaultKeys =
  | 'end'
  | 'start'
  | 'style'
  | 'tag'

export declare const VListItemAction: VuetifyComponent<
  VListItemActionProps,
  VListItemActionDefaultKeys,
  Record<string, any>
>
export type VListItemAction = InstanceType<typeof VListItemAction>
