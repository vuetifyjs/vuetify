// Utilities
import { computed, onScopeDispose, shallowRef, toValue, watch } from 'vue'
import { constrainViewBox, zoomViewBox } from './viewport'
import { clamp } from '@/util'
import { easingPatterns } from '@/util/easing'
import { PREFERS_REDUCED_MOTION } from '@/util/globals'

// Types
import type { MaybeRefOrGetter, Ref } from 'vue'
import type { MapPoint, MapViewBox } from './viewport'

export const DEFAULT_ZOOM_STEP = 0.2

interface MapNavigationProps {
  disabled: boolean
  pan: boolean
  zoomable: boolean
  wheel: boolean
  zoomStep: number
  zoomOnFocus: boolean
  minZoom: number
  maxZoom: number
}

export function useMapNavigation (
  props: MapNavigationProps,
  element: Ref<SVGSVGElement | undefined>,
  bounds: MaybeRefOrGetter<MapViewBox | undefined>,
  zoom: Ref<number>,
) {
  const center = shallowRef<MapPoint>()
  const dragging = shallowRef(false)
  const minimum = computed(() => Math.max(1, Number.isFinite(props.minZoom) ? props.minZoom : 1))
  const maximum = computed(() => Math.max(minimum.value, Number.isFinite(props.maxZoom) ? props.maxZoom : 8))
  const scale = computed(() => clamp(Number.isFinite(zoom.value) ? zoom.value : 1, minimum.value, maximum.value))
  const step = computed(() => 1 + Math.max(0.01, Number.isFinite(props.zoomStep) ? props.zoomStep : DEFAULT_ZOOM_STEP))
  const sensitivity = computed(() => Math.log(step.value) / Math.log1p(DEFAULT_ZOOM_STEP))
  const viewBox = computed(() => {
    const base = toValue(bounds)
    if (!base) return
    const width = base.width / scale.value
    const height = base.height / scale.value
    return constrainViewBox({
      x: (center.value?.x ?? base.x + base.width / 2) - width / 2,
      y: (center.value?.y ?? base.y + base.height / 2) - height / 2,
      width,
      height,
    }, base)
  })

  const pointers = new Map<number, MapPoint>()
  const captures = new Map<number, Element>()
  let origin: MapPoint | undefined
  let suppressClick = false
  let animation = 0
  let animationZoom: number | undefined

  function stopAnimation () {
    if (animation) cancelAnimationFrame(animation)
    animation = 0
    animationZoom = undefined
  }

  function moveTo (view: MapViewBox, smooth = false, nextZoom = scale.value) {
    const base = toValue(bounds)
    if (!base) return
    stopAnimation()
    const limited = constrainViewBox(view, base)
    const target = { x: limited.x + limited.width / 2, y: limited.y + limited.height / 2 }
    const current = viewBox.value!
    const from = { x: current.x + current.width / 2, y: current.y + current.height / 2 }
    const fromZoom = scale.value
    if (!smooth || PREFERS_REDUCED_MOTION()) {
      center.value = target
      if (nextZoom !== fromZoom) zoom.value = nextZoom
      return
    }
    const start = performance.now()
    function tick (time: number) {
      const progress = clamp((time - start) / 200, 0, 1)
      const eased = easingPatterns.easeOutCubic(progress)
      center.value = { x: from.x + (target.x - from.x) * eased, y: from.y + (target.y - from.y) * eased }
      if (nextZoom !== fromZoom) {
        animationZoom = fromZoom + (nextZoom - fromZoom) * eased
        zoom.value = animationZoom
      }
      animation = progress < 1 ? requestAnimationFrame(tick) : 0
    }
    animation = requestAnimationFrame(tick)
  }

  function zoomTo (value: number, anchor?: MapPoint) {
    const base = toValue(bounds)
    const view = viewBox.value
    if (props.disabled || !props.zoomable || !base || !view) return
    stopAnimation()
    const next = clamp(value, minimum.value, maximum.value)
    const point = anchor ?? { x: view.x + view.width / 2, y: view.y + view.height / 2 }
    const result = zoomViewBox(view, base, next, point)
    center.value = { x: result.x + result.width / 2, y: result.y + result.height / 2 }
    zoom.value = next
  }

  function reset () {
    if (props.disabled) return
    stopAnimation()
    center.value = undefined
    zoom.value = minimum.value
  }

  function pointAt (point: MapPoint) {
    const matrix = element.value?.getScreenCTM()
    if (!matrix) return
    return new DOMPoint(point.x, point.y).matrixTransform(matrix.inverse())
  }

  function panBy (x: number, y: number) {
    const view = viewBox.value
    if (!view || !props.pan || props.disabled) return
    moveTo({ ...view, x: view.x + x, y: view.y + y })
  }

  function reveal (region: SVGGraphicsElement) {
    const view = viewBox.value
    if (!view || props.disabled || !props.pan) return
    const rectangle = region.getBoundingClientRect()
    const start = pointAt({ x: rectangle.left, y: rectangle.top })
    const end = pointAt({ x: rectangle.right, y: rectangle.bottom })
    if (!start || !end) return
    if (props.zoomOnFocus && props.zoomable) {
      const base = toValue(bounds)!
      const nextZoom = clamp(Math.min(
        base.width / Math.max((end.x - start.x) * 1.08, Number.EPSILON),
        base.height / Math.max((end.y - start.y) * 1.08, Number.EPSILON),
      ), minimum.value, maximum.value)
      const width = base.width / nextZoom
      const height = base.height / nextZoom
      moveTo({ x: (start.x + end.x - width) / 2, y: (start.y + end.y - height) / 2, width, height }, true, nextZoom)
      return
    }
    const padding = Math.min(view.width, view.height) * 0.04
    const x = end.x - start.x > view.width - padding * 2
      ? (start.x + end.x - view.width) / 2
      : start.x < view.x + padding ? start.x - padding : Math.max(view.x, end.x + padding - view.width)
    const y = end.y - start.y > view.height - padding * 2
      ? (start.y + end.y - view.height) / 2
      : start.y < view.y + padding ? start.y - padding : Math.max(view.y, end.y + padding - view.height)
    if (x !== view.x || y !== view.y) moveTo({ ...view, x, y }, true)
  }

  function onPointerdown (event: PointerEvent) {
    if (props.disabled || (!props.pan && !props.zoomable) || (event.pointerType === 'mouse' && event.button !== 0)) return
    stopAnimation()
    if (!pointers.size) {
      suppressClick = false
      origin = { x: event.clientX, y: event.clientY }
    }
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY })
    if (event.isTrusted) {
      const target = event.target as Element
      target.setPointerCapture(event.pointerId)
      captures.set(event.pointerId, target)
    }
  }

  function onPointermove (event: PointerEvent) {
    const previous = pointers.get(event.pointerId)
    if (!previous || props.disabled) return
    const current = { x: event.clientX, y: event.clientY }
    const other = Array.from(pointers.entries()).find(([id]) => id !== event.pointerId)?.[1]
    pointers.set(event.pointerId, current)

    if (origin && Math.hypot(current.x - origin.x, current.y - origin.y) > 4) {
      suppressClick = true
      dragging.value = true
    }
    if (!suppressClick) return

    const previousCenter = other ? { x: (previous.x + other.x) / 2, y: (previous.y + other.y) / 2 } : previous
    const currentCenter = other ? { x: (current.x + other.x) / 2, y: (current.y + other.y) / 2 } : current
    const anchor = pointAt(previousCenter)
    const previousScale = scale.value

    if (other && anchor && props.zoomable) {
      const before = Math.hypot(previous.x - other.x, previous.y - other.y)
      const after = Math.hypot(current.x - other.x, current.y - other.y)
      if (before > 0 && after > 0) {
        zoomTo(scale.value * (after / before) ** sensitivity.value, anchor)
      }
    }

    const from = pointAt(previousCenter)
    const to = pointAt(currentCenter)
    const ratio = previousScale / scale.value
    if (from && to) panBy((from.x - to.x) * ratio, (from.y - to.y) * ratio)
  }

  function onPointerup (event: PointerEvent) {
    pointers.delete(event.pointerId)
    const target = captures.get(event.pointerId)
    captures.delete(event.pointerId)
    if (target?.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId)
    if (!pointers.size) {
      dragging.value = false
      origin = undefined
    } else {
      origin = pointers.values().next().value
    }
  }

  function onWheel (event: WheelEvent) {
    if (props.disabled || !props.zoomable || !props.wheel || event.ctrlKey || event.metaKey || event.altKey || !event.deltaY) return
    event.preventDefault()
    zoomTo(scale.value * (event.deltaY < 0 ? step.value : 1 / step.value), pointAt({ x: event.clientX, y: event.clientY }))
  }

  function onDblclick (event: MouseEvent) {
    if (props.disabled || !props.zoomable || event.ctrlKey || event.metaKey || event.altKey) return
    event.preventDefault()
    zoomTo(scale.value * (event.shiftKey ? 1 / step.value : step.value), pointAt({ x: event.clientX, y: event.clientY }))
  }

  function clearPointers () {
    stopAnimation()
    for (const [id, target] of captures) {
      if (target.hasPointerCapture(id)) target.releasePointerCapture(id)
    }
    captures.clear()
    pointers.clear()
    dragging.value = false
    origin = undefined
  }

  watch(() => toValue(bounds), () => {
    center.value = undefined
    clearPointers()
  })
  watch(() => props.disabled || (!props.pan && !props.zoomable), clearPointers)
  watch(zoom, value => {
    if (animation && value !== animationZoom) stopAnimation()
  })
  onScopeDispose(clearPointers)

  return {
    viewBox,
    scale,
    minimum,
    maximum,
    dragging,
    reset,
    reveal,
    zoomIn: () => zoomTo(scale.value * step.value),
    zoomOut: () => zoomTo(scale.value / step.value),
    isClickSuppressed: () => suppressClick,
    onPointerdown,
    onPointermove,
    onPointerup,
    onWheel,
    onDblclick,
  }
}
