/* eslint-disable complexity */

// Components
import { VVideoVolume } from './VVideoVolume'
import { VDefaultsProvider } from '@/components/VDefaultsProvider/VDefaultsProvider'
import { VSpacer } from '@/components/VGrid/VSpacer'
import { VSlider } from '@/components/VSlider/VSlider'
import { VIconBtn } from '@/labs/VIconBtn/VIconBtn'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Directives
import vTooltip from '@/directives/tooltip'

// Utilities
import { computed, shallowRef, toRef } from 'vue'
import { formatTime, genericComponent, propsFactory, renderSlot, useRender } from '@/util'

// Types
import type { PropType, Ref } from 'vue'

export type VVideoControlsActionsSlot = {
  play: () => void
  pause: () => void
  skipTo: (v: number) => void
  volume: Ref<number>
  playing: boolean
  progress: number
  toggleMuted: () => void
  fullscreen: boolean
  toggleFullscreen: () => void
  labels: Record<string, string>
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
  playing: Boolean,
  hidePlay: Boolean,
  hideVolume: Boolean,
  hideFullscreen: Boolean,
  fullscreen: Boolean,
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
  volume: [Number, String],
  variant: {
    type: String as PropType<VVideoControlsVariant>,
    default: 'default',
    validator: (v: any) => allowedVariants.includes(v),
  },
  volumeProps: Object as PropType<Pick<VVideoVolume['$props'], 'direction' | 'inline' | 'sliderProps' | 'menuProps'>>,

  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeThemeProps(),
}, 'VVideoControls')

export const VVideoControls = genericComponent<VVideoControlsSlots>()({
  name: 'VVideoControls',

  directives: { vTooltip: vTooltip as any },

  props: makeVVideoControlsProps(),

  emits: {
    'update:playing': (val: boolean) => true,
    'update:progress': (val: number) => true,
    'update:volume': (val: number) => true,
    skip: (val: number) => true,
    'click:fullscreen': () => true,
  },

  setup (props, { emit, slots }) {
    const { t } = useLocale()
    const { themeClasses, current: currentTheme } = provideTheme(props)
    const { densityClasses } = useDensity(props)
    const { elevationClasses } = useElevation(props)

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(() => {
      const fallbackBackground = props.detached ? 'surface' : undefined
      return props.backgroundColor ?? fallbackBackground
    })

    const trackColor = toRef(() => {
      if (props.trackColor) {
        return props.trackColor
      }

      const fallback = currentTheme.value.dark || !props.pills ? undefined : 'surface'
      return (props.pills ? props.backgroundColor : props.color) ?? fallback
    })

    const playing = useProxiedModel(props, 'playing')
    const progress = useProxiedModel(props, 'progress')
    const volume = useProxiedModel(props, 'volume', 0, (v?: number | string) => Number(v ?? 0))
    const lastVolume = shallowRef<number>()

    const currentTime = computed(() => {
      const secondsElapsed = Math.round(props.progress / 100 * props.duration)
      return {
        elapsed: formatTime(secondsElapsed),
        remaining: formatTime(props.duration - secondsElapsed),
        total: formatTime(props.duration),
      }
    })

    const labels = computed(() => {
      const playIconLocaleKey = playing.value ? 'pause' : 'play'
      const volumeIconLocaleKey = props.volumeProps?.inline ? (volume.value ? 'mute' : 'unmute') : 'showVolume'
      const fullscreenIconLocaleKey = props.fullscreen ? 'exitFullscreen' : 'enterFullscreen'
      return {
        seek: t('$vuetify.video.seek'),
        volume: t('$vuetify.video.volume'),
        playAction: t(`$vuetify.video.${playIconLocaleKey}`),
        volumeAction: t(`$vuetify.video.${volumeIconLocaleKey}`),
        fullscreenAction: t(`$vuetify.video.${fullscreenIconLocaleKey}`),
      }
    })

    function play () {
      playing.value = true
    }

    function pause () {
      playing.value = false
    }

    function skipTo (v: number) {
      progress.value = v
    }

    function toggleMuted () {
      if (volume.value) {
        lastVolume.value = volume.value
        volume.value = 0
      } else {
        volume.value = lastVolume.value ?? 100
      }
    }

    function toggleFullscreen () {
      emit('click:fullscreen')
    }

    useRender(() => {
      const sizes = props.pills
        ? [42, 36, 30]
        : [32, 28, 24]

      const innerDefaults = {
        VIconBtn: {
          size: props.density === 'compact' ? sizes[2]
          : props.density === 'comfortable' ? sizes[1]
          : sizes[0],
          iconSize: props.density === 'compact' ? 20
          : props.density === 'comfortable' ? 24
          : 26,
          variant: 'text',
          color: props.color,
        },
        VSlider: {
          thumbSize: props.variant === 'tube' ? 10 : 16,
          hideDetails: true,
        },
      }

      const regularBtnSize = innerDefaults.VIconBtn.size
      const playBtnSize = props.pills ? (regularBtnSize + 8) : regularBtnSize

      const pillClasses = [
        'v-video-control__pill',
        props.pills ? elevationClasses.value : [],
        props.pills ? backgroundColorClasses.value : [],
      ]

      const pillStyles = props.pills ? backgroundColorStyles.value : []

      const slotProps = {
        play,
        pause,
        playing: playing.value,
        progress: progress.value,
        currentTime: currentTime.value,
        skipTo,
        volume,
        toggleMuted,
        fullscreen: props.fullscreen,
        toggleFullscreen,
        labels: labels.value,
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
            !props.pills ? backgroundColorClasses.value : [],
            props.detached && !props.pills ? elevationClasses.value : [],
            densityClasses.value,
            themeClasses.value,
          ]}
          style={[
            !props.pills ? backgroundColorStyles.value : [],
            { '--v-video-controls-pill-height': `${regularBtnSize}px` },
          ]}
        >
          <VDefaultsProvider defaults={ innerDefaults }>
            { renderSlot(slots.default, slotProps, () => (
              <>
                { props.variant !== 'mini' ? (
                  <>
                    { !props.hidePlay ? (
                      <div
                        class={[pillClasses, 'v-video__action-play']}
                        style={ pillStyles }
                      >
                        <VIconBtn
                          icon={ playing.value ? '$pause' : '$play' }
                          size={ playBtnSize }
                          aria-label={ labels.value.playAction }
                          v-tooltip={[labels.value.playAction, 'top']}
                          onClick={ () => playing.value = !playing.value }
                        />
                      </div>
                    ) : undefined }
                    { slots.prepend ? (
                      <div
                        class={ pillClasses }
                        style={ pillStyles }
                      >
                        { slots.prepend(slotProps) }
                      </div>
                    ) : undefined }
                    { props.splitTime
                      ? (
                        <span
                          class={[pillClasses, 'v-video__time']}
                          style={ pillStyles }
                        >
                          { currentTime.value.elapsed }
                        </span>
                      )
                      : props.variant !== 'default'
                        ? (
                          <span
                            class={[pillClasses, 'v-video__time']}
                            style={ pillStyles }
                          >
                            { currentTime.value.elapsed } / { currentTime.value.total }
                          </span>
                        )
                        : ''
                    }
                    <VSlider
                      modelValue={ props.progress }
                      noKeyboard
                      color={ trackColor.value ?? 'surface-variant' }
                      trackColor={ props.variant === 'tube' ? 'white' : undefined }
                      class="v-video__track"
                      thumbLabel="always"
                      aria-label={ labels.value.seek }
                      onUpdate:modelValue={ skipTo }
                    >
                      {{
                        'thumb-label': () => currentTime.value.elapsed,
                      }}
                    </VSlider>
                    { props.variant === 'tube' ? <VSpacer /> : undefined }
                    { props.splitTime
                      ? (
                        <span
                          class={[pillClasses, 'v-video__time']}
                          style={ pillStyles }
                        >
                          { currentTime.value.remaining }
                        </span>
                      )
                      : ''
                    }
                  </>
                ) : undefined }
                { props.variant === 'mini' ? (
                  <>
                    <VSpacer />
                    { slots.prepend ? (
                      <div
                        class={ pillClasses }
                        style={ pillStyles }
                      >
                        { slots.prepend(slotProps) }
                      </div>
                    ) : undefined }
                    { !props.hidePlay ? (
                      <div
                        class={[pillClasses, 'v-video__action-play']}
                        style={ pillStyles }
                      >
                        <VIconBtn
                          icon={ playing.value ? '$pause' : '$play' }
                          size={ playBtnSize }
                          aria-label={ labels.value.playAction }
                          v-tooltip={[labels.value.playAction, 'top']}
                          onClick={ () => playing.value = !playing.value }
                        />
                      </div>
                    ) : undefined }
                  </>
                ) : undefined }
                { (!props.hideVolume || !props.hideFullscreen || slots.append) ? (
                  <div
                    class={ pillClasses }
                    style={ pillStyles }
                  >
                    { !props.hideVolume ? (
                      <VVideoVolume
                        key="volume-control"
                        sliderProps={{ color: props.color }}
                        modelValue={ volume.value }
                        label={ labels.value.volumeAction }
                        onUpdate:modelValue={ v => volume.value = v }
                        onClick={ () => props.volumeProps?.inline && toggleMuted() }
                        { ...props.volumeProps }
                      />
                    ) : undefined }
                    { slots.append?.(slotProps) }
                    { !props.hideFullscreen ? (
                      <VIconBtn
                        icon={ props.fullscreen ? '$fullscreenExit' : '$fullscreen' }
                        aria-label={ labels.value.fullscreenAction }
                        v-tooltip={[labels.value.fullscreenAction, 'top']}
                        onClick={ toggleFullscreen }
                      />
                    ) : undefined }
                  </div>
                ) : undefined }

                { props.variant === 'mini' ? (<VSpacer />) : undefined }
              </>
            ))}
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
