// Types
import type { Ref } from 'vue'
import type { VIconBtn } from '@/components/VIconBtn/VIconBtn.types'
import type { Density } from '@/composables/density.types'
import type { MediaSeekStep, MediaSeekTarget } from '@/labs/composables/media.types'
import type { VMediaProgressBarChapter } from '@/labs/VMediaProgressBar/VMediaProgressBar.types'
import type { VMediaVolumeOptions, VMediaVolumeSlider } from '@/labs/VMediaVolume/VMediaVolume.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VVideoAction =
  | 'play' | 'progress' | 'time' | 'elapsed' | 'remaining' | 'volume' | 'fullscreen'
  | 'prepend' | 'append' | '-' | (string & {})

export type VVideoControlsSlots = {
  [key: `action.${string}`]: VVideoControlsActionsSlot
  default: VVideoControlsActionsSlot
  play: VVideoControlsPropsSlot
  progress: VVideoControlsPropsSlot
  time: VVideoControlsActionsSlot
  'time.elapsed': VVideoControlsActionsSlot
  'time.remaining': VVideoControlsActionsSlot
  'time.total': VVideoControlsActionsSlot
  prepend: VVideoControlsActionsSlot
  append: VVideoControlsActionsSlot
}

export type VVideoControlsActionsSlot = {
  play: () => void
  pause: () => void
  seek: (target: MediaSeekTarget) => void
  skipTo: (percent: number) => void
  volume: Ref<number>
  playing: boolean
  progress: number
  currentTime: { elapsed: string, remaining: string, total: string }
  duration: number
  toggleMuted: () => void
  fullscreen: boolean
  toggleFullscreen: () => void
  labels: Record<string, string>
}

export type VVideoControlsPropsSlot = VVideoControlsActionsSlot & {
  props: Record<string, unknown>
}

export interface VVideoControlsProps {
  actions?: string | readonly (VVideoAction | readonly VVideoAction[])[]
  backgroundColor?: string
  bgColor?: string
  buffer?: number
  chapters?: readonly VMediaProgressBarChapter[]
  color?: string
  density?: Density
  detached?: boolean
  duration?: number
  elevation?: string | number
  floating?: boolean
  fullscreen?: boolean
  gap?: string | number | readonly [string | number, string | number]
  hideFullscreen?: boolean
  hidePlay?: boolean
  hideProgressBar?: boolean
  hideThumb?: boolean
  hideVolume?: boolean
  hoverElevation?: string | number
  muted?: boolean
  pills?: boolean
  playing?: boolean
  playProps?: VIconBtn['$props']
  progress?: number
  progressColor?: string
  progressVariant?: 'default' | 'pill' | 'wavy'
  rounded?: string | number | boolean
  seekStep?: MediaSeekStep
  splitTime?: boolean
  theme?: string
  tile?: boolean
  trackColor?: string
  variant?: 'default' | 'hidden' | 'tube' | 'mini'
  volume?: string | number
  volumeProps?: VMediaVolumeOptions
  volumeSlider?: VMediaVolumeSlider
}

export type VVideoControlsDefaultKeys =
  | 'buffer'
  | 'chapters'
  | 'density'
  | 'detached'
  | 'duration'
  | 'floating'
  | 'fullscreen'
  | 'hideFullscreen'
  | 'hidePlay'
  | 'hideProgressBar'
  | 'hideThumb'
  | 'hideVolume'
  | 'muted'
  | 'pills'
  | 'playing'
  | 'progress'
  | 'rounded'
  | 'seekStep'
  | 'splitTime'
  | 'tile'
  | 'variant'
  | 'volume'
  | 'volumeSlider'

export declare const VVideoControls: VuetifyComponent<
  VVideoControlsProps,
  VVideoControlsDefaultKeys,
  {
    'update:playing': (value: boolean) => true
    'update:progress': (value: number) => true
    'update:volume': (value: number) => true
    'click:fullscreen': () => true
  },
  VVideoControlsSlots,
  { toggleMuted: () => void }
>
export type VVideoControls = InstanceType<typeof VVideoControls>
