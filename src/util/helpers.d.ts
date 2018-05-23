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
export function getNestedValue (obj: object | Array<any>, path: Array<string | number>, fallback?: any): any
export function getObjectValueByPath (obj: object, path: string, fallback?: any): any
export function getPropertyFromItem (
  item: object,
  property: string | Array<string | number> | ((item: object, fallback?: any) => any),
  fallback?: any
): any
export function createRange (length: number): number[]
export function getZIndex (el: Element): number
export function escapeHTML (str: string): string
export function filterObjectOnKeys<T, K extends keyof T> (obj: T, keys: K[]): { [N in K]: T[N] }
export function filterChildren (array: VNode[], tag: string): VNode[]
export function convertToUnit (str: string | number, unit?: string): string
export function deepEqual (a: any, b: any): boolean
export function isObject (obj: any): obj is object

export interface KeyCodes {
  readonly enter: number
  readonly tab: number
  readonly delete: number
  readonly esc: number
  readonly space: number
  readonly up: number
  readonly down: number
  readonly left: number
  readonly right: number
  readonly end: number
  readonly home: number
  readonly del: number
  readonly backspace: number
  readonly insert: number
  readonly pageup: number
  readonly pagedown: number
}
export const keyCodes: KeyCodes
