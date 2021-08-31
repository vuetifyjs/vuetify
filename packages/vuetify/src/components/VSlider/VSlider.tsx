/* eslint-disable max-statements */
// Styles
import './VSlider.sass'

// Components
import { VInput } from '../VInput'
import { VSliderThumb } from './VSliderThumb'
import { VSliderTrack } from './VSliderTrack'

// Composables
import { useRtl } from '@/composables/rtl'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeRoundedProps } from '@/composables/rounded'
import { makeElevationProps } from '@/composables/elevation'

// Helpers
import { clamp, convertToUnit } from '@/util/helpers'
import { defineComponent, propsFactory } from '@/util'

// Types
import type { InjectionKey, PropType, Ref } from 'vue'
import { computed, provide, ref, toRef } from 'vue'

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
    default: 20,
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
    default: 2,
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
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
    validator: (v: any) => ['vertical', 'horizontal'].includes(v),
  },
  reverse: Boolean,
  label: String,

  ...makeRoundedProps(),
  ...makeElevationProps(),
}, 'v-slider')

type SliderProvide = {
  color: Ref<string>
  decimals: Ref<number>
  direction: Ref<'vertical' | 'horizontal'>
  disabled: Ref<boolean>
  label: Ref<string>
  min: Ref<number>
  max: Ref<number>
  onSliderMousedown: (e: MouseEvent) => void
  onSliderTouchstart: (e: TouchEvent) => void
  parseMouseMove: (e: MouseEvent | TouchEvent) => number
  readonly: Ref<boolean>
  roundValue: (value: number) => number
  showLabel: Ref<boolean>
  showTicks: Ref<boolean>
  startOffset: Ref<number>
  stepSize: Ref<number>
  transition: Ref<string>
  thumbSize: Ref<number>
  thumbColor: Ref<string>
  trackColor: Ref<string>
  trackFillColor: Ref<string>
  ticks: Ref<string | boolean>
  tickSize: Ref<number>
  trackContainerRef: Ref<VSliderTrack | undefined>
  vertical: Ref<boolean>
}

export const VSliderSymbol: InjectionKey<SliderProvide> = Symbol.for('vuetify:v-slider')

export function getOffset (e: MouseEvent | TouchEvent, el: HTMLElement, direction: string) {
  const vertical = direction === 'vertical'
  const rect = el.getBoundingClientRect()
  const touch = 'touches' in e ? e.touches[0] : e
  return vertical
    ? touch.clientY - (rect.top + rect.height / 2)
    : touch.clientX - (rect.left + rect.width / 2)
}

export const useSlider = (
  props: any,
  handleSliderMouseUp: (v: number) => void,
  handleMouseMove: (v: number) => void,
  getActiveThumb: (e: MouseEvent | TouchEvent) => HTMLElement,
) => {
  const { isRtl } = useRtl()
  const min = computed(() => parseFloat(props.min))
  const max = computed(() => parseFloat(props.max))
  const stepSize = computed(() => props.stepSize > 0 ? parseFloat(props.stepSize) : 0)
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

  const showTicks = computed(() => props.tickLabels?.length > 0 || !!(!props.disabled && stepSize.value && props.ticks))

  const mousePressed = ref(false)

  const transition = computed(() => mousePressed.value ? 'none' : '0.3s cubic-bezier(0.25, 0.8, 0.5, 1)')

  function getPosition (e: MouseEvent | TouchEvent) {
    if ('touches' in e && e.touches.length) return e.touches[0]
    else if ('changedTouches' in e && e.changedTouches.length) return e.changedTouches[0]
    else return e
  }

  const startOffset = ref(0)
  const trackContainerRef = ref<VSliderTrack | undefined>()

  function parseMouseMove (e: MouseEvent | TouchEvent): number {
    const vertical = props.direction === 'vertical'
    const start = vertical ? 'top' : 'left'
    const length = vertical ? 'height' : 'width'
    const click = vertical ? 'clientY' : 'clientX'

    const {
      [start]: trackStart,
      [length]: trackLength,
    } = trackContainerRef.value?.$el.getBoundingClientRect()
    const clickOffset = getPosition(e)[click]

    // It is possible for left to be NaN, force to number
    let clickPos = Math.min(Math.max((clickOffset - trackStart - startOffset.value) / trackLength, 0), 1) || 0

    if (vertical || isRtl.value) clickPos = 1 - clickPos

    return min.value + clickPos * (max.value - min.value)
  }

  let thumbMoved = false

  const handleStop = (e: MouseEvent | TouchEvent) => {
    if (!thumbMoved) {
      startOffset.value = 0
      handleSliderMouseUp(parseMouseMove(e))
    }

    mousePressed.value = false
    thumbMoved = false
    startOffset.value = 0
  }

  const handleStart = (e: MouseEvent | TouchEvent) => {
    const activeThumb = getActiveThumb(e)

    if (!activeThumb) return

    activeThumb.focus()

    mousePressed.value = true

    startOffset.value = getOffset(e, activeThumb, props.direction)
  }

  const moveListenerOptions = { passive: true, capture: true }
  const stopListenerOptions = { passive: false }

  function onMouseMove (e: MouseEvent | TouchEvent) {
    thumbMoved = true
    handleMouseMove(parseMouseMove(e))
  }

  function onSliderMouseUp (e: MouseEvent) {
    e.stopPropagation()

    handleStop(e)

    window.removeEventListener('mousemove', onMouseMove, moveListenerOptions)
    window.removeEventListener('mouseup', onSliderMouseUp, stopListenerOptions)
  }

  function onSliderTouchend (e: TouchEvent) {
    e.stopPropagation()
    e.preventDefault()

    handleStop(e)

    window.removeEventListener('touchmove', onMouseMove, moveListenerOptions)
    window.removeEventListener('touchend', onSliderTouchend, stopListenerOptions)
  }

  function onSliderTouchstart (e: TouchEvent) {
    handleStart(e)

    window.addEventListener('touchmove', onMouseMove, moveListenerOptions)
    window.addEventListener('touchend', onSliderTouchend, stopListenerOptions)
  }

  function onSliderMousedown (e: MouseEvent) {
    e.preventDefault()

    handleStart(e)

    window.addEventListener('mousemove', onMouseMove, moveListenerOptions)
    window.addEventListener('mouseup', onSliderMouseUp, stopListenerOptions)
  }

  const data: SliderProvide = {
    min,
    max,
    stepSize,
    decimals,
    transition,
    thumbSize,
    disabled,
    vertical,
    color: toRef(props, 'color'),
    label: toRef(props, 'label'),
    readonly: toRef(props, 'readonly'),
    thumbColor,
    trackColor,
    trackFillColor,
    ticks: toRef(props, 'ticks'),
    tickSize,
    direction: toRef(props, 'direction'),
    showTicks,
    showLabel: computed(() => !!props.thumbLabel),
    roundValue: (value: number) => {
      if (stepSize.value <= 0) return value

      const clamped = clamp(value, min.value, max.value)
      const offset = min.value % stepSize.value
      const newValue = Math.round((clamped - offset) / stepSize.value) * stepSize.value + offset

      return parseFloat(Math.min(newValue, max.value).toFixed(decimals.value))
    },
    parseMouseMove,
    startOffset,
    trackContainerRef,
    onSliderMousedown,
    onSliderTouchstart,
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
    const thumbContainerRef = ref()
    const { min, max, roundValue, onSliderMousedown, onSliderTouchstart, trackContainerRef } = useSlider(props, newValue => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      model.value = newValue
    }, newValue => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      model.value = newValue
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
    const trackStop = computed(() => (model.value - min.value) / (max.value - min.value) * 100)

    return () => {
      return (
        <VInput
          class={[
            'v-slider',
          ]}
          disabled={props.disabled}
          dirty={isDirty.value}
          style={{
            '--v-slider-track-size': props.trackSize ? convertToUnit(props.trackSize) : undefined,
          }}
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
