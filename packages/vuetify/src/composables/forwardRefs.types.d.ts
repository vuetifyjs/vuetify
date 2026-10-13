// Types
import type { ComponentOptionsBase } from 'vue'
import type { UnionToIntersection } from '@/util/shared.types'

/** Omit properties starting with P */
type OmitPrefix<
  T,
  P extends string,
  E = Extract<keyof T, `${P}${any}`>,
> = [E] extends [never] ? T : Omit<T, `${P}${any}`>
type OmitPrivate<T> = OmitPrefix<T, '$'>

/** Omit keyof $props from T */
type OmitProps<T> = T extends { $props: any } ? Omit<T, keyof T['$props']> : T

/** Instance type of a component exposing T and forwarding the members of Refs (element or instance types) */
export type ForwardRefs<
  T,
  Refs extends readonly unknown[],
  UU = Refs[number],
  UC = { [K in keyof Refs]: OmitPrivate<OmitProps<Refs[K]>> }[number],
> = T & UnionToIntersection<UC> & {
  _allExposed: T | (
    UU extends { $options: infer O }
      ? O extends ComponentOptionsBase<any, infer E, any, any, any, any, any, any>
        ? [E] extends [void] ? never : E extends (...args: any[]) => any ? never : E
        : never
      : never
  )
}
