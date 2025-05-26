// Components
import { VDefaultsProvider } from '@/components/VDefaultsProvider/VDefaultsProvider'
import { VSpacer } from '@/components/VGrid/VSpacer'
import { VIcon } from '@/components/VIcon/VIcon'
import { VMenu } from '@/components/VMenu/VMenu'
import { VSheet } from '@/components/VSheet/VSheet'
import { VSlider } from '@/components/VSlider/VSlider'
import { VIconBtn } from '@/labs/VIconBtn/VIconBtn'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { computed, shallowRef } from 'vue'
import { formatTime, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType, Ref } from 'vue'

export type VVideoControlsActionsSlot = {
  play: () => void
  pause: () => void
  skipTo: (v: number) => void
  volume: Ref<number>
  volumeIcon: string
  isPlaying: boolean
  progress: number
  toggleMuted: () => void
  toggleFullscreen: () => void
}

export type VVideoControlsSlots = {
  default: VVideoControlsActionsSlot
  prepend: VVideoControlsActionsSlot
  append: VVideoControlsActionsSlot
}

const allowedVariants = ['hidden', 'default', 'tube', 'mini'] as const
export type VVideoControlsVariant = typeof allowedVariants[number]

export const makeVVideoControlsProps = propsFactory({
  color: String,
  backgroundColor: String,
  trackColor: String,
  // disabled: Boolean,
  playing: Boolean,
  hidePlay: Boolean,
  hideVolume: Boolean,
  floating: Boolean,
  splitTime: Boolean,
  pills: Boolean,
  detached: Boolean,
  progress: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 0,
  },
  volume: {
    type: Number,
    default: 0,
  },
  variant: {
    type: String as PropType<VVideoControlsVariant>,
    default: 'default',
    validator: (v: any) => allowedVariants.includes(v),
  },
  ...makeElevationProps({ elevation: 4 }),
  ...makeThemeProps(),
}, 'VVideoControls')

export const VVideoControls = genericComponent<VVideoControlsSlots>()({
  name: 'VVideoControls',

  props: makeVVideoControlsProps(),

  emits: {
    'update:playing': (val: boolean) => true,
    'update:progress': (val: number) => true,
    'update:volume': (val: number) => true,
    skip: (val: number) => true,
    'click:fullscreen': () => true,
  },

  setup (props, { emit, slots }) {
    const { themeClasses } = provideTheme(props)
    const { elevationClasses } = useElevation(props)

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(() => {
      const fallbackBackground = props.detached ? 'surface' : undefined
      return props.backgroundColor ?? fallbackBackground
    })

    const isPlaying = useProxiedModel(props, 'playing')
    const progress = useProxiedModel(props, 'progress')
    const volume = useProxiedModel(props, 'volume')
    const lastVolume = shallowRef(0)

    const progressText = computed(() => {
      const secondsElapsed = Math.round(props.progress / 100 * props.duration)
      return {
        elapsed: formatTime(secondsElapsed),
        remaining: formatTime(props.duration - secondsElapsed),
        total: formatTime(props.duration),
      }
    })

    function play () {
      isPlaying.value = true
    }

    function pause () {
      isPlaying.value = false
    }

    function skipTo (v: number) {
      progress.value = v
    }

    function toggleMuted () {
      if (volume.value) {
        lastVolume.value = volume.value
        volume.value = 0
      } else {
        volume.value = lastVolume.value
      }
    }

    function toggleFullscreen () {
      emit('click:fullscreen')
    }

    useRender(() => {
      const innerDefaults = {
        VIconBtn: {
          size: 28,
          iconSize: props.pills ? 24 : 20,
          variant: 'text',
          color: props.color,
        },
        VSlider: {
          thumbSize: props.variant === 'tube' ? 10 : 16,
          hideDetails: true,
        },
      }

      const volumeIcon = volume.value > 70 ? 'mdi-volume-high'
        : volume.value > 40 ? 'mdi-volume-medium'
        : volume.value > 10 ? 'mdi-volume-low'
        : 'mdi-volume-off'

      const pillClasses = [
        'v-video-control__pill',
        props.pills ? elevationClasses.value : [],
      ]

      const slotProps = {
        play,
        pause,
        isPlaying: isPlaying.value,
        progress: progress.value,
        skipTo,
        volume,
        volumeIcon,
        toggleMuted,
        toggleFullscreen,
      }

      return (
        <div
          class={[
            'v-video-controls',
            `v-video-controls--variant-${props.variant}`,
            { 'v-video-controls--pills': props.pills },
            { 'v-video-controls--detached': props.detached },
            { 'v-video-controls--floating': props.floating },
            { 'v-video-controls--split-time': props.splitTime },
            backgroundColorClasses.value,
            props.detached && !props.pills ? elevationClasses.value : [],
            themeClasses.value,
          ]}
          style={[
            backgroundColorStyles.value,
          ]}
        >
          <VDefaultsProvider defaults={ innerDefaults }>
            { slots.default?.(slotProps) ?? (
              <>
                { props.variant !== 'mini' && (
                  <>
                    { !props.hidePlay && (
                      <div class={[pillClasses, 'v-video__action-play']}>
                        <VIconBtn
                          icon={ isPlaying.value ? 'mdi-pause' : 'mdi-play' }
                          onClick={ () => isPlaying.value = !isPlaying.value }
                        />
                      </div>
                    )}
                    <div class={ pillClasses }>
                      { slots.prepend?.(slotProps) }
                    </div>
                    { props.splitTime
                      ? <span class={[pillClasses, 'v-video__time']}>{ progressText.value.elapsed }</span>
                      : props.variant !== 'default'
                        ? <span class={[pillClasses, 'v-video__time']}>{ progressText.value.elapsed } / { progressText.value.total }</span>
                        : ''
                    }
                    <VSlider
                      modelValue={ props.progress }
                      noKeyboard
                      color={ props.trackColor ?? props.color }
                      trackColor={ props.variant === 'tube' ? 'white' : undefined }
                      class="v-video__track"
                      onUpdate:modelValue={ skipTo }
                    />
                    { props.variant === 'tube' && <VSpacer /> }
                    { props.splitTime
                      ? <span class={[pillClasses, 'v-video__time']}>{ progressText.value.remaining }</span>
                      : ''
                    }
                  </>
                )}
                { props.variant === 'mini' && (
                  <>
                    <VSpacer />
                    <div class={ pillClasses }>
                      { slots.prepend?.(slotProps) }
                    </div>
                    { !props.hidePlay && (
                      <div class={[pillClasses, 'v-video__action-play']}>
                        <VIconBtn
                          icon={ isPlaying.value ? 'mdi-pause' : 'mdi-play' }
                          onClick={ () => isPlaying.value = !isPlaying.value }
                        />
                      </div>
                    )}
                  </>
                )}
                <div class={ pillClasses }>
                  { !props.hideVolume && (
                    <VIconBtn key="volume-control" icon={ volumeIcon }>
                      <VIcon />
                      <VMenu
                        offset="8"
                        activator="parent"
                        location="top center"
                        contentClass="v-video__volume-menu"
                        close-on-content-click={ false }
                      >
                        <VSheet
                          class="pa-2 overflow-hidden"
                          height="124"
                          color="surface-variant"
                        >
                          <VSlider
                            direction="vertical"
                            hide-details
                            color={ props.color ?? 'surface' }
                            style="height: 100px"
                            class="my-1"
                            modelValue={ volume.value }
                            onUpdate:modelValue={ v => volume.value = v }
                          />
                        </VSheet>
                      </VMenu>
                    </VIconBtn>
                  )}
                  { slots.append?.(slotProps) }
                </div>

                { props.variant === 'mini' && (<VSpacer />) }
              </>
            )}
          </VDefaultsProvider>
        </div>
      )
    })

    return {
      toggleMuted,
    }
  },
})

export type VVideoControls = InstanceType<typeof VVideoControls>
