// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export interface VCardSubtitleProps {
  class?: any
  opacity?: string | number
  style?: StyleValue
  tag?: string | JSXComponent
}

type VCardSubtitleDefaultKeys =
  | 'style'
  | 'tag'

export declare const VCardSubtitle: VuetifyComponent<
  VCardSubtitleProps,
  VCardSubtitleDefaultKeys,
  Record<string, any>
>
export type VCardSubtitle = InstanceType<typeof VCardSubtitle>

export {}
