export default {
  state: {
    modal: {}
  },

  mutations: {
    'vuetify/MODAL_TOGGLE' (store, payload) {
      store.modal[payload.id].active = payload.active
    }
  }
}