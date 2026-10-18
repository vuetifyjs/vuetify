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
      vertical,
      getThumbState,
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

    const isPill = toRef(() => props.variant === 'pill')
    const hasPrependInner = toRef(() => isPill.value && !!(props.prependInnerIcon || slots['prepend-inner']))
    const hasAppendInner = toRef(() => isPill.value && !!(props.appendInnerIcon || slots['append-inner']))
    const hasInner = toRef(() => hasPrependInner.value || hasAppendInner.value)

    const containerSize = useElementSize(toRef(() => hasInner.value ? containerRef.value : undefined))
    const prependInnerSize = useElementSize(prependInnerRef)
    const appendInnerSize = useElementSize(appendInnerRef)

    function getLength (size: ReturnType<typeof useElementSize>) {
      return (vertical.value ? size.height : size.width).value
    }

    const { textColorClasses: innerIconColorClasses, textColorStyles: innerIconColorStyles } = useTextColor(trackFillColor)

    function innerIcon (side: 'prepend' | 'append') {
      const isPrepend = side === 'prepend'
      const segmentLength = (isPrepend ? visualPosition.value : 100 - visualPosition.value) / 100 * getLength(containerSize)
      const isFlipped = segmentLength < getLength(isPrepend ? prependInnerSize : appendInnerSize)
      const isOverFill = isPrepend !== isReversed.value

      return (
        <div
          key={ `${side}-inner` }
          ref={ isPrepend ? prependInnerRef : appendInnerRef }
          class={[
            'v-slider__inner-icon',
            `v-slider__inner-icon--${side}`,
            {
              'v-slider__inner-icon--flipped': isFlipped,
              'v-slider__inner-icon--filled': isOverFill !== isFlipped,
            },
            innerIconColorClasses.value,
          ]}
          style={ innerIconColorStyles.value }
        >
          { slots[`${side}-inner`]?.() ?? <VIcon icon={ isPrepend ? props.prependInnerIcon : props.appendInnerIcon } /> }
        </div>
      )
    }

    useRender(() => {
      const inputProps = VInput.filterProps(props)
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)
      const hasPrepend = !!(props.label || slots.label || slots.prepend)

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
              [`v-slider--size-${props.size}`]: isPill.value,
              'v-slider--has-prepend-inner': hasPrependInner.value,
              'v-slider--has-append-inner': hasAppendInner.value,
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
                  '--v-slider-thumb-gap': convertToUnit(props.thumbGap),
                  '--v-slider-inner-icon-position': hasInner.value ? convertToUnit(visualPosition.value, '%') : undefined,
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
                  stopThumb={ getThumbState(isFocused.value) }
                >
                  {{ 'tick-label': slots['tick-label'] }}
                </VSliderTrack>

                { hasPrependInner.value && innerIcon('prepend') }
                { hasAppendInner.value && innerIcon('append') }

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
