// Composables
import { useToggleScope } from '@/composables/toggleScope'

// Utilities
import { computed, nextTick, onScopeDispose, ref, watch } from 'vue'
import { anchorToPoint, getOffset } from './util/point'
import {
  clamp,
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

export interface LocationStrategyData {
  contentEl: Ref<HTMLElement | undefined>
  target: Ref<HTMLElement | [x: number, y: number] | undefined>
  isActive: Ref<boolean>
  isRtl: Ref<boolean>
}

export type LocationStrategyFunction = (
  data: LocationStrategyData,
  props: StrategyProps,
  contentStyles: Ref<Record<string, string>>
) => undefined | { updateLocation: (e?: Event) => void }

const locationStrategies = {
  static: staticLocationStrategy, // specific viewport position, usually centered
  connected: connectedLocationStrategy, // connected to a certain element
}

export interface StrategyProps {
  locationStrategy: keyof typeof locationStrategies | LocationStrategyFunction
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
  // Prevents infinite loop
  let retries = 0

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
    // Reset retry on close component
    retries = 0
  })

  // eslint-disable-next-line max-statements
  function updateLocation () {
    retries++
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

      return { overflows, x, y }
    }

    let x = 0; let y = 0
    const flipped = { x: false, y: false }
    const available = { x: 0, y: 0 }

    // eslint-disable-next-line no-unmodified-loop-condition
    while (retries < 4) {
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
      top: y !== 0 && convertToUnit(pixelRound(y)),
      left: data.isRtl.value ? undefined : x !== 0 && convertToUnit((x)),
      right: data.isRtl.value ? x !== 0 && convertToUnit(pixelRound(-x)) : undefined,
      minWidth: convertToUnit(axis === 'y' ? Math.min(minWidth.value, targetBox.width) : minWidth.value),
      maxWidth: available.x > 0 &&
        convertToUnit(pixelCeil(clamp(
          available.x, minWidth.value === Infinity
            ? 0
            : minWidth.value, maxWidth.value))
        ),
      maxHeight: available.y > 0 &&
        convertToUnit(pixelCeil(clamp(
          available.y, minHeight.value === Infinity
            ? 0
            : minHeight.value, maxHeight.value))
        ),
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

  nextTick(() => updateLocation())

  return { updateLocation }
}

function pixelRound (val: number) {
  return Math.round(val * devicePixelRatio) / devicePixelRatio
}

function pixelCeil (val: number) {
  return Math.ceil(val * devicePixelRatio) / devicePixelRatio
}
