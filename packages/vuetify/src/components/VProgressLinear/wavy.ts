// Utilities
import { computed, onScopeDispose, shallowRef, toRef, toValue, watch } from 'vue'
import { hasWave, linearWavePath } from './waves'
import { PREFERS_REDUCED_MOTION } from '@/util'

// Types
import type { MaybeRefOrGetter } from 'vue'

export const WAVE_AMPLITUDE = 3

export interface WavyProps {
  chunkGap: number | string
  height: number | string
  indeterminate: boolean
  shape: 'flat' | 'wavy'
}

interface WavyOptions {
  containerWidth: MaybeRefOrGetter<number>
  value: MaybeRefOrGetter<number>
  isActive: MaybeRefOrGetter<boolean>
  duration: () => number
}

export function useWavy (props: WavyProps, { containerWidth, value, isActive, duration }: WavyOptions) {
  const isWavy = toRef(() => props.shape === 'wavy')

  const geometry = computed(() => {
    const width = toValue(containerWidth)
    if (!isWavy.value || !width) return undefined

    // assuming height to be set in pixels, rem/em heights would need measuring
    const stroke = parseFloat(props.height)
    const wavelength = props.indeterminate ? 20 : 40
    const center = stroke / 2 + WAVE_AMPLITUDE
    const start = stroke / 2
    const end = Math.max(width - start, start + 1)
    const range = end - start

    return {
      width,
      stroke,
      wavelength,
      center,
      start,
      end,
      offset: wavelength / range * 100,
      gap: (parseFloat(props.chunkGap) + stroke) / range * 100,
      track: `M ${start} ${center} H ${end}`,
      wave: props.indeterminate ? linearWavePath(start - wavelength, end, center, WAVE_AMPLITUDE, wavelength) : '',
    }
  })

  const svgEl = shallowRef<SVGSVGElement>()
  const waveEl = shallowRef<SVGPathElement>()
  const isAnimating = toRef(() => isWavy.value && !props.indeterminate && toValue(isActive) && !!svgEl.value)

  let displayedValue = toValue(value)
  let velocity = 0
  let amplitude = hasWave(displayedValue) ? 1 : 0
  let phase = 0
  let springDuration = 0
  let lastFrameTime = 0
  let frame = -1

  function draw () {
    if (!geometry.value || !svgEl.value || !waveEl.value) return

    const { start, end, center, wavelength } = geometry.value
    const head = start + (end - start) * displayedValue / 100
    const eased = amplitude * amplitude * (3 - 2 * amplitude)
    waveEl.value.setAttribute('d', linearWavePath(start, head, center, WAVE_AMPLITUDE * eased, wavelength, phase))
    svgEl.value.style.setProperty('--v-progress-linear-value', String(displayedValue))
  }

  function tick (now: number) {
    const elapsed = lastFrameTime ? Math.min(now - lastFrameTime, 100) / 1000 : 0
    lastFrameTime = now

    const target = toValue(value)
    const omega = 4000 / springDuration
    if (!Number.isFinite(omega)) {
      displayedValue = target
      velocity = 0
    } else {
      const offset = displayedValue - target
      const decay = Math.exp(-omega * elapsed)
      const coefficient = velocity + omega * offset
      displayedValue = target + (offset + coefficient * elapsed) * decay
      velocity = (velocity - omega * coefficient * elapsed) * decay
      if (Math.abs(displayedValue - target) < 0.01 && Math.abs(velocity) < 0.01) {
        displayedValue = target
        velocity = 0
      }
    }

    const targetAmplitude = hasWave(displayedValue) ? 1 : 0
    amplitude = targetAmplitude > amplitude ? Math.min(amplitude + elapsed * 2, 1) : Math.max(amplitude - elapsed * 2, 0)

    const reduceMotion = PREFERS_REDUCED_MOTION()
    const wavelength = geometry.value?.wavelength ?? 40
    if (!reduceMotion) phase = (phase - elapsed * wavelength) % wavelength

    draw()

    const settled = displayedValue === target && amplitude === targetAmplitude
    frame = isAnimating.value && !(settled && (reduceMotion || !amplitude)) ? requestAnimationFrame(tick) : -1
  }

  // post flush: duration may come from inline styles rendered in the same tick
  watch([isAnimating, () => toValue(value)], () => {
    if (!isAnimating.value) return
    springDuration = duration()
    if (frame >= 0) return
    lastFrameTime = 0
    frame = requestAnimationFrame(tick)
  }, { immediate: true, flush: 'post' })
  watch([svgEl, geometry], draw, { flush: 'post' })
  onScopeDispose(() => cancelAnimationFrame(frame))

  return { geometry, svgEl, waveEl }
}
