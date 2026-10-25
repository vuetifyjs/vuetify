// Types
import type { ComponentInternalInstance, ShallowRef, StyleValue, TransitionProps } from 'vue'
import type { VIconBtn } from '@/components/VIconBtn/VIconBtn.types'
import type { Density } from '@/composables/density.types'
import type { LoaderSlotProps } from '@/composables/loader.types'
import type { MediaSeekStep, MediaSeekTarget } from '@/labs/composables/media.types'
import type { VMediaProgressBarChapter } from '@/labs/VMediaProgressBar/VMediaProgressBar.types'
import type { VMediaVolumeOptions, VMediaVolumeSlider } from '@/labs/VMediaVolume/VMediaVolume.types'
import type { VVideoAction, VVideoControls, VVideoControlsActionsSlot, VVideoControlsPropsSlot } from '@/labs/VVideo/VVideoControls.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VVideoSlots = {
  [key: `action.${string}`]: VVideoControlsActionsSlot
  header: never
  controls: VVideoControlsActionsSlot
  play: VVideoControlsPropsSlot
  progress: VVideoControlsPropsSlot
  time: VVideoControlsActionsSlot
  'time.elapsed': VVideoControlsActionsSlot
  'time.remaining': VVideoControlsActionsSlot
  'time.total': VVideoControlsActionsSlot
  prepend: VVideoControlsActionsSlot
  append: VVideoControlsActionsSlot
  loader: LoaderSlotProps
  sources: never
  error: { error?: MediaError | boolean }
}

export interface VVideoProps {
  actions?: string | readonly (VVideoAction | readonly VVideoAction[])[]
  aspectRatio?: string | number
  autoplay?: boolean
  backgroundColor?: string
  bgColor?: string
  chapters?: readonly VMediaProgressBarChapter[]
  class?: any
  color?: string
  controlsProps?: VVideoControls['$props']
  controlsTransition?: string | boolean | (TransitionProps & { component?: any }) | null
  controlsVariant?: 'default' | 'hidden' | 'tube' | 'mini'
  density?: Density
  detached?: boolean
  duration?: number
  eager?: boolean
  elevation?: string | number
  error?: boolean | MediaError
  floating?: boolean
  height?: string | number
  hideBuffer?: boolean
  hideControls?: boolean
  hideFullscreen?: boolean
  hideOverlay?: boolean
  hidePlay?: boolean
  hideProgressBar?: boolean
  hideThumb?: boolean
  hideVolume?: boolean
  hoverElevation?: string | number
  image?: string
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  muted?: boolean
  noFullscreen?: boolean
  pills?: boolean
  playing?: boolean
  playProps?: VIconBtn['$props']
  progress?: number
  progressColor?: string
  progressVariant?: 'default' | 'pill' | 'wavy'
  rounded?: string | number | boolean | (string | number | boolean)[]
  seekStep?: MediaSeekStep
  splitTime?: boolean
  src?: string
  srcObject?: MediaProvider | null
  startAt?: string | number
  style?: StyleValue
  theme?: string
  trackColor?: string
  type?: string
  variant?: 'background' | 'player'
  volume?: string | number
  volumeProps?: VMediaVolumeOptions
  volumeSlider?: VMediaVolumeSlider
  width?: string | number
}

type VVideoDefaultKeys =
  | 'autoplay'
  | 'chapters'
  | 'controlsVariant'
  | 'density'
  | 'detached'
  | 'duration'
  | 'eager'
  | 'floating'
  | 'hideBuffer'
  | 'hideControls'
  | 'hideFullscreen'
  | 'hideOverlay'
  | 'hidePlay'
  | 'hideProgressBar'
  | 'hideThumb'
  | 'hideVolume'
  | 'muted'
  | 'noFullscreen'
  | 'pills'
  | 'playing'
  | 'progress'
  | 'seekStep'
  | 'splitTime'
  | 'style'
  | 'variant'
  | 'volume'
  | 'volumeSlider'

export declare const VVideo: VuetifyComponent<
  VVideoProps,
  VVideoDefaultKeys,
  {
    error: (value: boolean | MediaError) => true
    loaded: (element: HTMLVideoElement) => true
    'update:error': (value: boolean | MediaError) => true
    'update:playing': (value: boolean) => true
    'update:progress': (value: number) => true
    'update:volume': (value: number) => true
  },
  VVideoSlots,
  { retry: () => void, seek: (target: MediaSeekTarget) => void, skipTo: (percent: number) => void, toggleFullscreen: () => Promise<void>, _: ComponentInternalInstance, toggleMuted: () => void, _allExposed: { toggleMuted: () => void } | { retry: () => void, seek: (target: MediaSeekTarget) => void, skipTo: (percent: number) => void, toggleFullscreen: () => Promise<void> }, video: ShallowRef<HTMLVideoElement | undefined, HTMLVideoElement | undefined> }
>
export type VVideo = InstanceType<typeof VVideo>

export {}
