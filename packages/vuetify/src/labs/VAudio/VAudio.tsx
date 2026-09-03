// Styles
import './VAudio.sass'

// Components
import { makeVAudioControlsProps, VAudioControls } from './VAudioControls'
import { VProgressLinear } from '@/components/VProgressLinear'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { forwardRefs } from '@/composables/forwardRefs'
import { useLocale, useRtl } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useRounded } from '@/composables/rounded'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { nextTick, onBeforeUnmount, onMounted, shallowRef, toRef, watch } from 'vue'
import { formatDuration } from './time'
import { clamp, genericComponent, IN_BROWSER, omit, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VAudioControlsActionsSlot, VAudioControlsTimeSlot } from './VAudioControls'

export type VAudioSeekTarget = 'waveform' | 'container' | 'none'

export type VAudioSlots = {
  controls: VAudioControlsActionsSlot
  prepend: VAudioControlsActionsSlot
  append: VAudioControlsActionsSlot
  waveform: VAudioControlsActionsSlot
  time: VAudioControlsTimeSlot
  loader: { color: string | undefined, isActive: boolean }
  error: { error: MediaError | boolean | undefined, retry: () => void }
  sources: never
}

export const makeVAudioProps = propsFactory({
  src: String,
  srcObject: [Object, null] as PropType<MediaProvider | null>,
  type: String,
  // Nothing here decodes the media, but `audio` is exposed, so a consumer feeding the
  // element into their own Web Audio graph still needs the element marked CORS-clean.
  crossorigin: String as PropType<'anonymous' | 'use-credentials'>,
  preload: {
    type: String as PropType<'none' | 'metadata' | 'auto'>,
    default: 'metadata',
  },
  currentTime: {
    type: Number,
    default: 0,
  },
  error: [Boolean, Object] as PropType<MediaError | boolean>,
  autoplay: Boolean,
  loop: Boolean,
  muted: Boolean,
  startAt: [Number, String],
  eager: Boolean,
  disabled: Boolean,
  seekTarget: {
    type: String as PropType<VAudioSeekTarget>,
    default: 'waveform',
  },
  rounded: {
    type: [Boolean, Number, String, Array] as PropType<boolean | number | string | (number | string)[]>,
    default: undefined,
  },
  controlsProps: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({}),
  },

  ...omit(makeVAudioControlsProps(), ['duration']),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeThemeProps(),
}, 'VAudio')

export const VAudio = genericComponent<VAudioSlots>()({
  name: 'VAudio',

  props: makeVAudioProps(),

  emits: {
    loaded: (el: HTMLAudioElement) => true,
    ended: () => true,
    error: (value: MediaError | boolean) => true,
    'update:playing': (value: boolean) => true,
    'update:progress': (value: number) => true,
    'update:currentTime': (value: number) => true,
    'update:volume': (value: number) => true,
    'update:playbackRate': (value: number) => true,
    'update:error': (value: MediaError | boolean) => true,
  },

  setup (props, { emit, slots }) {
    const { t } = useLocale()
    const { isRtl } = useRtl()
    const { themeClasses } = provideTheme(props)
    const { densityClasses } = useDensity(props)
    const { dimensionStyles } = useDimension(props)
    const containerRounded = toRef(() => (
      Array.isArray(props.rounded) ? props.rounded[0] : props.rounded
    ) as any)
    const { roundedClasses, roundedStyles } = useRounded(containerRounded)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(() => props.backgroundColor))

    const audioRef = shallowRef<HTMLAudioElement>()
    const containerRef = shallowRef<HTMLElement>()
    const controlsRef = shallowRef<VAudioControls>()

    const playing = useProxiedModel(props, 'playing')
    const progress = useProxiedModel(props, 'progress')
    const currentTime = useProxiedModel(props, 'currentTime')
    const volume = useProxiedModel(props, 'volume', 100, v => Number(v ?? 100))
    const playbackRate = useProxiedModel(props, 'playbackRate')
    const error = useProxiedModel(props, 'error')

    const duration = shallowRef(0)
    const waiting = shallowRef(false)
    const buffered = shallowRef<number[]>([])
    const scrubbing = shallowRef(false)
    const containerHover = shallowRef<number | null>(null)

    let syncing = false
    let frame = 0
    let seekingFromModel = false

    const hasWaveform = toRef(() => !props.hideWaveform && props.variant !== 'mini' && props.variant !== 'hidden')
    const seekOnContainer = toRef(() =>
      props.seekTarget === 'container' && !hasWaveform.value && !props.disabled,
    )
    // `'none'` has to switch the waveform off too, or the prop promises something it does
    // not deliver: a visible waveform would stay seekable no matter what was asked for.
    const waveformSeekable = toRef(() =>
      hasWaveform.value && props.seekTarget !== 'none' && !props.disabled,
    )

    function writePosition (seconds: number, total: number) {
      syncing = true
      try {
        currentTime.value = seconds
        progress.value = Number.isFinite(total) && total > 0
          ? clamp(100 * seconds / total, 0, 100)
          : 0
      } finally {
        syncing = false
      }
    }

    function seekToSeconds (seconds: number) {
      const el = audioRef.value
      if (!el) return

      const total = Number.isFinite(el.duration) ? el.duration : 0
      const next = clamp(seconds, 0, total || seconds)

      el.currentTime = next
      writePosition(next, total)
    }

    function skipTo (percent: number) {
      const total = audioRef.value?.duration
      if (!Number.isFinite(total ?? Number.NaN)) return

      seekToSeconds(clamp(percent, 0, 100) / 100 * (total as number))
    }

    function skipBy (seconds: number) {
      const el = audioRef.value
      if (!el) return

      seekToSeconds(el.currentTime + seconds)
    }

    async function play () {
      const el = audioRef.value
      if (!el) return

      try {
        await el.play()
      } catch {
        playing.value = false
      }
    }

    function pause () {
      audioRef.value?.pause()
    }

    function stop () {
      const el = audioRef.value
      if (!el) return

      el.pause()
      seekToSeconds(0)
      playing.value = false
    }

    function retry () {
      error.value = false
      const el = audioRef.value
      if (!el) return

      el.load()
    }

    function onLoadedmetadata () {
      const el = audioRef.value
      if (!el) return

      duration.value = Number.isFinite(el.duration) ? el.duration : 0

      if (props.startAt != null) {
        seekToSeconds(Number(props.startAt) || 0)
      }

      emit('loaded', el)
    }

    function paintPosition (seconds: number, total: number) {
      const pct = Number.isFinite(total) && total > 0
        ? clamp(100 * seconds / total, 0, 100)
        : 0

      containerRef.value?.style.setProperty('--v-audio-progress', `${pct}%`)
      for (const el of containerRef.value?.querySelectorAll<HTMLElement>('.v-audio-waveform') ?? []) {
        el.style.setProperty('--v-audio-waveform-progress', `${pct}%`)
      }
    }

    function tick () {
      const el = audioRef.value
      if (!el || el.paused || scrubbing.value) {
        frame = 0
        return
      }

      paintPosition(el.currentTime, el.duration)
      frame = requestAnimationFrame(tick)
    }

    function startTicking () {
      if (!IN_BROWSER || frame) return

      frame = requestAnimationFrame(tick)
    }

    function stopTicking () {
      if (frame) cancelAnimationFrame(frame)
      frame = 0
    }

    function onTimeupdate () {
      const el = audioRef.value
      if (!el || scrubbing.value) return

      writePosition(el.currentTime, el.duration)
    }

    function onProgress () {
      const el = audioRef.value
      if (!el || !Number.isFinite(el.duration) || el.duration <= 0) return

      const ranges: number[] = []
      for (let i = 0; i < el.buffered.length; i++) {
        ranges.push(
          100 * el.buffered.start(i) / el.duration,
          100 * el.buffered.end(i) / el.duration,
        )
      }
      buffered.value = ranges
    }

    function onEnded () {
      if (!audioRef.value) return

      playing.value = false
      emit('ended')
    }

    function onError () {
      const el = audioRef.value
      error.value = el?.error ?? true
      waiting.value = false
      emit('error', error.value)
    }

    function containerRatio (e: PointerEvent) {
      const el = containerRef.value
      if (!el) return 0

      const rect = el.getBoundingClientRect()
      if (!rect.width) return 0

      const ratio = clamp((e.clientX - rect.left) / rect.width, 0, 1)
      return isRtl.value ? 1 - ratio : ratio
    }

    function isSeekableTarget (e: PointerEvent) {
      const el = containerRef.value
      if (!el) return false

      const interactive = (e.target as HTMLElement).closest(
        'button, [role="slider"], input, a, .v-audio-controls__volume',
      )
      return !interactive || interactive === el
    }

    function onContainerPointermove (e: PointerEvent) {
      if (!seekOnContainer.value) return

      containerHover.value = isSeekableTarget(e) ? containerRatio(e) : null
    }

    function onContainerPointerleave () {
      containerHover.value = null
    }

    function onContainerPointerdown (e: PointerEvent) {
      if (!seekOnContainer.value) return

      const el = containerRef.value
      if (!el) return

      if (!isSeekableTarget(e)) return

      if (!el.getBoundingClientRect().width) return

      skipTo(containerRatio(e) * 100)
    }

    watch(playing, value => {
      const el = audioRef.value
      if (!el || value === !el.paused) return

      if (value) play()
      else pause()
    })

    watch(volume, value => {
      const el = audioRef.value
      if (el) el.volume = clamp(Number(value) || 0, 0, 100) / 100
    })

    watch(playbackRate, value => {
      const el = audioRef.value
      if (el) el.playbackRate = value
    })

    // Consumer writes are seeks, not state. Half a `timeupdate` interval of slack keeps
    // the element's own echo from re-entering as a second write.
    watch(currentTime, value => {
      const el = audioRef.value
      if (syncing || seekingFromModel || !el) return
      if (!Number.isFinite(value) || Math.abs(el.currentTime - value) < 0.25) return

      seekingFromModel = true
      try {
        seekToSeconds(value)
      } finally {
        seekingFromModel = false
      }
    })

    watch(() => [props.src, props.srcObject], () => {
      duration.value = 0
      buffered.value = []
      waiting.value = false
      const hadError = !!error.value
      if (hadError) error.value = false
      writePosition(0, 0)

      if (hadError) {
        nextTick(() => audioRef.value?.load())
      }
    })

    onMounted(() => {
      const el = audioRef.value
      if (!el) return

      el.volume = clamp(Number(volume.value) || 0, 0, 100) / 100
      el.playbackRate = playbackRate.value
      if (props.srcObject) el.srcObject = props.srcObject
    })

    onBeforeUnmount(() => {
      stopTicking()
      const el = audioRef.value
      if (el) {
        el.pause()
        el.srcObject = null
      }
    })

    useRender(() => {
      const controlsProps = {
        ...VAudioControls.filterProps(omit(props, ['rounded', 'class', 'style', 'theme'])),
        ...props.controlsProps,
      }

      const isLoading = waiting.value && !error.value
      const hasError = !!error.value

      return (
        <div
          ref={ containerRef }
          class={[
            'v-audio',
            {
              'v-audio--playing': playing.value,
              'v-audio--loading': isLoading,
              'v-audio--error': hasError,
              'v-audio--scrubbing': scrubbing.value,
              'v-audio--disabled': props.disabled,
              'v-audio--seekable-container': seekOnContainer.value,
            },
            themeClasses.value,
            densityClasses.value,
            roundedClasses.value,
            backgroundColorClasses.value,
            props.class,
          ]}
          style={[
            { '--v-audio-progress': `${progress.value}%` },
            dimensionStyles.value,
            roundedStyles.value,
            backgroundColorStyles.value,
            props.style,
          ]}
          role={ seekOnContainer.value ? 'slider' : undefined }
          tabindex={ seekOnContainer.value ? 0 : undefined }
          aria-valuemin={ seekOnContainer.value ? 0 : undefined }
          aria-valuemax={ seekOnContainer.value ? 100 : undefined }
          aria-valuenow={ seekOnContainer.value ? Math.round(progress.value) : undefined }
          aria-valuetext={ seekOnContainer.value
            ? formatDuration(currentTime.value, duration.value)
            : undefined }
          aria-label={ seekOnContainer.value ? t('$vuetify.audio.seek') : undefined }
          onPointerdown={ onContainerPointerdown }
          onPointermove={ onContainerPointermove }
          onPointerleave={ onContainerPointerleave }
        >
          { seekOnContainer.value && (
            <div key="fill" class="v-audio__fill" />
          )}

          { seekOnContainer.value && containerHover.value !== null && (
            <>
              <div
                class="v-audio__cursor"
                style={{ insetInlineStart: `${(isRtl.value ? 1 - containerHover.value : containerHover.value) * 100}%` }}
              />
              <div
                class="v-audio__cursor-tooltip"
                style={{ insetInlineStart: `${(isRtl.value ? 1 - containerHover.value : containerHover.value) * 100}%` }}
              >
                { formatDuration(containerHover.value * duration.value, duration.value) }
              </div>
            </>
          )}
          <audio
            ref={ audioRef }
            class="v-audio__native"
            src={ props.srcObject || props.type ? undefined : props.src }
            crossorigin={ props.crossorigin }
            preload={ props.preload }
            autoplay={ props.autoplay }
            loop={ props.loop }
            muted={ props.muted }
            onLoadedmetadata={ onLoadedmetadata }
            onTimeupdate={ onTimeupdate }
            onProgress={ onProgress }
            onEnded={ onEnded }
            onError={ onError }
            onPlay={ () => {
              playing.value = true
              startTicking()
            }}
            onPause={ () => {
              playing.value = false
              stopTicking()
            }}
            onWaiting={ () => {
              waiting.value = true
            }}
            onPlaying={ () => {
              waiting.value = false
            }}
            onCanplay={ () => {
              waiting.value = false
            }}
          >
            { props.src && props.type && (
              <source key="source" src={ props.src } type={ props.type } />
            )}
            { slots.sources?.() }
          </audio>

          { hasError
            ? (
                <div key="error" class="v-audio__error">
                  { slots.error?.({ error: error.value, retry }) ?? (
                    <span>{ t('$vuetify.audio.error') }</span>
                  )}
                </div>
            )
            : (
                <VAudioControls
                  key="controls"
                  { ...controlsProps }
                  ref={ controlsRef }
                  class="v-audio__controls"
                  v-model:playing={ playing.value }
                  v-model:volume={ volume.value }
                  v-model:playbackRate={ playbackRate.value }
                  progress={ progress.value }
                  duration={ duration.value }
                  peaks={ props.peaks }
                  buffered={ buffered.value }
                  seekable={ waveformSeekable.value }
                  onUpdate:progress={ skipTo }
                  onScrubStart={ () => {
                    scrubbing.value = true
                  }}
                  onScrubEnd={ () => {
                    scrubbing.value = false
                    startTicking()
                  }}
                  onClick:stop={ stop }
                >
                  {{
                    default: slots.controls,
                    prepend: slots.prepend,
                    append: slots.append,
                    waveform: slots.waveform,
                    time: slots.time,
                  }}
                </VAudioControls>
            )}

          { isLoading && (
            <div class="v-audio__loader">
              { slots.loader?.({ color: props.color, isActive: true }) ?? (
                <VProgressLinear
                  color={ props.color }
                  height={ 2 }
                  indeterminate
                />
              )}
            </div>
          )}
        </div>
      )
    })

    return forwardRefs({
      audio: audioRef,
      play,
      pause,
      stop,
      skipTo,
      skipBy,
      retry,
    }, controlsRef)
  },
})

export type VAudio = InstanceType<typeof VAudio>
