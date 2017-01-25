export default {
  state: {
    sidebar: {}
  },

  mutations: {
    'vuetify/SIDEBAR_INIT' (store, obj) {
      store.sidebar[obj] = { active: false }
    },

    'vuetify/SIDEBAR_TOGGLE' (store, obj) {
      store.sidebar[obj.id].active = obj.active
    }
  }
}