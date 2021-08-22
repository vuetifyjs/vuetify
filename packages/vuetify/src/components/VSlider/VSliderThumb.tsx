import './VSliderThumb.sass'
import { useBackgroundColor, useTextColor } from '@/composables/color'
import { useRtl } from '@/composables/rtl'
import { convertToUnit, defineComponent, keyCodes } from '@/util'
import { computed } from 'vue'
import { VScaleTransition } from '../transitions'

export default defineComponent({
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
    disabled: Boolean,
    direction: String,
    size: Number,
    color: String,
    position: {
      type: Number,
      required: true,
    },
    transition: String,
    stepSize: Number,
    showLabel: Boolean,
  },

  emits: {
    'update:thumbPressed': (v: boolean) => true,
    'update:keyPressed': (v: boolean) => true,
    'update:modelValue': (v: number) => true,
  },

  setup (props, { slots, attrs, emit }) {
    const { isRtl } = useRtl()
    const { textColorClasses, textColorStyles } = useTextColor(props, 'color')
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'color')
    let keyPresses = 0

    function parseKeydown (e: KeyboardEvent, value: number) {
      // e.preventDefault()
      // if (!this.isInteractive) return

      const { pageup, pagedown, end, home, left, right, down, up } = keyCodes

      if (![pageup, pagedown, end, home, left, right, down, up].includes(e.keyCode)) return

      const step = props.stepSize || 1
      const steps = (props.max - props.min) / step
      if ([left, right, down, up].includes(e.keyCode)) {
        const increase = isRtl.value ? [left, up] : [right, up]
        const direction = increase.includes(e.keyCode) ? 1 : -1
        const multiplier = e.shiftKey ? 3 : (e.ctrlKey ? 2 : 1)

        value = value + (direction * step * multiplier)
      } else if (e.keyCode === home) {
        value = props.min
      } else if (e.keyCode === end) {
        value = props.max
      } else {
        const direction = e.keyCode === pagedown ? 1 : -1
        value = value - (direction * step * (steps > 100 ? steps / 10 : 10))
      }

      return Math.max(props.min, Math.min(props.max, value))
    }

    function onKeydown (e: KeyboardEvent) {
      keyPresses += 1

      keyPresses > 1 && emit('update:keyPressed', true)

      const newValue = parseKeydown(e, props.modelValue)

      console.log(newValue)
      newValue != null && emit('update:modelValue', newValue)
    }

    function onKeyup (e: KeyboardEvent) {
      keyPresses = 0
      emit('update:keyPressed', false)
    }

    return () => {
      const vertical = props.direction === 'vertical'
      const positionPercentage = convertToUnit(props.direction === 'vertical' ? 100 - props.position : props.position, '%')
      const inset = vertical ? 'block' : 'inline'
      const showLabel = !props.disabled && !!(props.showLabel || slots['thumb-label'])
      const size = convertToUnit(props.size)
      const transform = vertical
        ? `translateY(20%) translateY(${(Number(props.size) / 3) - 1}px) translateX(55%) rotate(135deg)`
        : `translateY(-20%) translateY(-6px) translateX(0%) rotate(45deg)`

      return (
        <div
          class={[
            'v-slider-thumb',
            {
              'v-slider-thumb--active': props.active,
              'v-slider-thumb--focused': props.focused,
              'v-slider-thumb--dirty': props.dirty,
              'v-slider-thumb--show-label': showLabel,
              // 'v-slider-thumb--pressed': props.pressed,
            },
          ]}
          style={{
            transition: props.transition,
            [`inset-${inset}-start`]: `calc(${positionPercentage} - var(--v-slider-thumb-size) / 2)`,
            '--v-slider-thumb-size': convertToUnit(props.disabled ? props.size / 2 : props.size),
          }}
          role="slider"
          tabindex={props.disabled ? -1 : 0}
          aria-label={props.label}
          aria-valuemin={props.min}
          aria-valuemax={props.max}
          aria-valuenow={props.modelValue}
          // aria-readonly={props.readonly}
          aria-orientation={props.direction}
          // onFocus={slotProps.onFocus}
          // onBlur={slotProps.onBlur}
          onKeydown={onKeydown}
          onKeyup={onKeyup}
        >
          <div
            onMousedown={() => emit('update:thumbPressed', true)}
            onMouseup={() => emit('update:thumbPressed', false)}
            class={[
              'v-slider-thumb__surface',
              textColorClasses.value,
            ]}
            style={textColorStyles.value}
          />
          {showLabel && (
            <VScaleTransition origin="bottom center">
              <div
                class="v-slider-thumb__label-container"
                v-show={props.focused || props.active || props.showLabel}
              >
                <div
                  class={[
                    'v-slider-thumb__label',
                    backgroundColorClasses.value,
                  ]}
                  style={{
                    height: size,
                    width: size,
                    transform,
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
