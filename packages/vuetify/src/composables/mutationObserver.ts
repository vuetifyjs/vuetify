// Utilities
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

// Types
import type { ComponentPublicInstance } from 'vue'

export interface MutationOptions {
  attr?: boolean
  char?: boolean
  child?: boolean
  sub?: boolean
  once?: boolean
  immediate?: boolean
}

export function useMutationObserver (
  handler?: MutationCallback,
  options?: MutationOptions,
) {
  const mutationRef = ref<ComponentPublicInstance>()

  const observer = new MutationObserver((
    mutations: MutationRecord[],
    observer: MutationObserver
  ) => {
    handler?.(mutations, observer)

    if (options?.once) observer.disconnect()
  })

  onMounted(() => {
    if (!options?.immediate) return

    handler?.([], observer)
  })

  onBeforeUnmount(() => {
    observer.disconnect()
  })

  watch(mutationRef, (newValue, oldValue) => {
    if (oldValue) observer.disconnect()
    if (!newValue?.$el) return

    observer.observe(newValue?.$el, {
      attributes: options?.attr ?? true,
      characterData: options?.char ?? true,
      childList: options?.child ?? true,
      subtree: options?.sub ?? true,
    })
  }, {
    flush: 'post',
  })

  return { mutationRef }
}
