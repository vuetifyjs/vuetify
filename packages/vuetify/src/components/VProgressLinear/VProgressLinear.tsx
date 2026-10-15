// Styles
import './VProgressLinear.sass'

// Composables
import { useBackgroundColor, useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { useElementIntersection } from '@/composables/intersectionObserver'
import { useRtl } from '@/composables/locale'
import { makeLocationProps, useLocation } from '@/composables/location'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useResizeObserver } from '@/composables/resizeObserver'
import { makeRevealProps, useReveal } from '@/composables/reveal'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useToggleScope } from '@/composables/toggleScope'

// Utilities
import { computed, onScopeDispose, shallowRef, toRef, Transition, watch } from 'vue'
import { makeChunksProps, useChunks } from './chunks'
import { hasWave, linearWavePath } from './waves'
import { clamp, convertToUnit, genericComponent, isObject, PREFERS_REDUCED_MOTION, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

const WAVE_AMPLITUDE = 3

type VProgressLinearSlots = {
  default: { value: number, buffer: number }
}

export const makeVProgressLinearProps = propsFactory({
  absolute: Boolean,
  active: {
    type: Boolean,
    default: true,
  },
  bgColor: String,
  bgOpacity: [Number, String],
  bufferValue: {
    type: [Number, String],
    default: 0,
  },
  bufferColor: String,
  bufferOpacity: [Number, String],
  clickable: Boolean,
  color: String,
  height: {
    type: [Number, String],
    default: 4,
  },
  indeterminate: Boolean,
  max: {
    type: [Number, String],
    default: 100,
  },
  modelValue: {
    type: [Number, String],
    default: 0,
  },
  opacity: [Number, String],
  reverse: Boolean,
  shape: {
    type: String as PropType<'flat' | 'wavy'>,
    default: 'flat',
    validator: (v: string) => ['flat', 'wavy'].includes(v),
  },
  stream: Boolean,
  striped: Boolean,
  roundedBar: Boolean,
  transition: {
    type: [Boolean, Object] as PropType<boolean | { duration?: number | string }>,
    default: undefined,
  },

  ...makeChunksProps(),
  ...makeComponentProps(),
  ...makeLocationProps({ location: 'top' } as const),
  ...makeRevealProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
}, 'VProgressLinear')

export const VProgressLinear = genericComponent<VProgressLinearSlots>()({
  name: 'VProgressLinear',

  props: makeVProgressLinearProps(),

  emits: {
    'update:modelValue': (value: number) => true,
  },

  setup (props, { slots }) {
    const root = shallowRef<HTMLElement>()

    const progress = useProxiedModel(props, 'modelValue')
    const { isRtl, rtlClasses } = useRtl()
    const { themeClasses } = provideTheme(props)
    const { locationStyles } = useLocation(props)
    const { textColorClasses, textColorStyles } = useTextColor(() => props.color)
    const {
      backgroundColorClasses,
      backgroundColorStyles,
    } = useBackgroundColor(() => props.bgColor || props.color)
    const {
      backgroundColorClasses: bufferColorClasses,
      backgroundColorStyles: bufferColorStyles,
    } = useBackgroundColor(() => props.bufferColor || props.bgColor || props.color)
    const {
      backgroundColorClasses: barColorClasses,
      backgroundColorStyles: barColorStyles,
    } = useBackgroundColor(() => props.color)
    const {
      textColorClasses: trackColorClasses,
      textColorStyles: trackColorStyles,
    } = useTextColor(() => props.bgColor)
    const { roundedClasses, roundedStyles } = useRounded(props)
    const { isIntersecting } = useElementIntersection(root)
    const { state: revealState, duration: revealDuration } = useReveal(props)

    const max = computed(() => parseFloat(props.max))
    const height = computed(() => convertToUnit(props.height))
    const normalizedBuffer = computed(() => clamp(parseFloat(props.bufferValue) / max.value * 100, 0, 100))
    const normalizedValue = computed(() => revealState.value === 'initial'
      ? 0
      : clamp(parseFloat(progress.value) / max.value * 100, 0, 100)
    )
    const isReversed = computed(() => isRtl.value !== props.reverse)
    const transitionDuration = computed(() => props.transition === false ? undefined : convertToUnit(
      isObject(props.transition) ? props.transition.duration : undefined, 'ms'
    ))
    const isWavy = toRef(() => props.shape === 'wavy')
    const transitionName = computed(() => props.indeterminate ? 'fade-transition' : 'slide-x-transition')

    const containerWidth = shallowRef(0)
    const { hasChunks, splitStyles, chunksMaskStyles, snapValueToChunk } = useChunks(
      props,
      containerWidth,
      normalizedValue,
      normalizedBuffer,
      isReversed
    )
    useToggleScope(() => hasChunks.value || isWavy.value, () => {
      useResizeObserver(root, entries => {
        containerWidth.value = entries[0].contentRect.width
      })
    })

    const bufferWidth = computed(() => {
      return hasChunks.value
        ? snapValueToChunk(normalizedBuffer.value)
        : normalizedBuffer.value
    })

    const barWidth = computed(() => {
      return hasChunks.value
        ? snapValueToChunk(normalizedValue.value)
        : normalizedValue.value
    })

    const geometry = computed(() => {
      const width = containerWidth.value
      if (!isWavy.value || !width) return undefined

      // ponytail: geometry assumes a px height, rem/em heights would need measuring
      const stroke = parseFloat(props.height)
      const wavelength = props.indeterminate ? 20 : 40
      const center = stroke / 2 + WAVE_AMPLITUDE
      const start = stroke / 2
      const end = Math.max(width - start, start + 1)
      const range = end - start

      return {
        width,
        stroke,
        wavelength,
        center,
        start,
        end,
        offset: wavelength / range * 100,
        gap: (parseFloat(props.chunkGap) + stroke) / range * 100,
        track: `M ${start} ${center} H ${end}`,
        wave: props.indeterminate ? linearWavePath(start - wavelength, end, center, WAVE_AMPLITUDE, wavelength) : '',
      }
    })

    // determinate wave is drawn per frame: a critically damped spring keeps the head smooth however often the value updates
    const svgEl = shallowRef<SVGSVGElement>()
    const waveEl = shallowRef<SVGPathElement>()
    const springDuration = computed(() => {
      if (revealState.value === 'pending') return revealDuration.value
      if (props.transition === false) return 0
      const duration = transitionDuration.value
      return !duration ? 200 : duration.endsWith('ms') ? parseFloat(duration) : parseFloat(duration) * 1000
    })
    const isAnimating = computed(() => (
      isWavy.value && !props.indeterminate && props.active && isIntersecting.value && !!svgEl.value
    ))

    function amplitudeFor (value: number) {
      return hasWave(value) ? 1 : 0
    }

    let displayedValue = normalizedValue.value
    let velocity = 0
    let amplitude = amplitudeFor(displayedValue)
    let phase = 0
    let lastFrameTime = 0
    let frame = -1

    function draw () {
      if (!geometry.value || !svgEl.value || !waveEl.value) return

      const { start, end, center, wavelength } = geometry.value
      const head = start + (end - start) * displayedValue / 100
      const eased = amplitude * amplitude * (3 - 2 * amplitude)
      waveEl.value.setAttribute('d', linearWavePath(start, head, center, WAVE_AMPLITUDE * eased, wavelength, phase))
      svgEl.value.style.setProperty('--v-progress-linear-value', String(displayedValue))
    }

    function tick (now: number) {
      const elapsed = lastFrameTime ? Math.min(now - lastFrameTime, 100) / 1000 : 0
      lastFrameTime = now

      const target = normalizedValue.value
      const omega = 4000 / springDuration.value
      if (!Number.isFinite(omega)) {
        displayedValue = target
        velocity = 0
      } else {
        const offset = displayedValue - target
        const decay = Math.exp(-omega * elapsed)
        const coefficient = velocity + omega * offset
        displayedValue = target + (offset + coefficient * elapsed) * decay
        velocity = (velocity - omega * coefficient * elapsed) * decay
        if (Math.abs(displayedValue - target) < 0.01 && Math.abs(velocity) < 0.01) {
          displayedValue = target
          velocity = 0
        }
      }

      const targetAmplitude = amplitudeFor(displayedValue)
      amplitude = targetAmplitude > amplitude ? Math.min(amplitude + elapsed * 2, 1) : Math.max(amplitude - elapsed * 2, 0)

      const reduceMotion = PREFERS_REDUCED_MOTION()
      const wavelength = geometry.value?.wavelength ?? 40
      if (!reduceMotion) phase = (phase - elapsed * wavelength) % wavelength

      draw()

      const settled = displayedValue === target && amplitude === targetAmplitude
      frame = isAnimating.value && (!reduceMotion || !settled) ? requestAnimationFrame(tick) : -1
    }

    watch([isAnimating, normalizedValue, springDuration], () => {
      if (!isAnimating.value || frame >= 0) return
      lastFrameTime = 0
      frame = requestAnimationFrame(tick)
    }, { immediate: true })
    watch([svgEl, geometry], draw, { flush: 'post' })
    onScopeDispose(() => cancelAnimationFrame(frame))

    function handleClick (e: MouseEvent) {
      if (!root.value) return

      const { left, right, width } = root.value.getBoundingClientRect()
      const value = isReversed.value ? (width - e.clientX) + (right - width) : e.clientX - left

      progress.value = Math.round(value / width * max.value)
    }

    function renderBackgroundBar () {
      return (
        <div
          class={[
            'v-progress-linear__background',
            backgroundColorClasses.value,
          ]}
          style={[
            backgroundColorStyles.value,
            {
              opacity: props.bgOpacity != null ? parseFloat(props.bgOpacity) : undefined,
              width: props.stream ? 0 : undefined,
            },
            props.indeterminate ? {} : splitStyles.value?.background,
          ]}
        />
      )
    }

    function renderWavy () {
      if (!geometry.value) return null

      const { track, wave, offset } = geometry.value

      function renderTrack () {
        return (
          <path
            class={[
              'v-progress-linear__track',
              trackColorClasses.value,
            ]}
            style={[
              trackColorStyles.value,
              { opacity: props.bgOpacity != null ? parseFloat(props.bgOpacity) : undefined },
            ]}
            d={ track }
            pathLength="100"
          />
        )
      }

      function renderWave (bar: string) {
        return (
          <path
            class={['v-progress-linear__wave', bar]}
            d={ wave }
            pathLength={ 100 + offset }
          />
        )
      }

      return (
        <svg
          ref={ svgEl }
          class={[
            'v-progress-linear__wavy',
            { 'v-progress-linear__wavy--indeterminate': props.indeterminate },
            textColorClasses.value,
          ]}
          style={[
            textColorStyles.value,
            {
              '--v-progress-linear-stroke': convertToUnit(geometry.value.stroke),
              '--v-progress-linear-wavelength': convertToUnit(geometry.value.wavelength),
              '--v-progress-linear-wave-offset': offset,
              '--v-progress-linear-wave-gap': geometry.value.gap,
            },
          ]}
          viewBox={ `0 0 ${geometry.value.width} ${geometry.value.center * 2}` }
        >
          { props.indeterminate ? (
            <>
              { renderTrack() }
              { renderTrack() }
              { renderTrack() }
              { renderWave('long') }
              { renderWave('short') }
            </>
          ) : (
            <>
              { renderTrack() }
              <circle
                class="v-progress-linear__stop"
                cx={ geometry.value.end }
                cy={ geometry.value.center }
                r={ Math.min(2, geometry.value.stroke / 2) }
              />
              <path ref={ waveEl } class="v-progress-linear__wave" />
            </>
          )}
        </svg>
      )
    }

    useRender(() => (
      <props.tag
        ref={ root }
        class={[
          'v-progress-linear',
          {
            'v-progress-linear--absolute': props.absolute,
            'v-progress-linear--active': props.active && isIntersecting.value,
            'v-progress-linear--reverse': isReversed.value,
            'v-progress-linear--rounded': props.rounded,
            'v-progress-linear--rounded-bar': props.roundedBar,
            'v-progress-linear--striped': props.striped,
            'v-progress-linear--clickable': props.clickable,
            'v-progress-linear--no-transition': props.transition === false,
            'v-progress-linear--revealing': ['initial', 'pending'].includes(revealState.value),
            'v-progress-linear--variant-split': props.variant === 'split',
          },
          roundedClasses.value,
          themeClasses.value,
          rtlClasses.value,
          props.class,
        ]}
        style={[
          {
            bottom: props.location === 'bottom' ? 0 : undefined,
            top: props.location === 'top' ? 0 : undefined,
            height: !props.active ? 0 : isWavy.value ? convertToUnit(parseFloat(props.height) + 2 * WAVE_AMPLITUDE) : height.value,
            '--v-progress-linear-height': height.value,
            '--v-progress-linear-transition-duration': transitionDuration.value,
            '--v-progress-reveal-duration': `${revealDuration.value}ms`,
            '--v-progress-chunk-gap': convertToUnit(props.chunkGap),
            ...(props.absolute ? locationStyles.value : {}),
          },
          chunksMaskStyles.value,
          roundedStyles.value,
          props.style,
        ]}
        role="progressbar"
        aria-hidden={ props.active ? 'false' : 'true' }
        aria-valuemin="0"
        aria-valuemax={ props.max }
        aria-valuenow={ props.indeterminate ? undefined : Math.min(parseFloat(progress.value), max.value) }
        onClick={ props.clickable && handleClick }
      >
        { isWavy.value ? renderWavy() : (
          <>
            { props.stream && (
              <div
                key="stream"
                class={[
                  'v-progress-linear__stream',
                  textColorClasses.value,
                ]}
                style={{
                  ...textColorStyles.value,
                  [isReversed.value ? 'left' : 'right']: `calc(${height.value} * -1)`,
                  borderTop: `calc(${height.value} / 2) dotted`,
                  opacity: props.bufferOpacity != null ? parseFloat(props.bufferOpacity) : undefined,
                  top: `calc(50% - ${height.value} / 4)`,
                  width: convertToUnit(100 - normalizedBuffer.value, '%'),
                  '--v-progress-linear-stream-to': `calc(${height.value} * ${isReversed.value ? 1 : -1})`,
                }}
              />
            )}

            { (props.variant !== 'split' || !props.indeterminate) && renderBackgroundBar() }

            <div
              class={[
                'v-progress-linear__buffer',
                bufferColorClasses.value,
              ]}
              style={[
                bufferColorStyles.value,
                {
                  opacity: props.bufferOpacity != null ? parseFloat(props.bufferOpacity) : undefined,
                  width: convertToUnit(bufferWidth.value, '%'),
                },
                splitStyles.value?.buffer,
              ]}
            />

            <Transition name={ transitionName.value }>
              { !props.indeterminate ? (
                <div
                  class={[
                    'v-progress-linear__determinate',
                    barColorClasses.value,
                  ]}
                  style={[
                    barColorStyles.value,
                    { width: convertToUnit(barWidth.value, '%') },
                    splitStyles.value?.bar,
                  ]}
                />
              ) : (
                <div class="v-progress-linear__indeterminate">
                  { props.variant === 'split' && (
                    <>
                      { renderBackgroundBar() }
                      { renderBackgroundBar() }
                      { renderBackgroundBar() }
                    </>
                  )}
                  {['long', 'short'].map(bar => (
                    <div
                      key={ bar }
                      class={[
                        'v-progress-linear__indeterminate',
                        bar,
                        barColorClasses.value,
                      ]}
                      style={ barColorStyles.value }
                    />
                  ))}
                </div>
              )}
            </Transition>
          </>
        )}

        { slots.default && (
          <div class="v-progress-linear__content">
            { slots.default({ value: normalizedValue.value, buffer: normalizedBuffer.value }) }
          </div>
        )}
      </props.tag>
    ))

    return {}
  },
})

export type VProgressLinear = InstanceType<typeof VProgressLinear>
