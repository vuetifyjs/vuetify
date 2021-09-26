// Styles
import './VSliderTrack.sass'

// Components
import { VSliderSymbol } from './slider'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { useRounded } from '@/composables/rounded'

// Utilities
import { computed, inject } from 'vue'
import { convertToUnit, defineComponent } from '@/util'

export const VSliderTrack = defineComponent({
  name: 'VSliderTrack',

  props: {
    start: {
      type: Number,
      required: true,
    },
    stop: {
      type: Number,
      required: true,
    },
  },

  emits: {},

  setup (props, { slots }) {
    const slider = inject(VSliderSymbol)

    if (!slider) throw new Error('[Vuetify] v-slider-track must be inside v-slider or v-range-slider')

    const {
      transition,
      trackColor,
      trackFillColor,
      vertical,
      tickSize,
      showTicks,
      trackSize,
      color,
      rounded,
      parsedTicks,
      horizontalDirection,
    } = slider

    const { roundedClasses } = useRounded(rounded, 'v-slider-track')

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
        transition: transition.value,
        [startDir.value]: '0%',
        [endDir.value]: '100%',
      }
    })

    const trackFillWidth = computed(() => props.stop - props.start)

    const trackFillStyles = computed(() => {
      return {
        transition: transition.value,
        [startDir.value]: convertToUnit(props.start, '%'),
        [endDir.value]: convertToUnit(trackFillWidth.value, '%'),
      }
    })

    const computedTicks = computed(() => {
      const ticks = vertical.value ? parsedTicks.value.slice().reverse() : parsedTicks.value

      return ticks.map((tick, index) => {
        const directionProperty = vertical.value ? 'inset-block-end' : 'margin-inline-start'
        return (
          <div
            key={ tick.value }
            class={[
              'v-slider-track__tick',
              {
                'v-slider-track__tick--filled': tick.position >= props.start && tick.position <= props.stop,
              },
            ]}
            style={{
              [directionProperty]: (tick.position > 0 && tick.position < 100) && convertToUnit(tick.position, '%'),
            }}
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

    return () => {
      return (
        <div
          class={[
            'v-slider-track',
            roundedClasses.value,
          ]}
          style={{
            '--v-slider-track-size': convertToUnit(trackSize.value),
            '--v-slider-tick-size': convertToUnit(tickSize.value),
            direction: !vertical.value ? horizontalDirection.value : undefined,
          }}
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
          ) }
        </div>
      )
    }
  },
})

/* eslint-disable-next-line @typescript-eslint/no-redeclare */
export type VSliderTrack = InstanceType<typeof VSliderTrack>
