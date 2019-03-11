import deprecatedIn from '@/data/deprecated'
import newIn from '@/data/new'

// Utilities
import { set } from '@/util/vuex'
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'

export default {
  namespaced: true,

  state: {
    deprecatedIn,
    newIn,
    namespace: null,
    page: null,
    structure: null
  },

  getters: {
    namespace (state, getters, rootState) {
      if (!rootState || !rootState.route) return undefined

      return upperFirst(camelCase(rootState.route.params.namespace))
    },
    page (state, getters, rootState) {
      if (!rootState || !rootState.route) return undefined

      return upperFirst(camelCase(rootState.route.params.page))
    }
  },

  mutations: {
    setStructure: set('structure')
  }
}
