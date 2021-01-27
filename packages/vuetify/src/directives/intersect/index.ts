// Types
import type {
  DirectiveBinding,
  ObjectDirective,
} from 'vue'

type ObserveHandler = (
  isIntersecting: boolean,
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
) => void

export interface ObserveDirectiveBinding extends Omit<DirectiveBinding, 'modifiers'> {
  value: ObserveHandler | { handler: ObserveHandler, options?: IntersectionObserverInit }
  modifiers: {
    once?: boolean
    quiet?: boolean
  }
}

function mounted (el: HTMLElement, binding: ObserveDirectiveBinding) {
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

    // If is not quiet or has already been
    // initted, invoke the user callback
    if (
      handler && (
        !modifiers.quiet ||
        el._observe.init
      )
    ) {
      const isIntersecting = Boolean(entries.find(entry => entry.isIntersecting))

      handler(isIntersecting, entries, observer)
    }

    // If has already been initted and
    // has the once modifier, unbind
    if (el._observe.init && modifiers.once) unmounted(el)
    // Otherwise, mark the observer as initted
    else (el._observe.init = true)
  }, options)

  el._observe = { init: false, observer }

  observer.observe(el)
}

function unmounted (el: HTMLElement) {
  /* istanbul ignore if */
  if (!el._observe) return

  el._observe.observer.unobserve(el)
  delete el._observe
}

export const Intersect: ObjectDirective<HTMLElement> = {
  mounted,
  unmounted,
}

export default Intersect
