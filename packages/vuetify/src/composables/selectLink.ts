// Utilities
import { nextTick, watch } from 'vue'
import { isBoolean } from '@/util'

// Types
import type { UseLink } from './router'

export function useSelectLink (link: UseLink, select?: (value: boolean, e?: Event) => void) {
  watch(() => link.isActive?.value, isActive => {
    if (link.isLink.value && isBoolean(isActive) && select) {
      nextTick(() => {
        select(isActive)
      })
    }
  }, {
    immediate: true,
  })
}
