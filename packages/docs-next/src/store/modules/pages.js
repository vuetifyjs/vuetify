// Pathify
import { make } from 'vuex-pathify'

const state = {
  frontmatter: {},
  pages: {},
  toc: [],
}

const mutations = make.mutations(state)

const actions = {}

const getters = {
  translating: (_, __, rootState) => {
    return rootState.route.params.locale === 'eo-UY'
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
