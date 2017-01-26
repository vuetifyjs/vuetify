export default {
  state: {
    common: {
      bodyClick: null
    }
  },
  
  mutations: {
    'vuetify/COMPONENT_INIT' (store, payload) {
      store[payload.component] = Object.assign({}, 
        store[payload.component],
        { [payload.id]: payload.defaultState }
      )
    },

    'vuetify/COMPONENT_DESTROY' (store, payload) {
      delete store[payload.component][payload.id]

      store[payload.component] = Object.assign({}, store[payload.component])
    },

    'vuetify/BODY_CLICK' (store, obj) {
      store.common.bodyClick = obj
    }
  }
}