// Types
import type { ShallowRef, StyleValue } from 'vue'
import type { VIconBtn } from '@/components/VIconBtn/VIconBtn.types'
import type { ForwardRefs } from '@/composables/forwardRefs.types'
import type { LoaderSlotProps } from '@/composables/loader.types'
import type { MediaSeekStep, MediaSeekTarget } from '@/labs/composables/media.types'
import type { VAudioAction, VAudioControls, VAudioControlsActionsSlot, VAudioControlsSlots } from '@/labs/VAudio/VAudioControls.types'
import type { VMediaProgressBar, VMediaProgressBarChapter } from '@/labs/VMediaProgressBar/VMediaProgressBar.types'
import type { VMediaVolumeOptions, VMediaVolumeSlider } from '@/labs/VMediaVolume/VMediaVolume.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VAudioSlots = Omit<VAudioControlsSlots, 'default'> & {
  controls: VAudioControlsActionsSlot
  loader: LoaderSlotProps
  error: { error?: MediaError | boolean }
  sources: never
}

export interface VAudioProps {
  actions?: string | readonly VAudioAction[]
  autoplay?: boolean
  bgColor?: string
  chapters?: readonly VMediaProgressBarChapter[]
  class?: any
  color?: string
  crossorigin?: 'anonymous' | 'use-credentials'
  disabled?: boolean
  error?: boolean | MediaError
  gap?: string | number | readonly [string | number, string | number]
  height?: string | number
  hideBuffer?: boolean
  hideThumb?: boolean
  hideTime?: boolean
  loop?: boolean
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  muted?: boolean
  playbackRate?: number
  playing?: boolean
  playProps?: VIconBtn['$props']
  preload?: 'auto' | 'none' | 'metadata'
  progress?: number
  progressProps?: VMediaProgressBar['$props']
  progressVariant?: 'default' | 'pill' | 'wavy'
  readonly?: boolean
  rounded?: string | number | boolean
  seekStep?: MediaSeekStep
  src?: string
  srcObject?: MediaProvider | null
  startAt?: string | number
  style?: StyleValue
  theme?: string
  tile?: boolean
  tooltip?: boolean | { location?: 'top' | 'bottom' | undefined, offset?: string | number | undefined }
  type?: string
  volume?: string | number
  volumeProps?: VMediaVolumeOptions
  volumeSlider?: VMediaVolumeSlider
  width?: string | number
}

type VAudioDefaultKeys =
  | 'actions'
  | 'autoplay'
  | 'chapters'
  | 'disabled'
  | 'hideBuffer'
  | 'hideThumb'
  | 'hideTime'
  | 'loop'
  | 'muted'
  | 'playbackRate'
  | 'playing'
  | 'preload'
  | 'progress'
  | 'readonly'
  | 'rounded'
  | 'seekStep'
  | 'style'
  | 'tile'
  | 'tooltip'
  | 'volume'

export declare const VAudio: VuetifyComponent<
  VAudioProps,
  VAudioDefaultKeys,
  {
    loaded: (element: HTMLAudioElement) => true
    ended: () => true
    error: (value: boolean | MediaError) => true
    'update:playing': (value: boolean) => true
    'update:progress': (value: number) => true
    'update:volume': (value: number) => true
    'update:playbackRate': (value: number) => true
    'update:error': (value: boolean | MediaError) => true
  },
  VAudioSlots,
  ForwardRefs<{ audio: ShallowRef<HTMLAudioElement | undefined, HTMLAudioElement | undefined>, play: () => Promise<void>, pause: () => void, stop: () => void, seek: (target: MediaSeekTarget) => void, retry: () => void }, [VAudioControls]>
>
export type VAudio = InstanceType<typeof VAudio>

export {}
