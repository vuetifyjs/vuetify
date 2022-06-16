import { useToggleScope } from '@/composables/toggleScope'

import { computed, onScopeDispose, reactive, readonly, ref, toRaw, watchEffect } from 'vue'
import { getCurrentInstance } from '@/util'

// Types
import type { ComponentInternalInstance, Ref } from 'vue'

const stack = reactive<[vm: ComponentInternalInstance, zIndex: number][]>([])

export function useStack (isActive: Readonly<Ref<boolean>>, zIndex: Readonly<Ref<string | number>>) {
  const vm = getCurrentInstance('useStack')

  const _zIndex = ref(+zIndex.value)
  useToggleScope(isActive, () => {
    const lastZIndex = stack[stack.length - 1]?.[1]
    _zIndex.value = lastZIndex ? lastZIndex + 10 : +zIndex.value
    stack.push([vm, _zIndex.value])

    onScopeDispose(() => {
      const idx = stack.findIndex(v => v[0] === vm)
      stack.splice(idx, 1)
    })
  })

  const isTop = ref(true)
  watchEffect(() => {
    const _isTop = toRaw(stack[stack.length - 1]?.[0]) === vm
    setTimeout(() => isTop.value = _isTop)
  })

  return {
    isTop: readonly(isTop),
    stackStyles: computed(() => ({ zIndex: _zIndex.value })),
  }
}
