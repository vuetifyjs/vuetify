// Types
import type { Component, TransitionProps } from 'vue'
import type { PieItem, TextTemplate } from '@/labs/VPie/types.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VPieTooltipSlots = {
  default: { item: PieItem }
  prepend: { item: PieItem }
}

export interface VPieTooltipProps {
  item?: PieItem | null
  modelValue?: boolean
  offset?: string | number | number[]
  subtitleFormat?: TextTemplate
  target?: [x: number, y: number]
  titleFormat?: TextTemplate
  transition?: string | boolean | (TransitionProps & { component?: Component | undefined }) | null
}

type VPieTooltipDefaultKeys =
  | 'item'
  | 'modelValue'
  | 'offset'
  | 'subtitleFormat'
  | 'titleFormat'

export declare const VPieTooltip: VuetifyComponent<
  VPieTooltipProps,
  VPieTooltipDefaultKeys,
  Record<string, any>,
  VPieTooltipSlots
>
export type VPieTooltip = InstanceType<typeof VPieTooltip>

export {}
