// Utilities
import { make } from 'vuex-pathify'
import { subDays } from 'date-fns'
import bucket from '@/plugins/cosmicjs'

const state = {
  all: [],
}

const mutations = make.mutations(state)

const actions = {
  fetch: async ({ commit }) => {
    const { objects: notifications } = await bucket.getObjects({
      type: 'notifications',
      props: 'created_at,metadata,slug,title',
      status: 'published',
      limit: 10,
      sort: '-created_at',
      query: {
        created_at: {
          $gt: Math.ceil(subDays(Date.now(), 60).getTime()),
        },
      },
    })

    commit('all', notifications || [])
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
