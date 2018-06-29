import Vue from 'vue'

export default {
  SET_PRODUCTS (state, payload) {
    state.products = payload
    state.hasFetchedProducts = true
  },
  SET_PRODUCT (state, payload) {
    const existing = state.products.findIndex(p => p.id === payload.id)
    if (existing > -1) {
      Vue.set(state.products, existing, payload)
    } else {
      state.products.push(payload)
    }
  },
  SET_CHECKOUT (state, payload) {
    state.checkout = payload
  }
}
