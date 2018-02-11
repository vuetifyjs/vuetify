<template lang="pug">
  v-container(layout fill-height pt-5)#store
    v-layout(column justify-space-between)
      v-flex(shrink)
        store-header(
          :header="$t('Vuetify.Store.indexHeader')"
          :sub-header="$t('Vuetify.Store.indexSubheader')"
          :loading="dataLoading"
        )
          strong(v-text="$t('Vuetify.Store.helpSupport')")
      v-flex(shrink mb-5)
        v-fade-transition(mode="out-in")
          v-container(
            grid-list-xl
            pa-0
            :key="products.length"
          )
            v-layout(wrap)
              v-flex(
                xs12
                sm6
                md4
                xl3
                d-flex
                v-for="product in computedProducts"
                :key="product.id"
              )
                store-product(:value="product")
      v-flex(mt-5 grow)
        cta-btn(
          href="https://community.vuetifyjs.com"
          :caption="$t('Generic.Common.havingIssues')"
          :text="$t('Generic.Common.getHelp')"
        )
</template>

<script>
  // Components
  import StoreHeader from '@/components/store/StoreHeader'
  import StoreProduct from '@/components/store/StoreProduct'

  // Utilities
  import asyncData from '@/util/asyncData'
  import { mapState } from 'vuex'

  export default {
    components: {
      StoreHeader,
      StoreProduct
    },

    mixins: [asyncData],

    asyncData ({ store }) {
      return store.state.store.hasFetchedProducts &&
        store.state.store.products.length
          ? Promise.resolve()
          : store.dispatch('store/getProducts')
    },

    computed: {
      ...mapState('store', ['products']),
      computedProducts () {
        const themes = []
        const products = []

        for (let product of this.products) {
          if (product.description.indexOf('theme') > -1) {
            themes.push(product)
          } else {
            products.push(product)
          }
        }

        return themes.concat(products)
      }
    }
  }
</script>
