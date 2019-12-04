// Utilities
import { make } from 'vuex-pathify'

const state = {
  currentVersion: null,
  drawer: null,
  isLoading: false,
  releases: [],
  supporters: require('@/data/api/supporters.json'),
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
