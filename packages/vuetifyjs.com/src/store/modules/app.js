import supporters from '@/data/supporters.json'
import { set, toggle } from '@/util/vuex'

export default {
  namespaced: true,

  getters: {
    supporters: () => ({ ...supporters })
  },

  mutations: {
    setDrawer: set('drawer'),
    setToc: set('toc'),
    setReleases: set('releases'),
    toggleDrawr: toggle('drawer')
  },

  state: {
    drawer: null,
    currentVersion: null,
    releases: [],
    toc: false
  }
}
