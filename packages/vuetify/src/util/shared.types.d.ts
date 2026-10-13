// Types
import type { ComponentPublicInstance, FunctionalComponent } from 'vue'

export type ClassValue = any

export type JSXComponent<Props = any> =
  | { new (): ComponentPublicInstance<Props> }
  | FunctionalComponent<Props>

export type TemplateRef = {
  (target: Element | ComponentPublicInstance | null): void
  value: HTMLElement | ComponentPublicInstance | null | undefined
  readonly el: HTMLElement | undefined
}

export type SelectItemKey<T = Record<string, any>> =
  | boolean | null | undefined
  | string
  | readonly (string | number)[]
  | ((item: T, fallback?: any) => any)

export type ValueComparator = (a: any, b: any) => boolean

export type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never
