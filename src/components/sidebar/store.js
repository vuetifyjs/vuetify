export default {
  state: {
    sidebar: {}
  },

  mutations: {
    'vuetify/SIDEBAR_INIT' (store, obj) {
      store.sidebar[obj] = { active: null }
    },

    'vuetify/SIDEBAR_TOGGLE' (store, obj) {
      store.sidebar[obj.id].active = obj.active
    }
  }
}