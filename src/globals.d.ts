/* eslint-disable max-len */

import { VueConstructor, ComponentOptions, PluginFunction, FunctionalComponentOptions } from 'vue'
import { CombinedVueInstance, Vue } from 'vue/types/vue'
import {
  RecordPropsDefinition,
  ThisTypedComponentOptionsWithArrayProps,
  ThisTypedComponentOptionsWithRecordProps
} from 'vue/types/options'

declare global {
  interface Window {
    Vue: VueConstructor
  }

  function parseInt(s: string | number, radix?: number): number
  function parseFloat(string: string | number): number

  export const __VUETIFY_VERSION__: string
  export const __REQUIRED_VUE__: string
}

declare module 'vue/types/vue' {
  export type OptionsVue<Instance extends Vue, Data, Methods, Computed, Props, Options = {}> = VueConstructor<
    CombinedVueInstance<Instance, Data, Methods, Computed, Props> & Vue,
    Options
  >

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
    install?: PluginFunction<never>
    options: Options

    extend<Data, Methods, Computed, Options, PropNames extends string = never> (options?: ThisTypedComponentOptionsWithArrayProps<V, Data, Methods, Computed, PropNames> & Options): OptionsVue<V, Data, Methods, Computed, Record<PropNames, any>, Options>
    extend<Data, Methods, Computed, Props, Options> (options?: ThisTypedComponentOptionsWithRecordProps<V, Data, Methods, Computed, Props> & Options): OptionsVue<V, Data, Methods, Computed, Props, Options>
    extend<Options, PropNames extends string = never> (definition: FunctionalComponentOptions<Record<PropNames, any>, PropNames[]> & Options): OptionsVue<V, {}, {}, {}, Record<PropNames, any>, Options>
    extend<Props, Options> (definition: FunctionalComponentOptions<Props, RecordPropsDefinition<Props>> & Options): OptionsVue<V, {}, {}, {}, Props, Options>
    extend<V extends Vue = Vue> (options?: ComponentOptions<V> & Options): OptionsVue<V, {}, {}, {}, {}, Options>
  }
}
