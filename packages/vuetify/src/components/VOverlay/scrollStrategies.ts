// Utilities
import { effectScope, nextTick, onScopeDispose, watchEffect } from 'vue'
import { requestNewFrame } from './requestNewFrame'
import { convertToUnit, getScrollParents, hasScrollbar, IN_BROWSER, propsFactory } from '@/util'

// Types
import type { EffectScope, PropType, Ref } from 'vue'

export interface ScrollStrategyData {
  root: Ref<HTMLElement | undefined>
  contentEl: Ref<HTMLElement | undefined>
  activatorEl: Ref<HTMLElement | undefined>
  isActive: Ref<boolean>
  updateLocation: Ref<((e: Event) => void) | undefined>
}

type ScrollStrategyFn = (data: ScrollStrategyData, props: StrategyProps, scope: EffectScope) => void

const scrollStrategies = {
  none: null,
  close: closeScrollStrategy,
  block: blockScrollStrategy,
  reposition: repositionScrollStrategy,
}

export interface StrategyProps {
  scrollStrategy: keyof typeof scrollStrategies | ScrollStrategyFn
  contained: boolean | undefined
}

export const makeScrollStrategyProps = propsFactory({
  scrollStrategy: {
    type: [String, Function] as PropType<StrategyProps['scrollStrategy']>,
    default: 'block',
    validator: (val: any) => typeof val === 'function' || val in scrollStrategies,
  },
}, 'v-overlay-scroll-strategies')

export function useScrollStrategies (
  props: StrategyProps,
  data: ScrollStrategyData
) {
  if (!IN_BROWSER) return

  let scope: EffectScope | undefined
  watchEffect(async () => {
    scope?.stop()

    if (!(data.isActive.value && props.scrollStrategy)) return

    scope = effectScope()
    await nextTick()
    scope.active && scope.run(() => {
      if (typeof props.scrollStrategy === 'function') {
        props.scrollStrategy(data, props, scope!)
      } else {
        scrollStrategies[props.scrollStrategy]?.(data, props, scope!)
      }
    })
  })

  onScopeDispose(() => {
    scope?.stop()
  })
}

function closeScrollStrategy (data: ScrollStrategyData) {
  function onScroll (e: Event) {
    data.isActive.value = false
  }

  bindScroll(data.activatorEl.value ?? data.contentEl.value, onScroll)
}

function blockScrollStrategy (data: ScrollStrategyData, props: StrategyProps) {
  const offsetParent = data.root.value?.offsetParent
  const scrollElements = [...new Set([
    ...getScrollParents(data.activatorEl.value, props.contained ? offsetParent : undefined),
    ...getScrollParents(data.contentEl.value, props.contained ? offsetParent : undefined),
  ])].filter(el => !el.classList.contains('v-overlay-scroll-blocked'))
  const scrollbarWidth = window.innerWidth - document.documentElement.offsetWidth

  const scrollableParent = (el => hasScrollbar(el) && el)(offsetParent || document.documentElement)
  if (scrollableParent) {
    data.root.value!.classList.add('v-overlay--scroll-blocked')
  }

  scrollElements.forEach((el, i) => {
    el.style.setProperty('--v-body-scroll-x', convertToUnit(-el.scrollLeft))
    el.style.setProperty('--v-body-scroll-y', convertToUnit(-el.scrollTop))
    el.style.setProperty('--v-scrollbar-offset', convertToUnit(scrollbarWidth))
    el.classList.add('v-overlay-scroll-blocked')
  })

  onScopeDispose(() => {
    scrollElements.forEach((el, i) => {
      const x = parseFloat(el.style.getPropertyValue('--v-body-scroll-x'))
      const y = parseFloat(el.style.getPropertyValue('--v-body-scroll-y'))

      el.style.removeProperty('--v-body-scroll-x')
      el.style.removeProperty('--v-body-scroll-y')
      el.style.removeProperty('--v-scrollbar-offset')
      el.classList.remove('v-overlay-scroll-blocked')

      el.scrollLeft = -x
      el.scrollTop = -y
    })
    if (scrollableParent) {
      data.root.value!.classList.remove('v-overlay--scroll-blocked')
    }
  })
}

function repositionScrollStrategy (data: ScrollStrategyData, props: StrategyProps, scope: EffectScope) {
  let slow = false
  let raf = -1
  let ric = -1

  function update (e: Event) {
    requestNewFrame(() => {
      const start = performance.now()
      data.updateLocation.value?.(e)
      const time = performance.now() - start
      slow = time / (1000 / 60) > 2
    })
  }

  ric = (typeof requestIdleCallback === 'undefined' ? (cb: Function) => cb() : requestIdleCallback)(() => {
    scope.run(() => {
      bindScroll(data.activatorEl.value ?? data.contentEl.value, e => {
        if (slow) {
          // If the position calculation is slow,
          // defer updates until scrolling is finished.
          // Browsers usually fire one scroll event per frame so
          // we just wait until we've got two frames without an event
          cancelAnimationFrame(raf)
          raf = requestAnimationFrame(() => {
            raf = requestAnimationFrame(() => {
              update(e)
            })
          })
        } else {
          update(e)
        }
      })
    })
  })

  onScopeDispose(() => {
    typeof cancelIdleCallback !== 'undefined' && cancelIdleCallback(ric)
    cancelAnimationFrame(raf)
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
