// Styles
import './VProgressCircular.sass'

// Components
import { circularWavePath, hasWave } from '@/components/VProgressLinear/waves'

// Composables
import { useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { useElementIntersection } from '@/composables/intersectionObserver'
import { useElementSize } from '@/composables/resizeObserver'
import { makeRevealProps, useReveal } from '@/composables/reveal'
import { makeSizeProps, useSize } from '@/composables/size'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { computed, shallowRef, toRef } from 'vue'
import { clamp, convertToUnit, genericComponent, isObject, PREFERS_REDUCED_MOTION, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VProgressCircularSlots } from './VProgressCircular.types'

// in px, scaled to the viewBox
const WAVE_AMPLITUDE = 1.6
const WAVELENGTH = 15
const WAVE_GAP = 4

export const makeVProgressCircularProps = propsFactory({
  bgColor: String,
  color: String,
  indeterminate: [Boolean, String] as PropType<boolean | 'disable-shrink'>,
  rounded: Boolean,
  modelValue: {
    type: [Number, String],
    default: 0,
  },
  rotate: {
    type: [Number, String],
    default: 0,
  },
  shape: {
    type: String as PropType<'flat' | 'wavy'>,
    default: 'flat',
    validator: (v: string) => ['flat', 'wavy'].includes(v),
  },
  variant: {
    type: String as PropType<'split'>,
    default: undefined,
    validator: (v: string) => ['split'].includes(v),
  },
  transition: {
    type: [Boolean, Object] as PropType<boolean | { duration?: number | string }>,
    default: undefined,
  },
  width: {
    type: [Number, String],
    default: 4,
  },

  ...makeComponentProps(),
  ...makeRevealProps(),
  ...makeSizeProps(),
  ...makeTagProps({ tag: 'div' }),
  ...makeThemeProps(),
}, 'VProgressCircular')

export const VProgressCircular = genericComponent<VProgressCircularSlots>()({
  name: 'VProgressCircular',

  props: makeVProgressCircularProps(),

  setup (props, { slots }) {
    const MAGIC_RADIUS_CONSTANT = 20
    const CIRCUMFERENCE = 2 * Math.PI * MAGIC_RADIUS_CONSTANT

    const root = shallowRef<HTMLElement>()

    const { themeClasses } = provideTheme(props)
    const { sizeClasses, sizeStyles } = useSize(props)
    const { textColorClasses, textColorStyles } = useTextColor(() => props.color)
    const { textColorClasses: underlayColorClasses, textColorStyles: underlayColorStyles } = useTextColor(() => props.bgColor)
    const { width: containerWidth } = useElementSize(root)
    const { isIntersecting } = useElementIntersection(root)
    const { state: revealState, duration: revealDuration } = useReveal(props)

    const normalizedValue = toRef(() => revealState.value === 'initial' ? 0 : clamp(parseFloat(props.modelValue), 0, 100))
    const width = toRef(() => Number(props.width))
    const transitionDuration = toRef(() => props.transition === false ? undefined : convertToUnit(
      isObject(props.transition) ? props.transition.duration : undefined, 'ms'
    ))
    const size = toRef(() => {
      // Get size from element if size prop value is small, large etc
      return sizeStyles.value
        ? Number(props.size)
        : containerWidth.value
          ? containerWidth.value
          : Math.max(width.value, 32)
    })
    const diameter = toRef(() => (MAGIC_RADIUS_CONSTANT / (1 - width.value / size.value)) * 2)
    const strokeWidth = toRef(() => width.value / size.value * diameter.value)
    const strokeDashOffset = toRef(() => {
      const baseLength = ((100 - normalizedValue.value) / 100) * CIRCUMFERENCE
      return props.rounded && normalizedValue.value > 0 && normalizedValue.value < 100
        ? convertToUnit(Math.min(CIRCUMFERENCE - 0.01, baseLength + strokeWidth.value))
        : convertToUnit(baseLength)
    })
    const startAngle = computed(() => {
      const baseAngle = Number(props.rotate)
      return props.rounded
        ? baseAngle + (strokeWidth.value / 2) / CIRCUMFERENCE * 360
        : baseAngle
    })

    const isWavy = toRef(() => props.shape === 'wavy')
    const geometry = computed(() => {
      if (props.variant !== 'split' && !isWavy.value) return undefined

      const scale = diameter.value / size.value
      const radius = MAGIC_RADIUS_CONSTANT
      const amplitude = isWavy.value && (props.indeterminate || hasWave(normalizedValue.value)) ? WAVE_AMPLITUDE * scale : 0
      const waves = Math.max(3, Math.floor(CIRCUMFERENCE / (WAVELENGTH * scale)))
      const center = diameter.value / 2
      const arc = `A ${radius} ${radius} 0 1 1`
      const roundCaps = props.rounded || isWavy.value

      return {
        waves,
        linecap: roundCaps ? 'round' as const : 'butt' as const,
        // round caps reach half a stroke into the gap from each side
        gap: (WAVE_GAP * scale + (roundCaps ? strokeWidth.value : 0)) / CIRCUMFERENCE * 100,
        // two turns so the indeterminate track can wrap past the start
        track: `M ${center + radius} ${center}` + ` ${arc} ${center - radius} ${center} ${arc} ${center + radius} ${center}`.repeat(2),
        // peaks sit on the track and troughs dip inward, so a flat wave lands on the track
        wave: circularWavePath(center, radius - amplitude, amplitude, waves),
      }
    })

    useRender(() => (
      <props.tag
        ref={ root }
        class={[
          'v-progress-circular',
          {
            'v-progress-circular--indeterminate': !!props.indeterminate,
            'v-progress-circular--visible': isIntersecting.value,
            'v-progress-circular--variant-split': props.variant === 'split',
            'v-progress-circular--shape-wavy': isWavy.value,
            'v-progress-circular--disable-shrink': props.indeterminate &&
              (props.indeterminate === 'disable-shrink' || PREFERS_REDUCED_MOTION()),
            'v-progress-circular--revealing': ['initial', 'pending'].includes(revealState.value),
            'v-progress-circular--no-transition': props.transition === false,
          },
          themeClasses.value,
          sizeClasses.value,
          textColorClasses.value,
          props.class,
        ]}
        style={[
          sizeStyles.value,
          textColorStyles.value,
          {
            '--v-progress-reveal-duration': `${revealDuration.value}ms`,
            '--v-progress-circular-transition-duration': transitionDuration.value,
          },
          props.style,
        ]}
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={ props.indeterminate ? undefined : normalizedValue.value }
      >
        <svg
          style={{
            transform: `rotate(calc(-90deg + ${startAngle.value}deg))`,
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox={ `0 0 ${diameter.value} ${diameter.value}` }
        >
          { geometry.value ? (
            <g
              class="v-progress-circular__split"
              style={{
                '--v-progress-circular-value': normalizedValue.value,
                '--v-progress-circular-stroke': convertToUnit(strokeWidth.value),
                '--v-progress-circular-waves': geometry.value.waves,
                '--v-progress-circular-gap': geometry.value.gap,
              }}
            >
              <path
                class={[
                  'v-progress-circular__underlay',
                  'v-progress-circular__track',
                  underlayColorClasses.value,
                ]}
                style={ underlayColorStyles.value }
                d={ geometry.value.track }
                pathLength="200"
                stroke-linecap={ geometry.value.linecap }
              />

              <path
                class="v-progress-circular__wave"
                // CSS d animates amplitude changes, the attribute covers Safari which ignores it
                style={{ d: `path("${geometry.value.wave}")` }}
                d={ geometry.value.wave }
                pathLength={ 100 + 100 / geometry.value.waves }
                stroke-linecap={ geometry.value.linecap }
              />
            </g>
          ) : (
            <>
              <circle
                class={[
                  'v-progress-circular__underlay',
                  underlayColorClasses.value,
                ]}
                style={ underlayColorStyles.value }
                fill="transparent"
                cx="50%"
                cy="50%"
                r={ MAGIC_RADIUS_CONSTANT }
                stroke-width={ strokeWidth.value }
                stroke-dasharray={ CIRCUMFERENCE }
                stroke-dashoffset={ 0 }
              />

              <circle
                class="v-progress-circular__overlay"
                fill="transparent"
                cx="50%"
                cy="50%"
                r={ MAGIC_RADIUS_CONSTANT }
                stroke-width={ strokeWidth.value }
                stroke-dasharray={ CIRCUMFERENCE }
                stroke-dashoffset={ strokeDashOffset.value }
                stroke-linecap={ props.rounded ? 'round' : undefined }
              />
            </>
          )}
        </svg>

        { slots.default && (
          <div class="v-progress-circular__content">
            { slots.default({ value: normalizedValue.value }) }
          </div>
        )}
      </props.tag>
    ))

    return {}
  },
})

export type VProgressCircular = InstanceType<typeof VProgressCircular>
