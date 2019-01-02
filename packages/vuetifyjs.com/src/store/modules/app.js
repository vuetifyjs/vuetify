import supporters from '@/data/supporters.json'
import { set, toggle } from '@/util/vuex'

export default {
  namespaced: true,

  getters: {
    supporters: () => ({ ...supporters })
  },

  mutations: {
    setDrawer: set('drawer'),
    setIsLoading: set('isLoading'),
    setReleases: set('releases'),
    toggleDrawer: toggle('drawer')
  },

  state: {
    drawer: null,
    currentVersion: null,
    isLoading: false,
    releases: []
  }
}
