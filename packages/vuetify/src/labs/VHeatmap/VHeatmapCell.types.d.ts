// Types
import type { HeatmapCell } from '@/labs/VHeatmap/heatmap.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VHeatmapCellSlots = {
  default: { item: HeatmapCell }
}

export interface VHeatmapCellProps {
  cellProps?: Record<string, any>
  disabled?: boolean
  height: number
  item: HeatmapCell
  width: number
  x: number
  y: number
}

type VHeatmapCellDefaultKeys =
  | 'disabled'

export declare const VHeatmapCell: VuetifyComponent<
  VHeatmapCellProps,
  VHeatmapCellDefaultKeys,
  Record<string, any>,
  VHeatmapCellSlots
>
export type VHeatmapCell = InstanceType<typeof VHeatmapCell>

export {}
