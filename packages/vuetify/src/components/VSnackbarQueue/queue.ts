// Composables
import { useElementSize } from '@vuetify/v0'

// Utilities
import { computed, inject, onBeforeUnmount, provide, ref, shallowRef, toRef, useId, watch } from 'vue'

// Types
import type { InjectionKey, Ref } from 'vue'

export interface SnackbarQueueItemState {
  height: number
  width: number
}

export interface SnackbarQueueProvide {
  register: (id: string) => void
  unregister: (id: string) => void
  setSize: (id: string, height: number, width: number) => void
  getOffset: (id: string) => number | null
  items: Ref<Map<string, SnackbarQueueItemState>>
  gap: Ref<number>
  lastItemSize: Ref<{ height: number, width: number }>
}

export const VSnackbarQueueSymbol: InjectionKey<SnackbarQueueProvide> = Symbol.for('vuetify:v-snackbar-queue')

export function useSnackbarQueue (props: { gap: string | number }): SnackbarQueueProvide {
  const items = ref<Map<string, SnackbarQueueItemState>>(new Map())
  const gap = toRef(() => Number(props.gap))

  function register (id: string) {
    items.value.set(id, { height: 0, width: 0 })
  }

  function unregister (id: string) {
    items.value.delete(id)
  }

  function setSize (id: string, height: number, width: number) {
    const item = items.value.get(id)
    if (!item || (item.height === height && item.width === width)) return
    item.height = height
    item.width = width
  }

  const lastItemSize = computed(() => {
    for (const { width, height } of [...items.value.values()].toReversed()) {
      if (!width || !height) continue
      return { width, height }
    }
    return { width: 0, height: 0 }
  })

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
    setSize,
    getOffset,
    items,
    gap,
    lastItemSize,
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
  watch(isActive, val => !val && queue.unregister(id), { flush: 'sync' })

  const el = shallowRef<HTMLElement | null>(null)
  const { width, height } = useElementSize(el as any) as any
  watch(contentEl, target => { el.value = target ?? null })
  watch(width, w => {
    if (w) queue.setSize(id, height.value, w)
  })

  const offset = computed(() => queue.getOffset(id))

  return {
    id,
    offset,
  }
}
