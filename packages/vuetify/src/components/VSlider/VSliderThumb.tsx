// Styles
import './VSliderThumb.sass'

// Components
import { VScaleTransition } from '../transitions'
import { VSliderSymbol } from './slider'
import { useElevation } from '@/composables/elevation'

// Directives
import Ripple from '@/directives/ripple'

// Composables
import { useTextColor } from '@/composables/color'

// Utilities
import { computed, inject } from 'vue'
import { convertToUnit, defineComponent, keyValues } from '@/util'

export const VSliderThumb = defineComponent({
  name: 'VSliderThumb',

  directives: { Ripple },

  props: {
    active: Boolean,
    dirty: Boolean,
    focused: Boolean,
    max: {
      type: Number,
      required: true,
    },
    min: {
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
  },

  emits: {
    'update:modelValue': (v: number) => true,
  },

  setup (props, { slots, emit }) {
    const slider = inject(VSliderSymbol)

    if (!slider) throw new Error('[Vuetify] v-slider-thumb must be used inside v-slider or v-range-slider')

    const {
      thumbColor,
      stepSize,
      vertical,
      disabled,
      thumbSize,
      thumbLabel,
      transition,
      direction,
      label,
      readonly,
      elevation,
      isReversed,
      horizontalDirection,
    } = slider

    const { textColorClasses, textColorStyles } = useTextColor(thumbColor)

    const { pageup, pagedown, end, home, left, right, down, up } = keyValues
    const relevantKeys = [pageup, pagedown, end, home, left, right, down, up]

    const multipliers = computed(() => {
      if (stepSize.value) return [1, 2, 3]
      else return [1, 5, 10]
    })

    function parseKeydown (e: KeyboardEvent, value: number) {
      if (!relevantKeys.includes(e.key)) return

      e.preventDefault()

      const step = stepSize.value || 0.1
      const steps = (props.max - props.min) / step
      if ([left, right, down, up].includes(e.key)) {
        const increase = isReversed.value ? [left, up] : [right, up]
        const direction = increase.includes(e.key) ? 1 : -1
        const multiplier = e.shiftKey ? 2 : (e.ctrlKey ? 1 : 0)

        value = value + (direction * step * multipliers.value[multiplier])
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
      const { elevationClasses } = useElevation(computed(() => !disabled.value ? elevation.value : undefined))

      return (
        <div
          class={[
            'v-slider-thumb',
            {
              'v-slider-thumb--active': props.active,
              'v-slider-thumb--focused': props.focused,
              'v-slider-thumb--dirty': props.dirty,
              // 'v-slider-thumb--show-label': !disabled.value && !!(showLabel.value || slots['thumb-label']),
            },
          ]}
          style={{
            transition: transition.value,
            [`inset-${inset}-start`]: `calc(${positionPercentage} - var(--v-slider-thumb-size) / 2)`,
            '--v-slider-thumb-size': convertToUnit(thumbSize.value),
            direction: !vertical.value ? horizontalDirection.value : undefined,
          }}
          role="slider"
          tabindex={ disabled.value ? -1 : 0 }
          aria-label={ label.value }
          aria-valuemin={ props.min }
          aria-valuemax={ props.max }
          aria-valuenow={ props.modelValue }
          aria-readonly={ readonly.value }
          aria-orientation={ direction.value }
          onKeydown={ onKeydown }
        >
          <div
            class={[
              'v-slider-thumb__surface',
              textColorClasses.value,
              elevationClasses.value,
            ]}
            style={{
              ...textColorStyles.value,
            }}
          />
          <div
            class={[
              'v-slider-thumb__ripple',
              textColorClasses.value,
            ]}
            style={ textColorStyles.value }
            v-ripple={[true, null, ['circle', 'center']]}
          />
          <VScaleTransition origin="bottom center">
            <div
              class="v-slider-thumb__label-container"
              v-show={ (thumbLabel.value && props.focused) || thumbLabel.value === 'always' }
            >
              <div
                class={[
                  'v-slider-thumb__label',
                ]}
              >
                <div>
                  { slots['thumb-label']?.({ modelValue: props.modelValue }) ?? props.modelValue.toFixed(1) }
                </div>
              </div>
            </div>
          </VScaleTransition>
        </div>
      )
    }
  },
})

/* eslint-disable-next-line @typescript-eslint/no-redeclare */
export type VSliderThumb = InstanceType<typeof VSliderThumb>
