import { useToggleScope } from '@/composables/toggleScope'

import { computed, onScopeDispose, reactive, readonly, ref, watchEffect } from 'vue'
import { getCurrentInstance } from '@/util'

// Types
import type { Ref } from 'vue'

const stack = reactive<[uid: number, zIndex: number][]>([])

export function useStack (isActive: Readonly<Ref<boolean>>, zIndex: Readonly<Ref<string | number>>) {
  const vm = getCurrentInstance('useStack')

  const _zIndex = ref(+zIndex.value)
  useToggleScope(isActive, () => {
    const lastZIndex = stack.at(-1)?.[1]
    _zIndex.value = lastZIndex ? lastZIndex + 10 : +zIndex.value
    stack.push([vm.uid, _zIndex.value])

    onScopeDispose(() => {
      const idx = stack.findIndex(v => v[0] === vm.uid)
      stack.splice(idx, 1)
    })
  })

  const isTop = ref(true)
  watchEffect(() => {
    const _isTop = stack.at(-1)?.[0] === vm.uid
    setTimeout(() => isTop.value = _isTop)
  })

  return {
    isTop: readonly(isTop),
    stackStyles: computed(() => ({ zIndex: _zIndex.value })),
  }
}
