// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VBreadcrumbsDividerProps {
  class?: any
  divider?: string | number
  style?: StyleValue
}

export type VBreadcrumbsDividerDefaultKeys =
  | 'style'

export declare const VBreadcrumbsDivider: VuetifyComponent<
  VBreadcrumbsDividerProps,
  VBreadcrumbsDividerDefaultKeys,
  Record<string, any>
>
export type VBreadcrumbsDivider = InstanceType<typeof VBreadcrumbsDivider>
