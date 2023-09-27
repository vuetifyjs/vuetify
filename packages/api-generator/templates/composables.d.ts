import type vuetify from '../../vuetify/lib/index.d.mts'
import type { useDate } from '../../vuetify/lib/labs/date/index.d.mts'

type IsComposable<T extends string | number | symbol> = T extends `use${Capitalize<infer _>}` ? T : never;

type ExtractComposables<T> = T extends object
  ? {
    [K in keyof T as K extends IsComposable<K> ? K : never]: T[K]
  }
  : never

export type Composables = Prettify<ExtractComposables<typeof vuetify> & { useDate: typeof useDate }>

type Prettify<T> = { [K in keyof T]: T[K] } & {}
