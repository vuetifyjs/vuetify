// Utilities
import { computed, effectScope, nextTick, onScopeDispose, ref, watch, watchEffect } from 'vue'
import { convertToUnit, getScrollParent, isFixedPosition, nullifyTransforms, propsFactory } from '@/util'
import { oppositeAnchor, parseAnchor, physicalAnchor } from './util/anchor'
import { anchorToPoint, getOffset } from './util/point'

// Types
import type { EffectScope, PropType, Ref } from 'vue'
import type { Anchor } from './util/anchor'

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
  offset?: string
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
  offset: String,
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

    if (!(data.isActive.value && props.positionStrategy)) return

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

  window.addEventListener('resize', onResize, { passive: true })

  onScopeDispose(() => {
    window.removeEventListener('resize', onResize)
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

  const hasMaxWidth = false

  watch(
    () => [preferredAnchor.value, preferredOrigin.value],
    () => updatePosition(),
    { immediate: !activatorFixed }
  )

  if (activatorFixed) nextTick(() => updatePosition())
  requestAnimationFrame(() => {
    if (contentStyles.value.maxHeight) updatePosition()
  })

  // eslint-disable-next-line max-statements
  function updatePosition () {
    let contentBox
    if (hasMaxWidth) {
      const initialMaxWidth = data.activatorEl.value!.style.maxWidth
      data.activatorEl.value!.style.removeProperty('maxWidth')
      contentBox = nullifyTransforms(data.contentEl.value!)
      data.activatorEl.value!.style.maxWidth = initialMaxWidth
    } else {
      contentBox = nullifyTransforms(data.contentEl.value!)
    }
    const targetBox = data.activatorEl.value!.getBoundingClientRect()
    const contentHeight = Math.min(
      configuredMaxHeight.value,
      [...data.contentEl.value!.children].reduce((acc, el) => acc + el.scrollHeight, 0)
    )

    const scrollParent = getScrollParent(data.contentEl.value)
    const viewportWidth = scrollParent.clientWidth
    const viewportHeight = Math.min(scrollParent.clientHeight, window.innerHeight)

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
    const minWidth = Math.min(maxWidth!, targetBox.width)
    const maxHeight = fitsY ? configuredMaxHeight.value : Math.min(
      configuredMaxHeight.value,
      viewportHeight - viewportMargin * 2,
      Math.floor(anchor.side === 'top' ? freeSpace.top : freeSpace.bottom)
    )

    // TODO
    // if (maxWidth) hasMaxWidth = true

    const targetPoint = anchorToPoint(anchor, targetBox)
    const contentPoint = anchorToPoint(origin, {
      ...contentBox,
      height: Math.min(contentHeight, maxHeight),
    })

    const { x, y } = getOffset(targetPoint, contentPoint)

    Object.assign(contentStyles.value, {
      transform: `translate(${Math.round(x)}px, ${Math.round(y)}px)`,
      transformOrigin: physicalAnchor(origin, data.activatorEl.value!),
      minWidth: convertToUnit(minWidth),
      maxWidth: convertToUnit(maxWidth),
      maxHeight: convertToUnit(maxHeight),
    })
  }

  return { updatePosition }
}
