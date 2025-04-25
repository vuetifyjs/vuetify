// Utilities
import { computed, inject, provide, shallowRef } from 'vue'

// Types
import type { InjectionKey, MaybeRefOrGetter, Ref, ComputedGetter } from 'vue'

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
  filterable: ComputedGetter<boolean>
  hasPrepend: Ref<boolean>
  updateHasPrepend: (value: boolean) => void
}> = Symbol.for('vuetify:list')

type InjectedListOptions = {
  filterable: MaybeRefOrGetter<boolean>
}

export function createList ({ filterable }: InjectedListOptions = { filterable: false }) {
  const parent = inject(ListKey, {
    filterable: () => false,
    hasPrepend: shallowRef(false),
    updateHasPrepend: () => null,
  })

  const data = {
    filterable: parent.filterable || filterable,
    hasPrepend: shallowRef(false),
    updateHasPrepend: (value: boolean) => {
      if (value) data.hasPrepend.value = value
    },
  }

  provide(ListKey, data)

  return parent
}

export function useList () {
  return inject(ListKey, null)
}
