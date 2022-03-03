// Utilities
import { onBeforeMount, onBeforeUnmount, ref, watch } from 'vue'

export function useIntersectionObserver (callback?: IntersectionObserverCallback) {
  const intersectionRef = ref<HTMLElement>()
  const isIntersecting = ref(false)

  let observer: IntersectionObserver | undefined = undefined;

  onBeforeMount(() => {
    observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      callback?.(entries, observer!)
  
      isIntersecting.value = !!entries.find(entry => entry.isIntersecting)
    })

    watch(intersectionRef, (newValue, oldValue) => {
      if (oldValue) {
        observer!.unobserve(oldValue)
        isIntersecting.value = false
      }
  
      if (newValue) observer?.observe(newValue)
    }, {
      flush: 'post',
    })
  })
  
  onBeforeUnmount(() => {
    observer!.disconnect()
  }) 

  return { intersectionRef, isIntersecting }
}
