export default {
  state: {
    collapsible: {}
  },

  mutations: {
    'vuetify/COLLAPSIBLE_INIT' (store, obj) {
      store.collapsible[obj] = []
    },

    'vuetify/COLLAPSIBLE_BODY_INIT' (store, obj) {
      // store.collapsible[obj.id][obj.headerId] = null
    },

    'vuetify/COLLAPSIBLE_TOGGLE' (store, obj) {
      store.collapsible[obj.id].push(obj.headerId)
    },

    'vuetify/COLLAPSIBLE_BODY_TOGGLE' (store, obj) {
      // store.collapsible[obj.id][obj.headerId] = obj.active
    }
  }
}