// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export interface VListSubheaderProps {
  class?: any
  color?: string
  inset?: boolean
  sticky?: boolean
  style?: StyleValue
  tag?: string | JSXComponent
  title?: string
}

type VListSubheaderDefaultKeys =
  | 'inset'
  | 'sticky'
  | 'style'
  | 'tag'

export declare const VListSubheader: VuetifyComponent<
  VListSubheaderProps,
  VListSubheaderDefaultKeys,
  Record<string, any>
>
export type VListSubheader = InstanceType<typeof VListSubheader>

export {}
