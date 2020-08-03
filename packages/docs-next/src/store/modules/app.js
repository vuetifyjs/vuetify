// Pathify
import { make } from 'vuex-pathify'

// Utilities
import { getBranch } from '@/util/helpers'
import { ROOT_DISPATCH } from '@/store'

// Data
const state = {
  branch: getBranch(),
  drawer: null,
  initializing: false,
  modified: {},
  nav: [],
  search: false,
  settings: false,
  version: null,
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  init: async ({ dispatch }) => {
    dispatch('messages/fetch', null, ROOT_DISPATCH)
    dispatch('user/fetch', null, ROOT_DISPATCH)
    dispatch('ads/fetch', null, ROOT_DISPATCH)
  },
  showSnackbar ({ state }, data) {
    state.snackbar = Object.assign(state.snackbar, data)
  },
}

const getters = {
  alphabetical: (_, __, rootState) => {
    const alphabetical = {}
    const nav = []
    const pages = rootState.pages.pages

    for (const key in pages) {
      if (key.indexOf('needs-triage') > -1) continue

      const title = pages[key]
      const tstart = title.replace('v-', '')[0].toLowerCase()

      // if alpha
      if (!tstart.match(/[a-z]/)) continue

      if (!alphabetical[tstart]) {
        alphabetical[tstart] = {
          to: [],
          items: [],
          icon: `$mdiAlpha${tstart.toUpperCase()}`,
        }
      }

      alphabetical[tstart].items.push({
        title: pages[key],
        to: key,
      })

      alphabetical[tstart].to.push(key)
    }

    for (const letter in alphabetical) {
      const group = alphabetical[letter]
      const items = group.items.sort((a, b) => {
        const atitle = a.title
        const btitle = b.title

        return atitle > btitle
          ? 1
          : atitle < btitle ? -1 : 0
      })

      nav.push({ ...group, items })
    }

    return nav
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
