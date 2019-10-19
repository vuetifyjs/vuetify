// Utilities
import { make } from 'vuex-pathify'

const state = {
  drawer: null,
  currentVersion: null,
  isLoading: false,
  releases: [],
  supporters: {},
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
