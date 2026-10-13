// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export interface VListItemSubtitleProps {
  class?: any
  opacity?: string | number
  style?: StyleValue
  tag?: string | JSXComponent
}

export type VListItemSubtitleDefaultKeys =
  | 'style'
  | 'tag'

export declare const VListItemSubtitle: VuetifyComponent<
  VListItemSubtitleProps,
  VListItemSubtitleDefaultKeys,
  Record<string, any>
>
export type VListItemSubtitle = InstanceType<typeof VListItemSubtitle>
