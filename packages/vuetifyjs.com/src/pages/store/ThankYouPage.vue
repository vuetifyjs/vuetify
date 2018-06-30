<template lang="pug">
  v-container(pt-5)#store-thank-you
    v-layout
      v-flex.text-xs-center
        store-header(
          :header="$t('Vuetify.Store.thankYouHeader')"
          :sub-header="$t('Vuetify.Store.thankYouSubheader')"
        )

        v-btn(
          large
          color="primary"
          :to="{ name: 'store/Front' }"
        ).mb-4.px-5
          span {{ $t('Vuetify.Store.backToStore') }}
          v-icon(right) mdi-arrow-right
        markdown(:source="$t('Vuetify.Store.thankYouBack')").caption
</template>

<script>
  // Components
  import StoreHeader from '@/components/store/Header'

  export default {
    components: {
      StoreHeader
    },

    mounted () {
      this.$store.dispatch('store/getCheckout')
    }
  }
</script>
