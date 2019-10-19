// Utilities
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'
import { make } from 'vuex-pathify'

const state = {
  deprecatedIn: require('@/data/deprecated.json'),
  newIn: require('@/data/new.json'),
  namespace: null,
  page: null,
  structure: null,
  toc: [],
  templates: require('@/data/templates.json'),
}

const mutations = make.mutations(state)

export default {
  namespaced: true,
  state,
  mutations,

  getters: {
    themes (state) {
      return Object.values(state.templates)
    },
    namespace (state, getters, rootState) {
      return (!rootState || !rootState.route || !rootState.route.params)
        ? undefined
        : upperFirst(camelCase(rootState.route.params.namespace))
    },
    page (state, getters, rootState) {
      return (!rootState || !rootState.route || !rootState.route.params)
        ? undefined
        : upperFirst(camelCase(rootState.route.params.page))
    },
  },
}
