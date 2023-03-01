// Styles
import './VSlider.sass'

// Components
import { filterInputProps, makeVInputProps, VInput } from '@/components/VInput/VInput'
import { VLabel } from '@/components/VLabel'
import { VSliderThumb } from './VSliderThumb'
import { VSliderTrack } from './VSliderTrack'

// Composables
import { makeFocusProps, useFocus } from '@/composables/focus'
import { makeSliderProps, useSlider } from './slider'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, ref } from 'vue'
import { genericComponent, useRender } from '@/util'

// Types
import type { MakeSlots } from '@/util'
import type { VInputSlots } from '@/components/VInput/VInput'

export type VSliderSlots = VInputSlots & MakeSlots<{
  'tick-label': []
  'thumb-label': []
}>

export const VSlider = genericComponent<VSliderSlots>()({
  name: 'VSlider',

  props: {
    ...makeFocusProps(),
    ...makeSliderProps(),
    ...makeVInputProps(),

    modelValue: {
      type: [Number, String],
      default: 0,
    },
  },

  emits: {
    'update:focused': (value: boolean) => true,
    'update:modelValue': (v: number) => true,
  },

  setup (props, { slots }) {
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

    const { isFocused, focus, blur } = useFocus(props)
    const trackStop = computed(() => position(model.value))

    useRender(() => {
      const [inputProps, _] = filterInputProps(props)
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
          ]}
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
                      id={ slotProps.id }
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
