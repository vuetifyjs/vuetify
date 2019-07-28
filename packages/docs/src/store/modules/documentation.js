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
    structure: null,
    toc: [],
  },

  getters: {
    namespace (state, getters, rootState) {
      if (!rootState || !rootState.route || !rootState.route.params) return undefined
      return upperFirst(camelCase(rootState.route.params.namespace))
    },
    page (state, getters, rootState) {
      if (!rootState || !rootState.route || !rootState.route.params) return undefined
      return upperFirst(camelCase(rootState.route.params.page))
    },
  },

  mutations: {
    pushToc: (state, payload) => {
      if (state.toc.find(item => item.id === payload.id)) {
        return
      }

      state.toc.push(payload)
    },
    setStructure: (state, payload) => {
      set('structure')(state, payload)

      if (payload) {
        state.toc = []
      }
    },
  },
}
