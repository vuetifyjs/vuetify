// Styles
import './VSlider.sass'

// Components
import { VInput } from '../VInput'
import { VSliderThumb } from './VSliderThumb'
import { VSliderTrack } from './VSliderTrack'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeSliderProps, useSlider } from './slider'

// Helpers
import { defineComponent } from '@/util'

// Types
import { computed, ref } from 'vue'

export const VSlider = defineComponent({
  name: 'VSlider',

  props: {
    modelValue: {
      type: [Number, String],
      default: 0,
    },

    ...makeSliderProps(),
  },

  emits: {
    'update:modelValue': (v: number) => true,
  },

  setup (props, { attrs, emit, slots }) {
    const thumbContainerRef = ref()

    const { min, max, roundValue, onSliderMousedown, onSliderTouchstart, trackContainerRef, position } = useSlider(props, newValue => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      model.value = roundValue(newValue)
    }, newValue => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      model.value = roundValue(newValue)
    }, () => thumbContainerRef.value?.$el)

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

    const isDirty = computed(() => model.value > min.value)
    const trackStop = computed(() => position(model.value))

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
                  start={0}
                  stop={trackStop.value}
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
