<template>
  <v-container fluid>
    <section
      v-for="(category, i) in categories"
      :key="i"
      :id="category[0].productType.toLowerCase()"
      class="mb-5"
    >
      <v-container
        grid-list-xl
        ma-0
        pa-0
      >
        <v-layout wrap>
          <template
            v-for="(product, j) in category"
          >
            <v-flex
              v-if="j === 0"
              :key="`title-${j}`"
              class="font-weight-regular display-1 grey--text text--darken-3"
              d-flex
              tag="h2"
              xs12
              v-text="product.productType"
            />
            <v-flex
              :key="`${j}${j}`"
              d-flex
              xl5
              sm6
              xs12
            >
              <store-product :value="product" />
            </v-flex>
          </template>
        </v-layout>
      </v-container>
    </section>
  </v-container>
</template>

<script>
  // Components
  import StoreProduct from '@/components/store/Product'

  // Helpers
  import { mapState } from 'vuex'

  export default {
    components: {
      StoreProduct
    },

    data: () => ({
      sort: [
        'Theme',
        'Shirts',
        'Hats',
        'Stickers',
        'Bundle'
      ]
    }),

    computed: {
      ...mapState('store', ['products']),
      categories () {
        const categories = {}

        for (const product of this.products) {
          const productType = product.productType

          if (!categories[productType]) {
            categories[productType] = []
          }

          categories[productType].push(product)
        }

        return Object.keys(categories)
          .map(category => categories[category])
          .sort((a, b) => (
            this.sort.indexOf(a[0].productType) -
            this.sort.indexOf(b[0].productType)
          ))
      }
    }
  }
</script>
