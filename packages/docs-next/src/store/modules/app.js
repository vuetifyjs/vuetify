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
    action: false,
    message: '',
    type: '',
    timeout: 3000,
  },
  version: null,
}

const mutations = make.mutations(state)

const actions = {
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
