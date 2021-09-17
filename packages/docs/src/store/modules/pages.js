// Pathify
import { make } from 'vuex-pathify'

// Data
import pageToApi from '@/data/page-to-api'

const state = {
  frontmatter: {},
  pages: {},
  toc: [],
  md: undefined,
  pageToApi,
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
