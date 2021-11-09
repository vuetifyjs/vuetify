import { VNode, VNodeDirective } from 'vue'

type MutateHandler = (
  mutationsList: MutationRecord[],
  observer: MutationObserver,
) => void

interface MutateVNodeDirective extends Omit<VNodeDirective, 'modifiers'> {
  value?: MutateHandler | { handler: MutateHandler, options?: MutationObserverInit }
  modifiers?: {
    once?: boolean
    attr?: boolean
    child?: boolean
    sub?: boolean
    char?: boolean
  }
}

function inserted (el: HTMLElement, binding: MutateVNodeDirective, vnode: VNode) {
  const modifiers = binding.modifiers || {}
  const value = binding.value
  const callback = typeof value === 'object' ? value.handler : value!
  const { once, ...modifierKeys } = modifiers
  const hasModifiers = Object.keys(modifierKeys).length > 0

  // Options take top priority
  const options = typeof value === 'object' && value.options
    ? value.options
    : hasModifiers
      // If we have modifiers, use only those provided
      ? {
        attributes: modifierKeys.attr,
        childList: modifierKeys.child,
        subtree: modifierKeys.sub,
        characterData: modifierKeys.char,
      }
      // Defaults to everything on
      : {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true,
      }

  const observer = new MutationObserver((
    mutationsList: MutationRecord[],
    observer: MutationObserver
  ) => {
    /* istanbul ignore if */
    if (!el._mutate) return // Just in case, should never fire

    callback(mutationsList, observer)

    // If has the once modifier, unbind
    once && unbind(el, binding, vnode)
  })

  observer.observe(el, options)
  el._mutate = Object(el._mutate)
  el._mutate![vnode.context!._uid] = { observer }
}

function unbind (el: HTMLElement, binding: MutateVNodeDirective, vnode: VNode) {
  if (!el._mutate?.[vnode.context!._uid]) return

  el._mutate[vnode.context!._uid]!.observer.disconnect()
  delete el._mutate[vnode.context!._uid]
}

export const Mutate = {
  inserted,
  unbind,
}

export default Mutate
