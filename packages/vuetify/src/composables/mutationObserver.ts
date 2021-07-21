// Utilities
import { onBeforeUnmount, ref, watch } from 'vue'

export interface MutationComposableBinding {
  attr?: boolean
  char?: boolean
  child?: boolean
  once?: boolean
  quiet?: boolean
  sub?: boolean
}

export function useMutationObserver (
  options?: MutationComposableBinding,
  callback?: MutationCallback
) {
  const mutationRef = ref<HTMLElement>()

  const observer = new MutationObserver((
    mutations: MutationRecord[],
    observer: MutationObserver
  ) => {
    callback?.(mutations, observer)
  })

  onBeforeUnmount(() => {
    observer.disconnect()
  })

  watch(mutationRef, (newValue, oldValue) => {
    console.log(newValue, oldValue)
    if (oldValue) {
      observer.disconnect()
    }

    if (newValue) {
      observer.observe(newValue, {
        attributes: options?.attr ?? true,
        characterData: options?.char ?? true,
        childList: options?.child ?? true,
        subtree: options?.sub ?? true,
      })
    }
  }, {
    // flush: 'post',
    deep: true,
  })

  return { mutationRef }
}
