// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VExpansionPanelTextProps {
  class?: any
  eager?: boolean
  style?: StyleValue
}

export type VExpansionPanelTextDefaultKeys =
  | 'eager'
  | 'style'

export declare const VExpansionPanelText: VuetifyComponent<
  VExpansionPanelTextProps,
  VExpansionPanelTextDefaultKeys,
  Record<string, any>
>
export type VExpansionPanelText = InstanceType<typeof VExpansionPanelText>
