// Utilities
import { nextTick, watch } from 'vue'

// Types
import type { UseLink } from './router'

export function useSelectLink (link: UseLink, select?: (value: boolean, e?: Event) => void) {
  watch(() => link.isActive?.value, isActive => {
    if (link.isLink.value && isActive && select) {
      nextTick(() => {
        select(true)
      })
    }
  }, {
    immediate: true,
  })
}
