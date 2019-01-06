import { set } from '@/utils/vuex'

export default {
  namespaced: true,

  state: {
    component: null
  },

  getters: {
    cooking: state => {
      return state.component
        ? state.component.name
        : null
    }
  },

  mutations: {
    setComponent: set('component')
  }
}
