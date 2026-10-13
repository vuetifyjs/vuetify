// Types
import type { ColorScale } from '@/labs/VHeatmap/colorScale.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VHeatmapLegendProps {
  activeBuckets: number[]
  cellSize?: string | number | (string | number)[]
  labels?: string[]
  rounded?: string | number
  thresholds?: ColorScale
}

export type VHeatmapLegendDefaultKeys =
  | 'cellSize'
  | 'labels'
  | 'thresholds'

export declare const VHeatmapLegend: VuetifyComponent<
  VHeatmapLegendProps,
  VHeatmapLegendDefaultKeys,
  {
    'click:threshold': (index: number) => true
  },
  null
>
export type VHeatmapLegend = InstanceType<typeof VHeatmapLegend>
