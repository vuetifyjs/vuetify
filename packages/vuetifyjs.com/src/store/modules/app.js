import { set, toggle } from '@/util/vuex'

export default {
  namespaced: true,

  mutations: {
    setDrawer: set('drawer'),
    setIsLoading: set('isLoading'),
    setReleases: set('releases'),
    setSupporters: set('supporters'),
    toggleDrawer: toggle('drawer')
  },

  state: {
    drawer: null,
    currentVersion: null,
    isLoading: false,
    releases: [],
    supporters: {}
  }
}
