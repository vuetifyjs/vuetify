// Utilities
import { onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { SUPPORTS_INTERSECTION } from '@/util'

export function useIntersectionObserver (callback?: IntersectionObserverCallback, options?: IntersectionObserverInit) {
  const intersectionRef = ref<HTMLElement>()
  const isIntersecting = shallowRef(false)

  if (SUPPORTS_INTERSECTION) {
    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      callback?.(entries, observer)

      isIntersecting.value = !!entries.find(entry => entry.isIntersecting)
    }, options)

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
