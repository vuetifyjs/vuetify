// Pathify
import { make } from 'vuex-pathify'

// Data
import team from '@/data/team'

const state = {
  all: [],
  initializing: false,
}

const mutations = make.mutations(state)

const actions = {
  fetch: async ({ commit, state }) => {
    if (state.initializing || state.all.length) return

    commit('initializing', true)

    const members = await fetch('https://api.github.com/orgs/vuetifyjs/members', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json())
    const all = []

    for (const key in team) {
      const member = members.find(u => u.login === key)

      if (!member) continue

      all.push({
        ...team[key],
        avatar: member.avatar_url,
        github: key,
      })
    }

    commit('all', all)
    commit('initializing', false)
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
