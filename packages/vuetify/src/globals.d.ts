/* eslint-disable max-len */
import type { TouchStoredHandlers } from './directives/touch'

declare global {
  interface HTMLCollection {
    [Symbol.iterator] (): IterableIterator<Element>
  }

  interface Element {
    getElementsByClassName(classNames: string): NodeListOf<HTMLElement>
  }

  interface HTMLElement {
    _clickOutside?: EventListenerOrEventListenerObject
    _onResize?: {
      handler: () => void
      options: AddEventListenerOptions
    }
    _ripple?: {
      enabled?: boolean
      centered?: boolean
      class?: string
      circle?: boolean
      touched?: boolean
      isTouch?: boolean
      showTimer?: number
      showTimerCommit?: (() => void) | null
    }
    _observe?: {
      init: boolean
      observer: IntersectionObserver
    }
    _mutate?: {
      observer: MutationObserver
    }
    _onScroll?: {
      handler: EventListenerOrEventListenerObject
      options: AddEventListenerOptions
      target?: EventTarget
    }
    _touchHandlers?: {
      [_uid: number]: TouchStoredHandlers
    }
  }

  interface WheelEvent {
    path?: EventTarget[]
  }

  interface UIEvent {
    initUIEvent (typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number): void
  }

  function parseInt(s: string | number, radix?: number): number
  function parseFloat(string: string | number): number

  export type Dictionary<T> = Record<string, T>

  export const __VUETIFY_VERSION__: string
  export const __REQUIRED_VUE__: string
}

declare module '@vue/runtime-core' {
  export interface ComponentInternalInstance {
    ctx: Record<string, unknown>
  }
}
