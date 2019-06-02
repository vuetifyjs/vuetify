/* eslint-disable max-len, import/export */
import {
  ComponentOptions,
  RecordPropsDefinition,
  ThisTypedComponentOptionsWithArrayProps,
  ThisTypedComponentOptionsWithRecordProps,
} from 'vue/types/options'
import { Vue } from 'vue/types/vue'
import { FunctionalComponentOptions } from 'vue'

type V = Vue

// Maybe don't actually use this, it doesn't work very well
export default function component<Data, Methods, Computed, PropNames extends string = never> (options?: ThisTypedComponentOptionsWithArrayProps<V, Data, Methods, Computed, PropNames>): ThisTypedComponentOptionsWithArrayProps<V, Data, Methods, Computed, PropNames>
export default function component<Data, Methods, Computed, Props> (options?: ThisTypedComponentOptionsWithRecordProps<V, Data, Methods, Computed, Props>): ThisTypedComponentOptionsWithRecordProps<V, Data, Methods, Computed, Props>
export default function component<PropNames extends string = never> (definition: FunctionalComponentOptions<Record<PropNames, any>, PropNames[]>): FunctionalComponentOptions<Record<PropNames, any>, PropNames[]>
export default function component<Props> (definition: FunctionalComponentOptions<Props, RecordPropsDefinition<Props>>): FunctionalComponentOptions<Props, RecordPropsDefinition<Props>>
export default function component (options?: ComponentOptions<V>): ComponentOptions<V>
export default function component<T> (options: T): T {
  return options
}
