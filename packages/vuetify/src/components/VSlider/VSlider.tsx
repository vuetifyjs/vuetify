// Styles
import './VSlider.sass'

// Components
import { VSliderThumb } from './VSliderThumb'
import { VSliderTrack } from './VSliderTrack'
import { VIcon } from '@/components/VIcon'
import { makeVInputProps, VInput } from '@/components/VInput/VInput'
import { VLabel } from '@/components/VLabel'

// Composables
import { makeSliderProps, useSlider, useSteps } from './slider'
import { useTextColor } from '@/composables/color'
import { makeFocusProps, useFocus } from '@/composables/focus'
import { forwardRefs } from '@/composables/forwardRefs'
import { IconValue } from '@/composables/icons'
import { useRtl } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useElementSize } from '@/composables/resizeObserver'

// Utilities
import { computed, ref, toRef } from 'vue'
import { convertToUnit, filterInputAttrs, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { VSliderThumbSlots } from './VSliderThumb'
import type { VSliderTrackSlots } from './VSliderTrack'
import type { VInputSlot, VInputSlots } from '@/components/VInput/VInput'

export type VSliderSlots = VInputSlots & VSliderThumbSlots & VSliderTrackSlots & {
  label: VInputSlot
  'prepend-inner': never
  'append-inner': never
}

export const makeVSliderProps = propsFactory({
  ...makeFocusProps(),
  ...makeSliderProps(),
  ...makeVInputProps(),

  appendInnerIcon: IconValue,
  prependInnerIcon: IconValue,
  modelValue: {
    type: [Number, String],
    default: 0,
  },
}, 'VSlider')

export const VSlider = genericComponent<VSliderSlots>()({
  name: 'VSlider',

  inheritAttrs: false,

  props: makeVSliderProps(),

  emits: {
    'update:focused': (value: boolean) => true,
    'update:modelValue': (v: number) => true,
    start: (value: number) => true,
    end: (value: number) => true,
  },

  setup (props, { slots, emit, attrs }) {
    const thumbContainerRef = ref<VSliderThumb>()
    const containerRef = ref<HTMLElement>()
    const prependInnerRef = ref<HTMLElement>()
    const appendInnerRef = ref<HTMLElement>()
    const inputRef = ref<VInput>()
    const { rtlClasses } = useRtl()

    const steps = useSteps(props)

    const model = useProxiedModel(
      props,
      'modelValue',
      undefined,
      value => {
        return steps.roundValue(value == null ? steps.min.value : value)
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
      disabled,
      readonly,
      noKeyboard,
      isReversed,
      trackFillColor,
      trackSize,
      variant,
      vertical,
      thumbState,
    } = useSlider({
      props,
      steps,
      onSliderStart: () => {
        if (!disabled.value && !readonly.value) {
          emit('start', model.value)
        }
      },
      onSliderEnd: ({ value }) => {
        const roundedValue = roundValue(value)

        if (!disabled.value && !readonly.value) {
          model.value = roundedValue
        }

        emit('end', roundedValue)
      },
      onSliderMove: ({ value }) => {
        if (!disabled.value && !readonly.value) {
          model.value = roundValue(value)
        }
      },
      getActiveThumb: () => thumbContainerRef.value?.$el,
    })

    const { isFocused, focus, blur } = useFocus(props)
    const trackStop = computed(() => position(model.value))
    const visualPosition = toRef(() => isReversed.value ? 100 - trackStop.value : trackStop.value)

    const containerSize = useElementSize(containerRef)
    const prependInnerSize = useElementSize(prependInnerRef)
    const appendInnerSize = useElementSize(appendInnerRef)
    const trackLength = toRef(() => (vertical.value ? containerSize.height : containerSize.width).value)
    const isPrependInnerPopped = computed(() => {
      const space = (vertical.value ? prependInnerSize.height : prependInnerSize.width).value
      return visualPosition.value / 100 * trackLength.value < space
    })
    const isAppendInnerPopped = computed(() => {
      const space = (vertical.value ? appendInnerSize.height : appendInnerSize.width).value
      return (100 - visualPosition.value) / 100 * trackLength.value < space
    })

    const { textColorClasses: innerIconColorClasses, textColorStyles: innerIconColorStyles } = useTextColor(trackFillColor)

    useRender(() => {
      const inputProps = VInput.filterProps(props)
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)
      const hasPrepend = !!(props.label || slots.label || slots.prepend)
      const isPill = variant.value === 'pill'
      const hasPrependInner = isPill && !!(props.prependInnerIcon || slots['prepend-inner'])
      const hasAppendInner = isPill && !!(props.appendInnerIcon || slots['append-inner'])

      return (
        <VInput
          ref={ inputRef }
          class={[
            'v-slider',
            {
              'v-slider--has-labels': !!slots['tick-label'] || hasLabels.value,
              'v-slider--focused': isFocused.value,
              'v-slider--pressed': mousePressed.value,
              'v-slider--disabled': disabled.value,
              [`v-slider--variant-${props.variant}`]: props.variant !== 'default',
              [`v-slider--size-${props.size}`]: isPill,
              'v-slider--has-prepend-inner': hasPrependInner,
              'v-slider--has-append-inner': hasAppendInner,
            },
            rtlClasses.value,
            props.class,
          ]}
          style={ props.style }
          { ...inputProps }
          { ...rootAttrs }
          focused={ isFocused.value }
        >
          {{
            ...slots,
            prepend: hasPrepend ? slotProps => (
              <>
                { slots.label?.(slotProps) ?? (
                  props.label
                    ? (
                      <VLabel
                        id={ slotProps.id.value }
                        class="v-slider__label"
                        text={ props.label }
                      />
                    ) : undefined
                )}

                { slots.prepend?.(slotProps) }
              </>
            ) : undefined,
            default: ({ id, messagesId }) => (
              <div
                ref={ containerRef }
                class="v-slider__container"
                style={{
                  '--v-slider-track-size': convertToUnit(trackSize.value),
                  '--v-slider-pill-gap': convertToUnit(props.thumbGap),
                  '--v-slider-inner-icon-position': convertToUnit(visualPosition.value, '%'),
                }}
                onMousedown={ !readonly.value ? onSliderMousedown : undefined }
                onTouchstartPassive={ !readonly.value ? onSliderTouchstart : undefined }
              >
                <input
                  id={ id.value }
                  name={ props.name || id.value }
                  disabled={ disabled.value }
                  readonly={ readonly.value }
                  tabindex="-1"
                  value={ model.value }
                />

                <VSliderTrack
                  ref={ trackContainerRef }
                  start={ 0 }
                  stop={ trackStop.value }
                  stopThumb={ thumbState(isFocused.value) }
                >
                  {{ 'tick-label': slots['tick-label'] }}
                </VSliderTrack>

                { hasPrependInner && (
                  <div
                    key="prepend-inner"
                    ref={ prependInnerRef }
                    class={[
                      'v-slider__inner-icon',
                      'v-slider__inner-icon--prepend',
                      {
                        'v-slider__inner-icon--popped': isPrependInnerPopped.value,
                        'v-slider__inner-icon--filled': !isReversed.value !== isPrependInnerPopped.value,
                      },
                      innerIconColorClasses.value,
                    ]}
                    style={ innerIconColorStyles.value }
                  >
                    { slots['prepend-inner']?.() ?? <VIcon icon={ props.prependInnerIcon } /> }
                  </div>
                )}

                { hasAppendInner && (
                  <div
                    key="append-inner"
                    ref={ appendInnerRef }
                    class={[
                      'v-slider__inner-icon',
                      'v-slider__inner-icon--append',
                      {
                        'v-slider__inner-icon--popped': isAppendInnerPopped.value,
                        'v-slider__inner-icon--filled': isReversed.value !== isAppendInnerPopped.value,
                      },
                      innerIconColorClasses.value,
                    ]}
                    style={ innerIconColorStyles.value }
                  >
                    { slots['append-inner']?.() ?? <VIcon icon={ props.appendInnerIcon } /> }
                  </div>
                )}

                <VSliderThumb
                  ref={ thumbContainerRef }
                  aria-describedby={ messagesId.value }
                  focused={ isFocused.value }
                  noKeyboard={ noKeyboard.value }
                  min={ min.value }
                  max={ max.value }
                  modelValue={ model.value }
                  onUpdate:modelValue={ v => (model.value = v) }
                  position={ trackStop.value }
                  elevation={ props.elevation }
                  onFocus={ focus }
                  onBlur={ blur }
                  ripple={ props.ripple }
                  name={ props.name }
                  { ...inputAttrs }
                >
                  {{ 'thumb-label': slots['thumb-label'] }}
                </VSliderThumb>
              </div>
            ),
          }}
        </VInput>
      )
    })

    return forwardRefs({
      focus: () => thumbContainerRef.value?.$el.focus(),
    }, inputRef)
  },
})

export type VSlider = InstanceType<typeof VSlider>
