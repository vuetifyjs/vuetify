/* eslint-disable complexity */

// Styles
import './VAudioControls.sass'

// Components
import { makeVAudioWaveformProps, VAudioWaveform } from './VAudioWaveform'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VSpacer } from '@/components/VGrid'
import { VIconBtn } from '@/components/VIconBtn/VIconBtn'
import { VList, VListItem } from '@/components/VList'
import { VMenu } from '@/components/VMenu'
import { VSlider } from '@/components/VSlider'

// Composables
import { useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { computed, shallowRef, toRef } from 'vue'
import { formatDuration } from './time'
import { clamp, genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export type VAudioControlsVariant =
  | 'default'
  | 'waveform-top'
  | 'waveform-bottom'
  | 'mini'
  | 'hidden'

export type VAudioControlsTimeSlot = {
  elapsed: string
  remaining: string
  total: string
  progress: number
}

export type VAudioControlsActionsSlot = {
  play: () => void
  pause: () => void
  stop: () => void
  skipTo: (percent: number) => void
  skipBy: (seconds: number) => void
  playing: boolean
  progress: number
  currentTime: VAudioControlsTimeSlot
  duration: number
  volume: number
  toggleMuted: () => void
  playbackRate: number
  setPlaybackRate: (v: number) => void
  labels: Record<string, string>
}

export type VAudioControlsSlots = {
  default: VAudioControlsActionsSlot
  prepend: VAudioControlsActionsSlot
  append: VAudioControlsActionsSlot
  waveform: VAudioControlsActionsSlot
  time: VAudioControlsTimeSlot
}

export const makeVAudioControlsProps = propsFactory({
  playing: Boolean,
  progress: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 0,
  },
  volume: {
    type: [Number, String],
    default: 100,
  },
  playbackRate: {
    type: Number,
    default: 1,
  },
  playbackRates: {
    type: Array as PropType<readonly number[]>,
    default: () => [],
  },
  variant: {
    type: String as PropType<VAudioControlsVariant>,
    default: 'default',
  },
  hidePlay: Boolean,
  hideStop: Boolean,
  hideVolume: Boolean,
  hideTime: Boolean,
  hideWaveform: Boolean,
  skipInterval: {
    type: [Number, String],
    default: 0,
  },
  splitTime: Boolean,
  timeDisplay: {
    type: String as PropType<'elapsed' | 'remaining' | 'duration' | 'elapsed-duration'>,
    default: 'elapsed-duration',
  },

  playIcon: {
    type: String,
    default: '$play',
  },
  pauseIcon: {
    type: String,
    default: '$pause',
  },
  stopIcon: {
    type: String,
    default: '$stop',
  },
  // Unset by default so the graded ladder below runs. Setting it pins one icon for every
  // non-zero level, which is what a consumer asking for a specific glyph wants.
  volumeIcon: String,
  muteIcon: {
    type: String,
    default: '$volumeOff',
  },
  skipForwardIcon: {
    type: String,
    default: '$skipForward',
  },
  skipBackwardIcon: {
    type: String,
    default: '$skipBackward',
  },

  color: String,
  backgroundColor: String,
  pills: Boolean,
  floating: Boolean,
  detached: Boolean,

  waveformProps: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({}),
  },

  ...omit(makeVAudioWaveformProps(), [
    'modelValue',
    'color',
    'height',
    'disabled',
    'duration',
  ]),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeThemeProps(),
}, 'VAudioControls')

// `VIconBtn` forwards `onClick` as a fallthrough attribute rather than a declared emit,
// so its generated JSX types omit it. Upstream `VVideoControls` passes it the same way.
const clickable = (handler: () => void) => ({ onClick: handler } as Record<string, unknown>)

export const VAudioControls = genericComponent<VAudioControlsSlots>()({
  name: 'VAudioControls',

  props: makeVAudioControlsProps(),

  emits: {
    'update:playing': (value: boolean) => true,
    'update:progress': (value: number) => true,
    'update:volume': (value: number) => true,
    'update:playbackRate': (value: number) => true,
    skip: (percent: number) => true,
    scrubStart: () => true,
    scrubEnd: () => true,
    'click:stop': () => true,
  },

  setup (props, { emit, slots }) {
    const { t } = useLocale()
    const { themeClasses } = provideTheme(props)
    const { densityClasses } = useDensity(props)
    const { elevationClasses } = useElevation(props)
    const { textColorClasses, textColorStyles } = useTextColor(toRef(() => props.color))

    const playing = useProxiedModel(props, 'playing')
    const volume = useProxiedModel(props, 'volume', 100, v => Number(v ?? 100))
    const playbackRate = useProxiedModel(props, 'playbackRate')

    const progress = toRef(() => clamp(Number(props.progress) || 0, 0, 100))

    const lastVolume = shallowRef(Number(props.volume) || 100)

    // The same four-step ladder and thresholds `VVideoVolume` uses, so the two media
    // components read the volume alias group identically instead of each picking a subset.
    const volumeIcon = toRef(() => {
      if (volume.value <= 0) return props.muteIcon
      if (props.volumeIcon) return props.volumeIcon

      if (volume.value > 70) return '$volumeHigh'
      if (volume.value > 40) return '$volumeMedium'
      if (volume.value > 10) return '$volumeLow'

      return '$volumeOff'
    })

    const labels = computed(() => ({
      play: t('$vuetify.audio.play'),
      pause: t('$vuetify.audio.pause'),
      stop: t('$vuetify.audio.stop'),
      seek: t('$vuetify.audio.seek'),
      volume: t('$vuetify.audio.volume'),
      mute: t('$vuetify.audio.mute'),
      unmute: t('$vuetify.audio.unmute'),
      skipForward: t('$vuetify.audio.skipForward', Number(props.skipInterval) || 0),
      skipBackward: t('$vuetify.audio.skipBackward', Number(props.skipInterval) || 0),
      playbackRate: t('$vuetify.audio.playbackRate'),
    }))

    const elapsedSeconds = toRef(() => props.duration > 0
      ? clamp(progress.value / 100 * props.duration, 0, props.duration)
      : 0,
    )

    const currentTime = computed<VAudioControlsTimeSlot>(() => ({
      elapsed: formatDuration(elapsedSeconds.value, props.duration),
      remaining: formatDuration(props.duration - elapsedSeconds.value, props.duration),
      total: formatDuration(props.duration, props.duration),
      progress: progress.value,
    }))

    const timeText = computed(() => {
      const { elapsed, remaining, total } = currentTime.value

      switch (props.timeDisplay) {
        case 'elapsed': { return elapsed
        }
        case 'remaining': { return t('$vuetify.audio.remainingTime', remaining)
        }
        case 'duration': { return total
        }
        default: { return `${elapsed} / ${total}`
        }
      }
    })

    const isMini = toRef(() => props.variant === 'mini')
    const skipSeconds = toRef(() => Number(props.skipInterval) || 0)

    function play () {
      playing.value = true
    }

    function pause () {
      playing.value = false
    }

    function togglePlay () {
      playing.value = !playing.value
    }

    function stop () {
      emit('click:stop')
    }

    function skipTo (percent: number) {
      const next = clamp(percent, 0, 100)
      emit('update:progress', next)
      emit('skip', next)
    }

    function skipBy (seconds: number) {
      if (!props.duration) return

      skipTo(progress.value + seconds / props.duration * 100)
    }

    function toggleMuted () {
      if (volume.value > 0) {
        lastVolume.value = volume.value
        volume.value = 0
      } else {
        volume.value = lastVolume.value || 100
      }
    }

    function setPlaybackRate (value: number) {
      playbackRate.value = value
    }

    const slotProps = computed<VAudioControlsActionsSlot>(() => ({
      play,
      pause,
      stop,
      skipTo,
      skipBy,
      playing: playing.value,
      progress: progress.value,
      currentTime: currentTime.value,
      duration: props.duration,
      volume: volume.value,
      toggleMuted,
      playbackRate: playbackRate.value,
      setPlaybackRate,
      labels: labels.value,
    }))

    useRender(() => {
      if (props.variant === 'hidden') return <></>

      const waveformProps = {
        ...VAudioWaveform.filterProps(props),
        ...props.waveformProps,
      }

      const btnSize = props.density === 'compact'
        ? 30
        : (props.density === 'comfortable'
          ? 36
          : 42)
      const iconSize = props.density === 'compact'
        ? 18
        : (props.density === 'comfortable'
          ? 20
          : 22)

      const innerDefaults = {
        VIconBtn: {
          size: btnSize,
          iconSize,
          variant: 'text',
          color: props.color,
        },
        VSlider: {
          hideDetails: true,
          thumbSize: 12,
          trackSize: 2,
        },
      }

      const showWaveform = !props.hideWaveform && !isMini.value
      const showVolume = !props.hideVolume && !isMini.value
      const showStop = !props.hideStop && !isMini.value
      const showSkip = skipSeconds.value > 0 && !isMini.value
      const showRates = props.playbackRates.length > 0 && !isMini.value

      return (
        <div
          class={[
            'v-audio-controls',
            {
              'v-audio-controls--detached': props.detached,
              'v-audio-controls--floating': props.floating,
              'v-audio-controls--pills': props.pills,
              [`v-audio-controls--${props.variant}`]: true,
            },
            themeClasses.value,
            densityClasses.value,
            elevationClasses.value,
            textColorClasses.value,
            props.class,
          ]}
          style={[textColorStyles.value, props.style]}
        >
          <VDefaultsProvider defaults={ innerDefaults }>
            { slots.default?.(slotProps.value) ?? (
              <>
                { slots.prepend?.(slotProps.value) }

                <div class={['v-audio-controls__actions', { 'v-audio-control__pill': props.pills }]}>
                  { showSkip && (
                    <VIconBtn
                      key="skip-backward"
                      icon={ props.skipBackwardIcon }
                      aria-label={ labels.value.skipBackward }
                      { ...clickable(() => skipBy(-skipSeconds.value)) }
                    />
                  )}

                  { !props.hidePlay && (
                    <VIconBtn
                      key="play"
                      class="v-audio__action-play"
                      icon={ playing.value ? props.pauseIcon : props.playIcon }
                      aria-label={ playing.value ? labels.value.pause : labels.value.play }
                      { ...clickable(togglePlay) }
                    />
                  )}

                  { showSkip && (
                    <VIconBtn
                      key="skip-forward"
                      icon={ props.skipForwardIcon }
                      aria-label={ labels.value.skipForward }
                      { ...clickable(() => skipBy(skipSeconds.value)) }
                    />
                  )}

                  { showStop && (
                    <VIconBtn
                      icon={ props.stopIcon }
                      aria-label={ labels.value.stop }
                      { ...clickable(stop) }
                    />
                  )}
                </div>

                { props.splitTime && !props.hideTime && (
                  <div class="v-audio-controls__time">
                    { slots.time?.(currentTime.value) ?? currentTime.value.elapsed }
                  </div>
                )}

                { showWaveform
                  ? (
                      <div class="v-audio-controls__waveform">
                        { slots.waveform?.(slotProps.value) ?? (
                          <VAudioWaveform
                            { ...waveformProps }
                            modelValue={ progress.value }
                            color={ props.color }
                            duration={ props.duration }
                            aria-label={ labels.value.seek }
                            onUpdate:modelValue={ skipTo }
                            onStart={ () => emit('scrubStart') }
                            onEnd={ () => emit('scrubEnd') }
                          />
                        )}
                      </div>
                  )
                  : <VSpacer /> }

                { !props.hideTime && (
                  <div class="v-audio-controls__time">
                    { props.splitTime
                      ? (slots.time?.(currentTime.value) ?? t('$vuetify.audio.remainingTime', currentTime.value.remaining))
                      : (slots.time?.(currentTime.value) ?? timeText.value)}
                  </div>
                )}

                { showRates && (
                  <VMenu>
                    {{
                      activator: ({ props: activatorProps }: any) => (
                        <VIconBtn
                          { ...activatorProps }
                          aria-label={ labels.value.playbackRate }

                        >
                          <span class="text-caption">
                            { t('$vuetify.audio.playbackRateValue', playbackRate.value) }
                          </span>
                        </VIconBtn>
                      ),
                      default: () => (
                        <VList density="compact">
                          { props.playbackRates.map(rate => (
                            <VListItem
                              active={ rate === playbackRate.value }
                              title={ t('$vuetify.audio.playbackRateValue', rate) }
                              { ...clickable(() => setPlaybackRate(rate)) }
                            />
                          ))}
                        </VList>
                      ),
                    }}
                  </VMenu>
                )}

                { showVolume && (
                  <div class="v-audio-controls__volume">
                    <VIconBtn
                      icon={ volumeIcon.value }
                      aria-label={ volume.value > 0 ? labels.value.mute : labels.value.unmute }
                      { ...clickable(toggleMuted) }
                    />
                    <VSlider
                      color={ props.color }
                      max={ 100 }
                      min={ 0 }
                      modelValue={ volume.value }
                      step={ 1 }
                      aria-label={ labels.value.volume }
                      onUpdate:modelValue={ (v: number) => {
                        volume.value = v
                      }}
                    />
                  </div>
                )}

                { slots.append?.(slotProps.value) }
              </>
            )}
          </VDefaultsProvider>
        </div>
      )
    })

    return { toggleMuted }
  },
})

export type VAudioControls = InstanceType<typeof VAudioControls>
