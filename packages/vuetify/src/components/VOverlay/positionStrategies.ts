// Utilities
import { effectScope, nextTick, ref, watch } from 'vue'
import { nullifyTransforms, propsFactory } from '@/util'

// Types
import type { EffectScope, PropType, Ref } from 'vue'

export interface PositionStrategyData {
  contentEl: Ref<HTMLElement | undefined>
  activatorEl: Ref<HTMLElement | undefined>
  isActive: Ref<boolean>
}

const positionStrategies = [
  'static', // specific viewport position, usually centered
  'connected', // connected to a certain element
  'flexible', // connected to an element with the ability to overflow or shift if it doesn't fit in the screen
] as const

interface StrategyProps {
  positionStrategy: typeof positionStrategies[number] | (
    (data: PositionStrategyData, transformStyles: Ref<any>) => undefined | { onScroll: (e: Event) => void }
  )
}

export const makePositionStrategyProps = propsFactory({
  positionStrategy: {
    type: String as PropType<StrategyProps['positionStrategy']>,
    default: 'static',
    validator: (val: any) => positionStrategies.includes(val),
  },
})

export function usePositionStrategies (
  props: StrategyProps,
  data: PositionStrategyData
) {
  const transformStyles = ref()
  const onScroll = ref<(e: Event) => void>()

  let scope: EffectScope | undefined
  watch(() => data.isActive.value && props.positionStrategy, (val, oldVal) => {
    if (!val || val !== oldVal) {
      scope?.stop()
      // transformStyles.value = undefined
    }

    if (val) {
      scope = effectScope()
      nextTick(() => {
        scope!.run(() => {
          if (typeof props.positionStrategy === 'function') {
            onScroll.value = props.positionStrategy(data, transformStyles)?.onScroll
          } else if (props.positionStrategy === 'static') {
            // TODO: positionX/positionY
          } else if (props.positionStrategy === 'connected') {
            onScroll.value = connectedPositionStrategy(data, transformStyles).onScroll
          } else if (props.positionStrategy === 'flexible') {
            onScroll.value = flexiblePositionStrategy(data, transformStyles).onScroll
          }
        })
      })
    }
  })

  return {
    contentTransformStyles: transformStyles,
    onScroll,
  }
}

function connectedPositionStrategy (data: PositionStrategyData, transformStyles: Ref<any>) {
  function updatePosition () {
    const targetBox = data.activatorEl.value!.getBoundingClientRect()
    const contentBox = nullifyTransforms(data.contentEl.value!)

    transformStyles.value = {
      transform: `translate(
        ${targetBox.left + targetBox.width / 2 - contentBox.width / 2 - contentBox.left}px,
        ${targetBox.top + targetBox.height - contentBox.top}px
      )`,
    }
  }

  updatePosition()

  function onScroll () {
    // updatePosition()
  }

  return { onScroll }
}

function flexiblePositionStrategy (data: PositionStrategyData, transformStyles: Ref<any>) {
  function onScroll () {
    // TODO
  }

  return { onScroll }
}
