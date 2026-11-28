// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export interface VListItemMediaProps {
  class?: any
  end?: boolean
  start?: boolean
  style?: StyleValue
  tag?: string | JSXComponent
}

type VListItemMediaDefaultKeys =
  | 'end'
  | 'start'
  | 'style'
  | 'tag'

export declare const VListItemMedia: VuetifyComponent<
  VListItemMediaProps,
  VListItemMediaDefaultKeys,
  Record<string, any>
>
export type VListItemMedia = InstanceType<typeof VListItemMedia>

export {}
