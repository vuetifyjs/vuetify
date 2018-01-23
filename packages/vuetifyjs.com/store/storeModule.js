import Vue from 'vue'
import shopifyClient from '@/util/shopifyClient'

export default {
  namespaced: true,

  state: () => ({
    products: [],
    hasFetchedProducts: false,
    checkout: null
  }),

  mutations: {
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
  },

  actions: {
    getProducts ({ commit }) {
      return shopifyClient.product.fetchAll().then(products => {
        commit('SET_PRODUCTS', products)
      })
    },
    getProduct ({ commit }, id) {
      return shopifyClient.product.fetch(id).then(product => {
        commit('SET_PRODUCT', product)
      })
    },
    getCheckout ({ dispatch, commit }, fresh = false) {
      let checkout
      const checkoutId = localStorage.getItem('vuetify_shopify_checkout_id')

      if (!fresh && checkoutId) {
        checkout = shopifyClient.checkout.fetch(checkoutId)
      } else {
        checkout = shopifyClient.checkout.create()
      }

      return checkout.then(checkout => {
        if (checkout.completedAt != null) {
          return dispatch('getCheckout', true)
        }
        commit('SET_CHECKOUT', checkout)
        localStorage.setItem('vuetify_shopify_checkout_id', checkout.id)
      })
    }
  }
}
