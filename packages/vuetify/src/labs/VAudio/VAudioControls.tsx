// Styles
import './VAudioControls.sass'

// Components
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VSpacer } from '@/components/VGrid'
import { VIconBtn } from '@/components/VIconBtn/VIconBtn'
import { VLocaleProvider } from '@/components/VLocaleProvider'
import { makeVMediaProgressBarProps, VMediaProgressBar } from '@/labs/VMediaProgressBar/VMediaProgressBar'
import { VMediaVolume } from '@/labs/VMediaVolume/VMediaVolume'

// Composables
import { useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { injectNestedDefaults } from '@/composables/defaults'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { resolveSeekTarget, useMute } from '@/labs/composables/media'

// Utilities
import { computed, Fragment, toRef } from 'vue'
import { clamp, formatTime, genericComponent, pick, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VSlider } from '@/components/VSlider'
import type { ClassValue } from '@/composables/component'
import type { MediaSeekTarget } from '@/labs/composables/media'
import type { VMediaVolumeOptions } from '@/labs/VMediaVolume/VMediaVolume'

export type VAudioAction = 'play' | 'progress' | 'time' | 'volume' | '-' | (string & {})

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
  seek: (target: MediaSeekTarget) => void
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

export type VAudioControlsPropsSlot = VAudioControlsActionsSlot & {
  props: Record<string, unknown>
}

export type VAudioControlsSlots = {
  default: VAudioControlsActionsSlot
  play: VAudioControlsPropsSlot
  prepend: VAudioControlsActionsSlot
  append: VAudioControlsActionsSlot
  progress: VAudioControlsPropsSlot
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
  actions: {
    type: [String, Array] as PropType<string | readonly VAudioAction[]>,
    default: () => ['play'],
  },
  actionsClass: null as unknown as PropType<ClassValue>,
  progressClass: null as unknown as PropType<ClassValue>,
  playProps: Object as PropType<VIconBtn['$props']>,
  hideTime: Boolean,
  seekable: {
    type: Boolean,
    default: true,
  },
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
  volumeProps: Object as PropType<VMediaVolumeOptions>,

  color: String,

  ...pick(makeVMediaProgressBarProps(), ['buffer', 'chapters', 'thumb', 'tooltip']),
  ...makeComponentProps(),
  ...makeThemeProps(),
}, 'VAudioControls')

export const VAudioControls = genericComponent<VAudioControlsSlots>()({
  name: 'VAudioControls',

  props: makeVAudioControlsProps(),

  emits: {
    'update:playing': (value: boolean) => true,
    'update:progress': (value: number) => true,
    'update:volume': (value: number) => true,
    'update:playbackRate': (value: number) => true,
    scrubStart: () => true,
    scrubEnd: () => true,
    'click:stop': () => true,
  },

  setup (props, { emit, slots }) {
    const { t } = useLocale()
    const btnDefaults = injectNestedDefaults<VIconBtn['$props']>('VIconBtn')
    const sliderDefaults = injectNestedDefaults<VSlider['$props']>('VSlider')
    const { themeClasses } = provideTheme(props)
    const { textColorClasses, textColorStyles } = useTextColor(toRef(() => props.color))

    const playing = useProxiedModel(props, 'playing')
    const volume = useProxiedModel(props, 'volume', 100, v => Number(v ?? 100))
    const playbackRate = useProxiedModel(props, 'playbackRate')

    const progress = toRef(() => clamp(Number(props.progress) || 0, 0, 100))

    const { toggleMuted } = useMute(volume)

    const labels = computed(() => ({
      play: t('$vuetify.media.play'),
      pause: t('$vuetify.media.pause'),
      seek: t('$vuetify.media.seek'),
      volume: t('$vuetify.media.volume'),
      mute: t('$vuetify.media.mute'),
      unmute: t('$vuetify.media.unmute'),
    }))

    const elapsedSeconds = toRef(() => props.duration > 0
      ? clamp(progress.value / 100 * props.duration, 0, props.duration)
      : 0,
    )

    const currentTime = computed<VAudioControlsTimeSlot>(() => ({
      elapsed: formatTime(elapsedSeconds.value),
      remaining: formatTime(props.duration - elapsedSeconds.value),
      total: formatTime(props.duration),
      progress: progress.value,
    }))

    const timeText = computed(() => {
      const { elapsed, remaining, total } = currentTime.value

      switch (props.timeDisplay) {
        case 'elapsed': { return elapsed
        }
        case 'remaining': { return `-${remaining}`
        }
        case 'duration': { return total
        }
        default: { return `${elapsed} / ${total}`
        }
      }
    })

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

    function seek (target: MediaSeekTarget) {
      if (!props.duration) return

      const seconds = resolveSeekTarget(target, elapsedSeconds.value, props.duration)
      if (Number.isFinite(seconds)) emit('update:progress', clamp(seconds / props.duration * 100, 0, 100))
    }

    function setPlaybackRate (value: number) {
      playbackRate.value = value
    }

    const slotProps = computed<VAudioControlsActionsSlot>(() => ({
      play,
      pause,
      stop,
      seek,
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
      const innerDefaults = {
        VIconBtn: {
          variant: 'text',
          color: props.color ?? btnDefaults.value?.color,
          ...btnDefaults.value,
        },
      }

      const progressBarProps: Record<string, unknown> = {
        modelValue: elapsedSeconds.value,
        max: props.duration,
        buffer: props.buffer,
        chapters: props.chapters,
        thumb: props.thumb,
        tooltip: props.tooltip,
        color: props.color,
        disabled: !props.duration,
        readonly: !props.seekable,
        'onUpdate:modelValue': (seconds: number) => seek({ to: seconds }),
        onStart: () => emit('scrubStart'),
        onEnd: () => emit('scrubEnd'),
      }

      const progressBar = slots.progress?.({ ...slotProps.value, props: progressBarProps }) ?? <VMediaProgressBar { ...progressBarProps } />

      const actions = typeof props.actions === 'string'
        ? props.actions.split(/[\s,]+/).filter(Boolean)
        : props.actions
      const isProgressInlined = actions.includes('progress')

      const progressEl = (
        <div class={['v-audio-controls__progress', props.progressClass]}>
          { !isProgressInlined && !props.hideTime && (
            <div key="elapsed" class="v-audio-controls__time">
              { slots.time?.(currentTime.value) ?? currentTime.value.elapsed }
            </div>
          )}

          <div class="v-audio-controls__seek">{ progressBar }</div>

          { !isProgressInlined && !props.hideTime && !slots.time && (
            <div key="total" class="v-audio-controls__time">
              { props.timeDisplay === 'remaining'
                ? `-${currentTime.value.remaining}`
                : currentTime.value.total }
            </div>
          )}
        </div>
      )

      const playProps: Record<string, unknown> = {
        ...props.playProps,
        class: ['v-audio__action-play', props.playProps?.class],
        icon: playing.value ? props.pauseIcon : props.playIcon,
        'aria-label': playing.value ? labels.value.pause : labels.value.play,
        onClick: togglePlay,
      }

      const builtins: Record<string, () => JSX.Element> = {
        '-': () => <VSpacer />,
        progress: () => progressEl,
        time: () => (
          <div class="v-audio-controls__time">
            { slots.time?.(currentTime.value) ?? timeText.value }
          </div>
        ),
        volume: () => (
          <VLocaleProvider rtl={ false }>
            <VMediaVolume
              v-model={ volume.value }
              class="v-audio-controls__volume"
              inline
              { ...props.volumeProps }
              sliderProps={{
                color: props.color,
                step: 1,
                thumbSize: 12,
                trackSize: 2,
                ...sliderDefaults.value,
                ...props.volumeProps?.sliderProps,
              }}
            />
          </VLocaleProvider>
        ),
      }

      const renderAction = (name: string) => {
        const slot = (slots as Record<string, any>)[name]
        if (name === 'play') return slot?.({ ...slotProps.value, props: playProps }) ?? <VIconBtn { ...playProps } />
        if (name === 'time') return builtins.time()
        if (name === 'progress') return progressEl

        return slot?.(slotProps.value) ?? builtins[name]?.()
      }

      return (
        <div
          class={[
            'v-audio-controls',
            { 'v-audio-controls--stacked': !isProgressInlined },
            themeClasses.value,
            textColorClasses.value,
            props.class,
          ]}
          style={[textColorStyles.value, props.style]}
        >
          <VDefaultsProvider defaults={ innerDefaults }>
            { slots.default?.(slotProps.value) ?? (
              <>
                { slots.prepend?.(slotProps.value) }

                <div class={['v-audio-controls__actions', props.actionsClass]}>
                  { actions.map((name, i) => (
                    <Fragment key={ `${name}-${i}` }>{ renderAction(name) }</Fragment>
                  ))}
                </div>

                { !isProgressInlined && (
                  <Fragment key="progress">{ progressEl }</Fragment>
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
