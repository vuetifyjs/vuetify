/* eslint-disable max-statements */
// Composables
import { useRtl } from '@/composables/rtl'

// Utilities
import { computed, provide, ref, toRef } from 'vue'
import { clamp } from '@/util'

// Types
import type { InjectionKey, Ref } from 'vue'
import type { VSliderTrack } from './VSliderTrack'

type SliderProvide = {
  color: Ref<string | undefined>
  decimals: Ref<number>
  direction: Ref<'vertical' | 'horizontal'>
  disabled: Ref<boolean | undefined>
  label: Ref<string | undefined>
  min: Ref<number>
  max: Ref<number>
  onSliderMousedown: (e: MouseEvent) => void
  onSliderTouchstart: (e: TouchEvent) => void
  parseMouseMove: (e: MouseEvent | TouchEvent) => number
  readonly: Ref<boolean | undefined>
  roundValue: (value: number) => number
  thumbLabel: Ref<boolean | string | undefined>
  showTicks: Ref<boolean>
  startOffset: Ref<number>
  stepSize: Ref<number>
  transition: Ref<string>
  thumbSize: Ref<number>
  thumbColor: Ref<string | undefined>
  trackColor: Ref<string | undefined>
  trackFillColor: Ref<string | undefined>
  trackSize: Ref<number>
  ticks: Ref<string | boolean | undefined>
  tickSize: Ref<number>
  trackContainerRef: Ref<VSliderTrack | undefined>
  vertical: Ref<boolean>
  position: (val: number) => number
  elevation: Ref<number | string | undefined>
};

export const VSliderSymbol: InjectionKey<SliderProvide> = Symbol.for('vuetify:v-slider')

export function getOffset (e: MouseEvent | TouchEvent, el: HTMLElement, direction: string) {
  const vertical = direction === 'vertical'
  const rect = el.getBoundingClientRect()
  const touch = 'touches' in e ? e.touches[0] : e
  return vertical
    ? touch.clientY - (rect.top + rect.height / 2)
    : touch.clientX - (rect.left + rect.width / 2)
}

function getPosition (e: MouseEvent | TouchEvent) {
  if ('touches' in e && e.touches.length) return e.touches[0]
  else if ('changedTouches' in e && e.changedTouches.length) return e.changedTouches[0]
  else return e
}

export const useSlider = (
  props: {
    max: number | string
    min: number | string
    stepSize: number | string
    thumbSize: number | string
    tickSize: number | string
    direction: 'vertical' | 'horizontal'
    disabled?: boolean
    thumbColor?: string
    trackColor?: string
    trackFillColor?: string
    color?: string
    ticks?: boolean | 'always'
    tickLabels: string[]
    label?: string
    readonly?: boolean
    thumbLabel?: boolean | 'always'
    trackSize: number | string
    elevation?: number | string
  },
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
  const trackSize = computed(() => parseInt(props.trackSize, 10))
  const disabled = toRef(props, 'disabled')
  const vertical = computed(() => props.direction === 'vertical')

  const thumbColor = computed(() => props.disabled ? undefined : props.thumbColor ?? props.color)
  const trackColor = computed(() => props.disabled ? undefined : props.trackColor ?? props.color)
  const trackFillColor = computed(() => props.disabled ? undefined : props.trackFillColor ?? props.color)

  const showTicks = computed(() => props.tickLabels?.length > 0 || !!(!props.disabled && stepSize.value && props.ticks))

  const mousePressed = ref(false)

  const transition = computed(() => mousePressed.value ? 'none' : '0.3s cubic-bezier(0.25, 0.8, 0.5, 1)')

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
    e.preventDefault()

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
    trackSize,
    ticks: toRef(props, 'ticks'),
    tickSize,
    direction: toRef(props, 'direction'),
    showTicks,
    thumbLabel: toRef(props, 'thumbLabel'),
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
    position: (val: number) => (val - min.value) / (max.value - min.value) * 100,
    elevation: toRef(props, 'elevation'),
  }

  provide(VSliderSymbol, data)

  return data
}
