// Pathify
import { make } from 'vuex-pathify'

// Utilities
import { getBranch } from '../../util/helpers'
import { ROOT_DISPATCH } from '@/store'

// Data

const state = {
  branch: getBranch(),
  drawer: true,
  modified: {},
  nav: [],
  snackbar: {
    show: false,
    refresh: false,
    dismiss: false,
    message: '',
    timeout: 4000,
  },
  version: null,
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  init: async ({ dispatch }) => {
    dispatch('ads/fetch', null, ROOT_DISPATCH)
  },
  showSnackbar ({ state }, data) {
    state.snackbar = Object.assign(state.snackbar, data)
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
