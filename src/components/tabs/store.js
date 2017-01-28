export default {
  mutations: {
    'vuetify/TABS_TOGGLE' (state, payload) {
      state[payload.component][payload.id].active = Object.assign({}, payload.active)
    },

    'vuetify/TABS_TAB_CLICK' (state, payload) {
      state[payload.component][payload.id].item = payload.item
      state[payload.component][payload.id].location = Object.assign({}, payload.location)
    }
  }
}
