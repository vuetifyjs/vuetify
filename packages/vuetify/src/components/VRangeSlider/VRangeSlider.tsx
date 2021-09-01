// Styles
import './VRangeSlider.sass'

// Components
import { VInput } from '../VInput'
import { makeVSliderProps } from '../VSlider/VSlider'
import { VSliderThumb } from '../VSlider/VSliderThumb'
import { VSliderTrack } from '../VSlider/VSliderTrack'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'
import { getOffset, useSlider } from '../VSlider/slider'

// Utilities
import { computed, defineComponent, ref } from 'vue'

// Types
import type { PropType } from 'vue'

export default defineComponent({
  name: 'VRangeSlider',

  props: {
    modelValue: {
      type: Array as PropType<number[]>,
      default: () => ([0, 0]),
    },

    ...makeVSliderProps(),
  },

  emits: {
    'update:modelValue': (value: [number, number]) => true,
  },

  setup (props, { slots, emit, attrs }) {
    const startThumbRef = ref<VSliderThumb>()
    const stopThumbRef = ref<VSliderThumb>()
    const focusedThumb = ref<VSliderThumb | null>()
    const inputRef = ref<VInput>()

    function getActiveThumb (e: MouseEvent | TouchEvent) {
      const thumbs = inputRef.value?.$el.querySelectorAll('.v-slider-thumb')

      const a = Math.abs(getOffset(e, thumbs[0], props.direction))
      const b = Math.abs(getOffset(e, thumbs[1], props.direction))

      return a < b ? startThumbRef.value?.$el : stopThumbRef.value?.$el
    }

    const { min, max, roundValue, onSliderMousedown, trackContainerRef, position } = useSlider(props, newValue => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      model.value = focusedThumb.value === startThumbRef.value ? [newValue, model.value[1]] : [model.value[0], newValue]
    }, newValue => {
      if (focusedThumb.value === startThumbRef.value) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        if (newValue <= model.value[1]) model.value = [newValue, model.value[1]]
      } else {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        if (newValue >= model.value[0]) model.value = [model.value[0], newValue]
      }
    }, getActiveThumb)

    const model = useProxiedModel(
      props,
      'modelValue',
      undefined,
      arr => {
        if (!arr || !arr.length) return [0, 0]

        return arr.map(value => roundValue(value))
      },
      v => v.map(roundValue)
    )

    const isDirty = computed(() => model.value.some(v => v > min.value))
    const trackStart = computed(() => position(model.value[0]))
    const trackStop = computed(() => position(model.value[1]))

    return () => {
      return (
        <VInput
          class={[
            'v-slider',
            'v-range-slider',
          ]}
          ref={inputRef}
          disabled={props.disabled}
          dirty={isDirty.value}
          direction={props.direction}
          v-slots={{
            ...slots,
            default: ({ id, isActive, isDirty, isFocused, focus, blur }: any) => (
              <div
                class="v-slider__container"
                onMousedown={onSliderMousedown}
                onTouchstart={onSliderMousedown}
              >
                <input
                  id={`${id}_start`}
                  name={attrs.name ?? id}
                  disabled={props.disabled}
                  readonly={props.readonly}
                  tabindex="-1"
                  value={model.value[0]}
                />

                <input
                  id={`${id}_stop`}
                  name={attrs.name ?? id}
                  disabled={props.disabled}
                  readonly={props.readonly}
                  tabindex="-1"
                  value={model.value[1]}
                />

                <VSliderTrack
                  ref={trackContainerRef}
                  min={min.value}
                  max={max.value}
                  start={trackStart.value}
                  stop={trackStop.value}
                  rounded={props.rounded}
                />

                <VSliderThumb
                  ref={ startThumbRef }
                  active={isActive}
                  dirty={isDirty}
                  focused={isFocused && focusedThumb.value === startThumbRef.value}
                  modelValue={model.value[0]}
                  onUpdate:modelValue={v => {
                    model.value = [v, model.value[1]]
                  }}
                  onFocus={(e: FocusEvent) => {
                    focus()
                    focusedThumb.value = startThumbRef.value

                    // Make sure second thumb is focused if
                    // the thumbs are on top of each other
                    // and they are both at minimum value
                    // but only if focused from outside.
                    if (
                      model.value[0] === model.value[1] &&
                      model.value[0] === min.value &&
                      e.relatedTarget !== stopThumbRef.value?.$el
                    ) stopThumbRef.value?.$el.focus()
                  }}
                  onBlur={() => {
                    blur()
                    focusedThumb.value = null
                  }}
                  v-slots={{
                    label: slots['thumb-label'],
                  }}
                  min={min.value}
                  max={model.value[1]}
                  position={trackStart.value}
                />

                <VSliderThumb
                  ref={ stopThumbRef }
                  active={isActive}
                  dirty={isDirty}
                  focused={isFocused && focusedThumb.value === stopThumbRef.value}
                  modelValue={model.value[1]}
                  onUpdate:modelValue={v => {
                    model.value = [model.value[0], v]
                  }}
                  onFocus={() => {
                    focus()
                    focusedThumb.value = stopThumbRef.value
                  }}
                  onBlur={() => {
                    blur()
                    focusedThumb.value = null
                  }}
                  v-slots={{
                    label: slots['thumb-label'],
                  }}
                  min={model.value[0]}
                  max={max.value}
                  position={trackStop.value}
                />
              </div>
            ),
          }}
        />
      )
    }
  },
})
