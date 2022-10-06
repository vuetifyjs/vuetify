import type { AllowedComponentProps, ComponentPublicInstance, FunctionalComponent, RenderFunction, VNodeChild, VNodeProps } from 'vue'
import type { __component__ } from '@/components'

type Slot<T extends any[] = any[]> = (...args: T) => VNodeChild
export type MakeSlots<T extends Record<string, any[]>> = {
  [K in keyof T]?: Slot<T[K]>
}

type StripProps = keyof VNodeProps | keyof AllowedComponentProps | 'v-slots' | '$children'

type OnEvents<K extends string | symbol | number> = K extends `on${infer E}:${infer P}` ? K : never

type ExtractOnEvents<T> = T extends object ? {
  [K in keyof T as K extends OnEvents<K> ? K : never]: T[K]
} : never

type OmitOnEvents<T> = T extends object ? {
  [K in keyof T as K extends OnEvents<K> ? never : K]: T[K]
} : never

type Props<T> = T extends { $props: infer P }
  ? P extends object
    ? {
      [K in keyof P as K extends StripProps ? never : K]: P[K]
    }
    : never
  : never

export type ComponentProps = OmitOnEvents<Props<__component__>>

type RemoveIndex<T> = {
  [ K in keyof T as string extends K ? never : number extends K ? never : symbol extends K ? never : K]: T[K]
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

type ExtractEvents<T> = T extends string[]
  ? never
  : T extends undefined
    ? never
    : T extends object
      ? {
        [K in keyof T]: T[K]
      }
      : never

export type ComponentEvents = ExtractEvents<__component__['$options']['emits']>

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

// type StrategyProps = {
//   title: string
//   strategy: 'foo' | ((props: StrategyProps) => boolean)
// }

// export type ComponentExposed = {
//   foo: StrategyProps
// }
