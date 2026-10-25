// Types
import type { StyleValue } from 'vue'
import type { MediaSeekStep } from '@/labs/composables/media.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VMediaProgressBarChapter = { start: number | string, title?: string }

export type VMediaProgressBarSlots = {
  default: never
  tooltip: { time: string, chapter: string | undefined, seconds: number }
}

export interface VMediaProgressBarProps {
  bgColor?: string
  buffer?: number
  chapterGap?: string | number
  chapters?: readonly VMediaProgressBarChapter[]
  class?: any
  color?: string
  disabled?: boolean
  elevation?: string | number
  height?: string | number
  hoverElevation?: string | number
  max?: number
  modelValue?: number
  readonly?: boolean
  rounded?: string | number | boolean
  step?: MediaSeekStep
  style?: StyleValue
  theme?: string
  thumb?: boolean
  thumbGap?: number | string
  thumbSize?: string | number
  tile?: boolean
  tooltip?: boolean | { location?: 'top' | 'bottom' | undefined, offset?: string | number | undefined }
  variant?: 'default' | 'pill' | 'wavy'
}

type VMediaProgressBarDefaultKeys =
  | 'buffer'
  | 'chapters'
  | 'disabled'
  | 'elevation'
  | 'max'
  | 'modelValue'
  | 'readonly'
  | 'rounded'
  | 'step'
  | 'style'
  | 'thumb'
  | 'tile'
  | 'tooltip'
  | 'variant'

export declare const VMediaProgressBar: VuetifyComponent<
  VMediaProgressBarProps,
  VMediaProgressBarDefaultKeys,
  {
    'update:modelValue': (value: number) => true
    'drag:start': (value: number) => true
    'drag:end': (value: number) => true
  },
  VMediaProgressBarSlots
>
export type VMediaProgressBar = InstanceType<typeof VMediaProgressBar>

export {}
