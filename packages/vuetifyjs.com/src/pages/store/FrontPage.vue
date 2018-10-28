<template>
  <section id="store-front">
    <v-progress-linear
      v-if="!products.length"
      key="progress"
      class="ma-0"
      indeterminate
    />
    <v-img
      v-if="products.length > 0"
      height="100%"
      gradient="to bottom, rgb(255,255,255), rgba(66,165,245, .05), rgba(66,165,245, .4)"
    >
      <store-free-shipping key="shipping" />

      <store-cta key="cta" />

      <store-categories key="categories" />
    </v-img>
  </section>
</template>

<script>
  // Components
  import StoreCategories from '@/components/store/Categories'
  import StoreCta from '@/components/store/Cta'
  import StoreFreeShipping from '@/components/store/FreeShipping'

  // Helpers
  import { mapState } from 'vuex'

  export default {
    components: {
      StoreCategories,
      StoreCta,
      StoreFreeShipping
    },

    computed: {
      ...mapState('store', ['products'])
    }
  }
</script>
