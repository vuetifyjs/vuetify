// Types
import type {
  DirectiveBinding,
  ObjectDirective,
} from 'vue'

type MutationHandler = (
  entries: MutationRecord[],
  observer: MutationObserver,
) => void

export interface MutationDirectiveBinding extends Omit<DirectiveBinding, 'modifiers' | 'value'> {
  value?: MutationHandler | { handler: MutationHandler, options?: MutationObserverInit }
  modifiers: {
    attr?: boolean
    char?: boolean
    child?: boolean
    once?: boolean
    quiet?: boolean
    sub?: boolean
  }
}

function mounted (el: HTMLElement, binding: MutationDirectiveBinding) {
  const modifiers = binding.modifiers || {}
  const value = binding.value
  const { once, ...modifierKeys } = modifiers
  const hasModifiers = Object.keys(modifierKeys).length > 0

  const { handler, options } = typeof value === 'object'
    ? value
    : {
      handler: value,
      options: hasModifiers
        // If we have modifiers, use only those provided
        ? {
          attributes: modifierKeys.attr,
          characterData: modifierKeys.char,
          childList: modifierKeys.child,
          subtree: modifierKeys.sub,
        }
        // Defaults to everything on
        : {
          attributes: true,
          characterData: true,
          childList: true,
          subtree: true,
        },
    }

  const observer = new MutationObserver((
    mutations: MutationRecord[] = [],
    observer: MutationObserver
  ) => {
    /* istanbul ignore if */
    if (!el._mutate) return // Just in case, should never fire

    // If is not quiet or has already been
    // initted, invoke the user callback
    if (
      handler && (
        !modifiers.quiet ||
        el._mutate.init
      ) && (
        !modifiers.once ||
        !el._mutate.init
      )
    ) {
      handler(mutations, observer)
    }

    if (once) unmounted(el)
    else el._mutate.init = true
  })

  el._mutate = { init: false, observer }

  observer.observe(el, options)
}

function unmounted (el: HTMLElement) {
  /* istanbul ignore if */
  if (!el._mutate) return

  el._mutate.observer.disconnect()
  delete el._mutate
}

export const Mutate: ObjectDirective<HTMLElement> = {
  mounted,
  unmounted,
}

export default Mutate
