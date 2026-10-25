// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VBannerActionsProps {
  class?: any
  color?: string
  density?: string
  style?: StyleValue
}

type VBannerActionsDefaultKeys =
  | 'style'

export declare const VBannerActions: VuetifyComponent<
  VBannerActionsProps,
  VBannerActionsDefaultKeys,
  Record<string, any>
>
export type VBannerActions = InstanceType<typeof VBannerActions>

export {}
