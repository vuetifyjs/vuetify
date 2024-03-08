// Utilities
import { propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'

export type SparklineItem = number | { value: number }

export const makeLineProps = propsFactory({
  autoDraw: Boolean,
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
  showLabels: Boolean,
  smooth: Boolean,
  width: {
    type: [Number, String],
    default: 300,
  },
}, 'Line')
