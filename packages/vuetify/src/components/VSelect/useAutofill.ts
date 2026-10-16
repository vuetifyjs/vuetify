// Utilities
import { toValue, watch } from 'vue'

// Types
import type { MaybeRefOrGetter } from 'vue'
import type { ListItem } from '@/composables/list-items'

const AUTOFILL_PENDING_MS = 1000

export function useAutofill (
  items: MaybeRefOrGetter<readonly ListItem[]>,
  select: (item: ListItem) => void,
) {
  let pending: string | null = null
  let pendingTimeout = -1

  function findItem (text: string) {
    return toValue(items).find(item => item.title === text || item.value === text)
  }

  watch(() => toValue(items), () => {
    if (!pending) return
    const item = findItem(pending)
    if (!item) return
    pending = null
    select(item)
  })

  function autofill (text: string) {
    const item = findItem(text)
    if (item) return select(item)

    resetAutofill()
    pending = text
    pendingTimeout = window.setTimeout(resetAutofill, AUTOFILL_PENDING_MS)
  }

  function resetAutofill () {
    pending = null
    clearTimeout(pendingTimeout)
  }

  return { autofill, resetAutofill }
}
