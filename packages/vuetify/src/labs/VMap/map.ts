// Utilities
import { computed, onScopeDispose, shallowRef, toValue, watch } from 'vue'
import { constrainViewBox, flightZoom, zoomViewBox } from './viewport'
import { clamp, wrapInArray } from '@/util'
import { easingPatterns } from '@/util/easing'
import { PREFERS_REDUCED_MOTION } from '@/util/globals'

// Types
import type { MaybeRefOrGetter, Ref } from 'vue'
import type { MapPoint, MapViewBox } from './viewport'

const NATURAL_PINCH_STEP = 0.2
const DRAG_THRESHOLD = 4
const FIT_MARGIN = 1.08
const REVEAL_MARGIN = 0.04
const WHEEL_LINE_HEIGHT = 33

interface MapNavigationProps {
  disabled: boolean
  disablePan: boolean
  disableZoom: boolean
  wheelZoom: boolean
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
  const minimum = computed(() => Math.max(1, props.minZoom))
  const maximum = computed(() => Math.max(minimum.value, props.maxZoom))
  // v-model:zoom can be bound to an emptied number field
  const scale = computed(() => clamp(Number.isFinite(zoom.value) ? zoom.value : 1, minimum.value, maximum.value))
  const step = computed(() => 1 + Math.max(0.01, props.zoomStep))
  const sensitivity = computed(() => Math.log(step.value) / Math.log1p(NATURAL_PINCH_STEP))
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
    const distance = Math.hypot(target.x - from.x, target.y - from.y) / Math.max(current.width, current.height)
    const duration = clamp(200 + 300 * (distance + Math.abs(Math.log2(nextZoom / fromZoom))), 200, 900)
    const start = performance.now()
    function tick (time: number) {
      const progress = clamp((time - start) / duration, 0, 1)
      const eased = easingPatterns.easeInOutCubic(progress)
      center.value = { x: from.x + (target.x - from.x) * eased, y: from.y + (target.y - from.y) * eased }
      const value = progress < 1
        ? Math.max(minimum.value, flightZoom(fromZoom, nextZoom, distance, eased))
        : nextZoom
      if (value !== scale.value) {
        animationZoom = value
        zoom.value = value
      }
      animation = progress < 1 ? requestAnimationFrame(tick) : 0
    }
    animation = requestAnimationFrame(tick)
  }

  function zoomTo (value: number, anchor?: MapPoint) {
    const base = toValue(bounds)
    const view = viewBox.value
    if (props.disabled || props.disableZoom || !base || !view) return
    stopAnimation()
    const next = clamp(value, minimum.value, maximum.value)
    const point = anchor ?? { x: view.x + view.width / 2, y: view.y + view.height / 2 }
    const result = zoomViewBox(view, base, next, point)
    center.value = { x: result.x + result.width / 2, y: result.y + result.height / 2 }
    zoom.value = next
  }

  function resetZoom () {
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

  function panBy (x: number, y: number, smooth = false) {
    const view = viewBox.value
    if (!view || props.disablePan || props.disabled) return
    moveTo({ ...view, x: view.x + x, y: view.y + y }, smooth)
  }

  function nudge (x: number, y: number) {
    const view = viewBox.value
    if (view) panBy(x * view.width / 4, y * view.height / 4, true)
  }

  function reveal (regions: SVGGraphicsElement | SVGGraphicsElement[], fit = props.zoomOnFocus) {
    const view = viewBox.value
    const rectangles = wrapInArray(regions).map(region => region.getBoundingClientRect())
    if (!view || props.disabled || props.disablePan || !rectangles.length) return
    const box = rectangles.reduce((a, b) => DOMRect.fromRect({
      x: Math.min(a.left, b.left),
      y: Math.min(a.top, b.top),
      width: Math.max(a.right, b.right) - Math.min(a.left, b.left),
      height: Math.max(a.bottom, b.bottom) - Math.min(a.top, b.top),
    }))
    const start = pointAt({ x: box.left, y: box.top })
    const end = pointAt({ x: box.right, y: box.bottom })
    if (!start || !end) return
    if (fit && !props.disableZoom) {
      const base = toValue(bounds)!
      const nextZoom = clamp(Math.min(
        base.width / Math.max((end.x - start.x) * FIT_MARGIN, Number.EPSILON),
        base.height / Math.max((end.y - start.y) * FIT_MARGIN, Number.EPSILON),
      ), minimum.value, maximum.value)
      const width = base.width / nextZoom
      const height = base.height / nextZoom
      moveTo({ x: (start.x + end.x - width) / 2, y: (start.y + end.y - height) / 2, width, height }, true, nextZoom)
      return
    }
    const padding = Math.min(view.width, view.height) * REVEAL_MARGIN
    const x = end.x - start.x > view.width - padding * 2
      ? (start.x + end.x - view.width) / 2
      : start.x < view.x + padding ? start.x - padding : Math.max(view.x, end.x + padding - view.width)
    const y = end.y - start.y > view.height - padding * 2
      ? (start.y + end.y - view.height) / 2
      : start.y < view.y + padding ? start.y - padding : Math.max(view.y, end.y + padding - view.height)
    if (x !== view.x || y !== view.y) moveTo({ ...view, x, y }, true)
  }

  function onPointerdown (event: PointerEvent) {
    if (props.disabled || (props.disablePan && props.disableZoom)) return
    if (event.pointerType === 'mouse' && event.button !== 0) {
      if (event.button !== 1 || props.disablePan) return
      // stops middle-click autoscroll
      event.preventDefault()
    }
    stopAnimation()
    if (!pointers.size) {
      suppressClick = false
      origin = { x: event.clientX, y: event.clientY }
    }
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY })
    // synthetic events have no active pointer to capture
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

    if (origin && Math.hypot(current.x - origin.x, current.y - origin.y) > DRAG_THRESHOLD) {
      suppressClick = true
      dragging.value = true
    }
    if (!suppressClick) return

    const previousCenter = other ? { x: (previous.x + other.x) / 2, y: (previous.y + other.y) / 2 } : previous
    const currentCenter = other ? { x: (current.x + other.x) / 2, y: (current.y + other.y) / 2 } : current
    const anchor = pointAt(previousCenter)
    const previousScale = scale.value

    if (other && anchor && !props.disableZoom) {
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
    // trackpad pinch arrives as ctrlKey + small deltaY, so zoom proportionally and cap at one step per mouse notch
    const modified = event.ctrlKey || event.metaKey
    if (props.disabled || props.disableZoom || (!props.wheelZoom && !modified) || event.altKey || !event.deltaY) return
    event.preventDefault()
    const delta = event.deltaY * (event.deltaMode === WheelEvent.DOM_DELTA_LINE ? WHEEL_LINE_HEIGHT : 1)
    zoomTo(scale.value * step.value ** clamp(-delta / 100, -1, 1), pointAt({ x: event.clientX, y: event.clientY }))
  }

  function onDblclick (event: MouseEvent) {
    if (props.disabled || props.disableZoom || event.ctrlKey || event.metaKey || event.altKey) return
    event.preventDefault()
    zoomTo(scale.value * (event.shiftKey ? 1 / step.value : step.value), pointAt({ x: event.clientX, y: event.clientY }))
  }

  function clearPointers () {
    stopAnimation()
    captures.forEach((target, id) => {
      if (target.hasPointerCapture(id)) target.releasePointerCapture(id)
    })
    captures.clear()
    pointers.clear()
    dragging.value = false
    origin = undefined
  }

  watch(() => toValue(bounds), () => {
    center.value = undefined
    clearPointers()
  })
  watch(() => props.disabled || (props.disablePan && props.disableZoom), clearPointers)
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
    resetZoom,
    zoomTo,
    reveal,
    nudge,
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
