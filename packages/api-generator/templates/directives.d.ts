import type { DirectiveBinding, ObjectDirective } from 'vue'
import type { CustomDirective } from '../../vuetify/src/composables/directiveComponent'
import type * as directives from '../../vuetify/src/directives/index.ts'

type ExtractDirectiveBindings<T> = T extends object
  ? {
    [K in keyof T]: T[K] extends CustomDirective<infer M>
      ? {
        [K in Exclude<keyof M, 'instance' | 'oldValue' | 'dir'>]: K extends 'modifiers'
          ? Record<string, boolean> extends M[K] ? never : M[K]
          : K extends 'arg'
            ? string extends M[K] ? never : M[K]
            : M[K]
      } & {}
      : T[K] extends { mounted: infer M }
        ? M extends (first: any, second: infer B) => any
          ? B extends object
            ? {
              [KK in keyof B as KK extends keyof Omit<DirectiveBinding, 'modifiers' | 'value'> ? never : KK]: B[KK]
            }
            : never
          : never
        : T[K] extends ObjectDirective<any, infer B>
          ? B extends object
            ? { value: B, modifiers: {} }
            : never
          : never
  }
  : never

type Plain<T> = T extends object
  ? {
    [K in keyof T]: T[K]
  }
  : never

export type Directives = Plain<ExtractDirectiveBindings<typeof directives>>
