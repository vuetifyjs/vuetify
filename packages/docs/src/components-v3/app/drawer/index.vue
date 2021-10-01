<template>
  <v-navigation-drawer
    v-model="app.drawer"
    width="300"
  >
    <div class="pa-4 d-flex flex-column">
      <b>Introduction</b>
      <router-link :to="{ name: `${locale}-introduction-why-vuetify` }">Why Vuetify?</router-link>
      <b>Getting started</b>
      <router-link :to="{ name: `${locale}-getting-started-installation` }">Installation</router-link>
      <b>Components</b>
      <router-link :to="{ name: `${locale}-components-alerts` }">Alerts</router-link>
      <router-link :to="{ name: `${locale}-components-app-bars` }">App bars</router-link>
      <b>API</b>
      <router-link :to="{ path: `/${locale}/api/v-alert` }">v-alert</router-link>
      <router-link :to="{ path: `/${locale}/api/v-app-bar` }">v-app-bar</router-link>
    </div>
    <!-- <app-list :items="items" /> -->
  </v-navigation-drawer>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useAppStore } from '@/store-v3/app'
  import nav from '@/data/nav-alpha'

  export default defineComponent({
    name: 'AppDrawer',

    setup () {
      const { locale } = useI18n()
      const app = useAppStore()

      return { app, items: nav, locale }
    },
  })
</script>
