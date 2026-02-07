// Composables
import { useResizeObserver } from '@/composables/resizeObserver'

// Utilities
import { computed, inject, onBeforeUnmount, provide, ref, toRef, useId, watch } from 'vue'

// Types
import type { InjectionKey, Ref } from 'vue'

export interface SnackbarQueueItemState {
  height: number
}

export interface SnackbarQueueProvide {
  register: (id: string) => void
  unregister: (id: string) => void
  setHeight: (id: string, height: number) => void
  getOffset: (id: string) => number | null
  items: Ref<Map<string, SnackbarQueueItemState>>
  gap: Ref<number>
}

export const VSnackbarQueueSymbol: InjectionKey<SnackbarQueueProvide> = Symbol.for('vuetify:v-snackbar-queue')

export function useSnackbarQueue (props: { gap: string | number }): SnackbarQueueProvide {
  const items = ref<Map<string, SnackbarQueueItemState>>(new Map())
  const gap = toRef(() => Number(props.gap))

  function register (id: string) {
    items.value.set(id, { height: 0 })
  }

  function unregister (id: string) {
    items.value.delete(id)
  }

  function setHeight (id: string, height: number) {
    const item = items.value.get(id)
    if (!item || item.height === height) return
    item.height = height
  }

  function getOffset (id: string): number | null {
    if (!items.value.has(id)) return null

    let offset = 0
    for (const [itemId, state] of [...items.value.entries()].toReversed()) {
      if (itemId === id) break
      offset += state.height + gap.value
    }
    return offset
  }

  const state: SnackbarQueueProvide = {
    register,
    unregister,
    setHeight,
    getOffset,
    items,
    gap,
  }

  provide(VSnackbarQueueSymbol, state)

  return state
}

export function useSnackbarItem (
  isActive: Ref<boolean>,
  contentEl: () => HTMLElement | undefined,
) {
  const queue = inject(VSnackbarQueueSymbol, null)

  if (!queue) return null

  const id = useId()

  queue.register(id)
  onBeforeUnmount(() => queue.unregister(id))
  watch(isActive, val => !val && queue.unregister(id))

  const { resizeRef, contentRect } = useResizeObserver()
  watch(contentEl, el => { resizeRef.value = el ?? null })
  watch(contentRect, rect => {
    if (rect) queue.setHeight(id, rect.height)
  })

  const offset = computed(() => queue.getOffset(id))

  return {
    id,
    offset,
  }
}
