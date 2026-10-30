// Utilities
import { computed, onScopeDispose, shallowRef, toValue, watch } from 'vue'
import { constrainViewBox, zoomViewBox } from './viewport'
import { clamp } from '@/util'

// Types
import type { MaybeRefOrGetter, Ref } from 'vue'
import type { MapPoint, MapViewBox } from './viewport'

interface MapNavigationProps {
  disabled: boolean
  pan: boolean
  zoomable: boolean
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

  function moveTo (view: MapViewBox) {
    const base = toValue(bounds)
    if (!base) return
    const limited = constrainViewBox(view, base)
    center.value = { x: limited.x + limited.width / 2, y: limited.y + limited.height / 2 }
  }

  function zoomTo (value: number, anchor?: MapPoint) {
    const base = toValue(bounds)
    const view = viewBox.value
    if (props.disabled || !props.zoomable || !base || !view) return
    const next = clamp(value, minimum.value, maximum.value)
    const point = anchor ?? { x: view.x + view.width / 2, y: view.y + view.height / 2 }
    const result = zoomViewBox(view, base, next, point)
    center.value = { x: result.x + result.width / 2, y: result.y + result.height / 2 }
    zoom.value = next
  }

  function reset () {
    if (props.disabled) return
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

  function onPointerdown (event: PointerEvent) {
    if (props.disabled || (!props.pan && !props.zoomable) || (event.pointerType === 'mouse' && event.button !== 0)) return
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
      if (before > 0 && after > 0) zoomTo(scale.value * after / before, anchor)
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
    if (props.disabled || !props.zoomable || !event.deltaY) return
    event.preventDefault()
    zoomTo(scale.value * (event.deltaY < 0 ? 1.2 : 1 / 1.2), pointAt({ x: event.clientX, y: event.clientY }))
  }

  function onDblclick (event: MouseEvent) {
    if (props.disabled || !props.zoomable) return
    event.preventDefault()
    zoomTo(scale.value * (event.shiftKey ? 0.5 : 2), pointAt({ x: event.clientX, y: event.clientY }))
  }

  function onKeydown (event: KeyboardEvent) {
    if (props.disabled) return
    const view = viewBox.value
    if (!view) return
    if (props.zoomable && ['+', '=', '-', '_', 'Home'].includes(event.key)) {
      event.preventDefault()
      if (event.key === 'Home') reset()
      else zoomTo(scale.value * (['+', '='].includes(event.key) ? 1.2 : 1 / 1.2))
    } else if (props.pan && event.target === element.value && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
      event.preventDefault()
      panBy(
        event.key === 'ArrowLeft' ? -view.width / 10 : event.key === 'ArrowRight' ? view.width / 10 : 0,
        event.key === 'ArrowUp' ? -view.height / 10 : event.key === 'ArrowDown' ? view.height / 10 : 0,
      )
    }
  }

  function clearPointers () {
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
  onScopeDispose(clearPointers)

  return {
    viewBox,
    scale,
    minimum,
    maximum,
    dragging,
    reset,
    zoomIn: () => zoomTo(scale.value * 1.2),
    zoomOut: () => zoomTo(scale.value / 1.2),
    isClickSuppressed: () => suppressClick,
    onPointerdown,
    onPointermove,
    onPointerup,
    onWheel,
    onDblclick,
    onKeydown,
  }
}
