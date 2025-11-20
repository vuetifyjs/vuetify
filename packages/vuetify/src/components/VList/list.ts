// Utilities
import { computed, inject, provide, shallowRef } from 'vue'

// Types
import type { InjectionKey, MaybeRefOrGetter, Ref } from 'vue'

// Depth
export const DepthKey: InjectionKey<Ref<number>> = Symbol.for('vuetify:depth')

export function useDepth (hasPrepend?: Ref<boolean>) {
  const parent = inject(DepthKey, shallowRef(-1))

  const depth = computed(() => parent.value + 1 + (hasPrepend?.value ? 1 : 0))

  provide(DepthKey, depth)

  return depth
}

// List
export const ListKey: InjectionKey<{
  filterable: MaybeRefOrGetter<boolean>
  hasPrepend: Ref<boolean>
  updateHasPrepend: (value: boolean) => void
  keyboardFocusedIndex: Ref<number>
  navigationStrategy: Ref<'focus' | 'track'>
}> = Symbol.for('vuetify:list')

type InjectedListOptions = {
  filterable: MaybeRefOrGetter<boolean>
  keyboardFocusedIndex?: Ref<number>
  navigationStrategy?: Ref<'focus' | 'track'>
}

export function createList (options: InjectedListOptions = { filterable: false }) {
  const parent = inject(ListKey, {
    filterable: false,
    hasPrepend: shallowRef(false),
    updateHasPrepend: () => null,
    keyboardFocusedIndex: shallowRef(-1),
    navigationStrategy: shallowRef('focus' as 'focus' | 'track'),
  })

  const {
    filterable,
    keyboardFocusedIndex = parent.keyboardFocusedIndex,
    navigationStrategy = parent.navigationStrategy,
  } = options

  const data = {
    filterable: parent.filterable || filterable,
    hasPrepend: shallowRef(false),
    updateHasPrepend: (value: boolean) => {
      if (value) data.hasPrepend.value = value
    },
    keyboardFocusedIndex,
    navigationStrategy,
  }

  provide(ListKey, data)

  return parent
}

export function useList () {
  return inject(ListKey, null)
}
