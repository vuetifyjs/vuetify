<template>

  <v-row>
    <template v-if="!products">
      <v-col
        v-for="n in 10"
        :key="n"
        cols="12"
        md="6"
      >
        <v-skeleton-loader
          min-height="185"
          type="image"
        />
      </v-col>
    </template>

    <template v-else-if="products.length === 0">
      <v-col>
        <v-alert type="error">Problem fetching themes</v-alert>
      </v-col>
    </template>

    <template v-else>
      <v-col
        v-for="product in products"
        :key="product.title"
        cols="12"
        md="6"
      >
        <a
          :href="`https://store.vuetifyjs.com/products/${product.handle}/`"
          class="text--primary text-decoration-none"
          rel="noopener"
          target="_blank"
        >
          <app-figure
            :alt="product.title"
            :name="product.title"
            :src="product.variant.image"
            height="185"
            max-height="185"
            min-height="185"
            outlined
          >
            <figcaption class="d-flex text-subtitle-2 align-center text-capitalize mt-3">
              <span v-text="product.title" />

              <v-chip
                v-if="product.isOnSale"
                class="text-uppercase px-1 ml-2"
                color="red lighten-2"
                dark
                label
                x-small
              >
                On Sale
              </v-chip>

              <v-chip
                v-if="product.isFree"
                class="text-uppercase px-1 ml-2"
                color="primary"
                label
                x-small
              >
                Free
              </v-chip>

              <span
                v-else
                class="ml-auto"
                v-text="`$${product.variant.price}`"
              />
            </figcaption>
          </app-figure>
        </a>
      </v-col>
    </template>
  </v-row>
</template>

<script>
  // Stores
  import shopify from '@/store/modules/shopify'

  export default {
    name: 'PremiumThemes',

    data: () => ({ products: null }),

    async beforeCreate () {
      if (!this.$store.hasModule('shopify')) {
        this.$store.registerModule('shopify', shopify)
      }

      const request = await this.$store.dispatch('shopify/fetch') || []
      const products = []

      for (const product of request) {
        if (product.productType !== 'Themes') continue

        const variant = product.variants[0]

        products.push({
          handle: product.handle,
          isFree: Number(variant.price) === 0,
          isOnSale: Number(variant.price) < Number(variant.compareAtPrice),
          title: product.title,
          variant,
        })
      }

      this.products = products
        .sort((a, b) => {
          const aPrice = parseFloat(a.variant.price)
          const bPrice = parseFloat(b.variant.price)

          return aPrice < bPrice ? 1 : aPrice > bPrice ? -1 : 0
        })
    },

    beforeDestroy () {
      this.$store.unregisterModule('shopify')
    },
  }
</script>
