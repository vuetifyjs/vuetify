// Utilities
import { onBeforeUnmount, readonly, ref, watch } from 'vue'

export function useResizeObserver (callback?: ResizeObserverCallback) {
  const resizeRef = ref<Element>()
  const contentRect = ref<DOMRectReadOnly>()
  const contentBoxSize = ref<ResizeObserverSize>()
  const borderBoxSize = ref<ResizeObserverSize>()

  const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
    callback?.(entries, observer)

    if (!entries.length) return

    contentRect.value = entries[0].contentRect
    contentBoxSize.value = entries[0].contentBoxSize[0]
    borderBoxSize.value = entries[0].borderBoxSize[0]
  })

  onBeforeUnmount(() => {
    observer.disconnect()
  })

  watch(resizeRef, (newValue, oldValue) => {
    if (oldValue) {
      observer.unobserve(oldValue)
      contentRect.value = undefined
      contentBoxSize.value = undefined
      borderBoxSize.value = undefined
    }

    if (newValue) observer.observe(newValue)
  }, {
    flush: 'post',
  })

  return {
    resizeRef,
    contentRect: readonly(contentRect),
    contentBoxSize: readonly(contentBoxSize),
    borderBoxSize: readonly(borderBoxSize),
  }
}
