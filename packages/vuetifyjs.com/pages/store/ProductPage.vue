<template lang="pug">
  v-container(pt-5)#store-product
    v-progress-linear(
      indeterminate
      :active="dataLoading"
      class="my-0"
      height="4"
    )
    v-container(grid-list-xl).pa-0
      v-layout(wrap)
        v-flex(
          xs12
          md6
          order-xs2
          order-sm2
          order-md1
          style="max-width: 500px;"
        ).text-xs-center.mx-auto
          v-carousel(:cycle="false").elevation-0
            v-carousel-item(
              v-for="(item, i) in product.images"
              :key="i"
              :src="item.src"
              :href="item.src"
              target="_blank"
            )

        v-flex(xs12 md6 order-md2)
          h2(v-text="product.title").display-2.primary--text.mb-3

          div.mb-5
            span(v-if="onSale").mr-3.strike.display-1.grey--text.text--lighten-1
              | ${{ select.compareAtPrice }}
            span.display-1.green--text
              span.mr-1 ${{ select.price }}
              span(v-if="onSale").subheading Sale

          v-container(grid-list-xl pa-0).mb-5
            v-layout(wrap)
              v-flex(xs12 sm6)
                v-select(
                  v-model="select"
                  :items="product.variants"
                  item-text="title"
                  item-value="id"
                  :label="option.name"
                  return-object
                  hide-details
                  v-for="(option, i) in product.options"
                  :key="i"
                )
              v-flex(xs12 sm6)
                v-text-field(
                  v-model.number="quantity"
                  type="number"
                  label="Quantity"
                  max="5"
                  hide-details
                )
              v-flex(xs12)
                v-btn(
                  large
                  color="primary"
                  @click="addToCart"
                  :loading="cartLoading"
                  block
                ).px-5.mx-0
                  span(v-text="$t('Vuetify.Store.addToCart')")
                  v-icon(right size="18px") add_shopping_cart
              v-flex(text-xs-center)
                v-btn(
                  color="grey darken-1"
                  exact
                  flat
                  large
                  outline
                  :to="{ name: 'store/Index' }"
                ).mx-0
                  span(v-text="$t('Vuetify.Store.backToStore')")

              v-flex(xs12)
                span(v-text="$t('Vuetify.Store.description')").body-2.grey--text
                v-divider.my-2
                div(v-html="product.descriptionHtml").description
</template>

<script>
  // Utilities
  import shopifyClient from '@/util/shopifyClient'
  import asyncData from '@/util/asyncData'
  import Message from '@/mixins/message'
  import { getLongId, findProduct } from '@/util/helpers'

  export default {
    mixins: [asyncData, Message],

    props: {
      id: {
        type: String,
        default: ''
      }
    },

    asyncData ({ store, route }) {
      const longId = getLongId(route.params.id)
      // TODO: only fetch once
      typeof window !== 'undefined' && store.dispatch('store/getCheckout')
      return store.state.store.products.length && findProduct(store, longId)
        ? Promise.resolve()
        : store.dispatch('store/getProduct', longId)
    },

    data: () => ({
      cartLoading: false,
      select: null,
      quantity: 1
    }),

    computed: {
      product () {
        return findProduct(this.$store, this.longId)
      },
      longId () {
        return getLongId(this.id)
      },
      discount () {
        if (!this.select.compareAtPrice) return 0

        const price = parseFloat(this.select.price)
        const compareAtPrice = parseFloat(this.select.compareAtPrice)

        return price / compareAtPrice * 100
      },
      onSale () {
        return this.discount > 0
      }
    },

    created () {
      if (!this.product.variants.length) return

      this.select = this.product.variants[0]
    },

    methods: {
      addToCart () {
        this.asyncData.then(() => {
          this.cartLoading = true
          const checkout = this.$store.state.store.checkout.id
          const items = [{ variantId: this.select.id, quantity: this.quantity }]

          return shopifyClient.checkout.addLineItems(checkout, items)
        }).then(checkout => {
          this.$store.commit('store/SET_CHECKOUT', checkout)
          this.cartLoading = false
          this.$router.push({ name: 'store/Cart' })
        })
      },
      snackHandler () {
        this.$router.push({ name: 'store/Cart' })
      }
    }
  }
</script>

<style lang="stylus">
  #store-product
    height: 100%
    display: flex
    flex-direction: column

    .jumbotron
      &__image
        max-width: 90%

    .carousel
      .carousel__left,
      .carousel__right
        .icon
          color: rgba(#000, .54) !important

    .strike
      text-decoration: line-through

    table
      border-radius: 2px
      border-collapse: collapse
      border-spacing: 0
      border: 1px solid rgba(#000, .12)
      width: 100%
      max-width: 100%

      tbody
        tr:first-child
          background: rgba(#000, .12)

          td
            font-size: 18px

        tr:not(:last-child)
          border-bottom: 1px solid rgba(#000, .12)

        td
          font-weight: 400
          font-size: 13px
          padding: 12px 8px

    .description
      ul, ol
        padding-left: 16px !important

        li
          margin-left: 16px !important

    .product-image
      max-width: 100%
</style>
