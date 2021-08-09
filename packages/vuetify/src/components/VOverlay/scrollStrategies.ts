// Utilities
import { convertToUnit, getScrollParents, propsFactory } from '@/util'
import { effectScope, nextTick, onScopeDispose, watchEffect } from 'vue'

// Types
import type { EffectScope, PropType, Ref } from 'vue'

export interface ScrollStrategyData {
  contentEl: Ref<HTMLElement | undefined>
  activatorEl: Ref<HTMLElement | undefined>
  isActive: Ref<boolean>
  updatePosition: Ref<((e: Event) => void) | undefined>
}

const scrollStrategies = {
  close: closeScrollStrategy,
  block: blockScrollStrategy,
  reposition: repositionScrollStrategy,
}

interface StrategyProps {
  scrollStrategy: keyof typeof scrollStrategies | ((data: ScrollStrategyData) => void)
}

export const makeScrollStrategyProps = propsFactory({
  scrollStrategy: {
    type: [String, Function] as PropType<StrategyProps['scrollStrategy']>,
    default: 'block',
    validator: (val: any) => typeof val === 'function' || val in scrollStrategies,
  },
})

export function useScrollStrategies (
  props: StrategyProps,
  data: ScrollStrategyData
) {
  let scope: EffectScope | undefined
  watchEffect(async () => {
    scope?.stop()

    if (!(data.isActive.value && props.scrollStrategy)) return

    scope = effectScope()
    await nextTick()
    scope.run(() => {
      if (typeof props.scrollStrategy === 'function') {
        props.scrollStrategy(data)
      } else {
        scrollStrategies[props.scrollStrategy](data)
      }
    })
  })
}

function closeScrollStrategy (data: ScrollStrategyData) {
  function onScroll (e: Event) {
    data.isActive.value = false
  }

  bindScroll(data.contentEl.value, onScroll)
}

function blockScrollStrategy (data: ScrollStrategyData) {
  const initialOverflow: string[] = []
  const scrollElements = getScrollParents(data.contentEl.value)
  const scrollbarWidth = window.innerWidth - document.documentElement.offsetWidth

  document.documentElement.style.setProperty('--v-scrollbar-offset', convertToUnit(scrollbarWidth))

  scrollElements.forEach((el, i) => {
    initialOverflow[i] = el.style.overflowY
    el.style.overflowY = 'hidden'
    el.style.setProperty('--v-scrollbar-offset', convertToUnit(scrollbarWidth))
  })

  onScopeDispose(() => {
    scrollElements.forEach((el, i) => {
      el.style.overflowY = initialOverflow[i]
      el.style.removeProperty('--v-scrollbar-offset')
    })
    document.documentElement.style.removeProperty('--v-scrollbar-offset')
  })
}

function repositionScrollStrategy (data: ScrollStrategyData) {
  bindScroll(data.contentEl.value, e => {
    data.updatePosition.value?.(e)
  })
}

/** @private */
function bindScroll (el: HTMLElement | undefined, onScroll: (e: Event) => void) {
  const scrollElements = [document, ...getScrollParents(el)]
  scrollElements.forEach(el => {
    el.addEventListener('scroll', onScroll, { passive: true })
  })

  onScopeDispose(() => {
    scrollElements.forEach(el => {
      el.removeEventListener('scroll', onScroll)
    })
  })
}
