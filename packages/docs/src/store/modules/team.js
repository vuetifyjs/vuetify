// Utilities
import { make } from 'vuex-pathify'
import octokit from '@/plugins/octokit'

// Data
import team from '@/data/team'

const state = {
  all: [],
}

const mutations = make.mutations(state)

const actions = {
  fetch: async ({ commit, state }) => {
    if (state.all.length) return

    const all = []
    const { data: members } = await octokit.request('GET /orgs/vuetifyjs/members')

    for (const key in team) {
      const member = members.find(u => u.login.localeCompare(key, 'en', {
        sensitivity: 'base',
      }) === 0)

      if (!member) continue

      all.push({
        ...team[key],
        avatar: member.avatar_url,
        github: key,
      })
    }

    commit('all', all)
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
