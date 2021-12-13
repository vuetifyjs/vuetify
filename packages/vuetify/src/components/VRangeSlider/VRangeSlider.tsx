// Components
import { VInput } from '../VInput'
import { VSliderThumb } from '../VSlider/VSliderThumb'
import { VSliderTrack } from '../VSlider/VSliderTrack'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'
import { getOffset, makeSliderProps, useSlider } from '../VSlider/slider'
import { useFocus } from '@/composables/focus'

// Utilities
import { computed, defineComponent, ref } from 'vue'

// Types
import type { PropType, WritableComputedRef } from 'vue'
import { filterInputProps, makeVInputProps } from '../VInput/VInput'

export const VRangeSlider = defineComponent({
  name: 'VRangeSlider',

  props: {
    ...makeVInputProps(),
    ...makeSliderProps(),

    modelValue: {
      type: Array as PropType<number[]>,
      default: () => ([0, 0]),
    },
  },

  emits: {
    'update:modelValue': (value: [number, number]) => true,
  },

  setup (props, { slots, attrs }) {
    const startThumbRef = ref<VSliderThumb>()
    const stopThumbRef = ref<VSliderThumb>()
    const focusedThumb = ref<VSliderThumb | null>()
    const inputRef = ref<VInput>()

    let canSwitch = false
    function getActiveThumb (e: MouseEvent | TouchEvent) {
      if (!startThumbRef.value || !stopThumbRef.value) return

      canSwitch = true

      const startOffset = getOffset(e, startThumbRef.value.$el, props.direction)
      const stopOffset = getOffset(e, stopThumbRef.value.$el, props.direction)

      const a = Math.abs(startOffset)
      const b = Math.abs(stopOffset)

      return (a < b || (a === b && startOffset < 0)) ? startThumbRef.value?.$el : stopThumbRef.value?.$el
    }

    const {
      min,
      max,
      mousePressed,
      roundValue,
      onSliderMousedown,
      onSliderTouchstart,
      trackContainerRef,
      position,
      hasLabels,
    } = useSlider({
      /* eslint-disable @typescript-eslint/no-use-before-define */
      props,
      handleSliderMouseUp: newValue => {
        model.value = focusedThumb.value === startThumbRef.value ? [newValue, model.value[1]] : [model.value[0], newValue]
      },
      handleMouseMove: newValue => {
        if (focusedThumb.value === startThumbRef.value) {
          model.value = [Math.min(newValue, model.value[1]), model.value[1]]
        } else {
          model.value = [model.value[0], Math.max(model.value[0], newValue)]
        }
        if (canSwitch && model.value[0] === model.value[1]) {
          focusedThumb.value = newValue > model.value[0] ? stopThumbRef.value : startThumbRef.value
        }
        canSwitch = false
      },
      getActiveThumb,
      /* eslint-enable @typescript-eslint/no-use-before-define */
    })

    const model = useProxiedModel(
      props,
      'modelValue',
      undefined,
      arr => {
        if (!arr || !arr.length) return [0, 0]

        return arr.map(value => roundValue(value))
      },
    ) as WritableComputedRef<[number, number]>

    const { isFocused, focus, blur } = useFocus()
    const trackStart = computed(() => position(model.value[0]))
    const trackStop = computed(() => position(model.value[1]))

    return () => {
      const [inputProps, _] = filterInputProps(props)

      return (
        <VInput
          class={[
            'v-slider',
            'v-range-slider',
            {
              'v-slider--has-labels': !!slots['tick-label'] || hasLabels.value,
              'v-slider--focused': isFocused.value,
              'v-slider--pressed': mousePressed.value,
              'v-slider--disabled': props.disabled,
            },
          ]}
          ref={ inputRef }
          { ...inputProps }
          focused={ isFocused.value }
          v-slots={{
            ...slots,
            default: ({ id }) => (
              <div
                class="v-slider__container"
                onMousedown={ onSliderMousedown }
                onTouchstartPassive={ onSliderTouchstart }
              >
                <input
                  id={ `${id.value}_start` }
                  name={ props.name || id.value }
                  disabled={ props.disabled }
                  readonly={ props.readonly }
                  tabindex="-1"
                  value={ model.value[0] }
                />

                <input
                  id={ `${id.value}_stop` }
                  name={ props.name || id.value }
                  disabled={ props.disabled }
                  readonly={ props.readonly }
                  tabindex="-1"
                  value={ model.value[1] }
                />

                <VSliderTrack
                  ref={ trackContainerRef }
                  start={ trackStart.value }
                  stop={ trackStop.value }
                  v-slots={{
                    'tick-label': slots['tick-label'],
                  }}
                />

                <VSliderThumb
                  ref={ startThumbRef }
                  focused={ isFocused && focusedThumb.value === startThumbRef.value }
                  modelValue={ model.value[0] }
                  onUpdate:modelValue={ v => (model.value = [v, model.value[1]]) }
                  onFocus={ (e: FocusEvent) => {
                    focus()
                    focusedThumb.value = startThumbRef.value

                    // Make sure second thumb is focused if
                    // the thumbs are on top of each other
                    // and they are both at minimum value
                    // but only if focused from outside.
                    if (
                      model.value[0] === model.value[1] &&
                      model.value[1] === min.value &&
                      e.relatedTarget !== stopThumbRef.value?.$el
                    ) stopThumbRef.value?.$el.focus()
                  } }
                  onBlur={ () => {
                    blur()
                    focusedThumb.value = null
                  } }
                  v-slots={{
                    'thumb-label': slots['thumb-label'],
                  }}
                  min={ min.value }
                  max={ model.value[1] }
                  position={ trackStart.value }
                />

                <VSliderThumb
                  ref={ stopThumbRef }
                  focused={ isFocused && focusedThumb.value === stopThumbRef.value }
                  modelValue={ model.value[1] }
                  onUpdate:modelValue={ v => (model.value = [model.value[0], v]) }
                  onFocus={ (e: FocusEvent) => {
                    focus()
                    focusedThumb.value = stopThumbRef.value

                    // Make sure first thumb is focused if
                    // the thumbs are on top of each other
                    // and they are both at maximum value
                    // but only if focused from outside.
                    if (
                      model.value[0] === model.value[1] &&
                      model.value[0] === max.value &&
                      e.relatedTarget !== startThumbRef.value?.$el
                    ) {
                      startThumbRef.value?.$el.focus()
                    }
                  } }
                  onBlur={ () => {
                    blur()
                    focusedThumb.value = null
                  } }
                  v-slots={{
                    'thumb-label': slots['thumb-label'],
                  }}
                  min={ model.value[0] }
                  max={ max.value }
                  position={ trackStop.value }
                />
              </div>
            ),
          }}
        />
      )
    }
  },
})

export type VRangeSlider = InstanceType<typeof VRangeSlider>
