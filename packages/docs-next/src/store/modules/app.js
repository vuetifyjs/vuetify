// Pathify
import { make } from 'vuex-pathify'

// Utilities
import { getBranch } from '@/util/helpers'
import { ROOT_DISPATCH } from '@/store'

// Data

const state = {
  branch: getBranch(),
  drawer: true,
  initializing: false,
  modified: {},
  nav: [],
  snackbar: {
    show: false,
    refresh: false,
    dismiss: false,
    message: '',
    timeout: 4000,
  },
  version: null,
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  init: async ({ dispatch }) => {
    dispatch('ads/fetch', null, ROOT_DISPATCH)
    dispatch('user/fetch', null, ROOT_DISPATCH)
  },
  showSnackbar ({ state }, data) {
    state.snackbar = Object.assign(state.snackbar, data)
  },
}

const getters = {
  advanced: (state, _, rootState) => {
    if (!rootState.user.drawer.advanced) return state.nav

    const advanced = {}
    const nav = []
    const pages = rootState.pages.pages

    for (const key in pages) {
      if (key.indexOf('needs-triage') > -1) continue

      const title = pages[key]
      const tstart = title.replace('v-', '')[0].toLowerCase()

      // if alpha
      if (!tstart.match(/[a-z]/)) continue

      if (!advanced[tstart]) {
        advanced[tstart] = {
          to: [],
          items: [],
          icon: `$mdiAlpha${tstart.toUpperCase()}`,
        }
      }

      advanced[tstart].items.push({
        title: pages[key],
        to: key,
      })

      advanced[tstart].to.push(key)
    }

    for (const letter in advanced) {
      const group = advanced[letter]

      nav.push({
        ...group,
        items: group.items.sort((a, b) => {
          const atitle = a.title
          const btitle = b.title

          return atitle > btitle
            ? 1
            : atitle < btitle ? -1 : 0
        }),
        to: group.to.join('|'),
      })
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
