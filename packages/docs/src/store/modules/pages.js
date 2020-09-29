// Pathify
import { make } from 'vuex-pathify'

const state = {
  frontmatter: {},
  pages: {},
  toc: [],
  md: undefined,
}

const mutations = make.mutations(state)

const actions = {}

const getters = make.getters(state)

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
