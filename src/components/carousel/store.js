export default {
  mutations: {
    'vuetify/CAROUSEL_TOGGLE' (state, payload) {
      state[payload.component][payload.id] = Object.assign({},
        {
          current: payload.current,
          reverse: payload.reverse
        }
      )
    }
  }
}
