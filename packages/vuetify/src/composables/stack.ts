import { effectScope, onScopeDispose, readonly, ref, toRaw, watch, watchEffect } from 'vue'
import { getCurrentInstance } from '@/util'

// Types
import type { ComponentInternalInstance, EffectScope, Ref } from 'vue'

const stack = ref<ComponentInternalInstance[]>([])

export function useStack (isActive: Ref<boolean>) {
  const vm = getCurrentInstance('useStack')
  let scope: EffectScope | undefined
  watch(isActive, val => {
    if (val) {
      scope = effectScope()
      scope.run(() => {
        stack.value.push(vm)

        onScopeDispose(() => {
          const idx = stack.value.indexOf(vm)
          stack.value.splice(idx, 1)
        })
      })
    } else {
      scope?.stop()
    }
  }, { immediate: true })

  const isTop = ref(true)
  watchEffect(() => {
    const _isTop = toRaw(stack.value[stack.value.length - 1]) === vm
    setTimeout(() => isTop.value = _isTop)
  })

  return {
    isTop: readonly(isTop),
  }
}
