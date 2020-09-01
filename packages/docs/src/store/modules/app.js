// Pathify
import { make } from 'vuex-pathify'

// Utilities
import { getBranch } from '@/util/helpers'
import { ROOT_DISPATCH } from '@/store'

// Data
const state = {
  branch: getBranch(),
  categories: {
    api: {
      icon: '$mdiFlaskOutline',
      color: 'orange',
    },
    'beginners-guide': {
      icon: '$mdiSchoolOutline',
      color: 'green',
    },
    company: {
      icon: '$mdiVuetify',
      color: 'blue darken-1',
    },
    components: {
      icon: '$mdiViewDashboardOutline',
      color: 'indigo darken-1',
    },
    customization: {
      icon: '$mdiImageEditOutline',
      color: 'red',
    },
    directives: {
      icon: '$mdiFunction',
      color: 'blue-grey',
    },
    'getting-started': {
      icon: '$mdiSpeedometer',
      color: 'teal',
    },
    introduction: {
      icon: '$mdiScriptTextOutline',
      color: 'primary',
    },
    'professional-support': {
      icon: '$mdiConsole',
      color: 'teal',
    },
    styles: {
      icon: '$mdiPaletteOutline',
      color: 'deep-purple accent-4',
    },
    themes: {
      icon: '$mdiScriptTextOutline',
      color: 'pink',
    },
  },
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
    dispatch('sponsors/fetch', null, ROOT_DISPATCH)
    dispatch('messages/fetch', null, ROOT_DISPATCH)
    dispatch('user/fetch', null, ROOT_DISPATCH)
    dispatch('ads/fetch', null, ROOT_DISPATCH)
    dispatch('jobs/fetch', null, ROOT_DISPATCH)
  },
  showSnackbar ({ state }, data) {
    state.snackbar = Object.assign(state.snackbar, data)
  },
}

const getters = {
  alphabetical: (_, __, rootState) => {
    const alphabetical = []
    const pages = rootState.pages.pages

    const items = Object.entries(pages).map(([key, value]) => ({
      title: value,
      to: key,
    }))

    const strip = str => str.replace(/^v-|\$/, '')

    const sorted = items.sort((a, b) => {
      return strip(a.title).localeCompare(strip(b.title))
    })

    let groupChar = null
    for (const obj of sorted) {
      const itemChar = strip(obj.title).toLowerCase().charAt(0)
      const category = state.categories.itemChar || {}

      const item = {
        ...obj,
        icon: category.icon,
      }

      if (itemChar !== groupChar) {
        groupChar = itemChar

        alphabetical.push({
          to: [],
          items: [],
          icon: `$mdiAlpha${groupChar.toUpperCase()}`,
        })
      }

      alphabetical[alphabetical.length - 1].items.push(item)
      alphabetical[alphabetical.length - 1].to.push(item.to)
    }

    return alphabetical
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
