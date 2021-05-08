import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useResizeObserver (callback: ResizeObserverCallback) {
  const resizeRef = ref()
  const observer = new ResizeObserver(callback)

  onMounted(() => {
    observer.observe(resizeRef.value)
  })

  onBeforeUnmount(() => {
    observer.disconnect()
  })

  return { resizeRef }
}
