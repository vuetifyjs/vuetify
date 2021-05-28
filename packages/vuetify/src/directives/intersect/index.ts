import { VNodeDirective } from 'vue/types/vnode'

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

function inserted (el: HTMLElement, binding: ObserveVNodeDirective) {
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
    /* istanbul ignore if */
    if (!el._observe) return // Just in case, should never fire

    const isIntersecting = entries.some(entry => entry.isIntersecting)

    // If is not quiet or has already been
    // initted, invoke the user callback
    if (
      handler && (
        !modifiers.quiet ||
        el._observe.init
      ) && (
        !modifiers.once ||
        isIntersecting ||
        !el._observe.init
      )
    ) {
      handler(entries, observer, isIntersecting)
    }

    if (isIntersecting && modifiers.once) unbind(el)
    else el._observe.init = true
  }, options)

  el._observe = { init: false, observer }

  observer.observe(el)
}

function unbind (el: HTMLElement) {
  /* istanbul ignore if */
  if (!el._observe) return

  el._observe.observer.unobserve(el)
  delete el._observe
}

export const Intersect = {
  inserted,
  unbind,
}

export default Intersect
