<template>
  <v-app>
    <app-banner />

    <app-v2-banner />

    <app-settings-drawer />

    <app-bar />

    <v-main>
      <v-container class="px-4 text-center font-weight-light">
        <router-view />
      </v-container>
    </v-main>

    <home-footer />
  </v-app>
</template>

<script setup>
  // Components
  import AppBanner from '@/components/app/Banner.vue'
  import AppV2Banner from '@/components/app/V2Banner.vue'
  import AppBar from '@/components/app/bar/Bar.vue'
  import AppSettingsDrawer from '@/components/app/settings/Drawer.vue'
  import HomeFooter from '@/components/home/Footer.vue'

  import { onMounted } from 'vue'
  import { useShopifyStore } from '@/store/shopify'

  const store = useShopifyStore()

  onMounted(() => {
    store.fetch()
  })
</script>

<style lang="sass">
#vue-component-framework
  h1, h2, h3, h4, h5, h6
    > a
      display: none
</style>
