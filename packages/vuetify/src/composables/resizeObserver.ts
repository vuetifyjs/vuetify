// Utilities
import { onBeforeUnmount, ref, watch } from 'vue'

export function useResizeObserver (callback: ResizeObserverCallback) {
  const resizeRef = ref<Element>()
  const contentRect = ref<DOMRectReadOnly>(new DOMRect(0, 0, 0, 0))
  const contentBoxSize = ref<ResizeObserverSize>({ blockSize: 0, inlineSize: 0 })
  const borderBoxSize = ref<ResizeObserverSize>({ blockSize: 0, inlineSize: 0 })

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
    if (oldValue) observer.unobserve(oldValue)
    if (newValue) observer.observe(newValue)
  }, {
    flush: 'post',
  })

  return { resizeRef, contentRect, contentBoxSize, borderBoxSize }
}
