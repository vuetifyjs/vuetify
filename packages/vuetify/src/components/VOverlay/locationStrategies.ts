// Composables
import { useToggleScope } from '@/composables/toggleScope'

// Utilities
import { computed, nextTick, onScopeDispose, ref, watch } from 'vue'
import { anchorToPoint, getOffset } from './util/point'
import {
  clamp,
  consoleError,
  convertToUnit,
  destructComputed,
  flipAlign,
  flipCorner,
  flipSide,
  getAxis,
  getScrollParents,
  IN_BROWSER,
  isFixedPosition,
  nullifyTransforms,
  parseAnchor,
  propsFactory,
} from '@/util'
import { Box, getOverflow, getTargetBox } from '@/util/box'

// Types
import type { PropType, Ref } from 'vue'
import type { Anchor } from '@/util'

interface CircleObject {
  x: number
  y: number
  r: number
  size: number
}

export interface LocationStrategyData {
  contentEl: Ref<HTMLElement | undefined>
  target: Ref<HTMLElement | [x: number, y: number] | undefined>
  isActive: Ref<boolean>
  isRtl: Ref<boolean>
}

type LocationStrategyFn = (
  data: LocationStrategyData,
  props: StrategyProps,
  contentStyles: Ref<Record<string, string>>
) => undefined | { updateLocation: (e?: Event) => void }

const locationStrategies = {
  static: staticLocationStrategy, // specific viewport position, usually centered
  connected: connectedLocationStrategy, // connected to a certain element
  featureDiscovery: featureDiscoveryLocationStrategy,
}

export interface StrategyProps {
  locationStrategy: keyof typeof locationStrategies | LocationStrategyFn
  location: Anchor
  origin: Anchor | 'auto' | 'overlap'
  offset?: number | string | number[]
  maxHeight?: number | string
  maxWidth?: number | string
  minHeight?: number | string
  minWidth?: number | string
}

export const makeLocationStrategyProps = propsFactory({
  locationStrategy: {
    type: [String, Function] as PropType<StrategyProps['locationStrategy']>,
    default: 'static',
    validator: (val: any) => typeof val === 'function' || val in locationStrategies,
  },
  location: {
    type: String as PropType<StrategyProps['location']>,
    default: 'bottom',
  },
  origin: {
    type: String as PropType<StrategyProps['origin']>,
    default: 'auto',
  },
  offset: [Number, String, Array] as PropType<StrategyProps['offset']>,
}, 'VOverlay-location-strategies')

export function useLocationStrategies (
  props: StrategyProps,
  data: LocationStrategyData
) {
  const contentStyles = ref({})
  const updateLocation = ref<(e: Event) => void>()

  if (IN_BROWSER) {
    useToggleScope(() => !!(data.isActive.value && props.locationStrategy), reset => {
      watch(() => props.locationStrategy, reset)
      onScopeDispose(() => {
        window.removeEventListener('resize', onResize)
        updateLocation.value = undefined
      })

      window.addEventListener('resize', onResize, { passive: true })

      if (typeof props.locationStrategy === 'function') {
        updateLocation.value = props.locationStrategy(data, props, contentStyles)?.updateLocation
      } else {
        updateLocation.value = locationStrategies[props.locationStrategy](data, props, contentStyles)?.updateLocation
      }
    })
  }

  function onResize (e: Event) {
    updateLocation.value?.(e)
  }

  return {
    contentStyles,
    updateLocation,
  }
}

function staticLocationStrategy () {
  // TODO
}

/** Get size of element ignoring max-width/max-height */
function getIntrinsicSize (el: HTMLElement, isRtl: boolean) {
  // const scrollables = new Map<Element, [number, number]>()
  // el.querySelectorAll('*').forEach(el => {
  //   const x = el.scrollLeft
  //   const y = el.scrollTop
  //   if (x || y) {
  //     scrollables.set(el, [x, y])
  //   }
  // })

  // const initialMaxWidth = el.style.maxWidth
  // const initialMaxHeight = el.style.maxHeight
  // el.style.removeProperty('max-width')
  // el.style.removeProperty('max-height')

  /* eslint-disable-next-line sonarjs/prefer-immediate-return */
  const contentBox = nullifyTransforms(el)

  if (isRtl) {
    contentBox.x += parseFloat(el.style.right || 0)
  } else {
    contentBox.x -= parseFloat(el.style.left || 0)
  }
  contentBox.y -= parseFloat(el.style.top || 0)

  // el.style.maxWidth = initialMaxWidth
  // el.style.maxHeight = initialMaxHeight
  // scrollables.forEach((position, el) => {
  //   el.scrollTo(...position)
  // })

  return contentBox
}

function connectedLocationStrategy (data: LocationStrategyData, props: StrategyProps, contentStyles: Ref<Record<string, string>>) {
  const activatorFixed = Array.isArray(data.target.value) || isFixedPosition(data.target.value)
  if (activatorFixed) {
    Object.assign(contentStyles.value, {
      position: 'fixed',
      top: 0,
      [data.isRtl.value ? 'right' : 'left']: 0,
    })
  }

  const { preferredAnchor, preferredOrigin } = destructComputed(() => {
    const parsedAnchor = parseAnchor(props.location, data.isRtl.value)
    const parsedOrigin =
      props.origin === 'overlap' ? parsedAnchor
      : props.origin === 'auto' ? flipSide(parsedAnchor)
      : parseAnchor(props.origin, data.isRtl.value)

    // Some combinations of props may produce an invalid origin
    if (parsedAnchor.side === parsedOrigin.side && parsedAnchor.align === flipAlign(parsedOrigin).align) {
      return {
        preferredAnchor: flipCorner(parsedAnchor),
        preferredOrigin: flipCorner(parsedOrigin),
      }
    } else {
      return {
        preferredAnchor: parsedAnchor,
        preferredOrigin: parsedOrigin,
      }
    }
  })

  const [minWidth, minHeight, maxWidth, maxHeight] =
    (['minWidth', 'minHeight', 'maxWidth', 'maxHeight'] as const).map(key => {
      return computed(() => {
        const val = parseFloat(props[key]!)
        return isNaN(val) ? Infinity : val
      })
    })

  const offset = computed(() => {
    if (Array.isArray(props.offset)) {
      return props.offset
    }
    if (typeof props.offset === 'string') {
      const offset = props.offset.split(' ').map(parseFloat)
      if (offset.length < 2) offset.push(0)
      return offset
    }
    return typeof props.offset === 'number' ? [props.offset, 0] : [0, 0]
  })

  let observe = false
  const observer = new ResizeObserver(() => {
    if (observe) updateLocation()
  })

  watch([data.target, data.contentEl], ([newTarget, newContentEl], [oldTarget, oldContentEl]) => {
    if (oldTarget && !Array.isArray(oldTarget)) observer.unobserve(oldTarget)
    if (newTarget && !Array.isArray(newTarget)) observer.observe(newTarget)

    if (oldContentEl) observer.unobserve(oldContentEl)
    if (newContentEl) observer.observe(newContentEl)
  }, {
    immediate: true,
  })

  onScopeDispose(() => {
    observer.disconnect()
  })

  // eslint-disable-next-line max-statements
  function updateLocation () {
    observe = false
    requestAnimationFrame(() => observe = true)

    if (!data.target.value || !data.contentEl.value) return

    const targetBox = getTargetBox(data.target.value)
    const contentBox = getIntrinsicSize(data.contentEl.value, data.isRtl.value)
    const scrollParents = getScrollParents(data.contentEl.value)
    const viewportMargin = 12

    if (!scrollParents.length) {
      scrollParents.push(document.documentElement)
      if (!(data.contentEl.value.style.top && data.contentEl.value.style.left)) {
        contentBox.x -= parseFloat(document.documentElement.style.getPropertyValue('--v-body-scroll-x') || 0)
        contentBox.y -= parseFloat(document.documentElement.style.getPropertyValue('--v-body-scroll-y') || 0)
      }
    }

    const viewport = scrollParents.reduce<Box>((box: Box | undefined, el) => {
      const rect = el.getBoundingClientRect()
      const scrollBox = new Box({
        x: el === document.documentElement ? 0 : rect.x,
        y: el === document.documentElement ? 0 : rect.y,
        width: el.clientWidth,
        height: el.clientHeight,
      })

      if (box) {
        return new Box({
          x: Math.max(box.left, scrollBox.left),
          y: Math.max(box.top, scrollBox.top),
          width: Math.min(box.right, scrollBox.right) - Math.max(box.left, scrollBox.left),
          height: Math.min(box.bottom, scrollBox.bottom) - Math.max(box.top, scrollBox.top),
        })
      }
      return scrollBox
    }, undefined!)
    viewport.x += viewportMargin
    viewport.y += viewportMargin
    viewport.width -= viewportMargin * 2
    viewport.height -= viewportMargin * 2

    let placement = {
      anchor: preferredAnchor.value,
      origin: preferredOrigin.value,
    }

    function checkOverflow (_placement: typeof placement) {
      const box = new Box(contentBox)
      const targetPoint = anchorToPoint(_placement.anchor, targetBox)
      const contentPoint = anchorToPoint(_placement.origin, box)

      let { x, y } = getOffset(targetPoint, contentPoint)

      switch (_placement.anchor.side) {
        case 'top': y -= offset.value[0]; break
        case 'bottom': y += offset.value[0]; break
        case 'left': x -= offset.value[0]; break
        case 'right': x += offset.value[0]; break
      }

      switch (_placement.anchor.align) {
        case 'top': y -= offset.value[1]; break
        case 'bottom': y += offset.value[1]; break
        case 'left': x -= offset.value[1]; break
        case 'right': x += offset.value[1]; break
      }

      box.x += x
      box.y += y

      box.width = Math.min(box.width, maxWidth.value)
      box.height = Math.min(box.height, maxHeight.value)

      const overflows = getOverflow(box, viewport)

      if (overflows) {
        return {
          overflows: {
            x: {
              before: 0,
              after: 0,
            },
            y: {
              before: 0,
              after: 0,
            },
          },
          x,
          y,
        }
      }

      return { overflows, x, y }
    }

    let x = 0; let y = 0
    const available = { x: 0, y: 0 }
    const flipped = { x: false, y: false }
    let resets = -1
    while (true) {
      if (resets++ > 10) {
        consoleError('Infinite loop detected in connectedLocationStrategy')
        break
      }

      const { x: _x, y: _y, overflows } = checkOverflow(placement)

      x += _x
      y += _y

      contentBox.x += _x
      contentBox.y += _y

      // flip
      {
        const axis = getAxis(placement.anchor)
        const hasOverflowX = overflows.x.before || overflows.x.after
        const hasOverflowY = overflows.y.before || overflows.y.after

        let reset = false
        ;['x', 'y'].forEach(key => {
          if (
            (key === 'x' && hasOverflowX && !flipped.x) ||
            (key === 'y' && hasOverflowY && !flipped.y)
          ) {
            const newPlacement = { anchor: { ...placement.anchor }, origin: { ...placement.origin } }
            const flip = key === 'x'
              ? axis === 'y' ? flipAlign : flipSide
              : axis === 'y' ? flipSide : flipAlign
            newPlacement.anchor = flip(newPlacement.anchor)
            newPlacement.origin = flip(newPlacement.origin)
            const { overflows: newOverflows } = checkOverflow(newPlacement)
            if (
              (newOverflows[key].before <= overflows[key].before &&
                newOverflows[key].after <= overflows[key].after) ||
              (newOverflows[key].before + newOverflows[key].after <
                (overflows[key].before + overflows[key].after) / 2)
            ) {
              placement = newPlacement
              reset = flipped[key] = true
            }
          }
        })
        if (reset) continue
      }

      // shift
      if (overflows.x.before) {
        x += overflows.x.before
        contentBox.x += overflows.x.before
      }
      if (overflows.x.after) {
        x -= overflows.x.after
        contentBox.x -= overflows.x.after
      }
      if (overflows.y.before) {
        y += overflows.y.before
        contentBox.y += overflows.y.before
      }
      if (overflows.y.after) {
        y -= overflows.y.after
        contentBox.y -= overflows.y.after
      }

      // size
      {
        const overflows = getOverflow(contentBox, viewport)
        available.x = viewport.width - overflows.x.before - overflows.x.after
        available.y = viewport.height - overflows.y.before - overflows.y.after

        x += overflows.x.before
        contentBox.x += overflows.x.before
        y += overflows.y.before
        contentBox.y += overflows.y.before
      }

      break
    }

    const axis = getAxis(placement.anchor)

    Object.assign(contentStyles.value, {
      '--v-overlay-anchor-origin': `${placement.anchor.side} ${placement.anchor.align}`,
      transformOrigin: `${placement.origin.side} ${placement.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: convertToUnit(pixelRound(y)),
      left: data.isRtl.value ? undefined : convertToUnit(pixelRound(x)),
      right: data.isRtl.value ? convertToUnit(pixelRound(-x)) : undefined,
      minWidth: convertToUnit(axis === 'y' ? Math.min(minWidth.value, targetBox.width) : minWidth.value),
      maxWidth: convertToUnit(pixelCeil(clamp(available.x, minWidth.value === Infinity ? 0 : minWidth.value, maxWidth.value))),
      maxHeight: convertToUnit(pixelCeil(clamp(available.y, minHeight.value === Infinity ? 0 : minHeight.value, maxHeight.value))),
    })

    return {
      available,
      contentBox,
    }
  }

  watch(
    () => [
      preferredAnchor.value,
      preferredOrigin.value,
      props.offset,
      props.minWidth,
      props.minHeight,
      props.maxWidth,
      props.maxHeight,
    ],
    () => updateLocation(),
  )

  nextTick(() => {
    const result = updateLocation()

    // TODO: overflowing content should only require a single updateLocation call
    // Icky hack to make sure the content is positioned consistently
    if (!result) return
    const { available, contentBox } = result
    if (contentBox.height > available.y) {
      requestAnimationFrame(() => {
        updateLocation()
        requestAnimationFrame(() => {
          updateLocation()
        })
      })
    }
  })

  return { updateLocation }
}

function featureDiscoveryLocationStrategy (data: LocationStrategyData, props: StrategyProps, contentStyles: Ref<Record<string, string>>) {
  const activatorFixed = Array.isArray(data.target.value) || isFixedPosition(data.target.value)
  if (activatorFixed) {
    Object.assign(contentStyles.value, {
      position: 'fixed',
      top: 0,
      [data.isRtl.value ? 'right' : 'left']: 0,
    })
  }

  const { preferredAnchor, preferredOrigin } = destructComputed(() => {
    const parsedAnchor = parseAnchor(props.location, data.isRtl.value)
    const parsedOrigin =
      props.origin === 'overlap' ? parsedAnchor
      : props.origin === 'auto' ? flipSide(parsedAnchor)
      : parseAnchor(props.origin, data.isRtl.value)

    // Some combinations of props may produce an invalid origin
    if (parsedAnchor.side === parsedOrigin.side && parsedAnchor.align === flipAlign(parsedOrigin).align) {
      return {
        preferredAnchor: flipCorner(parsedAnchor),
        preferredOrigin: flipCorner(parsedOrigin),
      }
    } else {
      return {
        preferredAnchor: parsedAnchor,
        preferredOrigin: parsedOrigin,
      }
    }
  })

  const [minWidth, minHeight, maxWidth, maxHeight] =
    (['minWidth', 'minHeight', 'maxWidth', 'maxHeight'] as const).map(key => {
      return computed(() => {
        const val = parseFloat(props[key]!)
        return isNaN(val) ? Infinity : val
      })
    })

  const offset = computed(() => {
    if (Array.isArray(props.offset)) {
      return props.offset
    }
    if (typeof props.offset === 'string') {
      const offset = props.offset.split(' ').map(parseFloat)
      if (offset.length < 2) offset.push(0)
      return offset
    }
    return typeof props.offset === 'number' ? [props.offset, 0] : [0, 0]
  })

  let observe = false
  const observer = new ResizeObserver(() => {
    if (observe) updateLocation()
  })

  watch([data.target, data.contentEl], ([newTarget, newContentEl], [oldTarget, oldContentEl]) => {
    if (oldTarget && !Array.isArray(oldTarget)) observer.unobserve(oldTarget)
    if (newTarget && !Array.isArray(newTarget)) observer.observe(newTarget)

    if (oldContentEl) observer.unobserve(oldContentEl)
    if (newContentEl) observer.observe(newContentEl)
  }, {
    immediate: true,
  })

  onScopeDispose(() => {
    observer.disconnect()
  })

  // eslint-disable-next-line max-statements
  function updateLocation () {
    observe = false
    requestAnimationFrame(() => observe = true)

    if (!data.target.value || !data.contentEl.value) return

    const targetBox = getTargetBox(data.target.value)
    const contentBox = getIntrinsicSize(data.contentEl.value, data.isRtl.value)
    const scrollParents = getScrollParents(data.contentEl.value)
    const viewportMargin = 0

    const viewport = scrollParents.reduce<Box>((box: Box | undefined, el) => {
      const rect = el.getBoundingClientRect()
      const scrollBox = new Box({
        x: el === document.documentElement ? 0 : rect.x,
        y: el === document.documentElement ? 0 : rect.y,
        width: el.clientWidth,
        height: el.clientHeight,
      })

      if (box) {
        return new Box({
          x: Math.max(box.left, scrollBox.left),
          y: Math.max(box.top, scrollBox.top),
          width: Math.min(box.right, scrollBox.right) - Math.max(box.left, scrollBox.left),
          height: Math.min(box.bottom, scrollBox.bottom) - Math.max(box.top, scrollBox.top),
        })
      }
      return scrollBox
    }, undefined!)
    viewport.x += viewportMargin
    viewport.y += viewportMargin
    viewport.width -= viewportMargin * 2
    viewport.height -= viewportMargin * 2

    // Position checks
    // For tap targets located within the top or bottom (144dp) or left or right (200dp) screen edge,
    // center the prompt background around the tap target, above other elements.
    const edgeX = 200
    const edgeY = 144
    const isOnEdgeLeft = targetBox.left <= parseFloat(edgeX)
    const isOnEdgeRight = targetBox.left >= viewport.width - parseFloat(edgeX)
    const isOnEdgeX = isOnEdgeLeft || isOnEdgeRight
    const isOnEdgeTop = targetBox.top <= parseFloat(edgeY)
    const isOnEdgeBottom = targetBox.top >= viewport.height - parseFloat(edgeY)
    const isOnEdgeY = isOnEdgeTop || isOnEdgeBottom
    const isOnEdge = isOnEdgeX || isOnEdgeY

    // "Backdrop" is the outermost circle, with a background color
    // "Highlight" is the hole inside the "Backdrop"

    const minHighlightPadding = 20
    const contentWidth = 280

    const highlightInnerSize = (() => {
      // Allow non fabs elements while keeping the size ratio 88:56
      const ratio = 11 / 7
      const minSize = 56 * ratio
      const { width, height } = targetBox
      const size = Math.max(height, width) * ratio
      return Math.max(size, minSize)
    })()

    // Allow non fabs elements while keeping the padding ratio 88:20
    const highlightPadding = Math.max(highlightInnerSize / 4.4, minHighlightPadding)

    const defaultPadding = highlightPadding * 2

    const highlightOuterSize = highlightInnerSize + defaultPadding

    const computedWrapWidth = parseFloat(contentWidth) + 2 * defaultPadding

    const computedWrapOffsetLeft = (() => {
      const halfWidth = computedWrapWidth / 2 - defaultPadding
      if (isOnEdgeLeft) return halfWidth
      if (isOnEdgeRight) return -1 * halfWidth
      const isLeft = targetBox.x < viewport.width / 2
      return isLeft ? highlightPadding : -1 * highlightPadding
    })()

    const desktopBackdropMeasures = (function measureDesktopBackdrop (): CircleObject {
      // Both inner and outer circle should touch (be tangent) to each other
      //
      // Backdrop size is calculated using 5 points
      //   and has 2 possible solutions:
      // - Any option: the upper point on the inner circle
      //   that touches (is tangent) to the outer circle, where:
      //   - X starts with the center of the inner circle
      //   - Y starts with the inner circle radius + padding
      //   - both X and Y are rotated/rolled/angled using the cycloid curve,
      //     depending on the inner circle positioning (left, center, right)
      // - Option A: the upper two points of the inner
      //     content rectangle wrapper
      // - Option B: the bottom two points of the inner
      //     content rectangle wrapper
      // The larger size solution is used so that all the content
      //   will be contained within the backdrop
      //
      // X is 0 on the leftmost point, but it could be any other
      const x = contentBox.width / 2 - defaultPadding
      // Calculate the circles tangent point for option A, where A(ax, ay) using cycloid curve
      // Point A(ax, ay):
      // Get inner circle (highlight) radius with padding
      const radius = highlightOuterSize / 2
      // Get rolled distance/perimeter
      const diameter = -1 * computedWrapOffsetLeft
      // Calculate rolled angle
      const t = diameter / (2 * radius)
      // Calculate the tangent point
      // using the inner circle's bottom center point as origin
      let ax = radius * Math.sin(t)
      let ay = radius * (1 + Math.cos(t))

      // Move the origin to the rectangle top left absolute position
      ax += x + diameter

      // Point B(ax, ay):
      // Calculate backdrop central point B(x, by) and radius (br)
      const by = (Math.pow(ax, 2) - (2 * ax * x) + Math.pow(ay, 2)) / (2 * ay)
      const br = Math.hypot(x, by)

      // Move origin to the rectangle bottom left absolute position
      ay += contentBox.height
      // Calculate backdrop central point C(x, cy) and radius (cr)
      const cy = (Math.pow(ax, 2) - (2 * ax * x) + Math.pow(ay, 2)) / (2 * ay)
      const cr = Math.hypot(x, cy)

      // Returns the larger backdrop solution
      if (br > cr) {
        return {
          x,
          y: by,
          r: br,
          size: 2 * (br + defaultPadding),
        }
      }

      return {
        x,
        y: cy - contentBox.height,
        r: cr,
        size: 2 * (cr + defaultPadding),
      }
    })()

    const backdropSize = (() => {
      if (!isOnEdge) return desktopBackdropMeasures.size
      const { width: w, height: h } = contentBox
      let width = w - 2 * defaultPadding
      if (!isOnEdgeX) {
        width = width / 2
      }
      const height = highlightOuterSize / 2 + h
      return 2 * (Math.hypot(width, height) + defaultPadding)
    })()

    const computedBackdropOffsetLeft = isOnEdge ? 0 : computedWrapOffsetLeft
    const computedBackdropOffsetTop = isOnEdge ? 0 : (-1 * desktopBackdropMeasures.y) + highlightInnerSize - highlightPadding

    const backdropStyle = (() => {
      const size = backdropSize
      const top = -backdropSize / 2 + computedBackdropOffsetTop
      const left = -backdropSize / 2 + computedBackdropOffsetLeft
      const originLeft = computedBackdropOffsetLeft < 0
        ? `calc(50% + ${convertToUnit(-1 * computedBackdropOffsetLeft)})`
        : `calc(50% - ${convertToUnit(computedBackdropOffsetLeft)})`
      const originTop = computedBackdropOffsetTop < 0
        ? `calc(50% + ${convertToUnit(-1 * computedBackdropOffsetTop)})`
        : `calc(50% - ${convertToUnit(computedBackdropOffsetTop)})`

      return {
        top: convertToUnit(top),
        left: convertToUnit(left),
        height: convertToUnit(size),
        width: convertToUnit(size),
        transformOrigin: `${originLeft} ${originTop}`,
      }
    })()

    const highlightStyle = (() => {
      const size = convertToUnit(highlightInnerSize)
      const halfSize = convertToUnit((-1 * highlightInnerSize) / 2)

      return {
        top: halfSize,
        left: halfSize,
        height: size,
        width: size,
      }
    })()

    const wrapStyle = (() => {
      let top = highlightOuterSize / 2
      if (isOnEdgeBottom) {
        top = (-1 * top) - contentBox.height
      }
      let left = (-1 * computedWrapWidth) / 2
      if (isOnEdgeX || !isOnEdgeY) {
        left += computedWrapOffsetLeft
      }

      return {
        top: convertToUnit(top),
        left: convertToUnit(left),
        height: 'auto',
        width: convertToUnit(computedWrapWidth),
        padding: `0 ${convertToUnit(defaultPadding)}`,
      }
    })()

    if (!scrollParents.length) {
      scrollParents.push(document.documentElement)
      if (!(data.contentEl.value.style.top && data.contentEl.value.style.left)) {
        contentBox.x -= parseFloat(document.documentElement.style.getPropertyValue('--v-body-scroll-x') || 0)
        contentBox.y -= parseFloat(document.documentElement.style.getPropertyValue('--v-body-scroll-y') || 0)
      }
    }

    let placement = {
      anchor: preferredAnchor.value,
      origin: preferredOrigin.value,
    }

    function checkOverflow (_placement: typeof placement) {
      const box = new Box(contentBox)
      const targetPoint = anchorToPoint(_placement.anchor, targetBox)
      const contentPoint = anchorToPoint(_placement.origin, box)

      let { x, y } = getOffset(targetPoint, contentPoint)

      switch (_placement.anchor.side) {
        case 'top': y -= offset.value[0]; break
        case 'bottom': y += offset.value[0]; break
        case 'left': x -= offset.value[0]; break
        case 'right': x += offset.value[0]; break
      }

      switch (_placement.anchor.align) {
        case 'top': y -= offset.value[1]; break
        case 'bottom': y += offset.value[1]; break
        case 'left': x -= offset.value[1]; break
        case 'right': x += offset.value[1]; break
      }

      const overflows = {
        x: {
          before: 0,
          after: 0,
        },
        y: {
          before: 0,
          after: 0,
        },
      }

      return { overflows, x, y }
    }

    let x = 0; let y = 0
    const available = { x: 0, y: 0 }
    const flipped = { x: false, y: false }
    let resets = -1
    while (true) {
      if (resets++ > 10) {
        consoleError('Infinite loop detected in featureDiscoveryLocationStrategy')
        break
      }

      const { x: _x, y: _y, overflows } = checkOverflow(placement)

      x += _x
      y += _y

      contentBox.x += _x
      contentBox.y += _y

      // flip
      {
        const axis = getAxis(placement.anchor)
        const hasOverflowX = overflows.x.before || overflows.x.after
        const hasOverflowY = overflows.y.before || overflows.y.after

        let reset = false
        ;['x', 'y'].forEach(key => {
          if (
            (key === 'x' && hasOverflowX && !flipped.x) ||
            (key === 'y' && hasOverflowY && !flipped.y)
          ) {
            const newPlacement = { anchor: { ...placement.anchor }, origin: { ...placement.origin } }
            const flip = key === 'x'
              ? axis === 'y' ? flipAlign : flipSide
              : axis === 'y' ? flipSide : flipAlign
            newPlacement.anchor = flip(newPlacement.anchor)
            newPlacement.origin = flip(newPlacement.origin)
            const { overflows: newOverflows } = checkOverflow(newPlacement)
            if (
              (newOverflows[key].before <= overflows[key].before &&
              newOverflows[key].after <= overflows[key].after) ||
            (newOverflows[key].before + newOverflows[key].after <
              (overflows[key].before + overflows[key].after) / 2)
            ) {
              placement = newPlacement
              reset = flipped[key] = true
            }
          }
        })
        if (reset) continue
      }

      // shift
      if (overflows.x.before) {
        x += overflows.x.before
        contentBox.x += overflows.x.before
      }
      if (overflows.x.after) {
        x -= overflows.x.after
        contentBox.x -= overflows.x.after
      }
      if (overflows.y.before) {
        y += overflows.y.before
        contentBox.y += overflows.y.before
      }
      if (overflows.y.after) {
        y -= overflows.y.after
        contentBox.y -= overflows.y.after
      }

      break
    }

    const axis = getAxis(placement.anchor)

    Object.assign(contentStyles.value, {
      '--v-overlay-anchor-origin': `${placement.anchor.side} ${placement.anchor.align}`,
      transformOrigin: `${placement.origin.side} ${placement.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: convertToUnit(pixelRound(y)),
      left: data.isRtl.value ? undefined : convertToUnit(pixelRound(x)),
      right: data.isRtl.value ? convertToUnit(pixelRound(-x)) : undefined,
      minWidth: convertToUnit(axis === 'y' ? Math.min(minWidth.value, targetBox.width) : minWidth.value),
      maxWidth: convertToUnit(pixelCeil(clamp(available.x, minWidth.value === Infinity ? 0 : minWidth.value, maxWidth.value))),
      maxHeight: convertToUnit(pixelCeil(clamp(available.y, minHeight.value === Infinity ? 0 : minHeight.value, maxHeight.value))),
    })

    return {
      available,
      contentBox,
    }
  }

  watch(
    () => [
      preferredAnchor.value,
      preferredOrigin.value,
      props.offset,
      props.minWidth,
      props.minHeight,
      props.maxWidth,
      props.maxHeight,
    ],
    () => updateLocation(),
  )

  nextTick(() => {
    const result = updateLocation()

    // TODO: overflowing content should only require a single updateLocation call
    // Icky hack to make sure the content is positioned consistently
    if (!result) return
    const { available, contentBox } = result
    if (contentBox.height > available.y) {
      requestAnimationFrame(() => {
        updateLocation()
        requestAnimationFrame(() => {
          updateLocation()
        })
      })
    }
  })

  return { updateLocation }
}

function pixelRound (val: number) {
  return Math.round(val * devicePixelRatio) / devicePixelRatio
}

function pixelCeil (val: number) {
  return Math.ceil(val * devicePixelRatio) / devicePixelRatio
}
