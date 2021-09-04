import type { TouchStoredHandlers } from './directives/touch'
import type { ComponentPublicInstance, FunctionalComponent, VNode } from 'vue'

import { IconProps } from '@/composables/icons'
import type { RouteLocationRaw } from 'vue-router'

declare global {
  interface HTMLCollection {
    [Symbol.iterator] (): IterableIterator<Element>
  }

  interface Element {
    _clickOutside?: {
      lastMousedownWasOutside: boolean
      onClick: EventListener
      onMousedown: EventListener
    }
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
    _transitionInitialStyles?: {
      position: string
      top: string
      left: string
      width: string
      height: string
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
    provides: Record<string, unknown>
  }
}

declare module '@vue/runtime-dom' {
  import type { Events } from '@vue/runtime-dom'

  type UnionToIntersection<U> =
    (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

  type Combine<T extends string> = T | {
    [K in T]: {
      [L in Exclude<T, K>]: `${K}${Exclude<T, K>}` | `${K}${L}${Exclude<T, K | L>}`
    }[Exclude<T, K>]
  }[T]

  type Modifiers = Combine<'Passive' | 'Capture' | 'Once'>

  type ModifiedEvents = UnionToIntersection<{
    [K in keyof Events]: { [L in `${K}${Modifiers}`]: Events[K] }
  }[keyof Events]>

  type EventHandlers<E> = {
    [K in keyof E]?: E[K] extends Function ? E[K] : (payload: E[K]) => void
  }

  export interface HTMLAttributes extends EventHandlers<ModifiedEvents> {
    style: any
  }
}

declare module 'vue-router' {
  export interface RouterLinkOptions {
    to: RouteLocationRaw
    replace?: boolean
  }
}
