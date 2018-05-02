import { FunctionalComponentOptions, VNode, VNodeDirective } from 'vue'

export function createSimpleFunctional (
  c: string,
  el?: string,
  name?: string
): FunctionalComponentOptions

export function createSimpleTransition (
  name: string,
  origin?: string,
  mode?: string
): FunctionalComponentOptions

export interface EventHandlersDict {
  [event: string]: () => any
}
export function createJavaScriptTransition (
  name: string,
  functions: EventHandlersDict,
  css: boolean,
  mode: string
): FunctionalComponentOptions

export interface BindingConfig {
  arg: VNodeDirective['arg']
  modifiers: VNodeDirective['modifiers']
  value: VNodeDirective['value']
}
export function directiveConfig (binding: BindingConfig, defaults: object): VNodeDirective
export function addOnceEventListener (el: EventTarget, event: string, cb: () => void): void
export function getObjectValueByPath (obj: object, path: string): any
export function createRange (length: number): number[]
export function getZIndex (el: Element): number
export function escapeHTML (str: string): string
export function filterObjectOnKeys<T, K extends keyof T> (obj: T, keys: K[]): { [N in K]: T[N] }
export function filterChildren (array: VNode[], tag: string): VNode[]
export function convertToUnit (str: string | number, unit?: string): string
