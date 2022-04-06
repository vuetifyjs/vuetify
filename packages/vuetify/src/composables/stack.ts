import { computed, effectScope, onScopeDispose, ref, toRaw, watch } from 'vue'
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

  const isTop = computed(() => {
    return toRaw(stack.value[stack.value.length - 1]) === vm
  })

  return {
    isTop,
  }
}
