/* eslint-disable max-statements */
// Composables
import { useRtl } from '@/composables/rtl'
import { makeRoundedProps } from '@/composables/rounded'
import { makeElevationProps } from '@/composables/elevation'

// Utilities
import { computed, provide, ref, toRef } from 'vue'
import { clamp, createRange, propsFactory } from '@/util'

// Types
import type { ExtractPropTypes, InjectionKey, PropType, Ref } from 'vue'
import type { VSliderTrack } from './VSliderTrack'

type Tick = {
  value: number
  position: number
  label?: string
}

type SliderProvide = {
  color: Ref<string | undefined>
  decimals: Ref<number>
  direction: Ref<'vertical' | 'horizontal'>
  disabled: Ref<boolean | undefined>
  elevation: Ref<number | string | undefined>
  label: Ref<string | undefined>
  min: Ref<number>
  max: Ref<number>
  numTicks: Ref<number>
  onSliderMousedown: (e: MouseEvent) => void
  onSliderTouchstart: (e: TouchEvent) => void
  parseMouseMove: (e: MouseEvent | TouchEvent) => number
  position: (val: number) => number
  readonly: Ref<boolean | undefined>
  rounded: Ref<boolean | number | string | undefined>
  roundValue: (value: number) => number
  thumbLabel: Ref<boolean | string | undefined>
  showTicks: Ref<boolean | 'always'>
  startOffset: Ref<number>
  stepSize: Ref<number>
  transition: Ref<string | undefined>
  thumbSize: Ref<number>
  thumbColor: Ref<string | undefined>
  trackColor: Ref<string | undefined>
  trackFillColor: Ref<string | undefined>
  trackSize: Ref<number>
  ticks: Ref<number[] | Record<string, string> | undefined>
  tickSize: Ref<number>
  trackContainerRef: Ref<VSliderTrack | undefined>
  vertical: Ref<boolean>
  showTickLabels: Ref<boolean | undefined>
  parsedTicks: Ref<Tick[]>
  hasLabels: Ref<boolean>
  isReversed: Ref<boolean>
  horizontalDirection: Ref<'ltr' | 'rtl'>
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

function getPosition (e: MouseEvent | TouchEvent, position: 'clientX' | 'clientY'): number {
  if ('touches' in e && e.touches.length) return e.touches[0][position]
  else if ('changedTouches' in e && e.changedTouches.length) return e.changedTouches[0][position]
  else return (e as MouseEvent)[position]
}

export const makeSliderProps = propsFactory({
  disabled: Boolean,
  readonly: Boolean,
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
    validator: (v: any) => typeof v === 'boolean' || v === 'always',
  },
  thumbSize: {
    type: [Number, String],
    default: 20,
  },
  showTicks: {
    type: [Boolean, String] as PropType<boolean | 'always'>,
    default: true,
    validator: (v: any) => typeof v === 'boolean' || v === 'always',
  },
  showTickLabels: {
    type: Boolean,
    default: false,
  },
  ticks: {
    type: [Array, Object] as PropType<number[] | Record<string, string>>,
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
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
    validator: (v: any) => ['vertical', 'horizontal'].includes(v),
  },
  reverse: Boolean,
  label: String,

  ...makeRoundedProps(),
  ...makeElevationProps({
    elevation: 2,
  }),
}, 'slider')

type SliderProps = ExtractPropTypes<ReturnType<typeof makeSliderProps>>

export const useSlider = ({
  props,
  handleSliderMouseUp,
  handleMouseMove,
  getActiveThumb,
}: {
  props: SliderProps
  handleSliderMouseUp: (v: number) => void
  handleMouseMove: (v: number) => void
  getActiveThumb: (e: MouseEvent | TouchEvent) => HTMLElement
}) => {
  const { isRtl } = useRtl()
  const isReversed = computed(() => isRtl.value !== props.reverse)
  const horizontalDirection = computed(() => {
    let hd: 'ltr' | 'rtl' = isRtl.value ? 'rtl' : 'ltr'

    if (props.reverse) {
      hd = hd === 'rtl' ? 'ltr' : 'rtl'
    }

    return hd
  })
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
  const trackSize = computed(() => parseInt(props.trackSize, 10))
  const numTicks = computed(() => (max.value - min.value) / stepSize.value)
  const disabled = toRef(props, 'disabled')
  const vertical = computed(() => props.direction === 'vertical')

  const thumbColor = computed(() => props.disabled ? undefined : props.thumbColor ?? props.color)
  const trackColor = computed(() => props.disabled ? undefined : props.trackColor ?? props.color)
  const trackFillColor = computed(() => props.disabled ? undefined : props.trackFillColor ?? props.color)

  const mousePressed = ref(false)
  const transition = computed(() => mousePressed.value ? 'none' : undefined)

  const startOffset = ref(0)
  const trackContainerRef = ref<VSliderTrack | undefined>()

  function roundValue (value: number) {
    if (stepSize.value <= 0) return value

    const clamped = clamp(value, min.value, max.value)
    const offset = min.value % stepSize.value
    const newValue = Math.round((clamped - offset) / stepSize.value) * stepSize.value + offset

    return parseFloat(Math.min(newValue, max.value).toFixed(decimals.value))
  }

  function parseMouseMove (e: MouseEvent | TouchEvent): number {
    const vertical = props.direction === 'vertical'
    const start = vertical ? 'top' : 'left'
    const length = vertical ? 'height' : 'width'
    const position = vertical ? 'clientY' : 'clientX'

    const {
      [start]: trackStart,
      [length]: trackLength,
    } = trackContainerRef.value?.$el.getBoundingClientRect()
    const clickOffset = getPosition(e, position)

    // It is possible for left to be NaN, force to number
    let clickPos = Math.min(Math.max((clickOffset - trackStart - startOffset.value) / trackLength, 0), 1) || 0

    if (vertical || isReversed.value) clickPos = 1 - clickPos

    return roundValue(min.value + clickPos * (max.value - min.value))
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

  function onMouseMove (e: MouseEvent | TouchEvent) {
    thumbMoved = true
    handleMouseMove(parseMouseMove(e))
  }

  function onSliderMouseUp (e: MouseEvent) {
    e.stopPropagation()
    e.preventDefault()

    handleStop(e)

    window.removeEventListener('mousemove', onMouseMove, moveListenerOptions)
    window.removeEventListener('mouseup', onSliderMouseUp)
  }

  function onSliderTouchend (e: TouchEvent) {
    e.stopPropagation()
    e.preventDefault()

    handleStop(e)

    window.removeEventListener('touchmove', onMouseMove, moveListenerOptions)
    window.removeEventListener('touchend', onSliderTouchend)
  }

  function onSliderTouchstart (e: TouchEvent) {
    handleStart(e)

    window.addEventListener('touchmove', onMouseMove, moveListenerOptions)
    window.addEventListener('touchend', onSliderTouchend, { passive: false })
  }

  function onSliderMousedown (e: MouseEvent) {
    e.preventDefault()

    handleStart(e)

    window.addEventListener('mousemove', onMouseMove, moveListenerOptions)
    window.addEventListener('mouseup', onSliderMouseUp, { passive: false })
  }

  const position = (val: number) => {
    const percentage = (val - min.value) / (max.value - min.value) * 100
    return clamp(isNaN(percentage) ? 0 : percentage, 0, 100)
  }

  const parsedTicks = computed<Tick[]>(() => {
    if (!props.ticks) {
      return numTicks.value !== Infinity ? createRange(numTicks.value + 1).map(t => {
        const value = min.value + (t * stepSize.value)
        return {
          value,
          position: position(value),
        }
      }) : []
    }
    if (Array.isArray(props.ticks)) return props.ticks.map(t => ({ value: t, position: position(t), label: t.toString() }))
    return Object.keys(props.ticks).map(key => ({
      value: parseInt(key, 10),
      position: position(parseInt(key, 10)),
      label: (props.ticks as Record<string, string>)[key],
    }))
  })

  const hasLabels = computed(() => parsedTicks.value.some(({ label }) => !!label))

  const data: SliderProvide = {
    color: toRef(props, 'color'),
    decimals,
    disabled,
    direction: toRef(props, 'direction'),
    elevation: toRef(props, 'elevation'),
    hasLabels,
    horizontalDirection,
    isReversed,
    label: toRef(props, 'label'),
    min,
    max,
    numTicks,
    onSliderMousedown,
    onSliderTouchstart,
    parsedTicks,
    parseMouseMove,
    position,
    readonly: toRef(props, 'readonly'),
    rounded: toRef(props, 'rounded'),
    roundValue,
    showTickLabels: toRef(props, 'showTickLabels'),
    showTicks: toRef(props, 'showTicks'),
    startOffset,
    stepSize,
    transition,
    thumbSize,
    thumbColor,
    thumbLabel: toRef(props, 'thumbLabel'),
    ticks: toRef(props, 'ticks'),
    tickSize,
    trackColor,
    trackContainerRef,
    trackFillColor,
    trackSize,
    vertical,
  }

  provide(VSliderSymbol, data)

  return data
}
