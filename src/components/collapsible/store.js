export default {
  state: {
    collapsible: {}
  },

  mutations: {
    'vuetify/COLLAPSIBLE_INIT' (store, obj) {
      store.collapsible[obj] = {}
    },

    'vuetify/COLLAPSIBLE_HEADER_INIT' (store, obj) {
      store.collapsible[obj.id][obj.headerId] = { active: null }
    },

    'vuetify/COLLAPSIBLE_TOGGLE' (store, obj) {
      store.collapsible[obj.id].active = obj.active
    },

    'vuetify/COLLAPSIBLE_HEADER_TOGGLE' (store, obj) {
      store.collapsible[obj.id][obj.headerId].active = obj.active
    }
  }
}