import type { Ref, UnwrapRef } from 'vue'
import type { UnionToIntersection } from '@/util'

export function useForwardRef<T extends {}, U extends Ref<{} | undefined>[]> (
  target: T,
  ...refs: U
): T & UnwrapRef<UnionToIntersection<U[number]>> {
  return new Proxy(target, {
    get (target, key) {
      if (Reflect.has(target, key)) {
        return Reflect.get(target, key)
      }
      for (const ref of refs) {
        if (ref.value && Reflect.has(ref.value, key)) {
          return Reflect.get(ref.value, key)
        }
      }
    },
    getOwnPropertyDescriptor (target, key) {
      return Reflect.getOwnPropertyDescriptor(target, key) ?? (
        refs.find(ref => ref.value && Reflect.getOwnPropertyDescriptor(ref.value, key))
      )
    },
  }) as any
}
