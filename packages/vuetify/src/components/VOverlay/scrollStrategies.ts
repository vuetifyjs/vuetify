// Utilities
import { convertToUnit, getScrollParents, propsFactory } from '@/util'
import { effectScope, nextTick, onScopeDispose, watch } from 'vue'

// Types
import type { EffectScope, PropType, Ref } from 'vue'

export interface ScrollStrategyData {
  contentEl: Ref<HTMLElement | undefined>
  activatorEl: Ref<HTMLElement | undefined>
  isActive: Ref<boolean>
}

const scrollStrategies = [
  'close',
  'block',
  'reposition',
] as const

interface StrategyProps {
  scrollStrategy: typeof scrollStrategies[number] | ((data: ScrollStrategyData) => void)
}

export const makeScrollStrategyProps = propsFactory({
  scrollStrategy: {
    type: [String, Function] as PropType<StrategyProps['scrollStrategy']>,
    default: 'block',
    validator: (val: any) => scrollStrategies.includes(val),
  },
})

export function useScrollStrategies (
  props: StrategyProps,
  data: ScrollStrategyData
) {
  let scope: EffectScope | undefined
  watch(() => data.isActive.value && props.scrollStrategy, (val, oldVal) => {
    if (!val || val !== oldVal) {
      scope?.stop()
    }

    if (val) {
      scope = effectScope()
      nextTick(() => {
        scope!.run(() => {
          if (typeof props.scrollStrategy === 'function') {
            props.scrollStrategy(data)
          } else if (props.scrollStrategy === 'close') {
            closeScrollStrategy(data)
          } else if (props.scrollStrategy === 'block') {
            blockScrollStrategy(data)
          } else if (props.scrollStrategy === 'reposition') {
            // TODO
          }
        })
      })
    }
  }, { immediate: true })
}

function closeScrollStrategy (data: ScrollStrategyData) {
  const scrollElements = [document, ...getScrollParents(data.contentEl.value)]
  scrollElements.forEach(el => {
    el.addEventListener('scroll', onScroll, { passive: true })
  })

  function onScroll () {
    data.isActive.value = false
  }

  onScopeDispose(() => {
    scrollElements.forEach(el => {
      el.removeEventListener('scroll', onScroll)
    })
  })
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
