function inserted (el, binding) {
  const modifiers = binding.modifiers || {}
  const callback = binding.value
  const callbackWrapper = (
    entries,
    observer
  ) => {
    // Just in case, should never fire
    if (!el._observe) return

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

function unbind (el) {
  if (!el._observe) return

  el._observe.observer.unobserve(el)
  delete el._observe
}

export const Observe = {
  inserted,
  unbind,
}

export default Observe
