import type { TouchStoredHandlers } from './directives/touch'
import type { VNode, ComponentPublicInstance, FunctionalComponent } from 'vue'

import { IconProps } from '@/composables/icons'

declare global {
  interface HTMLCollection {
    [Symbol.iterator] (): IterableIterator<Element>
  }

  interface Element {
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

    getElementsByClassName(classNames: string): NodeListOf<HTMLElement>
  }

  interface WheelEvent {
    path?: EventTarget[]
  }

  interface UIEvent {
    initUIEvent (
      typeArg: string,
      canBubbleArg: boolean,
      cancelableArg: boolean,
      viewArg: Window,
      detailArg: number,
    ): void
  }

  function parseInt(s: string | number, radix?: number): number
  function parseFloat(string: string | number): number

  export type Dictionary<T> = Record<string, T>

  export type Writable<T> = {
    -readonly [P in keyof T]: T[P];
  }

  export const __VUETIFY_VERSION__: string
  export const __REQUIRED_VUE__: string

  namespace JSX {
    interface Element extends VNode {}
    interface IntrinsicAttributes {
      [name: string]: any
    }
  }
}

declare module 'vue' {
  export type JSXComponent<Props = any> = { new (): ComponentPublicInstance<Props> } | FunctionalComponent<Props>
}

declare module '@vue/runtime-core' {
  export interface ComponentInternalInstance {
    ctx: Record<string, unknown>
  }
}

declare module '@vue/runtime-dom' {
  export interface HTMLAttributes {
    style: any
  }
}
