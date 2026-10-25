// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export interface VMainProps {
  class?: any
  height?: string | number
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  scrollable?: boolean
  style?: StyleValue
  tag?: string | JSXComponent
  width?: string | number
}

type VMainDefaultKeys =
  | 'scrollable'
  | 'style'
  | 'tag'

export declare const VMain: VuetifyComponent<
  VMainProps,
  VMainDefaultKeys,
  Record<string, any>
>
export type VMain = InstanceType<typeof VMain>

export {}
