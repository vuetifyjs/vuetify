<template>
  <v-app>
    <default-system-bar />

    <home-bar />

    <home-view />

    <home-footer />

    <default-settings />
  </v-app>
</template>

<script>
  // Components
  import DefaultSystemBar from '@/layouts/default/SystemBar'
  import DefaultSettings from '@/layouts/default/settings/Settings'
  import HomeBar from './AppBar'
  import HomeFooter from './Footer'
  import HomeView from './View'

  export default {
    name: 'HomeLayout',

    components: {
      DefaultSystemBar,
      DefaultSettings,
      HomeBar,
      HomeFooter,
      HomeView,
    },
  }
</script>
