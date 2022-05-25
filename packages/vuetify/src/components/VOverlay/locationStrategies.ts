// Utilities
import { computed, effectScope, nextTick, onScopeDispose, ref, watch, watchEffect } from 'vue'
import { convertToUnit, getScrollParent, IN_BROWSER, isFixedPosition, nullifyTransforms, propsFactory } from '@/util'
import { oppositeAnchor, parseAnchor, physicalAnchor } from './util/anchor'
import { anchorToPoint, getOffset } from './util/point'

// Types
import type { EffectScope, PropType, Ref } from 'vue'
import type { Anchor } from './util/anchor'
import { Box } from '@/util/box'

export interface LocationStrategyData {
  contentEl: Ref<HTMLElement | undefined>
  activatorEl: Ref<HTMLElement | undefined>
  isActive: Ref<boolean>
}

const locationStrategies = {
  static: staticLocationStrategy, // specific viewport position, usually centered
  connected: connectedLocationStrategy, // connected to a certain element
}

export interface StrategyProps {
  locationStrategy: keyof typeof locationStrategies | (
    (
      data: LocationStrategyData,
      props: StrategyProps,
      contentStyles: Ref<Record<string, string>>
    ) => undefined | { updateLocation: (e: Event) => void }
  )
  location: Anchor
  origin: Anchor | 'auto' | 'overlap'
  offset?: number | string
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
  offset: [Number, String],
})

export function useLocationStrategies (
  props: StrategyProps,
  data: LocationStrategyData
) {
  const contentStyles = ref({})
  const updateLocation = ref<(e: Event) => void>()

  let scope: EffectScope | undefined
  watchEffect(async () => {
    scope?.stop()
    updateLocation.value = undefined

    if (!(IN_BROWSER && data.isActive.value && props.locationStrategy)) return

    scope = effectScope()
    await nextTick()
    scope.run(() => {
      if (typeof props.locationStrategy === 'function') {
        updateLocation.value = props.locationStrategy(data, props, contentStyles)?.updateLocation
      } else {
        updateLocation.value = locationStrategies[props.locationStrategy](data, props, contentStyles)?.updateLocation
      }
    })
  })

  IN_BROWSER && window.addEventListener('resize', onResize, { passive: true })

  onScopeDispose(() => {
    IN_BROWSER && window.removeEventListener('resize', onResize)
    updateLocation.value = undefined
    scope?.stop()
  })

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

function connectedLocationStrategy (data: LocationStrategyData, props: StrategyProps, contentStyles: Ref<Record<string, string>>) {
  const activatorFixed = isFixedPosition(data.activatorEl.value)
  if (activatorFixed) {
    Object.assign(contentStyles.value, {
      position: 'fixed',
    })
  }

  const preferredAnchor = computed(() => parseAnchor(props.location))
  const preferredOrigin = computed(() =>
    props.origin === 'overlap' ? preferredAnchor.value
    : props.origin === 'auto' ? oppositeAnchor(preferredAnchor.value)
    : parseAnchor(props.origin)
  )
  const doesOverlap = computed(() => {
    return preferredAnchor.value.side === preferredOrigin.value.side
  })

  const configuredMaxHeight = computed(() => {
    const val = parseFloat(props.maxHeight!)
    return isNaN(val) ? Infinity : val
  })

  const configuredMinWidth = computed(() => {
    const val = parseFloat(props.minWidth!)
    return isNaN(val) ? Infinity : val
  })

  let observe = false
  if (IN_BROWSER) {
    const observer = new ResizeObserver(() => {
      if (observe) updateLocation()
    })
    observer.observe(data.activatorEl.value!)
    observer.observe(data.contentEl.value!)

    onScopeDispose(() => {
      observer.disconnect()
    })
  }

  // eslint-disable-next-line max-statements
  function updateLocation () {
    observe = false
    requestAnimationFrame(() => {
      requestAnimationFrame(() => observe = true)
    })

    const targetBox = data.activatorEl.value!.getBoundingClientRect()
    // TODO: offset shouldn't affect width
    if (props.offset) {
      targetBox.x -= +props.offset
      targetBox.y -= +props.offset
      targetBox.width += +props.offset * 2
      targetBox.height += +props.offset * 2
    }

    const scrollParent = getScrollParent(data.contentEl.value)
    const viewportWidth = scrollParent.clientWidth
    const viewportHeight = Math.min(scrollParent.clientHeight, window.innerHeight)

    let contentBox
    {
      const scrollables = new Map<Element, [number, number]>()
      data.contentEl.value!.querySelectorAll('*').forEach(el => {
        const x = el.scrollLeft
        const y = el.scrollTop
        if (x || y) {
          scrollables.set(el, [x, y])
        }
      })

      const initialMaxWidth = data.contentEl.value!.style.maxWidth
      const initialMaxHeight = data.contentEl.value!.style.maxHeight
      data.contentEl.value!.style.removeProperty('max-width')
      data.contentEl.value!.style.removeProperty('max-height')

      contentBox = nullifyTransforms(data.contentEl.value!)
      contentBox.x -= parseFloat(data.contentEl.value!.style.left) || 0
      contentBox.y -= parseFloat(data.contentEl.value!.style.top) || 0

      data.contentEl.value!.style.maxWidth = initialMaxWidth
      data.contentEl.value!.style.maxHeight = initialMaxHeight
      scrollables.forEach((position, el) => {
        el.scrollTo(...position)
      })
    }

    const contentHeight = Math.min(configuredMaxHeight.value, contentBox.height)

    // Regard undefined maxWidth as maximally occupying whole remaining space by default
    const maxFreeSpaceWidth = props.maxWidth === undefined ? Number.MAX_VALUE : parseInt(props.maxWidth ?? 0, 10)

    const viewportMargin = 12
    const freeSpace = {
      top: targetBox.top - viewportMargin,
      bottom: viewportHeight - targetBox.bottom - viewportMargin,
      left: Math.min(targetBox.left - viewportMargin, maxFreeSpaceWidth),
      right: Math.min(viewportWidth - targetBox.right - viewportMargin, maxFreeSpaceWidth),
    }

    const fitsY = (preferredAnchor.value.side === 'bottom' && contentHeight <= freeSpace.bottom) ||
      (preferredAnchor.value.side === 'top' && contentHeight <= freeSpace.top)

    const anchor = fitsY ? preferredAnchor.value
      : (preferredAnchor.value.side === 'bottom' && freeSpace.top > freeSpace.bottom) ||
      (preferredAnchor.value.side === 'top' && freeSpace.bottom > freeSpace.top) ? oppositeAnchor(preferredAnchor.value)
      : preferredAnchor.value
    const origin = fitsY ? preferredOrigin.value : oppositeAnchor(anchor)

    const canFill = doesOverlap.value || ['center', 'top', 'bottom'].includes(anchor.side)

    const maxWidth = canFill ? Math.min(viewportWidth, Math.max(targetBox.width, viewportWidth - viewportMargin * 2))
      : anchor.side === 'end' ? freeSpace.right
      : anchor.side === 'start' ? freeSpace.left
      : null
    const minWidth = Math.min(configuredMinWidth.value, maxWidth!, targetBox.width)
    const maxHeight = fitsY ? configuredMaxHeight.value : Math.min(
      configuredMaxHeight.value,
      Math.floor(anchor.side === 'top' ? freeSpace.top : freeSpace.bottom)
    )

    const targetPoint = anchorToPoint(anchor, targetBox)
    const contentPoint = anchorToPoint(origin, new Box({
      ...contentBox,
      height: Math.min(contentHeight, maxHeight),
    }))

    const { x, y } = getOffset(targetPoint, contentPoint)

    Object.assign(contentStyles.value, {
      '--v-overlay-anchor-origin': physicalAnchor(anchor, data.activatorEl.value!),
      top: convertToUnit(Math.round(y)),
      left: convertToUnit(Math.round(x)), // TODO: right for origin="end", rtl
      transformOrigin: physicalAnchor(origin, data.activatorEl.value!),
      minWidth: convertToUnit(minWidth),
      maxWidth: convertToUnit(maxWidth),
      maxHeight: convertToUnit(maxHeight),
    })
  }

  watch(
    () => [preferredAnchor.value, preferredOrigin.value, props.offset],
    () => updateLocation(),
    { immediate: !activatorFixed }
  )

  if (activatorFixed) nextTick(() => updateLocation())
  requestAnimationFrame(() => {
    if (contentStyles.value.maxHeight) updateLocation()
  })

  return { updateLocation }
}
