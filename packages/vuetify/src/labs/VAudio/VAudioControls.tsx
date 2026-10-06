// Styles
import './VAudioControls.sass'

// Components
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VSpacer } from '@/components/VGrid'
import { VIconBtn } from '@/components/VIconBtn/VIconBtn'
import { makeVMediaProgressBarProps, VMediaProgressBar } from '@/labs/VMediaProgressBar/VMediaProgressBar'
import { VMediaVolume } from '@/labs/VMediaVolume/VMediaVolume'

// Composables
import { useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { injectDefaults, injectNestedDefaults } from '@/composables/defaults'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { parseActions, resolveSeekTarget, useMute } from '@/labs/composables/media'

// Utilities
import { computed, Fragment, shallowRef, toRef } from 'vue'
import { clamp, formatTime, genericComponent, pick, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VSlider } from '@/components/VSlider'
import type { ClassValue } from '@/composables/component'
import type { MediaSeekStep, MediaSeekTarget } from '@/labs/composables/media'
import type { VMediaVolumeOptions, VMediaVolumeSlider } from '@/labs/VMediaVolume/VMediaVolume'

export type VAudioAction = 'play' | 'progress' | 'time' | 'elapsed' | 'remaining' | 'volume' | '-' | (string & {})

export type VAudioControlsTime = {
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
  currentTime: VAudioControlsTime
  duration: number
  volume: number
  toggleMuted: () => void
  playbackRate: number
  setPlaybackRate: (value: number) => void
  labels: Record<string, string>
}

export type VAudioControlsPropsSlot = VAudioControlsActionsSlot & {
  props: Record<string, unknown>
}

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

export const makeVAudioControlsProps = propsFactory({
  playing: Boolean,
  muted: Boolean,
  hideThumb: Boolean,
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
  progressVariant: String as PropType<VMediaProgressBar['$props']['variant']>,
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

  volumeProps: Object as PropType<VMediaVolumeOptions>,
  seekStep: {
    type: [Number, Array] as PropType<MediaSeekStep>,
    default: 5,
  },
  volumeSlider: {
    type: String as PropType<VMediaVolumeSlider>,
    default: 'visible',
  },

  color: String,

  ...pick(makeVMediaProgressBarProps(), ['buffer', 'chapters', 'tooltip']),
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
    'drag:start': (value: number) => true,
    'drag:end': (value: number) => true,
    'click:stop': () => true,
  },

  setup (props, { emit, slots }) {
    const { t } = useLocale()
    const buttonDefaults = injectNestedDefaults<VIconBtn['$props']>('VIconBtn')
    const sliderDefaults = injectNestedDefaults<VSlider['$props']>('VSlider')
    const defaults = injectDefaults()
    const { themeClasses } = provideTheme(props)
    const { textColorClasses, textColorStyles } = useTextColor(() => props.color)

    const playing = useProxiedModel(props, 'playing')
    const volume = useProxiedModel(props, 'volume', 100, v => Number(v ?? 100))
    const playbackRate = useProxiedModel(props, 'playbackRate')

    const progress = toRef(() => clamp(props.progress || 0, 0, 100))

    const volumeRef = shallowRef<VMediaVolume>()
    const fallbackMute = useMute(volume)

    function toggleMuted () {
      if (props.muted) return
      (volumeRef.value ?? fallbackMute).toggleMuted()
    }

    const labels = computed(() => ({
      play: t('$vuetify.media.play'),
      pause: t('$vuetify.media.pause'),
      seek: t('$vuetify.media.seek'),
      volume: t('$vuetify.media.volume'),
      mute: t('$vuetify.media.mute'),
      unmute: t('$vuetify.media.unmute'),
    }))

    const elapsedSeconds = toRef(() => progress.value / 100 * props.duration)

    const currentTime = computed<VAudioControlsTime>(() => ({
      elapsed: formatTime(elapsedSeconds.value),
      remaining: formatTime(props.duration - elapsedSeconds.value),
      total: formatTime(props.duration),
      progress: progress.value,
    }))

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
      if (!Number.isFinite(seconds)) return

      emit('update:progress', clamp(seconds / props.duration * 100, 0, 100))
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
          color: props.color ?? buttonDefaults.value?.color,
          ...buttonDefaults.value,
        },
        // inner provider wins over outer ones, so outer `VMediaVolume.VSlider` is spread back on top
        VMediaVolume: {
          VSlider: {
            color: props.color,
            step: 1,
            thumbSize: 12,
            ...sliderDefaults.value,
            ...(defaults.value?.VMediaVolume as Record<string, any> | undefined)?.VSlider,
          },
        },
      }

      const progressBarProps: Record<string, unknown> = {
        modelValue: elapsedSeconds.value,
        max: props.duration,
        step: props.seekStep,
        buffer: props.buffer,
        chapters: props.chapters,
        thumb: !props.hideThumb,
        variant: props.progressVariant,
        tooltip: props.tooltip,
        color: props.color,
        disabled: !props.duration,
        readonly: !props.seekable,
        'onUpdate:modelValue': (seconds: number) => seek({ to: seconds }),
        'onDrag:start': (value: number) => emit('drag:start', value),
        'onDrag:end': (value: number) => emit('drag:end', value),
      }

      const progressBar = slots.progress?.({ ...slotProps.value, props: progressBarProps }) ??
        <VMediaProgressBar { ...progressBarProps } />

      const actions = parseActions(props.actions).filter(name => name !== '(' && name !== ')')
      const isProgressInlined = actions.includes('progress')

      function timePart (name: 'elapsed' | 'remaining' | 'total') {
        return slots[`time.${name}`]?.(slotProps.value) ??
          (name === 'remaining' ? `-${currentTime.value.remaining}` : currentTime.value[name])
      }

      const progressRow = (
        <div class={['v-audio-controls__progress', props.progressClass]}>
          { !isProgressInlined && !props.hideTime && (
            <div key="elapsed" class="v-audio-controls__time">
              { timePart('elapsed') }
            </div>
          )}

          <div class="v-audio-controls__seek">{ progressBar }</div>

          { !isProgressInlined && !props.hideTime && (
            <div key="total" class="v-audio-controls__time">
              { timePart(props.timeDisplay === 'remaining' ? 'remaining' : 'total') }
            </div>
          )}
        </div>
      )

      const playProps: Record<string, unknown> = {
        ...props.playProps,
        class: ['v-audio__action-play', props.playProps?.class],
        icon: playing.value ? '$pause' : '$play',
        'aria-label': playing.value ? labels.value.pause : labels.value.play,
        onClick: togglePlay,
      }

      const builtins: Record<string, () => JSX.Element> = {
        '-': () => <VSpacer />,
        time: () => (
          <div class="v-audio-controls__time">
            { slots.time?.(slotProps.value) ?? {
              elapsed: timePart('elapsed'),
              remaining: timePart('remaining'),
              duration: timePart('total'),
              'elapsed-duration': [timePart('elapsed'), ' / ', timePart('total')],
            }[props.timeDisplay]}
          </div>
        ),
        elapsed: () => <div class="v-audio-controls__time">{ timePart('elapsed') }</div>,
        remaining: () => <div class="v-audio-controls__time">{ timePart('remaining') }</div>,
        volume: () => (
          <VMediaVolume
            ref={ volumeRef }
            modelValue={ props.muted ? 0 : volume.value }
            onUpdate:modelValue={ v => volume.value = v }
            class="v-audio-controls__volume"
            inline
            slider={ props.volumeSlider }
            { ...props.volumeProps }
            disabled={ props.muted }
          />
        ),
      }

      function renderAction (name: string) {
        if (name === 'play') return slots.play?.({ ...slotProps.value, props: playProps }) ?? <VIconBtn { ...playProps } />
        if (name === 'progress') return progressRow

        const slot = name === 'prepend' || name === 'append' ? slots[name] : slots[`action.${name}`]
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
                { !actions.includes('prepend') && slots.prepend?.(slotProps.value) }

                <div class={['v-audio-controls__actions', props.actionsClass]}>
                  { actions.map((name, index) => (
                    <Fragment key={ `${name}-${index}` }>{ renderAction(name) }</Fragment>
                  ))}
                </div>

                { !isProgressInlined && (
                  <Fragment key="progress">{ progressRow }</Fragment>
                )}

                { !actions.includes('append') && slots.append?.(slotProps.value) }
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
