/* eslint-disable complexity */

// Styles
import './VVideoControls.sass'

// Components
import { VDefaultsProvider } from '@/components/VDefaultsProvider/VDefaultsProvider'
import { VSpacer } from '@/components/VGrid/VSpacer'
import { VIconBtn } from '@/components/VIconBtn/VIconBtn'
import { makeVMediaProgressBarProps, VMediaProgressBar } from '@/labs/VMediaProgressBar/VMediaProgressBar'
import { VMediaVolume } from '@/labs/VMediaVolume/VMediaVolume'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { injectDefaults, injectNestedDefaults } from '@/composables/defaults'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { parseActions, resolveSeekTarget, useMute } from '@/labs/composables/media'

// Directives
import vTooltip from '@/directives/tooltip'

// Utilities
import { computed, Fragment, shallowRef, toRef } from 'vue'
import { clamp, convertToUnit, formatTime, genericComponent, isUndefined, pick, propsFactory, useRender } from '@/util'

// Types
import type { PropType, Ref } from 'vue'
import type { VSlider } from '@/components/VSlider'
import type { MediaSeekStep, MediaSeekTarget } from '@/labs/composables/media'
import type { VMediaVolumeOptions, VMediaVolumeSlider } from '@/labs/VMediaVolume/VMediaVolume'

export type VVideoAction =
  | 'play' | 'progress' | 'time' | 'elapsed' | 'remaining' | 'volume' | 'fullscreen'
  | 'prepend' | 'append' | '-' | (string & {})

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

const allowedVariants = ['hidden', 'default', 'tube', 'mini'] as const
export type VVideoControlsVariant = typeof allowedVariants[number]

type Group = { names: string[], pill: boolean }

function getPresetActions (variant: VVideoControlsVariant, splitTime: boolean, hideProgressBar: boolean) {
  if (variant === 'mini') return ['-', 'prepend', 'play', '(', 'volume', 'append', 'fullscreen', ')', '-']

  const progress = variant === 'tube' || hideProgressBar ? '-' : 'progress'
  const time = splitTime ? ['elapsed', progress, 'remaining']
    : variant === 'default' ? [progress]
    : ['time', progress]

  return ['play', 'prepend', ...time, '(', 'volume', 'append', 'fullscreen', ')']
}

export const makeVVideoControlsProps = propsFactory({
  color: String,
  bgColor: String,
  backgroundColor: String,
  progressColor: String,
  trackColor: String,
  playing: Boolean,
  muted: Boolean,
  hidePlay: Boolean,
  hideVolume: Boolean,
  hideFullscreen: Boolean,
  hideProgressBar: Boolean,
  hideThumb: Boolean,
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
  volume: {
    type: [Number, String],
    default: 100,
  },
  gap: [Number, String, Array] as PropType<number | string | readonly [number | string, number | string]>,
  actions: [String, Array] as PropType<string | readonly (VVideoAction | readonly VVideoAction[])[]>,
  variant: {
    type: String as PropType<VVideoControlsVariant>,
    default: 'default',
    validator: (v: any) => allowedVariants.includes(v),
  },
  playProps: Object as PropType<VIconBtn['$props']>,
  progressVariant: String as PropType<VMediaProgressBar['$props']['variant']>,
  volumeProps: Object as PropType<VMediaVolumeOptions>,
  seekStep: {
    type: [Number, Array] as PropType<MediaSeekStep>,
    default: () => [10, 60],
  },
  volumeSlider: {
    type: String as PropType<VMediaVolumeSlider>,
    default: 'visible',
  },

  ...pick(makeVMediaProgressBarProps(), ['buffer', 'chapters']),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeThemeProps(),
}, 'VVideoControls')

export const VVideoControls = genericComponent<VVideoControlsSlots>()({
  name: 'VVideoControls',

  directives: { vTooltip: vTooltip as any },

  props: makeVVideoControlsProps(),

  emits: {
    'update:playing': (value: boolean) => true,
    'update:progress': (value: number) => true,
    'update:volume': (value: number) => true,
    'click:fullscreen': () => true,
  },

  setup (props, { emit, slots }) {
    const { t } = useLocale()
    const { themeClasses, current: currentTheme } = provideTheme(props)
    const { densityClasses } = useDensity(props)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses, roundedStyles } = useRounded(props)

    const bgColor = toRef(() => props.bgColor ?? props.backgroundColor)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(() => {
      const fallbackBackground = props.detached ? 'surface' : undefined
      return bgColor.value ?? fallbackBackground
    })

    const playing = useProxiedModel(props, 'playing')
    const progress = useProxiedModel(props, 'progress')
    const volume = useProxiedModel(props, 'volume', 100, (v?: number | string) => Number(v ?? 100))
    const volumeRef = shallowRef<VMediaVolume>()
    const progressBarDefaults = injectNestedDefaults<VMediaProgressBar['$props']>('VMediaProgressBar')
    const sliderDefaults = injectNestedDefaults<VSlider['$props']>('VSlider')
    const defaults = injectDefaults()
    const fallbackMute = useMute(volume)

    const actions = toRef(() => {
      const list = isUndefined(props.actions)
        ? getPresetActions(props.variant, props.splitTime, props.hideProgressBar)
        : parseActions(props.actions)

      return [
        ...(list.includes('prepend') ? [] : ['prepend']),
        ...list,
        ...(list.includes('append') ? [] : ['append']),
      ].filter(name => !(
        (name === 'play' && props.hidePlay) ||
        (name === 'volume' && props.hideVolume) ||
        (name === 'fullscreen' && props.hideFullscreen)
      ))
    })

    const groups = toRef(() => actions.value.reduce((state, name) => {
      if (name === '(') {
        if (!state.depth) {
          state.groups.push({ names: [], pill: true })
        }
        state.depth++
      } else if (name === ')') {
        state.depth = Math.max(state.depth - 1, 0)
      } else if (name === '-' || (name === 'progress' && !state.depth)) {
        state.groups.push({ names: [name], pill: false })
        if (state.depth) {
          state.groups.push({ names: [], pill: true })
        }
      } else if (state.depth) {
        state.groups.at(-1)!.names.push(name)
      } else {
        state.groups.push({ names: [name], pill: true })
      }
      return state
    }, { groups: [] as Group[], depth: 0 }).groups)

    const progressColor = toRef(() => {
      const color = props.progressColor ?? props.trackColor
      if (color) return color

      const onVideo = props.pills && !groups.value.some(({ names, pill }) => pill && names.includes('progress'))
      const fallback = currentTheme.value.dark || !onVideo ? undefined : 'surface'
      return (onVideo ? bgColor.value : props.color) ?? fallback
    })

    const stacked = toRef(() => !props.hideProgressBar &&
      !actions.value.includes('progress') &&
      (!isUndefined(props.actions) || props.variant === 'tube')
    )

    function toggleMuted () {
      if (props.muted) return
      (volumeRef.value ?? fallbackMute).toggleMuted()
    }

    const elapsedSeconds = toRef(() => props.progress / 100 * props.duration)

    const currentTime = computed(() => {
      const elapsed = Math.round(elapsedSeconds.value)
      return {
        elapsed: formatTime(elapsed),
        remaining: formatTime(props.duration - elapsed),
        total: formatTime(props.duration),
      }
    })

    const labels = computed(() => {
      return {
        seek: t('$vuetify.media.seek'),
        volume: t('$vuetify.media.volume'),
        playAction: t(playing.value ? '$vuetify.media.pause' : '$vuetify.media.play'),
        volumeAction: t(volume.value && !props.muted ? '$vuetify.media.mute' : '$vuetify.media.unmute'),
        fullscreenAction: t(props.fullscreen ? '$vuetify.media.exitFullscreen' : '$vuetify.media.enterFullscreen'),
      }
    })

    function play () {
      playing.value = true
    }

    function pause () {
      playing.value = false
    }

    function seek (target: MediaSeekTarget) {
      if (!props.duration) return

      const seconds = resolveSeekTarget(target, elapsedSeconds.value, props.duration)
      if (!Number.isFinite(seconds)) return

      progress.value = clamp(seconds / props.duration * 100, 0, 100)
    }

    function skipTo (percent: number) {
      seek({ to: `${percent}%` })
    }

    function toggleFullscreen () {
      emit('click:fullscreen')
    }

    useRender(() => {
      const sizes = props.pills
        ? [36, 30, 24]
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
          hideDetails: true,
        },
        VMediaProgressBar: {
          thumbSize: progressBarDefaults.value?.thumbSize ?? (stacked.value ? 10 : 16),
        },
        // inner provider wins over outer ones, so outer `VMediaVolume.VSlider` is spread back on top
        VMediaVolume: {
          VSlider: {
            color: props.color,
            ...sliderDefaults.value,
            ...(defaults.value?.VMediaVolume as Record<string, any> | undefined)?.VSlider,
          },
        },
      }

      const regularBtnSize = innerDefaults.VIconBtn.size
      const pillHeight = regularBtnSize + 8
      const [gap, pillGap] = Array.isArray(props.gap) ? props.gap : [props.gap, props.gap]

      const pillClasses = [
        'v-video-control__pill',
        props.pills && [elevationClasses.value, backgroundColorClasses.value, roundedClasses.value],
      ]

      const pillStyles = props.pills ? [backgroundColorStyles.value, roundedStyles.value] : []

      const slotProps = {
        play,
        pause,
        playing: playing.value,
        progress: progress.value,
        currentTime: currentTime.value,
        duration: props.duration,
        seek,
        skipTo,
        volume,
        toggleMuted,
        fullscreen: props.fullscreen,
        toggleFullscreen,
        labels: labels.value,
      }

      const playProps: Record<string, unknown> = {
        size: props.pills ? pillHeight : regularBtnSize,
        ...props.playProps,
        class: ['v-video__action-play', props.playProps?.class],
        icon: playing.value ? '$pause' : '$play',
        'aria-label': labels.value.playAction,
        onClick: () => playing.value = !playing.value,
      }

      function timePart (name: 'elapsed' | 'remaining' | 'total') {
        return slots[`time.${name}`]?.(slotProps) ??
          (name === 'remaining' ? `-${currentTime.value.remaining}` : currentTime.value[name])
      }

      const progressBarProps: Record<string, unknown> = {
        class: 'v-video__track',
        modelValue: elapsedSeconds.value,
        max: props.duration,
        buffer: props.buffer,
        chapters: props.chapters,
        color: progressColor.value ?? 'surface-variant',
        bgColor: stacked.value ? 'white' : undefined,
        step: props.seekStep,
        thumb: !props.hideThumb,
        variant: props.progressVariant,
        'onUpdate:modelValue': (seconds: number) => seek({ to: seconds }),
      }

      const progressBar = slots.progress?.({ ...slotProps, props: progressBarProps }) ??
        <VMediaProgressBar { ...progressBarProps } />

      const builtins: Record<string, () => JSX.Element> = {
        '-': () => <VSpacer />,
        time: () => (
          <span class="v-video__time">
            { slots.time?.(slotProps) ?? <>{ timePart('elapsed') } / { timePart('total') }</> }
          </span>
        ),
        elapsed: () => <span class="v-video__time">{ timePart('elapsed') }</span>,
        remaining: () => <span class="v-video__time">{ timePart('remaining') }</span>,
        volume: () => (
          <VMediaVolume
            ref={ volumeRef }
            key="volume-control"
            modelValue={ props.muted ? 0 : volume.value }
            label={ labels.value.volumeAction }
            onUpdate:modelValue={ v => volume.value = v }
            slider={ props.volumeSlider }
            { ...props.volumeProps }
            disabled={ props.muted }
          />
        ),
        fullscreen: () => (
          <VIconBtn
            icon={ props.fullscreen ? '$fullscreenExit' : '$fullscreen' }
            aria-label={ labels.value.fullscreenAction }
            v-tooltip={[labels.value.fullscreenAction, 'top']}
            onClick={ toggleFullscreen }
          />
        ),
      }

      function renderAction (name: string) {
        if (name === 'play') {
          return slots.play?.({ ...slotProps, props: playProps }) ??
            <VIconBtn { ...playProps } v-tooltip={[labels.value.playAction, 'top']} />
        }
        if (name === 'progress') return progressBar

        const slot = name === 'prepend' || name === 'append' ? slots[name] : slots[`action.${name}`]
        return slot?.(slotProps) ?? builtins[name]?.()
      }

      return (
        <div
          class={[
            'v-video-controls',
            `v-video-controls--variant-${props.variant}`,
            { 'v-video-controls--pills': props.pills },
            { 'v-video-controls--stacked': stacked.value },
            { 'v-video-controls--detached': props.detached },
            { 'v-video-controls--floating': props.floating },
            { 'v-video-controls--fullscreen': props.fullscreen },
            { 'v-video-controls--split-time': props.splitTime },
            !props.pills && [backgroundColorClasses.value, roundedClasses.value],
            props.detached && !props.pills ? elevationClasses.value : [],
            densityClasses.value,
            themeClasses.value,
          ]}
          style={[
            !props.pills && [backgroundColorStyles.value, roundedStyles.value],
            {
              '--v-video-controls-pill-height': convertToUnit(pillHeight),
              '--v-video-controls-gap': convertToUnit(gap),
              '--v-video-controls-pill-gap': convertToUnit(pillGap),
            },
          ]}
        >
          <VDefaultsProvider defaults={ innerDefaults }>
            { slots.default?.(slotProps) ?? (
              <>
                { stacked.value && progressBar }
                { groups.value.map(({ names, pill }, index) => {
                  const content = names.map(renderAction).filter(Boolean)
                  if (!content.length) return null
                  if (!pill) {
                    return <Fragment key={ `${index}${names}` }>{ content }</Fragment>
                  }

                  return (
                    <div key={ `${index}${names}` } class={ pillClasses } style={ pillStyles }>
                      { content }
                    </div>
                  )
                })}
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
