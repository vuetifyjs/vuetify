// Styles
import './VSliderTrack.sass'

// Components
import { VSliderSymbol } from './slider'

// Composables
import { useBackgroundColor } from '@/composables/color'
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
}, 'v-slider-track')

export const VSliderTrack = genericComponent<VSliderTrackSlots>()({
  name: 'VSliderTrack',

  props: makeVSliderTrackProps(),

  emits: {},

  setup (props, { slots }) {
    const slider = inject(VSliderSymbol)

    if (!slider) throw new Error('[Vuetify] v-slider-track must be inside v-slider or v-range-slider')

    const {
      color,
      horizontalDirection,
      parsedTicks,
      rounded,
      showTicks,
      tickSize,
      trackColor,
      trackFillColor,
      trackSize,
      vertical,
      min,
      max,
    } = slider

    const { roundedClasses } = useRounded(rounded)

    const {
      backgroundColorClasses: trackFillColorClasses,
      backgroundColorStyles: trackFillColorStyles,
    } = useBackgroundColor(trackFillColor)

    const {
      backgroundColorClasses: trackColorClasses,
      backgroundColorStyles: trackColorStyles,
    } = useBackgroundColor(trackColor)

    const startDir = computed(() => `inset-${vertical.value ? 'block-end' : 'inline-start'}`)
    const endDir = computed(() => vertical.value ? 'height' : 'width')

    const backgroundStyles = computed(() => {
      return {
        [startDir.value]: '0%',
        [endDir.value]: '100%',
      }
    })

    const trackFillWidth = computed(() => props.stop - props.start)

    const trackFillStyles = computed(() => {
      return {
        [startDir.value]: convertToUnit(props.start, '%'),
        [endDir.value]: convertToUnit(trackFillWidth.value, '%'),
      }
    })

    const computedTicks = computed(() => {
      if (!showTicks.value) return []

      const ticks = vertical.value ? parsedTicks.value.slice().reverse() : parsedTicks.value

      return ticks.map((tick, index) => {
        const directionProperty = vertical.value ? 'bottom' : 'margin-inline-start'
        const directionValue = tick.value !== min.value && tick.value !== max.value ? convertToUnit(tick.position, '%') : undefined

        return (
          <div
            key={ tick.value }
            class={[
              'v-slider-track__tick',
              {
                'v-slider-track__tick--filled': tick.position >= props.start && tick.position <= props.stop,
                'v-slider-track__tick--first': tick.value === min.value,
                'v-slider-track__tick--last': tick.value === max.value,
              },
            ]}
            style={{ [directionProperty]: directionValue }}
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
            roundedClasses.value,
            props.class,
          ]}
          style={[
            {
              '--v-slider-track-size': convertToUnit(trackSize.value),
              '--v-slider-tick-size': convertToUnit(tickSize.value),
              direction: !vertical.value ? horizontalDirection.value : undefined,
            },
            props.style,
          ]}
        >
          <div
            class={[
              'v-slider-track__background',
              trackColorClasses.value,
              {
                'v-slider-track__background--opacity': !!color.value || !trackFillColor.value,
              },
            ]}
            style={{
              ...backgroundStyles.value,
              ...trackColorStyles.value,
            }}
          />
          <div
            class={[
              'v-slider-track__fill',
              trackFillColorClasses.value,
            ]}
            style={{
              ...trackFillStyles.value,
              ...trackFillColorStyles.value,
            }}
          />

          { showTicks.value && (
            <div
              class={[
                'v-slider-track__ticks',
                {
                  'v-slider-track__ticks--always-show': showTicks.value === 'always',
                },
              ]}
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
