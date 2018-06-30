<template lang="pug">
  v-container(pt-5)#store-cart
    v-layout
      v-flex.text-xs-center
        store-header(
          :header="$t('Vuetify.Store.cartHeader')"
          :sub-header="subHeader"
          :loading="dataLoading"
        )
        v-btn(
          color="primary"
          large
          :to="{ name: 'store/Front' }"
          v-if="!hasItems"
        )
          span {{ $t('Vuetify.Store.backToStore') }}
          v-icon(right) mdi-arrow-right

    template(v-if="hasItems")
      v-card.mb-5
        v-data-table(
          :headers="headers"
          :items="checkout.lineItems"
          hide-actions
        )
          template(slot="items" slot-scope="{ item }")
            td
              img(
                :src="item.variant.image.src"
                v-if="item.variant.image"
                height="72px"
              )
            td
              div(v-text="item.title").primary--text.subheading
              div(v-text="item.variant.title").grey--text.text--darken-1
              a(
                @click.prevent="removeItem(item)"
                href="#!"
              ).caption Delete
            td.text-xs-right ${{ item.variant.price }}
            td
              v-layout(align-center justify-end)
                v-text-field(
                  hide-details
                  :value="item.quantity"
                  @input="updateCart(item, $event)"
                  type="number"
                  disabled
                ).pa-0.ma-0

          template(slot="footer")
            td(colspan="100%").py-3
              v-layout(align-center)
                v-spacer
                span.subheading.mr-5 CART SUBTOTAL:
                span.grey--text.title ${{ checkout.subtotalPrice }}

      div.text-xs-right
        div.caption.grey--text You will be re-directed to Shopify to complete your purchase
        v-btn(
          flat
          :to="{ name: 'store/Front' }"
          exact
          outline
          large
          color="grey darken-1"
        )
          span {{ $t('Vuetify.Store.backToStore') }}
        v-btn(
          @click="goToShopify"
          :href="checkout.webUrl"
          target="_blank"
          color="primary"
          large
        ).mx-0
          span(v-text="$t('Vuetify.Store.checkout')")
          v-icon(right) mdi-arrow-right
</template>

<script>
  // Components
  import StoreHeader from '@/components/store/Header'

  // Utilities
  import shopifyClient from '@/util/shopifyClient'
  import { mapState } from 'vuex'
  import asyncData from '@/util/asyncData'

  export default {
    components: {
      StoreHeader
    },

    mixins: [asyncData],

    asyncData ({ store }) {
      return typeof window === 'undefined'
        ? Promise.resolve()
        : Promise.all([
          store.dispatch('store/getCheckout'),
          store.dispatch('store/getProducts')
        ])
    },

    data () {
      return {
        cartLoading: false,
        headers: this.$t('Vuetify.Store.cartHeaders')
      }
    },

    computed: {
      ...mapState('store', ['checkout', 'products']),
      hasItems () {
        return this.checkout && this.checkout.lineItems.length > 0
      },
      subHeader () {
        const subHeader = `Vuetify.Store.cart${!this.hasItems ? 'Empty' : ''}Subheader`

        return this.$t(subHeader)
      }
    },

    methods: {
      updateCart (item, value) {
        // const quantity = parseInt(value)

        // if (isNaN(quantity)) return

        // this.asyncData.then(() => {
        //   this.cartLoading = true
        //   const checkout = this.$store.state.store.checkout.id
        //   const items = [{ variantId: item.variableValues.id, quantity }]

        //   return shopifyClient.checkout.updateLineItems(checkout, items)
        // }).then(checkout => {
        //   this.$store.commit('store/SET_CHECKOUT', checkout)
        //   this.cartLoading = false
        // })
      },
      goToShopify () {
        this.$router.push({ name: 'store/ThankYou' })
      },
      removeItem (item) {
        this.dataLoading = true
        shopifyClient.checkout.removeLineItems(this.checkout.id, item.id).then(checkout => {
          console.log('removed item')
          this.$store.commit('store/SET_CHECKOUT', checkout)
        }).catch(err => {
          console.error(err.message)
          return this.$store.dispatch('store/getCheckout')
        }).then(() => {
          this.dataLoading = false
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .mt-a
    margin-top: auto

  td
    height: auto !important
    min-height: 48px

  a
    text-decoration: none
</style>
