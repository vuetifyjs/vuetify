// Utilities
import { nextTick, toValue, watch } from 'vue'
import { getActiveElement } from '@/util'

// Types
import type { MaybeRefOrGetter, Ref } from 'vue'

/** Close once focus has landed somewhere outside the field and its menu. */
export function closeWhenFocusLeaves (menu: Ref<boolean>, ...els: (Element | null | undefined)[]) {
  requestAnimationFrame(() => {
    const active = getActiveElement()
    // Body means focus is still in flight, e.g. arrow keys moving it into the menu
    if (!active || active === document.body) return

    if (!els.some(el => el?.contains(active))) {
      menu.value = false
    }
  })
}

export function useOpenOnFocus (
  menu: Ref<boolean>,
  isFocused: Ref<boolean>,
  enabled: MaybeRefOrGetter<boolean>,
) {
  let returningFocus = false

  watch(menu, val => {
    if (val) return

    returningFocus = true
    nextTick(() => returningFocus = false)
  })

  watch(isFocused, val => {
    if (!val || returningFocus) {
      returningFocus = false
    } else if (toValue(enabled)) {
      menu.value = true
    }
  })
}
