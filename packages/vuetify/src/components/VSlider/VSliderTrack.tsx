import './VSliderTrack.sass'
import { useBackgroundColor } from '@/composables/color'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { useRtl } from '@/composables/rtl'
import { convertToUnit, createRange, defineComponent } from '@/util'
import { computed, inject } from 'vue'
import { VSliderSymbol } from './VSlider'

export default defineComponent({
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
      thumbSize,
      disabled,
      vertical,
      stepSize,
      tickSize,
      showTicks,
      color,
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

    const endDir = computed(() => vertical.value ? 'height' : 'width')

    const disabledOffset = computed(() => disabled.value ? thumbSize.value / 2 : 0)

    const backgroundBeforeStyles = computed(() => {
      return {
        transition: transition.value,
        [`inset-${vertical.value ? 'block-end' : 'inline-start'}`]: convertToUnit(0, '%'),
        [endDir.value]: `calc(${convertToUnit(props.start, '%')} + ${convertToUnit(disabled.value ? -disabledOffset.value : disabled.value)})`,
      }
    })

    const backgroundAfterStyles = computed(() => {
      return {
        transition: transition.value,
        [`inset-${vertical.value ? 'block-end' : 'inline-start'}`]: `calc(${convertToUnit(props.stop, '%')} + ${convertToUnit(disabledOffset.value)})`,
        [endDir.value]: `calc(${convertToUnit(100 - props.stop, '%')} - ${convertToUnit(disabledOffset.value)})`,
      }
    })

    const trackFillWidth = computed(() => props.stop - props.start)

    const trackFillStyles = computed(() => {
      return {
        transition: transition.value,
        [`inset-${vertical.value ? 'block-end' : 'inline-start'}`]: `calc(${convertToUnit(props.start, '%')} + ${props.start > props.min ? convertToUnit(disabledOffset.value) : '0px'})`,
        [endDir.value]: `calc(${trackFillWidth.value}% - ${convertToUnit(props.start > props.min ? disabledOffset.value * 2 : disabledOffset.value)})`,
      }
    })

    const ticks = computed(() => {
      const numTicks = Math.ceil((props.max - props.min) / stepSize.value)

      return createRange(numTicks + 1).map(index => {
        const width = (vertical.value ? numTicks - index : index) * (100 / numTicks)
        const filled = width > props.start && width < props.stop
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
              transform: index > 0 && index < numTicks && `translate${vertical ? 'Y' : 'X'}(${offset}%)`,
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
        >
          { props.start > props.min && (
            <div
              class={[
                'v-slider-track__background',
                trackColorClasses.value,
                {
                  'v-slider-track__background--opacity': !!color.value,
                },
              ]}
              style={{
                ...backgroundBeforeStyles.value,
                ...trackColorStyles.value,
              }}
            />
          )}
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
          <div
            class={[
              'v-slider-track__background',
              trackColorClasses.value,
              {
                'v-slider-track__background--opacity': !!color.value,
              },
            ]}
            style={{
              ...backgroundAfterStyles.value,
              ...trackColorStyles.value,
            }}
          />

          { showTicks.value && (
            <div
              class={[
                'v-slider-track__ticks',
                {
                  'v-slider-track__ticks--always-show': props.ticks === 'always',
                },
              ]}
            >
              { ticks.value }
            </div>
          ) }
        </div>
      )
    }
  },
})
