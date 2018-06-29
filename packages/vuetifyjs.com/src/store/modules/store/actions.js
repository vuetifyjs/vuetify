import shopifyClient from '@/util/shopifyClient'

export default {
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
