// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VToolbarTitleSlots = {
  default: never
  text: never
}

export interface VToolbarTitleProps {
  class?: any
  style?: StyleValue
  tag?: string | JSXComponent
  text?: string
}

export type VToolbarTitleDefaultKeys =
  | 'style'
  | 'tag'

export declare const VToolbarTitle: VuetifyComponent<
  VToolbarTitleProps,
  VToolbarTitleDefaultKeys,
  Record<string, any>,
  VToolbarTitleSlots
>
export type VToolbarTitle = InstanceType<typeof VToolbarTitle>
