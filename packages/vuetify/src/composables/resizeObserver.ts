// Utilities
import { onBeforeUnmount, readonly, ref, watch } from 'vue'

// Globals
import { IN_BROWSER } from '@/util/globals'

// Types
import type { ComponentPublicInstance, DeepReadonly, Ref } from 'vue'

interface ResizeState {
  resizeRef: Ref<Element | ComponentPublicInstance | undefined>
  contentRect: DeepReadonly<Ref<DOMRectReadOnly | undefined>>
  borderBoxSize: DeepReadonly<Ref<ResizeObserverSize | undefined>>
  contentBoxSize: DeepReadonly<Ref<ResizeObserverSize | undefined>>
}

export function useResizeObserver (
  resizeRef: Ref<Element | ComponentPublicInstance | undefined>,
  callback?: ResizeObserverCallback
): ResizeState {
  const contentRect = ref<DOMRectReadOnly>()
  const contentBoxSize = ref<ResizeObserverSize>()
  const borderBoxSize = ref<ResizeObserverSize>()

  if (IN_BROWSER) {
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
      const oldElement = oldValue instanceof Element ? oldValue : oldValue?.$el
      const newElement = newValue instanceof Element ? newValue : newValue?.$el

      if (oldElement) {
        observer.unobserve(oldElement)
        contentRect.value = undefined
        contentBoxSize.value = undefined
        borderBoxSize.value = undefined
      }

      if (newValue) observer.observe(newElement)
    }, {
      flush: 'post',
    })
  }

  return {
    resizeRef,
    contentRect: readonly(contentRect),
    contentBoxSize: readonly(contentBoxSize),
    borderBoxSize: readonly(borderBoxSize),
  }
}
