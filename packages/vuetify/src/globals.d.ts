/* eslint-disable max-len */

import {
  VueConstructor,
  ComponentOptions,
  FunctionalComponentOptions,
  VNodeData,
} from 'vue'
import { CombinedVueInstance, Vue } from 'vue/types/vue'
import {
  RecordPropsDefinition,
  ThisTypedComponentOptionsWithArrayProps,
  ThisTypedComponentOptionsWithRecordProps,
} from 'vue/types/options'
import { MetaInfo } from 'vue-meta/types'
import { TouchStoredHandlers } from './directives/touch'

declare global {
  interface Window {
    Vue: VueConstructor
  }

  interface HTMLCollection {
    [Symbol.iterator] (): IterableIterator<Element>
  }

  interface Element {
    getElementsByClassName(classNames: string): NodeListOf<HTMLElement>
  }

  interface HTMLElement {
    _clickOutside?: Record<number, {
      onClick: EventListener
      onMousedown: EventListener
    } | undefined> & { lastMousedownWasOutside: boolean }
    _onResize?: Record<number, {
      callback: () => void
      options?: boolean | AddEventListenerOptions
    } | undefined>
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
    _observe?: Record<number, {
      init: boolean
      observer: IntersectionObserver
    } | undefined>
    _mutate?: Record<number, {
      observer: MutationObserver
    } | undefined>
    _onScroll?: Record<number, {
      handler: EventListenerOrEventListenerObject
      options: boolean | AddEventListenerOptions
      target?: EventTarget
    } | undefined>
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

declare module 'vue/types/vnode' {
  export interface VNodeData {
    model?: {
      callback: (v: any) => void
      expression: string
      value: any
    }
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    head?: MetaInfo | (() => MetaInfo)
  }
}

declare module 'vue/types/vue' {
  export type OptionsVue<Instance extends Vue, Data, Methods, Computed, Props, Options = {}> = VueConstructor<
    CombinedVueInstance<Instance, Data, Methods, Computed, Props> & Vue,
    Options
  >

  export interface Vue {
    readonly _uid: number
    readonly _isDestroyed: boolean

    /** bindObjectProps */
    _b (
      data: VNodeData,
      tag: string,
      value: Dictionary<any> | Dictionary<any>[],
      asProp?: boolean,
      isSync?: boolean
    ): VNodeData

    /** bindObjectListeners */
     _g (data: VNodeData, value: {}): VNodeData
  }

  export interface RawComponentOptions<
    V extends Vue = Vue,
    Data = {} | undefined,
    Methods = {} | undefined,
    Computed = {} | undefined,
    Props = {} | undefined
  > {
    name?: string
    data: Data
    methods: Methods
    computed: {
      [C in keyof Computed]: (this: V) => Computed[C]
    }
    props: Props
  }

  interface VueConstructor<
    V extends Vue = Vue,
    Options = Record<string, any>
  > {
    version: string
    /* eslint-disable-next-line camelcase */
    $_vuetify_subcomponents?: Record<string, VueConstructor>
    /* eslint-disable-next-line camelcase */
    $_vuetify_installed?: true
    options: Options

    extend<Data, Methods, Computed, Options, PropNames extends string = never> (options?: ThisTypedComponentOptionsWithArrayProps<V, Data, Methods, Computed, PropNames> & Options): OptionsVue<V, Data, Methods, Computed, Record<PropNames, any>, Options>
    extend<Data, Methods, Computed, Props, Options> (options?: ThisTypedComponentOptionsWithRecordProps<V, Data, Methods, Computed, Props> & Options): OptionsVue<V, Data, Methods, Computed, Props, Options>
    extend<Options, PropNames extends string = never> (definition: FunctionalComponentOptions<Record<PropNames, any>, PropNames[]> & Options): OptionsVue<V, {}, {}, {}, Record<PropNames, any>, Options>
    extend<Props, Options> (definition: FunctionalComponentOptions<Props, RecordPropsDefinition<Props>> & Options): OptionsVue<V, {}, {}, {}, Props, Options>
    extend<V extends Vue = Vue> (options?: ComponentOptions<V> & Options): OptionsVue<V, {}, {}, {}, {}, Options>
  }
}
