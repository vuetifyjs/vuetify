// Types
import type { Ref, StyleValue } from 'vue'
import type { VIconBtn } from '@/components/VIconBtn/VIconBtn.types'
import type { MediaSeekStep, MediaSeekTarget } from '@/labs/composables/media.types'
import type { VMediaProgressBar, VMediaProgressBarChapter } from '@/labs/VMediaProgressBar/VMediaProgressBar.types'
import type { VMediaVolumeOptions, VMediaVolumeSlider } from '@/labs/VMediaVolume/VMediaVolume.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VAudioAction = 'play' | 'progress' | 'time' | 'elapsed' | 'remaining' | 'volume' | '-' | (string & {})

export type VAudioControlsSlots = {
  [key: `action.${string}`]: VAudioControlsActionsSlot
  default: VAudioControlsActionsSlot
  play: VAudioControlsPropsSlot
  progress: VAudioControlsPropsSlot
  time: VAudioControlsActionsSlot
  'time.elapsed': VAudioControlsActionsSlot
  'time.remaining': VAudioControlsActionsSlot
  'time.total': VAudioControlsActionsSlot
  prepend: VAudioControlsActionsSlot
  append: VAudioControlsActionsSlot
}

export type VAudioControlsActionsSlot = {
  play: () => void
  pause: () => void
  stop: () => void
  seek: (target: MediaSeekTarget) => void
  playing: boolean
  progress: number
  currentTime: VAudioControlsTime
  duration: number
  volume: Ref<number>
  toggleMuted: () => void
  playbackRate: number
  setPlaybackRate: (value: number) => void
  labels: Record<string, string>
}

export type VAudioControlsPropsSlot = VAudioControlsActionsSlot & {
  props: Record<string, unknown>
}

export type VAudioControlsTime = {
  elapsed: string
  remaining: string
  total: string
}

export interface VAudioControlsProps {
  actions?: string | readonly VAudioAction[]
  buffer?: number
  chapters?: readonly VMediaProgressBarChapter[]
  class?: any
  color?: string
  duration?: number
  gap?: string | number | readonly [string | number, string | number]
  hideThumb?: boolean
  hideTime?: boolean
  muted?: boolean
  playbackRate?: number
  playing?: boolean
  playProps?: VIconBtn['$props']
  progress?: number
  progressProps?: VMediaProgressBar['$props']
  progressVariant?: 'default' | 'pill' | 'wavy'
  readonly?: boolean
  seekStep?: MediaSeekStep
  style?: StyleValue
  theme?: string
  tooltip?: boolean | { location?: 'top' | 'bottom' | undefined, offset?: string | number | undefined }
  volume?: string | number
  volumeProps?: VMediaVolumeOptions
  volumeSlider?: VMediaVolumeSlider
}

type VAudioControlsDefaultKeys =
  | 'actions'
  | 'buffer'
  | 'chapters'
  | 'duration'
  | 'hideThumb'
  | 'hideTime'
  | 'muted'
  | 'playbackRate'
  | 'playing'
  | 'progress'
  | 'readonly'
  | 'seekStep'
  | 'style'
  | 'tooltip'
  | 'volume'

export declare const VAudioControls: VuetifyComponent<
  VAudioControlsProps,
  VAudioControlsDefaultKeys,
  {
    'update:playing': (value: boolean) => true
    'update:progress': (value: number) => true
    'update:volume': (value: number) => true
    'update:playbackRate': (value: number) => true
    'drag:start': (value: number) => true
    'drag:end': (value: number) => true
    'click:stop': () => true
  },
  VAudioControlsSlots,
  { toggleMuted: () => void }
>
export type VAudioControls = InstanceType<typeof VAudioControls>

export {}
