<template>
  <v-app>
    <app-banner />

    <app-settings-drawer />

    <app-bar />

    <v-main class="text-center font-weight-light">
      <router-view />
    </v-main>

    <home-footer />
  </v-app>
</template>

<script setup>
  // Components
  import AppBanner from '@/components/app/Banner.vue'
  import AppBar from '@/components/app/bar/Bar.vue'
  import AppSettingsDrawer from '@/components/app/settings/Drawer.vue'
  import HomeFooter from '@/components/home/Footer.vue'
</script>

<style lang="sass">
#vue-component-framework
  h1, h2, h3, h4, h5, h6
    > a
      display: none
</style>
