import type { AllowedComponentProps, ComponentOptionsBase, VNodeChild, VNodeProps, UnwrapRef } from 'vue'
import type { UnionToIntersection } from '@/util'
import type { __component__ } from '@/__name__'

type StripProps =
  | keyof VNodeProps
  | keyof AllowedComponentProps
  | 'v-slots'
  | '$children'
  | `v-slot:${string}`
  | `on${Capitalize<string>}Once`
type Event = `on${string}`

type Props<T> = T extends { $props: infer P extends object }
  ? {
    [K in Exclude<keyof P, StripProps | Event>]: Exclude<P[K], undefined> extends VNodeProps
      ? unknown
      : P[K]
  }
  : never

type Events<T> = T extends { $props: infer P extends object }
  ? {
    [K in Exclude<keyof P, StripProps> as K extends `on${infer N}`
      ? Uncapitalize<N>
      : never
    ]: Exclude<P[K], undefined> extends ((...args: any[]) => any)
      ? Parameters<Exclude<P[K], undefined>>
      : never
  }
  : never

export type ComponentProps = Props<__component__>
export type ComponentEvents = Events<__component__>

type Slot<T extends any[] = any[]> = (...args: T) => VNodeChild
type Slots<
  T extends { $props: any },
  S = '$children' extends keyof T['$props'] ? Exclude<T['$props']['$children'], VNodeChild> : never
> = '$children' extends keyof T['$props']
  ? ExcludeEmpty<{ [K in keyof S]-?: Exclude<S[K], undefined> extends Slot<infer A> ? A[0] : never }>
  : never

type AtLeastOne<T, U = {[K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]
type ExcludeEmpty<T> = T extends AtLeastOne<T> ? T : never

export type ComponentSlots = Slots<__component__>

type ExtractExposed<T> = T extends ComponentOptionsBase<any, infer B, any, any, any, any, any, any>
  ? B extends void ? never
  : B extends { _allExposed: infer E } ? E
  : B extends object ? B
  : never
  : never

type Pretty<T> = { [K in keyof T]: UnwrapRef<T[K]> }

// Filter out HTMLInputElement props from exposed
type CleanHTMLInputElement<T> = {
  // If key is in HTMLInputElement
  [K in keyof T as K extends keyof HTMLInputElement
    ? // If value is the same type in HTMLInputElement
      T[K] extends HTMLInputElement[K]
      ? never
      : K
    : K]: T[K];
};

export type ComponentExposed = Pretty<CleanHTMLInputElement<UnionToIntersection<ExtractExposed<__component__['$options']>>>>
