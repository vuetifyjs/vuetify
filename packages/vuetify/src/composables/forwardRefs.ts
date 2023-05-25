// Types
import type { ComponentPublicInstance, Ref, UnwrapRef } from 'vue'
import type { UnionToIntersection } from '@/util'

const Refs = Symbol('Forwarded refs')

/** Omit properties starting with P */
type OmitPrefix<T, P extends string> = [Extract<keyof T, `${P}${any}`>] extends [never] ? T : Omit<T, `${P}${any}`>

type OmitProps<T> = T extends { $props: any } ? Omit<T, keyof T['$props']> : T

function getDescriptor (obj: any, key: PropertyKey) {
  let currentObj = obj
  while (currentObj) {
    const descriptor = Reflect.getOwnPropertyDescriptor(currentObj, key)
    if (descriptor) return descriptor
    currentObj = Object.getPrototypeOf(currentObj)
  }
  return undefined
}

export function forwardRefs<T extends {}, U extends Ref<HTMLElement | Omit<ComponentPublicInstance, '$emit' | '$slots'> | undefined>[]> (
  target: T,
  ...refs: U
): T & UnionToIntersection<{ [K in keyof U]: OmitPrefix<OmitProps<NonNullable<UnwrapRef<U[K]>>>, '$'> }[number]> {
  (target as any)[Refs] = refs

  return new Proxy(target, {
    get (target, key) {
      if (Reflect.has(target, key)) {
        return Reflect.get(target, key)
      }

      // Skip internal properties
      if (typeof key === 'symbol' || key.startsWith('__')) return

      for (const ref of refs) {
        if (ref.value && Reflect.has(ref.value, key)) {
          const val = Reflect.get(ref.value, key)
          return typeof val === 'function'
            ? val.bind(ref.value)
            : val
        }
      }
    },
    has (target, key) {
      if (Reflect.has(target, key)) {
        return true
      }

      // Skip internal properties
      if (typeof key === 'symbol' || key.startsWith('__')) return false

      for (const ref of refs) {
        if (ref.value && Reflect.has(ref.value, key)) {
          return true
        }
      }
      return false
    },
    getOwnPropertyDescriptor (target, key) {
      const descriptor = Reflect.getOwnPropertyDescriptor(target, key)
      if (descriptor) return descriptor

      // Skip internal properties
      if (typeof key === 'symbol' || key.startsWith('__')) return

      // Check each ref's own properties
      for (const ref of refs) {
        if (!ref.value) continue
        const descriptor = getDescriptor(ref.value, key) ?? ('_' in ref.value ? getDescriptor(ref.value._?.setupState, key) : undefined)
        if (descriptor) return descriptor
      }

      // Recursive search up each ref's prototype
      for (const ref of refs) {
        const childRefs = ref.value && (ref.value as any)[Refs]
        if (!childRefs) continue
        const queue = childRefs.slice()
        while (queue.length) {
          const ref = queue.shift()
          const descriptor = getDescriptor(ref.value, key)
          if (descriptor) return descriptor
          const childRefs = ref.value && (ref.value as any)[Refs]
          if (childRefs) queue.push(...childRefs)
        }
      }

      return undefined
    },
  }) as any
}
