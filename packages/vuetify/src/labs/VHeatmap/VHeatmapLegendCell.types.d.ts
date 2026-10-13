// Types
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VHeatmapLegendCellProps {
  bucketIndex?: number
  color?: string
  disabled?: boolean
  height?: string | number
  rounded?: string | number
  width?: string | number
}

export type VHeatmapLegendCellDefaultKeys =
  | 'disabled'
  | 'height'
  | 'width'

export declare const VHeatmapLegendCell: VuetifyComponent<
  VHeatmapLegendCellProps,
  VHeatmapLegendCellDefaultKeys,
  {},
  null
>
export type VHeatmapLegendCell = InstanceType<typeof VHeatmapLegendCell>
