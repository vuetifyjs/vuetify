// Utilities
import { nextTick } from 'vue'
import { SUPPORTS_INTERSECTION } from '@/util'

// Types
import type {
  DirectiveBinding,
} from 'vue'

type ObserveHandler = (
  isIntersecting: boolean,
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
) => void

export interface ObserveDirectiveBinding extends Omit<DirectiveBinding, 'modifiers' | 'value'> {
  value?: ObserveHandler | { handler: ObserveHandler, options?: IntersectionObserverInit }
  modifiers: {
    once?: boolean
    quiet?: boolean
  }
}

// Elements with display:contents have no layout box; IntersectionObserver cannot observe them.
// Walk down to the first child that has a real box.
function getObservableEl (el: HTMLElement): HTMLElement {
  if (getComputedStyle(el).display === 'contents') {
    for (let i = 0; i < el.children.length; i++) {
      const child = el.children[i]
      if (child instanceof HTMLElement) return getObservableEl(child)
    }
  }
  return el
}

const scrollableRE = /auto|scroll/

function getScrollableAncestor (el: HTMLElement): HTMLElement | null {
  let parent = el.parentElement
  while (parent) {
    const { overflow, overflowY, overflowX } = getComputedStyle(parent)
    if (scrollableRE.test(overflow + overflowY + overflowX)) {
      return parent
    }
    parent = parent.parentElement
  }
  return null
}

function mounted (el: HTMLElement, binding: ObserveDirectiveBinding) {
  if (!SUPPORTS_INTERSECTION) return

  const modifiers = binding.modifiers || {}
  const value = binding.value
  const { handler, options } = typeof value === 'object'
    ? value
    : { handler: value, options: {} }

  nextTick(() => {
    const resolvedOptions: IntersectionObserverInit = {
      ...options,
      root: options?.root !== undefined
        ? options.root
        : getScrollableAncestor(el),
    }

    const observer = new IntersectionObserver((
      entries: IntersectionObserverEntry[] = [],
      observer: IntersectionObserver
    ) => {
      const _observe = el._observe?.[binding.instance!.$.uid]
      if (!_observe) return // Just in case, should never fire

      const isIntersecting = entries.some(entry => entry.isIntersecting)

      // If is not quiet or has already been
      // initted, invoke the user callback
      if (
        handler && (
          !modifiers.quiet ||
          _observe.init
        ) && (
          !modifiers.once ||
          isIntersecting ||
          _observe.init
        )
      ) {
        handler(isIntersecting, entries, observer)
      }

      if (isIntersecting && modifiers.once) unmounted(el, binding)
      else _observe.init = true
    }, resolvedOptions)

    el._observe = Object(el._observe)

    const target = getObservableEl(el)
    el._observe![binding.instance!.$.uid] = { init: false, observer, target }

    observer.observe(target)
  })
}

function unmounted (el: HTMLElement, binding: ObserveDirectiveBinding) {
  const observe = el._observe?.[binding.instance!.$.uid]
  if (!observe) return

  observe.observer.unobserve(observe.target ?? el)
  delete el._observe![binding.instance!.$.uid]
}

export const Intersect = {
  mounted,
  unmounted,
  updated: (el: HTMLElement, binding: ObserveDirectiveBinding) => {
    if (el._observe?.[binding.instance!.$.uid]) {
      unmounted(el, binding)
      mounted(el, binding)
    }
  },
}

export default Intersect
