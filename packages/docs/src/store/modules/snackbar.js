// Utilities
import { make } from 'vuex-pathify'

const state = {
  snackbar: {
    action_text: 'Close',
    action: '',
    color: 'success',
    emoji: '',
    slug: null,
    text: '',
  },
  value: false,
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
