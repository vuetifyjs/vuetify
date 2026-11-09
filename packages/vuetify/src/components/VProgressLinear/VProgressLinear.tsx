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
import { computed, shallowRef, toRef, Transition } from 'vue'
import { makeChunksProps, useChunks } from './chunks'
import { useWavy, WAVE_AMPLITUDE } from './wavy'
import { clamp, convertToUnit, genericComponent, isNullOrUndefined, isObject, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

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
  stopIndicator: {
    type: Boolean,
    default: undefined,
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
    const bgOpacity = toRef(() => isNullOrUndefined(props.bgOpacity) ? undefined : parseFloat(props.bgOpacity))
    const isWavy = toRef(() => props.shape === 'wavy')
    // undefined keeps split without the stop until the next major
    const hasStopIndicator = toRef(() => !props.indeterminate && (
      isWavy.value ? props.stopIndicator !== false : props.variant === 'split' && props.stopIndicator === true
    ))
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

    const { geometry, svgEl, waveEl } = useWavy(props, {
      containerWidth,
      value: normalizedValue,
      isActive: () => props.active && isIntersecting.value,
      duration: () => {
        if (revealState.value === 'pending') return revealDuration.value
        const duration = getComputedStyle(root.value!).getPropertyValue('--v-progress-linear-transition-duration').trim()
        return parseFloat(duration) * (duration.endsWith('ms') ? 1 : 1000)
      },
    })

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
              opacity: bgOpacity.value,
              width: props.stream ? 0 : undefined,
            },
            props.indeterminate ? {} : splitStyles.value?.background,
          ]}
        />
      )
    }

    function renderWavy () {
      if (!geometry.value) return null

      const { width, stroke, wavelength, center, end, gap, track, wave, offset } = geometry.value

      function renderTrack () {
        return (
          <path
            class={[
              'v-progress-linear__track',
              trackColorClasses.value,
            ]}
            style={[
              trackColorStyles.value,
              { opacity: bgOpacity.value },
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
              '--v-progress-linear-stroke': convertToUnit(stroke),
              '--v-progress-linear-wavelength': convertToUnit(wavelength),
              '--v-progress-linear-wave-offset': offset,
              '--v-progress-linear-wave-gap': gap,
            },
          ]}
          viewBox={ `0 0 ${width} ${center * 2}` }
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
              { hasStopIndicator.value && (
                <circle
                  class="v-progress-linear__stop"
                  cx={ end }
                  cy={ center }
                />
              )}
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
            'v-progress-linear--shape-wavy': isWavy.value,
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
          isWavy.value ? undefined : chunksMaskStyles.value,
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

            { hasStopIndicator.value && (
              <div
                class={[
                  'v-progress-linear__stop',
                  barColorClasses.value,
                ]}
                style={ barColorStyles.value }
              />
            )}

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
