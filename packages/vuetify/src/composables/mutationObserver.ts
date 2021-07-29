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
  const { once, immediate, ...optionKeys } = options || {}
  const defaultValue = !Object.keys(optionKeys).length

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
      attributes: options?.attr ?? defaultValue,
      characterData: options?.char ?? defaultValue,
      childList: options?.child ?? defaultValue,
      subtree: options?.sub ?? defaultValue,
    })
  }, {
    flush: 'post',
  })

  return { mutationRef }
}
