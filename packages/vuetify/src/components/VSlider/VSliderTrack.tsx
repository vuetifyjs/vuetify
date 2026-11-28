// Styles
import './VSliderTrack.sass'

// Components
import { VSliderSymbol } from './slider'

// Composables
import { useBackgroundColor, useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { useElementSize } from '@/composables/resizeObserver'
import { useRounded } from '@/composables/rounded'

// Utilities
import { computed, inject, ref, toRef } from 'vue'
import { convertToUnit, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { SliderThumbState } from './slider'
import type { VSliderTrackSlots } from './VSliderTrack.types'

export type { VSliderTrackSlots }

export const makeVSliderTrackProps = propsFactory({
  start: {
    type: Number,
    required: true,
  },
  stop: {
    type: Number,
    required: true,
  },
  startThumb: String as PropType<SliderThumbState>,
  stopThumb: String as PropType<SliderThumbState>,

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
      variant,
      vertical,
      min,
      max,
    } = slider

    const isPill = toRef(() => variant.value === 'pill')
    const visualStart = toRef(() => isReversed.value ? 100 - props.stop : props.start)
    const visualStop = toRef(() => isReversed.value ? 100 - props.start : props.stop)
    const visualStartThumb = toRef(() => isReversed.value ? props.stopThumb : props.startThumb)
    const visualStopThumb = toRef(() => isReversed.value ? props.startThumb : props.stopThumb)

    function getEdgeGap (thumb: SliderThumbState | undefined, position: number) {
      if (thumb) return thumb === 'active' ? 'var(--v-slider-pill-active-clearance)' : 'var(--v-slider-pill-idle-clearance)'
      return position > 0 && position < 100 ? 'var(--v-slider-pill-center-clearance)' : '0px'
    }

    const rootEl = ref<HTMLElement>()
    const size = useElementSize(toRef(() => isPill.value ? rootEl.value : undefined))
    const length = toRef(() => (vertical.value ? size.height : size.width).value)

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

    function genBackground (side?: 'before' | 'after') {
      return (
        <div
          class={[
            'v-slider-track__background',
            side && `v-slider-track__background--${side}`,
            trackColorClasses.value,
            {
              'v-slider-track__background--opacity': !!color.value || !trackFillColor.value,
            },
          ]}
          style={ trackColorStyles.value }
        />
      )
    }

    useRender(() => {
      const fill = (
        <div
          class={[
            'v-slider-track__fill',
            {
              'v-slider-track__fill--start': isPill.value && !visualStartThumb.value && visualStart.value === 0,
              'v-slider-track__fill--end': isPill.value && !visualStopThumb.value && visualStop.value === 100,
            },
            trackFillColorClasses.value,
          ]}
          style={ trackFillColorStyles.value }
        />
      )

      return (
        <div
          ref={ rootEl }
          class={[
            'v-slider-track',
            roundedClasses.value,
            props.class,
          ]}
          style={[
            {
              '--v-slider-tick-size': convertToUnit(tickSize.value),
              '--v-slider-value-start': convertToUnit(visualStart.value, '%'),
              '--v-slider-value-stop': convertToUnit(visualStop.value, '%'),
            },
            isPill.value && {
              '--v-slider-track-length': convertToUnit(length.value),
              '--v-slider-value-start-offset': convertToUnit(visualStart.value / 100 * length.value),
              '--v-slider-value-stop-offset': convertToUnit(visualStop.value / 100 * length.value),
              '--v-slider-pill-start-gap': getEdgeGap(visualStartThumb.value, visualStart.value),
              '--v-slider-pill-stop-gap': getEdgeGap(visualStopThumb.value, visualStop.value),
            },
            roundedStyles.value,
            props.style,
          ]}
        >
          { isPill.value ? (
            <>
              { visualStart.value > 0 && genBackground('before') }
              { visualStop.value < 100 && genBackground('after') }
            </>
          ) : genBackground()}
          { fill }

          { isPill.value && visualStart.value > 0 && (
            <div
              key="stop-start"
              class={['v-slider-track__stop', 'v-slider-track__stop--start', tickColorClasses.value]}
              style={ tickColorStyles.value }
            />
          )}
          { isPill.value && visualStop.value < 100 && (
            <div
              key="stop-end"
              class={['v-slider-track__stop', 'v-slider-track__stop--end', tickColorClasses.value]}
              style={ tickColorStyles.value }
            />
          )}

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
