// Styles
import './VMediaProgressBar.sass'

// Composables
import { useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useElementSize } from '@/composables/resizeObserver'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { getSeekStep } from '@/labs/composables/media'

// Utilities
import { computed, nextTick, shallowRef, toRef, watch } from 'vue'
import { wavePath, waveStretch } from './waves'
import {
  clamp,
  convertToUnit,
  easingPatterns,
  formatTime,
  genericComponent,
  isObject,
  isUndefined,
  keyValues,
  parseTime,
  propsFactory,
  useRender,
  useTransition,
} from '@/util'

// Types
import type { PropType } from 'vue'
import type { MediaSeekStep } from '@/labs/composables/media'

export type VMediaProgressBarChapter = { start: number | string, title?: string }

const WAVE_AMPLITUDE = 3
const WAVE_LENGTH = 40

// Jumps up to this many seconds are playback ticks and follow the media without easing
const SEEK_THRESHOLD = 1.5
// A click wobbles a little before release; only a longer move turns it into a drag
const DRAG_THRESHOLD = 4

const HALF_GAP = 'calc(var(--v-media-progress-bar-chapter-gap) / 2)'

export type VMediaProgressBarSlots = {
  default: never
  tooltip: { time: string, chapter: string | undefined, seconds: number }
}

export const makeVMediaProgressBarProps = propsFactory({
  modelValue: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 0,
  },
  buffer: {
    type: Number,
    default: 0,
  },
  chapters: {
    type: Array as PropType<readonly VMediaProgressBarChapter[]>,
    default: () => [],
  },
  chapterGap: [Number, String],
  step: {
    type: [Number, Array] as PropType<MediaSeekStep>,
    default: 5,
  },
  height: [Number, String],
  variant: {
    type: String as PropType<'default' | 'pill' | 'wavy'>,
    default: 'default',
  },
  color: String,
  bgColor: String,
  disabled: Boolean,
  readonly: Boolean,
  thumb: Boolean,
  thumbSize: [Number, String],
  tooltip: {
    type: [Boolean, Object] as PropType<boolean | {
      location?: 'top' | 'bottom'
      offset?: number | string
    }>,
    default: true,
  },

  ...makeComponentProps(),
  ...makeElevationProps({ elevation: 1 }),
  ...makeRoundedProps(),
  ...makeThemeProps(),
}, 'VMediaProgressBar')

export const VMediaProgressBar = genericComponent<VMediaProgressBarSlots>()({
  name: 'VMediaProgressBar',

  props: makeVMediaProgressBarProps(),

  emits: {
    'update:modelValue': (value: number) => true,
    'drag:start': (value: number) => true,
    'drag:end': (value: number) => true,
  },

  setup (props, { emit, slots }) {
    const { themeClasses } = provideTheme(props)
    const { t } = useLocale()
    const { roundedClasses, roundedStyles } = useRounded(props)
    const { elevationClasses } = useElevation(toRef(() => props.variant === 'default' ? props.elevation : undefined))
    const { textColorClasses, textColorStyles } = useTextColor(() => props.color)
    const { textColorClasses: bgColorClasses, textColorStyles: bgColorStyles } = useTextColor(() => props.bgColor)

    const model = useProxiedModel(props, 'modelValue')

    const rootRef = shallowRef<HTMLElement>()
    const trackRef = shallowRef<HTMLElement>()
    const thumbRef = shallowRef<HTMLElement>()
    const hoverRatio = shallowRef<number | null>(null)
    const dragging = shallowRef(false)
    const seeking = shallowRef(false)

    const isWavy = toRef(() => props.variant === 'wavy' && !slots.default)
    const { width: trackWidth } = useElementSize(() => isWavy.value ? trackRef.value : undefined)
    // a new max means new media, e.g. a switched source; its progress reset jumps instead of easing
    let mediaChanged = false
    watch(() => props.max, () => {
      mediaChanged = true
      stopEasing()
      nextTick(() => mediaChanged = false)
    }, { flush: 'sync' })

    const amplitude = useTransition(
      () => props.max > 0 && model.value >= props.max ? 0 : WAVE_AMPLITUDE,
      () => mediaChanged ? { transition: easingPatterns.instant } : {},
    )
    const wave = computed(() => isWavy.value && trackWidth.value
      ? wavePath(trackWidth.value, amplitude.value, WAVE_LENGTH)
      : undefined
    )

    const interactive = toRef(() => !props.disabled && !props.readonly && props.max > 0)
    function percent (seconds: number) {
      return props.max > 0 ? clamp(seconds / props.max * 100, 0, 100) : 0
    }

    const chapters = computed(() => props.chapters
      .map(chapter => ({ ...chapter, start: parseTime(chapter.start) }))
      .filter(chapter => Number.isFinite(chapter.start))
      .sort((a, b) => a.start - b.start)
    )
    const chapterStarts = computed(() => chapters.value
      .map(c => c.start)
      .filter(start => start > 0 && start < props.max)
    )

    function chapterAt (seconds: number) {
      return chapters.value.filter(c => c.start <= seconds).pop()?.title
    }

    const maskStyles = computed(() => {
      if (!chapterStarts.value.length) return undefined

      const stops = chapterStarts.value.map(start => {
        const at = `${percent(start)}%`
        return `#000 calc(${at} - ${HALF_GAP}), transparent calc(${at} - ${HALF_GAP}) calc(${at} + ${HALF_GAP}), #000 calc(${at} + ${HALF_GAP})`
      })
      const mask = `linear-gradient(90deg, #000 0, ${stops.join(', ')}, #000 100%)`

      return { maskImage: mask, WebkitMaskImage: mask }
    })

    const segments = computed(() => {
      const starts = chapterStarts.value.map(percent)
      return [0, ...starts].map((start, index) => {
        const end = starts[index] ?? 100
        return {
          start,
          end,
          startGap: start > 0 ? HALF_GAP : '0px',
          endGap: end < 100 ? HALF_GAP : '0px',
        }
      })
    })

    // mirrors the thumb transform: its center travels from size / 2 to width - size / 2
    function ratioAt (e: PointerEvent) {
      const rect = rootRef.value!.getBoundingClientRect()
      const size = thumbRef.value?.offsetWidth ?? 0
      const width = rect.width - size
      return width > 0 ? clamp((e.clientX - rect.left - size / 2) / width, 0, 1) : 0
    }

    function commit (seconds: number) {
      model.value = clamp(seconds, 0, props.max)
    }

    // the click that starts a drag still eases to its target, the moves after it follow the pointer
    let pointerJump = false
    let awaitingTransition = false

    watch(() => model.value, (value, old) => {
      if (!isWavy.value || mediaChanged || (dragging.value && !pointerJump)) return
      if (Math.abs(value - old) <= SEEK_THRESHOLD) return

      seeking.value = true
      awaitingTransition = true
      // no transition starts when the bar is hidden or motion is reduced
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (awaitingTransition) {
          seeking.value = false
        }
      }))
    }, { flush: 'sync' })

    function easings () {
      return rootRef.value?.getAnimations()
        .filter(animation => (animation as CSSTransition).transitionProperty === '--v-media-progress-bar-ratio') ?? []
    }

    // dropping the class leaves an already running transition alone, so it is cancelled explicitly
    function stopEasing () {
      seeking.value = false
      easings().forEach(animation => animation.cancel())
    }

    function onTransition (e: TransitionEvent) {
      if (e.target !== rootRef.value || e.propertyName !== '--v-media-progress-bar-ratio') return

      if (e.type === 'transitionrun') {
        awaitingTransition = false
      } else if (e.type === 'transitionend' || !easings().length) {
        // a jump during an ease replaces the transition, which cancels the previous one
        seeking.value = false
      }
    }

    let pointerFocused = false
    let pressedX = 0

    function onPointerdown (e: PointerEvent) {
      pointerFocused = true
      if (!interactive.value || e.button !== 0) return

      rootRef.value!.setPointerCapture(e.pointerId)
      dragging.value = true
      emit('drag:start', model.value)
      pointerJump = true
      pressedX = e.clientX
      commit(ratioAt(e) * props.max)
    }

    function onPointermove (e: PointerEvent) {
      if (!interactive.value) return

      hoverRatio.value = ratioAt(e)
      if (!dragging.value) return
      if (pointerJump) {
        if (Math.abs(e.clientX - pressedX) <= DRAG_THRESHOLD) return

        stopEasing()
        pointerJump = false
      }

      commit(hoverRatio.value * props.max)
    }

    function onPointerup (e: PointerEvent) {
      if (e.pointerType !== 'mouse') {
        hoverRatio.value = null
      }
      if (!dragging.value) return

      dragging.value = false
      emit('drag:end', model.value)
    }

    function onKeydown (e: KeyboardEvent) {
      if (!interactive.value) return

      const { left, right, up, down, pageup, pagedown, home, end } = keyValues
      // focus left over from a click must not take page scrolling keys
      if (pointerFocused && e.key !== left && e.key !== right) return

      const step = getSeekStep(props.step, e.shiftKey)
      const page = props.max / 10
      const delta = {
        [right]: step,
        [up]: step,
        [left]: -step,
        [down]: -step,
        [pageup]: page,
        [pagedown]: -page,
      }[e.key]

      const target = !isUndefined(delta) ? model.value + delta
        : e.key === home ? 0
        : e.key === end ? props.max
        : undefined
      if (isUndefined(target)) return

      e.preventDefault()
      commit(target)
    }

    const valueText = computed(() => {
      const time = `${formatTime(model.value)} / ${formatTime(props.max)}`
      const chapter = chapterAt(model.value)
      return chapter ? `${time}, ${chapter}` : time
    })

    useRender(() => {
      const hoverSeconds = (hoverRatio.value ?? 0) * props.max
      const hoverChapter = chapterAt(hoverSeconds)
      const tooltip = isObject(props.tooltip) ? props.tooltip : {}
      const showTooltip = !!props.tooltip && hoverRatio.value !== null
      const hoveredSegment = hoverRatio.value === null
        ? -1
        : segments.value.filter(({ start }) => start <= hoverRatio.value! * 100).length - 1

      // a function, not a shared vnode: one vnode mounted in several chapters is not patched reliably
      const layers = () => (
        <>
          <div
            class={[
              'v-media-progress-bar__background',
              bgColorClasses.value,
            ]}
            style={ bgColorStyles.value }
          />
          <div class="v-media-progress-bar__buffer" />
          { !isWavy.value && <div class="v-media-progress-bar__fill" /> }
        </>
      )

      return (
        <div
          ref={ rootRef }
          class={[
            'v-media-progress-bar',
            `v-media-progress-bar--variant-${props.variant}`,
            {
              'v-media-progress-bar--disabled': props.disabled,
              'v-media-progress-bar--dragging': dragging.value,
              'v-media-progress-bar--interactive': interactive.value,
              'v-media-progress-bar--seeking': seeking.value,
              'v-media-progress-bar--tooltip-bottom': tooltip.location === 'bottom',
            },
            themeClasses.value,
            textColorClasses.value,
            props.class,
          ]}
          style={[
            {
              '--v-media-progress-bar-position': percent(model.value),
              '--v-media-progress-bar-buffer': `${percent(props.buffer)}%`,
              '--v-media-progress-bar-height': convertToUnit(props.height),
              '--v-media-progress-bar-chapter-gap': convertToUnit(props.chapterGap),
              '--v-media-progress-bar-thumb-size': convertToUnit(props.thumbSize),
              '--v-media-progress-bar-tooltip-offset': convertToUnit(tooltip.offset),
            },
            textColorStyles.value,
            props.style,
          ]}
          role="slider"
          aria-orientation="horizontal"
          aria-label={ t('$vuetify.media.seek') }
          tabindex={ props.disabled ? -1 : 0 }
          aria-valuemin={ 0 }
          aria-valuemax={ Math.round(props.max) }
          aria-valuenow={ Math.round(model.value) }
          aria-valuetext={ valueText.value }
          aria-disabled={ props.disabled || undefined }
          aria-readonly={ props.readonly || undefined }
          onPointerdown={ onPointerdown }
          onPointermove={ onPointermove }
          onPointerup={ onPointerup }
          onPointercancel={ onPointerup }
          onPointerleave={ () => !dragging.value && (hoverRatio.value = null) }
          onKeydown={ onKeydown }
          onBlur={ () => pointerFocused = false }
          onTransitionrun={ onTransition }
          onTransitionend={ onTransition }
          onTransitioncancel={ onTransition }
        >
          <div
            ref={ trackRef }
            class={[
              'v-media-progress-bar__track',
              { 'v-media-progress-bar__track--segmented': !slots.default && segments.value.length > 1 },
              roundedClasses.value,
            ]}
            style={[roundedStyles.value, slots.default && maskStyles.value]}
          >
            { slots.default?.() ?? (segments.value.length > 1 ? segments.value.map(({ start, end, startGap, endGap }, index) => (
              <div
                key={ index }
                class={[
                  'v-media-progress-bar__segment',
                  { 'v-media-progress-bar__segment--hovered': index === hoveredSegment },
                ]}
                style={{
                  left: `calc(${start}% + ${startGap})`,
                  right: `calc(${100 - end}% + ${endGap})`,
                  '--v-media-progress-bar-segment-offset': `calc(${start}cqw + ${startGap})`,
                }}
              >
                { layers() }
              </div>
            )) : layers())}

            { wave.value && (
              <svg
                key="wave"
                class="v-media-progress-bar__wave"
                style={{ '--v-media-progress-bar-wave-stretch': waveStretch(amplitude.value, WAVE_LENGTH) }}
                aria-hidden="true"
              >
                { segments.value.map(({ start, end, startGap, endGap }, index) => (
                  <path
                    key={ index }
                    d={ wave.value }
                    style={{
                      '--v-media-progress-bar-wave-start': `calc(${start}cqw + ${startGap})`,
                      '--v-media-progress-bar-wave-end': `calc(${end}cqw - ${endGap})`,
                    }}
                  />
                ))}
              </svg>
            )}
          </div>

          { props.thumb && (
            <div key="thumb" class="v-media-progress-bar__rail">
              <div ref={ thumbRef } class={['v-media-progress-bar__thumb', elevationClasses.value]} />
            </div>
          )}

          { showTooltip && (
            <div
              key="tooltip"
              class="v-media-progress-bar__tooltip"
              style={{ left: `calc(${hoverRatio.value! * 100}% + ${(0.5 - hoverRatio.value!) * (thumbRef.value?.offsetWidth ?? 0)}px)` }}
            >
              { slots.tooltip?.({
                time: formatTime(hoverSeconds),
                chapter: hoverChapter,
                seconds: hoverSeconds,
              }) ?? (
                <>
                  { hoverChapter && (
                    <div key="chapter" class="v-media-progress-bar__chapter">{ hoverChapter }</div>
                  )}
                  { formatTime(hoverSeconds) }
                </>
              )}
            </div>
          )}
        </div>
      )
    })

    return {}
  },
})

export type VMediaProgressBar = InstanceType<typeof VMediaProgressBar>
