// Utilities
import { computed, effectScope, nextTick, onScopeDispose, ref, watch, watchEffect } from 'vue'
import { convertToUnit, getScrollParent, IN_BROWSER, isFixedPosition, nullifyTransforms, propsFactory } from '@/util'
import { oppositeAnchor, parseAnchor, physicalAnchor } from './util/anchor'
import { anchorToPoint, getOffset } from './util/point'

// Types
import type { EffectScope, PropType, Ref } from 'vue'
import type { Anchor } from './util/anchor'
import { Box } from '@/util/box'

export interface PositionStrategyData {
  contentEl: Ref<HTMLElement | undefined>
  activatorEl: Ref<HTMLElement | undefined>
  isActive: Ref<boolean>
}

const positionStrategies = {
  static: staticPositionStrategy, // specific viewport position, usually centered
  connected: connectedPositionStrategy, // connected to a certain element
}

export interface StrategyProps {
  positionStrategy: keyof typeof positionStrategies | (
    (
      data: PositionStrategyData,
      props: StrategyProps,
      contentStyles: Ref<Dictionary<string>>
    ) => undefined | { updatePosition: (e: Event) => void }
  )
  anchor: Anchor
  origin: Anchor | 'auto' | 'overlap'
  offset?: number | string
  maxHeight?: number | string
  maxWidth?: number | string
  minHeight?: number | string
  minWidth?: number | string
}

export const makePositionStrategyProps = propsFactory({
  positionStrategy: {
    type: [String, Function] as PropType<StrategyProps['positionStrategy']>,
    default: 'static',
    validator: (val: any) => typeof val === 'function' || val in positionStrategies,
  },
  anchor: {
    type: String as PropType<StrategyProps['anchor']>,
    default: 'bottom',
  },
  origin: {
    type: String as PropType<StrategyProps['origin']>,
    default: 'auto',
  },
  offset: [Number, String],
})

export function usePositionStrategies (
  props: StrategyProps,
  data: PositionStrategyData
) {
  const contentStyles = ref({})
  const updatePosition = ref<(e: Event) => void>()

  let scope: EffectScope | undefined
  watchEffect(async () => {
    scope?.stop()
    updatePosition.value = undefined

    if (!(IN_BROWSER && data.isActive.value && props.positionStrategy)) return

    scope = effectScope()
    await nextTick()
    scope.run(() => {
      if (typeof props.positionStrategy === 'function') {
        updatePosition.value = props.positionStrategy(data, props, contentStyles)?.updatePosition
      } else {
        updatePosition.value = positionStrategies[props.positionStrategy](data, props, contentStyles)?.updatePosition
      }
    })
  })

  IN_BROWSER && window.addEventListener('resize', onResize, { passive: true })

  onScopeDispose(() => {
    IN_BROWSER && window.removeEventListener('resize', onResize)
    updatePosition.value = undefined
    scope?.stop()
  })

  function onResize (e: Event) {
    updatePosition.value?.(e)
  }

  return {
    contentStyles,
    updatePosition,
  }
}

function staticPositionStrategy () {
  // TODO
}

function connectedPositionStrategy (data: PositionStrategyData, props: StrategyProps, contentStyles: Ref<Dictionary<string>>) {
  const activatorFixed = isFixedPosition(data.activatorEl.value)
  if (activatorFixed) {
    Object.assign(contentStyles.value, {
      position: 'fixed',
    })
  }

  const preferredAnchor = computed(() => parseAnchor(props.anchor))
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
  const observer = new ResizeObserver(() => {
    if (observe) updatePosition()
  })
  observer.observe(data.activatorEl.value!)
  observer.observe(data.contentEl.value!)

  onScopeDispose(() => {
    observer.disconnect()
  })

  // eslint-disable-next-line max-statements
  function updatePosition () {
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

    const viewportMargin = 12
    const freeSpace = {
      top: targetBox.top - viewportMargin,
      bottom: viewportHeight - targetBox.bottom - viewportMargin,
      left: targetBox.left - viewportMargin,
      right: viewportWidth - targetBox.right - viewportMargin,
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
    () => updatePosition(),
    { immediate: !activatorFixed }
  )

  if (activatorFixed) nextTick(() => updatePosition())
  requestAnimationFrame(() => {
    if (contentStyles.value.maxHeight) updatePosition()
  })

  return { updatePosition }
}
