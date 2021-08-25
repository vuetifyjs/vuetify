/* eslint-disable max-statements */
// Styles
import './VSlider.sass'

// Components
import { VField } from '@/components'

// Helpers
import { clamp, convertToUnit } from '../../util/helpers'
import { defineComponent, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import { computed, provide, ref, toRef } from 'vue'
import { useRtl } from '@/composables/rtl'
import { useProxiedModel } from '@/composables/proxiedModel'
import VSliderThumb from './VSliderThumb'
import { makeRoundedProps } from '@/composables/rounded'
import VSliderTrack from './VSliderTrack'

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
    default: 24,
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
    default: 4,
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
    type: String,
    default: 'horizontal',
    validator: (v: any) => ['vertical', 'horizontal'].includes(v),
  },
  reverse: Boolean,

  ...makeRoundedProps(),
}, 'v-slider')

export const VSliderSymbol = Symbol.for('vuetify:v-slider')

export const useSlider = (props: any) => {
  const min = computed(() => parseFloat(props.min))
  const max = computed(() => parseFloat(props.max))
  const stepSize = computed(() => props.stepSize > 0 ? parseFloat(props.stepSize) : 1)
  const decimals = computed(() => {
    const trimmedStep = stepSize.value.toString().trim()
    return trimmedStep.includes('.')
      ? (trimmedStep.length - trimmedStep.indexOf('.') - 1)
      : 0
  })

  const thumbSize = computed(() => parseInt(props.thumbSize, 10))
  const tickSize = computed(() => parseInt(props.tickSize, 10))
  const disabled = toRef(props, 'disabled')
  const vertical = computed(() => props.direction === 'vertical')

  const thumbColor = computed(() => props.disabled ? undefined : props.thumbColor ?? props.color)
  const trackColor = computed(() => props.disabled ? undefined : props.trackColor ?? props.color)
  const trackFillColor = computed(() => props.disabled ? undefined : props.trackFillColor ?? props.color)

  const disableTransition = ref(false)
  const showTicks = computed(() => props.tickLabels?.length > 0 || !!(!props.disabled && stepSize.value && props.ticks))

  const transition = computed(() =>
    disableTransition.value
      ? showTicks.value || stepSize.value > 1
        ? '0.1s cubic-bezier(0.25, 0.8, 0.5, 1)'
        : 'none'
      : ''
  )

  const thumbPressed = ref(false)

  const data = {
    min,
    max,
    stepSize,
    decimals,
    transition,
    disableTransition,
    thumbPressed,
    thumbSize,
    disabled,
    vertical,
    color: toRef(props, 'color'),
    thumbColor,
    trackColor,
    trackFillColor,
    tickSize,
    direction: toRef(props, 'direction'),
    showTicks,
    showLabel: computed(() => !!props.thumbLabel),
    roundValue: (value: number) => {
      const clamped = clamp(value, min.value, max.value)

      const offset = min.value % stepSize.value

      const newValue = Math.round((clamped - offset) / stepSize.value) * stepSize.value + offset

      return parseFloat(Math.min(newValue, max.value).toFixed(decimals.value))
    },
    keyPressed: ref(false),
  }

  provide(VSliderSymbol, data)

  return data
}

export default defineComponent({
  name: 'VSlider',

  props: makeVSliderProps(),

  emits: {
    'update:modelValue': (v: number) => true,
  },

  setup (props, { attrs, emit, slots }) {
    const { isRtl } = useRtl()
    const isReversed = computed(() => isRtl.value !== props.reverse)
    const { min, max, thumbPressed, disableTransition, roundValue } = useSlider(props)

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

    const trackStop = computed(() => (model.value - min.value) / (max.value - min.value) * 100)

    const trackContainerRef = ref<HTMLElement>()
    const thumbContainerRef = ref<HTMLElement>()
    const fieldRef = ref<VField>()

    let startOffset = 0
    let thumbMoved = false

    function getPosition (e: MouseEvent | TouchEvent) {
      if ('touches' in e && e.touches.length) return e.touches[0]
      else if ('changedTouches' in e && e.changedTouches.length) return e.changedTouches[0]
      else return e
    }

    function parseMouseMove (e: MouseEvent | TouchEvent) {
      if (!trackContainerRef.value) return model.value

      const vertical = props.direction === 'vertical'
      const start = vertical ? 'top' : 'left'
      const length = vertical ? 'height' : 'width'
      const click = vertical ? 'clientY' : 'clientX'

      const {
        [start]: trackStart,
        [length]: trackLength,
      } = trackContainerRef.value.$el.getBoundingClientRect()
      const clickOffset = getPosition(e)[click]

      // It is possible for left to be NaN, force to number
      let clickPos = Math.min(Math.max((clickOffset - trackStart - startOffset) / trackLength, 0), 1) || 0

      if (vertical || isRtl.value) clickPos = 1 - clickPos

      return min.value + clickPos * (max.value - min.value)
    }

    function onMouseMove (e: MouseEvent | TouchEvent) {
      const newValue = parseMouseMove(e)
      // console.log('mousemove', newValue)
      thumbMoved = true
      model.value = newValue
    }

    let transitionTimeout = 0

    function onSliderMouseUp (e: MouseEvent | TouchEvent) {
      console.log('mouseup')
      // if (e.touches && !e.touches.length) return

      e.stopPropagation()

      if (!thumbMoved) {
        startOffset = 0
        model.value = parseMouseMove(e)
      }

      thumbMoved = false
      startOffset = 0
      disableTransition.value = false
      thumbPressed.value = false
      window.clearTimeout(transitionTimeout)

      window.removeEventListener('mousemove', onMouseMove, { passive: true, capture: true })
      window.removeEventListener('touchmove', onMouseMove, { passive: true, capture: true })
      window.removeEventListener('mouseup', onSliderMouseUp, { passive: true })
      window.removeEventListener('touchend', onSliderMouseUp, { passive: true })
    }

    function onSliderMousedown (e: MouseEvent | TouchEvent) {
      e.preventDefault()

      if (!thumbContainerRef.value) return

      thumbContainerRef.value.$el.focus()

      if (thumbPressed.value) {
        disableTransition.value = true
      } else {
        window.clearTimeout(transitionTimeout)
        transitionTimeout = window.setTimeout(() => {
          disableTransition.value = true
        }, 300)
      }

      const touch = getPosition(e)
      const thumbRect = thumbContainerRef.value?.$el.getBoundingClientRect()
      const vertical = props.direction === 'vertical'

      startOffset = vertical
        ? touch.clientY - (thumbRect.top + thumbRect.height / 2)
        : touch.clientX - (thumbRect.left + thumbRect.width / 2)

      window.addEventListener('mousemove', onMouseMove, { passive: true, capture: true })
      window.addEventListener('touchmove', onMouseMove, { passive: true, capture: true })
      window.addEventListener('mouseup', onSliderMouseUp, { passive: true })
      window.addEventListener('touchend', onSliderMouseUp, { passive: true })
    }

    return () => {
      return (
        <VField
          class={[
            'v-slider',
            `v-slider--${props.direction}`,
            {
              'v-slider--disabled': props.disabled,
            },
          ]}
          style={{
            '--v-slider-track-size': props.trackSize ? convertToUnit(props.trackSize) : undefined,
          }}
          ref={fieldRef}
          variant="plain"
          dirty={isDirty.value}
          v-slots={{
            ...slots,
            default: ({ props: slotProps, isActive, isDirty, isFocused }: VFieldSlot) => (
              <div
                class="v-slider__container"
                onMousedown={onSliderMousedown}
                onTouchstartPassive={onSliderMousedown}
              >
                <input
                  id={slotProps.id}
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
                  onFocus={slotProps.onFocus}
                  onBlur={slotProps.onBlur}
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
