/* eslint-disable max-len */

import { VueConstructor, ComponentOptions, PluginFunction, FunctionalComponentOptions } from 'vue'
import { CombinedVueInstance, Vue } from 'vue/types/vue'
import {
  DefaultComputed,
  DefaultData,
  DefaultMethods, DefaultProps, PropsDefinition,
  RecordPropsDefinition,
  ThisTypedComponentOptionsWithArrayProps,
  ThisTypedComponentOptionsWithRecordProps
} from 'vue/types/options'

declare global {
  interface Window {
    Vue: VueConstructor
  }

  export const __VUETIFY_VERSION__: string
  export const __REQUIRED_VUE__: string
}

type maybeEmpty = {} | undefined

declare module 'vue/types/vue' {
  export type OptionsVue<Instance extends Vue, Data, Methods, Computed, Props, RawProps = undefined> = VueConstructor<
    CombinedVueInstance<Instance, Data, Methods, Computed, Props> & Vue,
    Data,
    Methods,
    Computed,
    RawProps
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
    Data = {} | undefined,
    Methods = {} | undefined,
    Computed = {} | undefined,
    Props = {} | undefined
  > {
    version: string
    install?: PluginFunction<never>
    options: RawComponentOptions<V, Data, Methods, Computed, Props>

    extend<Data, Methods, Computed, PropNames extends string = never> (options?: ThisTypedComponentOptionsWithArrayProps<V, Data, Methods, Computed, PropNames>): OptionsVue<V, Data, Methods, Computed, Record<PropNames, any>>
    extend<Data, Methods, Computed, Props> (options?: ThisTypedComponentOptionsWithRecordProps<V, Data, Methods, Computed, Props>): OptionsVue<V, Data, Methods, Computed, Props>
    extend<PropNames extends string = never> (definition: FunctionalComponentOptions<Record<PropNames, any>, PropNames[]>): OptionsVue<V, {}, {}, {}, Record<PropNames, any>>
    extend<Props> (definition: FunctionalComponentOptions<Props, RecordPropsDefinition<Props>>): OptionsVue<V, {}, {}, {}, Props>
    extend (options?: ComponentOptions<V>): OptionsVue<V, {}, {}, {}, {}>
  }
}
