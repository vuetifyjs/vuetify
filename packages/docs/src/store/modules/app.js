// Utilities
import { make } from 'vuex-pathify'
import bucket from '@/plugins/cosmicjs'

const state = {
  currentVersion: null,
  drawer: null,
  isLoading: false,
  releases: [],
  supporters: [],
}

const mutations = make.mutations(state)

const actions = {
  fetchSponsors: async ({ commit, state }) => {
    if (state.supporters.length > 0) return

    const { objects: items } = await bucket.getObjects({
      type: 'sponsors',
      props: 'title,metadata',
      sort: 'created_at',
      'metadata[status]': true,
    })

    commit('SET_SUPPORTERS', items)
  },
  init: ({ dispatch }) => {
    dispatch('fetchSponsors')
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
