<template>
  <v-navigation-drawer>
    <div class="pa-4 d-flex flex-column">
      <b>Introduction</b>
      <router-link :to="{ name: 'en-introduction-why-vuetify' }">Why Vuetify?</router-link>
      <b>Getting started</b>
      <router-link :to="{ name: 'en-getting-started-installation' }">Installation</router-link>
      <b>Components</b>
      <router-link :to="{ name: 'en-components-alerts' }">Alerts</router-link>
      <b>API</b>
      <!-- <router-link :to="{ name: 'en-api-v-alert' }">v-alert</router-link> -->
    </div>
  </v-navigation-drawer>
</template>
