declare module 'vuetify/src/util/helpers' {
  import { FunctionalComponentOptions, VNodeDirective } from 'vue'

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
    arg: VNodeDirective['arg'],
    modifiers: VNodeDirective['modifiers'],
    value: VNodeDirective['value']
  }
  export function directiveConfig (binding: BindingConfig, defaults: object): VNodeDirective
  export function addOnceEventListener (el: EventTarget, event: string, cb: () => void): void
  export function getObjectValueByPath (obj: object, path: string): any
  export function createRange (length: number): number[]
  export function getZIndex (el: Element): number
  export function escapeHTML (str: string): string
}
