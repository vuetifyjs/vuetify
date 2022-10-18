import type { AllowedComponentProps, ComponentPublicInstance, FunctionalComponent, RenderFunction, VNodeChild, VNodeProps } from 'vue'
import type { __component__ } from '@/components'

type Slot<T extends any[] = any[]> = (...args: T) => VNodeChild
export type MakeSlots<T extends Record<string, any[]>> = {
  [K in keyof T]?: Slot<T[K]>
}

type StripProps = keyof VNodeProps | keyof AllowedComponentProps | 'v-slots' | '$children'
type Event = `on${string}`

type Props<T> = T extends { $props: infer P extends object }
  ? { [K in Exclude<keyof P, StripProps | Event>]: P[K] }
  : never

type Events<T> = T extends { $props: infer P extends object }
  ? {
    [K in Exclude<keyof P, StripProps> as K extends `on${infer N}`
      ? Uncapitalize<N>
      : never
    ]: P[K] extends ((...args: any[]) => any)
      ? Parameters<P[K]>
      : never
  }
  : never

export type ComponentProps = Props<__component__>
export type ComponentEvents = Events<__component__>

type RemoveIndex<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
      ? never
      : symbol extends K
        ? never
        : K
  ]: T[K]
}

type RemoveSlot<T> = T extends MakeSlots<infer V>
  ? V extends object
    ? {
      [P in keyof V]: V[P] extends [infer U] ? U : never
    }
    : never
  : never

type Slots<T> = T extends { $slots: infer S }
  ? RemoveSlot<RemoveIndex<S>>
  : never

export type ComponentSlots = Slots<__component__>

type ExtractExposed<T> = T extends (...args: any[]) => infer R
  ? R extends Promise<any>
    ? never
    : R extends RenderFunction
      ? never
      : R extends void
        ? never
        : R extends object
          ? RemoveIndex<R>
          : never
  : never

export type ComponentExposed = ExtractExposed<__component__['$options']['setup']>
