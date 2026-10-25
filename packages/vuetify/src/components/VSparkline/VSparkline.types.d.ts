// Types
import type { SparklineAnimationConfig, SparklineItem, SparklineTooltipConfig } from '@/components/VSparkline/util/line.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VSparklineSlots = {
  default: void
  label: { index: number, value: string }
  tooltip: { index: number, value: number }
}

export interface VSparklineProps {
  animation?: boolean | SparklineAnimationConfig
  autoDraw?: boolean | 'once'
  autoDrawDuration?: string | number
  autoDrawEasing?: string
  autoLineWidth?: boolean
  color?: string
  fill?: boolean
  gradient?: string[]
  gradientDirection?: 'top' | 'left' | 'right' | 'bottom'
  height?: string | number
  id?: string
  inset?: boolean
  interactive?: boolean
  itemValue?: string
  labels?: (string | SparklineItem)[]
  labelSize?: string | number
  lineWidth?: string | number
  markerSize?: string | number
  markerStroke?: string
  max?: string | number
  min?: string | number
  modelValue?: SparklineItem[]
  padding?: string | number
  showLabels?: boolean
  showMarkers?: boolean
  smooth?: string | number | boolean
  smoothMode?: 'default' | 'monotone'
  tooltip?: boolean | SparklineTooltipConfig
  type?: 'bar' | 'trend'
  width?: string | number
}

type VSparklineDefaultKeys =
  | 'animation'
  | 'autoDraw'
  | 'autoDrawEasing'
  | 'autoLineWidth'
  | 'fill'
  | 'gradient'
  | 'gradientDirection'
  | 'height'
  | 'inset'
  | 'interactive'
  | 'itemValue'
  | 'labels'
  | 'labelSize'
  | 'lineWidth'
  | 'markerSize'
  | 'markerStroke'
  | 'modelValue'
  | 'padding'
  | 'showLabels'
  | 'showMarkers'
  | 'smoothMode'
  | 'tooltip'
  | 'type'
  | 'width'

export declare const VSparkline: VuetifyComponent<
  VSparklineProps,
  VSparklineDefaultKeys,
  {
    'update:currentIndex': (_index: number | null) => true
  },
  VSparklineSlots
>
export type VSparkline = InstanceType<typeof VSparkline>

export {}
