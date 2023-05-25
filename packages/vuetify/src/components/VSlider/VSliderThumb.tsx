// Styles
import './VSliderThumb.sass'

// Components
import { VSliderSymbol } from './slider'
import { VScaleTransition } from '../transitions'

// Composables
import { useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { useElevation } from '@/composables/elevation'

// Directives
import Ripple from '@/directives/ripple'

// Utilities
import { computed, inject } from 'vue'
import { convertToUnit, genericComponent, keyValues, propsFactory, useRender } from '@/util'

export type VSliderThumbSlots = {
  'thumb-label': { modelValue: number }
}

export const makeVSliderThumbProps = propsFactory({
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
  ripple: {
    type: Boolean,
    default: true,
  },

  ...makeComponentProps(),
}, 'v-slider-thumb')

export const VSliderThumb = genericComponent<VSliderThumbSlots>()({
  name: 'VSliderThumb',

  directives: { Ripple },

  props: makeVSliderThumbProps(),

  emits: {
    'update:modelValue': (v: number) => true,
  },

  setup (props, { slots, emit }) {
    const slider = inject(VSliderSymbol)

    if (!slider) throw new Error('[Vuetify] v-slider-thumb must be used inside v-slider or v-range-slider')

    const {
      thumbColor,
      step,
      vertical,
      disabled,
      thumbSize,
      thumbLabel,
      direction,
      readonly,
      elevation,
      isReversed,
      horizontalDirection,
      mousePressed,
      decimals,
    } = slider

    const { textColorClasses, textColorStyles } = useTextColor(thumbColor)

    const { pageup, pagedown, end, home, left, right, down, up } = keyValues
    const relevantKeys = [pageup, pagedown, end, home, left, right, down, up]

    const multipliers = computed(() => {
      if (step.value) return [1, 2, 3]
      else return [1, 5, 10]
    })

    function parseKeydown (e: KeyboardEvent, value: number) {
      if (!relevantKeys.includes(e.key)) return

      e.preventDefault()

      const _step = step.value || 0.1
      const steps = (props.max - props.min) / _step
      if ([left, right, down, up].includes(e.key)) {
        const increase = horizontalDirection.value === 'rtl' ? [left, up] : [right, up]
        const direction = increase.includes(e.key) ? 1 : -1
        const multiplier = e.shiftKey ? 2 : (e.ctrlKey ? 1 : 0)

        value = value + (direction * _step * multipliers.value[multiplier])
      } else if (e.key === home) {
        value = props.min
      } else if (e.key === end) {
        value = props.max
      } else {
        const direction = e.key === pagedown ? 1 : -1
        value = value - (direction * _step * (steps > 100 ? steps / 10 : 10))
      }

      return Math.max(props.min, Math.min(props.max, value))
    }

    function onKeydown (e: KeyboardEvent) {
      const newValue = parseKeydown(e, props.modelValue)

      newValue != null && emit('update:modelValue', newValue)
    }

    useRender(() => {
      const positionPercentage = convertToUnit((vertical.value || isReversed.value) ? 100 - props.position : props.position, '%')
      const { elevationClasses } = useElevation(computed(() => !disabled.value ? elevation.value : undefined))

      return (
        <div
          class={[
            'v-slider-thumb',
            {
              'v-slider-thumb--focused': props.focused,
              'v-slider-thumb--pressed': props.focused && mousePressed.value,
            },
            props.class,
          ]}
          style={[
            {
              '--v-slider-thumb-position': positionPercentage,
              '--v-slider-thumb-size': convertToUnit(thumbSize.value),
            },
            props.style,
          ]}
          role="slider"
          tabindex={ disabled.value ? -1 : 0 }
          aria-valuemin={ props.min }
          aria-valuemax={ props.max }
          aria-valuenow={ props.modelValue }
          aria-readonly={ !!readonly.value }
          aria-orientation={ direction.value }
          onKeydown={ !readonly.value ? onKeydown : undefined }
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
            v-ripple={[props.ripple, null, ['circle', 'center']]}
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
                  { slots['thumb-label']?.({ modelValue: props.modelValue }) ?? props.modelValue.toFixed(step.value ? decimals.value : 1) }
                </div>
              </div>
            </div>
          </VScaleTransition>
        </div>
      )
    })

    return {}
  },
})

export type VSliderThumb = InstanceType<typeof VSliderThumb>
