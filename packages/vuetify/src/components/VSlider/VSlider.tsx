// Styles
import './VSlider.sass'

// Components
import { VInput } from '../VInput'
import { VSliderThumb } from './VSliderThumb'
import { VSliderTrack } from './VSliderTrack'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'
import { useFocus } from '@/composables/focus'
import { makeSliderProps, useSlider } from './slider'

// Helpers
import { defineComponent } from '@/util'

// Types
import { computed, ref } from 'vue'
import { filterInputProps, makeVInputProps } from '../VInput/VInput'

export const VSlider = defineComponent({
  name: 'VSlider',

  props: {
    ...makeSliderProps(),
    ...makeVInputProps(),

    modelValue: {
      type: [Number, String],
      default: 0,
    },
  },

  emits: {
    'update:modelValue': (v: number) => true,
  },

  setup (props, { attrs, slots }) {
    const thumbContainerRef = ref()

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
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handleSliderMouseUp: newValue => model.value = roundValue(newValue),
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handleMouseMove: newValue => model.value = roundValue(newValue),
      getActiveThumb: () => thumbContainerRef.value?.$el,
    })

    const model = useProxiedModel(
      props,
      'modelValue',
      undefined,
      v => {
        const value = typeof v === 'string' ? parseFloat(v) : v == null ? min.value : v

        return roundValue(value)
      },
    )

    const { isFocused, focus, blur } = useFocus()
    const trackStop = computed(() => position(model.value))

    return () => {
      const [inputProps, _] = filterInputProps(props)

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
          ]}
          { ...inputProps }
          focused={ isFocused.value }
        >
          {{
            ...slots,
            default: ({ id }) => (
              <div
                class="v-slider__container"
                onMousedown={ !readonly.value ? onSliderMousedown : undefined }
                onTouchstartPassive={ !readonly.value ? onSliderTouchstart : undefined }
              >
                <input
                  id={ id.value }
                  name={ props.name || id.value }
                  disabled={ props.disabled }
                  readonly={ props.readonly }
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
    }
  },
})

export type VSlider = InstanceType<typeof VSlider>
