// Types
import type { StyleValue } from 'vue'
import type { Anchor } from '@/util/anchor.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export interface VSheetProps {
  border?: string | number | boolean
  class?: any
  color?: string
  elevation?: string | number
  height?: string | number
  hoverElevation?: string | number
  location?: Anchor | null
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  position?: 'fixed' | 'relative' | 'absolute' | 'static' | 'sticky'
  rounded?: string | number | boolean
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
  tile?: boolean
  width?: string | number
}

type VSheetDefaultKeys =
  | 'rounded'
  | 'style'
  | 'tag'
  | 'tile'

export declare const VSheet: VuetifyComponent<
  VSheetProps,
  VSheetDefaultKeys,
  Record<string, any>
>
export type VSheet = InstanceType<typeof VSheet>

export {}
