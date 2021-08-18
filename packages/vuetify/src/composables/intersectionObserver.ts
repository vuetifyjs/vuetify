// Utilities
import { isComponentInstance } from '@/util'
import { onBeforeUnmount, ref, watch } from 'vue'

// Types
import type { ComponentPublicInstance } from 'vue'

export function useIntersectionObserver (callback?: IntersectionObserverCallback) {
  const intersectionRef = ref<ComponentPublicInstance | HTMLElement>()
  const isIntersecting = ref(false)

  const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
    callback?.(entries, observer)

    isIntersecting.value = !!entries.find(entry => entry.isIntersecting)
  })

  onBeforeUnmount(() => {
    observer.disconnect()
  })

  watch(intersectionRef, (newValue, oldValue) => {
    const el = isComponentInstance(newValue) ? newValue.$el : newValue

    if (!el) return

    if (oldValue) {
      observer.unobserve(el)
      isIntersecting.value = false
    }

    if (newValue) observer.observe(el)
  }, {
    flush: 'post',
  })

  return { intersectionRef, isIntersecting }
}
