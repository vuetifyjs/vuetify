// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export interface VContainerProps {
  class?: any
  fluid?: boolean
  height?: string | number
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  style?: StyleValue
  tag?: string | JSXComponent
  width?: string | number
}

export type VContainerDefaultKeys =
  | 'fluid'
  | 'style'
  | 'tag'

export declare const VContainer: VuetifyComponent<
  VContainerProps,
  VContainerDefaultKeys,
  Record<string, any>
>
export type VContainer = InstanceType<typeof VContainer>
