import { make } from 'vuex-pathify'

// initial state
const state = () => ({
  byTier: [],
})

// getters
const getters = make.getters(state())

// actions
const actions = make.actions(state())

// mutations
const mutations = make.mutations(state())

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
