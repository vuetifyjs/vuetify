// Utilities
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { refElement } from '@/util'

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
  const mutationRef = ref<ComponentPublicInstance | HTMLElement>()
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

    const el = refElement(newValue)

    if (!el) return

    observer.observe(el, {
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
