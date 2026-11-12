// Composables
import { useToggleScope } from '@/composables/toggleScope'

// Utilities
import {
  inject,
  onScopeDispose,
  provide,
  reactive,
  readonly,
  shallowRef,
  toRaw,
  toRef,
  toValue,
  watchEffect,
} from 'vue'
import { getCurrentInstance } from '@/util'

// Types
import type { InjectionKey, MaybeRefOrGetter, Ref } from 'vue'

const StackSymbol: InjectionKey<StackProvide> = Symbol.for('vuetify:stack')

interface StackProvide {
  activeChildren: Set<number>
}

const globalStack = reactive<[uid: number, zIndex: number, passive: boolean][]>([])

export function useStack (
  isActive: Readonly<Ref<boolean>>,
  zIndex: MaybeRefOrGetter<string | number>,
  disableGlobalStack: boolean,
  passive = false
) {
  const vm = getCurrentInstance('useStack')
  const createStackEntry = !disableGlobalStack

  const parent = inject(StackSymbol, undefined)
  const stack: StackProvide = reactive({
    activeChildren: new Set<number>(),
  })
  provide(StackSymbol, stack)

  const _zIndex = shallowRef(Number(toValue(zIndex)))
  useToggleScope(isActive, () => {
    const lastZIndex = globalStack.at(-1)?.[1]
    _zIndex.value = lastZIndex ? lastZIndex + 10 : Number(toValue(zIndex))

    if (createStackEntry) {
      globalStack.push([vm.uid, _zIndex.value, passive])
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
      const top = passive ? globalStack.at(-1) : globalStack.findLast(v => !v[2])
      const _isTop = top?.[0] === vm.uid
      setTimeout(() => globalTop.value = _isTop)
    })
  }

  const localTop = toRef(() => !stack.activeChildren.size)

  return {
    globalTop: readonly(globalTop),
    localTop,
    stackStyles: toRef(() => ({ zIndex: _zIndex.value })),
  }
}
