// Utilities
import { genMonotonePath } from './monotone'
import { genRoundedPath } from './path'
import { propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { ClassValue } from '@/composables/component'

export type SparklineItem = number | { value: number }

export type SparklineText = {
  x: number
  value: string
}

export interface Boundary {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

export interface Point {
  x: number
  y: number
  value: number
}

export type SparklineAnimationConfig = {
  duration?: number
  easing?: string
}

export type SparklineTooltipConfig = {
  titleFormat?: (item: { index: number, value: number }) => string
  offset?: number
  class?: ClassValue
  showCrosshair?: boolean
}

export const makeLineProps = propsFactory({
  animation: {
    type: [Boolean, Object] as PropType<boolean | SparklineAnimationConfig>,
    default: false,
  },
  autoDraw: {
    type: [Boolean, String] as PropType<boolean | 'once'>,
    default: false,
  },
  autoDrawDuration: [Number, String],
  autoDrawEasing: {
    type: String,
    default: 'ease',
  },
  color: String,
  gradient: {
    type: Array as PropType<string[]>,
    default: () => ([]),
  },
  gradientDirection: {
    type: String as PropType<'top' | 'bottom' | 'left' | 'right'>,
    validator: (val: string) => ['top', 'bottom', 'left', 'right'].includes(val),
    default: 'top',
  },
  height: {
    type: [String, Number],
    default: 75,
  },
  labels: {
    type: Array as PropType<(string | SparklineItem)[]>,
    default: () => ([]),
  },
  labelSize: {
    type: [Number, String],
    default: 7,
  },
  lineWidth: {
    type: [String, Number],
    default: 4,
  },
  id: String,
  itemValue: {
    type: String,
    default: 'value',
  },
  modelValue: {
    type: Array as PropType<SparklineItem[]>,
    default: () => ([]),
  },
  min: [String, Number],
  max: [String, Number],
  padding: {
    type: [String, Number],
    default: 8,
  },
  markerSize: {
    type: [Number, String],
    default: 8,
  },
  markerStroke: {
    type: String,
    default: '#fff',
  },
  inset: Boolean,
  showLabels: Boolean,
  showMarkers: Boolean,
  smooth: [Boolean, String, Number],
  smoothMode: {
    type: String as PropType<'default' | 'monotone'>,
    default: 'default',
  },
  interactive: Boolean,
  tooltip: {
    type: [Boolean, Object] as PropType<boolean | SparklineTooltipConfig>,
    default: false,
  },
  width: {
    type: [Number, String],
    default: 300,
  },
}, 'Line')

export function resample (values: number[], targetCount: number): number[] {
  const length = values.length
  if (length === 0) return Array(targetCount).fill(0)
  if (length === 1) return Array(targetCount).fill(values[0])

  const result: number[] = []
  for (let i = 0; i < targetCount; i++) {
    const t = i / (targetCount - 1) * (length - 1)
    const low = Math.floor(t)
    const high = Math.min(low + 1, length - 1)
    const fraction = t - low
    result.push(values[low] + (values[high] - values[low]) * fraction)
  }
  return result
}

export function extendPoints (points: Point[], inset: boolean, totalWidth: number): Point[] {
  if (!inset || points.length < 2) return points

  const first = points[0]
  const second = points[1]
  const last = points[points.length - 1]
  const secondLast = points[points.length - 2]

  const slopeStart = (second.y - first.y) / (second.x - first.x)
  const slopeEnd = (last.y - secondLast.y) / (last.x - secondLast.x)

  const ghostStart: Point = { x: 0, y: first.y - first.x * slopeStart, value: first.value }
  const ghostEnd: Point = { x: totalWidth, y: last.y + (totalWidth - last.x) * slopeEnd, value: last.value }

  return [ghostStart, ...points, ghostEnd]
}

export interface BuildPathOptions {
  smooth: boolean | string | number | undefined
  smoothMode: 'default' | 'monotone'
  height: number
  fill: boolean
  animation: boolean
}

export function buildPath (points: Point[], options: BuildPathOptions): string {
  const smoothValue = typeof options.smooth === 'boolean'
    ? (options.smooth ? 8 : 0)
    : Number(options.smooth ?? 0)

  // genRoundedPath mutates via shift(); slice defensively so callers don't have to
  const copy = points.slice()
  if (options.smoothMode === 'monotone') {
    return genMonotonePath(copy, smoothValue, options.fill, options.height)
  }
  return genRoundedPath(copy, smoothValue, options.fill, options.height, options.animation)
}
