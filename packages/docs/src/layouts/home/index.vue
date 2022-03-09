<template>
  <v-app>
    <home-bar />

    <home-view />

    <home-footer />

    <default-settings />
  </v-app>
</template>

<script>
  // Components
  import DefaultSettings from '@/layouts/default/settings/Settings'
  import HomeBar from './AppBar'
  import HomeFooter from './Footer'
  import HomeView from './View'

  export default {
    name: 'HomeLayout',

    components: {
      DefaultSettings,
      HomeBar,
      HomeFooter,
      HomeView,
    },
  }
</script>
