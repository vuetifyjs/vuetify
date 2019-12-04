import { VNodeDirective } from 'vue/types/vnode'

interface ObserveVNodeDirective extends VNodeDirective {
  options?: IntersectionObserverInit
}

function inserted (el: HTMLElement, binding: ObserveVNodeDirective) {
  const modifiers = binding.modifiers || /* istanbul ignore next */ {}
  const value = binding.value
  const isObject = typeof value === 'object'
  const callback = isObject ? value.handler : value
  const observer = new IntersectionObserver((
    entries: IntersectionObserverEntry[] = [],
    observer: IntersectionObserver
  ) => {
    /* istanbul ignore if */
    if (!el._observe) return // Just in case, should never fire

    // If is not quiet or has already been
    // initted, invoke the user callback
    if (
      callback && (
        !modifiers.quiet ||
        el._observe.init
      )
    ) {
      const isIntersecting = Boolean(entries.find(entry => entry.isIntersecting))

      callback(entries, observer, isIntersecting)
    }

    // If has already been initted and
    // has the once modifier, unbind
    if (el._observe.init && modifiers.once) unbind(el)
    // Otherwise, mark the observer as initted
    else (el._observe.init = true)
  }, value.options || {})

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
