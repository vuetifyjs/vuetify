import { set, toggle } from '@/utils/vuex'

export default {
  namespaced: true,

  state: {
    drawer: null
  },

  mutations: {
    setDrawer: set('drawer'),
    toggleDrawer: toggle('drawer')
  }
}
