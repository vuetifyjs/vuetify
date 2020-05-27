// Pathify
import { make } from 'vuex-pathify'

const state = {}

const mutations = make.mutations(state)

const actions = {
  init: ({ dispatch, rootState }) => {
    dispatch('ads/fetch', null, { root: true })
    dispatch('i18n/switch', { locale: rootState.route.params.locale }, { root: true })
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
