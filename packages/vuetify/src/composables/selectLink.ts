// Utilities
import { nextTick, watch } from 'vue'
import { isNullOrUndefined } from '@/util'

// Types
import type { UseLink } from './router'

export function useSelectLink (link: UseLink, select?: (value: boolean, e?: Event) => void) {
  watch(() => link.isActive?.value, isActive => {
    if (link.isLink.value && !isNullOrUndefined(isActive) && select) {
      nextTick(() => {
        select(isActive)
      })
    }
  }, {
    immediate: true,
  })
}
