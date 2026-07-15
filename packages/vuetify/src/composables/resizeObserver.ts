// Utilities
import { onBeforeUnmount, readonly, ref, watch } from 'vue'
import { templateRef } from '@/util'
import { IN_BROWSER } from '@/util/globals'

// Types
import type { DeepReadonly, Ref } from 'vue'
import type { TemplateRef } from '@/util'

interface ResizeState {
  resizeRef: TemplateRef
  contentRect: DeepReadonly<Ref<DOMRectReadOnly | undefined>>
}

export function useResizeObserver (callback?: ResizeObserverCallback, box: 'content' | 'border' = 'content'): ResizeState {
  const resizeRef = templateRef()
  const contentRect = ref<DOMRectReadOnly>()

  if (IN_BROWSER) {
    const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      callback?.(entries, observer)

      if (!entries.length) return

      if (box === 'content') {
        contentRect.value = entries[0].contentRect
      } else {
        contentRect.value = entries[0].target.getBoundingClientRect()
      }
    })

    onBeforeUnmount(() => {
      observer.disconnect()
    })

    watch(() => resizeRef.el, (newValue, oldValue) => {
      if (oldValue) {
        observer.unobserve(oldValue)
        contentRect.value = undefined
      }

      if (newValue) observer.observe(newValue)
    }, {
      flush: 'post',
    })
  }

  return {
    resizeRef,
    contentRect: readonly(contentRect),
  }
}
