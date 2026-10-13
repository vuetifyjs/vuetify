// Types
import type { ColorScale } from '@/labs/VHeatmap/colorScale.types'
import type { PivotCell, PivotGroup } from '@/labs/VHeatmap/pivot.types'

export interface HeatmapCell extends PivotCell {
  value: number
  bucketIndex: number
  mixPercentage?: number
  readonly color: string | undefined
}

export type HeatmapThresholds = ColorScale

export interface HeatmapGroup extends PivotGroup<HeatmapCell> {
  x: number
  width: number
  hasOverlap: boolean
  labelOffset: number
}
