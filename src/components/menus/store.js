export default {
  state: {
    menu: {}
  },

  mutations: {
    'vuetify/MENU_TOGGLE' (state, payload) {
      state.menu[payload.id].active = payload.active
    }
  }
}