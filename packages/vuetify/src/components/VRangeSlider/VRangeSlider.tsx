// Styles
import '../VSlider/VSlider.sass'

// Components
import { makeVInputProps, VInput } from '@/components/VInput/VInput'
import { VLabel } from '@/components/VLabel'
import { getOffset, makeSliderProps, useSlider, useSteps } from '@/components/VSlider/slider'
import { VSliderThumb } from '@/components/VSlider/VSliderThumb'
import { VSliderTrack } from '@/components/VSlider/VSliderTrack'

// Composables
import { makeFocusProps, useFocus } from '@/composables/focus'
import { useRtl } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, ref } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType, WritableComputedRef } from 'vue'
import type { VSliderSlots } from '../VSlider/VSlider'

export const makeVRangeSliderProps = propsFactory({
  ...makeFocusProps(),
  ...makeVInputProps(),
  ...makeSliderProps(),

  strict: Boolean,
  modelValue: {
    type: Array as PropType<readonly number[]>,
    default: () => ([0, 0]),
  },
}, 'v-range-slider')

export const VRangeSlider = genericComponent<VSliderSlots>()({
  name: 'VRangeSlider',

  props: makeVRangeSliderProps(),

  emits: {
    'update:focused': (value: boolean) => true,
    'update:modelValue': (value: [number, number]) => true,
    end: (value: [number, number]) => true,
    start: (value: [number, number]) => true,
  },

  setup (props, { slots, emit }) {
    const startThumbRef = ref<VSliderThumb>()
    const stopThumbRef = ref<VSliderThumb>()
    const inputRef = ref<VInput>()
    const { rtlClasses } = useRtl()

    function getActiveThumb (e: MouseEvent | TouchEvent) {
      if (!startThumbRef.value || !stopThumbRef.value) return

      const startOffset = getOffset(e, startThumbRef.value.$el, props.direction)
      const stopOffset = getOffset(e, stopThumbRef.value.$el, props.direction)

      const a = Math.abs(startOffset)
      const b = Math.abs(stopOffset)

      return (a < b || (a === b && startOffset < 0)) ? startThumbRef.value.$el : stopThumbRef.value.$el
    }

    const steps = useSteps(props)

    const model = useProxiedModel(
      props,
      'modelValue',
      undefined,
      arr => {
        if (!arr?.length) return [0, 0]

        return arr.map(value => steps.roundValue(value))
      },
    ) as WritableComputedRef<[number, number]> & { readonly externalValue: number[] }

    const {
      activeThumbRef,
      hasLabels,
      max,
      min,
      mousePressed,
      onSliderMousedown,
      onSliderTouchstart,
      position,
      trackContainerRef,
    } = useSlider({
      props,
      steps,
      onSliderStart: () => {
        emit('start', model.value)
      },
      onSliderEnd: ({ value }) => {
        const newValue: [number, number] = activeThumbRef.value === startThumbRef.value?.$el
          ? [value, model.value[1]]
          : [model.value[0], value]

        model.value = newValue
        emit('end', newValue)
      },
      onSliderMove: ({ value }) => {
        const [start, stop] = model.value

        if (!props.strict && start === stop && start !== min.value) {
          activeThumbRef.value = value > start ? stopThumbRef.value?.$el : startThumbRef.value?.$el
          activeThumbRef.value?.focus()
        }

        if (activeThumbRef.value === startThumbRef.value?.$el) {
          model.value = [Math.min(value, stop), stop]
        } else {
          model.value = [start, Math.max(start, value)]
        }
      },
      getActiveThumb,
    })

    const { isFocused, focus, blur } = useFocus(props)
    const trackStart = computed(() => position(model.value[0]))
    const trackStop = computed(() => position(model.value[1]))

    useRender(() => {
      const [inputProps, _] = VInput.filterProps(props)
      const hasPrepend = !!(props.label || slots.label || slots.prepend)

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
            rtlClasses.value,
            props.class,
          ]}
          style={ props.style }
          ref={ inputRef }
          { ...inputProps }
          focused={ isFocused.value }
        >
          {{
            ...slots,
            prepend: hasPrepend ? slotProps => (
              <>
                { slots.label?.(slotProps) ?? props.label
                  ? (
                    <VLabel
                      class="v-slider__label"
                      text={ props.label }
                    />
                  ) : undefined
                }

                { slots.prepend?.(slotProps) }
              </>
            ) : undefined,
            default: ({ id, messagesId }) => (
              <div
                class="v-slider__container"
                onMousedown={ onSliderMousedown }
                onTouchstartPassive={ onSliderTouchstart }
              >
                <input
                  id={ `${id.value}_start` }
                  name={ props.name || id.value }
                  disabled={ !!props.disabled }
                  readonly={ !!props.readonly }
                  tabindex="-1"
                  value={ model.value[0] }
                />

                <input
                  id={ `${id.value}_stop` }
                  name={ props.name || id.value }
                  disabled={ !!props.disabled }
                  readonly={ !!props.readonly }
                  tabindex="-1"
                  value={ model.value[1] }
                />

                <VSliderTrack
                  ref={ trackContainerRef }
                  start={ trackStart.value }
                  stop={ trackStop.value }
                >
                  {{ 'tick-label': slots['tick-label'] }}
                </VSliderTrack>

                <VSliderThumb
                  ref={ startThumbRef }
                  aria-describedby={ messagesId.value }
                  focused={ isFocused && activeThumbRef.value === startThumbRef.value?.$el }
                  modelValue={ model.value[0] }
                  onUpdate:modelValue={ v => (model.value = [v, model.value[1]]) }
                  onFocus={ (e: FocusEvent) => {
                    focus()
                    activeThumbRef.value = startThumbRef.value?.$el

                    // Make sure second thumb is focused if
                    // the thumbs are on top of each other
                    // and they are both at minimum value
                    // but only if focused from outside.
                    if (
                      model.value[0] === model.value[1] &&
                      model.value[1] === min.value &&
                      e.relatedTarget !== stopThumbRef.value?.$el
                    ) {
                      startThumbRef.value?.$el.blur()
                      stopThumbRef.value?.$el.focus()
                    }
                  }}
                  onBlur={ () => {
                    blur()
                    activeThumbRef.value = undefined
                  }}
                  min={ min.value }
                  max={ model.value[1] }
                  position={ trackStart.value }
                >
                  {{ 'thumb-label': slots['thumb-label'] }}
                </VSliderThumb>

                <VSliderThumb
                  ref={ stopThumbRef }
                  aria-describedby={ messagesId.value }
                  focused={ isFocused && activeThumbRef.value === stopThumbRef.value?.$el }
                  modelValue={ model.value[1] }
                  onUpdate:modelValue={ v => (model.value = [model.value[0], v]) }
                  onFocus={ (e: FocusEvent) => {
                    focus()
                    activeThumbRef.value = stopThumbRef.value?.$el

                    // Make sure first thumb is focused if
                    // the thumbs are on top of each other
                    // and they are both at maximum value
                    // but only if focused from outside.
                    if (
                      model.value[0] === model.value[1] &&
                      model.value[0] === max.value &&
                      e.relatedTarget !== startThumbRef.value?.$el
                    ) {
                      stopThumbRef.value?.$el.blur()
                      startThumbRef.value?.$el.focus()
                    }
                  }}
                  onBlur={ () => {
                    blur()
                    activeThumbRef.value = undefined
                  }}
                  min={ model.value[0] }
                  max={ max.value }
                  position={ trackStop.value }
                >
                  {{ 'thumb-label': slots['thumb-label'] }}
                </VSliderThumb>
              </div>
            ),
          }}
        </VInput>
      )
    })

    return {}
  },
})

export type VRangeSlider = InstanceType<typeof VRangeSlider>
