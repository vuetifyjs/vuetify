import Vue, { VueConstructor } from 'vue'
import { ExtendedVue } from 'vue/types/vue'
import { DataTableProvide as DataTableProvideInterface } from '../components/VDataTable/VDataTable'

// type Injectable<T extends string, P> = ExtendedVue<Vue, {
//   [K in T]: P
// }, {}, {}, {}>

type Injectable<N extends string, T> = ExtendedVue<Vue, {
  [K in N]: T
}, {}, {}, {}>

type DataTableProvide = ExtendedVue<Vue, {
  dataTable: DataTableProvideInterface
}, {}, {}, {}>

// export default function inject<T> () {
//   return function inject<N extends string> (name: N): VueConstructor<Vue & { [K in N]: T }> {
//     return Vue.extend({
//       inject: [name]
//     })
//   }
// }
// VueConstructor<Vue & { [K in A]: TA }>
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

// export default function inject<A, B> () {
//   return function inject<NA extends string, NB extends string> (nameA: NA, nameB: NB): VueConstructor<Vue & {
//     [K in NA]: A
//     [K in NB]: B
//   }
// }

// export default function inject<P> (namespace: string): Injectable<string, P> {
//   return Vue.extend({
//     inject: {
//       [namespace]: {}
//     }
//   })
// }

// export default function inject (): DataTableProvide {
//   return Vue.extend({
//     inject: ['dataTable']
//   })
// }
