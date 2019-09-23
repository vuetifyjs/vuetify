import { VNodeDirective } from 'vue/types/vnode'

interface ObserveVNodeDirective extends VNodeDirective {
  options?: undefined | IntersectionObserverInit
}

function inserted (el: HTMLElement, binding: ObserveVNodeDirective) {
  const modifiers = binding.modifiers || /* istanbul ignore next */ {}
  const callback = binding.value!
  const callbackWrapper = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    /* istanbul ignore if */
    if (!el._observe) return // Just in case, should never fire

    // If is not quiet or has already been
    // initted, invoke the user callback
    if (
      !modifiers.quiet ||
      el._observe.init
    ) callback && callback(entries, observer)

    // If has already been initted and
    // has the once modifier, unbind
    if (el._observe.init && modifiers.once) unbind(el)
    // Otherwise, mark the observer as initted
    else (el._observe.init = true)
  }
  const observer = new IntersectionObserver(callbackWrapper, binding.options || {})

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
