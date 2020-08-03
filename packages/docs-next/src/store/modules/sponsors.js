// Api
import bucket from '@/plugins/cosmicjs'

// Pathify
import { make } from 'vuex-pathify'

const state = {
  all: [],
}

const mutations = make.mutations(state)

const actions = {
  fetch: async ({ commit, state }) => {
    const { objects: items } = await bucket.getObjects({
      type: 'sponsors',
      props: 'slug,title,metadata',
      sort: 'created_at',
      'metadata[status]': true,
    })

    commit('all', items)
  },
}

const getters = {
  byTier: (state, getters) => {
    const tiers = {}

    for (const sponsor of state.all) {
      const tier = sponsor.metadata.tier

      if (!tiers[tier]) {
        tiers[tier] = []
      }

      tiers[tier].push(sponsor)
    }

    return tiers
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
