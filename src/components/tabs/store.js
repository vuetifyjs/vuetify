export default {
  mutations: {
    'vuetify/TABS_TOGGLE' (state, payload) {
      state[payload.component][payload.id].active = Object.assign({}, payload.active)
    },

    'vuetify/TABS_TAB_CLICK' (state, payload) {
      state[payload.component][payload.id].click = payload.click
    },

    'vuetify/TABS_TAB_LOCATION' (state, payload) {
      state[payload.component][payload.id].location = Object.assign({}, payload.location)
    },

    'vuetify/TABS_RESIZE' (state, payload) {
      state[payload.component][payload.id].resize = payload.resize
    }
  }
}
