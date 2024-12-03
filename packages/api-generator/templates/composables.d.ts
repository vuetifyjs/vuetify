import type vuetify from '../../vuetify/lib/framework.d.ts'

type IsComposable<T extends string | number | symbol> = T extends `use${Capitalize<infer _>}` ? T : never;

type ExtractComposables<T> = T extends object
  ? {
    [K in keyof T as K extends IsComposable<K> ? K : never]: T[K]
  }
  : never

export type Composables = Prettify<ExtractComposables<typeof vuetify>>

type Prettify<T> = { [K in keyof T]: T[K] } & {}
