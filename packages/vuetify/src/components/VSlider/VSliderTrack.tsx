// Styles
import './VSliderTrack.sass'

// Components
import { VSliderSymbol } from './slider'

// Composables
import { useBackgroundColor, useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { useRounded } from '@/composables/rounded'

// Utilities
import { computed, inject } from 'vue'
import { convertToUnit, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { Tick } from './slider'

export type VSliderTrackSlots = {
  'tick-label': { tick: Tick, index: number }
}

export const makeVSliderTrackProps = propsFactory({
  start: {
    type: Number,
    required: true,
  },
  stop: {
    type: Number,
    required: true,
  },

  ...makeComponentProps(),
}, 'VSliderTrack')

export const VSliderTrack = genericComponent<VSliderTrackSlots>()({
  name: 'VSliderTrack',

  props: makeVSliderTrackProps(),

  emits: {},

  setup (props, { slots }) {
    const slider = inject(VSliderSymbol)

    if (!slider) throw new Error('[Vuetify] v-slider-track must be inside v-slider or v-range-slider')

    const {
      color,
      parsedTicks,
      rounded,
      isReversed,
      showTicks,
      tickSize,
      trackColor,
      trackFillColor,
      trackSize,
      variant,
      vertical,
      min,
      max,
    } = slider

    const isPill = computed(() => variant.value === 'pill')
    const visualStart = computed(() => isReversed.value ? 100 - props.stop : props.start)
    const visualStop = computed(() => isReversed.value ? 100 - props.start : props.stop)

    const { roundedClasses, roundedStyles } = useRounded(rounded)

    const {
      backgroundColorClasses: trackFillColorClasses,
      backgroundColorStyles: trackFillColorStyles,
    } = useBackgroundColor(trackFillColor)

    const {
      backgroundColorClasses: trackColorClasses,
      backgroundColorStyles: trackColorStyles,
    } = useBackgroundColor(trackColor)

    const {
      textColorClasses: tickColorClasses,
      textColorStyles: tickColorStyles,
    } = useTextColor(() => isPill.value ? trackFillColor.value : undefined)

    const computedTicks = computed(() => {
      if (!showTicks.value) return []

      const ticks = vertical.value ? parsedTicks.value.slice().reverse() : parsedTicks.value

      return ticks.map((tick, index) => {
        const directionValue = tick.value !== min.value && tick.value !== max.value
          ? convertToUnit(isReversed.value ? 100 - tick.position : tick.position, '%')
          : undefined

        return (
          <div
            key={ tick.value }
            class={[
              'v-slider-track__tick',
              {
                'v-slider-track__tick--filled': tick.position >= props.start && tick.position <= props.stop,
                'v-slider-track__tick--first': tick.value === (isReversed.value ? max.value : min.value),
                'v-slider-track__tick--last': tick.value === (isReversed.value ? min.value : max.value),
              },
            ]}
            style={{ '--v-slider-tick-position': directionValue }}
          >
            {
              (tick.label || slots['tick-label']) && (
                <div class="v-slider-track__tick-label">
                  { slots['tick-label']?.({ tick, index }) ?? tick.label }
                </div>
              )
            }
          </div>
        )
      })
    })

    useRender(() => {
      return (
        <div
          class={[
            'v-slider-track',
            { 'v-slider-track--reverse': isReversed.value },
            roundedClasses.value,
            props.class,
          ]}
          style={[
            {
              '--v-slider-track-size': convertToUnit(trackSize.value),
              '--v-slider-tick-size': convertToUnit(tickSize.value),
              '--v-slider-value-start': convertToUnit(visualStart.value, '%'),
              '--v-slider-value-stop': convertToUnit(visualStop.value, '%'),
            },
            roundedStyles.value,
            props.style,
          ]}
        >
          { isPill.value ? (
            <>
              { visualStart.value > 0 && (
                <div
                  class={[
                    'v-slider-track__background',
                    'v-slider-track__inactive--before',
                    trackColorClasses.value,
                    {
                      'v-slider-track__background--opacity': !!color.value || !trackFillColor.value,
                    },
                  ]}
                  style={[trackColorStyles.value]}
                />
              )}
              { visualStop.value < 100 && (
                <div
                  class={[
                    'v-slider-track__background',
                    'v-slider-track__inactive--after',
                    trackColorClasses.value,
                    {
                      'v-slider-track__background--opacity': !!color.value || !trackFillColor.value,
                    },
                  ]}
                  style={[trackColorStyles.value]}
                />
              )}
            </>
          ) : (
            <div
              key="default"
              class={[
                'v-slider-track__background',
                trackColorClasses.value,
                {
                  'v-slider-track__background--opacity': !!color.value || !trackFillColor.value,
                },
              ]}
              style={[trackColorStyles.value]}
            />
          )}
          <div
            class={[
              'v-slider-track__fill',
              trackFillColorClasses.value,
            ]}
            style={[trackFillColorStyles.value]}
          />

          { showTicks.value && (
            <div
              class={[
                'v-slider-track__ticks',
                {
                  'v-slider-track__ticks--always-show': showTicks.value === 'always',
                },
                tickColorClasses.value,
              ]}
              style={ tickColorStyles.value }
            >
              { computedTicks.value }
            </div>
          )}
        </div>
      )
    })

    return {}
  },
})

export type VSliderTrack = InstanceType<typeof VSliderTrack>
