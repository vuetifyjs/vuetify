// Composables
import { getColorFromScale } from './colorScale'
import { usePivot } from './pivot'

// Utilities
import { toValue } from 'vue'

// Types
import type { MaybeRefOrGetter } from 'vue'
import type { ColorScale, ColorScaleStop, LinearColorScale } from './colorScale'
import type { PivotCell, PivotColumn, PivotData, PivotGroup, PivotProps } from './pivot'

export { isLinearColorScale as isLinearScale } from './colorScale'

export type HeatmapThreshold = ColorScaleStop
export type HeatmapLinearScale = LinearColorScale
export type HeatmapThresholds = ColorScale

export interface HeatmapCell extends PivotCell {
  value: number
  color?: string
}

export type HeatmapDay = HeatmapCell
export type HeatmapColumn = PivotColumn<HeatmapCell>
export type HeatmapColumnGroup = PivotGroup<HeatmapCell>
export type HeatmapData = PivotData<HeatmapCell>

export interface HeatmapProps extends PivotProps {
  thresholds: MaybeRefOrGetter<HeatmapThresholds>
}

export function useHeatmap (props: HeatmapProps) {
  function colorFromValue (value: number) {
    return getColorFromScale(value, toValue(props.thresholds))
  }

  const { data } = usePivot<Record<string, any>, HeatmapCell>(props, {
    transformCell: cell => {
      const value = Number(cell.value) || 0

      return {
        ...cell,
        value,
        color: colorFromValue(value),
      }
    },
  })

  return { colorFromValue, data }
}
