// Styles
import './VSlider.sass'

// Components
import { VInput } from '../VInput'
import { VSliderThumb } from './VSliderThumb'
import { VSliderTrack } from './VSliderTrack'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeRoundedProps } from '@/composables/rounded'
import { makeElevationProps } from '@/composables/elevation'
import { useSlider } from './slider'

// Helpers
import { defineComponent, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import { computed, ref } from 'vue'

export const makeVSliderProps = propsFactory({
  disabled: Boolean,
  readonly: Boolean,
  inverseLabel: Boolean,
  max: {
    type: [Number, String],
    default: 100,
  },
  min: {
    type: [Number, String],
    default: 0,
  },
  stepSize: {
    type: [Number, String],
    default: 0,
  },
  thumbColor: String,
  thumbLabel: {
    type: [Boolean, String] as PropType<boolean | 'always' | undefined>,
    default: undefined,
    // validator: v => typeof v === 'boolean' || v === 'always',
  },
  thumbSize: {
    type: [Number, String],
    default: 20,
  },
  tickLabels: {
    type: Array as PropType<string[]>,
    default: () => ([]),
  },
  ticks: {
    type: [Boolean, String] as PropType<boolean | 'always'>,
    default: false,
    // validator: v => typeof v === 'boolean' || v === 'always',
  },
  tickSize: {
    type: [Number, String],
    default: 2,
  },
  color: String,
  trackColor: String,
  trackFillColor: String,
  trackSize: {
    type: [Number, String],
    default: 4,
  },
  modelValue: {
    type: [Number, String],
    default: 0,
  },
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
    validator: (v: any) => ['vertical', 'horizontal'].includes(v),
  },
  reverse: Boolean,
  label: String,

  ...makeRoundedProps(),
  ...makeElevationProps(),
}, 'v-slider')

export const VSlider = defineComponent({
  name: 'VSlider',

  props: makeVSliderProps(),

  emits: {
    'update:modelValue': (v: number) => true,
  },

  setup (props, { attrs, emit, slots }) {
    const model = useProxiedModel(
      props,
      'modelValue',
      undefined,
      v => {
        const value = typeof v === 'string' ? parseFloat(v) : v == null ? min.value : v

        return roundValue(value)
      },
      v => roundValue(v)
    )

    const thumbContainerRef = ref()

    const { min, max, roundValue, onSliderMousedown, onSliderTouchstart, trackContainerRef } = useSlider(props, newValue => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      model.value = roundValue(newValue)
    }, newValue => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      model.value = roundValue(newValue)
    }, () => thumbContainerRef.value?.$el)

    const isDirty = computed(() => model.value > min.value)
    const trackStop = computed(() => (model.value - min.value) / (max.value - min.value) * 100)

    return () => {
      return (
        <VInput
          class={[
            'v-slider',
          ]}
          disabled={props.disabled}
          dirty={isDirty.value}
          direction={props.direction}
          v-slots={{
            ...slots,
            default: ({ id, isActive, isDirty, isFocused, focus, blur }: any) => (
              <div
                class="v-slider__container"
                onMousedown={onSliderMousedown}
                onTouchstartPassive={onSliderTouchstart}
              >
                <input
                  id={id}
                  name={attrs.name}
                  disabled={props.disabled}
                  readonly={props.readonly}
                  tabindex="-1"
                  value={model.value}
                />

                <VSliderTrack
                  ref={trackContainerRef}
                  min={min.value}
                  max={max.value}
                  start={0}
                  stop={trackStop.value}
                  rounded={props.rounded}
                />

                <VSliderThumb
                  ref={ thumbContainerRef }
                  active={isActive}
                  dirty={isDirty}
                  focused={isFocused}
                  min={min.value}
                  max={max.value}
                  modelValue={model.value}
                  onUpdate:modelValue={v => model.value = v}
                  position={trackStop.value}
                  elevation={props.elevation}
                  onFocus={focus}
                  onBlur={blur}
                  v-slots={{
                    label: slots['thumb-label'],
                  }}
                />
              </div>
            ),
          }}
        />
      )
    }
  },
})
