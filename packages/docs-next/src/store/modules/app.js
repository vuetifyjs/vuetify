// Pathify
import { make } from 'vuex-pathify'

// Utilities
import { getBranch } from '../../util/helpers'
import { ROOT_DISPATCH } from '@/store'

// Data

const state = {
  branch: getBranch(),
  modified: {},
  nav: [],
  version: null,
}

const mutations = make.mutations(state)

const actions = {
  init: async ({ dispatch }) => {
    dispatch('ads/fetch', null, ROOT_DISPATCH)
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
