// Composables
import { getInterpolationMethod, isLinearColorScale } from './colorScale'
import { usePivot } from './pivot'

// Utilities
import { computed, shallowRef, toRef, toValue, watchEffect } from 'vue'
import { clamp } from '@/util'

// Types
import type { MaybeRefOrGetter, ShallowRef } from 'vue'
import type { ColorScale, ColorScaleStop, LinearColorScale } from './colorScale'
import type { PivotCell, PivotGroup, PivotProps } from './pivot'

export { isLinearColorScale as isLinearScale } from './colorScale'

export type HeatmapThresholds = ColorScale

export interface HeatmapCell extends PivotCell {
  value: number
  bucketIndex: number
  mixPercentage?: number
  readonly color: string | undefined
}

export interface HeatmapGroup extends PivotGroup<HeatmapCell> {
  x: number
  width: number
  hasOverlap: boolean
  labelOffset: number
}

export interface HeatmapProps extends PivotProps {
  thresholds: MaybeRefOrGetter<HeatmapThresholds>
  cellSize?: string | number | (string | number)[]
  gap?: string | number
  groupGap?: string | number
}

function toPx (value: any, defaultValue: number): number {
  if (value == null || value === '') return defaultValue
  const parsed = parseFloat(value)
  return Number.isFinite(parsed) ? parsed : defaultValue
}

// Reassign only on structural change so consumer computeds don't invalidate on identity churn.
function setIfChanged<T extends Record<string, any> | readonly any[] | null> (ref: ShallowRef<T>, next: T): void {
  const prev = ref.value
  if (prev === next) return
  if (prev == null || next == null) { ref.value = next; return }
  if (Array.isArray(prev) && Array.isArray(next)) {
    if (prev.length !== next.length || prev.some((v, i) => v !== next[i])) ref.value = next
    return
  }
  const keys = Object.keys(next)
  if (keys.some(k => (prev as any)[k] !== (next as any)[k])) ref.value = next
}

interface LinearRange { fromMin: number, toMin: number }
interface LinearColors { from: string, to: string, method: string }

export function useHeatmap (props: HeatmapProps) {
  const bucketBoundaries = shallowRef<number[]>([])
  const bucketColors = shallowRef<string[]>([])
  const linearRange = shallowRef<LinearRange | null>(null)
  const linearColors = shallowRef<LinearColors | null>(null)
  const colorSpaceClass = shallowRef<string>('')

  function clearBucketState () {
    if (bucketBoundaries.value.length) bucketBoundaries.value = []
    if (bucketColors.value.length) bucketColors.value = []
  }

  function clearLinearState () {
    if (linearRange.value) linearRange.value = null
    if (linearColors.value) linearColors.value = null
    if (colorSpaceClass.value) colorSpaceClass.value = ''
  }

  function applyLinearScale (scale: LinearColorScale) {
    clearBucketState()

    setIfChanged(linearRange, { fromMin: scale.from.min, toMin: scale.to.min })
    setIfChanged(linearColors, {
      from: scale.from.color,
      to: scale.to.color,
      method: getInterpolationMethod(scale),
    })

    const space = scale.colorSpace ?? 'srgb'
    const hue = scale.hueInterpolation && 'hsl hwb lch oklch'.includes(space)
      ? `-${scale.hueInterpolation}`
      : ''
    colorSpaceClass.value = `${space}${hue}`
  }

  function applyBucketScale (scale: ColorScaleStop[]) {
    clearLinearState()
    setIfChanged(bucketBoundaries, scale.map(stop => stop.min))
    setIfChanged(bucketColors, scale.map(stop => stop.color))
  }

  watchEffect(() => {
    const scale = toValue(props.thresholds)
    if (isLinearColorScale(scale)) applyLinearScale(scale)
    else if (Array.isArray(scale)) applyBucketScale(scale)
    else {
      clearBucketState()
      clearLinearState()
    }
  })

  const {
    rows,
    rowItems,
    hasExplicitColumns,
    groups: pivotGroups,
  } = usePivot<Record<string, any>, HeatmapCell>(props, {
    transformCell: cell => {
      const value = Number(cell.value) || 0

      let bucketIndex = -1
      let mixPercentage: number | undefined

      const range = linearRange.value
      if (range) {
        const span = range.toMin - range.fromMin
        if (span === 0 && cell.value !== null) {
          mixPercentage = value >= range.toMin ? 100 : 0
        } else {
          mixPercentage = Number(clamp((value - range.fromMin) / span).toFixed(2)) * 100
        }
      } else {
        const boundaries = bucketBoundaries.value
        for (let i = boundaries.length - 1; i >= 0; i--) {
          if (value >= boundaries[i]) {
            bucketIndex = i
            break
          }
        }
      }

      return {
        ...cell,
        value,
        bucketIndex,
        mixPercentage,
        get color () {
          if (cell.value === null) {
            return undefined
          }
          const linear = linearColors.value
          if (linear && this.mixPercentage != null) {
            if (this.mixPercentage <= 0) return linear.from
            if (this.mixPercentage >= 100) return linear.to
            return `color-mix(${linear.method}, ${linear.from}, ${linear.to} ${this.mixPercentage}%)`
          }
          if (this.bucketIndex < 0) return undefined
          return bucketColors.value[this.bucketIndex]
        },
      }
    },
  })

  const cellWidth = toRef(() => toPx(Array.isArray(props.cellSize) ? props.cellSize[0] : props.cellSize, 26))
  const cellHeight = toRef(() => toPx(Array.isArray(props.cellSize) ? props.cellSize[1] : props.cellSize, 26))
  const gap = toRef(() => toPx(props.gap, 6))
  const cellStep = toRef(() => cellWidth.value + gap.value)
  const rowStep = toRef(() => cellHeight.value + gap.value)

  const groupGap = toRef(() => toPx(props.groupGap, 0))

  // Calendar months that start mid-week overlap the previous group's last column so weeks stay flush.
  const groups = computed<HeatmapGroup[]>(() => {
    const cellWidthPx = cellWidth.value
    const gapPx = gap.value
    const stepPx = cellStep.value
    const groupGapPx = groupGap.value

    let cursor = 0
    return pivotGroups.value.map((group, groupIndex) => {
      const columnCount = group.columns.length
      const width = columnCount * cellWidthPx + Math.max(0, columnCount - 1) * gapPx
      const hasOverlap = groupIndex > 0 && group.columns[0]?.cells[0] == null

      if (groupIndex > 0) {
        cursor += hasOverlap ? groupGapPx - cellWidthPx : gapPx + groupGapPx
      }

      const x = cursor
      cursor += width

      return {
        ...group,
        x,
        width,
        hasOverlap,
        labelOffset: groupGapPx > 0 && hasOverlap ? stepPx : 0,
      }
    })
  })

  const totalWidth = toRef(() => {
    const last = groups.value[groups.value.length - 1]
    return last ? last.x + last.width : 0
  })

  const totalHeight = toRef(() => {
    const rowCount = rows.value.length
    return rowCount * cellHeight.value + Math.max(0, rowCount - 1) * gap.value
  })

  return {
    rows,
    rowItems,
    groups,
    hasExplicitColumns,
    cellWidth,
    cellHeight,
    gap,
    cellStep,
    rowStep,
    totalWidth,
    totalHeight,
    bucketBoundaries,
    bucketColors,
    linearColors,
    colorSpaceClass,
  }
}
