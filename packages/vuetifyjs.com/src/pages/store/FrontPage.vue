<template>
  <section id="store-front">
    <v-jumbotron
      height="100%"
      gradient="to bottom, rgb(255,255,255), rgba(66,165,245, .05), rgba(66,165,245, .4)"
    >
      <store-free-shipping />

      <store-cta />

      <store-categories />
    </v-jumbotron>
  </section>
</template>

<script>
  // Components
  import StoreCategories from '@/components/store/Categories'
  import StoreCta from '@/components/store/Cta'
  import StoreFreeShipping from '@/components/store/FreeShipping'

  export default {
    components: {
      StoreCategories,
      StoreCta,
      StoreFreeShipping
    }
  }
</script>
