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
    components: {
      icon: '$mdiViewDashboardOutline',
      color: 'indigo darken-1',
    },
    features: {
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
      color: 'green',
    },
    about: {
      icon: '$mdiVuetify',
      color: 'primary',
    },
    resources: {
      icon: '$mdiTeach',
      color: 'pink',
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
  nav: [],
  scrolling: false,
  search: false,
  settings: false,
  version: null,
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  init: async ({ dispatch }) => {
    const modules = ['user/fetch', 'sponsors/fetch', 'ads/fetch', 'pwa/init']

    for (const module of modules) dispatch(module, null, ROOT_DISPATCH)
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
  hasApi: () => {
    return !!(
      process.env.VUE_APP_COSMIC_BUCKET_SLUG &&
      process.env.VUE_APP_COSMIC_BUCKET_READ_KEY
    )
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
