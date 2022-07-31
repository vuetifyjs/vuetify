import type { Ref, UnwrapRef } from 'vue'
import type { UnionToIntersection } from '@/util'

const Refs = Symbol('Forwarded refs')

export function forwardRefs<T extends {}, U extends Ref<{} | undefined>[]> (
  target: T,
  ...refs: U
): T & UnwrapRef<UnionToIntersection<U[number]>> {
  (target as any)[Refs] = refs

  return new Proxy(target, {
    get (target, key) {
      if (Reflect.has(target, key)) {
        return Reflect.get(target, key)
      }
      for (const ref of refs) {
        if (ref.value && Reflect.has(ref.value, key)) {
          const val = Reflect.get(ref.value, key)
          return typeof val === 'function'
            ? val.bind(ref.value)
            : val
        }
      }
    },
    getOwnPropertyDescriptor (target, key) {
      const descriptor = Reflect.getOwnPropertyDescriptor(target, key)
      if (descriptor) return descriptor

      // Check each ref's own properties
      for (const ref of refs) {
        if (!ref.value) continue
        const descriptor = Reflect.getOwnPropertyDescriptor(ref.value, key)
        if (descriptor) return descriptor
      }
      // Recursive search up each ref's prototype
      for (const ref of refs) {
        let obj = ref.value && Object.getPrototypeOf(ref.value)
        while (obj) {
          const descriptor = Reflect.getOwnPropertyDescriptor(obj, key)
          if (descriptor) return descriptor
          obj = Object.getPrototypeOf(obj)
        }
      }
      // Call forwarded refs' proxies
      for (const ref of refs) {
        const childRefs = ref.value && (ref.value as any)[Refs]
        if (!childRefs) continue
        const queue = childRefs.slice()
        while (queue.length) {
          const ref = queue.shift()
          const descriptor = Reflect.getOwnPropertyDescriptor(ref.value, key)
          if (descriptor) return descriptor
          const childRefs = ref.value && (ref.value as any)[Refs]
          if (childRefs) queue.push(...childRefs)
        }
      }
      return undefined
    },
  }) as any
}
