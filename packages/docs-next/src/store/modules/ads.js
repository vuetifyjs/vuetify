// Imports
import bucket from '@/plugins/cosmicjs'

// Pathify
import { make } from 'vuex-pathify'

const state = {
  available: [],
}

const mutations = make.mutations(state)

const actions = {
  fetch: async ({ commit }) => {
    const { objects } = await bucket.getObjects({
      type: 'ads',
      props: 'metadata,title',
      status: 'published',
    })

    commit('available', objects)
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
