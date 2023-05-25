// Styles
import './VSlider.sass'

// Components
import { VSliderThumb } from './VSliderThumb'
import { VSliderTrack } from './VSliderTrack'
import { makeVInputProps, VInput } from '@/components/VInput/VInput'
import { VLabel } from '@/components/VLabel'

// Composables
import { makeSliderProps, useSlider, useSteps } from './slider'
import { makeFocusProps, useFocus } from '@/composables/focus'
import { useRtl } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, ref } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { VInputSlot, VInputSlots } from '@/components/VInput/VInput'

export type VSliderSlots = VInputSlots & {
  label: VInputSlot
  'tick-label': never
  'thumb-label': never
}

export const makeVSliderProps = propsFactory({
  ...makeFocusProps(),
  ...makeSliderProps(),
  ...makeVInputProps(),

  modelValue: {
    type: [Number, String],
    default: 0,
  },
}, 'v-slider')

export const VSlider = genericComponent<VSliderSlots>()({
  name: 'VSlider',

  props: makeVSliderProps(),

  emits: {
    'update:focused': (value: boolean) => true,
    'update:modelValue': (v: number) => true,
    start: (value: number) => true,
    end: (value: number) => true,
  },

  setup (props, { slots, emit }) {
    const thumbContainerRef = ref()
    const { rtlClasses } = useRtl()

    const steps = useSteps(props)

    const model = useProxiedModel(
      props,
      'modelValue',
      undefined,
      v => {
        const value = typeof v === 'string' ? parseFloat(v) : v == null ? steps.min.value : v

        return steps.roundValue(value)
      },
    )

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
      readonly,
    } = useSlider({
      props,
      steps,
      onSliderStart: () => {
        emit('start', model.value)
      },
      onSliderEnd: ({ value }) => {
        const roundedValue = roundValue(value)
        model.value = roundedValue
        emit('end', roundedValue)
      },
      onSliderMove: ({ value }) => model.value = roundValue(value),
      getActiveThumb: () => thumbContainerRef.value?.$el,
    })

    const { isFocused, focus, blur } = useFocus(props)
    const trackStop = computed(() => position(model.value))

    useRender(() => {
      const [inputProps, _] = VInput.filterProps(props)
      const hasPrepend = !!(props.label || slots.label || slots.prepend)

      return (
        <VInput
          class={[
            'v-slider',
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
                      id={ slotProps.id.value }
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
                onMousedown={ !readonly.value ? onSliderMousedown : undefined }
                onTouchstartPassive={ !readonly.value ? onSliderTouchstart : undefined }
              >
                <input
                  id={ id.value }
                  name={ props.name || id.value }
                  disabled={ !!props.disabled }
                  readonly={ !!props.readonly }
                  tabindex="-1"
                  value={ model.value }
                />

                <VSliderTrack
                  ref={ trackContainerRef }
                  start={ 0 }
                  stop={ trackStop.value }
                >
                  {{ 'tick-label': slots['tick-label'] }}
                </VSliderTrack>

                <VSliderThumb
                  ref={ thumbContainerRef }
                  aria-describedby={ messagesId.value }
                  focused={ isFocused.value }
                  min={ min.value }
                  max={ max.value }
                  modelValue={ model.value }
                  onUpdate:modelValue={ v => (model.value = v) }
                  position={ trackStop.value }
                  elevation={ props.elevation }
                  onFocus={ focus }
                  onBlur={ blur }
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

export type VSlider = InstanceType<typeof VSlider>
