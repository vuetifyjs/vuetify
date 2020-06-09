// Pathify
import { make } from 'vuex-pathify'

// Language
// import { loadLocale } from '@/plugins/i18n'

const state = {
  frontmatter: {},
  pages: {},
  tocs: {},
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
