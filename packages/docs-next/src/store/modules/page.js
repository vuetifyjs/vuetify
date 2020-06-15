// Pathify
import { make } from 'vuex-pathify'

// Data
const state = {
  drawer: null,
  toc: [],
}

const mutations = make.mutations(state)

const actions = {}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
