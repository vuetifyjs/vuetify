import type { DirectiveBinding } from 'vue'
import type * as directives from '../../vuetify/lib/directives/index.d.mts'

type ExtractDirectiveBindings<T> = T extends object
  ? {
    [K in keyof T]: T[K] extends { mounted: infer M }
      ? M extends (first: any, second: infer B) => any
        ? B extends object
          ? {
            [KK in keyof B as KK extends keyof Omit<DirectiveBinding, 'modifiers' | 'value'> ? never : KK]: B[KK]
          }
          : never
        : never
      : {}
  }
  : never

type Plain<T> = T extends object
  ? {
    [K in keyof T]: T[K]
  }
  : never

export type Directives = Plain<ExtractDirectiveBindings<typeof directives>>
