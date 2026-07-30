// Utilities
import { focusableChildren } from '@/util'

// Types
import type { Ref } from 'vue'

export function useFocusRepair (
  active: Ref<boolean>,
  content: () => HTMLElement | undefined,
  fallback: () => HTMLElement | undefined,
) {
  return function repairOrphanedFocus (e: FocusEvent): boolean {
    if (!e.relatedTarget && document.activeElement === document.body && active.value) {
      requestAnimationFrame(() => {
        if (!active.value) return
        const el = content()
        const target = (el && focusableChildren(el)[0]) ?? fallback()
        target?.focus({ preventScroll: true })
      })
      return true
    }
    return false
  }
}
