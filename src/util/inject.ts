import Vue, { VueConstructor } from 'vue'
import { ExtendedVue } from 'vue/types/vue'

type Injectable<N extends string, T> = ExtendedVue<Vue, {
  [K in N]: T
}, {}, {}, {}>

export function injectOne<TA> () {
  return function inject<A extends string> (a: A): Injectable<A, TA> {
    return Vue.extend({
      inject: [a]
    })
  }
}

export function injectTwo<TA, TB> () {
  return function inject<A extends string, B extends string> (a: A, b: B): VueConstructor<Vue & { [K in A]: TA } & { [K in B]: TB }> {
    return Vue.extend({
      inject: {
        [a]: { default: null },
        [b]: { default: null }
      }
    })
  }
}
