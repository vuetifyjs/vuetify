import { VNodeDirective } from 'vue'

interface MutateVNodeDirective extends VNodeDirective {
  options?: MutationObserverInit
}

function inserted (el: HTMLElement, binding: MutateVNodeDirective) {
  const modifiers = binding.modifiers || /* istanbul ignore next */ {}
  const callback = binding.value!

  const callbackWrapper = (mutations: MutationRecord[]) => {
    /* istanbul ignore if */
    if (!el._mutate) return // Just in case, should never fire

    callback(mutations)

    // If has the once modifier, unbind
    if (modifiers.once) unbind(el)
  }

  const observer = new MutationObserver(callbackWrapper)
  observer.observe(el, {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true,
    ...(binding.options || {}),
  })

  el._mutate = { observer }
}

function unbind (el: HTMLElement) {
  /* istanbul ignore if */
  if (!el._mutate) return

  el._mutate.observer.disconnect()
  delete el._mutate
}

export const Mutate = {
  inserted,
  unbind,
}

export default Mutate
