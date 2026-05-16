// Types
import type { useVirtualFocus } from '@/composables/virtualFocus'

interface GridKeyboardSelectionOptions {
  onEscape?: () => void
  onActivate?: () => void
  onArrow?: (e: KeyboardEvent) => boolean
}

export function useGridKeyboardSelection (
  virtualFocus: ReturnType<typeof useVirtualFocus>,
  options: GridKeyboardSelectionOptions,
) {
  return function onContainerKeydown (e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault()
      options.onEscape?.()
      return
    }
    if ((e.key === 'Enter' || e.key === ' ') && virtualFocus.highlightedId.value != null) {
      e.preventDefault()
      options.onActivate?.()
      return
    }
    if (options.onArrow?.(e)) return
    virtualFocus.onKeydown(e)
    virtualFocus.focusHighlighted()
  }
}
