// Types
import type { StyleValue } from 'vue'
import type { VToolbarTitleSlots } from '@/components/VToolbar/VToolbarTitle.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export interface VAppBarTitleProps {
  class?: any
  style?: StyleValue
  tag?: string | JSXComponent
  text?: string
}

export type VAppBarTitleDefaultKeys =
  | 'style'
  | 'tag'

export declare const VAppBarTitle: VuetifyComponent<
  VAppBarTitleProps,
  VAppBarTitleDefaultKeys,
  Record<string, any>,
  VToolbarTitleSlots
>
export type VAppBarTitle = InstanceType<typeof VAppBarTitle>
