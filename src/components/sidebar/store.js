export default {
  state: {
    sidebar: {}
  },

  mutations: {
    'vuetify/BODY_CLICK' (store, obj) {
      store.common.bodyClick = obj
    },

    'vuetify/SIDEBAR_TOGGLE' (store, obj) {
      store.sidebar[obj.id].active = obj.active
    }
  }
}