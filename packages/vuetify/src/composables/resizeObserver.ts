import { onBeforeUnmount, ref, watch } from 'vue'

export function useResizeObserver (callback: ResizeObserverCallback) {
  const resizeRef = ref()
  const observer = new ResizeObserver(callback)

  onBeforeUnmount(() => {
    observer.disconnect()
  })

  watch(resizeRef, (newValue, oldValue) => {
    if (oldValue) observer.unobserve(oldValue)
    if (newValue) observer.observe(newValue)
  }, {
    flush: 'post',
  })

  return { resizeRef }
}
