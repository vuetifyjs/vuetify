// Imports
import bucket from '@/plugins/cosmicjs'

// Pathify
import { make } from 'vuex-pathify'

const state = {
  all: [],
}

const mutations = make.mutations(state)

const actions = {
  fetch: async ({ commit }) => {
    if (!bucket.available) return

    const { objects } = await bucket.objects.find({
      type: 'ads',
    })
      .props('metadata,slug,title')
      .status('published')

    commit('all', objects || [])
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
