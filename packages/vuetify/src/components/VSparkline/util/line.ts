// Utilities
import { propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { ClassValue } from '@/composables/component'

export type SparklineItem = string | number | { value: number }

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
    type: Array as PropType<SparklineItem[]>,
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
