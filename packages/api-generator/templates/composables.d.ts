import type vuetify from '../../vuetify/lib/index.d.mts'

type IsComposable<T extends string | number | symbol> = T extends `use${Capitalize<infer _>}` ? T : never;

type ExtractComposables<T> = T extends object
  ? {
    [K in keyof T as K extends IsComposable<K> ? K : never]: T[K]
  }
  : never

export type Composables = ExtractComposables<typeof vuetify>
