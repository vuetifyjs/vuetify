const Store = {
  state: {
    // add in all the components that will use the store here
    // then there is no need to pull them in from individual files
    // components will only need their own store if they have
    // mutations that need to override the generic ones for components
    // for example: collapasible toggle
    common: {
      bodyClick: {
        ticker: null,
        target: null
      }
    }
  },

  mutations: {
    'vuetify/COMPONENT_INIT' (state, payload) {
      state[payload.component] = Object.assign({},
        state[payload.component],
        { [payload.id]: payload.defaultState }
      )
    },

    'vuetify/COMPONENT_DESTROY' (state, payload) {
      delete state[payload.component][payload.id]

      state[payload.component] = Object.assign({}, state[payload.component])
    },

    'vuetify/COMPONENT_TOGGLE' (state, payload) {
      // see if an override exists for this particular component and use that if so
      // otherwise, just use this generic one and no need to create mutations
      // (or even a store) for things like menu and side bar
      // need to change toggleable helper and the sidebar directive to use generic
      // also need to pass the component name in as component
      if (`vuetify/${payload.component.toUpperCase()}_TOGGLE` in Store.mutations) {
        Store.mutations[`vuetify/${payload.component.toUpperCase()}_TOGGLE`](state, payload)
      } else {
        state[payload.component][payload.id].active = payload.active
      }
    },

    // Some semantics that can be cleaned up (here and throughout)
    // use 'state' when it is state instead of 'store'
    // use 'payload' for the payload
    'vuetify/BODY_CLICK' (state, payload) {
      state.common.bodyClick = { target: payload.target, ticker: new Date() }
    }
  }
}

export default Store
