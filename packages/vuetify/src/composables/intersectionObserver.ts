// Utilities
import { onBeforeUnmount, ref, watch } from 'vue'
import { SUPPORTS_INTERSECTION } from '@/util'

export function useIntersectionObserver (callback?: IntersectionObserverCallback) {
  const intersectionRef = ref<HTMLElement>()
  const isIntersecting = ref(false)

  if (SUPPORTS_INTERSECTION) {
    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      callback?.(entries, observer)

      isIntersecting.value = !!entries.find(entry => entry.isIntersecting)
    })

    onBeforeUnmount(() => {
      observer.disconnect()
    })

    watch(intersectionRef, (newValue, oldValue) => {
      if (oldValue) {
        observer.unobserve(oldValue)
        isIntersecting.value = false
      }

      if (newValue) observer.observe(newValue)
    }, {
      flush: 'post',
    })
  }

  return { intersectionRef, isIntersecting }
}
