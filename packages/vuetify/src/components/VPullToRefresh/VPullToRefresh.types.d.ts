// Types
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VPullToRefreshSlots = {
  default: never
  pullDownPanel: {
    canRefresh: boolean
    goingUp: boolean
    refreshing: boolean
  }
}

export interface VPullToRefreshProps {
  disabled?: boolean
  pullDownThreshold?: number
}

type VPullToRefreshDefaultKeys =
  | 'disabled'
  | 'pullDownThreshold'

export declare const VPullToRefresh: VuetifyComponent<
  VPullToRefreshProps,
  VPullToRefreshDefaultKeys,
  {
    load: (options: { done: () => void }) => true
  },
  VPullToRefreshSlots
>
export type VPullToRefresh = InstanceType<typeof VPullToRefresh>

export {}
