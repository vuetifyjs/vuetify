import { VNodeDirective } from 'vue/types/vnode'
import { VNode } from 'vue'

type ObserveHandler = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
  isIntersecting: boolean,
) => void

interface ObserveVNodeDirective extends Omit<VNodeDirective, 'modifiers'> {
  value?: ObserveHandler | { handler: ObserveHandler, options?: IntersectionObserverInit }
  modifiers?: {
    once?: boolean
    quiet?: boolean
  }
}

function inserted (el: HTMLElement, binding: ObserveVNodeDirective, vnode: VNode) {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

  const modifiers = binding.modifiers || {}
  const value = binding.value
  const { handler, options } = typeof value === 'object'
    ? value
    : { handler: value, options: {} }
  const observer = new IntersectionObserver((
    entries: IntersectionObserverEntry[] = [],
    observer: IntersectionObserver
  ) => {
    const _observe = el._observe?.[vnode.context!._uid]
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
      handler(entries, observer, isIntersecting)
    }

    if (isIntersecting && modifiers.once) unbind(el, binding, vnode)
    else _observe.init = true
  }, options)

  el._observe = Object(el._observe)
  el._observe![vnode.context!._uid] = { init: false, observer }

  observer.observe(el)
}

function unbind (el: HTMLElement, binding: ObserveVNodeDirective, vnode: VNode) {
  const observe = el._observe?.[vnode.context!._uid]
  if (!observe) return

  observe.observer.unobserve(el)
  delete el._observe![vnode.context!._uid]
}

export const Intersect = {
  inserted,
  unbind,
}

export default Intersect
