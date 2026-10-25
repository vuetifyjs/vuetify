// Types
import type { ColorScale } from '@/labs/VHeatmap/colorScale.types'
import type { HeatmapCell, HeatmapGroup, HeatmapThresholds } from '@/labs/VHeatmap/heatmap.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { SelectItemKey } from '@/util/shared.types'

export interface HeatmapLegendOptions {
  labels?: string[]
  cellSize?: string | number | (string | number)[]
}

export type VHeatmapSlots = {
  cell: { item: HeatmapCell }
  legend: { thresholds: HeatmapThresholds, activeBuckets: number[], toggle: (index: number) => void }
  'row-header': { row: any, index: number, items: HeatmapCell[] }
  'column-header': { column: any, index: number, items: HeatmapCell[] }
  'group-header': { group: HeatmapGroup, items: HeatmapCell[] }
}

export interface VHeatmapProps {
  cellSize?: string | number | (string | number)[]
  columns?: any[]
  emptyColor?: string
  gap?: string | number
  groupBy?: SelectItemKey
  groupGap?: string | number
  hideColumnHeaders?: boolean
  hideRowHeaders?: boolean
  hover?: boolean
  hoverScale?: string | number
  itemColumn?: SelectItemKey
  itemProps?: Record<string, any> | ((item: HeatmapCell) => Record<string, any>)
  itemRow?: SelectItemKey
  items?: Record<string, any>[]
  itemValue?: SelectItemKey
  legend?: boolean | HeatmapLegendOptions
  rounded?: string | number
  rows?: any[]
  theme?: string
  thresholds?: ColorScale
}

type VHeatmapDefaultKeys =
  | 'cellSize'
  | 'gap'
  | 'groupGap'
  | 'hideColumnHeaders'
  | 'hideRowHeaders'
  | 'hover'
  | 'hoverScale'
  | 'itemColumn'
  | 'itemRow'
  | 'items'
  | 'itemValue'
  | 'legend'
  | 'thresholds'

export declare const VHeatmap: VuetifyComponent<
  VHeatmapProps,
  VHeatmapDefaultKeys,
  Record<string, any>,
  VHeatmapSlots
>
export type VHeatmap = InstanceType<typeof VHeatmap>

export {}
