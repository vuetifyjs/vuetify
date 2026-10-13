// Types
import type { StyleValue } from 'vue'
import type { MediaSeekStep } from '@/labs/composables/media.types'
import type { SampleStrategy } from '@/labs/VAudio/peaks.types'
import type { VMediaProgressBarChapter, VMediaProgressBarSlots } from '@/labs/VMediaProgressBar/VMediaProgressBar.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VAudioWaveformSlots = {
  tooltip: VMediaProgressBarSlots['tooltip']
}

export interface VAudioWaveformProps {
  barGap?: string | number
  barRadius?: string | number
  bars?: string | number
  barWidth?: string | number
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
  live?: boolean
  max?: number
  mirror?: string | number | boolean
  modelValue?: number
  normalize?: boolean
  peaks?: readonly number[]
  peaksSource?: Blob
  readonly?: boolean
  rounded?: string | number | boolean
  sampleStrategy?: SampleStrategy
  step?: MediaSeekStep
  style?: StyleValue
  theme?: string
  thumb?: boolean
  thumbSize?: string | number
  tile?: boolean
  tooltip?: boolean | { location?: 'top' | 'bottom' | undefined, offset?: string | number | undefined }
}

export type VAudioWaveformDefaultKeys =
  | 'barGap'
  | 'barRadius'
  | 'barWidth'
  | 'buffer'
  | 'chapters'
  | 'disabled'
  | 'elevation'
  | 'height'
  | 'live'
  | 'max'
  | 'modelValue'
  | 'normalize'
  | 'readonly'
  | 'rounded'
  | 'sampleStrategy'
  | 'step'
  | 'style'
  | 'thumb'
  | 'tile'
  | 'tooltip'

export declare const VAudioWaveform: VuetifyComponent<
  VAudioWaveformProps,
  VAudioWaveformDefaultKeys,
  {
    'update:modelValue': (value: number) => true
    'drag:start': (value: number) => true
    'drag:end': (value: number) => true
  },
  VAudioWaveformSlots
>
export type VAudioWaveform = InstanceType<typeof VAudioWaveform>
