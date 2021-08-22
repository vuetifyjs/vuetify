import './VSliderTrack.sass'
import { useBackgroundColor } from '@/composables/color'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { useRtl } from '@/composables/rtl'
import { convertToUnit, createRange, defineComponent } from '@/util'
import { computed } from 'vue'

export default defineComponent({
  name: 'VSliderTrack',

  props: {
    trackColor: String,
    trackFillColor: String,
    disabled: Boolean,
    direction: String,
    showTicks: Boolean,
    tickSize: Number,
    stepSize: Number,
    min: Number,
    max: Number,
    start: Number,
    stop: Number,
    trackTransition: String,
    ticks: [Boolean, String],
    thumbSize: Number,

    ...makeRoundedProps(),
  },

  emits: {},

  setup (props, { slots }) {
    const { isRtl } = useRtl()

    const trackColor = computed(() => {
      return props.disabled ? undefined : props.trackColor
    })

    const trackFillColor = computed(() => {
      return props.disabled ? undefined : props.trackFillColor
    })

    const { roundedClasses } = useRounded(props, 'v-slider-track')

    const {
      backgroundColorClasses: trackFillColorClasses,
      backgroundColorStyles: trackFillColorStyles,
    } = useBackgroundColor(trackFillColor)

    const {
      backgroundColorClasses: trackColorClasses,
      backgroundColorStyles: trackColorStyles,
    } = useBackgroundColor(trackColor)

    const backgroundBeforeStyles = computed(() => {
      const vertical = props.direction === 'vertical'
      // const startDir = vertical ? isRtl.value ? 'bottom' : 'top' : isRtl.value ? 'left' : 'right'
      const endDir = vertical ? 'height' : 'width'

      // const start = '0px'
      // const end = props.disabled ? `calc(${100 - trackFillWidth.value}% - 10px)` : `calc(${100 - trackFillWidth.value}%)`
      const offset = props.disabled ? -10 : 10

      return {
        transition: props.trackTransition,
        // [startDir]: start,
        [`inset-${vertical ? 'block-end' : 'inline-start'}`]: convertToUnit(0, '%'),
        [endDir]: `calc(${convertToUnit(props.start, '%')} + ${convertToUnit(offset)})`,
        // width: '100%',
      }
    })

    const disabledOffset = computed(() => convertToUnit(props.disabled ? props.thumbSize / 2 : 0))

    const backgroundAfterStyles = computed(() => {
      const vertical = props.direction === 'vertical'
      // const startDir = vertical ? isRtl.value ? 'bottom' : 'top' : isRtl.value ? 'left' : 'right'
      const endDir = vertical ? 'height' : 'width'

      // const start = '0px'
      // const end = props.disabled ? `calc(${100 - trackFillWidth.value}% - 10px)` : `calc(${100 - trackFillWidth.value}%)`

      return {
        transition: props.trackTransition,
        // [startDir]: start,
        [`inset-${vertical ? 'block-end' : 'inline-start'}`]: `calc(${convertToUnit(props.stop, '%')} + ${disabledOffset.value})`,
        // [endDir]: end,
        [endDir]: `calc(${convertToUnit(100 - props.stop, '%')} - ${disabledOffset.value})`,
      }
    })

    const trackFillWidth = computed(() => props.stop - props.start)

    const trackFillStyles = computed(() => {
      const vertical = props.direction === 'vertical'
      // const startDir = vertical ? 'bottom' : 'left'
      // const endDir = vertical ? 'top' : 'right'
      const valueDir = vertical ? 'height' : 'width'

      // const start = isRtl.value ? 'auto' : '0'
      // const end = isRtl.value ? '0' : 'auto'

      return {
        transition: props.trackTransition,
        // [startDir]: start,
        // [endDir]: end,
        [`inset-${vertical ? 'block-end' : 'inline-start'}`]: `calc(${convertToUnit(props.start, '%')} + ${props.start > props.min ? disabledOffset.value : '0px'})`,
        [valueDir]: `calc(${trackFillWidth.value}% - ${disabledOffset.value})`,
      }
    })

    const ticks = computed(() => {
      const numTicks = Math.ceil((props.max - props.min) / props.stepSize)
      const vertical = props.direction === 'vertical'

      return createRange(numTicks + 1).map(index => {
        const tickSize = parseFloat(props.tickSize)
        const width = (vertical ? numTicks - index : index) * (100 / numTicks)
        // const value = model.value / numTicks
        const filled = width < trackFillWidth.value
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
              width: convertToUnit(tickSize),
              height: convertToUnit(tickSize),
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
          <div
            class={[
              'v-slider-track__background',
              trackColorClasses.value,
            ]}
            style={{
              ...backgroundBeforeStyles.value,
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
          <div
            class={[
              'v-slider-track__background',
              trackColorClasses.value,
            ]}
            style={{
              ...backgroundAfterStyles.value,
              ...trackColorStyles.value,
            }}
          />

          { props.ticks !== false && (
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
