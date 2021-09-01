// Styles
import './VSliderTrack.sass'

// Components
import { VSliderSymbol } from './slider'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { useRtl } from '@/composables/rtl'

// Utilities
import { computed, inject } from 'vue'
import { convertToUnit, createRange, defineComponent } from '@/util'

export const VSliderTrack = defineComponent({
  name: 'VSliderTrack',

  props: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    start: {
      type: Number,
      required: true,
    },
    stop: {
      type: Number,
      required: true,
    },

    ...makeRoundedProps(),
  },

  emits: {},

  setup (props, { slots }) {
    const { isRtl } = useRtl()
    const slider = inject(VSliderSymbol)

    if (!slider) throw new Error('[Vuetify] v-slider-track must be inside v-slider or v-range-slider')

    const {
      transition,
      trackColor,
      trackFillColor,
      vertical,
      stepSize,
      tickSize,
      showTicks,
      trackSize,
      color,
      ticks,
    } = slider

    const { roundedClasses } = useRounded(props, 'v-slider-track')

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
      const numTicks = Math.ceil((props.max - props.min) / stepSize.value)

      return createRange(numTicks + 1).map(index => {
        const width = (vertical.value ? numTicks - index : index) * (100 / numTicks)
        const filled = width >= props.start && width <= props.stop
        const offset = (index - (numTicks / 2)) * (isRtl.value ? -10 : 10)

        return (
          <div
            key={index}
            class={[
              'v-slider-track__tick',
              {
                'v-slider-track__tick--filled': filled,
              },
            ]}
            style={{
              width: convertToUnit(tickSize.value),
              height: convertToUnit(tickSize.value),
              transform: `translate${vertical.value ? 'Y' : 'X'}(${index > 0 && index < numTicks ? offset : offset * -1}%)`,
            }}
          ></div>
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
          }}
        >
          <div
            class={[
              'v-slider-track__background',
              trackColorClasses.value,
              {
                'v-slider-track__background--opacity': !!color.value,
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
                  'v-slider-track__ticks--always-show': ticks.value === 'always',
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
