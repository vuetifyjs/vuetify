// Utilities
import { computed, effectScope, nextTick, onScopeDispose, ref, watch, watchEffect } from 'vue'
import { convertToUnit, nullifyTransforms, propsFactory } from '@/util'
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
    (data: PositionStrategyData, props: StrategyProps, contentStyles: Ref<{}>) => undefined | { updatePosition: (e: Event) => void }
  )
  anchor: Anchor
  origin: Anchor | 'auto' | 'overlap'
  offset?: string
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

function connectedPositionStrategy (data: PositionStrategyData, props: StrategyProps, contentStyles: Ref<{}>) {
  const anchor = computed(() => parseAnchor(props.anchor))
  const origin = computed(() =>
    props.origin === 'overlap' ? anchor.value
    : props.origin === 'auto' ? oppositeAnchor(anchor.value)
    : parseAnchor(props.origin)
  )
  const doesOverlap = computed(() => {
    return anchor.value.side === origin.value.side
  })

  watch(
    () => [anchor.value, origin.value],
    () => updatePosition(),
    { immediate: true }
  )

  function updatePosition () {
    const targetBox = data.activatorEl.value!.getBoundingClientRect()
    const contentBox = nullifyTransforms(data.contentEl.value!)
    const overlayBox = data.contentEl.value!.parentElement!.getBoundingClientRect()

    const viewportMargin = 12
    const freeSpace = {
      top: targetBox.top - viewportMargin,
      bottom: overlayBox.height - targetBox.bottom - viewportMargin,
      left: targetBox.left - viewportMargin,
      right: overlayBox.width - targetBox.right - viewportMargin,
    }

    const targetPoint = anchorToPoint(anchor.value, targetBox)
    const contentPoint = anchorToPoint(origin.value, contentBox)

    const { x, y } = getOffset(targetPoint, contentPoint)

    const canFill = doesOverlap.value || ['center', 'top', 'bottom'].includes(anchor.value.side)

    const max = canFill ? overlayBox.width - viewportMargin * 2
      : anchor.value.side === 'end' ? freeSpace.right
      : anchor.value.side === 'start' ? freeSpace.left
      : null
    const min = Math.min(max!, targetBox.width)

    Object.assign(contentStyles.value, {
      transform: `translate(${Math.round(x)}px, ${Math.round(y)}px)`,
      transformOrigin: physicalAnchor(origin.value, data.activatorEl.value!),
      minWidth: convertToUnit(min),
      maxWidth: convertToUnit(max),
    })
  }

  return { updatePosition }
}
