<template>
  <v-navigation-drawer
    v-model="appState.drawer"
    width="300"
  >
    <!-- <div class="pa-4 d-flex flex-column">
      <b>Introduction</b>
      <router-link :to="{ name: 'en-introduction-why-vuetify' }">Why Vuetify?</router-link>
      <b>Getting started</b>
      <router-link :to="{ name: 'en-getting-started-installation' }">Installation</router-link>
      <b>Components</b>
      <router-link :to="{ name: 'en-components-alerts' }">Alerts</router-link>
      <b>API</b>
      <router-link :to="{ path: '/en/api/v-alert' }">v-alert</router-link>
    </div> -->
    <app-list :items="items" />

    <div class="pt-12" />
  </v-navigation-drawer>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useAppStore } from '@/store-v3/app'
  import nav from '@/data/nav-alpha'

  export default defineComponent({
    setup () {
      const appState = useAppStore()

      return { appState, items: nav }
    },
  })
</script>
