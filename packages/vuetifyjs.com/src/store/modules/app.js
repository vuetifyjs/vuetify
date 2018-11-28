import supporters from '@/data/supporters.json'
import { set, toggle } from '@/util/vuex'

export default {
  namespaced: true,

  getters: {
    supporters: () => ({ ...supporters })
  },

  mutations: {
    setDrawer: set('drawer'),
    toggleDrawer: toggle('drawer'),
    setReleases: set('releases')
  },

  state: {
    drawer: null,
    currentVersion: null,
    releases: []
  }
}
