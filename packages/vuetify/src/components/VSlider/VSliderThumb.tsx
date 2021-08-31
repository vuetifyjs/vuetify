import './VSliderThumb.sass'
import { useBackgroundColor, useTextColor } from '@/composables/color'
import { useRtl } from '@/composables/rtl'
import { convertToUnit, defineComponent, keyValues } from '@/util'
import { inject } from 'vue'
import { VScaleTransition } from '../transitions'
import { VSliderSymbol } from './VSlider'
import { makeElevationProps, useElevation } from '@/composables/elevation'

export const VSliderThumb = defineComponent({
  name: 'VSliderThumb',

  props: {
    active: Boolean,
    focused: Boolean,
    dirty: Boolean,
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    modelValue: {
      type: Number,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    ...makeElevationProps(),
  },

  emits: {
    'update:modelValue': (v: number) => true,
  },

  setup (props, { slots, attrs, emit }) {
    const { isRtl } = useRtl()
    const slider = inject(VSliderSymbol)

    if (!slider) throw new Error('[Vuetify] v-slider-thumb must be used inside v-slider or v-range-slider')

    const {
      thumbColor,
      stepSize,
      vertical,
      disabled,
      thumbSize,
      showLabel,
      transition,
      direction,
      label,
      readonly,
    } = slider

    const { textColorClasses, textColorStyles } = useTextColor(thumbColor)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(thumbColor)

    const { pageup, pagedown, end, home, left, right, down, up } = keyValues
    const relevantKeys = [pageup, pagedown, end, home, left, right, down, up]

    function parseKeydown (e: KeyboardEvent, value: number) {
      if (!relevantKeys.includes(e.key)) return

      e.preventDefault()

      const step = stepSize.value || 1
      const steps = (props.max - props.min) / step
      if ([left, right, down, up].includes(e.key)) {
        const increase = isRtl.value ? [left, up] : [right, up]
        const direction = increase.includes(e.key) ? 1 : -1
        const multiplier = e.shiftKey ? 3 : (e.ctrlKey ? 2 : 1)

        value = value + (direction * step * multiplier)
      } else if (e.key === home) {
        value = props.min
      } else if (e.key === end) {
        value = props.max
      } else {
        const direction = e.key === pagedown ? 1 : -1
        value = value - (direction * step * (steps > 100 ? steps / 10 : 10))
      }

      return Math.max(props.min, Math.min(props.max, value))
    }

    function onKeydown (e: KeyboardEvent) {
      const newValue = parseKeydown(e, props.modelValue)

      newValue != null && emit('update:modelValue', newValue)
    }

    return () => {
      const positionPercentage = convertToUnit(vertical.value ? 100 - props.position : props.position, '%')
      const inset = vertical.value ? 'block' : 'inline'
      const size = convertToUnit(thumbSize.value)
      const { elevationClasses } = useElevation(props)

      return (
        <div
          class={[
            'v-slider-thumb',
            {
              'v-slider-thumb--active': props.active,
              'v-slider-thumb--focused': props.focused,
              'v-slider-thumb--dirty': props.dirty,
              'v-slider-thumb--show-label': !disabled.value && !!(showLabel.value || slots['thumb-label']),
              // 'v-slider-thumb--pressed': props.pressed,
            },
          ]}
          style={{
            transition: transition.value,
            [`inset-${inset}-start`]: `calc(${positionPercentage} - var(--v-slider-thumb-size) / 2)`,
            '--v-slider-thumb-size': convertToUnit(thumbSize.value),
          }}
          role="slider"
          tabindex={disabled.value ? -1 : 0}
          aria-label={label.value}
          aria-valuemin={props.min}
          aria-valuemax={props.max}
          aria-valuenow={props.modelValue}
          aria-readonly={readonly.value}
          aria-orientation={direction.value}
          onKeydown={onKeydown}
        >
          <div
            class={[
              'v-slider-thumb__surface',
              textColorClasses.value,
              elevationClasses.value,
            ]}
            style={textColorStyles.value}
          />
          {showLabel.value && (
            <VScaleTransition origin="bottom center">
              <div
                class="v-slider-thumb__label-container"
                v-show={props.focused || props.active || showLabel.value}
              >
                <div
                  class={[
                    'v-slider-thumb__label',
                    backgroundColorClasses.value,
                  ]}
                  style={{
                    height: size,
                    width: size,
                    ...backgroundColorStyles.value,
                  }}
                >
                  <div>
                    {slots['thumb-label']?.({ value: props.modelValue }) ?? props.modelValue}
                  </div>
                </div>
              </div>
            </VScaleTransition>
          )}
        </div>
      )
    }
  },
})

/* eslint-disable-next-line @typescript-eslint/no-redeclare */
export type VSliderThumb = InstanceType<typeof VSliderThumb>
