// Styles
import './VAudioWaveform.sass'

// Composables
import { useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { useRtl } from '@/composables/locale'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { computed, shallowRef, toRef } from 'vue'
import { downsamplePeaks, normalizePeaks } from './peaks'
import { formatDuration } from './time'
import { clamp, convertToUnit, genericComponent, keyValues, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { SampleStrategy } from './peaks'

export type VAudioWaveformSlots = {
  tooltip: { time: string, position: number }
}

export const makeVAudioWaveformProps = propsFactory({
  modelValue: {
    type: Number,
    default: 0,
  },
  peaks: Array as PropType<readonly number[]>,
  buffered: Array as PropType<readonly number[]>,
  bars: {
    type: [Number, String],
    default: 64,
  },
  barWidth: {
    type: [Number, String],
    default: 2,
  },
  barGap: {
    type: [Number, String],
    default: 1,
  },
  barRadius: {
    type: [Number, String],
    default: 1,
  },
  height: {
    type: [Number, String],
    default: 32,
  },
  color: String,
  trackColor: String,
  bufferColor: String,
  seekable: {
    type: Boolean,
    default: true,
  },
  preview: {
    type: Boolean,
    default: true,
  },
  duration: {
    type: Number,
    default: 0,
  },
  normalize: {
    type: Boolean,
    default: true,
  },
  sampleStrategy: {
    type: String as PropType<SampleStrategy>,
    default: 'peak',
  },
  mirror: Boolean,
  step: {
    type: [Number, String],
    default: 1,
  },
  disabled: Boolean,

  ...makeComponentProps(),
  ...makeThemeProps(),
}, 'VAudioWaveform')

export const VAudioWaveform = genericComponent<VAudioWaveformSlots>()({
  name: 'VAudioWaveform',

  props: makeVAudioWaveformProps(),

  emits: {
    'update:modelValue': (value: number) => true,
    start: (value: number) => true,
    end: (value: number) => true,
  },

  setup (props, { emit, slots }) {
    const { themeClasses } = provideTheme(props)
    const { isRtl } = useRtl()
    const { textColorClasses, textColorStyles } = useTextColor(toRef(() => props.color))

    const rootRef = shallowRef<HTMLElement>()
    const scrubbing = shallowRef(false)
    const seeking = shallowRef(false)
    const hoverRatio = shallowRef<number | null>(null)

    const barCount = toRef(() => Math.max(1, Number(props.bars) || 1))
    const barWidth = toRef(() => Math.max(0.5, Number(props.barWidth) || 1))
    const barGap = toRef(() => Math.max(0, Number(props.barGap) || 0))
    const height = toRef(() => Math.max(1, Number(props.height) || 1))

    // A flat mid-height track is what a missing decode degrades to; it still seeks and
    // still shows progress, which is the whole point of the fallback.
    const bars = computed(() => {
      const source = props.peaks?.length
        ? (props.peaks.length > barCount.value
          ? downsamplePeaks(props.peaks as number[], barCount.value, props.sampleStrategy)
          : props.peaks.slice())
        : Array.from({ length: barCount.value }, () => 0.35)

      return props.peaks?.length && props.normalize
        ? normalizePeaks(source as number[])
        : (source as number[]).map(v => clamp(v, 0, 1))
    })

    // The viewBox is the bar geometry's own coordinate space and the svg stretches to
    // fill the element, so `barWidth`/`barGap` are a ratio rather than device pixels —
    // the bar set always spans the full width at whatever size the container ends up.
    const viewBox = computed(() => {
      const width = bars.value.length * barWidth.value + Math.max(0, bars.value.length - 1) * barGap.value
      return { width: Math.max(width, 1), height: height.value }
    })

    const rects = computed(() => {
      const { height: h } = viewBox.value
      const half = props.mirror ? h / 2 : h
      const minHeight = 1

      return bars.value.map((peak, i) => {
        const barHeight = Math.max(minHeight, clamp(peak, 0, 1) * half)
        return {
          x: i * (barWidth.value + barGap.value),
          y: props.mirror ? half - barHeight : (h - barHeight) / 2,
          width: barWidth.value,
          height: barHeight,
        }
      })
    })

    const bufferRanges = computed(() => {
      const buffered = props.buffered
      if (!buffered?.length) return []

      const ranges: { start: number, width: number }[] = []
      for (let i = 0; i + 1 < buffered.length; i += 2) {
        const start = clamp(buffered[i], 0, 100)
        const end = clamp(buffered[i + 1], 0, 100)
        if (end > start) ranges.push({ start, width: end - start })
      }
      return ranges
    })

    const progress = toRef(() => clamp(Number(props.modelValue) || 0, 0, 100))

    // Without a duration there is no time to report, and reporting `0:00` for every
    // position is worse than reporting none: percent is what the component actually knows.
    const hasDuration = toRef(() => Number.isFinite(props.duration) && props.duration > 0)

    function timeAt (ratio: number) {
      return hasDuration.value
        ? formatDuration(ratio * props.duration, props.duration)
        : `${Math.round(ratio * 100)}%`
    }

    const ariaValueText = toRef(() => timeAt(progress.value / 100))

    function ratioFromEvent (e: PointerEvent) {
      const el = rootRef.value
      if (!el) return 0

      const rect = el.getBoundingClientRect()
      if (!rect.width) return 0

      const ratio = clamp((e.clientX - rect.left) / rect.width, 0, 1)
      return isRtl.value ? 1 - ratio : ratio
    }

    function seekTo (ratio: number) {
      emit('update:modelValue', clamp(ratio * 100, 0, 100))
    }

    function onPointerdown (e: PointerEvent) {
      if (!props.seekable || props.disabled) return

      e.preventDefault()
      const target = e.currentTarget as HTMLElement
      target.setPointerCapture(e.pointerId)
      scrubbing.value = true
      seekTo(ratioFromEvent(e))
      emit('start', progress.value)
    }

    function onPointermove (e: PointerEvent) {
      if (props.disabled) return

      if (scrubbing.value) {
        seekTo(ratioFromEvent(e))
      } else if (props.preview) {
        hoverRatio.value = ratioFromEvent(e)
      }
    }

    function onPointerup (e: PointerEvent) {
      if (!scrubbing.value) return

      const target = e.currentTarget as HTMLElement
      if (target.hasPointerCapture(e.pointerId)) target.releasePointerCapture(e.pointerId)
      scrubbing.value = false
      emit('end', progress.value)
    }

    function onPointerleave () {
      hoverRatio.value = null
    }

    // A keyboard seek must land, not slide: the transition is suppressed for the frame
    // in which the value changes, the same way scrubbing suppresses it.
    function commitKeyboard (value: number) {
      seeking.value = true
      emit('update:modelValue', clamp(value, 0, 100))
      requestAnimationFrame(() => {
        seeking.value = false
      })
    }

    function onKeydown (e: KeyboardEvent) {
      if (!props.seekable || props.disabled) return

      const { pageup, pagedown, end, home, left, right, down, up } = keyValues
      const step = Math.max(0.1, Number(props.step) || 1)
      const current = progress.value
      const forward = isRtl.value ? left : right
      const backward = isRtl.value ? right : left

      switch (e.key) {
        case forward:
        case up: {
          commitKeyboard(current + step)
          break
        }
        case backward:
        case down: {
          commitKeyboard(current - step)
          break
        }
        case pageup: {
          commitKeyboard(current + step * 10)
          break
        }
        case pagedown: {
          commitKeyboard(current - step * 10)
          break
        }
        case home: {
          commitKeyboard(0)
          break
        }
        case end: {
          commitKeyboard(100)
          break
        }
        default: {
          return
        }
      }

      e.preventDefault()
    }

    const hoverTime = toRef(() => timeAt(hoverRatio.value ?? 0))

    useRender(() => {
      const showTooltip = props.preview && hoverRatio.value !== null && !props.disabled
      const cursorOffset = `${(isRtl.value ? 1 - (hoverRatio.value ?? 0) : hoverRatio.value ?? 0) * 100}%`

      return (
        <div
          ref={ rootRef }
          class={[
            'v-audio-waveform',
            {
              'v-audio-waveform--disabled': props.disabled,
              'v-audio-waveform--rtl': isRtl.value,
              'v-audio-waveform--scrubbing': scrubbing.value,
              'v-audio-waveform--seeking': seeking.value,
              'v-audio-waveform--seekable': props.seekable && !props.disabled,
            },
            themeClasses.value,
            textColorClasses.value,
            props.class,
          ]}
          style={[
            {
              '--v-audio-waveform-progress': `${progress.value}%`,
              height: convertToUnit(props.height),
            },
            textColorStyles.value,
            props.style,
          ]}
          role={ props.seekable && !props.disabled ? 'slider' : undefined }
          tabindex={ props.seekable && !props.disabled ? 0 : undefined }
          aria-valuemin={ props.seekable && !props.disabled ? 0 : undefined }
          aria-valuemax={ props.seekable && !props.disabled ? 100 : undefined }
          aria-valuenow={ props.seekable && !props.disabled ? Math.round(progress.value) : undefined }
          aria-valuetext={ props.seekable && !props.disabled ? ariaValueText.value : undefined }
          aria-disabled={ props.disabled || undefined }
          onPointerdown={ onPointerdown }
          onPointermove={ onPointermove }
          onPointerup={ onPointerup }
          onPointercancel={ onPointerup }
          onPointerleave={ onPointerleave }
          onKeydown={ onKeydown }
        >
          <svg
            class="v-audio-waveform__svg"
            viewBox={ `0 0 ${viewBox.value.width} ${viewBox.value.height}` }
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <g id={ `v-audio-waveform-bars-${bars.value.length}` } />
            </defs>

            { bufferRanges.value.map(range => (
              <g
                class="v-audio-waveform__buffer"
                clip-path={ `inset(0 ${100 - range.start - range.width}% 0 ${range.start}%)` }
              >
                { rects.value.map(rect => (
                  <rect { ...rect } rx={ props.barRadius } />
                ))}
              </g>
            ))}

            <g class="v-audio-waveform__track">
              { rects.value.map(rect => (
                <rect { ...rect } rx={ props.barRadius } />
              ))}
              { props.mirror && (
                <g
                  class="v-audio-waveform__mirror"
                  transform={ `translate(0, ${viewBox.value.height}) scale(1, -1)` }
                >
                  { rects.value.map(rect => (
                    <rect { ...rect } rx={ props.barRadius } />
                  ))}
                </g>
              )}
            </g>

            <g class="v-audio-waveform__progress">
              { rects.value.map(rect => (
                <rect { ...rect } rx={ props.barRadius } />
              ))}
              { props.mirror && (
                <g
                  class="v-audio-waveform__mirror"
                  transform={ `translate(0, ${viewBox.value.height}) scale(1, -1)` }
                >
                  { rects.value.map(rect => (
                    <rect { ...rect } rx={ props.barRadius } />
                  ))}
                </g>
              )}
            </g>
          </svg>

          { showTooltip && (
            <>
              <div
                class="v-audio-waveform__cursor"
                style={{ insetInlineStart: cursorOffset }}
              />
              <div
                class="v-audio-waveform__tooltip"
                style={{ insetInlineStart: cursorOffset }}
              >
                { slots.tooltip?.({
                  time: hoverTime.value,
                  position: (hoverRatio.value ?? 0) * 100,
                }) ?? hoverTime.value }
              </div>
            </>
          )}
        </div>
      )
    })

    return {}
  },
})

export type VAudioWaveform = InstanceType<typeof VAudioWaveform>
