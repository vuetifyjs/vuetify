// Composables
import { useToggleScope } from '@/composables/toggleScope'

// Utilities
import { computed, inject, onScopeDispose, provide, reactive, readonly, shallowRef, toRaw, watchEffect } from 'vue'
import { getCurrentInstance } from '@/util'

// Types
import type { InjectionKey, Ref } from 'vue'

const StackSymbol: InjectionKey<StackProvide> = Symbol.for('vuetify:stack')

interface StackProvide {
  activeChildren: Set<number>
}

const globalStack = reactive<[uid: number, zIndex: number][]>([])

export function useStack (
  isActive: Readonly<Ref<boolean>>,
  zIndex: Readonly<Ref<string | number>>,
  disableGlobalStack: boolean
) {
  const vm = getCurrentInstance('useStack')
  const createStackEntry = !disableGlobalStack

  const parent = inject(StackSymbol, undefined)
  const stack: StackProvide = reactive({
    activeChildren: new Set<number>(),
  })
  provide(StackSymbol, stack)

  const _zIndex = shallowRef(Number(zIndex.value))
  useToggleScope(isActive, () => {
    const lastZIndex = globalStack.at(-1)?.[1]
    _zIndex.value = lastZIndex ? lastZIndex + 10 : Number(zIndex.value)

    if (createStackEntry) {
      globalStack.push([vm.uid, _zIndex.value])
    }

    parent?.activeChildren.add(vm.uid)

    onScopeDispose(() => {
      if (createStackEntry) {
        const idx = toRaw(globalStack).findIndex(v => v[0] === vm.uid)
        globalStack.splice(idx, 1)
      }

      parent?.activeChildren.delete(vm.uid)
    })
  })

  const globalTop = shallowRef(true)
  if (createStackEntry) {
    watchEffect(() => {
      const _isTop = globalStack.at(-1)?.[0] === vm.uid
      setTimeout(() => globalTop.value = _isTop)
    })
  }

  const localTop = computed(() => !stack.activeChildren.size)

  return {
    globalTop: readonly(globalTop),
    localTop,
    stackStyles: computed(() => ({ zIndex: _zIndex.value })),
  }
}
