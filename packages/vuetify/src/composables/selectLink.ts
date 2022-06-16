// Utilities
import { nextTick, watch } from 'vue'

// Types
import type { UseLink } from './router'

export function useSelectLink (link: UseLink, select?: (value: boolean, e?: Event) => void) {
  watch(() => link.isExactActive?.value, isExactActive => {
    if (link.isLink.value && isExactActive && select) {
      nextTick(() => {
        select(true)
      })
    }
  }, {
    immediate: true,
  })
}
