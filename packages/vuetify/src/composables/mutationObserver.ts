// Utilities
import { onBeforeUnmount, ref, watch } from 'vue'

export function useMutationObserver (callback?: MutationCallback) {
  const mutationRef = ref<HTMLElement>()
  // const options = typeof value === 'object' && value.options
  //   ? value.options
  //   : hasModifiers
  //     // If we have modifiers, use only those provided
  //     ? {
  //       attributes: modifierKeys.attr,
  //       childList: modifierKeys.child,
  //       subtree: modifierKeys.sub,
  //       characterData: modifierKeys.char,
  //     }
  //     // Defaults to everything on
  //     : {
  //       attributes: true,
  //       childList: true,
  //       subtree: true,
  //       characterData: true,
  //     }

  const observer = new MutationObserver((mutations: MutationRecord[], observer: MutationObserver) => {
    callback?.(mutations, observer)
  })

  onBeforeUnmount(() => {
    observer.disconnect()
  })

  watch(mutationRef, (newValue, oldValue) => {
    if (oldValue) {
      observer.disconnect()
    }

    if (newValue) observer.observe(newValue)
  }, {
    flush: 'post',
  })

  return { mutationRef }
}
