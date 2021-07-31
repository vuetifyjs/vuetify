// Types
import type { DirectiveBinding, ObjectDirective } from 'vue'
import type { MutationOptions } from '@/composables/mutationObserver'

export interface MutationDirectiveBinding extends Omit<DirectiveBinding, 'modifiers' | 'value'> {
  value: MutationCallback | { handler: MutationCallback, options?: MutationObserverInit }
  modifiers: MutationOptions
}

function mounted (el: HTMLElement, binding: MutationDirectiveBinding) {
  const modifiers = binding.modifiers || {}
  const value = binding.value
  const { once, immediate, ...modifierKeys } = modifiers
  const defaultValue = !Object.keys(modifierKeys).length

  const { handler, options } = typeof value === 'object'
    ? value
    : {
      handler: value,
      options: {
        attributes: modifierKeys?.attr ?? defaultValue,
        characterData: modifierKeys?.char ?? defaultValue,
        childList: modifierKeys?.child ?? defaultValue,
        subtree: modifierKeys?.sub ?? defaultValue,
      },
    }

  const observer = new MutationObserver((
    mutations: MutationRecord[] = [],
    observer: MutationObserver
  ) => {
    handler?.(mutations, observer)

    if (once) unmounted(el)
  })

  if (immediate) handler?.([], observer)

  el._mutate = { observer }

  observer.observe(el, options)
}

function unmounted (el: HTMLElement) {
  el?._mutate?.observer?.disconnect()
  delete el._mutate
}

export const Mutate: ObjectDirective<HTMLElement> = {
  mounted,
  unmounted,
}

export default Mutate
