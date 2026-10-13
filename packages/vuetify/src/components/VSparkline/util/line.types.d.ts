// Types
import type { ClassValue } from '@/util/shared.types'

export type SparklineItem = number | { value: number }

export type SparklineTooltipConfig = {
  titleFormat?: (item: { index: number, value: number }) => string
  offset?: number
  class?: ClassValue
  showCrosshair?: boolean
}

export type SparklineAnimationConfig = {
  duration?: number
  easing?: string
}
